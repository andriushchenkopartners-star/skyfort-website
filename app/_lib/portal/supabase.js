// app/_lib/portal/supabase.js
// SkyFort Client Portal — Supabase client factories.
//
// Three flavors:
//   1. browserClient()    — for client components ('use client'); persists session in cookies
//   2. serverClient()     — for server components + API routes; reads/writes cookies via next/headers
//   3. serviceClient()    — for admin operations (Andrii's tools); uses service_role, bypasses RLS
//
// ENV vars required:
//   NEXT_PUBLIC_SUPABASE_URL
//   NEXT_PUBLIC_SUPABASE_ANON_KEY
//   SUPABASE_SERVICE_ROLE_KEY (server-side only — never expose to client)

import { createBrowserClient, createServerClient } from '@supabase/ssr';
import { createClient as createSupabaseClient } from '@supabase/supabase-js';

const SUPABASE_URL =
  process.env.NEXT_PUBLIC_SUPABASE_URL || process.env.SUPABASE_URL;
const SUPABASE_ANON_KEY = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
const SUPABASE_SERVICE_ROLE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!SUPABASE_URL) {
  console.warn('[portal/supabase] NEXT_PUBLIC_SUPABASE_URL is not set');
}

// ─── Browser client (client components only) ─────────────────────────────────
export function browserClient() {
  if (!SUPABASE_URL || !SUPABASE_ANON_KEY) {
    throw new Error('Supabase env vars not configured');
  }
  return createBrowserClient(SUPABASE_URL, SUPABASE_ANON_KEY);
}

// ─── Server client (server components + route handlers) ──────────────────────
// Pass the Next.js cookies() function so the client can read/write auth cookies.
//
// Usage in a server component:
//   import { cookies } from 'next/headers';
//   import { serverClient } from '@/app/_lib/portal/supabase';
//   const supabase = serverClient(cookies);
//
export function serverClient(cookiesFn) {
  if (!SUPABASE_URL || !SUPABASE_ANON_KEY) {
    throw new Error('Supabase env vars not configured');
  }
  return createServerClient(SUPABASE_URL, SUPABASE_ANON_KEY, {
    cookies: {
      async getAll() {
        const store = await cookiesFn();
        return store.getAll();
      },
      async setAll(items) {
        try {
          const store = await cookiesFn();
          for (const { name, value, options } of items) {
            store.set(name, value, options);
          }
        } catch {
          // Called from a server component — Next.js does not allow cookie writes there.
          // That's fine; middleware/route handlers will refresh the session next request.
        }
      },
    },
  });
}

// ─── Service-role client (admin/system operations only) ──────────────────────
// BYPASSES RLS. Never use in code paths reachable by client requests without
// strong auth gating (e.g., check that caller is Andrii first).
export function serviceClient() {
  if (!SUPABASE_URL || !SUPABASE_SERVICE_ROLE_KEY) {
    throw new Error('Supabase service-role env vars not configured');
  }
  return createSupabaseClient(SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY, {
    auth: { persistSession: false, autoRefreshToken: false },
  });
}
