import test from 'node:test';
import assert from 'node:assert/strict';
import { mkdtemp, writeFile, symlink, readFile, rm, chmod, lstat } from 'node:fs/promises';
import { tmpdir } from 'node:os';
import { join, resolve } from 'node:path';
import { spawn, spawnSync } from 'node:child_process';

const hasFlock = spawnSync('flock', ['--version']).status === 0;
const launch = resolve('browser/launch-profile.sh');
const pause = ms => new Promise(resolve => setTimeout(resolve, ms));

test('browser deployments take turns using the persistent profile', { skip: !hasFlock, timeout: 15000 }, async () => {
  const dir = await mkdtemp(join(tmpdir(), 'radar-profile-test-'));
  const events = join(dir, 'events');
  const fakeBrowser = join(dir, 'browser');
  const children = [];
  try {
    await writeFile(join(dir, 'profile-data'), 'keep');
    for (const name of ['SingletonLock', 'SingletonSocket', 'SingletonCookie']) await symlink('stale', join(dir, name));
    await writeFile(fakeBrowser, '#!/bin/sh\necho "$INSTANCE" >> "$RADAR_PROFILE_DIR/events"\ntrap "exit 0" TERM INT\nwhile :; do sleep 0.1; done\n');
    await chmod(fakeBrowser, 0o755);
    const start = instance => {
      const child = spawn('sh', [launch], { env: { ...process.env, INSTANCE: instance, RADAR_PROFILE_DIR: dir, RADAR_CHROMIUM_BIN: fakeBrowser }, stdio: 'ignore' });
      children.push(child);
      return child;
    };
    const waitFor = async expected => {
      for (let i = 0; i < 100; i++) {
        const output = await readFile(events, 'utf8').catch(() => '');
        if (output.includes(expected)) return output;
        await pause(50);
      }
      assert.fail(`browser ${expected} did not start`);
    };
    const first = start('first');
    await waitFor('first');
    start('second');
    await pause(400);
    assert.equal(await readFile(events, 'utf8'), 'first\n');
    first.kill('SIGTERM');
    assert.equal(await waitFor('second'), 'first\nsecond\n');
    assert.equal(await readFile(join(dir, 'profile-data'), 'utf8'), 'keep');
    for (const name of ['SingletonLock', 'SingletonSocket', 'SingletonCookie']) await assert.rejects(lstat(join(dir, name)), { code: 'ENOENT' });
  } finally {
    for (const child of children) if (child.exitCode === null && child.signalCode === null) child.kill('SIGTERM');
    await Promise.all(children.map(child => child.exitCode === null && child.signalCode === null ? new Promise(resolve => child.once('exit', resolve)) : undefined));
    await rm(dir, { recursive: true, force: true });
  }
});
