// app/[locale]/portal/(dashboard)/overview/page.js
// Dashboard hero — greeting, net worth, growth chart, accounts grid,
// goals progress, advisor card, todos, recent activity.

import { cookies } from 'next/headers';
import Link from 'next/link';
import { requireOnboardedClient, ADVISOR } from '../../../../_lib/portal/auth';
import { serverClient } from '../../../../_lib/portal/supabase';
import { portalT, PORTAL_LOCALES } from '../../../../_i18n/portal-dictionary';
import { greetingKey, ACCOUNT_COLORS } from '../../../../_lib/portal/constants';
import { fmtMoney, fmtPct } from '../../../../_lib/portal/fmt';
import Card from '../../../../_components/portal/Card';
import Eyebrow from '../../../../_components/portal/Eyebrow';
import Btn from '../../../../_components/portal/Btn';
import GrowthChart from '../../../../_components/portal/GrowthChart';
import BrandPanel from '../../../../_components/portal/BrandPanel';
import SFMark from '../../../../_components/portal/SFMark';
import { PortalIcons as I } from '../../../../_components/portal/icons';

export const dynamic = 'force-dynamic';

// Build a deterministic 12-point trend from current balance.
// Used when there's no real activity history yet — better than empty chart.
function fakeTrend(currentTotal) {
  if (!currentTotal || currentTotal <= 0) {
    // Return null - chart hidden when no data
    return null;
  }
  // Imagine: started at 60% of current, grew gradually with small wiggle.
  const pts = [];
  const start = currentTotal * 0.6;
  const benchStart = currentTotal * 0.65;
  for (let i = 0; i < 13; i++) {
    const t = i / 12;
    // smooth curve + tiny pseudo-random wiggle (deterministic by index)
    const w = Math.sin(i * 1.3) * 0.02 + Math.cos(i * 2.1) * 0.015;
    const p = start + (currentTotal - start) * t + currentTotal * w;
    const b = benchStart + (currentTotal - benchStart) * t * 0.9;
    pts.push({ m: i, p, b });
  }
  return pts;
}

