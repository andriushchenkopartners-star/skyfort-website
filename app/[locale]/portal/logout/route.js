// app/[locale]/portal/logout/route.js
// POST or GET to /uk/portal/logout — clears Supabase session cookies, redirects to login.

import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';
import { serverClient } from '../../../_lib/portal/supabase';
import { PORTAL_LOCALES } from '../../../_i18n/portal-dictionary';

export const dynamic = 'force-dynamic';

async function handle(request, ctx) {
  const params = await ctx.params;
  const locale = PORTAL_LOCALES.includes(params?.locale) ? params.locale : 'uk';

  try {
    const supabase = serverClient(cookies);
    await supabase.auth.signOut();
  } catch (err) {
    console.error('[portal/logout]', err);
  }

  const url = new URL(`/${locale}/portal/login`, request.url);
  return NextResponse.redirect(url, { status: 303 });
}

export const POST = handle;
export const GET = handle;
