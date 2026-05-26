-- SkyFort · backup-таблиця email_subscribers
-- Запусти у Supabase → SQL Editor. Ідемпотентно.
-- Backup на випадок проблем з Brevo + аналітика по source / UTM.

create table if not exists public.email_subscribers (
  id            uuid primary key default gen_random_uuid(),
  email         text not null,
  name          text,
  locale        text default 'uk',
  source        text,                              -- homepage_hero / tt_landing / blog_post / etc.
  lead_magnet   text,                              -- TFSA_GUIDE / RRSP_GUIDE / etc. (опційно)
  utm_source    text,
  utm_medium    text,
  utm_campaign  text,
  brevo_id      text,                              -- ID контакту в Brevo (для лінкування)
  brevo_status  text default 'pending',            -- pending / synced / failed
  brevo_error   text,                              -- якщо sync failed — повідомлення помилки
  user_agent    text,
  ip_hash       text,                              -- SHA-256 hash, anti-spam
  consent       boolean default true,              -- explicit consent на email-маркетинг
  unsubscribed  boolean default false,
  unsubscribed_at timestamptz,
  raw           jsonb,
  created_at    timestamptz default now()
);

create unique index if not exists email_subscribers_email_idx on public.email_subscribers (lower(email));
create index if not exists email_subscribers_source_idx       on public.email_subscribers (source);
create index if not exists email_subscribers_brevo_status_idx on public.email_subscribers (brevo_status);
create index if not exists email_subscribers_created_at_idx   on public.email_subscribers (created_at desc);

-- RLS: тільки service_role
alter table public.email_subscribers enable row level security;

-- Корисні запити:
-- Скільки нових підписок за тиждень:
--   select date_trunc('day', created_at) as day, count(*) from email_subscribers
--   where created_at > now() - interval '7 days' group by 1 order by 1;
-- Топ-джерела:
--   select source, count(*) from email_subscribers group by source order by count desc;
-- Failed Brevo sync (для retry):
--   select * from email_subscribers where brevo_status = 'failed' order by created_at desc;
