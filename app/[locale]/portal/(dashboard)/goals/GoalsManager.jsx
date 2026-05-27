// app/[locale]/portal/(dashboard)/goals/GoalsManager.jsx
'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { browserClient } from '../../../../_lib/portal/supabase';
import { GOAL_KEYS } from '../../../../_lib/portal/constants';
import { fmtMoney } from '../../../../_lib/portal/fmt';
import Card from '../../../../_components/portal/Card';
import Btn from '../../../../_components/portal/Btn';
import Eyebrow from '../../../../_components/portal/Eyebrow';
import { PortalIcons as I } from '../../../../_components/portal/icons';

export default function GoalsManager({ initialGoals, userId, locale, t }) {
  const router = useRouter();
  const [goals, setGoals] = useState(initialGoals);
  const [editingId, setEditingId] = useState(null);
  const [showAdd, setShowAdd] = useState(false);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState('');

  const moneyLocale = t.locale || 'en-CA';
  const supabase = browserClient();

  async function refresh() {
    const { data } = await supabase
      .from('portal_goals')
      .select('*')
      .eq('user_id', userId)
      .order('created_at', { ascending: true });
    setGoals(data || []);
    router.refresh();
  }

  async function save(id, patch) {
    setBusy(true);
    setError('');
    try {
      const { error: e } = await supabase.from('portal_goals').update(patch).eq('id', id);
      if (e) throw e;
      await refresh();
      setEditingId(null);
    } catch (e) {
      setError(e.message);
    } finally {
      setBusy(false);
    }
  }

  async function remove(id) {
    if (!confirm(t.delete + '?')) return;
    setBusy(true);
    try {
      const { error: e } = await supabase.from('portal_goals').delete().eq('id', id);
      if (e) throw e;
      await refresh();
    } catch (e) {
      setError(e.message);
    } finally {
      setBusy(false);
    }
  }

  async function add(payload) {
    setBusy(true);
    setError('');
    try {
      const { error: e } = await supabase.from('portal_goals').insert({ user_id: userId, ...payload });
      if (e) throw e;
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
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div>
          <Eyebrow>{t.goals_h}</Eyebrow>
          <h1
            style={{
              margin: '6px 0 0',
              fontSize: 28,
              fontWeight: 800,
              letterSpacing: '-0.025em',
              color: 'var(--portal-ink)',
            }}
          >
            {t.goals_h}
          </h1>
        </div>
        <Btn variant="ink" size="md" icon={I.plus} onClick={() => setShowAdd(true)}>
          {t.add}
        </Btn>
      </div>

      {error && (
        <div style={{ padding: '10px 14px', background: 'rgba(195,74,58,.08)', color: 'var(--portal-negative)', borderRadius: 10, fontSize: 13 }}>
          {error}
        </div>
      )}

      {goals.length === 0 ? (
        <Card pad={40} style={{ textAlign: 'center', borderStyle: 'dashed' }}>
          <p style={{ margin: '0 0 16px', color: 'var(--portal-mute)' }}>{t.onboarding.hint_goals}</p>
          <Btn variant="primary" size="md" icon={I.plus} onClick={() => setShowAdd(true)}>
            {locale === 'uk' ? 'Додати першу ціль' : locale === 'ru' ? 'Добавить первую цель' : 'Add your first goal'}
          </Btn>
        </Card>
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
          {goals.map((g) => (
            <GoalCard
              key={g.id}
              goal={g}
              t={t}
              moneyLocale={moneyLocale}
              isEditing={editingId === g.id}
              busy={busy}
              onEdit={() => setEditingId(g.id)}
              onCancel={() => setEditingId(null)}
              onSave={(p) => save(g.id, p)}
              onDelete={() => remove(g.id)}
            />
          ))}
        </div>
      )}

      {showAdd && (
        <AddGoalModal locale={locale} t={t} busy={busy} onClose={() => setShowAdd(false)} onSubmit={add} />
      )}
    </div>
  );
}

function GoalCard({ goal, t, moneyLocale, isEditing, busy, onEdit, onCancel, onSave, onDelete }) {
  const [title, setTitle] = useState(goal.title);
  const [saved, setSaved] = useState(String(goal.saved ?? ''));
  const [target, setTarget] = useState(String(goal.target ?? ''));
  const [monthly, setMonthly] = useState(goal.monthly != null ? String(goal.monthly) : '');
  const [eta, setEta] = useState(goal.eta || '');
  const [status, setStatus] = useState(goal.status || 'on_track');

  const pct = Math.min(100, ((parseFloat(goal.saved) || 0) / parseFloat(goal.target)) * 100);
  const statusColor =
    goal.status === 'ahead'
      ? 'var(--portal-positive)'
      : goal.status === 'behind'
      ? 'var(--portal-negative)'
      : 'var(--color-brand)';

  if (isEditing) {
    return (
      <Card pad={20}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 14 }}>
          <Eyebrow>{t.edit}</Eyebrow>
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
                  title: title.trim() || goal.title,
                  saved: parseFloat(saved) || 0,
                  target: parseFloat(target) || goal.target,
                  monthly: monthly === '' ? null : parseFloat(monthly),
                  eta: eta.trim() || null,
                  status,
                })
              }
              disabled={busy}
            >
              {t.save}
            </Btn>
          </div>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}>
          <Field label="Title" full>
            <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} style={inputStyle} />
          </Field>
          <Field label={`${t.contributed} · CAD`}>
            <input type="number" step="0.01" value={saved} onChange={(e) => setSaved(e.target.value)} style={inputStyle} />
          </Field>
          <Field label={`${t.target} · CAD`}>
            <input type="number" step="0.01" value={target} onChange={(e) => setTarget(e.target.value)} style={inputStyle} />
          </Field>
          <Field label={`Monthly · CAD`}>
            <input type="number" step="0.01" value={monthly} onChange={(e) => setMonthly(e.target.value)} placeholder="—" style={inputStyle} />
          </Field>
          <Field label={`ETA (e.g. 2028 Q1)`}>
            <input type="text" value={eta} onChange={(e) => setEta(e.target.value)} placeholder="2028 Q1" style={inputStyle} />
          </Field>
          <Field label="Status">
            <select value={status} onChange={(e) => setStatus(e.target.value)} style={inputStyle}>
              <option value="ahead">{t.ahead}</option>
              <option value="on_track">{t.on_track}</option>
              <option value="behind">{t.behind}</option>
            </select>
          </Field>
        </div>
      </Card>
    );
  }

  return (
    <Card pad={20}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: 10 }}>
        <div>
          <div style={{ fontSize: 16, fontWeight: 700, color: 'var(--portal-ink)' }}>{goal.title}</div>
          <div style={{ fontSize: 11.5, color: 'var(--portal-mute)', marginTop: 2 }}>
            {goal.status === 'ahead' && t.ahead}
            {goal.status === 'on_track' && t.on_track}
            {goal.status === 'behind' && t.behind}
            {goal.eta && ` · ${goal.eta}`}
            {goal.monthly && ` · ${fmtMoney(parseFloat(goal.monthly), moneyLocale, true)}${t.monthly}`}
          </div>
        </div>
        <div style={{ textAlign: 'right' }}>
          <div className="portal-tabular" style={{ fontSize: 20, fontWeight: 800, color: 'var(--portal-ink)', letterSpacing: '-0.02em' }}>
            {fmtMoney(parseFloat(goal.saved), moneyLocale, true)}
          </div>
          <div style={{ fontSize: 11.5, color: 'var(--portal-mute)' }}>
            / {fmtMoney(parseFloat(goal.target), moneyLocale, true)} ({pct.toFixed(0)}%)
          </div>
        </div>
        <div style={{ display: 'flex', gap: 6, marginLeft: 16 }}>
          <button type="button" onClick={onEdit} disabled={busy} style={iconBtnStyle} aria-label={t.edit}>
            <svg width="14" height="14" viewBox="0 0 16 16"><path d="M2 14h12M3 13l9-9 2 2-9 9H3v-2z" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinejoin="round"/></svg>
          </button>
          <button type="button" onClick={onDelete} disabled={busy} style={{ ...iconBtnStyle, color: 'var(--portal-negative)' }} aria-label={t.delete}>
            <svg width="14" height="14" viewBox="0 0 16 16"><path d="M3 5h10M6 5V3h4v2M5 5l1 9h4l1-9" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinejoin="round" strokeLinecap="round"/></svg>
          </button>
        </div>
      </div>

      <div style={{ height: 8, background: 'var(--portal-paper-2)', borderRadius: 4, overflow: 'hidden' }}>
        <div style={{ width: `${pct}%`, height: '100%', background: statusColor, transition: 'width .3s ease' }} />
      </div>
    </Card>
  );
}

