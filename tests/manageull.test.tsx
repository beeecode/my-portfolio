import assert from 'node:assert/strict';
import { createHmac } from 'node:crypto';
import { test } from 'node:test';
import { renderToStaticMarkup } from 'react-dom/server';
import { PublishedContentProvider, PublishedTree } from '../src/components/manageull/PublishedContent';
import HeroSection from '../src/components/HeroSection';
import AboutSection from '../src/components/AboutSection';
import ProjectsSection from '../src/components/ProjectsSection';
import SkillsSection from '../src/components/SkillsSection';
import ExperienceSection from '../src/components/ExperienceSection';
import ContactSection from '../src/components/ContactSection';
import { parsePublishedPage, safeUrl, sanitizeRichText } from '../src/lib/manageull/sanitize';
import { validateWebhook, verifyWebhook } from '../src/lib/manageull/webhook';
import type { PublishedElement, PublishedPage } from '../src/lib/manageull/types';

const element = (selector: string, overrides: Partial<PublishedElement> = {}): PublishedElement => ({
  dataManageullId: 'test-element', selector, type: 'HEADING', currentValue: 'Published <strong>content</strong>',
  attributes: {}, isVisible: true, contentChanged: true, attributesChanged: false, visibilityChanged: false, ...overrides,
});
const page = (elements: PublishedElement[] = []): PublishedPage => ({
  page: { path: '/', title: 'Portfolio', seoTitle: null, seoDescription: null, canonicalUrl: null, language: 'en' },
  elements, version: { id: 'v1', number: 1, checksum: 'checksum' },
});
const render = (Component: typeof HeroSection, elements: PublishedElement[] = []) =>
  renderToStaticMarkup(<PublishedContentProvider page={page(elements)}><Component /></PublishedContentProvider>);

