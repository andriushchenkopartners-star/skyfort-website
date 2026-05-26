// app/[locale]/portal/login/page.js
// Magic-link sign-in entry.

import { redirect } from 'next/navigation';
import { getCurrentUser } from '../../../_lib/portal/auth';
import { portalT, PORTAL_LOCALES } from '../../../_i18n/portal-dictionary';
import LoginForm from './LoginForm';

export const dynamic = 'force-dynamic';

export default async function LoginPage({ params }) {
  const { locale } = await params;
  if (!PORTAL_LOCALES.includes(locale)) {
    redirect(`/uk/portal/login`);
  }

  // If already logged in, skip the form.
  const user = await getCurrentUser();
  if (user) {
    redirect(`/${locale}/portal`);
  }

  const t = portalT(locale);
  return <LoginForm locale={locale} t={t} />;
}