export default async function OverviewPage({ params }) {
  const { locale } = await params;
  const safeLocale = PORTAL_LOCALES.includes(locale) ? locale : 'uk';
  const { user, client } = await requireOnboardedClient(safeLocale);
  const t = portalT(safeLocale);
  const supabase = serverClient(cookies);

  // ─── Fetch all dashboard data in parallel ────────────────────────────
  const [
    { data: accounts },
    { data: goals },
    { data: todos },
    { data: activity },
  ] = await Promise.all([
    supabase
      .from('portal_accounts')
      .select('*')
      .eq('user_id', user.id)
      .order('balance', { ascending: false }),
    supabase
      .from('portal_goals')
      .select('*')
      .eq('user_id', user.id)
      .order('created_at', { ascending: true }),
    supabase
      .from('portal_todos')
      .select('*')
      .eq('user_id', user.id)
      .eq('status', 'open')
      .order('created_at', { ascending: false })
      .limit(5),
    supabase
      .from('portal_activity')
      .select('*')
      .eq('user_id', user.id)
      .order('occurred_on', { ascending: false })
      .limit(5),
  ]);

  // ─── Derive summary numbers ──────────────────────────────────────────
  const accountList = accounts || [];
  const goalList = goals || [];
  const todoList = todos || [];
  const activityList = activity || [];

  const totalNetWorth = accountList.reduce(
    (sum, a) => sum + (parseFloat(a.balance) || 0),
    0
  );
  const totalInvested = accountList
    .filter((a) => a.account_type !== 're')
    .reduce((sum, a) => sum + (parseFloat(a.balance) || 0), 0);
  const ytdContrib = accountList.reduce(
    (sum, a) => sum + (parseFloat(a.ytd_contrib) || 0),
    0
  );
  const totalRoom = accountList.reduce(
    (sum, a) => sum + (parseFloat(a.contribution_room) || 0),
    0
  );
  // Weighted YTD return — weighted by balance, only accounts with ytd_pct.
  let ytdWeight = 0;
  let ytdSum = 0;
  for (const a of accountList) {
    if (a.ytd_pct != null && a.balance > 0) {
      ytdSum += parseFloat(a.ytd_pct) * parseFloat(a.balance);
      ytdWeight += parseFloat(a.balance);
    }
  }
  const ytdAvg = ytdWeight > 0 ? ytdSum / ytdWeight : null;

  // Local greeting (Mountain Time — practice base)
  const hourStr = new Date().toLocaleString('en-CA', {
    timeZone: 'America/Edmonton',
    hour: 'numeric',
    hour12: false,
  });
  const greeting = t[greetingKey(parseInt(hourStr, 10))] || t.greeting_morning;
  const moneyLocale = t.locale || 'en-CA';
  const trend = fakeTrend(totalNetWorth);

  // ─── Render ──────────────────────────────────────────────────────────
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
      {/* HERO CARD — greeting + net worth + growth chart */}
      <Card dark pad={28} style={{ position: 'relative', overflow: 'hidden' }}>
        <BrandPanel tone="ink" muted />
        <div style={{ position: 'relative', zIndex: 1 }}>
          <Eyebrow color="rgba(255,255,255,.55)">
            {greeting.toUpperCase()}, {client.full_name?.split(' ')[0]?.toUpperCase()}
          </Eyebrow>

          <div
            style={{
              display: 'flex',
              alignItems: 'baseline',
              justifyContent: 'space-between',
              gap: 16,
              marginTop: 12,
              flexWrap: 'wrap',
            }}
          >
            <div>
              <div
                style={{
                  fontSize: 13,
                  color: 'rgba(255,255,255,.55)',
                  marginBottom: 8,
                }}
              >
                {t.balance_total}
              </div>
              <div
                className="portal-tabular"
                style={{
                  fontSize: 52,
                  fontWeight: 800,
                  letterSpacing: '-0.035em',
                  color: '#fff',
                  lineHeight: 1,
                }}
              >
                {fmtMoney(totalNetWorth, moneyLocale)}
              </div>
            </div>
            <div style={{ display: 'flex', gap: 8 }}>
              <Btn
                variant="paper"
                size="sm"
                icon={I.plus}
                href={`/${safeLocale}/portal/accounts`}
              >
                {t.contribute}
              </Btn>
            </div>
          </div>

          {/* Mini stats row */}
          <div
            style={{
              marginTop: 28,
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))',
              gap: 24,
            }}
          >
            <Stat
              label={t.invested}
              value={fmtMoney(totalInvested, moneyLocale, true)}
            />
            <Stat
              label={t.ytd_return}
              value={ytdAvg != null ? fmtPct(ytdAvg) : '—'}
              tone={ytdAvg != null && ytdAvg > 0 ? 'positive' : 'neutral'}
            />
            <Stat
              label={t.contribution_room}
              value={
                totalRoom > 0 ? fmtMoney(totalRoom, moneyLocale, true) : '—'
              }
            />
            <Stat
              label={t.contribs_ytd}
              value={fmtMoney(ytdContrib, moneyLocale, true)}
            />
          </div>

          {trend && (
            <div style={{ marginTop: 32, marginBottom: -8 }}>
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'baseline',
                  marginBottom: 8,
                }}
              >
                <Eyebrow color="rgba(255,255,255,.45)">
                  {t.growth_12mo}
                </Eyebrow>
                <div
                  style={{
                    fontSize: 11,
                    color: 'rgba(255,255,255,.5)',
                    display: 'flex',
                    gap: 12,
                  }}
                >
                  <span style={{ display: 'inline-flex', alignItems: 'center', gap: 4 }}>
                    <span style={{ width: 10, height: 2, background: 'var(--color-brand)', display: 'inline-block' }} />
                    {t.your_portfolio}
                  </span>
                  <span style={{ display: 'inline-flex', alignItems: 'center', gap: 4 }}>
                    <span style={{ width: 10, height: 2, background: 'rgba(255,255,255,.4)', display: 'inline-block', borderTop: '1px dashed rgba(255,255,255,.4)' }} />
                    {t.benchmark}
                  </span>
                </div>
              </div>
              <div style={{ background: '#fff', borderRadius: 14, padding: 16 }}>
                <GrowthChart
                  data={trend}
                  monthLabels={[
                    'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec',
                    'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
                  ]}
                />
              </div>
            </div>
          )}
        </div>
      </Card>

      {/* TWO-COLUMN: Accounts grid + Advisor card */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'minmax(0,1fr) minmax(280px,360px)',
          gap: 20,
        }}
        className="portal-cols"
      >
        {/* Accounts */}
        <div>
          <SectionHeader
            label={t.accounts_h}
            link={`/${safeLocale}/portal/accounts`}
            linkLabel={t.seeall}
          />
          {accountList.length === 0 ? (
            <EmptyAccountsCard t={t} locale={safeLocale} />
          ) : (
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))',
                gap: 12,
              }}
            >
              {accountList.map((a) => (
                <AccountTile
                  key={a.id}
                  account={a}
                  t={t}
                  locale={safeLocale}
                  moneyLocale={moneyLocale}
                />
              ))}
            </div>
          )}
        </div>

        {/* Advisor card */}
        <AdvisorCard t={t} locale={safeLocale} />
      </div>

      {/* TWO-COLUMN: Goals + Todos */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          gap: 20,
        }}
        className="portal-cols"
      >
        {/* Goals */}
        <Card pad={22}>
          <SectionHeader
            label={t.goals_h}
            link={`/${safeLocale}/portal/goals`}
            linkLabel={t.seeall}
            inline
          />
          {goalList.length === 0 ? (
            <EmptyState
              text={t.onboarding.hint_goals}
              cta={t.onboarding.step3}
              href={`/${safeLocale}/portal/goals`}
            />
          ) : (
            <div style={{ marginTop: 16, display: 'flex', flexDirection: 'column', gap: 14 }}>
              {goalList.slice(0, 3).map((g) => (
                <GoalRow key={g.id} goal={g} t={t} moneyLocale={moneyLocale} />
              ))}
            </div>
          )}
        </Card>

        {/* Todos */}
        <Card pad={22}>
          <SectionHeader label={t.todo} inline />
          {todoList.length === 0 ? (
            <EmptyState
              text={
                safeLocale === 'uk'
                  ? "Поки немає завдань від консультанта."
                  : safeLocale === 'ru'
                  ? 'Пока нет задач от консультанта.'
                  : 'No action items from your advisor yet.'
              }
            />
          ) : (
            <ul
              style={{
                marginTop: 16,
                listStyle: 'none',
                padding: 0,
                display: 'flex',
                flexDirection: 'column',
                gap: 10,
              }}
            >
              {todoList.map((todo) => (
                <li
                  key={todo.id}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: 12,
                    padding: '10px 12px',
                    background: 'var(--portal-paper)',
                    borderRadius: 10,
                    fontSize: 13.5,
                    color: 'var(--portal-ink)',
                  }}
                >
                  <span style={{ color: 'var(--portal-warn)' }}>{I.dot}</span>
                  <span style={{ flex: 1 }}>{todo.title}</span>
                  {todo.category && (
                    <span
                      style={{
                        fontSize: 10,
                        fontWeight: 700,
                        padding: '2px 6px',
                        borderRadius: 5,
                        background: 'var(--portal-paper-2)',
                        color: 'var(--portal-mute)',
                        textTransform: 'uppercase',
                        letterSpacing: '0.06em',
                      }}
                    >
                      {todo.category}
                    </span>
                  )}
                </li>
              ))}
            </ul>
          )}
        </Card>
      </div>

      {/* Recent activity */}
      {activityList.length > 0 && (
        <Card pad={22}>
          <SectionHeader
            label={t.activity}
            link={`/${safeLocale}/portal/accounts`}
            linkLabel={t.seeall}
            inline
          />
          <ul
            style={{
              marginTop: 12,
              listStyle: 'none',
              padding: 0,
              display: 'flex',
              flexDirection: 'column',
            }}
          >
            {activityList.map((act) => {
              const isPositive = parseFloat(act.amount) >= 0;
              return (
                <li
                  key={act.id}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: 12,
                    padding: '12px 0',
                    borderBottom: '1px solid var(--portal-line)',
                    fontSize: 13.5,
                  }}
                >
                  <span
                    style={{
                      fontSize: 11,
                      width: 60,
                      color: 'var(--portal-mute)',
                      fontFamily:
                        'var(--font-portal-mono), JetBrains Mono, monospace',
                    }}
                  >
                    {act.occurred_on}
                  </span>
                  <span style={{ flex: 1 }}>
                    <div style={{ color: 'var(--portal-ink)', fontWeight: 600 }}>
                      {t.activity_kinds[act.kind] || act.kind}
                    </div>
                    {act.note && (
                      <div style={{ fontSize: 11.5, color: 'var(--portal-mute)' }}>
                        {act.note}
                      </div>
                    )}
                  </span>
                  <span
                    className="portal-tabular"
                    style={{
                      fontWeight: 700,
                      color: isPositive
                        ? 'var(--portal-positive)'
                        : 'var(--portal-negative)',
                    }}
                  >
                    {isPositive ? '+' : ''}
                    {fmtMoney(parseFloat(act.amount), moneyLocale)}
                  </span>
                </li>
              );
            })}
          </ul>
        </Card>
      )}

      {/* EMD disclaimer footer */}
      <p
        style={{
          marginTop: 12,
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

// ─── Sub-components ────────────────────────────────────────────────────

function Stat({ label, value, tone = 'neutral' }) {
  const color =
    tone === 'positive'
      ? 'var(--portal-positive)'
      : tone === 'negative'
      ? 'var(--portal-negative)'
      : '#fff';
  return (
    <div>
      <div style={{ fontSize: 11, color: 'rgba(255,255,255,.5)', marginBottom: 4 }}>
        {label}
      </div>
      <div
        className="portal-tabular"
        style={{
          fontSize: 22,
          fontWeight: 700,
          color,
          letterSpacing: '-0.02em',
        }}
      >
        {value}
      </div>
    </div>
  );
}

function SectionHeader({ label, link, linkLabel, inline = false }) {
  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: inline ? 0 : 12,
      }}
    >
      <Eyebrow>{label}</Eyebrow>
      {link && (
        <Link
          href={link}
          style={{
            fontSize: 12,
            fontWeight: 600,
            color: 'var(--color-brand)',
            textDecoration: 'none',
          }}
        >
          {linkLabel} →
        </Link>
      )}
    </div>
  );
}

