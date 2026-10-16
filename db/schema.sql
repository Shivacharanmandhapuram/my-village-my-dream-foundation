-- My Village My Dream — Village Market schema (Postgres 16)
-- Applied by scripts/db-setup.mjs. Safe to re-run.
-- Access control lives in the API (/api): public reads + review posting, admin-only writes.

create table if not exists categories (
  id       text primary key,                 -- slug, e.g. 'dairy-products'
  name_en  text not null,
  name_mr  text not null default '',
  emoji    text not null default '🛒',
  sort     int  not null default 0,
  active   boolean not null default true
);

create table if not exists products (
  id          text primary key,              -- slug, e.g. 'milk'
  category_id text not null references categories(id) on update cascade,
  name_en     text not null,
  name_mr     text not null default '',
  emoji       text not null default '🛒',
  image_url   text,                          -- general product photo (optional)
  description text not null default '',
  sort        int  not null default 0,
  active      boolean not null default true
);

create table if not exists sellers (
  id         text primary key,
  name_en    text not null,
  name_mr    text not null default '',
  phones     text[] not null default '{}',   -- 10-digit Indian mobiles
  village    text not null default '',
  about      text not null default '',
  photo_url  text,
  featured   boolean not null default false, -- pinned to the top of every product it sells
  active     boolean not null default true,  -- false = unlisted from the public market
  created_at timestamptz not null default now()
);

-- Which villager sells which product, and in what order they appear on that product's page.
create table if not exists listings (
  seller_id  text not null references sellers(id)  on delete cascade on update cascade,
  product_id text not null references products(id) on delete cascade on update cascade,
  position   int  not null default 100,       -- lower = higher up
  active     boolean not null default true,
  primary key (seller_id, product_id)
);

create table if not exists reviews (
  id          bigserial primary key,
  seller_id   text not null references sellers(id) on delete cascade,
  product_id  text references products(id) on delete set null,
  rating      int  not null check (rating between 1 and 5),
  author_name text not null check (char_length(author_name) between 1 and 60),
  comment     text not null default '' check (char_length(comment) <= 1000),
  status      text not null default 'published' check (status in ('published', 'hidden')),
  created_at  timestamptz not null default now()
);
create index if not exists reviews_seller_idx on reviews (seller_id, created_at desc);

-- Photos uploaded from the CMS (resized in the browser before upload, so they stay small).
create table if not exists images (
  id           bigserial primary key,
  content_type text  not null,
  data         bytea not null,
  created_at   timestamptz not null default now()
);
