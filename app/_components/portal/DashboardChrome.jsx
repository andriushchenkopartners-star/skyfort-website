// app/_components/portal/DashboardChrome.jsx
// Client wrapper for the dashboard shell — handles the mobile drawer state.
// Desktop ≥1024px: fixed sidebar + main column.
// Mobile <1024px: sidebar hidden behind drawer, hamburger in header opens it.

'use client';

import { useState, useEffect } from 'react';
import { usePathname } from 'next/navigation';
import PortalSidebar from './PortalSidebar';
import PortalHeader from './PortalHeader';

export default function DashboardChrome({
  locale,
  t,
  client,
  documentsBadge = 0,
  unreadBell = false,
  children,
}) {
  const pathname = usePathname();
  // Store the path the drawer was opened on. The drawer is "open" only when
  // the current path matches. When the user navigates (pathname changes),
  // drawerOpen becomes false automatically — no useEffect+setState needed.
  // This avoids the react-hooks/set-state-in-effect violation we'd hit by
  // calling setDrawerOpen(false) inside a useEffect([pathname]).
  const [openedAtPath, setOpenedAtPath] = useState(null);
  const drawerOpen = openedAtPath !== null && openedAtPath === pathname;

  const openDrawer = () => setOpenedAtPath(pathname);
  const closeDrawer = () => setOpenedAtPath(null);

  // Close on Escape — pure DOM side effect, no setState-in-effect issue.
  useEffect(() => {
    if (!drawerOpen) return;
    const onKey = (e) => {
      if (e.key === 'Escape') setOpenedAtPath(null);
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [drawerOpen]);

  // Lock body scroll while drawer is open — pure DOM mutation, no setState.
  useEffect(() => {
    document.body.style.overflow = drawerOpen ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [drawerOpen]);

  return (
    <div className="portal-shell">
      {/* Sidebar — fixed-position on mobile (drawer), inline on desktop */}
      <div
        className={`portal-sidebar-wrap ${drawerOpen ? 'is-open' : ''}`}
        aria-hidden={!drawerOpen && undefined}
      >
        <PortalSidebar
          locale={locale}
          t={t}
          clientName={client.full_name}
          clientInitials={client.initials}
          memberSince={
            client.member_since
              ? new Date(client.member_since).getFullYear()
              : null
          }
          documentsBadge={documentsBadge}
        />
      </div>

      {/* Backdrop (mobile only, visible when drawer open) */}
      <div
        className={`portal-backdrop ${drawerOpen ? 'is-open' : ''}`}
        onClick={closeDrawer}
        aria-hidden="true"
      />

      {/* Main column */}
      <main className="portal-main">
        <PortalHeader
          locale={locale}
          t={t}
          unreadBell={unreadBell}
          onMenuClick={() => (drawerOpen ? closeDrawer() : openDrawer())}
        />
        <div className="portal-content">{children}</div>
      </main>

      <style>{`
        .portal-shell {
          display: grid;
          grid-template-columns: 232px 1fr;
          min-height: 100vh;
        }
        .portal-sidebar-wrap > aside {
          height: 100vh;
          position: sticky;
          top: 0;
        }
        .portal-main { min-width: 0; }
        .portal-content { padding: 28px 32px 60px; }
        .portal-backdrop { display: none; }

        @media (max-width: 1023px) {
          .portal-shell { grid-template-columns: 1fr; }
          .portal-sidebar-wrap {
            position: fixed;
            top: 0;
            left: 0;
            bottom: 0;
            width: min(82vw, 320px);
            z-index: 1001;
            transform: translateX(-100%);
            transition: transform 0.28s ease-out;
            box-shadow: 0 20px 40px rgba(11,13,16,.12);
          }
          .portal-sidebar-wrap.is-open { transform: translateX(0); }
          .portal-sidebar-wrap > aside { position: static; height: 100vh; }
          .portal-backdrop {
            display: block;
            position: fixed;
            inset: 0;
            background: rgba(11,13,16,.45);
            backdrop-filter: blur(4px);
            opacity: 0;
            pointer-events: none;
            transition: opacity 0.2s;
            z-index: 1000;
          }
          .portal-backdrop.is-open {
            opacity: 1;
            pointer-events: auto;
          }
          .portal-content { padding: 20px 16px 40px; }
        }
      `}</style>
    </div>
  );
}