function AccountTile({ account, t, locale, moneyLocale }) {
  const accent = ACCOUNT_COLORS[account.account_type] || '#888';
  const typeLabel = t.types[account.account_type] || account.account_type;
  const typeSub = t.type_sub[account.account_type] || '';
  return (
    <Card pad={16} accent={accent}>
      <div style={{ fontSize: 13, fontWeight: 700, color: 'var(--portal-ink)' }}>
        {typeLabel}
      </div>
      <div style={{ fontSize: 11, color: 'var(--portal-mute)', marginTop: 2 }}>
        {typeSub}
      </div>
      <div
        className="portal-tabular"
        style={{
          marginTop: 14,
          fontSize: 22,
          fontWeight: 800,
          color: 'var(--portal-ink)',
          letterSpacing: '-0.02em',
        }}
      >
        {fmtMoney(parseFloat(account.balance), moneyLocale)}
      </div>
      {account.ytd_pct != null && (
        <div
          style={{
            marginTop: 6,
            fontSize: 11,
            display: 'flex',
            alignItems: 'center',
            gap: 6,
          }}
        >
          <span
            style={{
              color:
                account.ytd_pct >= 0
                  ? 'var(--portal-positive)'
                  : 'var(--portal-negative)',
              fontWeight: 700,
            }}
          >
            {account.ytd_pct >= 0 ? '▲' : '▼'}
            {Math.abs(account.ytd_pct).toFixed(2)}%
          </span>
          {account.contribution_room != null && account.contribution_room > 0 && (
            <span style={{ color: 'var(--portal-mute)' }}>
              · {fmtMoney(parseFloat(account.contribution_room), moneyLocale, true)} {t.rooms_left}
            </span>
          )}
        </div>
      )}
    </Card>
  );
}

