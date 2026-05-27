# Portal Phase 6 (deferred) — Brevo email notifications

> Status: **deferred** for v1. Notes here so when ready, the implementation
> is fast (~2 hours).
>
> v1 client portal works fine without notifications — clients open the portal
> manually when they want to see updates. But for engagement (especially
> messaging — if Andrii replies and client doesn't open the portal for days),
> email notifications would help.

## What to wire up

Three notification triggers, all via Brevo transactional email:

1. **Todo pushed by advisor → client gets email**
   - Subject: "Новий пункт від Andrii / New action from your advisor"
   - Body: short blurb + "Open portal →" CTA
   - Triggered in `app/api/admin/portal/todos/route.js` after the insert succeeds

2. **Message from advisor → client gets email** (if last login >2 hours ago)
   - Subject: "Andrii написав тобі / New message from your advisor"
   - Body: first 100 chars of message + "Read in portal →"
   - Triggered in `app/api/admin/portal/messages/route.js`
   - Optionally skip if `last_sign_in_at` was recent (avoid double-notify)

3. **Message from client → Andrii gets email**
   - Subject: "Новий месседж від [Client name]"
   - To: andrii@sky-fort.ca
   - Body: client name + first 100 chars + link to /uk/admin/portal/{clientId}
   - Triggered in client's send-message flow (currently direct insert from `AdvisorChat.jsx` — would need a server route or a Postgres trigger)

4. **Stale-balance reminder** — if any account hasn't been updated in 30+ days
   - Cron-style: a weekly check
   - Could use Supabase Edge Functions OR Vercel Cron (`vercel.json` `crons`)
   - Subject: "Quarterly balance update reminder"
   - Body: list of stale accounts + "Update in portal →"

## Implementation sketch

### Helper module — `app/_lib/portal/notify.js`

```js
import { ADVISOR } from './advisor';

const BREVO_API_KEY = process.env.BREVO_API_KEY;
const PORTAL_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://sky-fort.ca';

async function brevoSend({ to, subject, htmlContent, tag }) {
  if (!BREVO_API_KEY) return;
  try {
    await fetch('https://api.brevo.com/v3/smtp/email', {
      method: 'POST',
      headers: {
        'api-key': BREVO_API_KEY,
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
      body: JSON.stringify({
        to: [{ email: to }],
        sender: { email: ADVISOR.email, name: ADVISOR.name },
        subject,
        htmlContent,
        tag,
      }),
    });
  } catch (e) {
    console.error('[notify]', e);
  }
}

export async function notifyTodoPushed({ to, clientName, todoTitle, locale }) {
  const portalUrl = `${PORTAL_URL}/${locale}/portal/overview`;
  await brevoSend({
    to,
    subject: locale === 'uk' ? 'Новий пункт у твоєму кабінеті SkyFort' : ...,
    htmlContent: `<p>Привіт ${clientName?.split(' ')[0]},</p>
      <p>Andrii додав новий пункт: <strong>${todoTitle}</strong></p>
      <p><a href="${portalUrl}">Відкрити кабінет →</a></p>`,
    tag: 'portal-todo',
  });
}

// notifyMessageToClient, notifyMessageToAdvisor, notifyStaleBalance similar
```

### Wire-up in admin routes

In `app/api/admin/portal/todos/route.js`, after `.insert(...)` succeeds, fire-and-forget:

```js
import { notifyTodoPushed } from '../../../../_lib/portal/notify';

// ... after insert ...
const { data: clientRow } = await sb
  .from('portal_clients')
  .select('full_name,preferred_lang')
  .eq('user_id', userId)
  .single();
const { data: authUser } = await sb.auth.admin.getUserById(userId);

notifyTodoPushed({
  to: authUser.user.email,
  clientName: clientRow?.full_name,
  todoTitle: title,
  locale: clientRow?.preferred_lang || 'uk',
});
```

### Brevo template alternative

Instead of inline HTML, create 3 transactional templates per language (UK/RU/EN) for each notification type. Reference via `templateId` and `params`:

```js
await fetch('https://api.brevo.com/v3/smtp/email', {
  ...
  body: JSON.stringify({
    to: [{ email: to }],
    templateId: BREVO_TODO_TPLID_UK,
    params: { FIRSTNAME: clientName, TODO_TITLE: todoTitle, PORTAL_URL: portalUrl },
  }),
});
```

## Cron for stale-balance reminders

Add `vercel.json`:

```json
{
  "crons": [
    { "path": "/api/cron/stale-balances", "schedule": "0 14 * * 1" }
  ]
}
```

(Weekly on Mondays at 14:00 UTC = 8:00 AM Calgary)

Route `app/api/cron/stale-balances/route.js`:
- Verify `request.headers.get('authorization') === \`Bearer ${process.env.CRON_SECRET}\``
- Service-role query: `portal_accounts` where `updated_at < now() - 30 days`
- Group by user, send digest email per user

## Compliance check

All notification emails:
- ✅ Sender = `andrii@sky-fort.ca` (verified in Brevo)
- ✅ Include EMD disclaimer in footer
- ✅ Brevo auto-adds unsubscribe (per CASL requirements)
- ✅ Subject/body framed as informational (no investment advice or returns)

## Order of implementation when ready

1. Create 6 Brevo transactional templates (2 events × 3 locales) — same automation we used for welcome emails
2. Get Template IDs, add to env vars
3. Create `app/_lib/portal/notify.js` with helper per event
4. Wire into existing admin API routes (3 lines each)
5. (Optional) cron for stale-balance
6. Test end-to-end

Estimated total: ~2 hours.
