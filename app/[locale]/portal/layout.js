// app/[locale]/portal/layout.js
// SkyFort Client Portal — root layout for /uk/portal, /ru/portal, /en/portal.
// - Loads Inter Tight + JetBrains Mono (overrides Manrope inside portal scope)
// - Applies data-portal-theme="light" to flip to the paper theme
// - Sets noindex/nofollow — portal is private

import { notFound } from 'next/navigation';
import { Inter_Tight, JetBrains_Mono } from 'next/font/google';
import { SUPPORTED_LOCALES } from '../../_i18n/dictionary';

const interTight = Inter_Tight({
  subsets: ['latin', 'cyrillic'],
  weight: ['400', '500', '600', '700', '800', '900'],
  variable: '--font-portal-display',
  display: 'swap',
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  weight: ['400', '500'],
  variable: '--font-portal-mono',
  display: 'swap',
});

export const metadata = {
  title: 'SkyFort · Client Portal',
  robots: { index: false, follow: false, nocache: true },
};

export default async function PortalLayout({ children, params }) {
  const { locale } = await params;
  if (!SUPPORTED_LOCALES.includes(locale)) notFound();

  return (
    <div
      data-portal-theme="light"
      className={`${interTight.variable} ${jetbrainsMono.variable}`}
      style={{ minHeight: '100vh' }}
    >
      {children}
    </div>
  );
}
