# Service × City landing pages

## Що це

24 програмні SEO-сторінки (× 3 локалі = 72) для long-tail запитів типу:
- "TFSA для українців в Едмонтоні"
- "exempt market Toronto"
- "FHSA Vancouver newcomer"

URL pattern: `/uk/services/{service}/{city}` (+ `/ru/` та `/en/`).

## Що зроблено в коді (готово, нічого від тебе не треба)

- ✅ Дата-файл: `app/_lib/services-cities.js`
  - **4 послуги**: tfsa, rrsp, fhsa, exempt-market
  - **6 міст**: calgary, edmonton, red-deer, vancouver, burnaby, toronto
  - Локалізована назва, опис, демографія, локальний контекст (notes) на 3 мови
- ✅ Динамічна сторінка: `app/[locale]/services/[service]/[city]/page.js`
  - generateStaticParams → 72 сторінки prerender при білді
  - Hero з місто+послуга
  - Local facts block (population, median income, 4 локальні notes)
  - Service description
  - 4 локалізовані FAQ
  - Related calculator + related pillar post links
  - CTA на Calendly
  - Email capture form
  - JSON-LD: `Service` + `FAQPage` (з `areaServed` = конкретне місто)
  - hreflang альтернативи на 3 локалі
- ✅ Services hub: `app/[locale]/services/page.js`
  - Список 4 послуг (cards з лінком на Calgary-варіант кожної)
  - Матриця: 6 міст × 4 послуги = 24 крос-лінки
- ✅ Sitemap: 72 нові URL (24 × 3 локалі) з hreflang
- ✅ Nav: "Послуги" пункт додано в burger menu

## URL приклади

| URL | Що ранкуватиметься |
|---|---|
| `/uk/services` | "послуги фінансовий радник українцям" |
| `/uk/services/tfsa/calgary` | "TFSA Калгарі", "TFSA Alberta українцям" |
| `/uk/services/tfsa/edmonton` | "TFSA Едмонтон" (low competition) |
| `/uk/services/exempt-market/toronto` | "exempt market Toronto" |
| `/uk/services/fhsa/vancouver` | "FHSA Vancouver українцям" |
| `/en/services/tfsa/calgary` | "TFSA Calgary newcomer financial advisor" |
| ...etc. | |

## Як додати нове місто (3 хв)

Відкрий `app/_lib/services-cities.js` → у `CITIES` додай новий ключ:

```js
"mississauga": {
  slug: "mississauga",
  nameUk: "Міссіссога",
  nameRu: "Миссиссога",
  nameEn: "Mississauga",
  locativeUk: "у Міссіссозі",
  locativeRu: "в Миссиссоге",
  locativeEn: "in Mississauga",
  province: "Ontario",
  provinceCode: "ON",
  population: "750K (city)",
  medianHHIncome: 95000,
  notesUk: ["...", "...", "..."],
  notesRu: ["...", "...", "..."],
  notesEn: ["...", "...", "..."],
},
```

Все. Автоматично згенерується:
- `/uk/services/{кожен_сервіс}/mississauga` × 3 локалі = 12 нових URL
- Updated sitemap включить їх
- Hub-сторінка автоматично покаже Mississauga в матриці

## Як додати нову послугу (5 хв)

Той же файл, у `SERVICES` додай ключ:

```js
"resp": {
  slug: "resp",
  pillar: "RESP",
  titleUk: "RESP — освіта дитини",
  titleRu: "RESP — образование ребёнка",
  titleEn: "RESP — child education",
  descUk: "Як отримати $7,200 від уряду на освіту дитини...",
  descRu: "...",
  descEn: "...",
  keywords: ["RESP", "child education", "CESG"],
  relatedCalculator: "/calculators/financial-freedom", // або новий
  relatedPillarSlug: "resp-osvita-dytyny", // якщо є пілярна стаття
},
```

Автоматично згенерується × 6 міст × 3 локалі = 18 нових URL.

## SEO стратегія

**Очікувані результати**:
- Long-tail traffic починає з'являтись через 2-4 місяці після Google index-у.
- Кожна сторінка ранкує на 5-15 long-tail keywords.
- Конверсія з long-tail зазвичай **3-5x вища** ніж з broad keywords (intent точніший).

**Що зробити для прискорення**:
1. Submit sitemap.xml у Google Search Console (вже автоматично — як sitemap оновиться).
2. Через 7 днів — перевірити в Search Console → Pages: чи всі 72 URL проіндексовані.
3. Build backlinks на конкретні service+city сторінки (наприклад, гостьові пости в українських Telegram-групах конкретних міст).

## Тестування

### Локально:
```bash
npm run dev
```
Відкрий:
- `http://localhost:3000/uk/services` (hub)
- `http://localhost:3000/uk/services/tfsa/calgary` (приклад service+city)
- `http://localhost:3000/en/services/exempt-market/toronto`

### На проді (після deploy):
```bash
curl -s -o /dev/null -w "%{http_code}\n" https://sky-fort.ca/uk/services/tfsa/calgary
# Має повернути 200
```

## Структура контенту на кожній сторінці

```
Header
├── Breadcrumbs (Home > Services > {Service · City})
├── Pill: {city} · {province}
├── H1: {service title} {city locative}
└── Subtitle: "Освітні консультації для українців... NRD #4575551"

Local facts block
├── Population
├── Median household income
├── Province
├── "Why this matters here" (4 city-specific notes)

Service detail
├── H2: {service title}
└── Service description (with focus on city context)

FAQ (4 questions, locale-aware)
├── Are you physically in {city}?
├── Is {service} legal in {province}?
├── What does the first consultation cost?
└── Can we do it in Ukrainian/Russian?

Related links
├── Interactive calculator (TFSA / FIRE / Mortgage)
└── Pillar blog post (if exists)

CTA card
├── ShieldCheck icon
├── "Ready to figure out your situation?"
└── Discovery call button → Calendly

Email capture form (TFSA guide download)

"All services" back link
```

## JSON-LD на кожній сторінці

```json
{
  "@context": "https://schema.org",
  "@graph": [
    { "@type": "Service", "name": "...", "areaServed": { "@type": "City", "name": "Calgary" }, ... },
    { "@type": "FAQPage", "mainEntity": [...] }
  ]
}
```

Це дає:
- Rich snippets у Google (зірочки FAQ розкриваються)
- Service understanding для AI краулерів
- Local SEO signal (`areaServed`)
