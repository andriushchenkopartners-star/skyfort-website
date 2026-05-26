# 🏠 SkyFort Client Portal — План розробки

> **Статус**: draft v1 · 2026-05-26
> **Власник**: Andrii Andriushchenko · CCO Axcess Capital approved · 2026-05
> **Базується на**: Claude.ai artifact "SkyFort Portal" → `/tmp/skyfort-portal/`

---

## 🎯 TL;DR

Client portal — приватний дашборд для існуючих клієнтів Andrii (логін через magic link). Клієнт **сам вводить** свої баланси (TFSA/RRSP/FHSA/exempt market/real estate) → бачить прогрес до цілей → бронює зустрічі → читає документи. Andrii пушить йому todo-айтеми (re-verify KYC, sign Q3 statement) і повідомлення.

**Compliance філософія**: portal — це "personal financial dashboard for newcomers", **не** "official client statement". Клієнт володіє своїми даними, Andrii — advisor, який допомагає планувати.

**URL**: `sky-fort.ca/uk/portal/...`, `/ru/portal/...`, `/en/portal/...`

---

## ✅ Підтверджені рішення (з твого боку)

| # | Питання | Відповідь |
|---|---------|-----------|
| 1 | Де живе? | **A** — `sky-fort.ca/uk/portal/...` (в тому ж Next.js) |
| 2 | Auth? | **A** — Supabase Auth + magic link |
| 3 | Джерело $$$? | **D** — клієнт сам вводить (як YNAB) |
| 4 | Scope? | Все що треба для v1 (моя інтерпретація нижче) |
| 5 | Стиль? | **C** — Tailwind для layout, inline SVG для графіки |

## 🤖 Мої рішення (заперечиш якщо ні)

| # | Рішення | Чому |
|---|---------|------|
| 6 | **Invitation-only** (Andrii створює юзера руками в Supabase) | Менше abuse risk, простіше, без verification flow |
| 7 | **Не показувати назви exempt market фондів** у v1 | Менша compliance surface — лише сума і YTD% |
| 8 | **Квартальні reviews timeline → v2** | Out of scope для v1 |
| 9 | **Mobile-first responsive** | TikTok funnel = 60%+ mobile traffic |
| 10 | **Onboarding "split": ти заповнюєш баланси під час discovery call**, потім клієнт сам апдейтить | Знімає friction для клієнта, тримає тебе в loop |
| 11 | **Без real-time chat у v1** — асинхронні messages через Supabase + email notification | RTC потребує WebSocket setup, infrastructure-heavy |
| 12 | **Без document signing flow у v1** — лише upload/download | Signing = DocuSign/HelloSign integration, окремий проект |
| 13 | **Окремий `_components/portal/`** від існуючих компонентів сайту | Portal має іншу візуальну мову (dark mode, специфічна графіка) |
| 14 | **Скинути `tweaks-panel.jsx`** (530 рядків) | Це Claude artifact tooling, не для прод |

---

## 🏗️ Архітектура

### Routes

