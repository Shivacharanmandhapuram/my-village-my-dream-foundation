// Dev only: serves /api/* from api/src/router.js against an embedded Postgres (PGlite, stored in .pglite/),
// and fakes Static Web Apps' /.auth endpoints so the CMS can be used locally as an admin.
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

  const devPrincipal = Buffer.from(
    JSON.stringify({ identityProvider: 'dev', userId: 'dev', userDetails: 'dev-admin@localhost', userRoles: ['anonymous', 'authenticated', 'admin'] })
  ).toString('base64');

  return {
    name: 'mvmd-dev-api',
    apply: 'serve',
    configureServer(server) {
      server.middlewares.use(async (req, res, next) => {
        const url = new URL(req.url ?? '/', 'http://localhost');

        if (url.pathname === '/.auth/me') {
          res.setHeader('content-type', 'application/json');
          return res.end(JSON.stringify({ clientPrincipal: JSON.parse(Buffer.from(devPrincipal, 'base64').toString()) }));
        }
        if (url.pathname.startsWith('/.auth/')) {
          res.statusCode = 302;
          res.setHeader('location', url.searchParams.get('post_login_redirect_uri') ?? url.searchParams.get('post_logout_redirect_uri') ?? '/');
          return res.end();
        }
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
              headers: { ...req.headers, 'x-ms-client-principal': devPrincipal },
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
