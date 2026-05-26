-- ============================================================================
-- SkyFort Client Portal — Supabase Storage bucket for documents
-- ============================================================================
-- Run AFTER portal_rls.sql.
--
-- Creates a private bucket "portal-documents" where:
--   - Files are stored under <user_id>/<filename>
--   - Each user can only read/write their own folder
--   - Andrii (service_role) can read/write anywhere
-- ============================================================================

-- ─── create the bucket (private) ────────────────────────────────────────────
insert into storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
values (
  'portal-documents',
  'portal-documents',
  false,                                                    -- private bucket
  10485760,                                                 -- 10 MB max per file
  array['application/pdf','image/png','image/jpeg','image/webp']
)
on conflict (id) do update set
  public = excluded.public,
  file_size_limit = excluded.file_size_limit,
  allowed_mime_types = excluded.allowed_mime_types;

-- ─── policy: users read their own folder ────────────────────────────────────
drop policy if exists "portal_docs_own_read" on storage.objects;
create policy "portal_docs_own_read" on storage.objects
  for select using (
    bucket_id = 'portal-documents'
    and auth.uid()::text = (storage.foldername(name))[1]
  );

-- ─── policy: users upload to their own folder ───────────────────────────────
drop policy if exists "portal_docs_own_insert" on storage.objects;
create policy "portal_docs_own_insert" on storage.objects
  for insert with check (
    bucket_id = 'portal-documents'
    and auth.uid()::text = (storage.foldername(name))[1]
  );

-- ─── policy: users delete from their own folder ─────────────────────────────
drop policy if exists "portal_docs_own_delete" on storage.objects;
create policy "portal_docs_own_delete" on storage.objects
  for delete using (
    bucket_id = 'portal-documents'
    and auth.uid()::text = (storage.foldername(name))[1]
  );

-- ─── done ───────────────────────────────────────────────────────────────────
-- All SQL migrations complete. Now move to env vars and code.
