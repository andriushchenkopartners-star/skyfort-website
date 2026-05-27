# 🛠️ Детальна інструкція — Brevo welcome emails + Supabase redirect URLs

> Дві задачі. Загалом ~20 хвилин якщо не загубишся. Йди строго по черзі — не стрибай між Task 1 і Task 2.

**Що тобі знадобиться**:
- 🔑 Логіни: Brevo, Supabase, Vercel (мати у браузері в окремих вкладках)
- 📄 Файл з HTML: `docs/brevo-welcome-templates.md` (відкрий його у VS Code / TextEdit як **другий моніторинг**)
- ☕ Кава

---

# 📧 TASK 1 — Welcome emails у Brevo (~15 хв)

## Підготовка — перевір sender email (1 хв)

Це треба зробити **один раз**. Якщо вже зробив раніше — skip і йди в "Створення templates".

| # | Що клікаєш | Що шукати |
|---|------------|-----------|
| 1 | Браузер → https://app.brevo.com → login | Дашборд Brevo |
| 2 | Зверху-справа клікни на свій аватар (кружок з ініціалами або фоткою) | Випадаюче меню |
| 3 | У меню — **Senders, Domains & Dedicated IPs** | Відкриється сторінка з табами |
| 4 | Перший таб — **Senders** | Список твоїх sender email-ів |
| 5 | Знайди рядок **andrii@sky-fort.ca** | — |

✅ **Якщо статус "Verified"** (зелений) — пропускай sender, переходь до "Створення templates".

❌ **Якщо немає або статус "Not verified"**:
1. Натисни **Add a sender** (зверху-справа)
2. From name: `Andrii Andriushchenko`
3. From email: `andrii@sky-fort.ca`
4. Натисни **Save**
5. Перевір пошту `andrii@sky-fort.ca` → буде лист від Brevo з кнопкою **Confirm**
6. Клікни **Confirm** → повертайся у Brevo, оновиш сторінку → статус має стати **Verified** ✅

---

## 1.1 — Створи **UK welcome template** (~4 хв)

### Крок 1 — Створи новий template

| # | Дія |
|---|-----|
| 1 | У Brevo, ліве меню → клікни **Campaigns** (іконка ракети) |
| 2 | У підменю — **Email Templates** |
| 3 | Зверху справа — велика синя кнопка **New template** → клікни |

Тебе перекине на сторінку налаштувань templates ("Setup"). Тут треба заповнити **5 полів**.

### Крок 2 — Заповни поля Setup

```
┌─────────────────────────────────────────────────────────┐
│ Template name (для тебе, не видно клієнтам)             │
│ ┌────────────────────────────────────────────────────┐  │
│ │  SkyFort Welcome — UK                              │  │
│ └────────────────────────────────────────────────────┘  │
│                                                         │
│ Subject line (тема листа)                               │
│ ┌────────────────────────────────────────────────────┐  │
│ │  Твій гайд TFSA — як обіцяно 👇                    │  │
│ └────────────────────────────────────────────────────┘  │
│                                                         │
│ Preview text (preheader у inbox)                        │
│ ┌────────────────────────────────────────────────────┐  │
│ │  8 типових помилок українців з TFSA + 20-річний... │  │
│ └────────────────────────────────────────────────────┘  │
│                                                         │
│ From name                                               │
│ ┌────────────────────────────────────────────────────┐  │
│ │  Andrii · SkyFort                                  │  │
│ └────────────────────────────────────────────────────┘  │
│                                                         │
│ From email                                              │
│ ┌────────────────────────────────────────────────────┐  │
│ │  andrii@sky-fort.ca  ← обери з dropdown            │  │
│ └────────────────────────────────────────────────────┘  │
└─────────────────────────────────────────────────────────┘
```

