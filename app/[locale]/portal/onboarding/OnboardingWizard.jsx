// app/[locale]/portal/onboarding/OnboardingWizard.jsx
// 3-step wizard:
//   1) About you      — full_name, preferred_lang, jurisdictions
//   2) Your accounts  — add one (or skip)
//   3) Your goals     — add one (or skip)
// On finish: upsert portal_clients with onboarding_completed_at = now()

'use client';

import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { browserClient } from '../../../_lib/portal/supabase';
import { initialsFromName } from '../../../_lib/portal/fmt';
import { ACCOUNT_TYPES, ACCOUNT_COLORS, GOAL_KEYS } from '../../../_lib/portal/constants';
import Btn from '../../../_components/portal/Btn';
import Card from '../../../_components/portal/Card';
import Eyebrow from '../../../_components/portal/Eyebrow';
import SFLogotype from '../../../_components/portal/SFLogotype';
import { PortalIcons as I } from '../../../_components/portal/icons';

const JURISDICTIONS = ['Alberta', 'British Columbia', 'Ontario', 'Other'];

export default function OnboardingWizard({ locale, t, userId, userEmail, existingClient }) {
  const router = useRouter();
  const [step, setStep] = useState(1);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');

  const [profile, setProfile] = useState({
    full_name: existingClient?.full_name || '',
    preferred_lang: existingClient?.preferred_lang || locale,
    jurisdictions: existingClient?.jurisdictions || ['Alberta'],
  });

  const [account, setAccount] = useState({
    account_type: 'tfsa',
    display_name: '',
    balance: '',
  });

  const [goal, setGoal] = useState({
    goal_key: 'house',
    title: '',
    saved: '',
    target: '',
  });

  function toggleJurisdiction(j) {
    setProfile((p) => {
      const has = p.jurisdictions.includes(j);
      return {
        ...p,
        jurisdictions: has
          ? p.jurisdictions.filter((x) => x !== j)
          : [...p.jurisdictions, j],
      };
    });
  }

  async function finish() {
    setSaving(true);
    setError('');
    const supabase = browserClient();

    try {
      const initials = initialsFromName(profile.full_name);

      // 1. Upsert portal_clients row + mark onboarded
      const clientRow = {
        user_id: userId,
        full_name: profile.full_name.trim(),
        initials,
        preferred_lang: profile.preferred_lang,
        jurisdictions: profile.jurisdictions,
        onboarding_completed_at: new Date().toISOString(),
      };

      const { error: upsertErr } = await supabase
        .from('portal_clients')
        .upsert(clientRow, { onConflict: 'user_id' });
      if (upsertErr) throw upsertErr;

      // 2. Optional first account
      if (account.balance && parseFloat(account.balance) >= 0) {
        const { error: acctErr } = await supabase.from('portal_accounts').insert({
          user_id: userId,
          account_type: account.account_type,
          display_name: account.display_name?.trim() || null,
          balance: parseFloat(account.balance),
        });
        if (acctErr) throw acctErr;
      }

      // 3. Optional first goal
      if (goal.target && parseFloat(goal.target) > 0) {
        const { error: goalErr } = await supabase.from('portal_goals').insert({
          user_id: userId,
          goal_key: goal.goal_key,
          title: goal.title?.trim() || defaultGoalTitle(goal.goal_key, t),
          saved: goal.saved ? parseFloat(goal.saved) : 0,
          target: parseFloat(goal.target),
        });
        if (goalErr) throw goalErr;
      }

      router.push(`/${locale}/portal/overview`);
      router.refresh();
    } catch (err) {
      console.error('[onboarding]', err);
      setError(err.message || 'Unknown error');
      setSaving(false);
    }
  }

  return (
    <div
      style={{
        minHeight: '100vh',
        display: 'grid',
        placeItems: 'center',
        padding: '24px 16px',
      }}
    >
      <div style={{ width: '100%', maxWidth: 520 }}>
        <div style={{ display: 'flex', justifyContent: 'center', marginBottom: 22 }}>
          <SFLogotype height={20} color="var(--portal-ink)" />
        </div>

        <Card pad={28}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 18 }}>
            <Eyebrow>{t.onboarding.title}</Eyebrow>
            <div style={{ display: 'flex', gap: 4 }}>
              {[1, 2, 3].map((s) => (
                <span
                  key={s}
                  style={{
                    width: 18,
                    height: 4,
                    borderRadius: 2,
                    background:
                      s <= step ? 'var(--color-brand)' : 'var(--portal-paper-2)',
                  }}
                />
              ))}
            </div>
          </div>

          {step === 1 && (
            <Step1 t={t} profile={profile} setProfile={setProfile} toggleJurisdiction={toggleJurisdiction} email={userEmail} />
          )}
          {step === 2 && (
            <Step2 t={t} account={account} setAccount={setAccount} locale={locale} />
          )}
          {step === 3 && <Step3 t={t} goal={goal} setGoal={setGoal} locale={locale} />}

          {error && (
            <div
              style={{
                marginTop: 16,
                fontSize: 12.5,
                color: 'var(--portal-negative)',
                background: 'rgba(195,74,58,.08)',
                padding: '8px 12px',
                borderRadius: 8,
                lineHeight: 1.4,
              }}
            >
              {error}
            </div>
          )}

          <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 24, gap: 10 }}>
            {step > 1 ? (
              <Btn variant="paper" size="md" onClick={() => setStep((s) => s - 1)} disabled={saving}>
                ←
              </Btn>
            ) : <span/>}

            {step < 3 ? (
              <Btn
                variant="ink"
                size="md"
                onClick={() => setStep((s) => s + 1)}
                disabled={step === 1 && !profile.full_name.trim()}
              >
                {step === 1 ? '→' : t.onboarding.skip + ' →'}
              </Btn>
            ) : (
              <Btn variant="primary" size="md" onClick={finish} disabled={saving} icon={I.check}>
                {saving ? '…' : t.onboarding.finish}
              </Btn>
            )}
          </div>
        </Card>

        <p
          style={{
            marginTop: 16,
            fontSize: 11,
            color: 'var(--portal-mute)',
            textAlign: 'center',
            lineHeight: 1.55,
          }}
        >
          {t.emd_disclaimer}
        </p>
      </div>
    </div>
  );
}

