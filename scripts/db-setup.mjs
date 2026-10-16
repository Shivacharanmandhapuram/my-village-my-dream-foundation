// Applies db/schema.sql and db/seed.sql to the database in DATABASE_URL.
// Usage: DATABASE_URL='postgres://…' node scripts/db-setup.mjs
// Seed rows use "on conflict do nothing", so this never overwrites CMS edits.
import { readFileSync } from 'node:fs';
import { createRequire } from 'node:module';

const root = new URL('..', import.meta.url);
const pg = createRequire(new URL('api/package.json', root))('pg');
if (!process.env.DATABASE_URL) throw new Error('Set DATABASE_URL');

const client = new pg.Client({ connectionString: process.env.DATABASE_URL, ssl: { rejectUnauthorized: true } });
await client.connect();
for (const file of ['db/schema.sql', 'db/seed.sql']) {
  await client.query(readFileSync(new URL(file, root), 'utf8'));
  console.log(`applied ${file}`);
}
const [{ n }] = (await client.query('select count(*)::int as n from sellers')).rows;
console.log(`sellers in database: ${n}`);
await client.end();
