// app/_components/portal/PortalHeader.jsx
// Top bar for the portal dashboard: breadcrumb + lang switcher + bell + book CTA.
// Client component because of the dropdown + book modal triggers.

'use client';

import { useState } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import Btn from './Btn';
import { PortalIcons as I } from './icons';

const LANGS = [
  { code: 'en', label: 'IN ENGLISH', short: 'EN' },
  { code: 'ru', label: 'НА РУССКОМ', short: 'RU' },
  { code: 'uk', label: 'УКРАЇНСЬКОЮ', short: 'UK' },
];

/** Pull the current route key from `/uk/portal/<key>` for the breadcrumb label */
function routeKeyFromPath(pathname) {
  const m = pathname?.match(/\/portal\/([^/?#]+)/);
  return m ? m[1] : 'overview';
}

export default function PortalHeader({
  locale = 'uk',
  t,
  unreadBell = false,
  onBookClick,
  onMenuClick,
}) {
  const router = useRouter();
  const pathname = usePathname() || '';
  const [showLangMenu, setShowLangMenu] = useState(false);

  const currentKey = routeKeyFromPath(pathname);
  const sectionLabel = (t?.nav?.[currentKey] || currentKey).toUpperCase();

  function switchLang(newLocale) {
    if (newLocale === locale) {
      setShowLangMenu(false);
      return;
    }
    // Swap the locale segment in the URL: /uk/portal/... → /ru/portal/...
    const newPath = pathname.replace(/^\/[a-z]{2}/, `/${newLocale}`);
    setShowLangMenu(false);
    router.push(newPath);
  }

  return (
    <header
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '18px 32px',
        borderBottom: '1px solid var(--portal-line)',
        position: 'sticky',
        top: 0,
        background: 'rgba(246,244,239,.85)',
        backdropFilter: 'blur(10px)',
        zIndex: 5,
      }}
    >
      {/* Left side: optional hamburger (mobile) + breadcrumb */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
        {onMenuClick && (
          <button
            type="button"
            onClick={onMenuClick}
            className="portal-menu-btn"
            aria-label="Open menu"
            style={{
              display: 'none', // shown only via @media, see globals
              width: 36,
              height: 36,
              borderRadius: 10,
              border: '1px solid var(--portal-line)',
              background: '#fff',
              color: 'var(--portal-ink)',
              cursor: 'pointer',
              placeItems: 'center',
            }}
          >
            <svg width="16" height="16" viewBox="0 0 16 16" aria-hidden="true">
              <path d="M2 4h12M2 8h12M2 12h12" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
            </svg>
          </button>
        )}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: 8,
            fontSize: 11,
            color: 'var(--portal-mute)',
            fontFamily:
              'var(--font-portal-mono), "JetBrains Mono", ui-monospace, Menlo, monospace',
            letterSpacing: '.06em',
          }}
        >
          <span>SKYFORT.CA</span>
          <span>/</span>
          <span style={{ color: 'var(--portal-ink)', fontWeight: 600 }}>
            {sectionLabel}
          </span>
        </div>
      </div>

      {/* Right side: lang switcher + bell + book CTA */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
        {/* Lang switcher */}
        <div style={{ position: 'relative' }}>
          <button
            type="button"
            onClick={() => setShowLangMenu((v) => !v)}
            aria-haspopup="menu"
            aria-expanded={showLangMenu}
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: 8,
              padding: '8px 12px',
              border: '1px solid var(--portal-line)',
              borderRadius: 10,
              background: '#fff',
              cursor: 'pointer',
              fontFamily: 'inherit',
              color: 'inherit',
              fontSize: 12,
              fontWeight: 600,
            }}
          >
            {I.globe}
            <span>{LANGS.find((l) => l.code === locale)?.short || 'UK'}</span>
          </button>
          {showLangMenu && (
            <div
              role="menu"
              style={{
                position: 'absolute',
                top: 'calc(100% + 6px)',
                right: 0,
                background: '#fff',
                color: 'var(--portal-ink)',
                border: '1px solid var(--portal-line)',
                borderRadius: 12,
                padding: 6,
                boxShadow: '0 10px 30px rgba(11,13,16,.10)',
                minWidth: 200,
                zIndex: 100,
              }}
            >
              {LANGS.map((L) => (
                <button
                  key={L.code}
                  type="button"
                  role="menuitemradio"
                  aria-checked={locale === L.code}
                  onClick={() => switchLang(L.code)}
                  style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    width: '100%',
                    padding: '10px 12px',
                    background: locale === L.code ? 'var(--portal-paper)' : 'transparent',
                    border: 'none',
                    borderRadius: 8,
                    cursor: 'pointer',
                    fontWeight: locale === L.code ? 700 : 500,
                    fontSize: 12.5,
                    color:
                      locale === L.code ? 'var(--color-brand)' : 'var(--portal-ink)',
                    fontFamily: 'inherit',
                  }}
                >
                  <span>{L.label}</span>
                  {locale === L.code && (
                    <span style={{ color: 'var(--color-brand)' }}>{I.check}</span>
                  )}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Bell with optional unread dot */}
        <button
          type="button"
          aria-label="Notifications"
          style={{
            width: 36,
            height: 36,
            borderRadius: 10,
            border: '1px solid var(--portal-line)',
            background: '#fff',
            display: 'grid',
            placeItems: 'center',
            cursor: 'pointer',
            color: 'inherit',
            position: 'relative',
          }}
        >
          {I.bell}
          {unreadBell && (
            <span
              aria-hidden="true"
              style={{
                position: 'absolute',
                top: 9,
                right: 9,
                width: 6,
                height: 6,
                borderRadius: 6,
                background: 'var(--color-brand)',
              }}
            />
          )}
        </button>

        {/* Book a call */}
        <Btn variant="ink" size="sm" icon={I.calendar} onClick={onBookClick}>
          {t?.book_call || 'Book a call'}
        </Btn>
      </div>
    </header>
  );
}
