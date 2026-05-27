// app/[locale]/portal/(dashboard)/goals/page.js
import { cookies } from 'next/headers';
import { requireOnboardedClient } from '../../../../_lib/portal/auth';
import { serverClient } from '../../../../_lib/portal/supabase';
import { portalT, PORTAL_LOCALES } from '../../../../_i18n/portal-dictionary';
import GoalsManager from './GoalsManager';

export const dynamic = 'force-dynamic';

export default async function GoalsPage({ params }) {
  const { locale } = await params;
  const safeLocale = PORTAL_LOCALES.includes(locale) ? locale : 'uk';
  const { user } = await requireOnboardedClient(safeLocale);
  const t = portalT(safeLocale);
  const supabase = serverClient(cookies);

  const { data: goals } = await supabase
    .from('portal_goals')
    .select('*')
    .eq('user_id', user.id)
    .order('created_at', { ascending: true });

  return (
    <GoalsManager
      initialGoals={goals || []}
      userId={user.id}
      locale={safeLocale}
      t={t}
    />
  );
}