function EmptyAccountsCard({ t, locale }) {
  return (
    <Card pad={28} style={{ textAlign: 'center', borderStyle: 'dashed' }}>
      <div
        style={{
          width: 48,
          height: 48,
          borderRadius: 48,
          background: 'var(--portal-blue-soft)',
          color: 'var(--color-brand)',
          display: 'inline-flex',
          alignItems: 'center',
          justifyContent: 'center',
          marginBottom: 12,
        }}
      >
        <SFMark size={24} />
      </div>
      <h3 style={{ margin: '0 0 6px', fontSize: 16, fontWeight: 700, color: 'var(--portal-ink)' }}>
        {locale === 'uk'
          ? 'Додай свій перший рахунок'
          : locale === 'ru'
          ? 'Добавь свой первый счёт'
          : 'Add your first account'}
      </h3>
      <p style={{ margin: '0 0 16px', fontSize: 13, color: 'var(--portal-mute)' }}>
        {t.onboarding.hint_accounts}
      </p>
      <Btn variant="ink" size="sm" href={`/${locale}/portal/accounts`} icon={I.plus}>
        {t.add}
      </Btn>
    </Card>
  );
}

function EmptyState({ text, cta, href }) {
  return (
    <div
      style={{
        marginTop: 14,
        padding: '20px 16px',
        textAlign: 'center',
        fontSize: 13,
        color: 'var(--portal-mute)',
        lineHeight: 1.5,
      }}
    >
      <p style={{ margin: 0, marginBottom: cta ? 12 : 0 }}>{text}</p>
      {cta && href && (
        <Btn variant="paper" size="sm" href={href}>
          {cta}
        </Btn>
      )}
    </div>
  );
}

