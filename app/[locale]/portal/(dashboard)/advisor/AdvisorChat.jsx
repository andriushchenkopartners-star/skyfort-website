// app/[locale]/portal/(dashboard)/advisor/AdvisorChat.jsx
'use client';

import { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { browserClient } from '../../../../_lib/portal/supabase';
import { ADVISOR } from '../../../../_lib/portal/advisor';
import Card from '../../../../_components/portal/Card';
import Btn from '../../../../_components/portal/Btn';
import Eyebrow from '../../../../_components/portal/Eyebrow';
import BrandPanel from '../../../../_components/portal/BrandPanel';
import { PortalIcons as I } from '../../../../_components/portal/icons';

export default function AdvisorChat({ initialMessages, userId, locale, t }) {
  const router = useRouter();
  const [messages, setMessages] = useState(initialMessages);
  const [draft, setDraft] = useState('');
  const [sending, setSending] = useState(false);
  const [error, setError] = useState('');
  const threadRef = useRef(null);
  const supabase = browserClient();

  // Scroll to latest message on load + after send.
  useEffect(() => {
    if (threadRef.current) {
      threadRef.current.scrollTop = threadRef.current.scrollHeight;
    }
  }, [messages.length]);

  async function send() {
    const body = draft.trim();
    if (!body || sending) return;
    setSending(true);
    setError('');
    // Optimistic UI
    const temp = {
      id: 'tmp-' + Date.now(),
      user_id: userId,
      from_role: 'client',
      body,
      read_at: null,
      created_at: new Date().toISOString(),
    };
    setMessages((m) => [...m, temp]);
    setDraft('');
    try {
      const { data, error: err } = await supabase
        .from('portal_messages')
        .insert({ user_id: userId, from_role: 'client', body })
        .select()
        .single();
      if (err) throw err;
      // Replace temp with real row
      setMessages((m) => m.map((x) => (x.id === temp.id ? data : x)));
      router.refresh();
    } catch (e) {
      setError(e.message);
      // Roll back optimistic message
      setMessages((m) => m.filter((x) => x.id !== temp.id));
      setDraft(body); // restore draft
    } finally {
      setSending(false);
    }
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 20, maxWidth: 900 }}>
      <div>
        <Eyebrow>{t.your_advisor}</Eyebrow>
        <h1
          style={{
            margin: '6px 0 0',
            fontSize: 28,
            fontWeight: 800,
            letterSpacing: '-0.025em',
            color: 'var(--portal-ink)',
          }}
        >
          {ADVISOR.name}
        </h1>
      </div>

      {/* Advisor info card */}
      <Card pad={0} style={{ overflow: 'hidden', position: 'relative' }}>
        <div style={{ position: 'relative', padding: '32px 28px', minHeight: 160 }}>
          <BrandPanel tone="blue" muted />
          <div style={{ position: 'relative', zIndex: 1, color: '#fff' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 18 }}>
              <div
                style={{
                  width: 64,
                  height: 64,
                  borderRadius: 64,
                  background: 'rgba(255,255,255,.18)',
                  border: '1px solid rgba(255,255,255,.3)',
                  display: 'grid',
                  placeItems: 'center',
                  fontWeight: 800,
                  fontSize: 20,
                }}
              >
                {ADVISOR.initials}
              </div>
              <div>
                <div style={{ fontSize: 22, fontWeight: 800, letterSpacing: '-0.02em' }}>
                  {ADVISOR.name}
                </div>
                <div style={{ fontSize: 12.5, color: 'rgba(255,255,255,.78)', marginTop: 2 }}>
                  {ADVISOR.title[locale] || ADVISOR.title.en}
                </div>
                <div style={{ fontSize: 11.5, color: 'rgba(255,255,255,.6)', marginTop: 8 }}>
                  NRD #{ADVISOR.nrd} · {ADVISOR.firm}
                </div>
              </div>
            </div>
          </div>
        </div>
        <div
          style={{
            padding: '20px 28px',
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))',
            gap: 16,
          }}
        >
          <Meta label={t.licensed_in} value={ADVISOR.jurisdictions.join(' · ')} />
          <Meta
            label={locale === 'uk' ? 'Мови' : locale === 'ru' ? 'Языки' : 'Languages'}
            value={ADVISOR.languages.join(' · ')}
          />
          <Meta
            label={locale === 'uk' ? 'Телефон' : locale === 'ru' ? 'Телефон' : 'Phone'}
            value={
              <a href={`tel:${ADVISOR.phone}`} style={{ color: 'var(--color-brand)', textDecoration: 'none' }}>
                {ADVISOR.phone}
              </a>
            }
          />
          <Meta
            label="Email"
            value={
              <a href={`mailto:${ADVISOR.email}`} style={{ color: 'var(--color-brand)', textDecoration: 'none', fontSize: 13 }}>
                {ADVISOR.email}
              </a>
            }
          />
        </div>
        <div style={{ padding: '0 28px 24px', display: 'flex', gap: 10 }}>
          <Btn variant="ink" size="md" icon={I.calendar} href={ADVISOR.calendly}>
            {t.book_call}
          </Btn>
          <Btn
            variant="paper"
            size="md"
            href="https://info.securities-administrators.ca/nrsmobile/nrssearch.aspx"
          >
            {locale === 'uk'
              ? 'Перевірити NRD у CSA'
              : locale === 'ru'
              ? 'Проверить NRD в CSA'
              : 'Verify NRD at CSA'}{' '}
            ↗
          </Btn>
        </div>
      </Card>

      {/* Messages thread */}
      <Card pad={0}>
        <div style={{ padding: '18px 22px', borderBottom: '1px solid var(--portal-line)' }}>
          <Eyebrow>{t.nav.messages || 'Messages'}</Eyebrow>
        </div>

        <div
          ref={threadRef}
          style={{
            padding: 22,
            maxHeight: 480,
            overflowY: 'auto',
            display: 'flex',
            flexDirection: 'column',
            gap: 10,
            background: 'var(--portal-paper)',
          }}
          className="nice-scroll"
        >
          {messages.length === 0 ? (
            <p style={{ textAlign: 'center', color: 'var(--portal-mute)', fontSize: 13, padding: '40px 0' }}>
              {locale === 'uk'
                ? "Поки повідомлень немає. Напиши перше — Andrii зазвичай відповідає в межах робочого дня."
                : locale === 'ru'
                ? 'Пока сообщений нет. Напиши первое — Andrii обычно отвечает в рабочее время.'
                : "No messages yet. Send the first one — Andrii usually replies within the same business day."}
            </p>
          ) : (
            messages.map((m) => <Bubble key={m.id} message={m} t={t} />)
          )}
        </div>

        <div style={{ padding: 18, borderTop: '1px solid var(--portal-line)', background: '#fff' }}>
          {error && (
            <div style={{ marginBottom: 10, padding: '8px 12px', background: 'rgba(195,74,58,.08)', color: 'var(--portal-negative)', borderRadius: 8, fontSize: 12 }}>
              {error}
            </div>
          )}
          <div style={{ display: 'flex', gap: 10 }}>
            <textarea
              value={draft}
              onChange={(e) => setDraft(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter' && (e.metaKey || e.ctrlKey)) {
                  e.preventDefault();
                  send();
                }
              }}
              placeholder={
                locale === 'uk'
                  ? 'Напиши повідомлення… (Cmd+Enter надіслати)'
                  : locale === 'ru'
                  ? 'Напиши сообщение… (Cmd+Enter отправить)'
                  : 'Write a message… (Cmd+Enter to send)'
              }
              rows={3}
              disabled={sending}
              style={{
                flex: 1,
                padding: '10px 12px',
                border: '1px solid var(--portal-line)',
                borderRadius: 10,
                fontSize: 14,
                fontFamily: 'inherit',
                color: 'var(--portal-ink)',
                background: '#fff',
                outline: 'none',
                resize: 'vertical',
                minHeight: 70,
              }}
            />
            <Btn variant="primary" size="md" onClick={send} disabled={!draft.trim() || sending}>
              {sending ? '…' : t.send}
            </Btn>
          </div>
          <p style={{ marginTop: 8, fontSize: 11, color: 'var(--portal-mute)' }}>
            {locale === 'uk'
              ? 'Це освітнє листування, не персональна інвестиційна рекомендація. Конкретні поради — на discovery call після KYC.'
              : locale === 'ru'
              ? 'Это образовательная переписка, не персональная инвестиционная рекомендация. Конкретные советы — на discovery call после KYC.'
              : 'Educational correspondence only — not personal investment advice. Specific recommendations require a discovery call with KYC.'}
          </p>
        </div>
      </Card>
    </div>
  );
}

