// app/[locale]/portal/(dashboard)/advisor/page.js
import { cookies } from 'next/headers';
import { requireOnboardedClient, ADVISOR } from '../../../../_lib/portal/auth';
import { serverClient } from '../../../../_lib/portal/supabase';
import { portalT, PORTAL_LOCALES } from '../../../../_i18n/portal-dictionary';
import AdvisorChat from './AdvisorChat';

export const dynamic = 'force-dynamic';

export default async function AdvisorPage({ params }) {
  const { locale } = await params;
  const safeLocale = PORTAL_LOCALES.includes(locale) ? locale : 'uk';
  const { user } = await requireOnboardedClient(safeLocale);
  const t = portalT(safeLocale);
  const supabase = serverClient(cookies);

  const { data: messages } = await supabase
    .from('portal_messages')
    .select('*')
    .eq('user_id', user.id)
    .order('created_at', { ascending: true })
    .limit(50);

  // Mark all advisor messages as read on page open.
  await supabase
    .from('portal_messages')
    .update({ read_at: new Date().toISOString() })
    .eq('user_id', user.id)
    .eq('from_role', 'advisor')
    .is('read_at', null);

  return (
    <AdvisorChat
      initialMessages={messages || []}
      userId={user.id}
      locale={safeLocale}
      t={t}
    />
  );
}
