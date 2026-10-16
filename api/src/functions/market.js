// Single catch-all HTTP function: /api/market/* (public) and /api/cms/* (admin).
import { app } from '@azure/functions';
import { handle } from '../router.js';
import { db } from '../db.js';

app.http('market', {
  methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE'],
  authLevel: 'anonymous',
  route: '{*path}',
  handler: async (request, context) => {
    const url = new URL(request.url);
    let body = null;
    if (!['GET', 'DELETE'].includes(request.method)) {
      try { body = await request.json(); } catch { body = null; }
    }
    try {
      const res = await handle(
        {
          method: request.method,
          path: url.pathname.replace(/^\/api/, ''),
          query: Object.fromEntries(url.searchParams),
          body,
          headers: Object.fromEntries(request.headers),
        },
        db
      );
      return res.json !== undefined
        ? { status: res.status, jsonBody: res.json, headers: res.headers }
        : { status: res.status, body: res.body, headers: res.headers };
    } catch (err) {
      context.error(err);
      return { status: 500, jsonBody: { error: 'Something went wrong. Please try again.' } };
    }
  },
});
