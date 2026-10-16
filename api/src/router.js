// Village Market API — framework-agnostic router.
// Used by the Azure Function in production (functions/market.js) and by the Vite dev server (dev-api.ts).
//
//   handle(req, db) -> { status, json? | body?, headers? }
//   req: { method, path, query, body, headers }   path is everything after /api
//   db:  { query(text, params) -> rows[], tx(fn(q)) -> result }
//
// Public:  GET  /market/catalog            GET  /market/reviews?seller=&product=
//          POST /market/reviews            GET  /market/images/:id
// CMS (Static Web Apps role "admin" required — also enforced in staticwebapp.config.json):
//          GET  /cms/catalog               PUT  /cms/sellers/:id     POST /cms/sellers     DELETE /cms/sellers/:id
//          PUT  /cms/products/:id          POST /cms/products        DELETE /cms/products/:id
//          PUT  /cms/categories/:id        POST /cms/categories
//          PUT  /cms/order/:productId      PATCH /cms/listings
//          GET  /cms/reviews               PATCH /cms/reviews/:id    DELETE /cms/reviews/:id
//          POST /cms/images

const ok = (json, status = 200) => ({ status, json });
const fail = (status, error) => ({ status, json: { error } });

const slugify = (s) => String(s).toLowerCase().normalize('NFKD').replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
const str = (v, max = 200) => String(v ?? '').trim().slice(0, max);
const bool = (v, dflt) => (typeof v === 'boolean' ? v : dflt);
const int = (v, dflt) => (Number.isFinite(Number(v)) ? Math.round(Number(v)) : dflt);
const phones = (v) =>
  (Array.isArray(v) ? v : String(v ?? '').split(/[,/]/))
    .map((p) => String(p).replace(/\D/g, '').replace(/^(91|0)(?=\d{10}$)/, ''))
    .filter((p) => p.length >= 10)
    .slice(0, 4);
// Only our own uploads or https links may be stored as image URLs.
const imageUrl = (v) => {
  const s = str(v, 500);
  return /^(\/api\/market\/images\/\d+|https:\/\/\S+)$/.test(s) ? s : null;
};

export function isAdmin(headers) {
  const raw = headers['x-ms-client-principal'];
  if (!raw) return false;
  try {
    const p = JSON.parse(Buffer.from(raw, 'base64').toString('utf8'));
    return Array.isArray(p.userRoles) && p.userRoles.includes('admin');
  } catch {
    return false;
  }
}

// Best-effort throttle for anonymous review posting (per function instance).
const recentPosts = new Map();
function throttled(ip) {
  const now = Date.now();
  const hits = (recentPosts.get(ip) ?? []).filter((t) => now - t < 10 * 60_000);
  hits.push(now);
  recentPosts.set(ip, hits);
  if (recentPosts.size > 5000) recentPosts.clear();
  return hits.length > 5;
}

async function catalog(db, includeInactive) {
  const where = includeInactive ? '' : 'where active';
  const [categories, products, sellers, listings, ratings] = await Promise.all([
    db.query(`select * from categories ${where} order by sort, name_en`),
    db.query(`select * from products ${where} order by sort, name_en`),
    db.query(`select id, name_en, name_mr, phones, village, about, photo_url, featured, active from sellers ${where} order by name_en`),
    db.query(`select * from listings ${where} order by product_id, position, seller_id`),
    db.query(
      `select seller_id, round(avg(rating)::numeric, 1)::float as avg, count(*)::int as count
         from reviews where status = 'published' group by seller_id`
    ),
  ]);
  return {
    categories,
    products,
    sellers,
    listings,
    ratings: Object.fromEntries(ratings.map((r) => [r.seller_id, { avg: r.avg, count: r.count }])),
  };
}

async function saveSeller(db, id, b, isNew) {
  const name_en = str(b.name_en, 120);
  if (!name_en) return fail(400, 'English name is required');
  const nums = phones(b.phones);
  if (!nums.length) return fail(400, 'At least one 10-digit phone number is required');
  if (isNew) id = `${slugify(name_en) || 'villager'}-${Math.random().toString(36).slice(2, 6)}`;

  const productIds = Array.isArray(b.product_ids) ? b.product_ids.map(String) : null;
  await db.tx(async (q) => {
    const rows = await q(
      `insert into sellers (id, name_en, name_mr, phones, village, about, photo_url, featured, active)
       values ($1,$2,$3,$4,$5,$6,$7,$8,$9)
       on conflict (id) do update set name_en=$2, name_mr=$3, phones=$4, village=$5, about=$6,
         photo_url=$7, featured=$8, active=$9
       returning id`,
      [id, name_en, str(b.name_mr, 120), nums, str(b.village, 120), str(b.about, 600),
       imageUrl(b.photo_url), bool(b.featured, false), bool(b.active, true)]
    );
    if (!rows.length) throw new Error('save failed');
    if (productIds) {
      await q(`delete from listings where seller_id = $1 and not (product_id = any($2::text[]))`, [id, productIds]);
      // New listings go to the bottom of each product's list.
      await q(
        `insert into listings (seller_id, product_id, position)
         select $1, p.id, coalesce((select max(position) from listings l where l.product_id = p.id), 0) + 10
           from products p where p.id = any($2::text[])
         on conflict do nothing`,
        [id, productIds]
      );
    }
  });
  return ok({ id }, isNew ? 201 : 200);
}