// ─── Step 1 — about you ─────────────────────────────────────────────────────
function Step1({ t, profile, setProfile, toggleJurisdiction, email }) {
  return (
    <>
      <h2 style={{ margin: '0 0 4px', fontSize: 20, fontWeight: 800, letterSpacing: '-0.02em', color: 'var(--portal-ink)' }}>
        {t.onboarding.step1}
      </h2>
      <p style={{ fontSize: 12.5, color: 'var(--portal-mute)', marginBottom: 18 }}>{email}</p>

      <Field label={t.onboarding.step1 + ' · ' + (t.lang_label ? '' : '')}>
        <Eyebrow style={{ marginBottom: 6 }}>Name</Eyebrow>
        <input
          type="text"
          autoFocus
          value={profile.full_name}
          onChange={(e) => setProfile({ ...profile, full_name: e.target.value })}
          placeholder="Anna Kovalenko"
          style={inputStyle}
        />
      </Field>

      <Field>
        <Eyebrow style={{ marginBottom: 6 }}>{t.lang_label}</Eyebrow>
        <div style={{ display: 'flex', gap: 6 }}>
          {['uk', 'ru', 'en'].map((l) => (
            <button
              key={l}
              onClick={() => setProfile({ ...profile, preferred_lang: l })}
              type="button"
              style={chipStyle(profile.preferred_lang === l)}
            >
              {l === 'uk' ? 'Українська' : l === 'ru' ? 'Русский' : 'English'}
            </button>
          ))}
        </div>
      </Field>

      <Field>
        <Eyebrow style={{ marginBottom: 6 }}>{t.licensed_in}</Eyebrow>
        <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap' }}>
          {JURISDICTIONS.map((j) => (
            <button
              key={j}
              type="button"
              onClick={() => toggleJurisdiction(j)}
              style={chipStyle(profile.jurisdictions.includes(j))}
            >
              {j}
            </button>
          ))}
        </div>
      </Field>
    </>
  );
}