```
app/
  [locale]/
    portal/
      layout.js                  # auth guard + portal shell (sidebar + header)
      page.js                    # /portal → redirect /portal/overview
      overview/page.js
      accounts/page.js
      accounts/[id]/page.js      # account detail with holdings
      goals/page.js
      goals/[id]/page.js         # goal detail
      advisor/page.js
      documents/page.js
      onboarding/page.js         # first-time setup
      login/page.js              # magic link entry
      callback/page.js           # magic link callback
      logout/route.js            # POST endpoint

  api/
    portal/
      auth/route.js              # send magic link
      accounts/route.js          # CRUD accounts
      goals/route.js             # CRUD goals
      activity/route.js          # GET/POST activity
      messages/route.js          # send/receive messages
      todos/route.js             # mark complete

  _components/
    portal/
      Btn.jsx                    # portal-styled button
      Card.jsx                   # portal card (rounded-18px, paper bg)
      Eyebrow.jsx                # small uppercase label
      SFMark.jsx                 # geometric logo
      SFLogotype.jsx             # logo + wordmark
      Sparkline.jsx              # SVG mini-chart
      GrowthChart.jsx            # 12mo portfolio vs benchmark
      AllocationRing.jsx         # donut chart
      BrandPanel.jsx             # decorative background panel
      PortalSidebar.jsx          # left nav (Overview/Accounts/Goals/Advisor/Documents)
      PortalHeader.jsx           # top bar with lang switcher, bell, book
      BookModal.jsx              # 30-min slot picker
      EmptyState.jsx             # "you haven't added accounts yet"
      DataTable.jsx              # generic table

  _lib/
    portal/
      supabase.js                # browser + server client factories
      auth.js                    # getCurrentUser, requireUser
      schema.js                  # zod schemas for validation
      types.js                   # JSDoc types

  _i18n/
    portal-dictionary.js         # NEW — portal-specific strings (extends main dictionary)
```

### Database (Supabase)

```sql
-- portal_clients: extends auth.users with portal-specific fields
create table portal_clients (
  user_id uuid primary key references auth.users(id) on delete cascade,
  full_name text not null,
  initials text not null,                  -- "AK" for sidebar avatar
  member_since timestamptz default now(),
  preferred_lang text default 'uk',
  jurisdictions text[] default '{Alberta}',  -- where they reside
  kyc_last_verified date,
  onboarding_completed_at timestamptz,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

-- portal_accounts: client's tax-sheltered + investment accounts
create table portal_accounts (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  type text not null check (type in ('tfsa','rrsp','fhsa','exempt','re','other')),
  display_name text,                       -- "TFSA at RBC"
  balance numeric(14,2) not null default 0,
  ytd_pct numeric(5,2),                    -- 9.4 → +9.40%
  ytd_contrib numeric(14,2) default 0,
  contribution_room numeric(14,2),         -- null for exempt/re
  holdings_count integer default 0,
  notes text,
  updated_at timestamptz default now(),
  created_at timestamptz default now()
);

-- portal_goals: client's financial goals
create table portal_goals (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  key text not null,                       -- 'house', 'retire', 'emergency', 'custom'
  title text not null,
  saved numeric(14,2) default 0,
  target numeric(14,2) not null,
  monthly numeric(14,2),
  eta text,                                -- "2028 Q1" — display-only
  status text default 'on_track' check (status in ('ahead','on_track','behind')),
  by_pct numeric(5,2),                     -- ahead/behind by X%
  linked_account_ids uuid[],
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

-- portal_activity: transactions log (client enters)
create table portal_activity (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  account_id uuid references portal_accounts(id) on delete set null,
  occurred_on date not null,
  kind text not null check (kind in ('dep','div','purchase','sale','fx','fee','other')),
  note text,
  amount numeric(14,2) not null,           -- signed: +deposit, -withdrawal
  created_at timestamptz default now()
);

-- portal_todos: action items Andrii pushes to client
create table portal_todos (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  title text not null,
  body text,
  category text,                           -- 'kyc', 'fhsa', 'rrsp', 'general'
  status text default 'open' check (status in ('open','done','dismissed')),
  due_on date,
  created_by text default 'advisor',       -- 'advisor' or 'system'
  created_at timestamptz default now(),
  completed_at timestamptz
);

-- portal_documents: PDFs in client vault
create table portal_documents (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  title text not null,
  category text,                           -- 'kyc', 'statement', 'tax', 'agreement'
  file_path text not null,                 -- Supabase Storage path
  file_size_bytes integer,
  uploaded_by text default 'advisor',
  visible boolean default true,
  uploaded_at timestamptz default now()
);

-- portal_messages: async messages between client and advisor
create table portal_messages (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  from_role text not null check (from_role in ('client','advisor')),
  body text not null,
  read_at timestamptz,
  created_at timestamptz default now()
);

-- RLS: every table — users can only see their own rows
-- (Andrii uses service_role key for admin operations)
alter table portal_clients enable row level security;
alter table portal_accounts enable row level security;
alter table portal_goals enable row level security;
alter table portal_activity enable row level security;
alter table portal_todos enable row level security;
alter table portal_documents enable row level security;
alter table portal_messages enable row level security;

create policy "users see own" on portal_clients for all using (auth.uid() = user_id);
create policy "users see own" on portal_accounts for all using (auth.uid() = user_id);
create policy "users see own" on portal_goals for all using (auth.uid() = user_id);
create policy "users see own" on portal_activity for all using (auth.uid() = user_id);
create policy "users see own" on portal_todos for all using (auth.uid() = user_id);
create policy "users see own" on portal_documents for all using (auth.uid() = user_id);
create policy "users see own" on portal_messages for all using (auth.uid() = user_id);
```

