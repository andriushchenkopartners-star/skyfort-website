// app/_lib/portal/notifications.js
// Phase 6 — transactional email notifications when the advisor pushes
// something into a client's portal (a new document, message, or todo).
//
// Uses Brevo's transactional SMTP API (same key as the welcome-email flow
// already wired in app/api/email-subscribe/route.js). Inline HTML rather
// than Brevo templates so changes don't require dashboard work — pure code.
//
// Sender: andrii@sky-fort.ca (the user's own verified address). Brevo will
// refuse to send if the domain isn't verified in the Brevo dashboard, so
// confirm sky-fort.ca senders are listed under Senders & IPs → Senders.
//
// Locale: looked up from the user's Supabase user_metadata.locale, falling
// back to 'uk' (the primary language). To override per-user, advisors can
// set metadata when creating the account.
//
// Anti-dedup: skipped in v1 — advisors send manually and rarely back-to-back.
// If multi-spam becomes a problem, add a portal_notifications table with a
// 5-minute window check before dispatch.
//
// Call sites (all post-insert in admin/portal/* routes):
//   notifyClient({ userId, kind: 'document', title, ctaPath: '/portal/documents' })
//   notifyClient({ userId, kind: 'message',  text,  ctaPath: '/portal/messages'  })
//   notifyClient({ userId, kind: 'todo',     title, ctaPath: '/portal/todos'     })
//
// Fire-and-forget — callers should NOT await this. The email is a side
// channel; we never want to block the admin response on Brevo latency.

import { serviceClient } from './supabase';

const BREVO_API_KEY = process.env.BREVO_API_KEY;
const SENDER = {
  email: process.env.BREVO_NOTIFICATION_SENDER || 'andrii@sky-fort.ca',
  name: 'Andrii · SkyFort',
};
const SITE = 'https://sky-fort.ca';

// ─── Per-kind, per-locale copy ──────────────────────────────────────────────
// Each kind has subject, intro line, and CTA label localized for uk/ru/en.
// The body string is whatever the advisor typed (message text) or the doc
// title — passed through to a short context paragraph.

const COPY = {
  document: {
    uk: {
      subject: 'Новий документ у твоєму SkyFort порталі',
      heading: 'Андрій додав новий документ',
      contextLabel: 'Назва документа',
      cta: 'Відкрити документ',
      preheader: 'Документ доступний для перегляду в твоєму особистому кабінеті.',
    },
    ru: {
      subject: 'Новый документ в твоём SkyFort портале',
      heading: 'Андрей добавил новый документ',
      contextLabel: 'Название документа',
      cta: 'Открыть документ',
      preheader: 'Документ доступен для просмотра в твоём личном кабинете.',
    },
    en: {
      subject: 'A new document is waiting in your SkyFort portal',
      heading: 'Andrii uploaded a new document',
      contextLabel: 'Document title',
      cta: 'Open the document',
      preheader: 'The document is available in your client portal.',
    },
  },
  message: {
    uk: {
      subject: 'Нове повідомлення від Андрія у SkyFort',
      heading: 'Андрій надіслав тобі повідомлення',
      contextLabel: 'Текст повідомлення',
      cta: 'Відповісти в порталі',
      preheader: 'Прочитай і відповідай прямо в порталі.',
    },
    ru: {
      subject: 'Новое сообщение от Андрея в SkyFort',
      heading: 'Андрей отправил тебе сообщение',
      contextLabel: 'Текст сообщения',
      cta: 'Ответить в портале',
      preheader: 'Прочитай и ответь прямо в портале.',
    },
    en: {
      subject: 'New message from Andrii in SkyFort',
      heading: 'Andrii sent you a message',
      contextLabel: 'Message',
      cta: 'Reply in the portal',
      preheader: 'Read and reply directly inside the portal.',
    },
  },
  todo: {
    uk: {
      subject: 'Нова задача від Андрія у SkyFort',
      heading: 'Андрій додав нову задачу',
      contextLabel: 'Задача',
      cta: 'Переглянути задачу',
      preheader: 'Задача додана у твій список — заглянь коли буде час.',
    },
    ru: {
      subject: 'Новая задача от Андрея в SkyFort',
      heading: 'Андрей добавил новую задачу',
      contextLabel: 'Задача',
      cta: 'Посмотреть задачу',
      preheader: 'Задача добавлена в твой список — загляни когда будет время.',
    },
    en: {
      subject: 'New todo from Andrii in SkyFort',
      heading: 'Andrii added a new todo',
      contextLabel: 'Todo',
      cta: 'View the todo',
      preheader: 'A new item was added to your list — check it when you can.',
    },
  },
};

