// app/[locale]/admin/portal/page.js
// Admin dashboard — KPI cards + searchable, sortable clients list.

import Link from 'next/link';
import { serviceClient } from '../../../_lib/portal/supabase';
import { PORTAL_LOCALES } from '../../../_i18n/portal-dictionary';
import { fmtMoney } from '../../../_lib/portal/fmt';
import Card from '../../../_components/portal/Card';
import Eyebrow from '../../../_components/portal/Eyebrow';
import Btn from '../../../_components/portal/Btn';
import SFLogotype from '../../../_components/portal/SFLogotype';
import { PortalIcons as I } from '../../../_components/portal/icons';

export const dynamic = 'force-dynamic';

const PAGE_SIZE = 50;

async function loadAdminData() {
  const sb = serviceClient();

  // Clients with auth.users email join
  const { data: clients } = await sb
    .from('portal_clients')
    .select('user_id,full_name,initials,preferred_lang,jurisdictions,kyc_last_verified,onboarding_completed_at,member_since,created_at,updated_at')
    .order('created_at', { ascending: false });

  const userIds = (clients || []).map((c) => c.user_id);

  // Aggregate balances + counts in parallel
  const [
    { data: accounts },
    { data: goals },
    { data: openTodos },
    { data: unreadMsgs },
    { data: authUsers },
  ] = await Promise.all([
    sb.from('portal_accounts').select('user_id,account_type,balance,ytd_contrib'),
    sb.from('portal_goals').select('user_id,saved,target,status'),
    sb.from('portal_todos').select('user_id').eq('status', 'open'),
    sb
      .from('portal_messages')
      .select('user_id')
      .eq('from_role', 'client')
      .is('read_at', null),
    sb.auth.admin.listUsers({ page: 1, perPage: PAGE_SIZE }),
  ]);

  // Build per-user totals
  const byUser = new Map();
  for (const c of clients || []) {
    byUser.set(c.user_id, {
      ...c,
      totalBalance: 0,
      ytdContrib: 0,
      accountCount: 0,
      goalCount: 0,
      openTodos: 0,
      unreadMsgs: 0,
      byType: {},
      email: null,
      lastSignIn: null,
    });
  }
  for (const a of accounts || []) {
    const u = byUser.get(a.user_id);
    if (!u) continue;
    u.totalBalance += parseFloat(a.balance) || 0;
    u.ytdContrib += parseFloat(a.ytd_contrib) || 0;
    u.accountCount += 1;
    const k = a.account_type;
    u.byType[k] = (u.byType[k] || 0) + (parseFloat(a.balance) || 0);
  }
  for (const g of goals || []) {
    const u = byUser.get(g.user_id);
    if (u) u.goalCount += 1;
  }
  for (const t of openTodos || []) {
    const u = byUser.get(t.user_id);
    if (u) u.openTodos += 1;
  }
  for (const m of unreadMsgs || []) {
    const u = byUser.get(m.user_id);
    if (u) u.unreadMsgs += 1;
  }
  for (const au of authUsers?.users || []) {
    const u = byUser.get(au.id);
    if (u) {
      u.email = au.email;
      u.lastSignIn = au.last_sign_in_at;
    }
  }

  return {
    clients: [...byUser.values()],
    accounts: accounts || [],
    totals: {
      clients: byUser.size,
      activeIn30d: [...byUser.values()].filter((u) => {
        if (!u.lastSignIn) return false;
        const days = (Date.now() - new Date(u.lastSignIn).getTime()) / 86400000;
        return days <= 30;
      }).length,
      onboarded: [...byUser.values()].filter((u) => u.onboarding_completed_at).length,
      openTodos: (openTodos || []).length,
      unreadMsgs: (unreadMsgs || []).length,
    },
  };
}

