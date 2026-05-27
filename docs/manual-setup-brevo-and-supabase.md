# ⚡ Copy-paste setup — Brevo + Supabase

> ✅ Brevo templates **вже створені автоматично** через API (UK=1, RU=2, EN=3).
> ✅ Локальний `.env.local` **вже оновлено**.
> ⏳ Залишилось 2 ручні кроки (~3 хв сумарно) — нижче.

---

# 🟦 Крок 1 — 3 env vars у Vercel (~2 хв)

**Прямий лінк** (відкрий у новій вкладці):

👉 https://vercel.com/andriis-projects/skyfort-website/settings/environment-variables

> Якщо лінк не спрацює (інший orgname) — Vercel Dashboard → проект **skyfort-website** → таб **Settings** → **Environment Variables**.

### Що робиш:

**Натисни кнопку "Add Another" або заповни форму вгорі тричі. Для кожного — copy/paste:**

#### Змінна 1
```
Key:    BREVO_WELCOME_TPLID_UK
Value:  1
```
Environments: ✅ Production ✅ Preview ✅ Development → **Save**

#### Змінна 2
```
Key:    BREVO_WELCOME_TPLID_RU
Value:  2
```
Environments: ✅ Production ✅ Preview ✅ Development → **Save**

#### Змінна 3
```
Key:    BREVO_WELCOME_TPLID_EN
Value:  3
```
Environments: ✅ Production ✅ Preview ✅ Development → **Save**

### Redeploy:

**Прямий лінк** на список deployments:

👉 https://vercel.com/andriis-projects/skyfort-website/deployments

Найвищий deployment → **⋯** (три крапки) → **Redeploy** → у modal-і **Redeploy**.

Чекати ~2 хв поки статус стане **Ready** ✅.

---

# 🟩 Крок 2 — 3 redirect URLs у Supabase (~1 хв)

**Прямий лінк**:

👉 https://supabase.com/dashboard/project/frhitqmsmqybggcmowag/auth/url-configuration

> Якщо не залогінений — попросить login → відкриється потрібна сторінка одразу.

### Що робиш:

1. **Перевір Site URL** — має бути:
   ```
   https://sky-fort.ca
   ```
   (БЕЗ `/uk` і БЕЗ `localhost`)

2. У секції **Redirect URLs** натисни **Add URL** і додай **по черзі ці 3** (copy/paste кожен в окремий запис):

```
http://localhost:3000/uk/portal/callback
```
```
http://localhost:3000/ru/portal/callback
```
```
http://localhost:3000/en/portal/callback
```

3. Внизу — **Save changes** → готово.

---

# ✅ Все

Як зробив — напиши `done`, продовжу Phase 3 портала.

---

## 📌 Що я зробив сам (FYI)

- ✅ Створив 3 templates у Brevo через API (`POST /v3/smtp/templates`)
  - SkyFort Welcome — UK → ID `1`
  - SkyFort Welcome — RU → ID `2`
  - SkyFort Welcome — EN → ID `3`
- ✅ Додав `BREVO_WELCOME_TPLID_{UK,RU,EN}` у твій `.env.local`
- ✅ Зберіг скрипт `scripts/create-brevo-templates.mjs` (якщо знадобиться пересоздати — `node scripts/create-brevo-templates.mjs` пропустить існуючі)

## ❓ Чому я не зробив Vercel + Supabase автоматично

| | Чому потрібен ти |
|---|------------------|
| **Vercel** | Потрібен Vercel CLI з твоїм login або Personal Access Token. Generating PAT — це окремий крок який ти все одно мав би зробити в UI |
| **Supabase Auth config** | Auth config змінюється тільки через Management API з PAT — той же barrier |

Якщо хочеш повністю автоматизовану майбутню роботу — створи раз Vercel + Supabase PATs у відповідних UI, додай у `.env.local`, і наступного разу я роблю все 100% сам. Скажи якщо хочеш — інструкція ~5 хв.