async function saveProduct(db, id, b, isNew) {
  const name_en = str(b.name_en, 80);
  if (!name_en) return fail(400, 'English name is required');
  if (isNew) id = slugify(name_en);
  if (!id) return fail(400, 'Invalid name');
  const cat = await db.query(`select 1 from categories where id = $1`, [str(b.category_id)]);
  if (!cat.length) return fail(400, 'Choose a valid category');
  if (isNew && (await db.query(`select 1 from products where id = $1`, [id])).length)
    return fail(409, 'A product with this name already exists');
  await db.query(
    `insert into products (id, category_id, name_en, name_mr, emoji, image_url, description, sort, active)
     values ($1,$2,$3,$4,$5,$6,$7,$8,$9)
     on conflict (id) do update set category_id=$2, name_en=$3, name_mr=$4, emoji=$5, image_url=$6,
       description=$7, sort=$8, active=$9`,
    [id, str(b.category_id), name_en, str(b.name_mr, 80), str(b.emoji, 8) || '🛒', imageUrl(b.image_url),
     str(b.description, 600), int(b.sort, 1000), bool(b.active, true)]
  );
  return ok({ id }, isNew ? 201 : 200);
}

async function saveCategory(db, id, b, isNew) {
  const name_en = str(b.name_en, 80);
  if (!name_en) return fail(400, 'English name is required');
  if (isNew) id = slugify(name_en);
  if (!id) return fail(400, 'Invalid name');
  if (isNew && (await db.query(`select 1 from categories where id = $1`, [id])).length)
    return fail(409, 'A category with this name already exists');
  await db.query(
    `insert into categories (id, name_en, name_mr, emoji, sort, active) values ($1,$2,$3,$4,$5,$6)
     on conflict (id) do update set name_en=$2, name_mr=$3, emoji=$4, sort=$5, active=$6`,
    [id, name_en, str(b.name_mr, 80), str(b.emoji, 8) || '🛒', int(b.sort, 1000), bool(b.active, true)]
  );
  return ok({ id }, isNew ? 201 : 200);
}

