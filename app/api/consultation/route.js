// app/api/consultation/route.js
// SkyFort — приймає запис консультації зі скрипта, лінкує з /resources лідом по email,
// зберігає у таблицю public.consultations. Існуючий /api/lead НЕ чіпаємо.
//
// ENV (Vercel → Project → Settings → Environment Variables, server-only):
//   SUPABASE_URL                 = https://<project>.supabase.co
//     (АБО NEXT_PUBLIC_SUPABASE_URL — fallback, reuse якщо вже існує для /api/lead)
//   SUPABASE_SERVICE_ROLE_KEY    = <service_role key>   ← НІКОЛИ не в NEXT_PUBLIC
//   CONSULTATION_API_KEY         = <вигадай довгий секрет, його ж вставиш у скрипт>

import { createClient } from '@supabase/supabase-js';

export const runtime = 'nodejs';            // service role → тільки node runtime, не edge
export const dynamic = 'force-dynamic';

// ⚙️ ЄДИНЕ що, можливо, треба підправити: назва email-колонки у твоїй таблиці leads.
// Якщо в leads колонка зветься інакше (напр. user_email) — заміни тут. Якщо не впевнений —
// лишай 'email': лінкування просто тихо пропуститься, консультація все одно збережеться.
const LEADS_EMAIL_COLUMN = 'email';

// Fallback на NEXT_PUBLIC_SUPABASE_URL — щоб не дублювати env var
// (існуючий /api/lead використовує NEXT_PUBLIC_SUPABASE_URL).
const SUPABASE_URL =
  process.env.SUPABASE_URL || process.env.NEXT_PUBLIC_SUPABASE_URL;

const supabase =
  SUPABASE_URL && process.env.SUPABASE_SERVICE_ROLE_KEY
    ? createClient(SUPABASE_URL, process.env.SUPABASE_SERVICE_ROLE_KEY, {
        auth: { persistSession: false },
      })
    : null;

const CORS = {
  'Access-Control-Allow-Origin': '*',            // ключ x-skyfort-key захищає запис, не cookie
  'Access-Control-Allow-Methods': 'POST, OPTIONS',
  'Access-Control-Allow-Headers': 'content-type, x-skyfort-key',
};

export async function OPTIONS() {
  return new Response(null, { status: 204, headers: CORS });
}

export async function POST(req) {
  // --- авторизація ---
  const key = req.headers.get('x-skyfort-key');
  if (!process.env.CONSULTATION_API_KEY || key !== process.env.CONSULTATION_API_KEY) {
    return json({ error: 'unauthorized' }, 401);
  }

  if (!supabase) {
    return json(
      { error: 'supabase not configured (set SUPABASE_URL or NEXT_PUBLIC_SUPABASE_URL + SUPABASE_SERVICE_ROLE_KEY)' },
      500
    );
  }

  let body;
  try { body = await req.json(); } catch { return json({ error: 'bad json' }, 400); }

  const email = (body.email || '').trim().toLowerCase();
  const phone = (body.phone || '').trim();

  // --- best-effort лінк до існуючого /resources ліда по email ---
  let leadId = null, linked = false;
  if (email) {
    try {
      const { data: lead } = await supabase
        .from('leads')
        .select('id')
        .eq(LEADS_EMAIL_COLUMN, email)
        .limit(1)
        .maybeSingle();
      if (lead && lead.id != null) { leadId = String(lead.id); linked = true; }
    } catch (_) {
      // схема leads інша або колонки немає — пропускаємо лінк, консультацію все одно пишемо
    }
  }

  const row = {
    lead_id: leadId,
    name: body.name || null,
    email: email || null,
    phone: phone || null,
    lang: body.lang || null,
    source: body.source || null,
    magnet: body.magnet || null,
    province: body.province || null,
    family: body.family || null,
    occupation: body.occupation || null,
    income_self: numOrNull(body.incomeSelf),
    income_spouse: numOrNull(body.incomeSpouse),
    net_worth: numOrNull(body._computed && body._computed.nw),
    financial_assets: numOrNull(body._computed && body._computed.finAssets),
    investor_class: body._class || null,
    goals: toArr(body.goal),
    timeline: body.timeline || null,
    monthly_save: numOrNull(body.monthly),
    pain: body.pain || null,
    experience: body.experience || null,
    risk: body.risk || null,
    horizon: body.horizon || null,
    liquidity: body.liquidity || null,
    suit_notes: body.suitNotes || null,
    temperature: body.temp || null,
    next_step: body.nextStep || null,
    followup_date: body.followup || null,
    objections: body.objections || null,
    notes: body.notes || null,
    call_date: body.date || null,
    raw: body,                                   // повний знімок — страховка від втрати даних
  };

  // upsert: якщо скрипт уже синкав цю консультацію (має _crmId) — оновлюємо, інакше вставляємо
  let resp;
  if (body._crmId) {
    resp = await supabase.from('consultations').update(row).eq('id', body._crmId).select('id').maybeSingle();
  } else {
    resp = await supabase.from('consultations').insert(row).select('id').single();
  }
  if (resp.error) return json({ error: resp.error.message }, 500);

  return json({ ok: true, id: resp.data && resp.data.id, lead_id: leadId, linked }, 200);
}

function numOrNull(v) { const n = parseFloat(v); return isNaN(n) ? null : n; }
function toArr(v) { return Array.isArray(v) ? v : (v ? [v] : null); }
function json(obj, status) {
  return new Response(JSON.stringify(obj), { status, headers: { 'Content-Type': 'application/json', ...CORS } });
}
