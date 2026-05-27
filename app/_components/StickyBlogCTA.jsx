// app/_components/StickyBlogCTA.jsx
// Reveal-on-scroll CTA bar that appears after the reader is past ~40% of
// the page. Mobile: full-width bottom bar. Desktop: floating bottom-right card.
// Dismissible — choice stored in sessionStorage (not localStorage, so it
// reappears on a fresh visit a few days later).

'use client';

import { useState, useEffect } from 'react';
import { Calendar, X, ArrowRight } from 'lucide-react';
import { track } from '../_lib/analytics';
import { useSessionStorage } from '../_lib/hooks';

const STORAGE_KEY = 'skyfort:blog-cta:dismissed';
const REVEAL_THRESHOLD = 0.4; // 40% scrolled

const COPY = {
  uk: {
    eyebrow: 'Хочеш свою ситуацію персонально?',
    title: 'Безкоштовний 30-хв discovery call',
    sub: 'Розберемо твої цифри. Без впарювання.',
    cta: 'Записатись',
    dismiss: 'Закрити',
  },
  ru: {
    eyebrow: 'Хочешь разобрать свою ситуацию?',
    title: 'Бесплатный 30-мин discovery call',
    sub: 'Разберём твои цифры. Без впаривания.',
    cta: 'Записаться',
    dismiss: 'Закрыть',
  },
  en: {
    eyebrow: 'Want a personal review?',
    title: 'Free 30-min discovery call',
    sub: 'Walk through your numbers. No pressure.',
    cta: 'Book a call',
    dismiss: 'Dismiss',
  },
};

export default function StickyBlogCTA({ locale = 'uk', calendlyUrl, slug }) {
  const [visible, setVisible] = useState(false);
  // Dismissal state: source of truth is sessionStorage (persists across page
  // reloads in the same tab). `localDismissed` flips immediately on click so
  // the CTA hides without waiting for storage roundtrip. Derived `dismissed`
  // ORs them together — no setState-in-effect needed for the storage read.
  const dismissedStored = useSessionStorage(STORAGE_KEY);
  const [localDismissed, setLocalDismissed] = useState(false);
  const dismissed = dismissedStored === '1' || localDismissed;

  const c = COPY[locale] || COPY.uk;

  // Scroll listener: setVisible runs inside an async event handler, NOT
  // synchronously during render or mount, so the set-state-in-effect rule
  // does not apply. Bail early if already dismissed so we don't waste cycles.
  useEffect(() => {
    if (dismissed) return;

    const onScroll = () => {
      const doc = document.documentElement;
      const scrolled = window.scrollY;
      const maxScroll = doc.scrollHeight - window.innerHeight;
      if (maxScroll <= 0) return;
      const pct = scrolled / maxScroll;
      if (pct >= REVEAL_THRESHOLD) {
        setVisible(true);
      }
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll(); // run once in case already scrolled
    return () => window.removeEventListener('scroll', onScroll);
  }, [dismissed]);

  function dismiss() {
    try {
      sessionStorage.setItem(STORAGE_KEY, '1');
    } catch {}
    setLocalDismissed(true);
    track('blog_cta_dismiss', { source: `blog_post:${slug || 'unknown'}` });
  }

  function handleClick() {
    track('book_call_click', { source: `blog_post_sticky:${slug || 'unknown'}` });
  }

  if (dismissed || !visible) return null;

  return (
    <div
      role="complementary"
      aria-label={c.eyebrow}
      className="sticky-blog-cta"
      style={{
        position: 'fixed',
        zIndex: 90,
        background: 'linear-gradient(135deg, #1a2438 0%, #0d2860 100%)',
        border: '1px solid rgba(45,115,227,.4)',
        borderRadius: 16,
        boxShadow: '0 20px 50px rgba(0,0,0,.45)',
        padding: '14px 18px',
        display: 'flex',
        alignItems: 'center',
        gap: 14,
        color: '#fafafa',
        animation: 'sf-slide-up .3s ease-out',
      }}
    >
      <div style={{ flex: 1, minWidth: 0 }}>
        <div
          style={{
            fontSize: 10.5,
            fontWeight: 700,
            letterSpacing: '0.12em',
            textTransform: 'uppercase',
            color: 'var(--color-brand)',
          }}
        >
          {c.eyebrow}
        </div>
        <div style={{ marginTop: 4, fontSize: 15, fontWeight: 700, color: '#fff' }}>
          {c.title}
        </div>
        <div className="sticky-cta-sub" style={{ marginTop: 2, fontSize: 12, color: 'rgba(250,250,250,.7)' }}>
          {c.sub}
        </div>
      </div>

      <a
        href={calendlyUrl}
        target="_blank"
        rel="noopener noreferrer"
        onClick={handleClick}
        className="sticky-cta-btn"
        style={{
          display: 'inline-flex',
          alignItems: 'center',
          gap: 6,
          padding: '10px 18px',
          background: 'var(--color-brand)',
          color: '#fff',
          fontSize: 13,
          fontWeight: 700,
          borderRadius: 999,
          textDecoration: 'none',
          whiteSpace: 'nowrap',
        }}
      >
        <Calendar size={14} aria-hidden="true" />
        <span>{c.cta}</span>
        <ArrowRight size={14} aria-hidden="true" />
      </a>

      <button
        type="button"
        onClick={dismiss}
        aria-label={c.dismiss}
        style={{
          width: 28,
          height: 28,
          borderRadius: 999,
          border: 'none',
          background: 'rgba(255,255,255,.1)',
          color: '#fafafa',
          display: 'grid',
          placeItems: 'center',
          cursor: 'pointer',
          flexShrink: 0,
        }}
      >
        <X size={14} aria-hidden="true" />
      </button>

      <style>{`
        @keyframes sf-slide-up {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        /* Desktop: bottom-right floating card */
        @media (min-width: 768px) {
          .sticky-blog-cta {
            bottom: 24px;
            right: 24px;
            max-width: 460px;
          }
        }
        /* Mobile: full-width bottom bar */
        @media (max-width: 767px) {
          .sticky-blog-cta {
            bottom: 12px;
            left: 12px;
            right: 12px;
            border-radius: 14px;
            padding: 12px 14px;
            gap: 10px;
          }
          .sticky-cta-sub { display: none; }
          .sticky-cta-btn { padding: 8px 12px !important; font-size: 12px !important; }
        }
      `}</style>
    </div>
  );
}
