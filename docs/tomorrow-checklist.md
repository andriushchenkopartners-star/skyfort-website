# Завтра вранці — швидкий чек-ліст

## 🟣 1. Доперевірити Microsoft Clarity (5 хв)

**Стан**: Clarity ID `wwfjidrqmv` додано в `.env.local` ✅ + у Vercel ✅. Скрипт є і на localhost, і на sky-fort.ca. Dashboard поки що сірий — чекає першого реального візиту з браузера.

**Що зробити**:
1. Відкрий `https://sky-fort.ca/uk` у Safari/Chrome **в режимі інкогніто** (Cmd+Shift+N).
2. Активно поклацай ~60 сек: поскролл, відкрий блог, калькулятор, заповни щось.
3. Зачекай 5-10 хв.
4. Іди на **https://clarity.microsoft.com** → SkyFort Website → **Dashboards** (має стати активним).

**Якщо ще сірий через 10 хв**:
- Спробуй з мобілки (інша IP, інший fingerprint).
- Перевір що у Vercel задеплоєна остання версія (Deployments → топ-рядок має бути Ready).
- Напиши мені — подивимось.

---

## 🟢 2. Завершити Brevo (~10 хв)

**Стан**: інструкція в `docs/setup-analytics-and-email.md` (Частина 3). Сьогодні ввечері почато реєстрацію.

**Що зробити**:
1. Завершити підтвердження телефону (якщо ще не).
2. Отримати API key (SMTP & API → API keys → Generate).
3. Додати у `.env.local`: `BREVO_API_KEY=xkeysib-...`
4. (Опціонально) Підтвердити sender domain sky-fort.ca через DNS — детально розписано тут же.

**Як зробиш — скажи мені**. Я зроблю:
- Email-capture форму на `/uk` (внизу під hero, з пропозицією завантажити TFSA-гайд).
- API endpoint `/api/lead` → передає email у Brevo + надсилає welcome-лист з PDF.
- 7-денну welcome-серію (templates у Brevo).
- Окрему форму на `/uk/tt` (для TikTok-трафіку — це найважливіше).

---

## 📊 Поточний стан проекту (станом на 2026-05-24 ввечері)

**Працює:**
- ✅ GA4 (`G-WXBYXY30T7`) — на проді і локально
- ✅ Microsoft Clarity (`wwfjidrqmv`) — на проді і локально (Dashboard чекає першого браузер-візиту)
- ✅ TikTok handle `@andrii.wealthcanada` — в footer і на `/uk/tt`
- ✅ WhatsApp кнопка — внизу справа на всіх сторінках
- ✅ i18n routing — `/uk`, `/ru`, `/en` з hreflang
- ✅ Блог з 3 пілярними статтями (TFSA, RRSP vs TFSA, FHSA)
- ✅ RSS feed (`/blog/rss.xml`)
- ✅ Service + HowTo + FAQ + Article + LocalBusiness JSON-LD
- ✅ Dynamic recharts (~80KB savings на калькуляторах)
- ✅ Refactor `page.js` в `_sections/`

**Залишається (наступні раунди):**
- ⏳ Brevo email-capture (чекає API key)
- ⏳ Testimonials + Review schema (чекає 5+ відгуків від клієнтів)
- ⏳ Google Business Profile (треба зробити самостійно)
- ⏳ Service × City landing matrix (24 SEO-сторінки)
- ⏳ Ще 5 пілярних статей у блог
- ⏳ Переклад топ-статей на ru/en (коли UK почне рейтити)
