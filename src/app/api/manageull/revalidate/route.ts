import { revalidatePath, revalidateTag } from 'next/cache';
import { MANAGEULL_CACHE_TAG } from '../../../../lib/manageull/config';
import { validateWebhook, verifyWebhook } from '../../../../lib/manageull/webhook';

export const runtime = 'nodejs';
const MAX_BODY_BYTES = 64 * 1024;

export async function POST(request: Request) {
  const secret = process.env.MANAGEULL_WEBHOOK_SECRET;
  const siteId = process.env.MANAGEULL_SITE_ID;
  if (!secret || !siteId) return Response.json({ error: 'Publishing webhook is not configured.' }, { status: 503 });
  if (!request.headers.get('content-type')?.toLowerCase().startsWith('application/json')) return Response.json({ error: 'JSON required.' }, { status: 415 });
  const reader = request.body?.getReader();
  if (!reader) return Response.json({ error: 'Body required.' }, { status: 400 });
  const chunks: Uint8Array[] = [];
  let length = 0;
  try {
    while (true) {
      const { done, value } = await reader.read();
      if (done) break;
      length += value.byteLength;
      if (length > MAX_BODY_BYTES) {
        await reader.cancel();
        return Response.json({ error: 'Payload too large.' }, { status: 413 });
      }
      chunks.push(value);
    }
    const body = Buffer.concat(chunks).toString('utf8');
    if (!verifyWebhook(body, request.headers.get('x-manageull-signature'), secret)) return Response.json({ error: 'Invalid signature.' }, { status: 401 });
    let payload: unknown;
    try { payload = JSON.parse(body); } catch { return Response.json({ error: 'Invalid JSON.' }, { status: 400 }); }
    const event = validateWebhook(payload, siteId);
    if (!event) return Response.json({ error: 'Invalid or expired event.' }, { status: 400 });
    if (event === 'connection.test') return Response.json({ ok: true });
    revalidateTag(MANAGEULL_CACHE_TAG, { expire: 0 });
    revalidatePath('/', 'layout');
    return Response.json({ ok: true, revalidated: true });
  } finally {
    reader.releaseLock();
  }
}
