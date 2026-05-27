// app/api/email-subscribe/route.js
// SkyFort — приймає email, додає у Brevo + backup у Supabase.
//
// ENV (Vercel → Settings → Environment Variables):
//   BREVO_API_KEY            — обов'язково (Brevo SMTP & API → API keys)
//   BREVO_LIST_ID            — числовий ID списку у Brevo (Contacts → Lists → клік → з URL)
//   BREVO_WELCOME_TPLID      — опційно: fallback template ID (одна на всі мови)
//   BREVO_WELCOME_TPLID_UK   — опційно: UK-only welcome template
//   BREVO_WELCOME_TPLID_RU   — опційно: RU-only welcome template
//   BREVO_WELCOME_TPLID_EN   — опційно: EN-only welcome template
//   SUPABASE_URL (або NEXT_PUBLIC_SUPABASE_URL) + SUPABASE_SERVICE_ROLE_KEY — для backup

import { createClient } from '@supabase/supabase-js';
import { createHash } from 'node:crypto';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

const SUPABASE_URL =
  process.env.SUPABASE_URL || process.env.NEXT_PUBLIC_SUPABASE_URL;

const supabase =
  SUPABASE_URL && process.env.SUPABASE_SERVICE_ROLE_KEY
    ? createClient(SUPABASE_URL, process.env.SUPABASE_SERVICE_ROLE_KEY, {
        auth: { persistSession: false },
      })
    : null;

const BREVO_API_KEY = process.env.BREVO_API_KEY;
const BREVO_LIST_ID = process.env.BREVO_LIST_ID
  ? parseInt(process.env.BREVO_LIST_ID, 10)
  : null;

function intEnv(name) {
  const v = process.env[name];
  return v ? parseInt(v, 10) : null;
}

// Welcome template IDs — per locale, with single fallback.
const WELCOME_TPL = {
  uk: intEnv('BREVO_WELCOME_TPLID_UK'),
  ru: intEnv('BREVO_WELCOME_TPLID_RU'),
  en: intEnv('BREVO_WELCOME_TPLID_EN'),
};
const BREVO_WELCOME_TPLID_FALLBACK = intEnv('BREVO_WELCOME_TPLID');

function pickWelcomeTemplateId(locale) {
  const code = (locale || 'uk').toString().slice(0, 2).toLowerCase();
  return WELCOME_TPL[code] || BREVO_WELCOME_TPLID_FALLBACK;
}

// Rate limit: 3 запити / 60 сек / IP-hash
const RATE_LIMIT_MS = 60_000;
const RATE_LIMIT_MAX = 3;
const recentByIp = new Map();

function hashIp(ip) {
  if (!ip) return null;
  return createHash('sha256').update(String(ip)).digest('hex').slice(0, 32);
}
function getClientIp(req) {
  const xff = req.headers.get('x-forwarded-for');
  if (xff) return xff.split(',')[0].trim();
  return req.headers.get('x-real-ip') || null;
}
function isValidEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

