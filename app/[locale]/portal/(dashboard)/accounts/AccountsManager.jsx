// app/[locale]/portal/(dashboard)/accounts/AccountsManager.jsx
// Client-side editor for portal_accounts.

'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { browserClient } from '../../../../_lib/portal/supabase';
import { ACCOUNT_TYPES, ACCOUNT_COLORS } from '../../../../_lib/portal/constants';
import { fmtMoney } from '../../../../_lib/portal/fmt';
import Card from '../../../../_components/portal/Card';
import Btn from '../../../../_components/portal/Btn';
import Eyebrow from '../../../../_components/portal/Eyebrow';
import { PortalIcons as I } from '../../../../_components/portal/icons';

export default function AccountsManager({ initialAccounts, userId, locale, t }) {
  const router = useRouter();
  const [accounts, setAccounts] = useState(initialAccounts);
  const [editingId, setEditingId] = useState(null);
  const [showAdd, setShowAdd] = useState(false);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState('');

  const moneyLocale = t.locale || 'en-CA';
  const supabase = browserClient();

  async function refresh() {
    const { data } = await supabase
      .from('portal_accounts')
      .select('*')
      .eq('user_id', userId)
      .order('balance', { ascending: false });
    setAccounts(data || []);
    router.refresh(); // refresh server-rendered counts in layout
  }

  async function saveAccount(id, patch) {
    setBusy(true);
    setError('');
    try {
      const { error: err } = await supabase
        .from('portal_accounts')
        .update(patch)
        .eq('id', id);
      if (err) throw err;
      await refresh();
      setEditingId(null);
    } catch (e) {
      setError(e.message);
    } finally {
      setBusy(false);
    }
  }

  async function deleteAccount(id) {
    if (!confirm(localizedConfirm(locale, 'delete_account'))) return;
    setBusy(true);
    try {
      const { error: err } = await supabase
        .from('portal_accounts')
        .delete()
        .eq('id', id);
      if (err) throw err;
      await refresh();
    } catch (e) {
      setError(e.message);
    } finally {
      setBusy(false);
    }
  }

  async function addAccount(payload) {
    setBusy(true);
    setError('');
    try {
      const { error: err } = await supabase.from('portal_accounts').insert({
        user_id: userId,
        ...payload,
      });
      if (err) throw err;
      await refresh();
      setShowAdd(false);
    } catch (e) {
      setError(e.message);
    } finally {
      setBusy(false);
    }
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
      {/* Header */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <div>
          <Eyebrow>{t.accounts_h}</Eyebrow>
          <h1
            style={{
              margin: '6px 0 0',
              fontSize: 28,
              fontWeight: 800,
              letterSpacing: '-0.025em',
              color: 'var(--portal-ink)',
            }}
          >
            {t.accounts_h}
          </h1>
        </div>
        <Btn variant="ink" size="md" icon={I.plus} onClick={() => setShowAdd(true)}>
          {t.add}
        </Btn>
      </div>

      {error && (
        <div
          style={{
            padding: '10px 14px',
            background: 'rgba(195,74,58,.08)',
            color: 'var(--portal-negative)',
            borderRadius: 10,
            fontSize: 13,
          }}
        >
          {error}
        </div>
      )}

      {accounts.length === 0 ? (
        <Card pad={40} style={{ textAlign: 'center', borderStyle: 'dashed' }}>
          <p style={{ margin: '0 0 16px', color: 'var(--portal-mute)' }}>
            {t.onboarding.hint_accounts}
          </p>
          <Btn variant="primary" size="md" icon={I.plus} onClick={() => setShowAdd(true)}>
            {locale === 'uk'
              ? 'Додати перший рахунок'
              : locale === 'ru'
              ? 'Добавить первый счёт'
              : 'Add your first account'}
          </Btn>
        </Card>
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
          {accounts.map((a) => (
            <AccountCard
              key={a.id}
              account={a}
              t={t}
              locale={locale}
              moneyLocale={moneyLocale}
              isEditing={editingId === a.id}
              busy={busy}
              onEdit={() => setEditingId(a.id)}
              onCancel={() => setEditingId(null)}
              onSave={(patch) => saveAccount(a.id, patch)}
              onDelete={() => deleteAccount(a.id)}
            />
          ))}
        </div>
      )}

      {showAdd && (
        <AddAccountModal
          locale={locale}
          t={t}
          busy={busy}
          onClose={() => setShowAdd(false)}
          onSubmit={addAccount}
        />
      )}

      <p style={{ marginTop: 16, fontSize: 11, color: 'var(--portal-mute)', textAlign: 'center', lineHeight: 1.55 }}>
        {t.not_official_statement}
      </p>
    </div>
  );
}

// ─── Account card ─────────────────────────────────────────────────────
function AccountCard({ account, t, locale, moneyLocale, isEditing, busy, onEdit, onCancel, onSave, onDelete }) {
  const [balance, setBalance] = useState(String(account.balance ?? ''));
  const [ytdPct, setYtdPct] = useState(account.ytd_pct != null ? String(account.ytd_pct) : '');
  const [ytdContrib, setYtdContrib] = useState(String(account.ytd_contrib ?? ''));
  const [room, setRoom] = useState(account.contribution_room != null ? String(account.contribution_room) : '');
  const [displayName, setDisplayName] = useState(account.display_name || '');

  const accent = ACCOUNT_COLORS[account.account_type] || '#888';

  if (isEditing) {
    return (
      <Card pad={18}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 14 }}>
          <div style={{ fontSize: 13, fontWeight: 700, color: 'var(--portal-ink)', display: 'flex', alignItems: 'center', gap: 8 }}>
            <span style={{ width: 10, height: 10, borderRadius: 10, background: accent }} />
            {t.types[account.account_type]}
          </div>
          <div style={{ display: 'flex', gap: 6 }}>
            <Btn variant="paper" size="sm" onClick={onCancel} disabled={busy}>
              {t.cancel}
            </Btn>
            <Btn
              variant="primary"
              size="sm"
              icon={I.check}
              onClick={() =>
                onSave({
                  display_name: displayName.trim() || null,
                  balance: parseFloat(balance) || 0,
                  ytd_pct: ytdPct === '' ? null : parseFloat(ytdPct),
                  ytd_contrib: parseFloat(ytdContrib) || 0,
                  contribution_room: room === '' ? null : parseFloat(room),
                })
              }
              disabled={busy}
            >
              {t.save}
            </Btn>
          </div>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}>
          <Field label={`Display name (${t.add})`}>
            <input
              type="text"
              value={displayName}
              onChange={(e) => setDisplayName(e.target.value)}
              placeholder="TFSA at RBC"
              style={inputStyle}
            />
          </Field>
          <Field label={`${t.balance_total} · CAD`}>
            <input
              type="number"
              step="0.01"
              value={balance}
              onChange={(e) => setBalance(e.target.value)}
              style={inputStyle}
            />
          </Field>
          <Field label={`${t.ytd_return} (%)`}>
            <input
              type="number"
              step="0.01"
              value={ytdPct}
              onChange={(e) => setYtdPct(e.target.value)}
              placeholder="9.4"
              style={inputStyle}
            />
          </Field>
          <Field label={`${t.contribs_ytd} · CAD`}>
            <input
              type="number"
              step="0.01"
              value={ytdContrib}
              onChange={(e) => setYtdContrib(e.target.value)}
              style={inputStyle}
            />
          </Field>
          <Field label={`${t.contribution_room} · CAD`}>
            <input
              type="number"
              step="0.01"
              value={room}
              onChange={(e) => setRoom(e.target.value)}
              placeholder="—"
              style={inputStyle}
            />
          </Field>
        </div>
      </Card>
    );
  }

  return (
    <Card pad={18} accent={accent}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
        <div style={{ flex: 1, minWidth: 0 }}>
          <div style={{ fontSize: 13, fontWeight: 700, color: 'var(--portal-ink)' }}>
            {t.types[account.account_type] || account.account_type}
            {account.display_name && (
              <span style={{ fontWeight: 500, color: 'var(--portal-mute)' }}>
                {' · '}{account.display_name}
              </span>
            )}
          </div>
          <div style={{ fontSize: 11.5, color: 'var(--portal-mute)', marginTop: 2 }}>
            {t.type_sub[account.account_type] || ''}
          </div>
        </div>

        <div style={{ textAlign: 'right' }}>
          <div
            className="portal-tabular"
            style={{
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
                fontSize: 11.5,
                color: account.ytd_pct >= 0 ? 'var(--portal-positive)' : 'var(--portal-negative)',
                fontWeight: 600,
              }}
            >
              {account.ytd_pct >= 0 ? '▲' : '▼'} {Math.abs(account.ytd_pct).toFixed(2)}% YTD
            </div>
          )}
        </div>

        <div style={{ display: 'flex', gap: 6 }}>
          <button
            type="button"
            onClick={onEdit}
            disabled={busy}
            title={t.edit}
            style={iconBtnStyle}
            aria-label={t.edit}
          >
            <svg width="14" height="14" viewBox="0 0 16 16" aria-hidden="true">
              <path d="M2 14h12M3 13l9-9 2 2-9 9H3v-2z" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinejoin="round"/>
            </svg>
          </button>
          <button
            type="button"
            onClick={onDelete}
            disabled={busy}
            title={t.delete}
            style={{ ...iconBtnStyle, color: 'var(--portal-negative)' }}
            aria-label={t.delete}
          >
            <svg width="14" height="14" viewBox="0 0 16 16" aria-hidden="true">
              <path d="M3 5h10M6 5V3h4v2M5 5l1 9h4l1-9" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinejoin="round" strokeLinecap="round"/>
            </svg>
          </button>
        </div>
      </div>

      {/* Bottom row — supporting metrics */}
      {(account.contribution_room != null || account.ytd_contrib > 0) && (
        <div
          style={{
            marginTop: 10,
            paddingTop: 10,
            borderTop: '1px solid var(--portal-line)',
            display: 'flex',
            gap: 16,
            fontSize: 11.5,
            color: 'var(--portal-mute)',
          }}
        >
          {account.contribution_room != null && (
            <span>
              {t.contribution_room}: <strong style={{ color: 'var(--portal-ink)' }}>{fmtMoney(parseFloat(account.contribution_room), moneyLocale, true)}</strong> {t.rooms_left}
            </span>
          )}
          {account.ytd_contrib > 0 && (
            <span>
              {t.contribs_ytd}: <strong style={{ color: 'var(--portal-ink)' }}>{fmtMoney(parseFloat(account.ytd_contrib), moneyLocale, true)}</strong>
            </span>
          )}
        </div>
      )}
    </Card>
  );
}