### Auth flow

```
1. Andrii → Supabase Studio → Authentication → Add user (email)
   Supabase надсилає invitation email
   
2. Клієнт → клікає invitation → налаштовує password (АБО magic link одразу)

3. Клієнт → /uk/portal/login → вводить email → "Send magic link"
   → Supabase Auth → надсилає email
   
4. Клієнт → клікає лінк → /uk/portal/callback?token=...
   → ставить session cookie → redirect /uk/portal/overview

5. /uk/portal/layout.js → middleware перевіряє session
   → якщо немає → redirect /uk/portal/login
   → якщо `onboarding_completed_at IS NULL` → redirect /uk/portal/onboarding

6. На кожному API call:
   - Server: створює Supabase client з cookies → перевіряє session
   - RLS гарантує що клієнт бачить лише свої дані
```

### Env vars (нові)

```bash
# .env.local (потрібно додати):
NEXT_PUBLIC_SUPABASE_URL=https://frhitqmsmqybggcmowag.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJh...     # ANON key, не service_role

# Vercel production: ті самі + вже існуючий SUPABASE_SERVICE_ROLE_KEY для admin operations
```

---

## 📋 Фази розробки

### Phase 0 — Foundation (~1 година)

**Що я роблю:**
- Створюю `docs/sql/portal_*.sql` (7 файлів — по одному на таблицю + RLS)
- Створюю `_lib/portal/supabase.js` (browser + server client factories)
- Створюю `_lib/portal/auth.js` (getCurrentUser, requireUser helpers)
- Оновлюю `package.json`: додаю `@supabase/supabase-js` + `@supabase/ssr`
- Створюю `_i18n/portal-dictionary.js` (з артефакту, всі EN/RU/UK строки)

**Що робиш ти:**
1. Заходиш у Supabase Studio (https://supabase.com)
2. Project `frhitqmsmqybggcmowag` → **SQL Editor** → запускаєш кожен SQL з `docs/sql/portal_*.sql` по черзі
3. Settings → API → копіюєш **anon public** key → додаєш у `.env.local`:
   ```
   NEXT_PUBLIC_SUPABASE_URL=https://frhitqmsmqybggcmowag.supabase.co
   NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJ...
   ```
4. У Vercel Dashboard → Settings → Environment Variables → додаєш ті ж дві змінні
5. Authentication → Email templates → налаштовуєш magic link template (брендований)

---

### Phase 1 — Auth & Onboarding (~3 години)

**Що я роблю:**
- `/uk/portal/login/page.js` — magic link form
- `/uk/portal/callback/page.js` — token exchange
- `/uk/portal/logout/route.js` — clear session
- `/uk/portal/layout.js` — auth guard + portal shell (sidebar + header з артефакту)
- `/uk/portal/onboarding/page.js` — wizard: 1) ваші дані 2) додайте перший рахунок 3) додайте першу ціль
- `_components/portal/PortalSidebar.jsx`
- `_components/portal/PortalHeader.jsx`

