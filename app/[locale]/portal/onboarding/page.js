// app/[locale]/portal/onboarding/page.js
// First-time setup wizard. Requires logged-in user. Skipped if already onboarded.

import { redirect } from 'next/navigation';
import { cookies } from 'next/headers';
import { requireUser } from '../../../_lib/portal/auth';
import { serverClient } from '../../../_lib/portal/supabase';
import { portalT, PORTAL_LOCALES } from '../../../_i18n/portal-dictionary';
import OnboardingWizard from './OnboardingWizard';

export const dynamic = 'force-dynamic';

export default async function OnboardingPage({ params }) {
  const { locale } = await params;
  const safeLocale = PORTAL_LOCALES.includes(locale) ? locale : 'uk';
  const user = await requireUser(safeLocale);

  // If client row exists AND onboarding_completed_at is set, skip the wizard.
  const supabase = serverClient(cookies);
  const { data: client } = await supabase
    .from('portal_clients')
    .select('*')
    .eq('user_id', user.id)
    .maybeSingle();

  if (client?.onboarding_completed_at) {
    redirect(`/${safeLocale}/portal/overview`);
  }

  const t = portalT(safeLocale);
  return (
    <OnboardingWizard
      locale={safeLocale}
      t={t}
      userId={user.id}
      userEmail={user.email}
      existingClient={client}
    />
  );
}
