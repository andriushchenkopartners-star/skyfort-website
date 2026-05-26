// app/[locale]/portal/overview/page.js
// Placeholder until Phase 3 builds the real dashboard.

import { requireOnboardedClient } from '../../../_lib/portal/auth';
import { portalT, PORTAL_LOCALES } from '../../../_i18n/portal-dictionary';
import Btn from '../../../_components/portal/Btn';
import Card from '../../../_components/portal/Card';
import Eyebrow from '../../../_components/portal/Eyebrow';
import SFLogotype from '../../../_components/portal/SFLogotype';

export const dynamic = 'force-dynamic';

export default async function OverviewPlaceholder({ params }) {
  const { locale } = await params;
  const safeLocale = PORTAL_LOCALES.includes(locale) ? locale : 'uk';
  const { user, client } = await requireOnboardedClient(safeLocale);
  const t = portalT(safeLocale);

  return (
    <div style={{ minHeight: '100vh', padding: '32px 24px' }}>
      <div style={{ maxWidth: 720, margin: '0 auto' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 28 }}>
          <SFLogotype height={18} color="var(--portal-ink)" />
          <form action={`/${safeLocale}/portal/logout`} method="POST">
            <Btn variant="paper" size="sm" type="submit">
              {safeLocale === 'uk' ? 'Вийти' : safeLocale === 'ru' ? 'Выйти' : 'Sign out'}
            </Btn>
          </form>
        </div>

        <Card pad={28}>
          <Eyebrow>{t.welcome}</Eyebrow>
          <h1
            style={{
              margin: '8px 0',
              fontSize: 28,
              fontWeight: 800,
              letterSpacing: '-0.02em',
              color: 'var(--portal-ink)',
            }}
          >
            {t.greeting_morning}, {client.full_name}
          </h1>
          <p style={{ fontSize: 14, color: 'var(--portal-mute)', lineHeight: 1.55, marginBottom: 22 }}>
            {safeLocale === 'uk'
              ? 'Кабінет створено. Повний дашборд (баланси, цілі, графіки, документи) зʼявиться у наступній фазі розробки. Поки що — лише налаштування профілю готове.'
              : safeLocale === 'ru'
              ? 'Кабинет создан. Полный дашборд (балансы, цели, графики, документы) появится в следующей фазе разработки. Пока готово только настройка профиля.'
              : 'Your portal is created. The full dashboard (balances, goals, charts, documents) is coming in the next development phase. For now, only profile setup is ready.'}
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
    </div>
  );
}
