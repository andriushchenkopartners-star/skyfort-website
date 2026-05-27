// app/[locale]/portal/(dashboard)/documents/DocumentsList.jsx
'use client';

import { useState, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { browserClient } from '../../../../_lib/portal/supabase';
import { fmtDate } from '../../../../_lib/portal/fmt';
import Card from '../../../../_components/portal/Card';
import Btn from '../../../../_components/portal/Btn';
import Eyebrow from '../../../../_components/portal/Eyebrow';
import { PortalIcons as I } from '../../../../_components/portal/icons';

const BUCKET = 'portal-documents';
const MAX_SIZE_MB = 10;
const ALLOWED_TYPES = [
  'application/pdf',
  'image/png',
  'image/jpeg',
  'image/webp',
];

function fmtBytes(n) {
  if (!n) return '—';
  if (n < 1024) return n + ' B';
  if (n < 1024 * 1024) return (n / 1024).toFixed(1) + ' KB';
  return (n / 1024 / 1024).toFixed(1) + ' MB';
}

function categoryColor(cat) {
  return (
    {
      kyc: '#b7791f',
      statement: '#2D73E3',
      tax: '#1f8a5b',
      agreement: '#6b6b66',
      welcome: '#7A5AE0',
    }[cat] || '#888'
  );
}

function categoryLabel(cat, locale) {
  const dict = {
    uk: { kyc: 'KYC', statement: 'Виписка', tax: 'Податки', agreement: 'Договір', welcome: 'Welcome' },
    ru: { kyc: 'KYC', statement: 'Выписка', tax: 'Налоги', agreement: 'Договор', welcome: 'Welcome' },
    en: { kyc: 'KYC', statement: 'Statement', tax: 'Tax', agreement: 'Agreement', welcome: 'Welcome' },
  };
  return dict[locale]?.[cat] || cat?.toUpperCase() || '—';
}

export default function DocumentsList({ initialDocuments, userId, locale, t }) {
  const router = useRouter();
  const [documents, setDocuments] = useState(initialDocuments);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState('');
  const [uploadProgress, setUploadProgress] = useState(null);
  const fileInputRef = useRef(null);
  const supabase = browserClient();

  async function refresh() {
    const { data } = await supabase
      .from('portal_documents')
      .select('*')
      .eq('user_id', userId)
      .eq('visible', true)
      .order('uploaded_at', { ascending: false });
    setDocuments(data || []);
    router.refresh();
  }

  async function handleUpload(file) {
    if (!file) return;
    setError('');

    // Validate
    if (file.size > MAX_SIZE_MB * 1024 * 1024) {
      setError(
        locale === 'uk'
          ? `Файл занадто великий (макс ${MAX_SIZE_MB} MB)`
          : locale === 'ru'
          ? `Файл слишком большой (макс ${MAX_SIZE_MB} MB)`
          : `File too large (max ${MAX_SIZE_MB} MB)`
      );
      return;
    }
    if (!ALLOWED_TYPES.includes(file.type)) {
      setError(
        locale === 'uk'
          ? 'Тип файлу не підтримується. Дозволено: PDF, PNG, JPEG, WebP'
          : locale === 'ru'
          ? 'Тип файла не поддерживается. Разрешено: PDF, PNG, JPEG, WebP'
          : 'File type not allowed. Allowed: PDF, PNG, JPEG, WebP'
      );
      return;
    }

    setBusy(true);
    setUploadProgress(0);
    try {
      // Path: <user_id>/<timestamp>-<sanitized-name>
      const safeName = file.name.replace(/[^\w.\-]/g, '_');
      const path = `${userId}/${Date.now()}-${safeName}`;

      const { error: upErr } = await supabase.storage
        .from(BUCKET)
        .upload(path, file, { contentType: file.type, upsert: false });
      if (upErr) throw upErr;

      setUploadProgress(80);

      const { error: insErr } = await supabase.from('portal_documents').insert({
        user_id: userId,
        title: file.name,
        category: null,
        file_path: path,
        file_size_bytes: file.size,
        mime_type: file.type,
        uploaded_by: 'client',
        visible: true,
      });
      if (insErr) throw insErr;

      setUploadProgress(100);
      await refresh();
      if (fileInputRef.current) fileInputRef.current.value = '';
    } catch (e) {
      setError(e.message);
    } finally {
      setBusy(false);
      setTimeout(() => setUploadProgress(null), 600);
    }
  }

  async function handleDownload(doc) {
    setError('');
    setBusy(true);
    try {
      const { data, error: err } = await supabase.storage
        .from(BUCKET)
        .createSignedUrl(doc.file_path, 3600); // 1 hour
      if (err) throw err;
      window.open(data.signedUrl, '_blank');
    } catch (e) {
      setError(e.message);
    } finally {
      setBusy(false);
    }
  }

  async function handleDelete(doc) {
    if (doc.uploaded_by !== 'client') return; // can only delete own uploads
    if (!confirm(t.delete + '?')) return;
    setBusy(true);
    try {
      const { error: stErr } = await supabase.storage
        .from(BUCKET)
        .remove([doc.file_path]);
      if (stErr) console.warn('storage delete:', stErr.message);
      const { error: dbErr } = await supabase
        .from('portal_documents')
        .delete()
        .eq('id', doc.id);
      if (dbErr) throw dbErr;
      await refresh();
    } catch (e) {
      setError(e.message);
    } finally {
      setBusy(false);
    }
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 20, maxWidth: 900 }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <div>
          <Eyebrow>{t.nav.documents}</Eyebrow>
          <h1
            style={{
              margin: '6px 0 0',
              fontSize: 28,
              fontWeight: 800,
              letterSpacing: '-0.025em',
              color: 'var(--portal-ink)',
            }}
          >
            {t.nav.documents}
          </h1>
        </div>
        <input
          ref={fileInputRef}
          type="file"
          accept={ALLOWED_TYPES.join(',')}
          style={{ display: 'none' }}
          onChange={(e) => handleUpload(e.target.files?.[0])}
        />
        <Btn
          variant="ink"
          size="md"
          icon={I.upload}
          onClick={() => fileInputRef.current?.click()}
          disabled={busy}
        >
          {t.upload}
        </Btn>
      </div>

      {error && (
        <div style={{ padding: '10px 14px', background: 'rgba(195,74,58,.08)', color: 'var(--portal-negative)', borderRadius: 10, fontSize: 13 }}>
          {error}
        </div>
      )}

      {uploadProgress != null && (
        <div style={{ height: 4, background: 'var(--portal-paper-2)', borderRadius: 2, overflow: 'hidden' }}>
          <div
            style={{
              width: `${uploadProgress}%`,
              height: '100%',
              background: 'var(--color-brand)',
              transition: 'width .3s ease',
            }}
          />
        </div>
      )}

      {documents.length === 0 ? (
        <Card pad={40} style={{ textAlign: 'center', borderStyle: 'dashed' }}>
          <p style={{ margin: '0 0 16px', color: 'var(--portal-mute)' }}>
            {locale === 'uk'
              ? 'Документи від консультанта зʼявляться тут. Ти теж можеш завантажити свої файли (наприклад, скрін рахунку для discovery call).'
              : locale === 'ru'
              ? 'Документы от консультанта появятся здесь. Ты тоже можешь загрузить свои файлы (например, скрин счёта для discovery call).'
              : "Documents from your advisor will appear here. You can also upload your own files (e.g., an account screenshot for a discovery call)."}
          </p>
          <Btn
            variant="primary"
            size="md"
            icon={I.upload}
            onClick={() => fileInputRef.current?.click()}
          >
            {t.upload}
          </Btn>
        </Card>
      ) : (
        <Card pad={0}>
          <ul style={{ listStyle: 'none', margin: 0, padding: 0 }}>
            {documents.map((doc, i) => (
              <li
                key={doc.id}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 14,
                  padding: '14px 20px',
                  borderBottom:
                    i < documents.length - 1 ? '1px solid var(--portal-line)' : 'none',
                }}
              >
                {/* Icon */}
                <div
                  style={{
                    width: 40,
                    height: 40,
                    borderRadius: 10,
                    background: 'var(--portal-paper)',
                    display: 'grid',
                    placeItems: 'center',
                    color: categoryColor(doc.category),
                    flexShrink: 0,
                  }}
                >
                  {I.doc}
                </div>

                {/* Title + meta */}
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div
                    style={{
                      fontSize: 14,
                      fontWeight: 600,
                      color: 'var(--portal-ink)',
                      overflow: 'hidden',
                      textOverflow: 'ellipsis',
                      whiteSpace: 'nowrap',
                    }}
                  >
                    {doc.title}
                  </div>
                  <div
                    style={{
                      fontSize: 11.5,
                      color: 'var(--portal-mute)',
                      marginTop: 2,
                      display: 'flex',
                      gap: 8,
                      flexWrap: 'wrap',
                    }}
                  >
                    {doc.category && (
                      <span
                        style={{
                          padding: '1px 6px',
                          borderRadius: 4,
                          background: categoryColor(doc.category) + '22',
                          color: categoryColor(doc.category),
                          fontWeight: 700,
                          fontSize: 10,
                          textTransform: 'uppercase',
                          letterSpacing: '0.06em',
                        }}
                      >
                        {categoryLabel(doc.category, locale)}
                      </span>
                    )}
                    <span>{fmtDate(doc.uploaded_at, t.locale)}</span>
                    <span>· {fmtBytes(doc.file_size_bytes)}</span>
                    <span>
                      ·{' '}
                      {doc.uploaded_by === 'advisor'
                        ? locale === 'uk' ? 'Від консультанта' : locale === 'ru' ? 'От консультанта' : 'From advisor'
                        : locale === 'uk' ? 'Завантажено тобою' : locale === 'ru' ? 'Загружено тобой' : 'Uploaded by you'}
                    </span>
                  </div>
                </div>

                {/* Actions */}
                <div style={{ display: 'flex', gap: 6 }}>
                  <button
                    type="button"
                    onClick={() => handleDownload(doc)}
                    disabled={busy}
                    style={{
                      padding: '8px 12px',
                      borderRadius: 8,
                      border: '1px solid var(--portal-line)',
                      background: '#fff',
                      color: 'var(--portal-ink)',
                      cursor: 'pointer',
                      fontSize: 12,
                      fontWeight: 600,
                      fontFamily: 'inherit',
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: 6,
                    }}
                  >
                    {I.arrow(90)}
                    {t.download}
                  </button>
                  {doc.uploaded_by === 'client' && (
                    <button
                      type="button"
                      onClick={() => handleDelete(doc)}
                      disabled={busy}
                      title={t.delete}
                      style={{
                        width: 36,
                        height: 36,
                        borderRadius: 8,
                        border: '1px solid var(--portal-line)',
                        background: '#fff',
                        color: 'var(--portal-negative)',
                        cursor: 'pointer',
                        display: 'grid',
                        placeItems: 'center',
                      }}
                      aria-label={t.delete}
                    >
                      <svg width="14" height="14" viewBox="0 0 16 16" aria-hidden="true">
                        <path
                          d="M3 5h10M6 5V3h4v2M5 5l1 9h4l1-9"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="1.4"
                          strokeLinejoin="round"
                          strokeLinecap="round"
                        />
                      </svg>
                    </button>
                  )}
                </div>
              </li>
            ))}
          </ul>
        </Card>
      )}

      <p style={{ marginTop: 8, fontSize: 11, color: 'var(--portal-mute)', textAlign: 'center', lineHeight: 1.55 }}>
        {locale === 'uk'
          ? 'Документи зберігаються в зашифрованому сховищі. Тільки ти і твій консультант мають доступ.'
          : locale === 'ru'
          ? 'Документы хранятся в зашифрованном хранилище. Только ты и твой консультант имеют доступ.'
          : 'Documents are stored in encrypted storage. Only you and your advisor have access.'}
        <br />
        {t.emd_disclaimer}
      </p>
    </div>
  );
}
