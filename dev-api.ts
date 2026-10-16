// Dev only: serves /api/* from api/src/router.js against an embedded Postgres (PGlite, stored in .pglite/).
// The local CMS password is "admin" unless CMS_PASSWORD is set in your shell.
import type { Plugin } from 'vite';
import { readFileSync } from 'node:fs';
import path from 'node:path';

export function devApi(): Plugin {
  let dbPromise: Promise<any> | null = null;
  const root = __dirname;

  const getDb = () =>
    (dbPromise ??= (async () => {
      const { PGlite } = await import('@electric-sql/pglite');
      const pg = new PGlite(path.join(root, '.pglite'));
      await pg.exec(readFileSync(path.join(root, 'db/schema.sql'), 'utf8'));
      await pg.exec(readFileSync(path.join(root, 'db/seed.sql'), 'utf8'));
      const query = async (text: string, params?: unknown[]) => (await pg.query(text, params)).rows;
      return {
        query,
        tx: (fn: any) => pg.transaction((t: any) => fn(async (text: string, params?: unknown[]) => (await t.query(text, params)).rows)),
      };
    })());

  process.env.CMS_PASSWORD ??= 'admin';
  process.env.CMS_SESSION_SECRET ??= 'local-dev-only';

  return {
    name: 'mvmd-dev-api',
    apply: 'serve',
    configureServer(server) {
      server.middlewares.use(async (req, res, next) => {
        const url = new URL(req.url ?? '/', 'http://localhost');

        if (!url.pathname.startsWith('/api/')) return next();

        try {
          const chunks: Buffer[] = [];
          for await (const c of req) chunks.push(c as Buffer);
          const raw = Buffer.concat(chunks).toString('utf8');
          const { handle } = await server.ssrLoadModule('/api/src/router.js');
          const out = await handle(
            {
              method: req.method ?? 'GET',
              path: url.pathname.replace(/^\/api/, ''),
              query: Object.fromEntries(url.searchParams),
              body: raw ? JSON.parse(raw) : null,
              headers: req.headers,
            },
            await getDb()
          );
          res.statusCode = out.status;
          for (const [k, v] of Object.entries(out.headers ?? {})) res.setHeader(k, v as string);
          if (out.json !== undefined) {
            res.setHeader('content-type', 'application/json');
            res.end(JSON.stringify(out.json));
          } else res.end(out.body);
        } catch (err) {
          console.error(err);
          res.statusCode = 500;
          res.end(JSON.stringify({ error: String(err) }));
        }
      });
    },
  };
}
