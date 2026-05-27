// app/_components/CookieConsent.jsx
// PIPEDA-compliant informational cookie banner — shown once, dismissible.
// Stores choice in localStorage to suppress on subsequent visits.
// Doesn't block analytics (Canadian implied-consent model); for users who want
// to opt out, /cookies page documents browser-level methods + GA opt-out.

'use client';

import { useState, useEffect } from 'react';
import { usePathname } from 'next/navigation';

const STORAGE_KEY = 'skyfort:cookies:ack';
const SUPPORTED = ['uk', 'ru', 'en'];

const COPY = {
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

function localeFromPath(p) {
  const first = p?.split('/')[1];
  return SUPPORTED.includes(first) ? first : 'uk';
}

export default function CookieConsent() {
  const pathname = usePathname() || '/';
  const [show, setShow] = useState(false);

  // Hide on /portal/* (own privacy context) and /admin/*
  const hideOnRoute = pathname.includes('/portal') || pathname.includes('/admin');

  useEffect(() => {
    if (hideOnRoute) return;
    try {
      const acked = localStorage.getItem(STORAGE_KEY);
      if (!acked) setShow(true);
    } catch {
      // localStorage blocked (e.g., private mode) — just show
      setShow(true);
    }
  }, [hideOnRoute]);

  function ack() {
    try {
      localStorage.setItem(STORAGE_KEY, new Date().toISOString());
    } catch {}
    setShow(false);
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
