import { NextResponse } from 'next/server';
export const dynamic = 'force-dynamic';

export async function GET() {
  const env = process.env.DATOCMS_ENVIRONMENT || null;
  const locale = process.env.DATOCMS_LOCALE || null;
  const hasApiToken = !!(process.env.DATOCMS_API_TOKEN || process.env.DATOCMS_APT_TOKEN);
  return NextResponse.json({ ok: true, hasApiToken, environment: env, locale });
}

