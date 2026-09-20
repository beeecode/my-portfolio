import { createHmac, timingSafeEqual } from 'node:crypto';

export function verifyWebhook(body: string, signature: string | null, secret: string): boolean {
  if (!secret || !signature || !/^sha256=[a-f0-9]{64}$/.test(signature)) return false;
  const expected = `sha256=${createHmac('sha256', secret).update(body).digest('hex')}`;
  return timingSafeEqual(Buffer.from(expected), Buffer.from(signature));
}

export function validateWebhook(value: unknown, siteId: string, now = Date.now()): 'connection.test' | 'publish' | null {
  if (!value || typeof value !== 'object') return null;
  const payload = value as Record<string, unknown>;
  if (payload.schemaVersion !== 1 || payload.siteId !== siteId || typeof payload.deliveredAt !== 'string') return null;
  const timestamp = Date.parse(payload.deliveredAt);
  if (!Number.isFinite(timestamp) || Math.abs(now - timestamp) > 5 * 60 * 1000) return null;
  if (payload.event === 'connection.test') return 'connection.test';
  if (!['release.published', 'release.rolled_back'].includes(String(payload.event)) || typeof payload.releaseId !== 'string' || !payload.releaseId) return null;
  // Invalidate our known portfolio route only, never arbitrary paths from a request.
  // pageIds are supported for older Manageull senders that predate the pages field.
  if (!Array.isArray(payload.pageIds) || !payload.pageIds.every((id) => typeof id === 'string')) return null;
  return 'publish';
}
