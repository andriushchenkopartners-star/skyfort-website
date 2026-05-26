// app/api/topic-request/route.js
// SkyFort — приймає пропозицію теми блогу від читача, пише в Supabase.
//
// ENV (Vercel → Settings → Environment Variables):
//   SUPABASE_URL (або NEXT_PUBLIC_SUPABASE_URL) + SUPABASE_SERVICE_ROLE_KEY
//
// Anti-spam:
//   - Honeypot field "website" (boti заповнюють — ми відкидаємо)
//   - Rate limit per IP (in-memory, простий, для serverless edge cases ok)
//   - Мінімальна довжина topic
//   - IP зберігаємо як SHA-256 hash (privacy + anti-spam)

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

// Простий in-memory rate limiter: 1 запит / 60 сек / IP-hash.
// Скидається при cold start serverless — це нормально, achieves baseline anti-abuse.
const RATE_LIMIT_MS = 60_000;
const recentSubmissions = new Map();

function hashIp(ip) {
  if (!ip) return null;
  return createHash('sha256').update(String(ip)).digest('hex').slice(0, 32);
}

function getClientIp(req) {
  const xff = req.headers.get('x-forwarded-for');
  if (xff) return xff.split(',')[0].trim();
  return req.headers.get('x-real-ip') || null;
}

export async function POST(req) {
  if (!supabase) {
    return Response.json(
      { ok: false, error: 'storage not configured' },
      { status: 200 } // не валимо UX
    );
  }

  let body;
  try {
    body = await req.json();
  } catch {
    return Response.json({ ok: false, error: 'bad json' }, { status: 400 });
  }

  // Honeypot — bots заповнюють всі поля
  if (body.website && String(body.website).trim().length > 0) {
    // silently OK — bot думає що вийшло
    return Response.json({ ok: true, accepted: false }, { status: 200 });
  }

  const topic = (body.topic || '').toString().trim();
  if (topic.length < 5 || topic.length > 500) {
    return Response.json(
      { ok: false, error: 'topic must be 5-500 chars' },
      { status: 400 }
    );
  }

  const email = (body.email || '').toString().trim().toLowerCase() || null;

  // Rate limit
  const ip = getClientIp(req);
  const ipHash = hashIp(ip);
  if (ipHash) {
    const last = recentSubmissions.get(ipHash);
    if (last && Date.now() - last < RATE_LIMIT_MS) {
      return Response.json(
        { ok: false, error: 'rate_limited' },
        { status: 429 }
      );
    }
    recentSubmissions.set(ipHash, Date.now());
    // Cleanup old entries
    if (recentSubmissions.size > 1000) {
      const cutoff = Date.now() - RATE_LIMIT_MS;
      for (const [k, t] of recentSubmissions) {
        if (t < cutoff) recentSubmissions.delete(k);
      }
    }
  }

  const row = {
    topic,
    email,
    locale: (body.locale || 'uk').toString().slice(0, 5),
    source: (body.source || 'unknown').toString().slice(0, 100),
    utm_source: body.utm_source || null,
    utm_medium: body.utm_medium || null,
    utm_campaign: body.utm_campaign || null,
    user_agent: req.headers.get('user-agent')?.slice(0, 500) || null,
    ip_hash: ipHash,
    raw: body,
  };

  const { data, error } = await supabase
    .from('topic_requests')
    .insert(row)
    .select('id')
    .single();

  if (error) {
    return Response.json({ ok: false, error: error.message }, { status: 500 });
  }

  return Response.json({ ok: true, id: data?.id }, { status: 200 });
}