// ─── Step 2 — first account ─────────────────────────────────────────────────
function Step2({ t, account, setAccount, locale }) {
  return (
    <>
      <h2 style={{ margin: '0 0 4px', fontSize: 20, fontWeight: 800, letterSpacing: '-0.02em', color: 'var(--portal-ink)' }}>
        {t.onboarding.step2}
      </h2>
      <p style={{ fontSize: 12.5, color: 'var(--portal-mute)', marginBottom: 18, lineHeight: 1.5 }}>
        {t.onboarding.hint_accounts}
      </p>

      <Field>
        <Eyebrow style={{ marginBottom: 6 }}>{t.accounts_h}</Eyebrow>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 6 }}>
          {ACCOUNT_TYPES.filter((x) => x !== 'other').map((type) => (
            <button
              key={type}
              type="button"
              onClick={() => setAccount({ ...account, account_type: type })}
              style={{
                ...chipStyle(account.account_type === type),
                padding: '10px 8px',
                fontSize: 12,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'flex-start',
                gap: 2,
              }}
            >
              <span style={{ fontWeight: 700 }}>{t.types[type]}</span>
              <span style={{ fontSize: 10, color: account.account_type === type ? 'rgba(255,255,255,.7)' : 'var(--portal-mute)', fontWeight: 500 }}>
                {t.type_sub[type]}
              </span>
            </button>
          ))}
        </div>
      </Field>

      <Field>
        <Eyebrow style={{ marginBottom: 6 }}>Display name (optional)</Eyebrow>
        <input
          type="text"
          value={account.display_name}
          onChange={(e) => setAccount({ ...account, display_name: e.target.value })}
          placeholder="TFSA at RBC"
          style={inputStyle}
        />
      </Field>

      <Field>
        <Eyebrow style={{ marginBottom: 6 }}>{t.balance_total} · CAD</Eyebrow>
        <input
          type="number"
          inputMode="decimal"
          step="0.01"
          min="0"
          value={account.balance}
          onChange={(e) => setAccount({ ...account, balance: e.target.value })}
          placeholder="48720.00"
          style={inputStyle}
        />
      </Field>
    </>
  );
}

// ─── Step 3 — first goal ────────────────────────────────────────────────────
function Step3({ t, goal, setGoal, locale }) {
  const titlePh = defaultGoalTitle(goal.goal_key, t);
  return (
    <>
      <h2 style={{ margin: '0 0 4px', fontSize: 20, fontWeight: 800, letterSpacing: '-0.02em', color: 'var(--portal-ink)' }}>
        {t.onboarding.step3}
      </h2>
      <p style={{ fontSize: 12.5, color: 'var(--portal-mute)', marginBottom: 18, lineHeight: 1.5 }}>
        {t.onboarding.hint_goals}
      </p>

      <Field>
        <Eyebrow style={{ marginBottom: 6 }}>{t.goals_h}</Eyebrow>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 6 }}>
          {GOAL_KEYS.filter((x) => x !== 'custom').map((k) => (
            <button
              key={k}
              type="button"
              onClick={() => setGoal({ ...goal, goal_key: k, title: '' })}
              style={chipStyle(goal.goal_key === k)}
            >
              {t['goal_' + k] || k}
            </button>
          ))}
        </div>
      </Field>

      <Field>
        <Eyebrow style={{ marginBottom: 6 }}>Title (optional)</Eyebrow>
        <input
          type="text"
          value={goal.title}
          onChange={(e) => setGoal({ ...goal, title: e.target.value })}
          placeholder={titlePh}
          style={inputStyle}
        />
      </Field>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
        <Field>
          <Eyebrow style={{ marginBottom: 6 }}>{t.contributed} · CAD</Eyebrow>
          <input
            type="number"
            inputMode="decimal"
            step="0.01"
            min="0"
            value={goal.saved}
            onChange={(e) => setGoal({ ...goal, saved: e.target.value })}
            placeholder="0"
            style={inputStyle}
          />
        </Field>
        <Field>
          <Eyebrow style={{ marginBottom: 6 }}>{t.target} · CAD</Eyebrow>
          <input
            type="number"
            inputMode="decimal"
            step="0.01"
            min="0"
            value={goal.target}
            onChange={(e) => setGoal({ ...goal, target: e.target.value })}
            placeholder="60000"
            style={inputStyle}
          />
        </Field>
      </div>
    </>
  );
}

// ─── helpers ────────────────────────────────────────────────────────────────
function defaultGoalTitle(key, t) {
  return t['goal_' + key] || key;
}

function Field({ children }) {
  return <div style={{ marginBottom: 14 }}>{children}</div>;
}

const inputStyle = {
  width: '100%',
  padding: '11px 13px',
  border: '1px solid var(--portal-line)',
  borderRadius: 10,
  fontSize: 14,
  fontFamily: 'inherit',
  color: 'var(--portal-ink)',
  background: '#fff',
  outline: 'none',
};

function chipStyle(active) {
  return {
    padding: '8px 12px',
    borderRadius: 10,
    border: '1px solid ' + (active ? 'var(--portal-ink)' : 'var(--portal-line)'),
    background: active ? 'var(--portal-ink)' : '#fff',
    color: active ? '#fff' : 'var(--portal-ink)',
    fontSize: 12.5,
    fontWeight: 600,
    cursor: 'pointer',
    fontFamily: 'inherit',
    textAlign: 'left',
  };
}
