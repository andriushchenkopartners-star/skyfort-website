// app/api/lead/route.js
// Приймає лід із /resources та пише в Supabase.
//
// НАЛАШТУВАННЯ (один раз):
// 1. У Supabase створи таблицю `leads` з колонками:
//    id (uuid, default gen_random_uuid()), created_at (timestamptz default now()),
//    name text, email text, investor_type text, horizon text, risk text,
//    consent bool, source text.
// 2. У Vercel → Project → Settings → Environment Variables додай:
//    NEXT_PUBLIC_SUPABASE_URL = https://<твій-проект>.supabase.co
//    SUPABASE_SERVICE_ROLE_KEY = <service role key з Supabase → Settings → API>
//    (service role key — СЕКРЕТНИЙ, лише на сервері, ніколи не в браузер.)
// 3. git push → Vercel підхопить.

export async function POST(req) {
  try {
    const body = await req.json();

    const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const SERVICE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY;

    // Якщо змінні ще не налаштовані — не валимо UX, просто логуємо.
    if (!SUPABASE_URL || !SERVICE_KEY) {
      console.warn("Supabase env vars not set — lead not persisted:", body?.email);
      return Response.json({ ok: true, persisted: false });
    }

    const res = await fetch(`${SUPABASE_URL}/rest/v1/leads`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        apikey: SERVICE_KEY,
        Authorization: `Bearer ${SERVICE_KEY}`,
        Prefer: "return=minimal",
      },
      body: JSON.stringify({
        name: body.name,
        email: body.email,
        investor_type: body.investorType,
        horizon: body.horizon,
        risk: body.risk,
        consent: !!body.consent,
        source: body.source || "resources-gate",
      }),
    });

    if (!res.ok) {
      const txt = await res.text();
      console.error("Supabase insert failed:", res.status, txt);
      return Response.json({ ok: true, persisted: false });
    }

    return Response.json({ ok: true, persisted: true });
  } catch (e) {
    console.error("lead route error:", e);
    return Response.json({ ok: true, persisted: false });
  }
}
