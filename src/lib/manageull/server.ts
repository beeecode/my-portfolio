import 'server-only';
import { cache } from 'react';
import { unstable_cache } from 'next/cache';
import { MANAGEULL_CACHE_TAG, manageullConfig } from './config';
import { parsePublishedPage } from './sanitize';
import type { PublishedPage } from './types';

const readPublishedPage = unstable_cache(async (origin: string, siteKey: string, path: string): Promise<PublishedPage | null> => {
  const url = new URL(`/runtime/site/${encodeURIComponent(siteKey)}/content`, origin);
  url.searchParams.set('path', path);
  const response = await fetch(url, {
    cache: 'no-store',
    headers: { Accept: 'application/json' },
    signal: AbortSignal.timeout(8000),
    redirect: 'error',
  });
  // An unpublished page must clear any previously published overrides.
  if (response.status === 404) return null;
  if (!response.ok) throw new Error(`Runtime HTTP ${response.status}`);
  return parsePublishedPage(await response.json(), path);
}, ['manageull-published-v1'], { revalidate: 60, tags: [MANAGEULL_CACHE_TAG] });

// Metadata, layout and page share one snapshot per request. Failed reads are not cached
// as successful fallback content; Next keeps its previous successful cache on refresh failure.
export const getPublishedPage = cache(async (path = '/'): Promise<PublishedPage | null> => {
  try {
    return await readPublishedPage(manageullConfig.origin, manageullConfig.siteKey, path);
  } catch {
    console.warn('[manageull] Published content unavailable; rendering portfolio defaults.');
    return null;
  }
});
