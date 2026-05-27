// app/[locale]/portal/(dashboard)/layout.js
// Wraps Overview / Accounts / Goals / Advisor / Documents in the dashboard shell
// (left sidebar + sticky header). Route group (parentheses) doesn't appear in URL.
//
// Login / Callback / Onboarding stay outside this group — they're bare-page flows.

import { cookies } from 'next/headers';
import { requireOnboardedClient } from '../../../_lib/portal/auth';
import { serverClient } from '../../../_lib/portal/supabase';
import { portalT, PORTAL_LOCALES } from '../../../_i18n/portal-dictionary';
import PortalSidebar from '../../../_components/portal/PortalSidebar';
import PortalHeader from '../../../_components/portal/PortalHeader';

export const dynamic = 'force-dynamic';

export default async function DashboardLayout({ children, params }) {
  const { locale } = await params;
  const safeLocale = PORTAL_LOCALES.includes(locale) ? locale : 'uk';
  const { client } = await requireOnboardedClient(safeLocale);
  const t = portalT(safeLocale);

  // Open todos and unread messages — used for sidebar badge + header bell.
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
    <div
      style={{
        display: 'grid',
        gridTemplateColumns: '232px 1fr',
        minHeight: '100vh',
      }}
    >
      <PortalSidebar
        locale={safeLocale}
        t={t}
        clientName={client.full_name}
        clientInitials={client.initials}
        memberSince={
          client.member_since
            ? new Date(client.member_since).getFullYear()
            : null
        }
        documentsBadge={openTodos || 0}
      />

      <main style={{ minWidth: 0 }}>
        <PortalHeader
          locale={safeLocale}
          t={t}
          unreadBell={(openTodos || 0) + (unreadMessages || 0) > 0}
        />
        <div style={{ padding: '28px 32px 60px' }}>{children}</div>
      </main>
    </div>
  );
}
