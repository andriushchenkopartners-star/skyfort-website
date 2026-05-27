// app/[locale]/portal/(dashboard)/layout.js
// Server layout: auth-gates + fetches counts, then renders DashboardChrome
// (client) which holds the mobile drawer state.

import { cookies } from 'next/headers';
import { requireOnboardedClient } from '../../../_lib/portal/auth';
import { serverClient } from '../../../_lib/portal/supabase';
import { portalT, PORTAL_LOCALES } from '../../../_i18n/portal-dictionary';
import DashboardChrome from '../../../_components/portal/DashboardChrome';

export const dynamic = 'force-dynamic';

export default async function DashboardLayout({ children, params }) {
  const { locale } = await params;
  const safeLocale = PORTAL_LOCALES.includes(locale) ? locale : 'uk';
  const { client } = await requireOnboardedClient(safeLocale);
  const t = portalT(safeLocale);

  const supabase = serverClient(cookies);
  const [{ count: openTodos }, { count: unreadMessages }] = await Promise.all([
    supabase
      .from('portal_todos')
      .select('id', { count: 'exact', head: true })
      .eq('user_id', client.user_id)
      .eq('status', 'open'),
    supabase
      .from('portal_messages')
      .select('id', { count: 'exact', head: true })
      .eq('user_id', client.user_id)
      .eq('from_role', 'advisor')
      .is('read_at', null),
  ]);

  return (
    <DashboardChrome
      locale={safeLocale}
      t={t}
      client={client}
      documentsBadge={openTodos || 0}
      unreadBell={(openTodos || 0) + (unreadMessages || 0) > 0}
    >
      {children}
    </DashboardChrome>
  );
}