// ─── Branded HTML email template ────────────────────────────────────────────
// Light-bg (works in both light + dark email clients). Brand-blue accents.
// All inline styles for Gmail/Outlook compatibility. Numeric entities only —
// learned this the hard way fixing the signature encoding bug.

function renderEmailHtml({ locale, c, context, ctaUrl, name }) {
  const greeting = name
    ? { uk: `Привіт, ${name}!`, ru: `Привет, ${name}!`, en: `Hi ${name}!` }[locale]
    : { uk: 'Привіт!', ru: 'Привет!', en: 'Hi!' }[locale];
  const footerText = {
    uk: 'Це автоматичне сповіщення з твого клієнтського порталу SkyFort. Якщо щось виглядає не так — напиши Андрію.',
    ru: 'Это автоматическое уведомление из твоего клиентского портала SkyFort. Если что-то выглядит не так — напиши Андрею.',
    en: 'Automated notification from your SkyFort client portal. If something looks off, reply directly to Andrii.',
  }[locale];

  // Truncate context preview — long messages get a "..." with a CTA to view full text.
  const preview = context && context.length > 240 ? context.slice(0, 237) + '&hellip;' : context;

  return `<!DOCTYPE html>
<html lang="${locale}">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>${c.subject}</title>
</head>
<body style="margin:0;padding:0;background:#f6f4ef;font-family:'Manrope','Helvetica Neue',Helvetica,Arial,sans-serif;color:#191919;">
<!-- Hidden preheader, shown by inbox previews -->
<div style="display:none;font-size:1px;color:#f6f4ef;line-height:1px;max-height:0;max-width:0;opacity:0;overflow:hidden;">${c.preheader}</div>

<table role="presentation" cellpadding="0" cellspacing="0" border="0" width="100%" style="background:#f6f4ef;">
  <tr>
    <td align="center" style="padding:32px 16px;">
      <table role="presentation" cellpadding="0" cellspacing="0" border="0" width="560" style="max-width:560px;background:#ffffff;border-radius:14px;overflow:hidden;box-shadow:0 4px 24px rgba(0,0,0,0.06);">
        <!-- Brand accent bar -->
        <tr><td style="height:4px;background:#2D73E3;line-height:4px;font-size:0;">&nbsp;</td></tr>

        <!-- Header -->
        <tr>
          <td style="padding:28px 32px 8px;">
            <table role="presentation" cellpadding="0" cellspacing="0" border="0">
              <tr>
                <td style="padding-right:12px;vertical-align:middle;">
                  <img src="${SITE}/icon-email.png" alt="SkyFort" width="36" height="33" style="display:block;border:0;outline:none;">
                </td>
                <td style="vertical-align:middle;font-size:14px;font-weight:800;color:#191919;letter-spacing:0.02em;">
                  SkyFort
                </td>
              </tr>
            </table>
          </td>
        </tr>

        <!-- Greeting + heading -->
        <tr>
          <td style="padding:16px 32px 0;">
            <div style="font-size:13px;color:#6b6b6b;margin-bottom:6px;">${greeting}</div>
            <div style="font-size:22px;font-weight:800;color:#191919;letter-spacing:-0.01em;line-height:1.25;">${c.heading}</div>
          </td>
        </tr>

        <!-- Context block -->
        ${preview ? `
        <tr>
          <td style="padding:18px 32px 0;">
            <div style="font-size:11px;font-weight:700;letter-spacing:0.12em;color:#9a9a9a;text-transform:uppercase;margin-bottom:8px;">${c.contextLabel}</div>
            <div style="font-size:14px;line-height:1.55;color:#333333;background:#f6f4ef;border-left:3px solid #2D73E3;padding:14px 16px;border-radius:0 8px 8px 0;">${escapeHtml(preview)}</div>
          </td>
        </tr>` : ''}

        <!-- CTA button -->
        <tr>
          <td style="padding:24px 32px 8px;">
            <table role="presentation" cellpadding="0" cellspacing="0" border="0">
              <tr>
                <td style="background:#2D73E3;border-radius:10px;">
                  <a href="${ctaUrl}" style="display:inline-block;padding:12px 24px;font-size:13px;font-weight:700;color:#ffffff;text-decoration:none;letter-spacing:0.06em;text-transform:uppercase;border-radius:10px;">
                    ${c.cta}&nbsp;&rarr;
                  </a>
                </td>
              </tr>
            </table>
          </td>
        </tr>

        <!-- Footer -->
        <tr>
          <td style="padding:28px 32px 28px;">
            <div style="border-top:1px solid #e5e7eb;padding-top:16px;font-size:11px;line-height:1.55;color:#9a9a9a;">
              ${footerText}
            </div>
          </td>
        </tr>
      </table>

      <!-- Compliance microfooter (outside the card) -->
      <table role="presentation" cellpadding="0" cellspacing="0" border="0" width="560" style="max-width:560px;margin-top:14px;">
        <tr>
          <td style="padding:0 32px;font-size:10px;line-height:1.5;color:#9a9a9a;text-align:center;">
            SkyFort Wealth&nbsp;&middot;&nbsp;Andrii Andriushchenko, Dealing Representative (NRD #4575551)&nbsp;&middot;&nbsp;Axcess Capital Advisors Inc. (Exempt Market Dealer)&nbsp;&middot;&nbsp;Calgary, AB
          </td>
        </tr>
      </table>
    </td>
  </tr>
</table>
</body>
</html>`;
}

