# 🚀 Portal Phase 0 — Andrii's checklist

> ~15 хвилин роботи в Supabase Studio + Vercel. Після цього я можу починати Phase 1 (auth).

---

## ✅ Що ти маєш зробити

### 1️⃣ Запусти 3 SQL міграції в Supabase

1. Відкрий https://supabase.com → залогінся → проект **frhitqmsmqybggcmowag**
2. У лівому меню клікни **SQL Editor** (іконка зі стрілкою `>`)
3. Натисни **+ New query** (зверху справа)

**Перший запит** — створення таблиць:

- Відкрий локально файл [docs/sql/portal_schema.sql](docs/sql/portal_schema.sql)
- Скопіюй **весь** вміст → встав у SQL Editor
- Натисни **Run** (або `Cmd+Enter`)
- Внизу має з'явитись зелений `Success. No rows returned`

**Другий запит** — Row-Level Security:

- Натисни **+ New query**
- Відкрий [docs/sql/portal_rls.sql](docs/sql/portal_rls.sql)
- Скопіюй → встав → **Run**
- Має бути `Success`

**Третій запит** — Storage bucket для документів:

- Натисни **+ New query**
- Відкрий [docs/sql/portal_storage.sql](docs/sql/portal_storage.sql)
- Скопіюй → встав → **Run**
- Має бути `Success`

✅ **Як перевірити що все ОК**:
- Зліва клікни **Table Editor**
- Маєш побачити **7 нових таблиць**: `portal_clients`, `portal_accounts`, `portal_goals`, `portal_activity`, `portal_todos`, `portal_documents`, `portal_messages`
- Клікни **Storage** (теж зліва) → має бути bucket **portal-documents** (private)

---

### 2️⃣ Скопіюй ключі Supabase у `.env.local`

1. У Supabase, зліва клікни **Settings** (шестерня) → **API**
2. На сторінці є два важливі значення:
   - **Project URL** — щось типу `https://frhitqmsmqybggcmowag.supabase.co`
   - **anon public** — довгий рядок який починається з `eyJ...`

   ⚠️ **Не плутай з `service_role`** — той вже у Vercel, нам тут потрібен **anon**.

3. Відкрий файл `.env.local` у проекті (`/Users/aandriushchenko/Documents/skyfort-website/.env.local`)
4. Додай в кінець ці два рядки:

   ```
   NEXT_PUBLIC_SUPABASE_URL=https://frhitqmsmqybggcmowag.supabase.co
   NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJ.....(сюди вставляєш anon public)
   ```

5. Збережи файл

---

### 3️⃣ Додай ті ж змінні у Vercel (для production)

1. Зайди на https://vercel.com → проект **skyfort-website**
2. **Settings** → **Environment Variables**
3. Натисни **Add New**
4. Введи:
   - Name: `NEXT_PUBLIC_SUPABASE_URL`
   - Value: `https://frhitqmsmqybggcmowag.supabase.co`
   - Environments: ✅ Production ✅ Preview ✅ Development
   - **Save**
5. Знову **Add New**:
   - Name: `NEXT_PUBLIC_SUPABASE_ANON_KEY`
   - Value: (той самий `eyJ...` що в `.env.local`)
   - Environments: ✅ всі три
   - **Save**

---

### 4️⃣ Налаштуй Supabase Auth (magic link)

1. У Supabase → зліва **Authentication** → **Providers**
2. Знайди **Email** → клікни → перевір що:
   - ✅ **Enable Email provider** — увімкнено
   - ✅ **Enable Email confirmations** — увімкнено
   - ✅ **Enable magic links** — увімкнено
3. Зайди в **Authentication** → **URL Configuration**
4. Постав:
   - **Site URL**: `https://sky-fort.ca`
   - **Redirect URLs** (додай по черзі через **Add URL**):
     - `https://sky-fort.ca/uk/portal/callback`
     - `https://sky-fort.ca/ru/portal/callback`
     - `https://sky-fort.ca/en/portal/callback`
     - `http://localhost:3000/uk/portal/callback`
     - `http://localhost:3000/ru/portal/callback`
     - `http://localhost:3000/en/portal/callback`
5. **Save**

---

### 5️⃣ (Опціонально) Email template — пізніше у Phase 1

У Supabase **Authentication** → **Email Templates** → **Magic Link** є дефолтний template. Він робочий — англомовний. Локалізуємо у Phase 1, коли буде що тестувати.

---

## 🎯 Як зрозуміти що все готово

Скажи мені:
```
Phase 0 done — таблиці є, env vars додано, redirect URLs налаштовано.
```

І я починаю **Phase 1**: пишу login форму, magic link callback, auth guard middleware, onboarding wizard.

---

## ❌ Якщо щось пішло не так

- **SQL Error: "function gen_random_uuid does not exist"** → у Supabase Studio запусти: `create extension if not exists pgcrypto;` потім перезапусти `portal_schema.sql`
- **SQL Error: "permission denied for schema storage"** → це означає що ти не маєш owner-прав. Перевір що ти залогінений як власник проекту, не як collaborator
- **anon key не працює** → перевір що скопіював **anon public**, не **service_role**. Це різні ключі. Anon починається з `eyJ` і відносно короткий.
- **Будь-яка інша помилка** → скрін у чат

---

## 📝 Що змінилось у репо (Phase 0 commit)

```
docs/portal-plan.md                       — повний план розробки
docs/portal-phase-0-checklist.md          — цей файл

docs/sql/portal_schema.sql                — 7 таблиць + indexes + triggers
docs/sql/portal_rls.sql                   — Row-Level Security policies
docs/sql/portal_storage.sql               — Storage bucket для документів

app/_lib/portal/supabase.js               — browser/server/service client factories
app/_lib/portal/auth.js                   — getCurrentUser, requireUser, requireAdvisor
app/_lib/portal/constants.js              — design tokens + enum lists
app/_i18n/portal-dictionary.js            — UK/RU/EN strings для портала

.env.example                              — оновлено (Supabase vars)
package.json                              — додав @supabase/ssr
```

UI ще немає. Це foundation — фундамент під подальші фази.
