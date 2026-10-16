# My Village My Dream Foundation — website

React 19 + Vite site for the MVMD NGO (Chandrapur / Wardha, Maharashtra), with a **Village Market**:
a directory where buyers find villagers selling milk, grains, home-made foods, tailoring and services,
then call or WhatsApp them directly. No cart, no payments, no inventory.

## Run locally

```bash
npm install && (cd api && npm install)
npm run dev            # http://localhost:3000
```

`npm run dev` also serves the API (`/api/*`) from an embedded Postgres (PGlite, stored in `.pglite/`),
seeded from `db/seed.sql`. Locally you are always an admin: open `http://localhost:3000/admin`.
Delete `.pglite/` to reset local data.

## Village Market

| Page | URL |
|---|---|
| All categories + search | `/#/market` |
| Product (villagers selling it, call/WhatsApp, reviews) | `/#/market/milk` |
| Villager profile + all their reviews | `/#/market/villager/<id>` |
| CMS (villagers, products, priority order, review moderation) | `/admin` |

**Ordering on a product page:** villagers marked *Recommended* come first, then the order set in
CMS → *Priority order*. **Unlisting:** switch off *Listed* (whole villager) or *Shown* (one product only).
Reviews publish immediately; admins can hide or delete them.

## Architecture

```
Azure Static Web App
├── /            Vite build (dist/)
├── /api/*       Azure Functions (api/) — one catch-all function, routing in api/src/router.js
│   ├── /api/market/*   public: catalog, reviews, images
│   └── /api/cms/*      admin role only (staticwebapp.config.json + checked again in code)
└── /.auth/*     built-in sign-in (Microsoft / GitHub); admins are invited with role "admin"
        │
        ▼
Azure Database for PostgreSQL — database `mvmd` (schema: db/schema.sql)
```

Uploaded photos are resized in the browser and stored in Postgres (`images` table), served from
`/api/market/images/<id>` with long-lived caching.

## Data

- `db/seed-source.txt` — the villager/product list as received. Edit, then `node scripts/build-seed.mjs`.
- `db/seed.sql` — generated. Inserts never overwrite rows, so re-seeding is safe after CMS edits.
- `DATABASE_URL='postgres://…' node scripts/db-setup.mjs` — applies schema + seed to a real database.

## Deploy (Azure Static Web Apps)

- App location `/`, output `dist`, API location `api`.
- App setting `DATABASE_URL` = connection string for the `mvmd` database (`?sslmode=require`).
- Give someone CMS access: `az staticwebapp users invite -n <app> --authentication-provider aad --user-details <email> --roles admin --domain <host> --invitation-expiration-in-hours 168`
