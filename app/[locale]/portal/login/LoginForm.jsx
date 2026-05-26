// app/[locale]/portal/login/LoginForm.jsx
// Client-side magic link form. Calls supabase.auth.signInWithOtp directly.

'use client';

import { useState } from 'react';
import { browserClient } from '../../../_lib/portal/supabase';
import Btn from '../../../_components/portal/Btn';
import Card from '../../../_components/portal/Card';
import Eyebrow from '../../../_components/portal/Eyebrow';
import SFLogotype from '../../../_components/portal/SFLogotype';
import { PortalIcons as I } from '../../../_components/portal/icons';

export default function LoginForm({ locale, t }) {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState('idle'); // 'idle' | 'sending' | 'sent' | 'error'
  const [errorMsg, setErrorMsg] = useState('');

  async function onSubmit(e) {
    e.preventDefault();
    if (!email || status === 'sending') return;
    setStatus('sending');
    setErrorMsg('');
    try {
      const supabase = browserClient();
      const { error } = await supabase.auth.signInWithOtp({
        email: email.trim().toLowerCase(),
        options: {
          emailRedirectTo: `${window.location.origin}/${locale}/portal/callback`,
          shouldCreateUser: false,
        },
      });
      if (error) {
        if (error.message?.toLowerCase().includes('not allowed') || error.status === 422) {
          setErrorMsg(
            locale === 'uk'
              ? 'Цей email ще не зареєстрований. Зв\'яжіться з Andrii щоб отримати доступ.'
              : locale === 'ru'
              ? 'Этот email ещё не зарегистрирован. Свяжитесь с Andrii для получения доступа.'
              : 'This email is not registered yet. Contact Andrii to request access.'
          );
        } else {
          setErrorMsg(error.message);
        }
        setStatus('error');
        return;
      }
      setStatus('sent');
    } catch (err) {
      console.error(err);
      setErrorMsg(err.message || 'Unknown error');
      setStatus('error');
    }
  }

  const sent = status === 'sent';

  return (
    <div
      style={{
        minHeight: '100vh',
        display: 'grid',
        placeItems: 'center',
        padding: '24px 16px',
      }}
    >
      <div style={{ width: '100%', maxWidth: 420 }}>
        <div style={{ display: 'flex', justifyContent: 'center', marginBottom: 28 }}>
          <SFLogotype height={22} color="var(--portal-ink)" />
        </div>

        <Card pad={28}>
          {!sent ? (
            <>
              <Eyebrow>{t.login.title}</Eyebrow>
              <h1
                style={{
                  margin: '12px 0 6px',
                  fontSize: 24,
                  fontWeight: 800,
                  letterSpacing: '-0.025em',
                  color: 'var(--portal-ink)',
                }}
              >
                {t.welcome}
              </h1>
              <p style={{ fontSize: 13.5, color: 'var(--portal-mute)', lineHeight: 1.55, marginBottom: 22 }}>
                {t.login.subtitle}
              </p>

              <form onSubmit={onSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                <label style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
                  <span style={{ fontSize: 11.5, fontWeight: 600, color: 'var(--portal-mute)', letterSpacing: '0.06em', textTransform: 'uppercase' }}>
                    {t.login.email_label}
                  </span>
                  <input
                    type="email"
                    required
                    autoFocus
                    autoComplete="email"
                    inputMode="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="anna@example.com"
                    style={{
                      width: '100%',
                      padding: '12px 14px',
                      border: '1px solid var(--portal-line)',
                      borderRadius: 10,
                      fontSize: 14,
                      fontFamily: 'inherit',
                      color: 'var(--portal-ink)',
                      background: '#fff',
                      outline: 'none',
                    }}
                  />
                </label>

                {status === 'error' && errorMsg && (
                  <div
                    style={{
                      fontSize: 12.5,
                      color: 'var(--portal-negative)',
                      background: 'rgba(195,74,58,.08)',
                      padding: '8px 12px',
                      borderRadius: 8,
                      lineHeight: 1.4,
                    }}
                  >
                    {errorMsg}
                  </div>
                )}

                <Btn type="submit" variant="ink" size="lg" full disabled={!email || status === 'sending'} icon={I.mail}>
                  {status === 'sending' ? '…' : t.login.submit}
                </Btn>
              </form>
            </>
          ) : (
            <div style={{ textAlign: 'center', padding: '8px 4px 4px' }}>
              <div
                style={{
                  width: 56,
                  height: 56,
                  borderRadius: 56,
                  background: 'var(--portal-blue-soft)',
                  color: 'var(--color-brand)',
                  display: 'grid',
                  placeItems: 'center',
                  margin: '0 auto 16px',
                }}
              >
                {I.mail}
              </div>
              <h2 style={{ fontSize: 20, fontWeight: 800, letterSpacing: '-0.02em', color: 'var(--portal-ink)', margin: '0 0 8px' }}>
                {t.login.sent_title}
              </h2>
              <p style={{ fontSize: 13.5, color: 'var(--portal-mute)', lineHeight: 1.55, margin: '0 0 20px' }}>
                {t.login.sent_body}
              </p>
              <div style={{ fontSize: 12, color: 'var(--portal-mute)' }}>
                <button
                  onClick={() => {
                    setStatus('idle');
                    setEmail('');
                  }}
                  style={{
                    background: 'transparent',
                    border: 'none',
                    color: 'var(--color-brand)',
                    fontWeight: 600,
                    cursor: 'pointer',
                    fontFamily: 'inherit',
                    fontSize: 12.5,
                  }}
                >
                  ← {t.login.back}
                </button>
              </div>
            </div>
          )}
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
          {t.emd_disclaimer}
        </p>
      </div>
    </div>
  );
}