export async function handle(req, db) {
  const method = req.method.toUpperCase();
  const parts = req.path.replace(/^\/+|\/+$/g, '').split('/').map(decodeURIComponent);
  const [area, resource, id] = parts;
  const b = req.body && typeof req.body === 'object' ? req.body : {};

  // ─── Public ───
  if (area === 'market') {
    if (method === 'GET' && resource === 'catalog') {
      return { ...ok(await catalog(db, false)), headers: { 'cache-control': 'public, max-age=30' } };
    }

    if (method === 'GET' && resource === 'reviews') {
      const seller = str(req.query.seller);
      const product = str(req.query.product);
      if (!seller && !product) return fail(400, 'seller or product is required');
      const rows = await db.query(
        `select r.id, r.seller_id, r.product_id, r.rating, r.author_name, r.comment, r.created_at
           from reviews r join sellers s on s.id = r.seller_id and s.active
          where r.status = 'published'
            and ($1 = '' or r.seller_id = $1)
            and ($2 = '' or r.product_id = $2)
          order by r.created_at desc limit 100`,
        [seller, product]
      );
      return ok(rows);
    }

    if (method === 'POST' && resource === 'reviews') {
      if (str(b.website)) return ok({ ok: true }, 201); // honeypot: silently drop bots
      const ip = String(req.headers['x-forwarded-for'] ?? 'local').split(',')[0].trim();
      if (throttled(ip)) return fail(429, 'Too many reviews from this connection. Please try again later.');
      const rating = int(b.rating, 0);
      const author = str(b.author_name, 60);
      const comment = str(b.comment, 1000);
      if (rating < 1 || rating > 5) return fail(400, 'Please choose a rating from 1 to 5 stars');
      if (!author) return fail(400, 'Please enter your name');
      const seller = await db.query(`select 1 from sellers where id = $1 and active`, [str(b.seller_id)]);
      if (!seller.length) return fail(404, 'Villager not found');
      const product = str(b.product_id) || null;
      const rows = await db.query(
        `insert into reviews (seller_id, product_id, rating, author_name, comment)
         values ($1, (select id from products where id = $2), $3, $4, $5)
         returning id, seller_id, product_id, rating, author_name, comment, created_at`,
        [str(b.seller_id), product, rating, author, comment]
      );
      return ok(rows[0], 201);
    }

    if (method === 'GET' && resource === 'images' && /^\d+$/.test(id ?? '')) {
      const rows = await db.query(`select content_type, data from images where id = $1`, [id]);
      if (!rows.length) return fail(404, 'Not found');
      return {
        status: 200,
        body: Buffer.from(rows[0].data),
        headers: { 'content-type': rows[0].content_type, 'cache-control': 'public, max-age=31536000, immutable' },
      };
    }
    return fail(404, 'Not found');
  }

  // ─── CMS ───
  if (area === 'cms') {
    if (!isAdmin(req.headers)) return fail(403, 'Admin access required');

    if (method === 'GET' && resource === 'catalog') {
      const data = await catalog(db, true);
      const counts = await db.query(
        `select seller_id, count(*) filter (where status = 'hidden')::int as hidden from reviews group by seller_id`
      );
      return ok({ ...data, hiddenReviews: Object.fromEntries(counts.map((c) => [c.seller_id, c.hidden])) });
    }

    if (resource === 'sellers') {
      if (method === 'POST' && !id) return saveSeller(db, null, b, true);
      if (method === 'PUT' && id) {
        if (!(await db.query(`select 1 from sellers where id = $1`, [id])).length) return fail(404, 'Not found');
        return saveSeller(db, id, b, false);
      }
      if (method === 'DELETE' && id) {
        await db.query(`delete from sellers where id = $1`, [id]);
        return ok({ ok: true });
      }
    }

    if (resource === 'products') {
      if (method === 'POST' && !id) return saveProduct(db, null, b, true);
      if (method === 'PUT' && id) return saveProduct(db, id, b, false);
      if (method === 'DELETE' && id) {
        await db.query(`delete from products where id = $1`, [id]);
        return ok({ ok: true });
      }
    }

    if (resource === 'categories') {
      if (method === 'POST' && !id) return saveCategory(db, null, b, true);
      if (method === 'PUT' && id) return saveCategory(db, id, b, false);
    }

    // Set the full display order of villagers for one product.
    if (method === 'PUT' && resource === 'order' && id) {
      const ids = Array.isArray(b.seller_ids) ? b.seller_ids.map(String) : [];
      await db.tx(async (q) => {
        for (const [i, sid] of ids.entries()) {
          await q(`update listings set position = $1 where product_id = $2 and seller_id = $3`, [(i + 1) * 10, id, sid]);
        }
      });
      return ok({ ok: true });
    }

    if (method === 'PATCH' && resource === 'listings') {
      const rows = await db.query(
        `update listings set active = $3 where seller_id = $1 and product_id = $2 returning seller_id`,
        [str(b.seller_id), str(b.product_id), bool(b.active, true)]
      );
      return rows.length ? ok({ ok: true }) : fail(404, 'Not found');
    }

    if (resource === 'reviews') {
      if (method === 'GET') {
        const rows = await db.query(
          `select r.*, s.name_en as seller_name, p.name_en as product_name
             from reviews r join sellers s on s.id = r.seller_id left join products p on p.id = r.product_id
            order by r.created_at desc limit 500`
        );
        return ok(rows);
      }
      if (method === 'PATCH' && id) {
        const status = b.status === 'hidden' ? 'hidden' : 'published';
        await db.query(`update reviews set status = $2 where id = $1`, [int(id, 0), status]);
        return ok({ ok: true });
      }
      if (method === 'DELETE' && id) {
        await db.query(`delete from reviews where id = $1`, [int(id, 0)]);
        return ok({ ok: true });
      }
    }

    if (method === 'POST' && resource === 'images') {
      const type = str(b.content_type, 40);
      if (!/^image\/(jpeg|png|webp)$/.test(type)) return fail(400, 'Only JPEG, PNG or WebP images');
      const data = Buffer.from(String(b.data_base64 ?? ''), 'base64');
      if (!data.length || data.length > 1_500_000) return fail(400, 'Image must be under 1.5 MB');
      const rows = await db.query(`insert into images (content_type, data) values ($1, $2) returning id`, [type, data]);
      return ok({ url: `/api/market/images/${rows[0].id}` }, 201);
    }

    return fail(404, 'Not found');
  }

  return fail(404, 'Not found');
}
