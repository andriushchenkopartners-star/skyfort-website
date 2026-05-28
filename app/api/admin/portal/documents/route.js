// POST /api/admin/portal/documents — advisor uploads a document on client's behalf
// Multipart form: file (File) + userId + title + category
import { NextResponse } from 'next/server';
import { isAdvisor } from '../../../../_lib/portal/auth';
import { serviceClient } from '../../../../_lib/portal/supabase';
import { notifyClient } from '../../../../_lib/portal/notifications';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

const BUCKET = 'portal-documents';
const MAX_SIZE = 10 * 1024 * 1024;
const ALLOWED = ['application/pdf', 'image/png', 'image/jpeg', 'image/webp'];

export async function POST(req) {
  if (!(await isAdvisor())) return NextResponse.json({ error: 'forbidden' }, { status: 403 });

  const form = await req.formData();
  const userId = form.get('userId');
  const title = form.get('title');
  const category = form.get('category');
  const file = form.get('file');

  if (!userId || !file || !(file instanceof Blob)) {
    return NextResponse.json({ error: 'missing fields' }, { status: 400 });
  }
  if (file.size > MAX_SIZE) {
    return NextResponse.json({ error: 'file too large' }, { status: 400 });
  }
  if (!ALLOWED.includes(file.type)) {
    return NextResponse.json({ error: 'mime not allowed' }, { status: 400 });
  }

  const sb = serviceClient();
  const safeName = (file.name || 'doc.pdf').replace(/[^\w.\-]/g, '_');
  const path = `${userId}/${Date.now()}-${safeName}`;

  const arr = await file.arrayBuffer();
  const { error: upErr } = await sb.storage.from(BUCKET).upload(path, arr, {
    contentType: file.type,
    upsert: false,
  });
  if (upErr) return NextResponse.json({ error: upErr.message }, { status: 500 });

  const { data, error: insErr } = await sb
    .from('portal_documents')
    .insert({
      user_id: userId,
      title: String(title || file.name).slice(0, 200),
      category: category ? String(category).slice(0, 50) : null,
      file_path: path,
      file_size_bytes: file.size,
      mime_type: file.type,
      uploaded_by: 'advisor',
      visible: true,
    })
    .select()
    .single();
  if (insErr) return NextResponse.json({ error: insErr.message }, { status: 500 });

  // Phase 6: email the client that a new document is waiting in the portal.
  const notif = await notifyClient({
    userId,
    kind: 'document',
    title: String(title || file.name),
    ctaPath: '/portal/documents',
  });

  return NextResponse.json({ ok: true, document: data, notified: !!notif?.ok });
}