**Що робиш ти:**
1. Створюєш собі тестового юзера в Supabase Studio (свій email)
2. Клікаєш magic link → тестуєш onboarding flow
3. Скажеш мені де friction — фіксимо

---

### Phase 2 — Core UI components (~3 години)

**Що я роблю (паралельно з Phase 3):**

Конвертую з артефакту в `_components/portal/`:
- `Btn.jsx` — 5 variants (primary/ink/ghost/paper/blank), 3 sizes
- `Card.jsx` — base card (rounded-18px, paper bg, dark variant)
- `Eyebrow.jsx` — uppercase small label
- `SFMark.jsx` — геометричний logo
- `SFLogotype.jsx` — logo + wordmark
- `Sparkline.jsx` — SVG mini-chart
- `GrowthChart.jsx` — 12mo portfolio vs benchmark
- `AllocationRing.jsx` — donut chart
- `BrandPanel.jsx` — декоративний фон
- Icons in `_components/portal/icons.jsx`

Стиль: layout (display, grid, gap, padding) через Tailwind. Складна графіка (SVG) — inline.

**Що робиш ти**: нічого, чекаєш Phase 3.

---

### Phase 3 — 5 screens (~6 годин)

**Що я роблю:**

| Екран | Що показує | Mock data → реальність |
|-------|-----------|------------------------|
| **Overview** | Total net worth, 12mo chart, accounts grid, goals progress, advisor card, todos | Реальні з Supabase |
| **Accounts** | Список з YTD%, contribution room, drill-down: holdings + activity | Реальні з Supabase |
| **Goals** | Прогрес-бари, ETA, status (ahead/on_track/behind) | Реальні з Supabase |
| **Advisor** | Профіль Andrii (NRD), календар, last messages, book CTA | NRD #4575551, hard-coded |
| **Documents** | Список PDF, download, upload (clients can also upload) | Supabase Storage |

**Що робиш ти**: тестуєш кожен екран → feedback.

---

### Phase 4 — Andrii admin tools (~3 години)

**Що я роблю:**
- `/uk/admin/portal/page.js` — список клієнтів (gated по email = `andrii@sky-fort.ca`)
- `/uk/admin/portal/[user_id]/page.js` — view client → push todo, send message, upload document
- Без CRUD на portfolio amounts (це зона клієнта)

**Що робиш ти**: invite перших 2-3 тест-клієнтів → дивишся як ти ними керуєш.

---

### Phase 5 — Polish & compliance (~2 години)

**Що я роблю:**
- EMD disclaimer footer на кожній портал-сторінці
- Privacy policy update (PIPEDA — Personal Information Protection)
- "This is not an official statement" copy у Overview/Accounts
- Mobile breakpoints (sidebar → bottom nav на <768px)
- A11y audit (ARIA labels, keyboard nav)
- Test на ноутбуці + iPhone

**Що робиш ти**: фінальний reviewn, узгоджуєш з CCO якщо щось changed.

---

### Phase 6 — Email notifications (~2 години, опціонально v1)

**Що я роблю:**
- Trigger через Brevo: коли Andrii push todo → клієнт отримує email
- Trigger коли клієнт надсилає message → ти отримуєш email
- Reminder: якщо balance не оновлювався >30 днів → "оновіть свої баланси?"

---

### Загальний час: ~20 годин роботи

При 2-3 годинах на день → **2 тижні**.

---

## 🚫 Що НЕ робимо у v1

| Feature | Чому defer |
|---------|------------|
| Real-time чат через WebSocket | Тригерить infrastructure-heavy setup. Async messages OK |
| Document e-signing (DocuSign/HelloSign) | Окремий проект |
| Bulk CSV import балансів | Можна руками вводити, v1 |
| Specific exempt market fund names ("Northwood credit fund") | Compliance — більше surface area |
| Push notifications (web push) | Email достатньо |
| Multi-account login (joint accounts) | Складно з RLS, v2 |
| Audit log / activity timeline для Andrii | v2 |
| Quarterly review meeting notes | v2 |
| AI insights ("ти можеш заощадити X в податках") | v3 |
| Integration з Plaid / Wealthsimple API | v3, очікує permissions |

