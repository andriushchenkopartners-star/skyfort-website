-- SkyFort · таблиця для пропозицій тем блогу від читачів
-- Запусти у Supabase → SQL Editor. Ідемпотентно (можна виконувати повторно).

create table if not exists public.topic_requests (
  id           uuid primary key default gen_random_uuid(),
  topic        text not null,                       -- запропонована тема
  email        text,                                -- опційний контакт для notify коли стаття вийде
  locale       text default 'uk',                   -- з якої локалі прийшла пропозиція
  source       text,                                -- de wsie прийшов запит ("blog_hub" / "blog_post:<slug>")
  utm_source   text,                                -- TikTok / instagram / direct / etc.
  utm_medium   text,
  utm_campaign text,
  user_agent   text,                                -- для блокування bots
  ip_hash      text,                                -- хеш IP — для anti-spam, не зберігаємо raw IP
  status       text default 'new',                  -- new / planned / written / declined
  votes        integer default 1,                   -- скільки людей проголосувало за тему (потім можна dedup)
  notes        text,                                -- твої власні нотатки
  raw          jsonb,                               -- повний знімок body — страховка
  created_at   timestamptz default now()
);

create index if not exists topic_requests_status_idx     on public.topic_requests (status);
create index if not exists topic_requests_created_at_idx on public.topic_requests (created_at desc);
create index if not exists topic_requests_email_idx      on public.topic_requests (email);

-- RLS: доступ тільки через service_role (через /api/topic-request)
alter table public.topic_requests enable row level security;

-- Корисні запити (для тебе):
-- Найновіші пропозиції:
--   select topic, email, created_at, source from topic_requests where status='new' order by created_at desc limit 20;
-- Топ тем за голосами (якщо будеш dedup-ити):
--   select topic, votes, count(*) as requests from topic_requests group by topic, votes order by votes desc, requests desc limit 10;
