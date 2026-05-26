-- ============================================================================
-- SkyFort Client Portal — Schema (tables, indexes, triggers)
-- ============================================================================
-- Run this FIRST in Supabase SQL Editor. Then portal_rls.sql, then portal_storage.sql.
--
-- Tables:
--   portal_clients   — client profile (linked 1:1 to auth.users)
--   portal_accounts  — TFSA, RRSP, FHSA, exempt market, real estate
--   portal_goals     — first home, retirement, emergency fund, custom
--   portal_activity  — transaction log (client-entered)
--   portal_todos     — advisor pushes action items
--   portal_documents — PDFs in vault (uploaded by advisor or client)
--   portal_messages  — async messages between client and advisor
-- ============================================================================

-- ─── helper: updated_at trigger function ───────────────────────────────────
create or replace function portal_touch_updated_at()
returns trigger
language plpgsql
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

-- ─── portal_clients ─────────────────────────────────────────────────────────
create table if not exists portal_clients (
  user_id uuid primary key references auth.users(id) on delete cascade,
  full_name text not null,
  initials text not null,                                  -- 2 letters for avatar (e.g. "AK")
  member_since timestamptz not null default now(),
  preferred_lang text not null default 'uk' check (preferred_lang in ('uk','ru','en')),
  jurisdictions text[] not null default '{Alberta}',       -- where client lives
  kyc_last_verified date,
  onboarding_completed_at timestamptz,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create trigger portal_clients_updated_at
  before update on portal_clients
  for each row execute function portal_touch_updated_at();

-- ─── portal_accounts ────────────────────────────────────────────────────────
create table if not exists portal_accounts (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  account_type text not null check (account_type in ('tfsa','rrsp','fhsa','exempt','re','other')),
  display_name text,                                       -- e.g. "TFSA at RBC"
  balance numeric(14,2) not null default 0,
  ytd_pct numeric(6,2),                                    -- e.g. 9.40 → +9.40%
  ytd_contrib numeric(14,2) not null default 0,
  contribution_room numeric(14,2),                         -- null for exempt/re
  holdings_count integer not null default 0,
  notes text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index if not exists portal_accounts_user_idx on portal_accounts(user_id);
create index if not exists portal_accounts_user_type_idx on portal_accounts(user_id, account_type);

create trigger portal_accounts_updated_at
  before update on portal_accounts
  for each row execute function portal_touch_updated_at();

-- ─── portal_goals ───────────────────────────────────────────────────────────
create table if not exists portal_goals (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  goal_key text not null,                                  -- 'house', 'retire', 'emergency', 'custom'
  title text not null,
  saved numeric(14,2) not null default 0,
  target numeric(14,2) not null check (target > 0),
  monthly numeric(14,2),
  eta text,                                                -- display-only: "2028 Q1", "2057"
  status text not null default 'on_track' check (status in ('ahead','on_track','behind')),
  by_pct numeric(6,2),                                     -- ahead/behind by X%
  linked_account_ids uuid[] default '{}',
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index if not exists portal_goals_user_idx on portal_goals(user_id);

create trigger portal_goals_updated_at
  before update on portal_goals
  for each row execute function portal_touch_updated_at();

-- ─── portal_activity ────────────────────────────────────────────────────────
create table if not exists portal_activity (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  account_id uuid references portal_accounts(id) on delete set null,
  occurred_on date not null,
  kind text not null check (kind in ('dep','div','purchase','sale','fx','fee','other')),
  note text,
  amount numeric(14,2) not null,                           -- signed: +deposit, -withdrawal
  created_at timestamptz not null default now()
);

create index if not exists portal_activity_user_date_idx on portal_activity(user_id, occurred_on desc);
create index if not exists portal_activity_account_idx on portal_activity(account_id);

-- ─── portal_todos ───────────────────────────────────────────────────────────
create table if not exists portal_todos (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  title text not null,
  body text,
  category text,                                           -- 'kyc', 'fhsa', 'rrsp', 'general'
  status text not null default 'open' check (status in ('open','done','dismissed')),
  due_on date,
  created_by text not null default 'advisor',              -- 'advisor' or 'system'
  created_at timestamptz not null default now(),
  completed_at timestamptz
);

create index if not exists portal_todos_user_status_idx on portal_todos(user_id, status);

-- ─── portal_documents ───────────────────────────────────────────────────────
create table if not exists portal_documents (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  title text not null,
  category text,                                           -- 'kyc', 'statement', 'tax', 'agreement', 'welcome'
  file_path text not null,                                 -- Supabase Storage path: <user_id>/<filename>
  file_size_bytes integer,
  mime_type text,
  uploaded_by text not null default 'advisor',             -- 'advisor', 'client', 'system'
  visible boolean not null default true,
  uploaded_at timestamptz not null default now()
);

create index if not exists portal_documents_user_idx on portal_documents(user_id);
create index if not exists portal_documents_user_visible_idx on portal_documents(user_id, visible);

-- ─── portal_messages ────────────────────────────────────────────────────────
create table if not exists portal_messages (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  from_role text not null check (from_role in ('client','advisor')),
  body text not null,
  read_at timestamptz,
  created_at timestamptz not null default now()
);

create index if not exists portal_messages_user_created_idx on portal_messages(user_id, created_at desc);
create index if not exists portal_messages_user_unread_idx on portal_messages(user_id) where read_at is null;

-- ─── done ───────────────────────────────────────────────────────────────────
-- Next: run portal_rls.sql to enable Row-Level Security.
