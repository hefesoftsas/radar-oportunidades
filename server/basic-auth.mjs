import { createHash, scryptSync, timingSafeEqual } from 'node:crypto';

const valid = new Map();
let failures = [];

export function verifyPassword(password, saved) {
  try {
    const [salt, digest] = String(saved || '').split(':');
    if (!salt || !/^[a-f0-9]{64}$/.test(digest)) return false;
    return timingSafeEqual(scryptSync(password, salt, 32), Buffer.from(digest, 'hex'));
  } catch { return false; }
}

export function checkBasic(req, getSetting) {
  const username = process.env.RADAR_BASIC_USER;
  if (!username) return true;
  const authorization = String(req.headers.authorization || '');
  const saved = getSetting('basic_password') || getSetting('password');
  if (!saved || !/^Basic [A-Za-z0-9+/]+={0,2}$/i.test(authorization) || authorization.length > 1024) return false;
  const cacheKey = createHash('sha256').update(saved).update('\0').update(authorization).digest('hex');
  if ((valid.get(cacheKey) || 0) > Date.now()) return true;
  failures = failures.filter(t => Date.now() - t < 60000);
  if (failures.length >= 12) return false;
  const decoded = Buffer.from(authorization.slice(6), 'base64').toString('utf8');
  const separator = decoded.indexOf(':');
  if (separator < 0 || decoded.slice(0, separator) !== username || !verifyPassword(decoded.slice(separator + 1), saved)) {
    failures.push(Date.now());
    return false;
  }
  if (valid.size >= 128) valid.clear();
  valid.set(cacheKey, Date.now() + 5 * 60 * 1000);
  return true;
}

export function basicChallenge(res) {
  res.writeHead(401, { 'WWW-Authenticate': 'Basic realm="Radar", charset="UTF-8"', 'Cache-Control': 'no-store' });
  res.end('Autenticación requerida.');
}
