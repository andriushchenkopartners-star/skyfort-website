-- SkyFort · таблиця consultations
-- Запусти у Supabase → SQL Editor. Ідемпотентно (можна виконувати повторно).
-- lead_id зроблено TEXT навмисно — щоб лінк працював незалежно від типу PK у твоїй leads
-- (uuid / bigint — байдуже). Як підтвердиш тип leads.id, можна апгрейднути до справжнього FK
-- (див. блок унизу).

create extension if not exists "pgcrypto";  -- для gen_random_uuid()

create table if not exists public.consultations (
  id                uuid primary key default gen_random_uuid(),
  lead_id           text,                 -- звʼязок з public.leads (по id), best-effort
  name              text,
  email             text,
  phone             text,
  lang              text,
  source            text,
  magnet            text,
  province          text,
  family            text,
  occupation        text,
  income_self       numeric,
  income_spouse     numeric,
  net_worth         numeric,
  financial_assets  numeric,
  investor_class    text,                 -- Accredited / Eligible / Non-Eligible
  goals             text[],
  timeline          text,
  monthly_save      numeric,
  pain              text,
  experience        text,
  risk              text,
  horizon           text,
  liquidity         text,
  suit_notes        text,
  temperature       text,                 -- 🔥 Hot / 🟠 Warm / 🔵 Cold / ⚪ Not a fit
  next_step         text,
  followup_date     date,
  objections        text,
  notes             text,
  call_date         date,
  raw               jsonb,                -- повний снапшот форми
  created_at        timestamptz default now()
);

create index if not exists consultations_email_idx   on public.consultations (email);
create index if not exists consultations_lead_idx     on public.consultations (lead_id);
create index if not exists consultations_followup_idx on public.consultations (followup_date);
create index if not exists consultations_temp_idx     on public.consultations (temperature);

-- RLS: лишаємо доступ тільки через service_role (ендпоінт). Анон ключ доступу не має.
alter table public.consultations enable row level security;
-- (жодної policy для anon/authenticated → читати/писати може лише service_role, як і треба)

-- ── ОПЦІЙНО, коли підтвердиш що leads.id це uuid ─────────────────────────────
-- alter table public.consultations
--   alter column lead_id type uuid using nullif(lead_id,'')::uuid,
--   add constraint consultations_lead_fk
--   foreign key (lead_id) references public.leads(id) on delete set null;

-- ── Зручна вʼюшка: консультації + дані ліда (підправ leads-колонки під свою схему) ──
-- create or replace view public.consultations_with_lead as
-- select c.*, l.email as lead_email
-- from public.consultations c
-- left join public.leads l on l.id::text = c.lead_id;
