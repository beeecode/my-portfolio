import sanitizeHtml from 'sanitize-html';
import { RICH_TEXT_TYPES, type PublishedElement, type PublishedPage } from './types';

const record = (value: unknown): value is Record<string, unknown> =>
  !!value && typeof value === 'object' && !Array.isArray(value);

export function safeUrl(value: string, image = false): boolean {
  const cleaned = value.trim();
  if (!cleaned || /[\u0000-\u0020\u007f\\]/.test(cleaned) || cleaned.startsWith('//')) return false;
  try {
    const url = new URL(cleaned, 'https://portfolio.invalid');
    return (image ? ['http:', 'https:'] : ['http:', 'https:', 'mailto:', 'tel:']).includes(url.protocol);
  } catch {
    return false;
  }
}

export function sanitizeRichText(value: string, inlineOnly = false): string {
  return sanitizeHtml(value, {
    // Block lists inside a heading/paragraph would make the browser repair the DOM,
    // causing hydration mismatches even though the markup is otherwise safe.
    allowedTags: inlineOnly ? ['b', 'strong', 'i', 'em', 'a', 'br'] : ['b', 'strong', 'i', 'em', 'a', 'ul', 'ol', 'li', 'br'],
    allowedAttributes: { a: ['href'] },
    allowedSchemes: ['http', 'https', 'mailto', 'tel'],
    allowProtocolRelative: false,
    nonTextTags: ['script', 'style', 'iframe', 'object', 'embed', 'svg', 'math', 'template', 'noscript'],
    transformTags: {
      a: (_tag, attributes) => ({ tagName: 'a', attribs: attributes.href && safeUrl(attributes.href) ? { href: attributes.href } : {} }),
    },
  });
}

/** Validate the public runtime envelope before it enters the cache or client props. */
export function parsePublishedPage(body: unknown, path: string): PublishedPage {
  if (!record(body) || body.success !== true || !record(body.data) || !record(body.data.page)) throw new Error('Invalid runtime envelope');
  const content = body.data.page;
  const page = content.page;
  const version = content.version;
  if (!record(page) || canonicalPath(String(page.path)) !== canonicalPath(path) || typeof page.title !== 'string' ||
      !record(version) || typeof version.id !== 'string' || typeof version.number !== 'number' || typeof version.checksum !== 'string' ||
      !Array.isArray(content.elements) || content.elements.length > 2000) throw new Error('Invalid published page');
  const optionalText = (value: unknown) => typeof value === 'string' ? value : null;
  const elements: PublishedElement[] = content.elements.map((entry: unknown) => {
    if (!record(entry) || typeof entry.dataManageullId !== 'string' || typeof entry.type !== 'string' ||
        !(entry.selector === null || typeof entry.selector === 'string') ||
        !(entry.currentValue === null || typeof entry.currentValue === 'string') ||
        typeof entry.isVisible !== 'boolean' ||
        ['contentChanged', 'attributesChanged', 'visibilityChanged'].some((field) => typeof entry[field] !== 'boolean')) {
      throw new Error('Invalid published element');
    }
    const attributes: Record<string, string> = {};
    if (record(entry.attributes)) {
      for (const key of ['src', 'href', 'alt']) {
        const value = entry.attributes[key];
        if (typeof value === 'string' && (key === 'alt' || safeUrl(value, key === 'src'))) attributes[key] = value;
      }
    }
    const value = entry.currentValue as string | null;
    return {
      dataManageullId: entry.dataManageullId,
      selector: entry.selector as string | null,
      type: entry.type,
      currentValue: value !== null && RICH_TEXT_TYPES.has(entry.type) ? sanitizeRichText(value, ['HEADING', 'PARAGRAPH'].includes(entry.type)) : value,
      attributes,
      isVisible: entry.isVisible,
      contentChanged: entry.contentChanged as boolean,
      attributesChanged: entry.attributesChanged as boolean,
      visibilityChanged: entry.visibilityChanged as boolean,
    };
  });
  return {
    page: {
      path: page.path as string,
      title: page.title,
      seoTitle: optionalText(page.seoTitle),
      seoDescription: optionalText(page.seoDescription),
      canonicalUrl: typeof page.canonicalUrl === 'string' && /^https?:\/\//.test(page.canonicalUrl) && safeUrl(page.canonicalUrl) ? page.canonicalUrl : null,
      language: typeof page.language === 'string' && /^[a-z]{2,3}(?:-[a-z0-9]{2,8})*$/i.test(page.language) ? page.language : 'en',
    },
    elements,
    version: { id: version.id, number: version.number, checksum: version.checksum },
  };
}

export function canonicalPath(path: string): string {
  return path.replace(/\/index\.(html?|php)$/, '/').replace(/\/$/, '') || '/';
}
