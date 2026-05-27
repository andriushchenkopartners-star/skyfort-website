// app/[locale]/portal/(dashboard)/accounts/page.js
// Accounts list with edit-in-place + add new + delete.

import { cookies } from 'next/headers';
import { requireOnboardedClient } from '../../../../_lib/portal/auth';
import { serverClient } from '../../../../_lib/portal/supabase';
import { portalT, PORTAL_LOCALES } from '../../../../_i18n/portal-dictionary';
import AccountsManager from './AccountsManager';

export const dynamic = 'force-dynamic';

export default async function AccountsPage({ params }) {
  const { locale } = await params;
  const safeLocale = PORTAL_LOCALES.includes(locale) ? locale : 'uk';
  const { user, client } = await requireOnboardedClient(safeLocale);
  const t = portalT(safeLocale);
  const supabase = serverClient(cookies);

  const { data: accounts } = await supabase
    .from('portal_accounts')
    .select('*')
    .eq('user_id', user.id)
    .order('balance', { ascending: false });

  return (
    <AccountsManager
      initialAccounts={accounts || []}
      userId={user.id}
      locale={safeLocale}
      t={t}
    />
  );
}
