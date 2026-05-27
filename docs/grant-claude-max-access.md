# 🔑 Grant Claude максимальний доступ (тільки токени які потрібні)

> Один раз ~10 хв роботи → назавжди звільняєш себе від ручних кліків у Vercel/Supabase/etc.
> Я зможу: міняти env vars, тригерити деплої, читати логи, дивитись deployments, мігрувати DB, налаштовувати Auth config.

---

## 📊 Що отримуємо за кожен токен (ROI)

| Токен | Що я тепер можу робити сам | Без нього треба |
|-------|----------------------------|-----------------|
| **Vercel PAT** ⭐⭐⭐ | Додавати/змінювати env vars, тригерити redeploy, читати build logs, перевіряти статус deployment, отримати domain config | Ти клікаєш у dashboard 5-10 разів |
| **Supabase Management Token** ⭐⭐⭐ | Змінювати auth config (redirect URLs, Site URL, SMTP), запускати SQL migrations, читати logs, керувати users | Ти paste-ив SQL в Studio + клацав auth config |
| **GitHub Fine-grained PAT** ⭐⭐ | Створювати releases, керувати secrets (Actions), читати CI logs, відкривати PR programmatically | Зараз `git push` працює — це достатньо для більшості |
| **Cloudflare API token** ⭐ (якщо DNS там) | Додавати DNS records (DKIM, MX, SPF), без чекання DNS пропагації | Ти руками у DNS panel |

Рекомендую почати з **топ-2 (Vercel + Supabase)** — їх найчастіше торкаємось.

---

# 🟦 ТОКЕН 1 — Vercel Personal Access Token (~3 хв)

## Що відкривається

- `vercel env add/rm BREVO_WELCOME_TPLID_UK 1` — додаю env vars напряму
- `vercel deploy --prod` — тригерю production deployment
- `vercel logs` — читаю прод-логи (debug live issues)
- `vercel domains ls` — перевіряю DNS статус
- `vercel ls` — список deployments

## Як створити (3 кліки)

**Прямий лінк** → https://vercel.com/account/tokens

1. **Token Name**: `claude-code-skyfort` (щоб ти потім впізнав)
2. **Scope**: обери `Full Account` (або щонайменше — твоя personal account)
3. **Expiration**: 
   - Найбезпечніше: **90 days** (доведеться оновлювати щокварталу)
   - Простіше: **No expiration** (живе вічно, можна revoke в будь-який момент)
4. Натисни **Create Token**

⚠️ **ВАЖЛИВО**: Vercel покаже токен **тільки один раз**. Скопіюй одразу!

Виглядає так: `XXxxXXxxXXxxXXxxXXxxXX12` (24 знаки приблизно).

## Куди вставити

Відкрий `.env.local` (або скажи мені — я зроблю):

```
VERCEL_TOKEN=XXxxXXxxXXxxXXxxXXxxXX12
VERCEL_PROJECT_ID=prj_xxxxxxxxxxxx
VERCEL_ORG_ID=team_xxxxxxxxxxxxxxxxx
```

Project ID + Org ID знайди тут:
👉 https://vercel.com/andriis-projects/skyfort-website/settings

→ внизу сторінки секція **Project ID** і **Team ID** (якщо є team). Скопіюй обидва.

---

# 🟩 ТОКЕН 2 — Supabase Personal Access Token (~3 хв)

## Що відкривається

- Запуск SQL migrations без paste-у в Studio
- Зміна Auth config (redirect URLs, Site URL, SMTP settings) — як ми робили вручну
- Створення users programmatically
- Storage bucket management
- Database backups, RLS policies

## Як створити

**Прямий лінк** → https://supabase.com/dashboard/account/tokens

1. Натисни **Generate new token**
2. **Name**: `claude-code-skyfort`
3. Натисни **Generate token**

⚠️ Token показується тільки раз. Скопіюй одразу. Виглядає `sbp_xxxxxxxxxxxx...`.

## Куди вставити

```
SUPABASE_ACCESS_TOKEN=sbp_xxxxxxxxxxxx...
SUPABASE_PROJECT_REF=frhitqmsmqybggcmowag
```

> Project ref у нас вже відомий — `frhitqmsmqybggcmowag` (з URL твого Supabase проекту).

---

# 🟧 ТОКЕН 3 (опц.) — GitHub Fine-grained PAT

## Що відкривається

- Створювати releases (tag, release notes)
- Керувати GitHub Actions secrets (якщо ми додамо CI)
- Читати CI/Actions runs status
- Створювати/мерджити PR programmatically
- Repo settings (branch protection, etc.)

## Як створити

**Прямий лінк** → https://github.com/settings/personal-access-tokens/new

