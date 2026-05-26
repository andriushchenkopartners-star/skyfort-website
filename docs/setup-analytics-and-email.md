# Детальна інструкція: GA4, Microsoft Clarity, Brevo

Усе пояснення розраховане на новачка. Якщо застрягнеш на якомусь кроці — напиши мені де саме.

**Загальний принцип:** ти створюєш акаунт у сервісі → копіюєш якийсь ID/key → вставляєш у файл `.env.local` у нашому проекті → перезапускаєш `npm run dev` → ID активується.

---

## Передумова — створи файл `.env.local`

Цей файл буде тримати всі твої secrets (паролі/ключі). Він **не комітиться в git** автоматично (gitignored), тож паролі залишаються тільки на твоєму комп'ютері.

### Крок 1: Створи файл

У термінали, **усередині папки проекту** (там де `package.json`), виконай:

```bash
touch .env.local
```

Або у Finder:
1. Відкрий папку `Documents → skyfort-website`
2. Натисни `Cmd + Shift + .` (показати приховані файли)
3. Створи новий файл → назви рівно `.env.local` (без розширення, з крапкою на початку)

### Крок 2: Відкрий у редакторі

```bash
open -a "TextEdit" .env.local
```

Або у VS Code, якщо встановлений.

Поки що файл порожній. Ми будемо туди додавати рядки по мірі того як отримуємо ID.

---

# 🔵 Частина 1: Google Analytics 4 (GA4)

**Що це дає:** ти бачитимеш скільки людей заходить на сайт, з яких джерел (Google, TikTok, прямий захід), які сторінки дивляться, скільки клікнули на Calendly. Безкоштовно, без обмежень.

**Час налаштування:** ~10 хв.

## Крок 1: Зайди в Google Analytics

1. Відкрий **https://analytics.google.com** у браузері.
2. Залогінься Google-акаунтом який ти хочеш використовувати для бізнесу (краще не особистий).
3. Якщо це твій перший раз — Google запропонує "Set up for free" або "Start measuring" → клік.

## Крок 2: Створи Account (це організація)

1. Назва: **SkyFort Wealth** (або як хочеш).
2. Прапорці згоди на data sharing — залиш як є (стандартні).
3. Country: **Canada**, валюта **CAD**.
4. Кнопка "Next" → перехід до property.

## Крок 3: Створи Property (це конкретний сайт)

1. Property name: **SkyFort Website**
2. Reporting time zone: **(GMT-07:00) Mountain Time — Edmonton** (Калгарі)
3. Currency: **Canadian Dollar (CAD $)**
4. "Next"

## Крок 4: Бізнес-інфо

1. Industry: **Finance** (або Other → Personal services).
2. Business size: **Small (1-10 employees)**.
3. How you intend to use Google Analytics — постав галки на:
   - "Measure user engagement on my site"
   - "Optimize my site or app experience"
   - "Get baseline reports"
4. "Create" → прийми Terms of Service (Canada).

## Крок 5: Налаштуй Data Stream

Після створення property з'явиться екран **"Choose a platform"**:

1. Натисни **"Web"**.
2. Website URL: **https://sky-fort.ca**
3. Stream name: **SkyFort production**
4. Enhanced measurement — залиш **увімкненим** (це OK).
5. Натисни **"Create stream"**.

## Крок 6: Скопіюй Measurement ID

На наступному екрані побачиш блок з заголовком **"Measurement ID"** і значенням типу:

```
G-XXXXXXXXXX
```

(10 символів після G-)

📋 **Скопіюй цей ID повністю** (з префіксом `G-`).

## Крок 7: Додай у `.env.local`

Відкрий файл `.env.local` і додай рядок:

```
NEXT_PUBLIC_GA_ID=G-XXXXXXXXXX
```

(Заміни `G-XXXXXXXXXX` на свій реальний ID. Жодних пробілів навколо `=`. Жодних лапок.)

Збережи файл (Cmd+S).

## Крок 8: Перезапусти dev сервер

Якщо у тебе зараз запущений `npm run dev`:
1. Перейди в термінал де він стоїть.
2. Натисни **Ctrl+C** щоб зупинити.
3. Запусти знову: `npm run dev`

Це треба бо env-змінні читаються тільки при старті.

## Крок 9: Перевір що працює

1. Відкрий `localhost:3000/uk` у браузері.
2. Відкрий новий tab → іди на **https://analytics.google.com** → твій SkyFort property → меню зліва **"Reports" → "Realtime"**.
3. Через 10-20 секунд побачиш себе як активного користувача (1 in last 30 minutes).

Якщо не побачив — переконайся що ID в `.env.local` правильно скопійовано (без пробілів) і що ти перезапустив `npm run dev`.

## Крок 10: Задеплой щоб працювало на проді

`.env.local` працює тільки локально. Щоб GA працювало на sky-fort.ca, треба додати env-змінну в Vercel.