function AddGoalModal({ locale, t, busy, onClose, onSubmit }) {
  const [goalKey, setGoalKey] = useState('house');
  const [title, setTitle] = useState('');
  const [target, setTarget] = useState('');
  const [saved, setSaved] = useState('');
  const [monthly, setMonthly] = useState('');
  const [eta, setEta] = useState('');

  function submit(e) {
    e.preventDefault();
    if (!target || parseFloat(target) <= 0) return;
    onSubmit({
      goal_key: goalKey,
      title: title.trim() || t['goal_' + goalKey] || goalKey,
      target: parseFloat(target),
      saved: parseFloat(saved) || 0,
      monthly: monthly === '' ? null : parseFloat(monthly),
      eta: eta.trim() || null,
      status: 'on_track',
    });
  }

  return (
    <div onClick={onClose} style={{ position: 'fixed', inset: 0, background: 'rgba(11,13,16,.55)', backdropFilter: 'blur(6px)', display: 'grid', placeItems: 'center', zIndex: 200, padding: 20 }}>
      <div onClick={(e) => e.stopPropagation()} style={{ width: 520, maxWidth: '100%', background: '#fff', borderRadius: 18, padding: 28 }}>
        <Eyebrow>{t.add}</Eyebrow>
        <h2 style={{ margin: '8px 0 18px', fontSize: 20, fontWeight: 800, color: 'var(--portal-ink)' }}>
          {locale === 'uk' ? 'Нова ціль' : locale === 'ru' ? 'Новая цель' : 'New goal'}
        </h2>

        <form onSubmit={submit} style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
          <Field label={t.goals_h}>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2,1fr)', gap: 6 }}>
              {GOAL_KEYS.filter((x) => x !== 'custom').map((k) => (
                <button
                  key={k}
                  type="button"
                  onClick={() => {
                    setGoalKey(k);
                    setTitle('');
                  }}
                  style={{
                    padding: '10px 12px',
                    borderRadius: 10,
                    border: '1px solid ' + (goalKey === k ? 'var(--portal-ink)' : 'var(--portal-line)'),
                    background: goalKey === k ? 'var(--portal-ink)' : '#fff',
                    color: goalKey === k ? '#fff' : 'var(--portal-ink)',
                    cursor: 'pointer',
                    fontSize: 13,
                    fontWeight: 600,
                    fontFamily: 'inherit',
                  }}
                >
                  {t['goal_' + k]}
                </button>
              ))}
            </div>
          </Field>

          <Field label={`Title (${locale === 'uk' ? 'опц.' : locale === 'ru' ? 'опц.' : 'opt'})`}>
            <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} placeholder={t['goal_' + goalKey]} style={inputStyle} />
          </Field>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}>
            <Field label={`${t.contributed} · CAD`}>
              <input type="number" step="0.01" min="0" value={saved} onChange={(e) => setSaved(e.target.value)} placeholder="0" style={inputStyle} />
            </Field>
            <Field label={`${t.target} · CAD`}>
              <input type="number" step="0.01" min="0" required autoFocus value={target} onChange={(e) => setTarget(e.target.value)} placeholder="60000" style={inputStyle} />
            </Field>
            <Field label={`Monthly · CAD`}>
              <input type="number" step="0.01" min="0" value={monthly} onChange={(e) => setMonthly(e.target.value)} placeholder="500" style={inputStyle} />
            </Field>
            <Field label="ETA">
              <input type="text" value={eta} onChange={(e) => setEta(e.target.value)} placeholder="2028 Q1" style={inputStyle} />
            </Field>
          </div>

          <div style={{ display: 'flex', gap: 10, justifyContent: 'flex-end', marginTop: 8 }}>
            <Btn variant="paper" size="md" onClick={onClose} disabled={busy} type="button">
              {t.cancel}
            </Btn>
            <Btn variant="primary" size="md" type="submit" disabled={busy || !target}>
              {t.save}
            </Btn>
          </div>
        </form>
      </div>
    </div>
  );
}

function Field({ label, children, full }) {
  return (
    <label style={{ display: 'flex', flexDirection: 'column', gap: 6, gridColumn: full ? '1 / -1' : 'auto' }}>
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