---

## ⚠️ Compliance checklist (перед launch)

- [ ] CCO Axcess Capital підтвердив **в письмовому вигляді** скоп porталу
- [ ] EMD disclaimer на кожній сторінці портала
- [ ] "Not an official statement" copy на Overview і Accounts
- [ ] Privacy policy оновлено (PIPEDA, data residency)
- [ ] Terms of Service для портала (як використовувати, обмеження)
- [ ] Cookie banner (якщо ще не існує)
- [ ] DPA з Supabase (Data Processing Agreement) — vendor risk assessment
- [ ] Encryption at rest verified (Supabase default ON, але документувати)
- [ ] Audit log: всі login attempts, balance changes (Supabase auto-logs)
- [ ] Right to be forgotten: implement delete-my-account flow
- [ ] Data export: користувач може запросити свої дані (PIPEDA вимога)

---

## 🎨 Дизайн tokens

Артефакт використовує власні CSS variables. Треба змержити з існуючими в `globals.css`:

| Artifact var | Існує в `globals.css`? | Дія |
|--------------|------------------------|-----|
| `--sf-blue: #2D73E3` | ✅ як `--color-brand` | Reuse `--color-brand` |
| `--sf-blue-ink: #1956c4` | ❌ | Додати як `--color-brand-ink` |
| `--sf-blue-soft: #e8f0fd` | ❌ | Додати як `--color-brand-soft` |
| `--sf-ink: #0b0d10` | ✅ як `--color-ink` | Reuse |
| `--sf-paper: #f6f4ef` | ❌ | Додати — це новий "paper" tone для портала |
| `--sf-positive: #1f8a5b` | ❌ | Додати — для +YTD |
| `--sf-negative: #c34a3a` | ❌ | Додати — для -YTD |
| `--sf-warn: #b7791f` | ❌ | Додати — для exempt market accent |

Шрифти: артефакт використовує **Inter Tight + JetBrains Mono**. Проект — **Manrope**. Рішення: portal використовує власні (більш technical look), site залишає Manrope. Додаю обидва шрифти в `app/[locale]/portal/layout.js`.

---

## 📁 Перші файли які я створю (Phase 0 commit)

```
docs/sql/portal_clients.sql
docs/sql/portal_accounts.sql
docs/sql/portal_goals.sql
docs/sql/portal_activity.sql
docs/sql/portal_todos.sql
docs/sql/portal_documents.sql
docs/sql/portal_messages.sql
docs/sql/portal_rls.sql

app/_lib/portal/supabase.js
app/_lib/portal/auth.js
app/_i18n/portal-dictionary.js

package.json (added @supabase/supabase-js, @supabase/ssr)
.env.example (template for env vars)
```

**Жодних UI файлів у Phase 0** — це тільки foundation.

---

## 🚀 Як стартуємо

1. **Ти дивишся цей план** → даєш `go` або правки
2. **Я роблю Phase 0** (commit + push, але без deploy bo нічого не показує)
3. **Ти запускаєш SQL у Supabase Studio** (за моєю інструкцією)
4. **Я роблю Phase 1** → ти тестуєш auth flow
5. ... і так далі по фазах

Кожна фаза = 1 commit. Кожна фаза = build verify перед commit.

---

## 📞 Перші 3 питання які треба прояснити

Поки ти читаєш — подумай:

1. **Скільки клієнтів у тебе зараз?** (1, 5, 20, 50?) — впливає на UI: list view vs search vs pagination в admin
2. **Чи хочеш бачити їх дані на головному дашборді admin?** Чи лише per-user view? (privacy vs convenience)
3. **Чи маєш зараз "welcome book" / onboarding PDF** який треба автоматично завантажувати у `portal_documents` нових клієнтів? Якщо так — який path до файлу?

---

**EOF — план v1**
