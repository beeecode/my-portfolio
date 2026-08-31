import { timingSafeEqual } from 'node:crypto';
import { NextResponse } from 'next/server';
import { createSessionToken, SESSION_COOKIE, sessionCookieOptions } from '@/lib/auth';

function safeEqual(left: string, right: string) {
  const a = Buffer.from(left);
  const b = Buffer.from(right);
  return a.length === b.length && timingSafeEqual(a, b);
}

export async function POST(request: Request) {
  const { email, password } = await request.json().catch(() => ({}));
  const configuredEmail = process.env.ADMIN_EMAIL || '';
  const configuredPassword = process.env.ADMIN_PASSWORD || '';
  if (!configuredEmail || !configuredPassword || !process.env.AUTH_SECRET) {
    return NextResponse.json({ error: 'Admin authentication is not configured.' }, { status: 503 });
  }
  if (!safeEqual(String(email || ''), configuredEmail) || !safeEqual(String(password || ''), configuredPassword)) {
    return NextResponse.json({ error: 'Invalid email or password.' }, { status: 401 });
  }
  const response = NextResponse.json({ success: true });
  response.cookies.set(SESSION_COOKIE, createSessionToken(configuredEmail), sessionCookieOptions);
  return response;
}
