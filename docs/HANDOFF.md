# 🔄 HANDOFF — старт нової сесії Claude Code

> **Як використати**: відкрий нову сесію Claude Code → встав весь цей файл як перше повідомлення (або просто перше повідомлення: "Прочитай docs/HANDOFF.md і CLAUDE.md, скажи коли готовий"). Claude підхопить контекст.

---

## 👤 Хто я

**Andrii Andriushchenko** — Licensed Dealing Representative (**NRD #4575551**) при **Axcess Capital Advisors Inc.** (Exempt Market Dealer / EMD).

Сфера: фінансове консультування для українсько/російсько/англомовної діаспори в Канаді.

Реєстрація: Alberta, British Columbia, Ontario. Базуюсь у Калгарі.

**Спеціалізація**: exempt market — приватні MICs, REITs, development LPs (CSA NI 45-106). **НЕ ETF** — це поза ліцензією EMD.

---

## 🌐 Що це за проект

Веб-сайт **sky-fort.ca** — освітній content hub + lead generation для моєї практики.

**Основні цілі**:
1. Top-of-funnel: TikTok (@andrii.wealthcanada) → `/tt` landing → discovery call
2. Organic SEO: блог + service+city pages для long-tail
3. Email capture: збираю емейли через форму → Brevo nurture
4. Trust: NRD verification, regulatory compliance видна одразу

**Аудиторія**: новоприбулі українці/росіяни (3-12 місяців у Канаді) + другий рік (2-5 років), які думають куди вкладати гроші окрім банку.

---

## 🛠️ Тех стек

- **Framework**: Next.js 16.2.6 (App Router, Turbopack), React 19
- **Language**: JavaScript (не TypeScript)
- **Styling**: Tailwind CSS v4 (`@theme inline` у `globals.css`, без `tailwind.config.js`)
- **i18n**: Власна реалізація через `[locale]` segment + `_i18n/dictionary.js`. 3 локалі: `uk` (primary), `ru`, `en`.
- **Content**: MDX через `next-mdx-remote/rsc`, файли у `content/blog/<locale>/*.mdx`
- **Backend**: Vercel (host + deploy), Supabase (DB), Brevo (email)
- **Аналітика**: GA4 (`G-WXBYXY30T7`), Microsoft Clarity (`wwfjidrqmv`)
- **Іконки**: lucide-react + 2 кастомні SVG (TikTok, WhatsApp)
- **Charts**: recharts (lazy-loaded на калькуляторах через `next/dynamic`)

---

## 📁 Архітектура

```
app/
  [locale]/                       # i18n routing /uk, /ru, /en
    layout.js                     # locale-aware metadata + hreflang
    page.js                       # homepage (composer)
    blog/page.js                  # blog hub з TopicSuggestForm
    blog/[slug]/page.js           # blog post з MDX + Article JSON-LD
    services/page.js              # services hub (4 × 6 matrix)
    services/[service]/[city]/page.js  # 72 програмних SEO-сторінки
    pro-mene/                     # About page
    tt/                           # TikTok bio-link landing
    calculators/{tfsa-growth,financial-freedom,mortgage}/  # калькулятори
    links/, resources/            # legacy pages

  api/
    lead/route.js                 # /resources gated form (existing)
    consultation/route.js         # /consult.html discovery-call tool
    topic-request/route.js        # blog topic suggestions
    email-subscribe/route.js      # Brevo + Supabase sync

  _components/                    # Button, Card, Logo, Breadcrumbs, Section,
                                  # EmailCaptureForm, TopicSuggestForm,
                                  # WhatsAppButton, TrustBar, FaqJsonLd, etc.
  _sections/                      # HomeNav, Hero, Stats, About, Guides,
                                  # CalcPromo, MortgagePromo, FireCalcPromo,
                                  # Steps, Faq, FinalCta, Footer
  _i18n/dictionary.js             # uk/ru/en копії
  _i18n/config.js                 # CONFIG (calendly, email, social)
  _lib/blog.js                    # MDX parser, getAllPosts, etc.
  _lib/services-cities.js         # 4 services × 6 cities data
  _lib/analytics.js               # tracking events + UTM helpers

  layout.js                       # root html, FinancialService JSON-LD,
                                  # GA4 + Clarity scripts, WhatsAppButton mount
  globals.css                     # design tokens (@theme inline)
  Nav.jsx                         # burger menu
  sitemap.js                      # multilingual sitemap
  robots.js                       # AI crawlers allowed
  icon.svg, manifest.webmanifest

content/blog/uk/                  # 7 пілярних статей
  tfsa-dlya-ukrayintsiv-povny-gayd-2026.mdx
  rrsp-vs-tfsa-pershi-5-rokiv-v-kanadi.mdx
  fhsa-40k-na-pershu-kvartiru-v-kanadi.mdx
  yak-pereviryty-finansovogo-radnyka-v-kanadi.mdx
  exempt-market-calgary-commercial-real-estate-rozvytok.mdx
  persha-ipoteka-v-kalhari-povny-gayd.mdx
  pershyi-rik-v-kanadi-finansovyi-cheklist.mdx

public/
  consult.html                    # Discovery-call tool (single-file, noindex)
  andrii.jpg, calgary-hero.webp, freedom-cta.webp
  og-image.png, icon.svg
  llms.txt                        # для AI crawlers

docs/                             # вся документація
  HANDOFF.md                      # цей файл
  setup-analytics-and-email.md    # GA4 + Clarity + Brevo setup
  consultation-tool-setup.md      # /consult.html setup
  topic-suggestion-setup.md       # blog topic form setup
  email-capture-setup.md          # email-form setup
  service-city-pages.md           # services matrix docs
  how-to-add-blog-post.md         # як додавати статті
  tiktok-content-matrix.md        # TikTok content strategy
  tomorrow-checklist.md           # next-day checklist (поточний)
  sql/                            # Supabase SQL scripts
    consultations.sql
    topic_requests.sql
    email_subscribers.sql

proxy.js                          # i18n redirect + pass-through правила
next.config.mjs                   # порожній config (defaults)
```

---

## ✅ Що працює (станом на 2026-05-26, commit cbcea06)

### Сайт
- ✅ i18n routing `/uk`, `/ru`, `/en` з правильним hreflang
- ✅ Homepage з EMD-focused stats (exempt market, не ETF)
- ✅ Блог з **7 пілярними статтями** (TFSA, RRSP, FHSA, як перевірити радника, exempt market, перша іпотека, перший рік чек-ліст)
- ✅ Topic suggestion форма на блозі (`/api/topic-request` + Supabase)
- ✅ Email capture форма на `/uk` і `/uk/tt` (`/api/email-subscribe` + Brevo + Supabase)
- ✅ Services × City: 72 програмних SEO-сторінки (4 services × 6 cities × 3 locales)
- ✅ Services hub `/uk/services`
- ✅ TikTok bio-link `/uk/tt` з UTM tracking
- ✅ Discovery tool `/consult.html` (single-file, noindex)
- ✅ 3 калькулятори (TFSA growth, FIRE, mortgage) з lazy-loaded recharts
- ✅ WhatsApp кнопка глобально
- ✅ TrustBar з NRD link під hero
- ✅ Footer з TikTok, Instagram, Telegram, WhatsApp
- ✅ RSS feed `/blog/rss.xml`

### SEO/Schema
- ✅ JSON-LD: FinancialService + LocalBusiness (root), Article (blog), Service+FAQPage (city pages), Person+hasCredential (pro-mene), HowTo+WebApplication (calculators), FAQPage (homepage), BreadcrumbList (всі interior pages), WebSite з SearchAction
- ✅ Sitemap multilingual з hreflang
- ✅ robots.txt пропускає GPTBot, ClaudeBot, PerplexityBot
- ✅ llms.txt для AI crawlers
- ✅ OG images, Twitter cards
- ✅ Canonical URLs, hreflang alternates

### Email/Infrastructure
- ✅ Google Workspace на sky-fort.ca (MX records правильні)
- ✅ `andrii@sky-fort.ca` отримує email (раніше з квітня 2025 не отримував)
- ✅ Brevo: sender verified, domain authenticated (sky-fort.ca)
- ✅ SPF, DKIM (Brevo + Google), DMARC у DNS
- ✅ mail-tester score: **10/10**
- ✅ Email замінено в коді: `@axcesscapital.com` → `@sky-fort.ca`

### Analytics
- ✅ GA4 `G-WXBYXY30T7` — на проді і локально
- ✅ Microsoft Clarity `wwfjidrqmv` — на проді і локально
- ✅ Brevo підключено (API key + List ID 3)

### Tracking events (через GA4)
- `book_call_click`, `guide_download`, `calculator_run`, `lang_switch`, `form_submit`
- `email_capture`, `email_subscribe`
- `tt_landing_view`, `tt_cta_click`
- `topic_request_submit`, `whatsapp_click`

---

## 🔑 Доступи (env vars)

`.env.local` (gitignored, ON-machine):
```
NEXT_PUBLIC_GA_ID=G-WXBYXY30T7
NEXT_PUBLIC_CLARITY_ID=wwfjidrqmv
BREVO_API_KEY=xkeysib-...
BREVO_LIST_ID=3
```

**Vercel env vars** (production):
- Усі з `.env.local` + Supabase credentials:
  - `SUPABASE_URL=https://frhitqmsmqybggcmowag.supabase.co`
  - `SUPABASE_SERVICE_ROLE_KEY=...`
  - `CONSULTATION_API_KEY=sk_consult_7M9pQ2wL5xR8nV3kT6jH4yC1bF0aZ9eU3iD8gK5oN2sW7rB`

**Supabase tables** (в проекті `frhitqmsmqybggcmowag`):
- `leads` (existing, /resources)
- `consultations` (новий, /consult.html)
- `topic_requests` (новий, blog form)
- `email_subscribers` (новий, email form)

---

## ⚠️ Compliance rules (EMD)

**ОБОВ'ЯЗКОВО** на кожній зміні контенту:

1. ❌ НЕ обіцяти конкретну дохідність specific product ("цей фонд дасть 12%")
2. ❌ НЕ давати персональні рекомендації ("вам треба купити X")
3. ❌ НЕ рекомендувати specific ETF tickers (VEQT, XEQT, VFV) — це CIRO/IIROC ліцензія, не EMD
4. ❌ НЕ казати "guaranteed return"
5. ✅ Можна historical дані з джерелом (CRA, Bank of Canada, StatsCan)
6. ✅ Можна frameworks і концепції ("як TFSA працює")
7. ✅ Можна exempt market range з historical context ("приватні MICs історично 7-12%")
8. ✅ Завжди EMD disclaimer у кожній статті:
   ```
   ⚠️ **EMD compliance disclaimer:** Цей текст — освітні матеріали. Не персональна рекомендація. NRD #4575551 · Axcess Capital Advisors Inc.
   ```

---

## 🎨 Style guide

- **UI копії**: українська primary, ru/en — переклади. Тон educational, без впарювання.
- **Бренд-колір**: `#2D73E3` (CSS var `--color-brand`). НІКОЛИ hardcoded hex у JSX.
- **Дизайн-токени**: всі в `app/globals.css` під `@theme inline`. Якщо немає — додай у globals, не inline.
- **Іконки**: lucide-react. Якщо немає (TikTok, WhatsApp) — кастомний SVG component у `_components/`.
- **Компоненти**: PascalCase (`Button.jsx`). Routes: kebab-case (`tfsa-growth/page.js`).
- **MDX nuances**: НЕ використовувати `<XXX` без пробілу (MDX інтерпретує як JSX). Використовуй "менше ніж", "понад", або `&lt;`.

---

## 🎯 Що залишається в плані

**Високий пріоритет**:
1. **Welcome email template у Brevo** — щоб підписники одразу отримували TFSA PDF (інструкція: `docs/email-capture-setup.md`, частина "Створи welcome template")
2. **Testimonials section + Review schema** — потребує 5+ відгуків від реальних клієнтів (compliance: без обіцянок сум/дохідності)
3. **Google Business Profile** — Андрій має зробити сам (Google не дає AI access)

**Середній пріоритет**:
4. **8-ма пілярна стаття**: RESP для дітей (Newcomer/Education pillar — якщо хочеш round number)
5. **Service × City унікальний контент** — зараз шаблон стандартний на 72 сторінках. Можна додати unique paragraph (3-5 речень) на кожній.
6. **Переклад топ-3 пілярних UA → RU + EN** — коли побачимо що ранкує (через 1-2 місяці)

**Низький пріоритет**:
7. **TypeScript міграція** — поступово, опц.
8. **CMS** — не треба, MDX в репо OK
9. **Programmatic SEO для калькуляторів** — `/calculators/tfsa-growth?amount=10000&years=20` → 200+ landing pages з результатами

**Чекає завершення Андрієм**:
- ✅/❌ **Brevo welcome template** + `BREVO_WELCOME_TPLID` у Vercel
- ✅/❌ **Реальний тест email-форми на проді** (повторно, з мобілки)
- ✅/❌ **Google Workspace DKIM** — натиснути "Розпочати автентифікацію" в Google Admin (через 30 хв після додавання DNS record)

---

## 🌐 URL-и для перевірки

- **Прод**: https://sky-fort.ca
- **GitHub**: https://github.com/andriushchenkopartners-star/skyfort-website
- **Vercel**: https://vercel.com (project: skyfort-website)
- **Supabase**: https://supabase.com (project ID: `frhitqmsmqybggcmowag`)
- **Brevo**: https://app.brevo.com
- **GA4**: https://analytics.google.com (property: SkyFort production)
- **Clarity**: https://clarity.microsoft.com (project: SkyFort Website)
- **Calendly**: https://calendly.com/andriushchenko-partners/new-meeting
- **NRD lookup**: https://info.securities-administrators.ca/nrsmobile/nrssearch.aspx
- **TikTok**: https://www.tiktok.com/@andrii.wealthcanada

---

## 📞 Контакти

- **Email**: andrii@sky-fort.ca
- **Phone**: +1-403-397-2553 / WhatsApp: https://wa.me/14033972553
- **Domain registrar**: Namecheap

---

## 💬 Стиль роботи з Андрієм

- **Простою мовою**, без жаргону. Андрій — фінансист, не розробник.
- Чітко **розділяй**: "що я роблю сам" vs "що ти маєш зробити" (з покроковою інструкцією).
- Скріншот-style інструкції з кнопками і кліками.
- Build verify перед commit. Commit message — informative.
- Замість "зробив" — кажи що саме і де.
- Якщо потрібен доступ — пояснюй чесно що AI не може мати login.
- Питай скріни для debug замість здогадок.

---

## 🚀 Як стартувати нову сесію Claude Code

1. Відкрий новий tab/window Claude Code.
2. Перейди у проект: `cd /Users/aandriushchenko/Documents/skyfort-website`
3. У першому повідомленні Claude напиши:
   ```
   Прочитай файли docs/HANDOFF.md і CLAUDE.md.
   Підтверди що зрозумів контекст і скажи: який наступний пріоритет?
   ```
4. Claude підхопить весь контекст і запропонує що робити далі.

Або одразу зі задачею:
```
Прочитай docs/HANDOFF.md і CLAUDE.md.
Потім: [твоя задача]
```

---

## 🔍 Останні діалоги — швидкий контекст

**Що завершено в попередній сесії**:
1. ✅ Налаштовано GA4, Microsoft Clarity, Brevo (mail-tester 10/10)
2. ✅ Виправлено `andrii@sky-fort.ca` (MX records з Namecheap forwarding → Google Workspace)
3. ✅ Migrated email `@axcesscapital.com` → `@sky-fort.ca` у коді (7 файлів)
4. ✅ Налаштовано SPF + Google DKIM + Brevo DKIM + DMARC у DNS
5. ✅ Написано 2 нові пілярні статті (Calgary mortgage, Перший рік чек-ліст)
6. ✅ Audit + rebalance ETF vs exempt market на сайті (homepage stats, CalcPromo, TFSA/FHSA pillars, /tt landing)
7. ✅ 72 Service × City SEO-сторінки готові
8. ✅ Topic suggestion + Email capture форми працюють

**Останній commit**: `cbcea06` — "feat: 2 new pillar posts + ETF/exempt market rebalance"

---

**Як завжди — починай з малого. Питай Андрія перш ніж робити велике.**
