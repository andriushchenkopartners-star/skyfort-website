// POST /api/admin/portal/todos — advisor pushes a new todo to a client
// PATCH /api/admin/portal/todos — advisor marks a todo done/dismissed
import { NextResponse } from 'next/server';
import { isAdvisor } from '../../../../_lib/portal/auth';
import { serviceClient } from '../../../../_lib/portal/supabase';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

export async function POST(req) {
  if (!(await isAdvisor())) return NextResponse.json({ error: 'forbidden' }, { status: 403 });
  let body;
  try { body = await req.json(); } catch { return NextResponse.json({ error: 'bad json' }, { status: 400 }); }
  const { userId, title, bodyText, category, dueOn } = body;
  if (!userId || !title) return NextResponse.json({ error: 'missing fields' }, { status: 400 });

  const sb = serviceClient();
  const { data, error } = await sb
    .from('portal_todos')
    .insert({
      user_id: userId,
      title: String(title).slice(0, 200),
      body: bodyText ? String(bodyText).slice(0, 2000) : null,
      category: category ? String(category).slice(0, 50) : null,
      due_on: dueOn || null,
      created_by: 'advisor',
      status: 'open',
    })
    .select()
    .single();
  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json({ ok: true, todo: data });
}
