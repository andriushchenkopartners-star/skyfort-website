# Email capture form — налаштування Brevo

## Що зроблено в коді (готово)

- ✅ API endpoint: `app/api/email-subscribe/route.js`
  - Anti-spam: honeypot + rate limit (3/60сек/IP) + email validation
  - Подвійний запис: Brevo (для розсилок) + Supabase backup (на випадок проблем з Brevo)
  - Idempotent — повторні підписки upsert-яться без помилки
  - Tracks GA event `email_subscribe` з `brevo_synced` прапором
- ✅ Component: `app/_components/EmailCaptureForm.jsx`
  - 2 variants: `card` (з description) і `hero` (compact inline)
  - UA / RU / EN копії
- ✅ Mount-точки:
  - **`/uk`** (homepage): велика card-форма між `Steps` і `FAQ` (source: `homepage_inline`)
  - **`/uk/tt`** (TikTok landing): card-форма під 4 CTA-кнопками (source: `tt_landing`)

## Що тобі зробити в Brevo (~15 хв)

### 1. Створи контактний список (2 хв)

1. Brevo Dashboard → ліве меню **"Contacts" → "Lists"**.
2. **"Create a list"**.
3. Назва: `SkyFort Subscribers UK` (або `SkyFort Subscribers — Main`).
4. **Create**.
5. Запам'ятай **List ID** — він числовий, видно у URL коли клікаєш на список:
   ```
   https://app.brevo.com/contact/list/12345
                                    ^^^^^
   ```
   Або у вкладці "Settings" самого списку.

### 2. Створи 3 welcome email templates — UK / RU / EN (~15 хв)

**📋 Готові HTML-шаблони з copy-paste коду — у [docs/brevo-welcome-templates.md](brevo-welcome-templates.md)**

Кожна мова отримує свій template (бо у нас підписники з UK/RU/EN — кожному надсилаємо лист на його мові). Це автоматично через `body.locale` що пробрасується з форми.

Коротко:
1. Brevo → **Campaigns → Email Templates** → **New template**
2. Створюй 3 окремо: `SkyFort Welcome — UK`, `— RU`, `— EN`
3. У кожному обери **Use code editor** (зверху, поруч з "Drag & drop")
4. Скопіюй відповідний HTML з [docs/brevo-welcome-templates.md](brevo-welcome-templates.md) → встав
5. Subject + Preview text з того ж файлу
6. **Save & Activate**
7. Запиши 3 Template IDs (числа, видно у списку)

⚠️ **Sender** має бути `andrii@sky-fort.ca` — треба підтверджений (див. крок 3).

### 3. Підтвердження sender email (5 хв) — КРИТИЧНО

Без цього Brevo не дасть надсилати email від `andrii@sky-fort.ca`.

1. Brevo → **"Senders, Domains & Dedicated IPs" → "Senders"**.
2. **"Add a sender"**.
3. From name: `Andrii Andriushchenko`
4. From email: `andrii@sky-fort.ca`
5. Brevo надішле verification email на цю адресу → клікни на лінк.
6. Status має стати **Verified**.

### 4. (Опціонально, для кращої доставки) Domain authentication (5 хв)

Це робить email-и менш імовірно відмічати як Spam. Якщо ти власник `sky-fort.ca` — варто зробити.

1. Brevo → **"Senders, Domains & Dedicated IPs" → "Domains"** → **"Add a domain"**.
2. Введи `sky-fort.ca`.
3. Brevo дасть **3 DNS records** (SPF, DKIM, DMARC).
4. Зайди у твого DNS-провайдера (там де куплений домен — GoDaddy / Namecheap / Cloudflare / etc.).
5. Додай ці 3 TXT-записи.
6. Поверни в Brevo → **"Verify"** → коли DNS пропагається (5 хв - 24 год) — domain буде verified.

Якщо не знаєш де DNS-провайдер — поглянь в email-листі з покупкою домену або скинь screenshot реєстратора, я підкажу.

## Що додати у Vercel (5 env vars, ~5 хв)

Vercel → Settings → Environment Variables → Add new (по черзі):

| Key | Value | Опис |
|---|---|---|
| `BREVO_API_KEY` | (з .env.local) | Той же ключ що локально |
| `BREVO_LIST_ID` | (число з кроку 1) | Числовий ID списку. **БЕЗ лапок.** |
| `BREVO_WELCOME_TPLID_UK` | (число з кроку 2 — UK template) | UK welcome email |
| `BREVO_WELCOME_TPLID_RU` | (число з кроку 2 — RU template) | RU welcome email |
| `BREVO_WELCOME_TPLID_EN` | (число з кроку 2 — EN template) | EN welcome email |

Усі — на 3 environments (Production, Preview, Development). Sensitive ✓ на BREVO_API_KEY.

💡 **Опціонально**: якщо хочеш одну template на всіх замість трьох — додай тільки `BREVO_WELCOME_TPLID=<число>`. Код використає його як fallback для будь-якої мови. У такому випадку у template можеш використати `{{ params.LOCALE }}` для conditional рендерингу.

## Redeploy + тест

1. Vercel → Deployments → топ → "..." → Redeploy → зняти "Use existing Build Cache" → Redeploy.
2. Чекати "Ready" (~2 хв).
3. Відкрити `https://sky-fort.ca/uk` → проскролити до email-форми → ввести свій email → submit.
4. Має:
   - Показати зелений "Готово!" блок
   - Через ~30-60 сек прийти welcome email на твою пошту (якщо налаштовано template)
   - У Brevo → Contacts → "SkyFort Subscribers UK" → побачиш свій email
   - У Supabase → Table Editor → `email_subscribers` → побачиш запис

## Як ти бачитимеш підписки

### Brevo (для розсилок)

- Дашборд показує "Contacts" count
- Можеш створювати campaigns (broadcast) на цей list
- Automation: trigger welcome series коли контакт додається

### Supabase (для аналітики)

**Топ-джерела підписок:**
```sql
select source, count(*) as subs
from email_subscribers
where unsubscribed = false
group by source
order by subs desc;
```

**Failed Brevo sync (для ручної повторної синхронізації):**
```sql
select email, name, brevo_error, created_at
from email_subscribers
where brevo_status = 'failed'
order by created_at desc;
```

**Підписки за останні 7 днів по днях:**
```sql
select date_trunc('day', created_at) as day, count(*) as subs
from email_subscribers
where created_at > now() - interval '7 days'
group by 1 order by 1;
```

**Підписки з TikTok (по UTM):**
```sql
select email, source, utm_source, utm_campaign, created_at
from email_subscribers
where utm_source = 'tiktok'
order by created_at desc;
```

## Безпека

- ✅ Rate limit: 3 запити / 60 сек / IP-hash
- ✅ Honeypot field (`website`) для botів
- ✅ Email validation regex
- ✅ IP як SHA-256 hash (privacy + anti-spam)
- ✅ RLS на Supabase таблиці: тільки service_role може писати/читати
- ✅ Сonsent default true (форма submit = explicit consent — це OK для CASL в Канаді)
- ✅ Unsubscribe (legally required) — Brevo додає посилання автоматично у кожному email

## Що залишається на майбутнє

- 7-денна welcome серія (через Brevo Automation — налаштовується в Brevo UI)
- A/B-тест різних headline на формі
- Exit-intent popup (якщо хочеш ще агресивніше)
- Замість одного "TFSA_GUIDE" — динамічний вибір (на кожному пості різний lead magnet відповідний темі)
