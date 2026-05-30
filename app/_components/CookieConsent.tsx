// app/_components/CookieConsent.tsx
// PIPEDA-compliant informational cookie banner — shown once, dismissible.
// Stores choice in localStorage to suppress on subsequent visits.
// Doesn't block analytics (Canadian implied-consent model); for users who want
// to opt out, /cookies page documents browser-level methods + GA opt-out.

'use client';

import { usePathname } from 'next/navigation';
import { useLocalStorage, useIsMounted } from '../_lib/hooks';

type Locale = 'uk' | 'ru' | 'en';

const STORAGE_KEY = 'skyfort:cookies:ack';
const SUPPORTED: Locale[] = ['uk', 'ru', 'en'];

interface CookieCopy {
  text: string;
  learn: string;
  ack: string;
}

const COPY: Record<Locale, CookieCopy> = {
  uk: {
    text: 'Сайт використовує cookies для аналітики (Google Analytics, Microsoft Clarity) і email-розсилки (Brevo). Натискаючи "OK" — підтверджуєш ознайомлення.',
    learn: 'Деталі',
    ack: 'OK',
  },
  ru: {
    text: 'Сайт использует cookies для аналитики (Google Analytics, Microsoft Clarity) и email-рассылки (Brevo). Нажимая "OK" — подтверждаешь ознакомление.',
    learn: 'Детали',
    ack: 'OK',
  },
  en: {
    text: 'This site uses cookies for analytics (Google Analytics, Microsoft Clarity) and email marketing (Brevo). Clicking "OK" confirms you have read this notice.',
    learn: 'Details',
    ack: 'OK',
  },
};

function localeFromPath(p: string): Locale {
  const first = p?.split('/')[1];
  return SUPPORTED.includes(first as Locale) ? (first as Locale) : 'uk';
}

export default function CookieConsent() {
  const pathname = usePathname() || '/';
  // isMounted gates rendering until after hydration so SSR markup matches.
  // useLocalStorage subscribes to the `storage` event so the banner reacts
  // immediately when ack() dispatches one manually.
  const isMounted = useIsMounted();
  const acked = useLocalStorage(STORAGE_KEY);

  // Hide on /portal/* (own privacy context) and /admin/*
  const hideOnRoute = pathname.includes('/portal') || pathname.includes('/admin');
  // Show banner only after hydration AND when no ack present.
  // (`acked` is `null` on SSR + when key missing; both reduce to "not acked".)
  const show = isMounted && !acked;

  function ack() {
    try {
      localStorage.setItem(STORAGE_KEY, new Date().toISOString());
      // The native `storage` event only fires in OTHER tabs. Dispatch manually
      // so this tab's useSyncExternalStore subscribers re-snapshot and hide the
      // banner immediately.
      window.dispatchEvent(new StorageEvent('storage', { key: STORAGE_KEY }));
    } catch {}
  }

  if (!show || hideOnRoute) return null;

  const locale = localeFromPath(pathname);
  const c = COPY[locale] || COPY.uk;

  return (
    <div
      role="dialog"
      aria-live="polite"
      aria-label="Cookie notice"
      style={{
        position: 'fixed',
        bottom: 16,
        left: 16,
        right: 16,
        maxWidth: 720,
        margin: '0 auto',
        background: '#1f1f1f',
        border: '1px solid #3a3a3a',
        borderRadius: 14,
        padding: '14px 18px',
        display: 'flex',
        gap: 12,
        alignItems: 'center',
        flexWrap: 'wrap',
        zIndex: 1100,
        boxShadow: '0 20px 40px rgba(0,0,0,.35)',
        fontSize: 13,
        color: '#fafafa',
        lineHeight: 1.5,
      }}
    >
      <span style={{ flex: 1, minWidth: 240 }}>{c.text}</span>
      <a
        href={`/${locale}/cookies`}
        style={{
          fontSize: 12,
          fontWeight: 600,
          color: '#fafafa',
          textDecoration: 'underline',
          textUnderlineOffset: 2,
        }}
      >
        {c.learn}
      </a>
      <button
        onClick={ack}
        style={{
          padding: '8px 18px',
          borderRadius: 999,
          border: 'none',
          background: 'var(--color-brand)',
          color: '#fff',
          fontWeight: 700,
          fontSize: 13,
          cursor: 'pointer',
          fontFamily: 'inherit',
        }}
      >
        {c.ack}
      </button>
    </div>
  );
}
