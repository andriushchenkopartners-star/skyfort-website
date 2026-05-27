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

// Inline CSS variables for the portal theme — set directly on the wrapper
// so the values are guaranteed regardless of CSS cascade or Turbopack hot-reload state.
const PORTAL_THEME = {
  '--portal-blue': '#2D73E3',
  '--portal-blue-ink': '#1956c4',
  '--portal-blue-soft': '#e8f0fd',
  '--portal-ink': '#0b0d10',
  '--portal-ink-2': '#1a1d22',
  '--portal-ink-3': '#2a2e35',
  '--portal-paper': '#f6f4ef',
  '--portal-paper-2': '#ecebe5',
  '--portal-line': '#e3e1da',
  '--portal-line-strong': '#cbc9c1',
  '--portal-mute': '#6b6b66',
  '--portal-positive': '#1f8a5b',
  '--portal-negative': '#c34a3a',
  '--portal-warn': '#b7791f',
  background: '#f6f4ef',
  color: '#0b0d10',
  minHeight: '100vh',
  fontFamily: 'var(--font-portal-display), "Inter Tight", system-ui, -apple-system, sans-serif',
  position: 'relative',
  zIndex: 1,
};

export default async function PortalLayout({ children, params }) {
  const { locale } = await params;
  if (!SUPPORTED_LOCALES.includes(locale)) notFound();

  return (
    <div
      data-portal-theme="light"
      className={`${interTight.variable} ${jetbrainsMono.variable}`}
      style={PORTAL_THEME}
    >
      {children}
    </div>
  );
}
