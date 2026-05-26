# Завтрашні наступні дії

> Останнє оновлення: 2026-05-25 (після audit).

## ⏳ Що зробити завтра (твоя частина — короткі дії)

### 1. Створити таблицю topic_requests у Supabase (2 хв)

Це треба щоб форма "Запропонуй тему" на блозі реально зберігала пропозиції.

1. Supabase → SQL Editor → **New query**
2. Скопіюй усе з `docs/sql/topic_requests.sql` → вклади → **Run**
3. Має написати "Success".

**Без цього** форма буде показувати "Дякую!" але запис до бази не дійде.

### 2. Перевірити що consultations таблиця створена (1 хв)

Це для `/consult.html` discovery-tool.
- Supabase → Table Editor → шукай таблицю **consultations**
- Якщо є — все ОК
- Якщо НЕМАЄ — Supabase → SQL Editor → New query → скопіюй `docs/sql/consultations.sql` → Run

### 3. Налаштувати consult.html (3 хв)

Один раз на цьому браузері:
1. Відкрий `https://sky-fort.ca/consult.html`
2. Прокрути до Кроку 9 (Підсумок) → блок **⚙ Налаштування CRM**
3. Введи:
   - **Endpoint**: `https://sky-fort.ca/api/consultation`
   - **API ключ**: твій `CONSULTATION_API_KEY` (з Vercel env vars)
4. **Зберегти налаштування** → буде в browser localStorage назавжди.
5. Fake-тест: заповни 1-2 кроки → "Зберегти в CRM" → перевір у Supabase Table Editor `consultations`.

---

## 🎯 Наступні 2 пріоритети (мої роботи на твою команду)

### A. Email-форма з Brevo (~45 хв)
**Зараз**: TikTok трафік приходить → читає → іде. Email не збирається.
**Після A**: Кожен заходить на /uk або /uk/tt → форма "Завантаж TFSA-гайд за email" → автоматично у Brevo nurture-серії.

**Що зробити мені**: API endpoint /api/email-subscribe → форма на /uk + /uk/tt → 7-денна welcome серія в Brevo (templates).

**Що зробити тобі** (~5 хв):
- Створити Brevo contact list "SkyFort Subscribers UK"
- Підтвердити sender email (`andrii@sky-fort.ca`)
- Опціонально: додати domain authentication (DNS records у sky-fort.ca провайдера) — це для кращої доставки

### B. Service × City pages (~60 хв)
**Зараз**: користувач шукає "TFSA для українців в Едмонтоні" → нічого не знаходить.
**Після B**: 24 SEO-сторінки (4 послуги × 6 міст) — long-tail traffic через 3-6 місяців.

**Що зробити мені**: один шаблон + програмні URL `/uk/services/<service>/<city>`, унікальний контент на кожній (~500 слів кожна).

**Що зробити тобі**: нічого (це чиста моя робота).

---

## 📊 Що вже працює (станом на 2026-05-25)

- ✅ **GA4** (`G-WXBYXY30T7`) — на проді і локально
- ✅ **Microsoft Clarity** (`wwfjidrqmv`) — на проді і локально
- ✅ **Brevo** — API key у `.env.local` і Vercel (готовий для form-у)
- ✅ **i18n routing** — `/uk`, `/ru`, `/en` з hreflang
- ✅ **5 пілярних статей** у блозі (TFSA, RRSP vs TFSA, FHSA, як перевірити радника, exempt market Calgary)
- ✅ **Topic suggestion форма** — на /uk/blog і на кожному пості
- ✅ **RSS feed** (`/blog/rss.xml`)
- ✅ **TikTok handle** `@andrii.wealthcanada` — у footer + на /uk/tt
- ✅ **WhatsApp кнопка** — внизу справа на всіх сторінках
- ✅ **Service + HowTo + FAQ + Article + LocalBusiness + BreadcrumbList** JSON-LD
- ✅ **Dynamic recharts** (~80KB savings на калькуляторах)
- ✅ **TrustBar** під hero (NRD link + firm)
- ✅ **Consultation tool** (`/consult.html` + `/api/consultation` + Supabase `consultations`)
- ✅ **Topic suggestion** (форма + `/api/topic-request` + Supabase `topic_requests`)

## 🔍 Знайдено в audit і виправлено

- ✅ NRD URL `aretrieval.securities-administrators.ca` (не існує!) → замінено на справжній `info.securities-administrators.ca/nrsmobile/...` у 7 файлах
- ✅ `consultations.sql` скопійовано з Downloads/ у проект (`docs/sql/`)
- ✅ Цей checklist оновлено (раніше посилався на застарілі задачі)

## 📋 Що залишається на майбутнє (низький пріоритет)

- ⏳ Ще 3 пілярні статті (RESP, перша іпотека Калгарі, перший рік чек-ліст)
- ⏳ Testimonials + Review schema (потребує 5+ відгуків клієнтів)
- ⏳ Google Business Profile (треба зробити самостійно — google.com/business)
- ⏳ Переклад топ-статей на ru/en (коли UK почне рейтити)
- ⏳ TypeScript міграція (опційно — Phase 5)
