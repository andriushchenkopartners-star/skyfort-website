// app/[locale]/admin/portal/[clientId]/page.js
// Per-client admin view — read all their data + push todos / send messages.

import Link from 'next/link';
import { notFound } from 'next/navigation';
import { serviceClient } from '../../../../_lib/portal/supabase';
import { PORTAL_LOCALES } from '../../../../_i18n/portal-dictionary';
import { fmtMoney, fmtDate } from '../../../../_lib/portal/fmt';
import Card from '../../../../_components/portal/Card';
import Eyebrow from '../../../../_components/portal/Eyebrow';
import ClientAdminPanel from './ClientAdminPanel';

export const dynamic = 'force-dynamic';

export default async function AdminClientPage({ params }) {
  const { locale, clientId } = await params;
  const safeLocale = PORTAL_LOCALES.includes(locale) ? locale : 'uk';
  const moneyLocale = { uk: 'uk-UA', ru: 'ru-RU', en: 'en-CA' }[safeLocale] || 'en-CA';

  const sb = serviceClient();

  const { data: client } = await sb
    .from('portal_clients')
    .select('*')
    .eq('user_id', clientId)
    .maybeSingle();
  if (!client) notFound();

  const { data: userInfo } = await sb.auth.admin.getUserById(clientId);
  const email = userInfo?.user?.email || '—';
  const lastSignIn = userInfo?.user?.last_sign_in_at;

  const [
    { data: accounts },
    { data: goals },
    { data: todos },
    { data: messages },
    { data: documents },
  ] = await Promise.all([
    sb.from('portal_accounts').select('*').eq('user_id', clientId).order('balance', { ascending: false }),
    sb.from('portal_goals').select('*').eq('user_id', clientId).order('created_at'),
    sb.from('portal_todos').select('*').eq('user_id', clientId).order('created_at', { ascending: false }),
    sb.from('portal_messages').select('*').eq('user_id', clientId).order('created_at'),
    sb.from('portal_documents').select('*').eq('user_id', clientId).order('uploaded_at', { ascending: false }),
  ]);

  const totalBalance = (accounts || []).reduce((s, a) => s + (parseFloat(a.balance) || 0), 0);
  const accountList = accounts || [];
  const goalList = goals || [];
  const todoList = todos || [];
  const messageList = messages || [];
  const documentList = documents || [];

  return (
    <div style={{ padding: '24px 28px 60px', maxWidth: 1100, margin: '0 auto' }}>
      {/* Top */}
      <div style={{ marginBottom: 22 }}>
        <Link
          href={`/${safeLocale}/admin/portal`}
          style={{ fontSize: 12, color: 'var(--portal-mute)', textDecoration: 'none' }}
        >
          ← Back to clients
        </Link>
      </div>

      {/* Client header */}
      <Card pad={22} style={{ marginBottom: 20 }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 20, flexWrap: 'wrap' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
            <div
              style={{
                width: 56,
                height: 56,
                borderRadius: 56,
                background: 'var(--portal-ink)',
                color: '#fff',
                display: 'grid',
                placeItems: 'center',
                fontWeight: 800,
                fontSize: 18,
              }}
            >
              {client.initials}
            </div>
            <div>
              <h1 style={{ margin: 0, fontSize: 24, fontWeight: 800, letterSpacing: '-0.025em', color: 'var(--portal-ink)' }}>
                {client.full_name}
              </h1>
              <div style={{ fontSize: 12.5, color: 'var(--portal-mute)', marginTop: 4 }}>
                {email} · {client.preferred_lang?.toUpperCase()} · {(client.jurisdictions || []).join(', ')}
              </div>
              <div style={{ fontSize: 11, color: 'var(--portal-mute)', marginTop: 4 }}>
                Member since {fmtDate(client.member_since)} · Last sign-in {lastSignIn ? fmtDate(lastSignIn) : 'never'}
                {client.kyc_last_verified && ` · KYC ${fmtDate(client.kyc_last_verified)}`}
              </div>
            </div>
          </div>
          <div style={{ textAlign: 'right' }}>
            <div style={{ fontSize: 11, color: 'var(--portal-mute)' }}>Total AUM</div>
            <div className="portal-tabular" style={{ fontSize: 30, fontWeight: 800, color: 'var(--portal-ink)', letterSpacing: '-0.02em' }}>
              {fmtMoney(totalBalance, moneyLocale, true)}
            </div>
          </div>
        </div>
      </Card>

      {/* Accounts + Goals — read-only */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16, marginBottom: 20 }}>
        <Card pad={20}>
          <Eyebrow>Accounts ({accountList.length})</Eyebrow>
          {accountList.length === 0 ? (
            <p style={{ marginTop: 12, color: 'var(--portal-mute)', fontSize: 13 }}>No accounts yet.</p>
          ) : (
            <ul style={{ marginTop: 12, listStyle: 'none', padding: 0 }}>
              {accountList.map((a) => (
                <li
                  key={a.id}
                  style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    padding: '8px 0',
                    borderBottom: '1px solid var(--portal-line)',
                    fontSize: 13,
                  }}
                >
                  <span style={{ color: 'var(--portal-ink)' }}>
                    {a.account_type?.toUpperCase()}
                    {a.display_name && <span style={{ color: 'var(--portal-mute)' }}> · {a.display_name}</span>}
                  </span>
                  <span className="portal-tabular" style={{ fontWeight: 700, color: 'var(--portal-ink)' }}>
                    {fmtMoney(parseFloat(a.balance), moneyLocale, true)}
                    {a.ytd_pct != null && (
                      <span
                        style={{
                          marginLeft: 8,
                          fontSize: 11,
                          color: a.ytd_pct >= 0 ? 'var(--portal-positive)' : 'var(--portal-negative)',
                        }}
                      >
                        {a.ytd_pct >= 0 ? '▲' : '▼'}{Math.abs(a.ytd_pct).toFixed(1)}%
                      </span>
                    )}
                  </span>
                </li>
              ))}
            </ul>
          )}
        </Card>

        <Card pad={20}>
          <Eyebrow>Goals ({goalList.length})</Eyebrow>
          {goalList.length === 0 ? (
            <p style={{ marginTop: 12, color: 'var(--portal-mute)', fontSize: 13 }}>No goals yet.</p>
          ) : (
            <ul style={{ marginTop: 12, listStyle: 'none', padding: 0 }}>
              {goalList.map((g) => {
                const pct = Math.min(100, ((parseFloat(g.saved) || 0) / parseFloat(g.target)) * 100);
                return (
                  <li key={g.id} style={{ padding: '8px 0', borderBottom: '1px solid var(--portal-line)' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 13 }}>
                      <span style={{ color: 'var(--portal-ink)' }}>{g.title}</span>
                      <span className="portal-tabular" style={{ fontWeight: 700, color: 'var(--portal-ink)' }}>
                        {fmtMoney(parseFloat(g.saved), moneyLocale, true)} / {fmtMoney(parseFloat(g.target), moneyLocale, true)}
                      </span>
                    </div>
                    <div style={{ marginTop: 4, height: 4, background: 'var(--portal-paper-2)', borderRadius: 2, overflow: 'hidden' }}>
                      <div style={{ width: `${pct}%`, height: '100%', background: 'var(--color-brand)' }} />
                    </div>
                  </li>
                );
              })}
            </ul>
          )}
        </Card>
      </div>

      {/* Interactive: Push todo / Send message / Upload doc */}
      <ClientAdminPanel
        clientId={clientId}
        clientName={client.full_name}
        locale={safeLocale}
        initialTodos={todoList}
        initialMessages={messageList}
        initialDocuments={documentList}
      />
    </div>
  );
}
