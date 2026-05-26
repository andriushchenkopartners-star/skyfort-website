# Consultation script — як налаштувати

Цей інструмент — для тебе особисто на discovery-дзвінках. Збирає дані за 9 кроків (KYC + Suitability), рахує net worth, класифікує інвестора (Accredited/Eligible/Non-Eligible), синкає у Supabase, лінкує з існуючим `/resources` лідом по email.

## Що зроблено в коді (готово)

- ✅ API endpoint: `app/api/consultation/route.js`
- ✅ HTML tool: `public/consult.html` (доступний за `sky-fort.ca/consult.html`)
- ✅ Захист від індексації: `<meta name="robots" content="noindex">` + `robots.txt` Disallow
- ✅ Proxy pass-through: `/consult.html` обходить i18n redirect
- ✅ Існуючий `/api/lead` НЕ зачеплено

## Що залишилось зробити (ти, ~10 хв)

### 1. Vercel env vars (3 змінні)

`Vercel → Settings → Environment Variables → Add new` для кожної:

| Key | Value |
|---|---|
| `SUPABASE_URL` | `https://frhitqmsmqybggcmowag.supabase.co` (можна пропустити якщо `NEXT_PUBLIC_SUPABASE_URL` уже є — код знає про fallback) |
| `SUPABASE_SERVICE_ROLE_KEY` | service_role JWT з Supabase → Settings → API → Legacy keys → Reveal |
| `CONSULTATION_API_KEY` | `sk_consult_7M9pQ2wL5xR8nV3kT6jH4yC1bF0aZ9eU3iD8gK5oN2sW7rB` (або будь-яка довга строка) |

⚠️ Environments — галки на Production, Preview, Development для усіх 3.
⚠️ Sensitive — галки **увімкнути** на `SUPABASE_SERVICE_ROLE_KEY` і `CONSULTATION_API_KEY`.

### 2. Redeploy

Vercel → Deployments → топ → "..." → Redeploy → зняти "Use existing Build Cache" → Redeploy → жди "Ready".

### 3. Налаштувати tool один раз

1. Відкрий `https://sky-fort.ca/consult.html` у Safari/Chrome.
2. Скрол вниз до **"Підсумок"** (Крок 9 / 9) — натисни через rail зліва або через "Далі".
3. Знайди блок **"⚙ Налаштування CRM"** (за замовч. розгорнутий бо порожнє).
4. Введи:
   - **Endpoint**: `https://sky-fort.ca/api/consultation`
   - **API ключ**: той же `CONSULTATION_API_KEY` що в Vercel
5. Натисни **"Зберегти налаштування"** — буде в localStorage цього браузера назавжди.

### 4. Перший тест

1. Іди на Крок 1 (Старт) → введи свій email, ім'я, дату.
2. Заповни решту кроків (можна швидко chips клікати — це тест).
3. На Кроці 9 → **"☁ Зберегти в CRM"** → має з'явитись зелене **"Збережено в CRM ✓"**.
4. Перевір у Supabase → Table Editor → `consultations` → побачиш свій запис.

## Як використовувати на дзвінках

- Перед дзвінком: відкрий `sky-fort.ca/consult.html` → "↺ Новий клієнт" (внизу Кроку 9) щоб почати з чистого.
- Під час дзвінка: rail зліва (Старт → Контекст → Snapshot → Цілі → Класифікація → Suitability → На дзвінку → Скоринг → Підсумок).
- Кожне поле сейвиться в localStorage негайно — браузер закриєш, повернешся, продовжиш.
- В кінці: **"☁ Зберегти в CRM"** → запис летить у Supabase + лінкується з лідом по email.
- Бонус: **"📋 Копіювати summary"** дає текстовий summary для копіювання в email клієнту, **"⬇ JSON"** — повний дамп для архіву.

## Безпека

- `consult.html` має `noindex` + `Disallow` в robots → Google не індексує.
- URL все одно публічний — якщо хтось дізнається `sky-fort.ca/consult.html`, відкриє порожній tool. Не критично — дані тільки в твоєму browser localStorage та Supabase.
- API endpoint `/api/consultation` захищений `x-skyfort-key` header — без ключа = 401.
- `SUPABASE_SERVICE_ROLE_KEY` — секрет god-mode. Тільки server-side, ніколи в браузер.

## Структура таблиці consultations (Supabase)

Уже створена через `supabase_consultations.sql`. Колонки:
- `id` (uuid, auto) · `created_at` (timestamptz, auto)
- `lead_id` (text) — лінк до `leads.id` по email, best-effort
- `name`, `email`, `phone`, `lang`, `source`, `magnet`
- `province`, `family`, `occupation`
- `income_self`, `income_spouse`, `net_worth`, `financial_assets`
- `investor_class` (Accredited / Eligible / Non-Eligible)
- `goals` (text[]), `timeline`, `monthly_save`, `pain`
- `experience`, `risk`, `horizon`, `liquidity`, `suit_notes`
- `temperature`, `next_step`, `followup_date`, `objections`, `notes`
- `call_date`, `raw` (jsonb — повний знімок форми)

## Корисні SQL запити (Supabase → SQL Editor)

```sql
-- Всі hot leads, найновіші зверху
select name, email, temperature, next_step, followup_date, investor_class
from consultations
where temperature like '%Hot%'
order by created_at desc;

-- Follow-ups на цей тиждень
select name, email, followup_date, next_step
from consultations
where followup_date between current_date and current_date + 7
order by followup_date;

-- Конверсія по джерелах
select source, count(*) as total,
  count(*) filter (where temperature like '%Hot%') as hot,
  count(*) filter (where investor_class = 'Eligible') as eligible
from consultations
group by source
order by total desc;

-- Зв'язок з лідами (хто з /resources перейшов у consultation)
select c.name, c.email, c.created_at as consult_at, c.lead_id
from consultations c
where c.lead_id is not null
order by c.created_at desc;
```

## Якщо щось зламалось

- **Tool відкривається але "Збережено в CRM" не з'являється** → перевір налаштування endpoint+API key в самому tool (Крок 9 → ⚙).
- **Помилка `unauthorized`** → API key в tool ≠ Vercel env var. Зробити однаковим.
- **Помилка `supabase not configured`** → у Vercel немає `SUPABASE_URL` (або `NEXT_PUBLIC_SUPABASE_URL`) чи `SUPABASE_SERVICE_ROLE_KEY`. Перевір env vars + redeploy.
- **Помилка `relation "consultations" does not exist`** → SQL не виконався. Запусти `supabase_consultations.sql` ще раз.
- **`lead_id` завжди `null`** → колонка email у `leads` зветься інакше (наприклад `user_email`). Зміни `LEADS_EMAIL_COLUMN` у `app/api/consultation/route.js`.
