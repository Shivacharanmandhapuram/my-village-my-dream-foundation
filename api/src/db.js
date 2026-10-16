// Postgres access for the deployed API. DATABASE_URL is set in the Static Web App's app settings.
import pg from 'pg';

const pool = new pg.Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: process.env.DATABASE_URL?.includes('localhost') ? false : { rejectUnauthorized: true },
  max: 3,
  idleTimeoutMillis: 30_000,
});

export const db = {
  async query(text, params) {
    return (await pool.query(text, params)).rows;
  },
  async tx(fn) {
    const client = await pool.connect();
    try {
      await client.query('begin');
      const result = await fn(async (text, params) => (await client.query(text, params)).rows);
      await client.query('commit');
      return result;
    } catch (err) {
      await client.query('rollback');
      throw err;
    } finally {
      client.release();
    }
  },
};