1. Іди на **https://vercel.com** → твій проект SkyFort.
2. Меню зверху: **"Settings" → "Environment Variables"**.
3. Add new:
   - Name: `NEXT_PUBLIC_GA_ID`
   - Value: `G-XXXXXXXXXX` (твій ID)
   - Environments: відмітити всі три (Production, Preview, Development)
4. Save.
5. Іди в **"Deployments"** → останній → меню "..." → **"Redeploy"** (або просто зроби новий `git push`).

Через 1-2 хв sky-fort.ca буде з GA4. Тоді можна знову зайти в analytics.google.com → Realtime і побачити прод-трафік.

---

# 🟣 Частина 2: Microsoft Clarity

**Що це дає:** ти бачитимеш **запис сесій** реальних користувачів (без personally identifying data) — як вони рухають мишкою, де клікають, де зупиняються. Heatmaps показують які елементи дивляться найбільше. Це **ідеальна добавка до GA4** — GA каже "що", Clarity каже "як".

**Час:** ~5 хв.

## Крок 1: Зайди в Clarity

1. Відкрий **https://clarity.microsoft.com**.
2. Натисни **"Sign up free"**.
3. Залогінься через Google або Microsoft акаунт (можна той самий що використовував для GA).

## Крок 2: Створи проект

1. Натисни **"+ New project"**.
2. Project name: **SkyFort Website**
3. Website URL: **https://sky-fort.ca**
4. Category: **Finance**
5. Submit.

## Крок 3: Скопіюй Project ID

Після створення Clarity покаже екран **"Install tracking code"**:

1. Натисни **"Get tracking code"**.
2. Побачиш JavaScript-блок. Тобі **не треба** копіювати весь код — я вже додав логіку в проект.
3. **Тобі треба тільки ID** — це частина після `clarity.ms/tag/` АБО після `"clarity", "script", "` у коді. Виглядає як 10-символьний string з літер і цифр (наприклад `abc123def4`).

## Крок 4: Додай у `.env.local`

Відкрий `.env.local` і додай рядок:

```
NEXT_PUBLIC_CLARITY_ID=abc123def4
```

(Заміни на свій реальний ID).

Збережи.

## Крок 5: Перезапусти dev + перевір

1. `Ctrl+C` у термінал → `npm run dev`.
2. Відкрий `localhost:3000/uk` у браузері.
3. Поклікай по сайту 30-60 секунд (поскролл, натисни кнопки).
4. У Clarity → **"Dashboard"** → через 1-3 хв з'являться твої сесії і heatmap.

## Крок 6: Задеплой на Vercel

Так само як GA:
1. Vercel → Settings → Environment Variables.
2. Add: `NEXT_PUBLIC_CLARITY_ID` = `abc123def4`.
3. Redeploy.

---

# 🟢 Частина 3: Brevo (email-маркетинг)