// ─── Add account modal ────────────────────────────────────────────────
function AddAccountModal({ locale, t, busy, onClose, onSubmit }) {
  const [type, setType] = useState('tfsa');
  const [displayName, setDisplayName] = useState('');
  const [balance, setBalance] = useState('');
  const [room, setRoom] = useState('');

  function submit(e) {
    e.preventDefault();
    if (!balance) return;
    onSubmit({
      account_type: type,
      display_name: displayName.trim() || null,
      balance: parseFloat(balance) || 0,
      contribution_room: room === '' ? null : parseFloat(room),
    });
  }

  return (
    <div
      onClick={onClose}
      style={{
        position: 'fixed',
        inset: 0,
        background: 'rgba(11,13,16,.55)',
        backdropFilter: 'blur(6px)',
        display: 'grid',
        placeItems: 'center',
        zIndex: 200,
        padding: 20,
      }}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        style={{ width: 480, maxWidth: '100%', background: '#fff', borderRadius: 18, padding: 28 }}
      >
        <Eyebrow>{t.add}</Eyebrow>
        <h2 style={{ margin: '8px 0 18px', fontSize: 20, fontWeight: 800, color: 'var(--portal-ink)' }}>
          {locale === 'uk' ? 'Новий рахунок' : locale === 'ru' ? 'Новый счёт' : 'New account'}
        </h2>

        <form onSubmit={submit} style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
          <Field label={t.accounts_h}>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 6 }}>
              {ACCOUNT_TYPES.filter((x) => x !== 'other').map((tp) => (
                <button
                  key={tp}
                  type="button"
                  onClick={() => setType(tp)}
                  style={{
                    padding: '10px 8px',
                    borderRadius: 10,
                    border: '1px solid ' + (type === tp ? 'var(--portal-ink)' : 'var(--portal-line)'),
                    background: type === tp ? 'var(--portal-ink)' : '#fff',
                    color: type === tp ? '#fff' : 'var(--portal-ink)',
                    cursor: 'pointer',
                    fontSize: 12,
                    fontFamily: 'inherit',
                    fontWeight: 700,
                  }}
                >
                  {t.types[tp]}
                </button>
              ))}
            </div>
          </Field>

          <Field label="Display name (optional)">
            <input
              type="text"
              value={displayName}
              onChange={(e) => setDisplayName(e.target.value)}
              placeholder="TFSA at RBC"
              style={inputStyle}
            />
          </Field>

          <Field label={`${t.balance_total} · CAD`}>
            <input
              type="number"
              step="0.01"
              min="0"
              required
              autoFocus
              value={balance}
              onChange={(e) => setBalance(e.target.value)}
              placeholder="48000"
              style={inputStyle}
            />
          </Field>

          <Field label={`${t.contribution_room} · CAD (${locale === 'uk' ? 'опц.' : locale === 'ru' ? 'опц.' : 'opt'})`}>
            <input
              type="number"
              step="0.01"
              min="0"
              value={room}
              onChange={(e) => setRoom(e.target.value)}
              placeholder="—"
              style={inputStyle}
            />
          </Field>

          <div style={{ display: 'flex', gap: 10, justifyContent: 'flex-end', marginTop: 8 }}>
            <Btn variant="paper" size="md" onClick={onClose} disabled={busy} type="button">
              {t.cancel}
            </Btn>
            <Btn variant="primary" size="md" type="submit" disabled={busy || !balance}>
              {t.save}
            </Btn>
          </div>
        </form>
      </div>
    </div>
  );
}

// ─── Helpers ──────────────────────────────────────────────────────────
function Field({ label, children }) {
  return (
    <label style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
      <span style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase', color: 'var(--portal-mute)' }}>
        {label}
      </span>
      {children}
    </label>
  );
}

const inputStyle = {
  width: '100%',
  padding: '10px 12px',
  border: '1px solid var(--portal-line)',
  borderRadius: 10,
  fontSize: 14,
  fontFamily: 'inherit',
  color: 'var(--portal-ink)',
  background: '#fff',
  outline: 'none',
};

const iconBtnStyle = {
  width: 32,
  height: 32,
  borderRadius: 8,
  border: '1px solid var(--portal-line)',
  background: '#fff',
  color: 'var(--portal-ink)',
  display: 'grid',
  placeItems: 'center',
  cursor: 'pointer',
};

function localizedConfirm(locale, key) {
  const dict = {
    delete_account: {
      uk: 'Видалити цей рахунок? Дія незворотна.',
      ru: 'Удалить этот счёт? Действие необратимо.',
      en: 'Delete this account? This cannot be undone.',
    },
  };
  return dict[key]?.[locale] || dict[key]?.en;
}