**Скопіюй точні значення** (з [docs/brevo-welcome-templates.md → UK Template](brevo-welcome-templates.md#-uk-template)):

| Поле | Значення |
|------|----------|
| Template name | `SkyFort Welcome — UK` |
| Subject line | `Твій гайд TFSA — як обіцяно 👇` |
| Preview text | `8 типових помилок українців з TFSA + 20-річний план. Без спаму, можеш відписатись будь-коли.` |
| From name | `Andrii · SkyFort` |
| From email | вибери з dropdown `andrii@sky-fort.ca` |

### Крок 3 — Натисни **Save & Design** (внизу справа)

Тебе перекине на drag & drop редактор. **НЕ ВИКОРИСТОВУЙ ЙОГО**. Натомість:

### Крок 4 — Переключись на Code Editor

```
┌─────────────────────────────────────────────────────────┐
│  ⚠️ Зверху справа в редакторі є переключач:             │
│                                                         │
│   [Drag & drop editor]  [Use code editor]               │
│                            ↑                            │
│                            КЛІКНИ СЮДИ                  │
└─────────────────────────────────────────────────────────┘
```

Якщо з'явиться попередження "You'll lose the current design" — підтверди, **OK**.

### Крок 5 — Очисти редактор + встав HTML

1. У текстовому полі редактора виділи весь HTML що там є (**Cmd+A** на Mac)
2. Натисни **Delete** — поле порожнє
3. Відкрий файл [docs/brevo-welcome-templates.md](brevo-welcome-templates.md)
4. Знайди розділ **🇺🇦 UK Template**
5. Знайди блок `<!doctype html>...</html>` під рядком **HTML body**
6. У VS Code / TextEdit:
   - Натисни на самий початок `<!doctype html>`
   - Прокрути до кінця `</html>`
   - **Shift+End** (виділити до кінця) АБО просто Cmd+A якщо файл відкритий лише з HTML
   - **Cmd+C** — скопіювати
7. Поверніться у Brevo, у порожнє code editor поле → **Cmd+V**

Має виглядати так:
```
┌─────────────────────────────────────────────────────────┐
│ <!doctype html>                                         │
│ <html lang="uk">                                        │
│ <head>                                                  │
│ <meta charset="utf-8">                                  │
│ ...                                                     │
│ </body>                                                 │
│ </html>                                                 │
└─────────────────────────────────────────────────────────┘
```

### Крок 6 — Preview і Save

1. Зверху справа — **Preview** (іконка ока) → клікни → побачиш як виглядає
2. Перевір:
   - ✅ Заголовок "Привіт 👋" (без імені — це нормально для preview)
   - ✅ Синя кнопка "📖 Відкрити повний гайд TFSA →"
   - ✅ Список з 4 bullet-points
   - ✅ Footer з "NRD #4575551 · Axcess Capital Advisors Inc."
3. Закрий Preview
4. Зверху справа — велика синя кнопка **Save & Activate** → клікни

### Крок 7 — Запиши Template ID

| # | Дія |
|---|-----|
| 1 | Повернися у список templates (ліве меню → **Campaigns → Email Templates**) |
| 2 | Знайди свій новий **SkyFort Welcome — UK** |
| 3 | Подивись **Template ID** — це **число** (наприклад `1`, `7`, `42`) |
| 4 | Запиши його десь — буде потрібно у Vercel |

⚠️ **Template ID** видно або у тій же таблиці поряд з ім'ям, або при клику на template — у URL (`...templates/1` означає ID=1).

✅ **UK template готовий**.

---

## 1.2 — Створи **RU welcome template** (~4 хв)

Точно те ж саме що для UK, але:

| Поле | Значення |
|------|----------|
| Template name | `SkyFort Welcome — RU` |
| Subject line | `Твой гайд TFSA — как обещали 👇` |
| Preview text | `8 типичных ошибок русскоязычных с TFSA + 20-летний план. Без спама, можешь отписаться в любой момент.` |
| From name | `Andrii · SkyFort` |
| From email | `andrii@sky-fort.ca` |

**HTML body**: з [docs/brevo-welcome-templates.md → 🇷🇺 RU Template](brevo-welcome-templates.md#-ru-template) — блок `<!doctype html>...</html>` під рядком **HTML body** у тому розділі.

Кроки 1-7 ті ж. **Save & Activate** → запиши Template ID.

✅ **RU template готовий**.

---

## 1.3 — Створи **EN welcome template** (~4 хв)

| Поле | Значення |
|------|----------|
| Template name | `SkyFort Welcome — EN` |
| Subject line | `Your TFSA guide — as promised 👇` |
| Preview text | `8 common newcomer TFSA mistakes + the 20-year plan. No spam, unsubscribe anytime.` |
| From name | `Andrii · SkyFort` |
| From email | `andrii@sky-fort.ca` |

**HTML body**: з [docs/brevo-welcome-templates.md → 🇨🇦 EN Template](brevo-welcome-templates.md#-en-template).

**Save & Activate** → запиши Template ID.

✅ **EN template готовий**.

---

## 1.4 — Перевір що ти маєш 3 Template IDs

Запиши тут (зачерни цей файл коли скопіюєш):

```
BREVO_WELCOME_TPLID_UK = _______  (наприклад 1)
BREVO_WELCOME_TPLID_RU = _______  (наприклад 2)
BREVO_WELCOME_TPLID_EN = _______  (наприклад 3)
```

---

## 1.5 — Додай 3 env vars у Vercel (~3 хв)

### Крок 1 — Зайди у Vercel

| # | Дія |
|---|-----|
| 1 | Браузер → https://vercel.com → login |
| 2 | На дашборді — клікни **skyfort-website** (твій проект) |
| 3 | Зверху таб — **Settings** |
| 4 | Ліве меню (підменю Settings) — **Environment Variables** |

### Крок 2 — Додай першу змінну (UK)

| # | Що клікаєш / вводиш |
|---|---------------------|
| 1 | Натисни кнопку **Add New** (або просто є form вгорі) |
| 2 | **Key**: введи точно `BREVO_WELCOME_TPLID_UK` (без пробілів, ВЕРХНІЙ регістр) |
| 3 | **Value**: введи число яке записав у 1.4 (наприклад `1` — БЕЗ лапок!) |
| 4 | **Environments**: переконайся що ☑ Production ☑ Preview ☑ Development (всі три) |
| 5 | **Sensitive**: НЕ обов'язково (це не секрет) |
| 6 | Натисни **Save** |

### Крок 3 — Додай RU і EN

Повтори крок 2 ще двічі:
- `BREVO_WELCOME_TPLID_RU` = (число RU)
- `BREVO_WELCOME_TPLID_EN` = (число EN)

✅ В таблиці Environment Variables маєш бачити **3 нові рядки**:
```
BREVO_WELCOME_TPLID_UK    1    Production · Preview · Development
BREVO_WELCOME_TPLID_RU    2    Production · Preview · Development
BREVO_WELCOME_TPLID_EN    3    Production · Preview · Development
```

### Крок 4 — Redeploy

Env vars **не активуються автоматично** на existing деплої. Треба новий deploy:

| # | Дія |
|---|-----|
| 1 | У Vercel → твій проект → таб **Deployments** (зверху) |
| 2 | Найвищий деплой у списку — клікни три крапки **⋯** з правого боку |
| 3 | У dropdown → **Redeploy** |
| 4 | З'явиться modal → НЕ зніми галочку "Use existing Build Cache" (можеш залишити) → **Redeploy** |
| 5 | Чекати ~2-3 хв поки статус стане **Ready** (зелений) |

✅ **Task 1 завершено**.

---

## 1.6 (Опціонально) — Додай ті ж змінні локально

Якщо тестуєш на `localhost:3000` — додай у `.env.local`:

```
BREVO_WELCOME_TPLID_UK=1
BREVO_WELCOME_TPLID_RU=2
BREVO_WELCOME_TPLID_EN=3
```

(заміни числа на свої з 1.4)

Потім перезапусти `npm run dev` щоб підхопило.

---

## 1.7 — Швидкий тест (опц., 1 хв)

### Опція A — Тестовий лист безпосередньо з Brevo

| # | Дія |
|---|-----|
| 1 | Brevo → **Campaigns → Email Templates** |
| 2 | Клікни на template **SkyFort Welcome — UK** |
| 3 | Зверху справа кнопка **Send a test** |
| 4 | Email: вкажи свою тестову пошту |
| 5 | У полі **params** (якщо є) введи JSON: `{"FIRSTNAME": "Andrii"}` |
| 6 | **Send** |
| 7 | Перевір свою пошту через ~30 сек — має прийти лист |

### Опція B — Через форму на сайті

| # | Дія |
|---|-----|
| 1 | Браузер → https://sky-fort.ca/uk → проскроль до email-форми |
| 2 | Введи тестовий email (можна use Gmail alias: `andriushchenko.partners+test@gmail.com`) |
| 3 | Натисни **Отримати гайд** |
| 4 | Перевір тестову пошту → має прийти welcome email |

⚠️ Якщо лист не прийшов — перевір **Spam** + перевір Brevo → ліве меню **Transactional → Email Activity** (там видно delivery status).

---

# 🔗 TASK 2 — Supabase Redirect URLs (~2 хв)

## Крок 1 — Зайди в Authentication URL Configuration

| # | Дія |
|---|-----|
| 1 | Браузер → https://supabase.com → login |
| 2 | Обери проект **skyfort-ops-public** (або через project ID `frhitqmsmqybggcmowag`) |
| 3 | Ліве меню (іконка людини) — **Authentication** |
| 4 | У підменю Authentication — **URL Configuration** |

## Крок 2 — Перевір Site URL

Перший рядок на сторінці:

```
Site URL
┌─────────────────────────────────────────────────────────┐
│  https://sky-fort.ca                                    │
└─────────────────────────────────────────────────────────┘
```

✅ **Має бути точно**: `https://sky-fort.ca`
- НЕ `https://sky-fort.ca/uk` (без шляху)
- НЕ `http://localhost:3000` (це fallback)

❌ Якщо інше — виправ → натисни **Save** внизу.

## Крок 3 — Додай 3 localhost callback URLs

Нижче на тій же сторінці — секція **Redirect URLs**.

```
Redirect URLs
┌─────────────────────────────────────────────────────────┐
│  https://sky-fort.ca/uk/portal/callback                 │  ← вже може бути
│  https://sky-fort.ca/ru/portal/callback                 │  ← вже може бути
│  https://sky-fort.ca/en/portal/callback                 │  ← вже може бути
│                                                         │
│  [+ Add URL]                                            │
└─────────────────────────────────────────────────────────┘
```

**Додай через `+ Add URL` ці 3 рядки** (по одному):

```
http://localhost:3000/uk/portal/callback
http://localhost:3000/ru/portal/callback
http://localhost:3000/en/portal/callback
```

⚠️ Важливо:
- **HTTP**, не HTTPS (localhost не має SSL за замовчуванням)
- Порт `:3000` (стандартний порт `npm run dev`)
- Без trailing slash

## Крок 4 — Save

Внизу сторінки кнопка **Save changes** → клікни.

✅ **Task 2 завершено** (~30 секунд реально).

---

# 🧪 Фінальний тест порталу (~3 хв)

Тепер magic link має працювати локально:

| # | Дія | Очікую |
|---|----|--------|
| 1 | Термінал → `npm run dev` (якщо не запущений) | `Ready in XXXms` |
| 2 | Браузер → `http://localhost:3000/uk/portal/login` | Форма входу з лого |
| 3 | Введи свій тест-email (той що додавав у Supabase Users) | Натисни **Надіслати посилання** |
| 4 | Перевір пошту → клікни лінк | Має redirect на `localhost:3000/uk/portal/callback?code=...` (зверни увагу — `?code=`, не `#error=`) |
| 5 | Далі автоматично → `/uk/portal/onboarding` (якщо новий) або `/uk/portal/overview` (якщо вже onboarded) | Бачиш форму wizard або dashboard |

✅ Якщо все спрацювало — Phase 1 portal повністю робочий локально!

---

# 🚨 Troubleshooting

## Brevo

| Симптом | Причина | Виправлення |
|---------|---------|-------------|
| "Sender not verified" коли пробую save template | Email `andrii@sky-fort.ca` не verified | Поверни до **Підготовка — перевір sender email** |
| Test email прийшов але виглядає поламано (без стилів) | Email клієнт блокує external CSS — це OK, наш HTML inline | Перевір на іншому клієнті (Gmail web, Apple Mail) |
| "Template ID is not a number" у Vercel | Ввів число в лапках | Прибери лапки. Має бути просто `1`, не `"1"` |
| Subscriber submit-нув форму але welcome не прийшов | Vercel не redeployed після env vars | Іди в Vercel → Deployments → Redeploy |

## Supabase

| Симптом | Причина | Виправлення |
|---------|---------|-------------|
| Magic link тимчасово редіректить на `https://sky-fort.ca/...` замість localhost | Site URL використовується як fallback бо localhost не у whitelist | Перевір що додав 3 localhost URLs |
| `#error=otp_expired` у URL | Лінк просрочений (1 година) | Запитай новий magic link |
| `error=access_denied` | Юзер не зареєстрований у Supabase Users | Перевір `Authentication → Users` — твій email там? |

---

# 📋 Чек-ліст коли все зробив

```
☐ Brevo sender andrii@sky-fort.ca verified
☐ Створено template "SkyFort Welcome — UK" → Template ID записано
☐ Створено template "SkyFort Welcome — RU" → Template ID записано
☐ Створено template "SkyFort Welcome — EN" → Template ID записано
☐ У Vercel додано BREVO_WELCOME_TPLID_UK
☐ У Vercel додано BREVO_WELCOME_TPLID_RU
☐ У Vercel додано BREVO_WELCOME_TPLID_EN
☐ Vercel redeployed (статус Ready)
☐ (опц) .env.local оновлено
☐ Test email прийшов (хоч одну мову перевір)

☐ Supabase Site URL = https://sky-fort.ca (без шляху)
☐ Supabase Redirect URLs має 3 https://sky-fort.ca/{uk,ru,en}/portal/callback
☐ Supabase Redirect URLs має 3 http://localhost:3000/{uk,ru,en}/portal/callback
☐ Magic link localhost тест → потрапляє на /uk/portal/callback?code=...
```

---

**Якщо застряг на якомусь кроці — скрін у чат, напишу що далі.**
