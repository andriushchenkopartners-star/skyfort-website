// app/_components/portal/PortalSidebar.tsx
// Left navigation rail for the portal dashboard. Pure client component
// because it uses usePathname() to highlight the active route.

'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import SFLogotype from './SFLogotype';
import SFMark from './SFMark';
import Eyebrow from './Eyebrow';
import { PortalIcons as I } from './icons';

// Minimal shape of the portal dictionary slice this sidebar reads.
interface PortalSidebarT {
  nav?: Record<string, string>;
  ca_finance_for_newcomers?: string;
  services?: string;
}

interface PortalSidebarProps {
  locale?: string;
  t?: PortalSidebarT;
  clientName?: string;
  clientInitials?: string;
  memberSince?: number | null;
  documentsBadge?: number;
}

/** Returns the route key by reading the URL: '/uk/portal/overview' → 'overview' */
function routeKeyFromPath(pathname: string) {
  const m = pathname?.match(/\/portal\/([^/?#]+)/);
  return m ? m[1] : 'overview';
}

const NAV_ITEMS = [
  { key: 'overview', icon: 'overview' },
  { key: 'accounts', icon: 'accounts' },
  { key: 'goals', icon: 'goals' },
  { key: 'advisor', icon: 'advisor' },
  { key: 'documents', icon: 'documents' },
];

function NavIcon({ kind }: { kind: string }) {
  if (kind === 'overview')
    return (
      <svg width="16" height="16" viewBox="0 0 16 16" aria-hidden="true">
        <rect x="2" y="2" width="5" height="5" rx="1" fill="none" stroke="currentColor" strokeWidth="1.4" />
        <rect x="9" y="2" width="5" height="5" rx="1" fill="none" stroke="currentColor" strokeWidth="1.4" />
        <rect x="2" y="9" width="5" height="5" rx="1" fill="none" stroke="currentColor" strokeWidth="1.4" />
        <rect x="9" y="9" width="5" height="5" rx="1" fill="none" stroke="currentColor" strokeWidth="1.4" />
      </svg>
    );
  if (kind === 'accounts')
    return (
      <svg width="16" height="16" viewBox="0 0 16 16" aria-hidden="true">
        <rect x="2" y="4" width="12" height="9" rx="1.5" fill="none" stroke="currentColor" strokeWidth="1.4" />
        <path d="M2 7h12" stroke="currentColor" strokeWidth="1.4" />
      </svg>
    );
  if (kind === 'goals')
    return (
      <svg width="16" height="16" viewBox="0 0 16 16" aria-hidden="true">
        <circle cx="8" cy="8" r="5.5" fill="none" stroke="currentColor" strokeWidth="1.4" />
        <circle cx="8" cy="8" r="2.5" fill="none" stroke="currentColor" strokeWidth="1.4" />
        <circle cx="8" cy="8" r="0.5" fill="currentColor" />
      </svg>
    );
  if (kind === 'advisor')
    return (
      <svg width="16" height="16" viewBox="0 0 16 16" aria-hidden="true">
        <circle cx="8" cy="5.5" r="2.5" fill="none" stroke="currentColor" strokeWidth="1.4" />
        <path
          d="M3 14c.5-2.5 2.7-4 5-4s4.5 1.5 5 4"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.4"
          strokeLinecap="round"
        />
      </svg>
    );
  if (kind === 'documents') return I.doc;
  return null;
}

export default function PortalSidebar({
  locale = 'uk',
  t,
  clientName = '',
  clientInitials = '',
  memberSince,
  documentsBadge,
}: PortalSidebarProps) {
  const pathname = usePathname() || '';
  const currentKey = routeKeyFromPath(pathname);

  return (
    <aside
      style={{
        position: 'sticky',
        top: 0,
        height: '100vh',
        padding: '22px 18px',
        borderRight: '1px solid var(--portal-line)',
        display: 'flex',
        flexDirection: 'column',
        gap: 28,
        background: '#fcfbf8',
      }}
    >
      {/* Logo */}
      <div style={{ padding: '4px 6px' }}>
        <SFLogotype height={20} color="var(--portal-ink)" />
      </div>

      {/* Nav */}
      <nav style={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
        {NAV_ITEMS.map((item) => {
          const active = currentKey === item.key;
          const label = t?.nav?.[item.key] || item.key;
          return (
            <Link
              key={item.key}
              href={`/${locale}/portal/${item.key}`}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: 12,
                padding: '10px 12px',
                borderRadius: 10,
                border: '1px solid transparent',
                background: active ? '#fff' : 'transparent',
                color: active ? 'var(--portal-ink)' : 'var(--portal-mute)',
                fontWeight: active ? 700 : 500,
                fontSize: 13.5,
                textDecoration: 'none',
                boxShadow: active ? '0 1px 0 var(--portal-line)' : 'none',
                textAlign: 'left',
              }}
            >
              <span
                style={{
                  width: 16,
                  height: 16,
                  display: 'inline-flex',
                  color: active ? 'var(--color-brand)' : 'currentColor',
                }}
              >
                <NavIcon kind={item.icon} />
              </span>
              {label}
              {item.key === 'documents' && documentsBadge && documentsBadge > 0 && (
                <span
                  style={{
                    marginLeft: 'auto',
                    fontSize: 10,
                    fontWeight: 700,
                    padding: '2px 6px',
                    borderRadius: 5,
                    background: 'var(--color-brand)',
                    color: '#fff',
                  }}
                >
                  {documentsBadge}
                </span>
              )}
            </Link>
          );
        })}
      </nav>

      {/* Promo card */}
      <div
        style={{
          marginTop: 'auto',
          position: 'relative',
          overflow: 'hidden',
          borderRadius: 14,
          background: 'var(--color-brand)',
          color: '#fff',
          padding: 16,
        }}
      >
        <div style={{ position: 'absolute', right: -16, top: -16, opacity: 0.25 }}>
          <SFMark size={86} color="#fff" />
        </div>
        <Eyebrow color="rgba(255,255,255,.7)">SkyFort</Eyebrow>
        <div
          style={{
            marginTop: 8,
            fontSize: 14,
            fontWeight: 700,
            letterSpacing: '-0.015em',
            lineHeight: 1.2,
          }}
        >
          {t?.ca_finance_for_newcomers || 'Canadian finance for newcomers.'}
        </div>
        <div style={{ marginTop: 8, fontSize: 11, color: 'rgba(255,255,255,.7)' }}>
          {t?.services || 'TFSA · RRSP · FHSA · Exempt market · Real estate'}
        </div>
      </div>

      {/* User chip */}
      {(clientName || clientInitials) && (
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: 10,
            padding: '8px 6px',
            borderTop: '1px solid var(--portal-line)',
            paddingTop: 14,
          }}
        >
          <div
            style={{
              width: 32,
              height: 32,
              borderRadius: 32,
              background: 'var(--portal-ink)',
              color: '#fff',
              display: 'grid',
              placeItems: 'center',
              fontWeight: 700,
              fontSize: 12,
            }}
          >
            {clientInitials || (clientName ? clientName.slice(0, 2).toUpperCase() : '?')}
          </div>
          <div style={{ flex: 1, minWidth: 0 }}>
            <div
              style={{
                fontSize: 12.5,
                fontWeight: 600,
                lineHeight: 1.1,
                color: 'var(--portal-ink)',
                overflow: 'hidden',
                textOverflow: 'ellipsis',
                whiteSpace: 'nowrap',
              }}
            >
              {clientName || '—'}
            </div>
            {memberSince && (
              <div style={{ fontSize: 10.5, color: 'var(--portal-mute)' }}>
                {locale === 'uk'
                  ? `Клієнт з ${memberSince}`
                  : locale === 'ru'
                  ? `Клиент с ${memberSince}`
                  : `Member since ${memberSince}`}
              </div>
            )}
          </div>
          <form action={`/${locale}/portal/logout`} method="POST">
            <button
              type="submit"
              title={
                locale === 'uk'
                  ? 'Вийти'
                  : locale === 'ru'
                  ? 'Выйти'
                  : 'Sign out'
              }
              style={{
                background: 'transparent',
                border: 'none',
                color: 'var(--portal-mute)',
                cursor: 'pointer',
                padding: 4,
              }}
              aria-label="Sign out"
            >
              <svg width="14" height="14" viewBox="0 0 16 16" aria-hidden="true">
                <path
                  d="M10 12l3-4-3-4M13 8H6M9 2H3v12h6"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.4"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </button>
          </form>
        </div>
      )}
    </aside>
  );
}
