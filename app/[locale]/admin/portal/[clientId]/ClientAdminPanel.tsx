// app/[locale]/admin/portal/[clientId]/ClientAdminPanel.tsx
// Interactive admin panel for one client — push todo, send message, upload doc.

'use client';

import { useState, useRef } from 'react';
import { useRouter } from 'next/navigation';
import Card from '../../../../_components/portal/Card';
import Btn from '../../../../_components/portal/Btn';
import Eyebrow from '../../../../_components/portal/Eyebrow';
import { PortalIcons as I } from '../../../../_components/portal/icons';
import { fmtDate } from '../../../../_lib/portal/fmt';

const TODO_CATEGORIES = ['kyc', 'fhsa', 'rrsp', 'tfsa', 'exempt', 'general'];
const DOC_CATEGORIES = ['kyc', 'statement', 'tax', 'agreement', 'welcome'];

export default function ClientAdminPanel({
  clientId,
  clientName,
  locale,
  initialTodos,
  initialMessages,
  initialDocuments,
}: {
  clientId: string;
  clientName?: string;
  locale?: string;
  initialTodos: any[];
  initialMessages: any[];
  initialDocuments: any[];
}) {
  const router = useRouter();
  const [todos, setTodos] = useState(initialTodos);
  const [messages, setMessages] = useState(initialMessages);
  const [documents, setDocuments] = useState(initialDocuments);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState('');

  // Todo form
  const [todoTitle, setTodoTitle] = useState('');
  const [todoCategory, setTodoCategory] = useState('general');

  // Message form
  const [msgDraft, setMsgDraft] = useState('');

  // Document upload
  const [docTitle, setDocTitle] = useState('');
  const [docCategory, setDocCategory] = useState('statement');
  const fileInputRef = useRef<HTMLInputElement>(null);

  async function pushTodo() {
    if (!todoTitle.trim() || busy) return;
    setBusy(true);
    setError('');
    try {
      const res = await fetch('/api/admin/portal/todos', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ userId: clientId, title: todoTitle.trim(), category: todoCategory }),
      });
      const j = await res.json();
      if (!res.ok) throw new Error(j.error);
      setTodos([j.todo, ...todos]);
      setTodoTitle('');
      router.refresh();
    } catch (e) {
      setError(e.message);
    } finally {
      setBusy(false);
    }
  }

  async function sendMessage() {
    if (!msgDraft.trim() || busy) return;
    setBusy(true);
    setError('');
    try {
      const res = await fetch('/api/admin/portal/messages', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ userId: clientId, text: msgDraft.trim() }),
      });
      const j = await res.json();
      if (!res.ok) throw new Error(j.error);
      setMessages([...messages, j.message]);
      setMsgDraft('');
      router.refresh();
    } catch (e) {
      setError(e.message);
    } finally {
      setBusy(false);
    }
  }

  async function uploadDoc(file?: File) {
    if (!file || busy) return;
    setBusy(true);
    setError('');
    try {
      const form = new FormData();
      form.append('userId', clientId);
      form.append('title', docTitle.trim() || file.name);
      form.append('category', docCategory);
      form.append('file', file);
      const res = await fetch('/api/admin/portal/documents', {
        method: 'POST',
        body: form,
      });
      const j = await res.json();
      if (!res.ok) throw new Error(j.error);
      setDocuments([j.document, ...documents]);
      setDocTitle('');
      if (fileInputRef.current) fileInputRef.current.value = '';
      router.refresh();
    } catch (e) {
      setError(e.message);
    } finally {
      setBusy(false);
    }
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
      {error && (
        <div style={{ padding: '10px 14px', background: 'rgba(195,74,58,.08)', color: 'var(--portal-negative)', borderRadius: 10, fontSize: 13 }}>
          {error}
        </div>
      )}

      {/* Push todo */}
      <Card pad={20}>
        <Eyebrow>Push todo to {clientName?.split(' ')[0]}</Eyebrow>
        <div style={{ marginTop: 14, display: 'flex', gap: 8 }}>
          <input
            type="text"
            value={todoTitle}
            onChange={(e) => setTodoTitle(e.target.value)}
            placeholder="e.g., Sign FHSA Q3 statement"
            disabled={busy}
            style={{ flex: 1, padding: '10px 12px', border: '1px solid var(--portal-line)', borderRadius: 10, fontSize: 14, fontFamily: 'inherit', outline: 'none' }}
          />
          <select
            value={todoCategory}
            onChange={(e) => setTodoCategory(e.target.value)}
            disabled={busy}
            style={{ padding: '10px 12px', border: '1px solid var(--portal-line)', borderRadius: 10, fontSize: 13, fontFamily: 'inherit', cursor: 'pointer' }}
          >
            {TODO_CATEGORIES.map((c) => <option key={c} value={c}>{c}</option>)}
          </select>
          <Btn variant="ink" size="md" onClick={pushTodo} disabled={busy || !todoTitle.trim()} icon={I.plus}>
            Push
          </Btn>
        </div>

        {todos.length > 0 && (
          <ul style={{ marginTop: 16, listStyle: 'none', padding: 0, display: 'flex', flexDirection: 'column', gap: 6 }}>
            {todos.slice(0, 8).map((t) => (
              <li
                key={t.id}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 10,
                  padding: '8px 12px',
                  background: 'var(--portal-paper)',
                  borderRadius: 8,
                  fontSize: 13,
                }}
              >
                <span
                  style={{
                    width: 8,
                    height: 8,
                    borderRadius: 8,
                    background: t.status === 'open' ? 'var(--portal-warn)' : 'var(--portal-positive)',
                  }}
                />
                <span style={{ flex: 1, color: 'var(--portal-ink)' }}>{t.title}</span>
                {t.category && (
                  <span style={{ fontSize: 10, padding: '2px 6px', background: 'var(--portal-paper-2)', color: 'var(--portal-mute)', borderRadius: 4, textTransform: 'uppercase', fontWeight: 700, letterSpacing: '0.06em' }}>
                    {t.category}
                  </span>
                )}
                <span style={{ fontSize: 11, color: 'var(--portal-mute)' }}>{fmtDate(t.created_at)}</span>
              </li>
            ))}
          </ul>
        )}
      </Card>

      {/* Messages */}
      <Card pad={0}>
        <div style={{ padding: '16px 20px', borderBottom: '1px solid var(--portal-line)' }}>
          <Eyebrow>Messages</Eyebrow>
        </div>
        <div style={{ padding: 20, maxHeight: 360, overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: 8, background: 'var(--portal-paper)' }}>
          {messages.length === 0 ? (
            <p style={{ textAlign: 'center', color: 'var(--portal-mute)', fontSize: 13 }}>No messages yet.</p>
          ) : (
            messages.map((m) => {
              const isAdvisor = m.from_role === 'advisor';
              return (
                <div
                  key={m.id}
                  style={{
                    alignSelf: isAdvisor ? 'flex-end' : 'flex-start',
                    maxWidth: '78%',
                    background: isAdvisor ? 'var(--portal-ink)' : '#fff',
                    color: isAdvisor ? '#fff' : 'var(--portal-ink)',
                    border: isAdvisor ? 'none' : '1px solid var(--portal-line)',
                    padding: '10px 14px',
                    borderRadius: isAdvisor ? '14px 14px 4px 14px' : '14px 14px 14px 4px',
                  }}
                >
                  <div style={{ fontSize: 10, opacity: 0.7, fontWeight: 600, marginBottom: 4 }}>
                    {isAdvisor ? 'You (Andrii)' : clientName}
                  </div>
                  <div style={{ fontSize: 14, whiteSpace: 'pre-wrap', lineHeight: 1.5 }}>{m.body}</div>
                  <div style={{ fontSize: 10, opacity: 0.6, marginTop: 4, textAlign: 'right' }}>
                    {new Date(m.created_at).toLocaleString('en-CA', { hour: 'numeric', minute: '2-digit', day: 'numeric', month: 'short' })}
                    {!isAdvisor && !m.read_at && ' · unread'}
                  </div>
                </div>
              );
            })
          )}
        </div>
        <div style={{ padding: 16, borderTop: '1px solid var(--portal-line)', background: '#fff', display: 'flex', gap: 10 }}>
          <textarea
            value={msgDraft}
            onChange={(e) => setMsgDraft(e.target.value)}
            placeholder={`Reply to ${clientName?.split(' ')[0]}…`}
            rows={3}
            disabled={busy}
            style={{ flex: 1, padding: '10px 12px', border: '1px solid var(--portal-line)', borderRadius: 10, fontSize: 14, fontFamily: 'inherit', outline: 'none', resize: 'vertical', minHeight: 70 }}
          />
          <Btn variant="primary" size="md" onClick={sendMessage} disabled={!msgDraft.trim() || busy}>
            Send
          </Btn>
        </div>
      </Card>

      {/* Document upload */}
      <Card pad={20}>
        <Eyebrow>Upload document for {clientName?.split(' ')[0]}</Eyebrow>
        <div style={{ marginTop: 14, display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8 }}>
          <input
            type="text"
            value={docTitle}
            onChange={(e) => setDocTitle(e.target.value)}
            placeholder="Title (default: filename)"
            disabled={busy}
            style={{ padding: '10px 12px', border: '1px solid var(--portal-line)', borderRadius: 10, fontSize: 14, fontFamily: 'inherit', outline: 'none' }}
          />
          <select
            value={docCategory}
            onChange={(e) => setDocCategory(e.target.value)}
            disabled={busy}
            style={{ padding: '10px 12px', border: '1px solid var(--portal-line)', borderRadius: 10, fontSize: 13, fontFamily: 'inherit', cursor: 'pointer' }}
          >
            {DOC_CATEGORIES.map((c) => <option key={c} value={c}>{c}</option>)}
          </select>
        </div>
        <input
          ref={fileInputRef}
          type="file"
          accept="application/pdf,image/png,image/jpeg,image/webp"
          onChange={(e) => uploadDoc(e.target.files?.[0])}
          disabled={busy}
          style={{ marginTop: 10, fontSize: 13 }}
        />
        <p style={{ marginTop: 8, fontSize: 11, color: 'var(--portal-mute)' }}>
          Max 10 MB. Allowed: PDF, PNG, JPEG, WebP. Client sees this in their Documents tab.
        </p>

        {documents.length > 0 && (
          <ul style={{ marginTop: 14, listStyle: 'none', padding: 0, display: 'flex', flexDirection: 'column', gap: 6 }}>
            {documents.slice(0, 8).map((d) => (
              <li
                key={d.id}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 10,
                  padding: '8px 12px',
                  background: 'var(--portal-paper)',
                  borderRadius: 8,
                  fontSize: 13,
                }}
              >
                <span style={{ color: 'var(--portal-ink)', flex: 1 }}>{d.title}</span>
                <span style={{ fontSize: 10, padding: '2px 6px', background: 'var(--portal-paper-2)', borderRadius: 4, textTransform: 'uppercase', fontWeight: 700, letterSpacing: '0.06em' }}>
                  {d.uploaded_by}
                </span>
                <span style={{ fontSize: 11, color: 'var(--portal-mute)' }}>{fmtDate(d.uploaded_at)}</span>
              </li>
            ))}
          </ul>
        )}
      </Card>
    </div>
  );
}