function Bubble({ message, t }) {
  const isClient = message.from_role === 'client';
  const time = new Date(message.created_at).toLocaleString('en-CA', {
    hour: 'numeric',
    minute: '2-digit',
    day: 'numeric',
    month: 'short',
  });
  return (
    <div
      style={{
        alignSelf: isClient ? 'flex-end' : 'flex-start',
        maxWidth: '78%',
        background: isClient ? 'var(--color-brand)' : '#fff',
        color: isClient ? '#fff' : 'var(--portal-ink)',
        border: isClient ? 'none' : '1px solid var(--portal-line)',
        padding: '10px 14px',
        borderRadius: isClient ? '14px 14px 4px 14px' : '14px 14px 14px 4px',
        boxShadow: isClient ? '0 1px 0 rgba(0,0,0,.04)' : 'none',
      }}
    >
      <div style={{ fontSize: 10, opacity: 0.7, marginBottom: 4, fontWeight: 600 }}>
        {isClient ? (t.nav.messages || 'You') : ADVISOR.name}
      </div>
      <div style={{ fontSize: 14, whiteSpace: 'pre-wrap', lineHeight: 1.5 }}>{message.body}</div>
      <div style={{ fontSize: 10, opacity: 0.6, marginTop: 4, textAlign: 'right' }}>{time}</div>
    </div>
  );
}

function Meta({ label, value }) {
  return (
    <div>
      <div style={{ fontSize: 10.5, color: 'var(--portal-mute)', fontWeight: 600, letterSpacing: '0.06em', textTransform: 'uppercase' }}>
        {label}
      </div>
      <div style={{ fontSize: 13.5, fontWeight: 600, color: 'var(--portal-ink)', marginTop: 4 }}>
        {value}
      </div>
    </div>
  );
}