async function syncToBrevo({ email, name, source, listIds }) {
  if (!BREVO_API_KEY) {
    return { ok: false, error: 'BREVO_API_KEY not configured' };
  }
  try {
    const body = {
      email,
      attributes: {
        FIRSTNAME: name || null,
        SOURCE: source || null,
      },
      listIds: listIds.length ? listIds : undefined,
      updateEnabled: true, // якщо вже існує — оновлюємо
    };
    const res = await fetch('https://api.brevo.com/v3/contacts', {
      method: 'POST',
      headers: {
        'api-key': BREVO_API_KEY,
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
      body: JSON.stringify(body),
    });
    if (res.ok || res.status === 204) {
      // Brevo іноді не повертає id (особливо при updateEnabled). Спроба отримати:
      let id = null;
      try {
        const j = await res.json();
        id = j?.id ? String(j.id) : null;
      } catch {}
      return { ok: true, id };
    }
    const text = await res.text().catch(() => '');
    return { ok: false, error: `Brevo ${res.status}: ${text.slice(0, 200)}` };
  } catch (e) {
    return { ok: false, error: 'Brevo network: ' + String(e.message || e) };
  }
}

async function sendWelcomeEmail(email, name, locale) {
  const templateId = pickWelcomeTemplateId(locale);
  if (!BREVO_API_KEY || !templateId) return;
  // fire-and-forget
  try {
    await fetch('https://api.brevo.com/v3/smtp/email', {
      method: 'POST',
      headers: {
        'api-key': BREVO_API_KEY,
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
      body: JSON.stringify({
        to: [{ email, name: name || undefined }],
        templateId,
        params: {
          FIRSTNAME: name || '',
          LOCALE: (locale || 'uk').toString().slice(0, 2).toLowerCase(),
        },
      }),
    });
  } catch {}
}

export async function POST(req) {
  let body;
  try {
    body = await req.json();
  } catch {
    return Response.json({ ok: false, error: 'bad json' }, { status: 400 });
  }

  // Honeypot — bots fill this
  if (body.website && String(body.website).trim().length > 0) {
    return Response.json({ ok: true, accepted: false }, { status: 200 });
  }

  const email = (body.email || '').toString().trim().toLowerCase();
  if (!email || !isValidEmail(email) || email.length > 254) {
    return Response.json(
      { ok: false, error: 'invalid_email' },
      { status: 400 }
    );
  }

  const name = (body.name || '').toString().trim().slice(0, 100) || null;
  const consent = body.consent !== false; // default true якщо не передано
  if (!consent) {
    return Response.json(
      { ok: false, error: 'consent_required' },
      { status: 400 }
    );
  }

  // Rate limit
  const ip = getClientIp(req);
  const ipHash = hashIp(ip);
  if (ipHash) {
    const arr = recentByIp.get(ipHash) || [];
    const now = Date.now();
    const recent = arr.filter((t) => now - t < RATE_LIMIT_MS);
    if (recent.length >= RATE_LIMIT_MAX) {
      return Response.json(
        { ok: false, error: 'rate_limited' },
        { status: 429 }
      );
    }
    recent.push(now);
    recentByIp.set(ipHash, recent);
    if (recentByIp.size > 1000) {
      // periodic cleanup
      for (const [k, v] of recentByIp) {
        const fresh = v.filter((t) => Date.now() - t < RATE_LIMIT_MS);
        if (!fresh.length) recentByIp.delete(k);
        else recentByIp.set(k, fresh);
      }
    }
  }

  // 1. Sync to Brevo (parallel with Supabase backup)
  const listIds = BREVO_LIST_ID ? [BREVO_LIST_ID] : [];
  const brevoRes = await syncToBrevo({ email, name, source: body.source, listIds });

  // 2. Backup to Supabase (always — навіть якщо Brevo failed)
  let supabaseId = null;
  if (supabase) {
    const row = {
      email,
      name,
      locale: (body.locale || 'uk').toString().slice(0, 5),
      source: (body.source || 'unknown').toString().slice(0, 100),
      lead_magnet: body.lead_magnet || null,
      utm_source: body.utm_source || null,
      utm_medium: body.utm_medium || null,
      utm_campaign: body.utm_campaign || null,
      brevo_id: brevoRes.ok ? brevoRes.id : null,
      brevo_status: brevoRes.ok ? 'synced' : 'failed',
      brevo_error: brevoRes.ok ? null : (brevoRes.error || 'unknown').slice(0, 500),
      user_agent: req.headers.get('user-agent')?.slice(0, 500) || null,
      ip_hash: ipHash,
      consent: true,
      raw: body,
    };
    // Upsert on lower(email) — щоб дубль не падав
    const { data, error } = await supabase
      .from('email_subscribers')
      .upsert(row, { onConflict: 'email' })
      .select('id')
      .single();
    if (!error && data) supabaseId = data.id;
    // Якщо error — продовжуємо (UX не валиться)
  }

  // 3. Welcome email (fire-and-forget) — лише якщо Brevo sync OK
  if (brevoRes.ok) {
    sendWelcomeEmail(email, name, body.locale);
  }

  // Response
  if (brevoRes.ok) {
    return Response.json(
      { ok: true, id: supabaseId, brevo_synced: true },
      { status: 200 }
    );
  }
  // Brevo failed, but ми зберегли у Supabase для retry
  if (supabaseId) {
    return Response.json(
      { ok: true, id: supabaseId, brevo_synced: false, warn: 'queued_for_retry' },
      { status: 200 }
    );
  }
  // Найгірше: ні Brevo, ні Supabase. UX все одно success — щоб користувач не дратувався.
  console.error('email-subscribe full failure:', brevoRes.error);
  return Response.json({ ok: true, id: null }, { status: 200 });
}