1. **Token name**: `claude-code-skyfort`
2. **Expiration**: 90 days (або custom)
3. **Repository access**: 
   - **Only select repositories** → обери `andriushchenkopartners-star/skyfort-website`
4. **Permissions** (під Repository permissions):
   - `Contents`: **Read and write**
   - `Pull requests`: **Read and write**
   - `Issues`: **Read and write**
   - `Actions`: **Read and write** (якщо плануємо CI)
   - `Workflows`: **Read and write** (якщо плануємо CI)
   - `Secrets`: **Read and write** (якщо плануємо CI)
   - Решту залиш як `No access`
5. **Generate token**

Виглядає `github_pat_11AXX...`.

## Куди вставити

```
GITHUB_TOKEN=github_pat_11AXX...
GITHUB_REPO=andriushchenkopartners-star/skyfort-website
```

---

# 🟪 ТОКЕН 4 (опц.) — Cloudflare API Token

> **Skip якщо твій DNS не на Cloudflare** (твій домен на Namecheap → DNS може бути там, тоді цей токен не потрібен).

## Як створити

Cloudflare → Profile → API Tokens → **Create Token**.

Template: **Edit zone DNS** для зони `sky-fort.ca`.

```
CLOUDFLARE_API_TOKEN=xxxxxxxxxxxx
CLOUDFLARE_ZONE_ID=xxxxxxxxxxxx
```

---

# 🟫 ТОКЕН 5 (опц.) — Brevo API key (вже маємо ✅)

`BREVO_API_KEY` вже у `.env.local` — це повноцінний токен з permissions create-template, send-email, manage-contacts. Більше нічого не треба.

---

# 🎯 Як зробити це найшвидше

## Опція A — Зроби всі 3 (Vercel + Supabase + GitHub) за раз (~10 хв)

1. Відкрий 3 вкладки:
   - https://vercel.com/account/tokens
   - https://supabase.com/dashboard/account/tokens
   - https://github.com/settings/personal-access-tokens/new
2. Швидко створи кожен з вищеописаних settings
3. Скопіюй у текстовий редактор як block:
   ```
   VERCEL_TOKEN=...
   VERCEL_PROJECT_ID=...
   VERCEL_ORG_ID=...
   SUPABASE_ACCESS_TOKEN=...
   SUPABASE_PROJECT_REF=frhitqmsmqybggcmowag
   GITHUB_TOKEN=...
   GITHUB_REPO=andriushchenkopartners-star/skyfort-website
   ```
4. Пасти весь block в чат — я додам у `.env.local`
5. Готово

## Опція B — Тільки top-2 (Vercel + Supabase) — мінімум для maximum impact

Якщо часу нема — створи тільки **Vercel** і **Supabase**. GitHub я завжди можу через `git push`.

```
VERCEL_TOKEN=...
VERCEL_PROJECT_ID=...
VERCEL_ORG_ID=...
SUPABASE_ACCESS_TOKEN=...
SUPABASE_PROJECT_REF=frhitqmsmqybggcmowag
```

5 рядків. Скопіюй у чат → готово.

---

# 🔒 Безпека — що я роблю / не роблю з цими токенами

## Що я завжди роблю
- ✅ Зберігаю токени **тільки в `.env.local`** (gitignored — НІКОЛИ не комічу)
- ✅ Не використовую їх для нічого крім explicit твоїх задач
- ✅ Перед destructive операціями (видалити deployment, видалити DB row) — **завжди питаю** "go?"
- ✅ Логую всі операції у git commit message, щоб ти бачив що зроблено

## Що я ніколи не роблю
- ❌ Не комічу токени в git
- ❌ Не передаю токени стороннім (third-party APIs крім тих що позначив)
- ❌ Не запускаю destructive операції (drop table, force push --force на main, delete project) без явного підтвердження
- ❌ Не створюю public resources які можуть leak data (public buckets, world-readable env vars)

## Як **ти** контролюєш ризик
- **Revoke токенів** в один клік на сторінках де ти їх створив
- **Expiration**: рекомендую 90 days — якщо забудеш revoke, вони самі помруть
- **Audit logs**: Vercel/Supabase/GitHub показують останнє використання токена — побачиш якщо щось дивне

---

# 🤔 Що з паролями? Login/password?

**Ніколи не давай мені свої login/password** (від Brevo, Vercel, Supabase, Gmail). PAT — це окремий обмежений токен з audit trail. Якщо щось піде не так — revoke у 1 клік без зміни паролю.

---

# ✅ Готово

Як створиш токени — паси їх у чат однією копією (або окремо). Я:
1. Перевірю формат
2. Додам у `.env.local`
3. Зроблю smoke test (request до API кожного)
4. Закомічу `.gitignore` правило якщо потрібно (вже є — `.env*` ігнорується)

Після цього на наступних задачах я роблю Vercel/Supabase операції **без твоєї участі**.