**Що це дає:** автоматизована email-серія. Коли хтось залишить email на сайті (форма з'явиться у наступній фазі плану) — Brevo:
1. Надсилає welcome-лист з безкоштовним гайдом.
2. Запускає 7-денну "nurture-серію" (Day 1: TFSA basics, Day 2: RRSP basics, ..., Day 7: book a call).
3. Дає тобі контакти лідів які ти можеш сам експортувати.

**Безкоштовно:** до 300 emails на день, до 100 контактів у списку, broadcast по всіх щомісячно.

**Час налаштування акаунта:** ~10 хв. Налаштування шаблонів і автоматизації я допоможу у наступному раунді коли матиму API key.

## Крок 1: Реєстрація

1. Відкрий **https://www.brevo.com** (раніше Sendinblue — назву змінили у 2023).
2. Кнопка **"Sign up free"** зверху справа.
3. Введи робочий email (рекомендую використовувати `andrii@sky-fort.ca` бо це твоя бізнес-адреса) і пароль.
4. Підтверди email (перевір inbox, клікни на лінк).

## Крок 2: Setup wizard

Після підтвердження email Brevo проведе тебе через wizard:

1. **Tell us about your business**:
   - Company name: **SkyFort Wealth**
   - Industry: **Financial services**
   - Company size: **Just me (1)** або **2-10**
   - "Continue"

2. **What do you want to use Brevo for?**:
   - Постав галки: **"Send marketing emails"**, **"Automate marketing"**, **"Manage contacts"**.
   - "Continue"

3. **Where do you sell?**: Canada.

4. **Confirm phone** (важливо — Brevo вимагає для anti-spam):
   - Введи +1-403-397-2553 (твій номер).
   - Тобі прийде SMS з кодом, введи його.

## Крок 3: Get API key

1. Після setup — у верхньому правому куті побачиш свій акронім (наприклад "AA").
2. Клікни на нього → **"SMTP & API"**.
3. У вкладці **"API keys"** натисни **"Generate a new API key"**.
4. Назва: **SkyFort Website**.
5. Натисни **"Generate"**.
6. **ВАЖЛИВО**: ID покажуть тільки один раз. Скопіюй одразу.

Виглядає так:
```
xkeysib-abc123def456...xyz789-длинный-string
```

## Крок 4: Додай у `.env.local`

Відкрий `.env.local` і додай:

```
BREVO_API_KEY=xkeysib-abc123def456...xyz789
```

⚠️ **На відміну від GA/Clarity, цей ID НЕ починається з `NEXT_PUBLIC_`** — це секретний ключ, його не можна показувати в браузері. Я використаю його тільки на server-side (API routes).

## Крок 5: (Опційно зараз) Створи контакт-список

У Brevo:
1. Меню зліва: **"Contacts" → "Lists"**.
2. **"Create new list"**.
3. Назва: **SkyFort Email Subscribers UK** (або просто `Newsletter`).
4. Save.

Цей список буде куди форма буде додавати email-и.

## Крок 6: (Опційно зараз) Перевір sender domain

Brevo вимагає підтвердити що ти володієш доменом для бізнес-email.

1. **"Senders, Domains & Dedicated IPs" → "Domains"**.
2. **"Add a domain"** → **sky-fort.ca**.
3. Brevo дасть тобі DNS-записи (3 штуки: SPF, DKIM, DMARC).
4. **Це треба буде додати у твого DNS-провайдера** (де куплений домен — GoDaddy / Namecheap / Cloudflare).

⚠️ Якщо ти не впевнений де куплений домен — напиши мені, разом розберемось. Це разовий процес що дає твоїм email-ам нормальну доставку (без помітки spam).

## Крок 7: Задеплой на Vercel (коли будемо робити форму)

Як з GA/Clarity, але `BREVO_API_KEY` (без `NEXT_PUBLIC_`). Це буде у наступній фазі.

---

# 📋 Підсумковий чек-ліст

Коли все зроблено, твій `.env.local` має виглядати приблизно так:

```
NEXT_PUBLIC_GA_ID=G-XXXXXXXXXX
NEXT_PUBLIC_CLARITY_ID=abc123def4
BREVO_API_KEY=xkeysib-abc123def456...xyz789
```

Три рядки. Кожен з рівним `=` без пробілів навколо.

**Що зробити після усіх трьох:**
1. ✅ `Ctrl+C` → `npm run dev` (підтягне нові env-змінні)
2. ✅ Перевір `localhost:3000` у браузері
3. ✅ Зайди в GA → Realtime — побачиш себе
4. ✅ Зайди в Clarity → Dashboard через 2-3 хв — побачиш сесію
5. ✅ Додай ці ж 3 змінні у **Vercel → Settings → Environment Variables**
6. ✅ Redeploy (через `git push` або кнопку у Vercel)

Через 1-2 хв sky-fort.ca буде з повноцінною аналітикою.

---

# ❓ FAQ

**Q: Чи можна якщо я використаю особистий Google акаунт для GA?**
A: Можна, але краще створити окремий бізнес-акаунт типу `andrii@sky-fort.ca`. Так буде легше якщо передаватимеш доступ комусь.

**Q: Скільки коштує GA4?**
A: Безкоштовно для більшості бізнесів. Платно тільки якщо в тебе мільйони visitors/міс.

**Q: А Clarity точно безкоштовний?**
A: Так. Microsoft робить це безкоштовно бо вони хочуть конкурувати з Hotjar (який платний).

**Q: Brevo — скільки потрібно платити?**
A: Free план дає 300 email/день, 100 контактів. Тобі цього вистачить на старті. Коли список виросте до ~500 контактів — або платний $15/міс, або перехід на іншого провайдера.

**Q: Чи можна без Brevo, лише через Mailchimp?**
A: Так, але Brevo має кращий free план у 2026. Якщо вже маєш Mailchimp акаунт — напиши мені, я зроблю інтеграцію з ним замість Brevo.

**Q: А якщо я не хочу email-марketing зовсім?**
A: Тоді цей крок пропусти. GA + Clarity достатньо для початку. Email можна додати пізніше.

**Q: Я почав а застряг — куди звертатись?**
A: Напиши мені в наступному повідомленні з описом де саме. Я допоможу.

---

# 🎯 Що відбувається після того як ти додав усі 3

GA4 + Clarity почнуть працювати **одразу** після redeploy на Vercel.

Brevo чекає на наступний раунд робіт від мене — я зроблю:
- Email-capture форму на `/uk` (внизу, з пропозицією завантажити гайд)
- Окрему форму на `/uk/tt` (бо TikTok-трафік найважливіший)
- 7-денну welcome-серію (templates в Brevo)
- API endpoint який отримує email від форми → передає в Brevo → Brevo сам надсилає welcome

Це буде Phase 4.1 з плану — щойно отримаю BREVO_API_KEY, починаю.
