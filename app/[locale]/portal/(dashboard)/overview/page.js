// app/[locale]/portal/(dashboard)/overview/page.js
// Dashboard overview screen. Layout chrome (sidebar/header) comes from the
// (dashboard)/layout.js wrapper; this file is just the page content.
//
// Phase 2 status: placeholder card with profile info + EMD disclaimer.
// Phase 3 will replace this with the full overview (balances, growth chart,
// allocation ring, todo list, advisor card, recent activity).

import { requireOnboardedClient } from '../../../../_lib/portal/auth';
import { portalT, PORTAL_LOCALES } from '../../../../_i18n/portal-dictionary';
import Card from '../../../../_components/portal/Card';
import Eyebrow from '../../../../_components/portal/Eyebrow';
import { greetingKey } from '../../../../_lib/portal/constants';

export const dynamic = 'force-dynamic';

export default async function OverviewPage({ params }) {
  const { locale } = await params;
  const safeLocale = PORTAL_LOCALES.includes(locale) ? locale : 'uk';
  const { user, client } = await requireOnboardedClient(safeLocale);
  const t = portalT(safeLocale);

  // Local greeting (server-rendered; uses Mountain Time as the practice base).
  const hour = new Date().toLocaleString('en-CA', {
    timeZone: 'America/Edmonton',
    hour: 'numeric',
    hour12: false,
  });
  const greeting = t[greetingKey(parseInt(hour, 10))] || t.greeting_morning;

  return (
    <div style={{ maxWidth: 900 }}>
      <Eyebrow>{t.welcome}</Eyebrow>
      <h1
        style={{
          margin: '8px 0 18px',
          fontSize: 32,
          fontWeight: 800,
          letterSpacing: '-0.025em',
          color: 'var(--portal-ink)',
          lineHeight: 1.1,
        }}
      >
        {greeting}, {client.full_name}
      </h1>

      <Card pad={28}>
        <p style={{ fontSize: 14, color: 'var(--portal-mute)', lineHeight: 1.55, marginBottom: 18 }}>
          {safeLocale === 'uk'
            ? 'Кабінет створено. Повний дашборд (баланси, цілі, графіки, документи) додається у наступній фазі. Поки що — профіль і дашборд-shell.'
            : safeLocale === 'ru'
            ? 'Кабинет создан. Полный дашборд (балансы, цели, графики, документы) добавляется в следующей фазе. Пока что — профиль и дашборд-shell.'
            : 'Your portal is set up. The full dashboard (balances, goals, charts, documents) is coming in the next phase. For now — profile and dashboard shell.'}
        </p>

        <div
          style={{
            background: 'var(--portal-paper)',
            border: '1px solid var(--portal-line)',
            borderRadius: 12,
            padding: 16,
            fontSize: 13,
            color: 'var(--portal-mute)',
            lineHeight: 1.5,
          }}
        >
          <div>
            <strong style={{ color: 'var(--portal-ink)' }}>{t.licensed_in}:</strong>{' '}
            {client.jurisdictions?.join(' · ') || '—'}
          </div>
          <div style={{ marginTop: 4 }}>
            <strong style={{ color: 'var(--portal-ink)' }}>{t.lang_label}:</strong>{' '}
            {client.preferred_lang?.toUpperCase() || '—'}
          </div>
          <div style={{ marginTop: 4 }}>
            <strong style={{ color: 'var(--portal-ink)' }}>Email:</strong> {user.email}
          </div>
        </div>
      </Card>

      <p
        style={{
          marginTop: 18,
          fontSize: 11,
          color: 'var(--portal-mute)',
          textAlign: 'center',
          lineHeight: 1.55,
        }}
      >
        {t.not_official_statement}
        <br />
        {t.emd_disclaimer}
      </p>
    </div>
  );
}
