// CMS login: one shared password (app setting CMS_PASSWORD) → signed, HttpOnly session cookie.
// Sessions are HMAC-signed with CMS_SESSION_SECRET + the password, so changing the password logs everyone out.
// Failed logins are recorded in Postgres so the lockout holds across function instances.
import { createHmac, timingSafeEqual } from 'node:crypto';

const COOKIE = 'mvmd_cms';
const SESSION_DAYS = 30;
const WINDOW_MIN = 15;
const MAX_FAILS_PER_IP = 5;
const MAX_FAILS_TOTAL = 30; // guessing from many devices locks the CMS for everyone for 15 minutes

const password = () => process.env.CMS_PASSWORD ?? '';
const signingKey = () => `${process.env.CMS_SESSION_SECRET ?? ''}:${password()}`;
const sign = (payload) => createHmac('sha256', signingKey()).update(payload).digest('base64url');

const safeEqual = (a, b) => {
  const x = Buffer.from(String(a));
  const y = Buffer.from(String(b));
  return x.length === y.length && timingSafeEqual(x, y);
};

function readCookie(headers, name) {
  for (const part of String(headers.cookie ?? '').split(';')) {
    const [k, ...v] = part.trim().split('=');
    if (k === name) return v.join('=');
  }
  return '';
}

const cookie = (value, maxAge) =>
  `${COOKIE}=${value}; Path=/; HttpOnly; Secure; SameSite=Strict; Max-Age=${maxAge}`;

export function isAdmin(headers) {
  if (!password() || !process.env.CMS_SESSION_SECRET) return false;
  const [expires, sig] = readCookie(headers, COOKIE).split('.');
  return !!expires && !!sig && Number(expires) > Date.now() && safeEqual(sig, sign(expires));
}

export const clientIp = (headers) =>
  String(headers['x-forwarded-for'] ?? headers['x-client-ip'] ?? 'local').split(',')[0].trim().replace(/:\d+$/, '');

export async function login(db, headers, body) {
  if (!password() || !process.env.CMS_SESSION_SECRET) {
    return { status: 503, json: { error: 'CMS password is not configured yet.' } };
  }
  await db.query(`create table if not exists cms_login_failures (ip text not null, at timestamptz not null default now())`);
  await db.query(`delete from cms_login_failures where at < now() - interval '1 day'`);

  const ip = clientIp(headers);
  const [{ mine, total }] = await db.query(
    `select count(*) filter (where ip = $1)::int as mine, count(*)::int as total
       from cms_login_failures where at > now() - make_interval(mins => $2)`,
    [ip, WINDOW_MIN]
  );
  if (mine >= MAX_FAILS_PER_IP || total >= MAX_FAILS_TOTAL) {
    return { status: 429, json: { error: `Too many wrong attempts. Try again in ${WINDOW_MIN} minutes.` } };
  }

  if (!safeEqual(String(body?.password ?? ''), password())) {
    await db.query(`insert into cms_login_failures (ip) values ($1)`, [ip]);
    await new Promise((r) => setTimeout(r, 800)); // slow down guessing
    return { status: 401, json: { error: 'Wrong password.' } };
  }

  await db.query(`delete from cms_login_failures where ip = $1`, [ip]);
  const expires = String(Date.now() + SESSION_DAYS * 86_400_000);
  return {
    status: 200,
    json: { ok: true },
    headers: { 'set-cookie': cookie(`${expires}.${sign(expires)}`, SESSION_DAYS * 86_400) },
  };
}

export const logout = () => ({ status: 200, json: { ok: true }, headers: { 'set-cookie': cookie('', 0) } });