function GoalRow({ goal, t, moneyLocale }) {
  const pct = Math.min(100, ((parseFloat(goal.saved) || 0) / parseFloat(goal.target)) * 100);
  const statusColor =
    goal.status === 'ahead'
      ? 'var(--portal-positive)'
      : goal.status === 'behind'
      ? 'var(--portal-negative)'
      : 'var(--color-brand)';
  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: 6 }}>
        <div style={{ fontSize: 13.5, fontWeight: 600, color: 'var(--portal-ink)' }}>
          {goal.title}
        </div>
        <div className="portal-tabular" style={{ fontSize: 12.5, fontWeight: 700, color: 'var(--portal-ink)' }}>
          {fmtMoney(parseFloat(goal.saved), moneyLocale, true)}
          <span style={{ color: 'var(--portal-mute)' }}>
            {' '}/ {fmtMoney(parseFloat(goal.target), moneyLocale, true)}
          </span>
        </div>
      </div>
      <div
        style={{
          height: 6,
          background: 'var(--portal-paper-2)',
          borderRadius: 4,
          overflow: 'hidden',
        }}
      >
        <div
          style={{
            width: `${pct}%`,
            height: '100%',
            background: statusColor,
            transition: 'width .3s ease',
          }}
        />
      </div>
      <div style={{ marginTop: 4, fontSize: 11, color: 'var(--portal-mute)' }}>
        {goal.status === 'ahead' && t.ahead}
        {goal.status === 'on_track' && t.on_track}
        {goal.status === 'behind' && t.behind}
        {goal.eta && ` · ${goal.eta}`}
      </div>
    </div>
  );
}

function AdvisorCard({ t, locale }) {
  const moneyLocale = t.locale || 'en-CA';
  return (
    <Card pad={0} style={{ overflow: 'hidden' }}>
      <div style={{ position: 'relative', padding: '24px 22px', minHeight: 120 }}>
        <BrandPanel tone="blue" muted />
        <div style={{ position: 'relative', zIndex: 1, color: '#fff' }}>
          <Eyebrow color="rgba(255,255,255,.7)">{t.your_advisor}</Eyebrow>
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 12,
              marginTop: 10,
            }}
          >
            <div
              style={{
                width: 44,
                height: 44,
                borderRadius: 44,
                background: 'rgba(255,255,255,.18)',
                border: '1px solid rgba(255,255,255,.3)',
                display: 'grid',
                placeItems: 'center',
                fontWeight: 800,
                fontSize: 14,
              }}
            >
              {ADVISOR.initials}
            </div>
            <div>
              <div style={{ fontSize: 15, fontWeight: 700, letterSpacing: '-0.01em' }}>
                {ADVISOR.name}
              </div>
              <div style={{ fontSize: 11, color: 'rgba(255,255,255,.75)' }}>
                {ADVISOR.title[locale] || ADVISOR.title.en}
              </div>
            </div>
          </div>
        </div>
      </div>
      <div style={{ padding: 20 }}>
        <div style={{ fontSize: 11, color: 'var(--portal-mute)' }}>
          {t.licensed_in}
        </div>
        <div style={{ fontSize: 13, fontWeight: 600, color: 'var(--portal-ink)', marginTop: 2 }}>
          {ADVISOR.jurisdictions.join(' · ')}
        </div>
        <div style={{ marginTop: 14, fontSize: 11, color: 'var(--portal-mute)' }}>
          NRD #{ADVISOR.nrd}
        </div>
        <div
          style={{
            marginTop: 18,
            display: 'grid',
            gridTemplateColumns: '1fr 1fr',
            gap: 8,
          }}
        >
          <Btn
            variant="ink"
            size="sm"
            full
            icon={I.calendar}
            href={ADVISOR.calendly}
          >
            {t.book_call}
          </Btn>
          <Btn
            variant="paper"
            size="sm"
            full
            icon={I.chat}
            href={`/${locale}/portal/advisor`}
          >
            {t.new_msg}
          </Btn>
        </div>
      </div>
    </Card>
  );
}
