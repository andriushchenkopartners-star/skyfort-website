// app/[locale]/portal/page.js
// Root of /uk/portal — sends user to login, onboarding, or dashboard depending on state.

import { redirect } from 'next/navigation';
import { getCurrentUser, getCurrentClient } from '../../_lib/portal/auth';

export const dynamic = 'force-dynamic';

export default async function PortalRoot({ params }) {
  const { locale } = await params;
  const user = await getCurrentUser();

  if (!user) {
    redirect(`/${locale}/portal/login`);
  }

  const client = await getCurrentClient();
  if (!client || !client.onboarding_completed_at) {
    redirect(`/${locale}/portal/onboarding`);
  }

  // Dashboard not built yet (Phase 3) — for now show a placeholder.
  redirect(`/${locale}/portal/overview`);
}