test('existing published hero selector is applied in the server HTML', () => {
  const html = render(HeroSection, [element('[id="hero"] > div:nth-of-type(1) > div:nth-of-type(3) > div:nth-of-type(1) > h1:nth-of-type(1)')]);
  assert.match(html, /Published <strong>content<\/strong>/);
  assert.doesNotMatch(html, /SHERIF\/\//);
});

test('composite labels retain their DOM position for every section', () => {
  for (const [Component, id] of [[AboutSection, 'about'], [ProjectsSection, 'projects'], [SkillsSection, 'skills'], [ExperienceSection, 'experience'], [ContactSection, 'contact']] as const) {
    const html = render(Component, [element(`[id="${id}"] > div:nth-of-type(1) > span:nth-of-type(1)`, { type: 'PARAGRAPH', currentValue: 'Published label' })]);
    assert.match(html, /Published label/, id);
  }
});

test('mapped project cards match the original crawler paths and retain safe links', () => {
  const base = '[id="projects"] > div:nth-of-type(2) > a:nth-of-type(2)';
  const html = render(ProjectsSection, [
    element(`${base} > div:nth-of-type(1) > div:nth-of-type(2) > h3:nth-of-type(1)`, { currentValue: 'Updated project' }),
    element(base, { type: 'LINK', contentChanged: false, attributesChanged: true, attributes: { href: 'https://example.com/project' } }),
    element(`${base} > div:nth-of-type(1) > div:nth-of-type(1) > img:nth-of-type(1)`, { type: 'IMAGE', contentChanged: false, attributesChanged: true, attributes: { src: '/updated.png', alt: 'Updated preview' } }),
  ]);
  assert.match(html, /Updated project/);
  assert.match(html, /href="https:\/\/example.com\/project"/);
  assert.match(html, /src="\/updated.png" alt="Updated preview"/);
  assert.match(html, /F1 \| Landing Page/);
});

test('nested repeated experience items resolve without flattening other items', () => {
  const html = render(ExperienceSection, [element('[id="experience"] > div:nth-of-type(2) > div:nth-of-type(2) > div:nth-of-type(2) > div:nth-of-type(2) > ul:nth-of-type(1) > li:nth-of-type(2)', { type: 'LIST', currentValue: 'Published experience' })]);
  assert.match(html, /Published experience/);
  assert.match(html, /Building responsive app interfaces/);
});

test('unchanged snapshots preserve original formatting and functional contact inputs', () => {
  const baseline = render(AboutSection);
  assert.equal(render(AboutSection, [element('[id="about"] > div:nth-of-type(2) > div:nth-of-type(1) > div:nth-of-type(1) > h2:nth-of-type(1)', { contentChanged: false })]), baseline);
  const contact = render(ContactSection);
  assert.match(contact, /type="email"/);
  assert.match(contact, /<textarea/);
  assert.match(contact, /type="submit"/);
});

test('visibility overrides beat display utility classes and support showing again', () => {
  const selector = '[id="projects"] > div:nth-of-type(2) > a:nth-of-type(1)';
  const hidden = render(ProjectsSection, [element(selector, { contentChanged: false, visibilityChanged: true, isVisible: false })]);
  assert.match(hidden, /display:none/);
  const visible = render(ProjectsSection, [element(selector, { contentChanged: false, visibilityChanged: true, isVisible: true })]);
  assert.doesNotMatch(visible, /display:none/);
});

test('published button copy does not replace a live form loading state', () => {
  const html = renderToStaticMarkup(
    <PublishedContentProvider page={page([element('button', { type: 'BUTTON', currentValue: 'Contact me' })])}>
      <PublishedTree rootPath="button"><button disabled data-manageull-preserve-content>Sending...</button></PublishedTree>
    </PublishedContentProvider>,
  );
  assert.match(html, /Sending\.\.\./);
  assert.doesNotMatch(html, /Contact me/);
});

test('rich HTML uses an allowlist and rejects executable markup and URL obfuscation', () => {
  const clean = sanitizeRichText('<script>alert(1)</script><svg><a>bad</a></svg><b onclick="x()">Bold</b><a href="javascript:alert(1)">link</a><br><em>Fine</em>');
  assert.equal(clean, '<b>Bold</b><a>link</a><br /><em>Fine</em>');
  for (const url of ['javascript:alert(1)', 'java\tscript:alert(1)', '//evil.example', '/\\evil.example', 'data:text/html,hi']) assert.equal(safeUrl(url), false, url);
  assert.equal(safeUrl('/img001.png'), true);
  assert.equal(safeUrl('mailto:hello@example.com'), true);
  assert.equal(safeUrl('mailto:hello@example.com', true), false);
  assert.equal(sanitizeRichText('Copy<ul><li>Item</li></ul>', true), 'CopyItem');
});

test('runtime validation sanitizes before caching and rejects a wrong route or malformed response', () => {
  const raw = page([element('h1', { currentValue: '<b onclick="bad()">Safe</b>', attributes: { src: 'javascript:bad()', href: '/projects', style: 'display:none' } })]);
  const parsed = parsePublishedPage({ success: true, data: { page: raw } }, '/');
  assert.equal(parsed.elements[0].currentValue, '<b>Safe</b>');
  assert.deepEqual(parsed.elements[0].attributes, { href: '/projects' });
  assert.throws(() => parsePublishedPage({ success: true, data: { page: raw } }, '/other'));
  assert.throws(() => parsePublishedPage({ success: true, data: { page: {} } }, '/'));
  assert.throws(() => parsePublishedPage({ success: true, data: { page: { ...raw, elements: [{}] } } }, '/'));
});

test('webhooks authenticate exact bytes and reject tampering and malformed signatures', () => {
  const body = '{"event":"release.published"}';
  const secret = 'test-secret';
  const signature = `sha256=${createHmac('sha256', secret).update(body).digest('hex')}`;
  assert.equal(verifyWebhook(body, signature, secret), true);
  assert.equal(verifyWebhook(`${body} `, signature, secret), false);
  assert.equal(verifyWebhook(body, signature, 'wrong-secret'), false);
  for (const candidate of [null, '', 'sha256=bad', 'a'.repeat(1000)]) assert.equal(verifyWebhook(body, candidate, secret), false);
});

test('webhooks accept publish, rollback and connection checks only for this site within five minutes', () => {
  const now = Date.now();
  const payload = { schemaVersion: 1, event: 'release.published', siteId: 'site-1', releaseId: 'r1', pageIds: ['p1'], deliveredAt: new Date(now).toISOString() };
  assert.equal(validateWebhook(payload, 'site-1', now), 'publish');
  assert.equal(validateWebhook({ ...payload, event: 'release.rolled_back' }, 'site-1', now), 'publish');
  assert.equal(validateWebhook({ ...payload, event: 'connection.test' }, 'site-1', now), 'connection.test');
  assert.equal(validateWebhook(payload, 'other-site', now), null);
  assert.equal(validateWebhook(payload, 'site-1', now + 301_000), null);
  assert.equal(validateWebhook({ ...payload, event: 'draft.saved' }, 'site-1', now), null);
});
