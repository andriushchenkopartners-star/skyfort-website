// POST /api/admin/portal/messages — advisor sends a message to a client
import { NextResponse } from 'next/server';
import { isAdvisor } from '../../../../_lib/portal/auth';
import { serviceClient } from '../../../../_lib/portal/supabase';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

export async function POST(req) {
  if (!(await isAdvisor())) return NextResponse.json({ error: 'forbidden' }, { status: 403 });
  let body;
  try { body = await req.json(); } catch { return NextResponse.json({ error: 'bad json' }, { status: 400 }); }
  const { userId, text } = body;
  if (!userId || !text) return NextResponse.json({ error: 'missing fields' }, { status: 400 });

  const sb = serviceClient();
  const { data, error } = await sb
    .from('portal_messages')
    .insert({
      user_id: userId,
      from_role: 'advisor',
      body: String(text).slice(0, 4000),
    })
    .select()
    .single();
  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json({ ok: true, message: data });
}
