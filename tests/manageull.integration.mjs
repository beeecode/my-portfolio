import assert from 'node:assert/strict';
import { createHmac } from 'node:crypto';
import { spawn } from 'node:child_process';
import { createServer } from 'node:http';
import { setTimeout as delay } from 'node:timers/promises';

// Exercises the built Next server, its persistent cache, and the real webhook route.
// All publishing data is served locally; this never writes to a Manageull account.
let revision = 1;
let upstreamStatus = 200;
let reads = 0;
const upstream = createServer((_request, response) => {
  reads++;
  response.writeHead(upstreamStatus, { 'content-type': 'application/json' });
  response.end(JSON.stringify({ success: true, data: { page: {
    page: { path: '/', title: 'Portfolio', seoTitle: `Published SEO ${revision}`, seoDescription: 'Published description', canonicalUrl: 'https://example.com/', language: 'en' },
    version: { id: `v${revision}`, number: revision, checksum: `test-${revision}` },
    elements: [{ dataManageullId: 'hero-heading', selector: '[id="hero"] > div:nth-of-type(1) > div:nth-of-type(3) > div:nth-of-type(1) > h1:nth-of-type(1)',
      type: 'HEADING', currentValue: `Published revision <strong>${revision}</strong>`, attributes: {}, isVisible: true,
      contentChanged: true, attributesChanged: false, visibilityChanged: false }],
  } } }));
});
await new Promise((resolve) => upstream.listen(0, '127.0.0.1', resolve));
const upstreamPort = upstream.address().port;
const portProbe = createServer();
await new Promise((resolve) => portProbe.listen(0, '127.0.0.1', resolve));
const appPort = portProbe.address().port;
await new Promise((resolve) => portProbe.close(resolve));
const origin = `http://127.0.0.1:${appPort}`;
const secret = 'local-integration-test-secret';
let output = '';
const app = spawn(process.execPath, ['node_modules/next/dist/bin/next', 'start', '--port', String(appPort), '--hostname', '127.0.0.1'], {
  windowsHide: true,
  env: { ...process.env, MANAGEULL_API_ORIGIN: `http://127.0.0.1:${upstreamPort}`, MANAGEULL_SITE_KEY: `test-${upstreamPort}`,
    MANAGEULL_SITE_ID: 'test-site', MANAGEULL_WEBHOOK_SECRET: secret },
  stdio: ['ignore', 'pipe', 'pipe'],
});
app.stdout.on('data', (data) => { output += data; });
app.stderr.on('data', (data) => { output += data; });

async function publish(event = 'release.published', overrides = {}, signatureOverride) {
  const body = JSON.stringify({ schemaVersion: 1, event, siteId: 'test-site', releaseId: `r${revision}`, pageIds: ['home'], pages: [], deliveredAt: new Date().toISOString(), ...overrides });
  return fetch(`${origin}/api/manageull/revalidate`, {
    method: 'POST', headers: { 'content-type': 'application/json', 'x-manageull-signature': signatureOverride ?? `sha256=${createHmac('sha256', secret).update(body).digest('hex')}` }, body,
  });
}
async function html() {
  const response = await fetch(origin, { headers: { 'user-agent': 'Googlebot' } });
  assert.equal(response.status, 200);
  return response.text();
}
try {
  const deadline = Date.now() + 45_000;
  while (true) {
    if (app.exitCode !== null) throw new Error(`Next exited early: ${output}`);
    try { await fetch(`${origin}/api/manageull/revalidate`); break; } catch {
      if (Date.now() > deadline) throw new Error(`Next did not start: ${output}`);
      await delay(250);
    }
  }
  let source = await html();
  assert.match(source, /<h1[^>]*>Published revision <strong>1<\/strong><\/h1>/);
  assert.match(source, /<title>Published SEO 1<\/title>/);
  assert.match(source, /name="manageull-site-verification"/);
  assert.doesNotMatch(source, /<script[^>]+src="[^\"]*\/runtime\/script/);
  assert.doesNotMatch(source, new RegExp(secret));
  const initialReads = reads;
  revision = 2;
  assert.match(await html(), /<h1[^>]*>Published revision <strong>1<\/strong><\/h1>/);
  assert.equal(reads, initialReads, 'warm cache should not fetch again');
  assert.equal((await publish('connection.test')).status, 200);
  assert.equal((await publish('release.published', {}, 'sha256=invalid')).status, 401);
  assert.equal((await publish('release.published', { siteId: 'other-site' })).status, 400);
  assert.equal((await publish('release.published', { deliveredAt: '2000-01-01T00:00:00Z' })).status, 400);
  assert.equal((await publish()).status, 200);
  source = await html();
  assert.match(source, /<h1[^>]*>Published revision <strong>2<\/strong><\/h1>/);
  assert.match(source, /<title>Published SEO 2<\/title>/);
  revision = 1;
  assert.equal((await publish('release.rolled_back')).status, 200);
  assert.match(await html(), /<h1[^>]*>Published revision <strong>1<\/strong><\/h1>/);
  upstreamStatus = 404;
  await publish();
  assert.match(await html(), /SHERIF\/\//, 'unpublishing should restore defaults');
  upstreamStatus = 500;
  await publish();
  assert.match(await html(), /SHERIF\/\//, 'cold failure should render defaults');
  upstreamStatus = 200;
  revision = 3;
  assert.match(await html(), /<h1[^>]*>Published revision <strong>3<\/strong><\/h1>/, 'failed fallback must not poison cache');
  console.log('PASS: production SSR, SEO, cache reuse, publish, rollback, authentication, unpublish, outage and recovery.');
} catch (error) {
  console.error(output);
  throw error;
} finally {
  app.kill();
  upstream.closeAllConnections();
  await new Promise((resolve) => upstream.close(resolve));
}