export default async function AdminPortalPage({ params, searchParams }) {
  const { locale } = await params;
  const sp = await searchParams;
  const safeLocale = PORTAL_LOCALES.includes(locale) ? locale : 'uk';
  const moneyLocale = { uk: 'uk-UA', ru: 'ru-RU', en: 'en-CA' }[safeLocale] || 'en-CA';

  const { clients, accounts, totals } = await loadAdminData();

  // Filter by search query (name or email contains)
  const q = ((sp?.q || '') + '').trim().toLowerCase();
  const filtered = q
    ? clients.filter(
        (c) =>
          c.full_name?.toLowerCase().includes(q) ||
          c.email?.toLowerCase().includes(q)
      )
    : clients;

  // Sort key from search params
  const sort = sp?.sort || 'recent';
  const sorted = [...filtered].sort((a, b) => {
    if (sort === 'aum') return b.totalBalance - a.totalBalance;
    if (sort === 'name') return (a.full_name || '').localeCompare(b.full_name || '');
    if (sort === 'last_signin') {
      const ta = a.lastSignIn ? new Date(a.lastSignIn).getTime() : 0;
      const tb = b.lastSignIn ? new Date(b.lastSignIn).getTime() : 0;
      return tb - ta;
    }
    // default: recent (by created_at)
    return new Date(b.created_at).getTime() - new Date(a.created_at).getTime();
  });

  // Aggregate AUM by account type for the bar chart
  const aumByType = {};
  for (const a of accounts) {
    aumByType[a.account_type] = (aumByType[a.account_type] || 0) + (parseFloat(a.balance) || 0);
  }
  const totalAUM = Object.values(aumByType).reduce((s, v) => s + v, 0);

  return (
    <div style={{ minHeight: '100vh', padding: '24px 28px 60px' }}>
      {/* Top bar */}
      <header
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginBottom: 28,
          paddingBottom: 18,
          borderBottom: '1px solid var(--portal-line)',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
          <SFLogotype height={22} color="var(--portal-ink)" />
          <span
            style={{
              fontSize: 10,
              fontWeight: 800,
              padding: '4px 8px',
              borderRadius: 5,
              background: 'var(--portal-warn)',
              color: '#fff',
              letterSpacing: '0.08em',
            }}
          >
            ADMIN
          </span>
        </div>
        <form action={`/${safeLocale}/portal/logout`} method="POST">
          <Btn variant="paper" size="sm" type="submit">
            {safeLocale === 'uk' ? 'Вийти' : safeLocale === 'ru' ? 'Выйти' : 'Sign out'}
          </Btn>
        </form>
      </header>

      {/* KPIs */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(160px, 1fr))',
          gap: 12,
          marginBottom: 24,
        }}
      >
        <KpiTile
          label={safeLocale === 'uk' ? 'Усього клієнтів' : safeLocale === 'ru' ? 'Всего клиентов' : 'Total clients'}
          value={totals.clients}
        />
        <KpiTile
          label={safeLocale === 'uk' ? 'Активні (30 дн)' : safeLocale === 'ru' ? 'Активные (30 дн)' : 'Active (30d)'}
          value={totals.activeIn30d}
          accent="var(--portal-positive)"
        />
        <KpiTile
          label={safeLocale === 'uk' ? 'Онбординг завершено' : safeLocale === 'ru' ? 'Онбординг завершён' : 'Onboarded'}
          value={`${totals.onboarded} / ${totals.clients}`}
        />
        <KpiTile
          label={safeLocale === 'uk' ? 'Сумарний AUM' : safeLocale === 'ru' ? 'Суммарный AUM' : 'Total AUM'}
          value={fmtMoney(totalAUM, moneyLocale, true)}
          accent="var(--color-brand)"
        />
        <KpiTile
          label={safeLocale === 'uk' ? 'Відкриті todo' : safeLocale === 'ru' ? 'Открытые todo' : 'Open todos'}
          value={totals.openTodos}
          accent={totals.openTodos > 0 ? 'var(--portal-warn)' : undefined}
        />
        <KpiTile
          label={safeLocale === 'uk' ? 'Непрочитані повідомлення' : safeLocale === 'ru' ? 'Непрочитанные сообщения' : 'Unread messages'}
          value={totals.unreadMsgs}
          accent={totals.unreadMsgs > 0 ? 'var(--portal-negative)' : undefined}
        />
      </div>

      {/* AUM by type */}
      {totalAUM > 0 && (
        <Card pad={22} style={{ marginBottom: 24 }}>
          <Eyebrow>AUM by account type</Eyebrow>
          <div style={{ marginTop: 14, display: 'flex', flexDirection: 'column', gap: 10 }}>
            {Object.entries(aumByType)
              .sort((a, b) => b[1] - a[1])
              .map(([type, sum]) => {
                const pct = (sum / totalAUM) * 100;
                return (
                  <div key={type} style={{ display: 'grid', gridTemplateColumns: '80px 1fr 110px', gap: 12, alignItems: 'center' }}>
                    <div style={{ fontSize: 12, fontWeight: 700, color: 'var(--portal-ink)', textTransform: 'uppercase', letterSpacing: '0.06em' }}>
                      {type}
                    </div>
                    <div style={{ height: 8, background: 'var(--portal-paper-2)', borderRadius: 4, overflow: 'hidden' }}>
                      <div
                        style={{
                          width: `${pct}%`,
                          height: '100%',
                          background: 'var(--color-brand)',
                        }}
                      />
                    </div>
                    <div className="portal-tabular" style={{ fontSize: 12.5, textAlign: 'right', fontWeight: 700, color: 'var(--portal-ink)' }}>
                      {fmtMoney(sum, moneyLocale, true)}
                      <span style={{ color: 'var(--portal-mute)', fontWeight: 500 }}> · {pct.toFixed(0)}%</span>
                    </div>
                  </div>
                );
              })}
          </div>
        </Card>
      )}

      {/* Clients list */}
      <Card pad={0}>
        <div
          style={{
            padding: '18px 22px',
            borderBottom: '1px solid var(--portal-line)',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            gap: 12,
            flexWrap: 'wrap',
          }}
        >
          <div>
            <Eyebrow>{safeLocale === 'uk' ? 'Клієнти' : safeLocale === 'ru' ? 'Клиенты' : 'Clients'}</Eyebrow>
            <div style={{ fontSize: 13, color: 'var(--portal-mute)', marginTop: 4 }}>
              {sorted.length}
              {q && ` / ${clients.length}`}
            </div>
          </div>

          {/* Search + sort form (GET params) */}
          <form method="GET" style={{ display: 'flex', gap: 8, alignItems: 'center', flexWrap: 'wrap' }}>
            <div
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: 8,
                padding: '6px 12px',
                border: '1px solid var(--portal-line)',
                borderRadius: 8,
                background: '#fff',
              }}
            >
              {I.search}
              <input
                type="text"
                name="q"
                defaultValue={q}
                placeholder={safeLocale === 'uk' ? 'Пошук…' : safeLocale === 'ru' ? 'Поиск…' : 'Search…'}
                style={{ border: 'none', outline: 'none', fontFamily: 'inherit', fontSize: 13, minWidth: 200 }}
              />
            </div>
            <select
              name="sort"
              defaultValue={sort}
              style={{
                padding: '8px 10px',
                border: '1px solid var(--portal-line)',
                borderRadius: 8,
                background: '#fff',
                fontSize: 13,
                fontFamily: 'inherit',
                cursor: 'pointer',
              }}
            >
              <option value="recent">Newest</option>
              <option value="aum">AUM (desc)</option>
              <option value="name">Name (A-Z)</option>
              <option value="last_signin">Last sign-in</option>
            </select>
            <Btn variant="primary" size="sm" type="submit">
              {safeLocale === 'uk' ? 'Фільтр' : safeLocale === 'ru' ? 'Фильтр' : 'Filter'}
            </Btn>
          </form>
        </div>

        {sorted.length === 0 ? (
          <div style={{ padding: 40, textAlign: 'center', color: 'var(--portal-mute)' }}>
            {q
              ? safeLocale === 'uk'
                ? 'Нічого не знайдено за запитом.'
                : safeLocale === 'ru'
                ? 'Ничего не найдено по запросу.'
                : 'No clients match this query.'
              : safeLocale === 'uk'
              ? 'Клієнтів поки немає. Додай користувача в Supabase Authentication → Users.'
              : safeLocale === 'ru'
              ? 'Клиентов пока нет. Добавь пользователя в Supabase Authentication → Users.'
              : 'No clients yet. Add a user in Supabase Authentication → Users.'}
          </div>
        ) : (
          <ul style={{ listStyle: 'none', margin: 0, padding: 0 }}>
            {sorted.map((c, i) => (
              <li
                key={c.user_id}
                style={{
                  display: 'grid',
                  gridTemplateColumns: 'auto 1fr auto auto auto auto',
                  gap: 16,
                  alignItems: 'center',
                  padding: '14px 22px',
                  borderBottom: i < sorted.length - 1 ? '1px solid var(--portal-line)' : 'none',
                }}
              >
                <div
                  style={{
                    width: 36,
                    height: 36,
                    borderRadius: 36,
                    background: 'var(--portal-ink)',
                    color: '#fff',
                    display: 'grid',
                    placeItems: 'center',
                    fontWeight: 800,
                    fontSize: 12,
                  }}
                >
                  {c.initials}
                </div>
                <div style={{ minWidth: 0 }}>
                  <div style={{ fontSize: 14, fontWeight: 700, color: 'var(--portal-ink)' }}>
                    {c.full_name || '—'}
                    {!c.onboarding_completed_at && (
                      <span
                        style={{
                          marginLeft: 8,
                          fontSize: 10,
                          fontWeight: 700,
                          padding: '2px 6px',
                          borderRadius: 4,
                          background: 'var(--portal-warn)' + '22',
                          color: 'var(--portal-warn)',
                          textTransform: 'uppercase',
                        }}
                      >
                        Pending
                      </span>
                    )}
                  </div>
                  <div style={{ fontSize: 12, color: 'var(--portal-mute)', marginTop: 2 }}>
                    {c.email || '—'} · {c.preferred_lang?.toUpperCase()} · {(c.jurisdictions || []).join(', ')}
                  </div>
                </div>
                <Metric label="AUM" value={fmtMoney(c.totalBalance, moneyLocale, true)} />
                <Metric label="Accts" value={c.accountCount} />
                <Metric
                  label="Open"
                  value={c.openTodos + c.unreadMsgs}
                  accent={c.openTodos + c.unreadMsgs > 0 ? 'var(--portal-warn)' : undefined}
                />
                <Link
                  href={`/${safeLocale}/admin/portal/${c.user_id}`}
                  style={{
                    padding: '8px 12px',
                    borderRadius: 8,
                    border: '1px solid var(--portal-line)',
                    background: '#fff',
                    color: 'var(--portal-ink)',
                    fontSize: 12,
                    fontWeight: 600,
                    textDecoration: 'none',
                    fontFamily: 'inherit',
                  }}
                >
                  Open →
                </Link>
              </li>
            ))}
          </ul>
        )}
      </Card>
    </div>
  );
}

function KpiTile({ label, value, accent }) {
  return (
    <Card pad={16}>
      <div style={{ fontSize: 10.5, fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase', color: 'var(--portal-mute)' }}>
        {label}
      </div>
      <div
        className="portal-tabular"
        style={{
          marginTop: 8,
          fontSize: 24,
          fontWeight: 800,
          letterSpacing: '-0.02em',
          color: accent || 'var(--portal-ink)',
        }}
      >
        {value}
      </div>
    </Card>
  );
}

function Metric({ label, value, accent }) {
  return (
    <div style={{ minWidth: 60, textAlign: 'right' }}>
      <div style={{ fontSize: 9.5, color: 'var(--portal-mute)', fontWeight: 700, letterSpacing: '0.06em', textTransform: 'uppercase' }}>
        {label}
      </div>
      <div className="portal-tabular" style={{ fontSize: 13.5, fontWeight: 700, color: accent || 'var(--portal-ink)', marginTop: 2 }}>
        {value}
      </div>
    </div>
  );
}