// Minimal HTML escape for user-supplied context (message text, doc title).
function escapeHtml(s) {
  return String(s)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

// ─── Lookup helpers ──────────────────────────────────────────────────────────

async function getClientInfo(sb, userId) {
  // Service-role can call auth.admin.getUserById. Email lives on the auth user
  // record; preferred display name + locale we keep in user_metadata.
  try {
    const { data, error } = await sb.auth.admin.getUserById(userId);
    if (error || !data?.user) return null;
    const u = data.user;
    const meta = u.user_metadata || {};
    return {
      email: u.email || null,
      name: meta.full_name || meta.name || null,
      locale: (meta.locale || 'uk').toString().slice(0, 2).toLowerCase(),
    };
  } catch (e) {
    console.warn('[notifications] getClientInfo failed:', e.message);
    return null;
  }
}

// ─── Public API ──────────────────────────────────────────────────────────────

export async function notifyClient({ userId, kind, title, text, ctaPath }) {
  // Silently no-op if Brevo isn't configured (e.g., local dev without secrets).
  // We never want to crash the admin route over a missing notification key.
  if (!BREVO_API_KEY) {
    console.log('[notifications] BREVO_API_KEY missing — skipping notification');
    return { ok: false, skipped: 'no_brevo_key' };
  }
  if (!userId || !kind) {
    return { ok: false, error: 'missing userId or kind' };
  }
  if (!COPY[kind]) {
    return { ok: false, error: `unknown kind: ${kind}` };
  }

  let sb;
  try {
    sb = serviceClient();
  } catch (e) {
    return { ok: false, error: 'supabase service client not available: ' + e.message };
  }

  const info = await getClientInfo(sb, userId);
  if (!info?.email) {
    return { ok: false, error: 'no email for user ' + userId };
  }

  const locale = info.locale && COPY[kind][info.locale] ? info.locale : 'uk';
  const c = COPY[kind][locale];
  const ctaUrl = `${SITE}/${locale}${ctaPath || '/portal'}`;
  const context = text || title || null;
  const html = renderEmailHtml({ locale, c, context, ctaUrl, name: info.name });

  try {
    const res = await fetch('https://api.brevo.com/v3/smtp/email', {
      method: 'POST',
      headers: {
        'api-key': BREVO_API_KEY,
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
      body: JSON.stringify({
        sender: SENDER,
        to: [{ email: info.email, name: info.name || undefined }],
        subject: c.subject,
        htmlContent: html,
        // tag so we can filter Brevo logs by event class
        tags: ['portal-notification', `kind:${kind}`, `locale:${locale}`],
      }),
    });
    if (!res.ok) {
      const errText = await res.text().catch(() => '');
      console.warn(`[notifications] Brevo ${res.status}:`, errText.slice(0, 300));
      return { ok: false, error: `brevo_${res.status}` };
    }
    return { ok: true };
  } catch (e) {
    console.warn('[notifications] send failed:', e.message);
    return { ok: false, error: e.message };
  }
}
