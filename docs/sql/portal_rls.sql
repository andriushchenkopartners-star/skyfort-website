-- ============================================================================
-- SkyFort Client Portal — Row-Level Security policies
-- ============================================================================
-- Run AFTER portal_schema.sql.
--
-- Policy model:
--   - Each user can SELECT/INSERT/UPDATE/DELETE only their own rows.
--   - auth.uid() returns the currently authenticated user's UUID.
--   - For admin operations (Andrii pushing todos, uploading docs to clients):
--     backend uses SUPABASE_SERVICE_ROLE_KEY which BYPASSES RLS.
-- ============================================================================

-- ─── enable RLS on all portal tables ────────────────────────────────────────
alter table portal_clients   enable row level security;
alter table portal_accounts  enable row level security;
alter table portal_goals     enable row level security;
alter table portal_activity  enable row level security;
alter table portal_todos     enable row level security;
alter table portal_documents enable row level security;
alter table portal_messages  enable row level security;

-- ─── portal_clients ─────────────────────────────────────────────────────────
drop policy if exists "clients_own_select" on portal_clients;
create policy "clients_own_select" on portal_clients
  for select using (auth.uid() = user_id);

drop policy if exists "clients_own_insert" on portal_clients;
create policy "clients_own_insert" on portal_clients
  for insert with check (auth.uid() = user_id);

drop policy if exists "clients_own_update" on portal_clients;
create policy "clients_own_update" on portal_clients
  for update using (auth.uid() = user_id) with check (auth.uid() = user_id);

-- (no delete by users — deletion of profile goes through admin/service_role)

-- ─── portal_accounts ────────────────────────────────────────────────────────
drop policy if exists "accounts_own_all" on portal_accounts;
create policy "accounts_own_all" on portal_accounts
  for all using (auth.uid() = user_id) with check (auth.uid() = user_id);

-- ─── portal_goals ───────────────────────────────────────────────────────────
drop policy if exists "goals_own_all" on portal_goals;
create policy "goals_own_all" on portal_goals
  for all using (auth.uid() = user_id) with check (auth.uid() = user_id);

-- ─── portal_activity ────────────────────────────────────────────────────────
drop policy if exists "activity_own_all" on portal_activity;
create policy "activity_own_all" on portal_activity
  for all using (auth.uid() = user_id) with check (auth.uid() = user_id);

-- ─── portal_todos ───────────────────────────────────────────────────────────
-- Users can read their todos and mark them as done/dismissed (update status only).
-- Inserts come from advisor via service_role.
drop policy if exists "todos_own_select" on portal_todos;
create policy "todos_own_select" on portal_todos
  for select using (auth.uid() = user_id);

drop policy if exists "todos_own_update" on portal_todos;
create policy "todos_own_update" on portal_todos
  for update using (auth.uid() = user_id) with check (auth.uid() = user_id);

-- ─── portal_documents ───────────────────────────────────────────────────────
-- Users can read documents marked visible.
-- Client uploads also allowed (uploaded_by will be 'client').
drop policy if exists "documents_own_select" on portal_documents;
create policy "documents_own_select" on portal_documents
  for select using (auth.uid() = user_id and visible = true);

drop policy if exists "documents_own_insert" on portal_documents;
create policy "documents_own_insert" on portal_documents
  for insert with check (auth.uid() = user_id and uploaded_by = 'client');

-- ─── portal_messages ────────────────────────────────────────────────────────
-- Users can read all their messages, insert their own (from_role='client'),
-- and update read_at on advisor messages.
drop policy if exists "messages_own_select" on portal_messages;
create policy "messages_own_select" on portal_messages
  for select using (auth.uid() = user_id);

drop policy if exists "messages_own_insert" on portal_messages;
create policy "messages_own_insert" on portal_messages
  for insert with check (auth.uid() = user_id and from_role = 'client');

drop policy if exists "messages_own_update_read" on portal_messages;
create policy "messages_own_update_read" on portal_messages
  for update using (auth.uid() = user_id) with check (auth.uid() = user_id);

-- ─── done ───────────────────────────────────────────────────────────────────
-- Next: run portal_storage.sql to set up the documents bucket.
