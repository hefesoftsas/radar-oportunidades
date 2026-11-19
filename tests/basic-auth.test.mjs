import test from 'node:test';
import assert from 'node:assert/strict';
import { spawn } from 'node:child_process';
import { mkdtemp, rm } from 'node:fs/promises';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { createServer, connect } from 'node:net';
import { DatabaseSync } from 'node:sqlite';
import { scryptSync } from 'node:crypto';
import http from 'node:http';

async function port() { const s = createServer(); await new Promise(r => s.listen(0, '127.0.0.1', r)); const p = s.address().port; await new Promise(r => s.close(r)); return p; }

test('Basic protege Radar y permite configurar una contraseña independiente', async t => {
  const data = await mkdtemp(join(tmpdir(), 'radar-basic-test-'));
  const db = new DatabaseSync(join(data, 'radar.sqlite'));
  db.exec('CREATE TABLE settings(k TEXT PRIMARY KEY,v TEXT NOT NULL)');
  const password = 'temporary-test-password', salt = 'test-salt';
  db.prepare('INSERT INTO settings VALUES (?, ?)').run('password', `${salt}:${scryptSync(password, salt, 32).toString('hex')}`);
  db.close();
  const normal = await port(), control = await port();
  let upstreamAuthorization;
  const browser = http.createServer();
  browser.on('upgrade', (request, socket) => { upstreamAuthorization = request.headers.authorization; socket.end('HTTP/1.1 101 Switching Protocols\r\nConnection: Upgrade\r\nUpgrade: websocket\r\n\r\n'); });
  await new Promise(r => browser.listen(0, '127.0.0.1', r));
  const child = spawn(process.execPath, ['--experimental-sqlite', 'server/server.mjs'], { env: { ...process.env, RADAR_DATA: data, PORT: String(normal), CONTROL_PORT: String(control), RADAR_BASIC_USER: 'radar', BROWSER_VNC_URL: `http://127.0.0.1:${browser.address().port}`, OPENCODE_API_KEY: '' }, stdio: 'ignore' });
  t.after(async () => { if (child.exitCode === null) { child.kill('SIGTERM'); await new Promise(r => child.once('exit', r)); } await new Promise(r => browser.close(r)); await rm(data, { recursive: true, force: true }); });
  const base = `http://127.0.0.1:${control}`;
  for (let i = 0; i < 100; i++) { try { if ((await fetch(base + '/api/status')).ok) break; } catch {} await new Promise(r => setTimeout(r, 50)); }
  let res = await fetch(base + '/');
  assert.equal(res.status, 401);
  assert.match(res.headers.get('www-authenticate'), /^Basic /i);
  assert.equal((await fetch(base + '/api/status', { headers: { 'x-forwarded-proto': 'https' } })).status, 401);
  const authorization = (user, pass) => 'Basic ' + Buffer.from(`${user}:${pass}`).toString('base64');
  assert.equal((await fetch(base + '/', { headers: { authorization: authorization('radar', 'wrong') } })).status, 401);
  assert.equal((await fetch(base + '/', { headers: { authorization: authorization('other', password) } })).status, 401);
  const auth = authorization('radar', password);
  assert.equal((await fetch(base + '/', { headers: { authorization: auth } })).status, 200);
  assert.equal((await fetch(base + '/api/jobs', { headers: { authorization: auth } })).status, 401);
  res = await fetch(base + '/api/login', { method: 'POST', headers: { authorization: auth, 'content-type': 'application/json' }, body: JSON.stringify({ password }) });
  assert.equal(res.status, 200);
  const cookie = res.headers.get('set-cookie').split(';')[0];
  assert.equal((await fetch(base + '/api/jobs', { headers: { authorization: auth, cookie } })).status, 200);
  assert.equal((await fetch(base + '/api/jobs', { headers: { cookie } })).status, 401);
  assert.equal((await fetch(base + '/browser', { headers: { cookie }, redirect: 'manual' })).status, 401);
  assert.equal((await fetch(base + '/browser', { headers: { authorization: auth, cookie }, redirect: 'manual' })).status, 302);
  assert.equal((await fetch(base + '/basic-setup', { headers: { authorization: auth, cookie } })).status, 200);
  const newPassword = 'independent-test-password';
  assert.equal((await fetch(base + '/api/basic-setup', { method: 'POST', headers: { authorization: auth, 'content-type': 'application/json' }, body: JSON.stringify({ password: newPassword }) })).status, 401);
  assert.equal((await fetch(base + '/api/basic-setup', { method: 'POST', headers: { authorization: auth, cookie, origin: 'https://evil.invalid', 'content-type': 'application/json' }, body: JSON.stringify({ password: newPassword }) })).status, 403);
  assert.equal((await fetch(base + '/api/basic-setup', { method: 'POST', headers: { authorization: auth, cookie, 'content-type': 'application/json' }, body: JSON.stringify({ password }) })).status, 400);
  assert.equal((await fetch(base + '/api/basic-setup', { method: 'POST', headers: { authorization: auth, cookie, 'content-type': 'application/json' }, body: JSON.stringify({ password: newPassword }) })).status, 200);
  assert.equal((await fetch(base + '/', { headers: { authorization: auth } })).status, 401);
  const independentAuth = authorization('radar', newPassword);
  assert.equal((await fetch(base + '/', { headers: { authorization: independentAuth } })).status, 200);
  assert.equal((await fetch(base + '/api/jobs', { headers: { authorization: independentAuth, cookie } })).status, 200);
  assert.equal((await fetch(base + '/api/basic-setup', { method: 'POST', headers: { authorization: independentAuth, cookie, 'content-type': 'application/json' }, body: JSON.stringify({ password: newPassword }) })).status, 409);
  const upgrade = await new Promise((resolve, reject) => {
    const socket = connect(control, '127.0.0.1', () => socket.write(`GET /browser/websockify HTTP/1.1\r\nHost: 127.0.0.1:${control}\r\nConnection: Upgrade\r\nUpgrade: websocket\r\nCookie: ${cookie}\r\n\r\n`));
    socket.once('data', data => { resolve(data.toString()); socket.destroy(); });
    socket.once('error', reject);
  });
  assert.match(upgrade, /^HTTP\/1\.1 401/);
  const authorizedUpgrade = await new Promise((resolve, reject) => {
    const socket = connect(control, '127.0.0.1', () => socket.write(`GET /browser/websockify HTTP/1.1\r\nHost: 127.0.0.1:${control}\r\nConnection: Upgrade\r\nUpgrade: websocket\r\nAuthorization: ${independentAuth}\r\nCookie: ${cookie}\r\n\r\n`));
    socket.once('data', data => { resolve(data.toString()); socket.destroy(); });
    socket.once('error', reject);
  });
  assert.match(authorizedUpgrade, /^HTTP\/1\.1 101/);
  assert.equal(upstreamAuthorization, undefined);
});
