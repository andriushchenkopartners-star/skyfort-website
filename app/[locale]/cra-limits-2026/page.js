// app/[locale]/cra-limits-2026/page.js
// "Updated for 2026" CRA limits hub — Audit 7 Section 3 #10. Annual
// canonical reference with every Canadian tax/benefit limit a newcomer
// or established family needs. Each row source-attributed to canada.ca.
//
// SEO logic: queries like "TFSA limit 2026", "RRSP max 2026", "CPP YMPE
// 2026", "FHSA limit 2026" peak every January. Owning a single canonical
// hub answer with up-to-date numbers + dates + sources captures all of
// them. AI engines cite source-attributed canonical lists heavily
// (DefinedTermSet pattern adapted for limits).

import Link from "next/link";
import { ExternalLink, Calendar } from "lucide-react";
import Logo from "../../_components/Logo";
import Breadcrumbs from "../../_components/Breadcrumbs";
import LangSwitcher from "../../_components/LangSwitcher";
import AuthorByline from "../../_components/AuthorByline";
import UpdatedBadge from "../../_components/UpdatedBadge";
import StaticFaq from "../../_components/StaticFaq";
import { SUPPORTED_LOCALES } from "../../_i18n/dictionary";

const LIMITS = [
  {
    id: "tfsa",
    name: "TFSA",
    nameFull: "Tax-Free Savings Account",
    value: "$7,000 / рік",
    cumulative: "$109,000 cumulative (для tax-resident з 2009)",
    note: "Контрибуція не зменшує taxable income; growth + withdrawals tax-free. Newcomer room починає накопичуватись з року отримання tax-resident status (типово arrival day).",
    source: { url: "https://www.canada.ca/en/revenue-agency/services/tax/individuals/topics/tax-free-savings-account.html", label: "canada.ca/TFSA" },
    relatedHref: "/calculators/tfsa-growth",
    relatedLabel: "TFSA калькулятор",
  },
  {
    id: "rrsp",
    name: "RRSP",
    nameFull: "Registered Retirement Savings Plan",
    value: "$33,810 / рік",
    cumulative: "Або 18% earned income попереднього року, whichever lower",
    note: "Дeductible from taxable income (immediate tax refund). Buffer $2,000 lifetime over-contribution без penalty. Має бути закритий до 71 (convert to RRIF).",
    source: { url: "https://www.canada.ca/en/revenue-agency/services/tax/individuals/topics/rrsps-related-plans.html", label: "canada.ca/RRSP" },
    relatedHref: "/calculators/rsu-tax",
    relatedLabel: "RSU tax (RRSP-strategy)",
  },
  {
    id: "fhsa",
    name: "FHSA",
    nameFull: "First Home Savings Account",
    value: "$8,000 / рік",
    cumulative: "$40,000 lifetime",
    note: "Hybrid TFSA+RRSP: contributions deductible (як RRSP), qualifying withdrawal tax-free (як TFSA). Room starts at account opening, не arrival. 15-year window до convert to RRSP penalty-free.",
    source: { url: "https://www.canada.ca/en/revenue-agency/services/tax/individuals/topics/first-home-savings-account.html", label: "canada.ca/FHSA" },
    relatedHref: "/blog/fhsa-40k-na-pershu-kvartiru-v-kanadi",
    relatedLabel: "FHSA повний гайд",
  },
  {
    id: "resp",
    name: "RESP",
    nameFull: "Registered Education Savings Plan",
    value: "No annual limit",
    cumulative: "$50,000 lifetime contribution per child",
    note: "CESG match від уряду — 20% на перший $2,500/рік, max $500/рік, $7,200 lifetime. Plus A-CESG до $100/рік для low-income families.",
    source: { url: "https://www.canada.ca/en/services/benefits/education/education-savings.html", label: "canada.ca/RESP" },
    relatedHref: "/blog/cesg-maximum-strategy-resp",
    relatedLabel: "CESG strategy",
  },
  {
    id: "hbp",
    name: "HBP",
    nameFull: "Home Buyers' Plan",
    value: "$60,000 одноразово",
    cumulative: "Withdrawal з власного RRSP для first home; repay over 15 років",
    note: "Combined з FHSA: solo $40K + $60K = $100K. Couple × 2 = $200K тax-advantaged для down payment.",
    source: { url: "https://www.canada.ca/en/revenue-agency/services/tax/individuals/topics/rrsps-related-plans/what-home-buyers-plan.html", label: "canada.ca/HBP" },
    relatedHref: "/calculators/mortgage",
    relatedLabel: "Mortgage calculator",
  },
  {
    id: "lcge",
    name: "LCGE",
    nameFull: "Lifetime Capital Gains Exemption",
    value: "≈$1,270,000",
    cumulative: "Lifetime, indexed annually",
    note: "На sale QSBS (Qualified Small Business Shares) CCPC: tax-free до cap. 24+ month holding + 90% active assets at sale + 50% throughout 24 months.",
    source: { url: "https://www.canada.ca/en/revenue-agency/services/tax/individuals/topics/about-your-tax-return/tax-return/completing-a-tax-return/personal-income/line-25400-capital-gains-deduction.html", label: "canada.ca/LCGE" },
    relatedHref: "/blog/lcge-qsbs-purification-roadmap-pidpryyemtsi",
    relatedLabel: "LCGE QSBS roadmap",
  },
  {
    id: "cpp-ympe",
    name: "CPP YMPE",
    nameFull: "Year's Maximum Pensionable Earnings",
    value: "$73,200",
    cumulative: "Plus YAMPE $83,200 (second-tier CPP2)",
    note: "Earnings до YMPE: 5.95% employee + 5.95% employer (self-employed pays both = 11.9%). Earnings YMPE-YAMPE: additional 4% CPP2 contribution (each side).",
    source: { url: "https://www.canada.ca/en/services/benefits/publicpensions/cpp/cpp-enhancement.html", label: "canada.ca/CPP" },
    relatedHref: "/calculators/mpc-vs-sole-proprietor",
    relatedLabel: "MPC vs Sole Proprietor",
  },
  {
    id: "ei",
    name: "EI",
    nameFull: "Employment Insurance maximum insurable earnings",
    value: "$65,700",
    cumulative: "Employee rate 1.66%, employer 2.32%",
    note: "Self-employed (включно з CCPC owner-managers) typically opt-out (not eligible for regular EI), але можуть opt-in для maternity/parental benefits через окрему registration.",
    source: { url: "https://www.canada.ca/en/employment-social-development/programs/ei/ei-list/reports/premium/rates2026.html", label: "canada.ca/EI" },
    relatedHref: null,
  },
  {
    id: "oas",
    name: "OAS",
    nameFull: "Old Age Security max monthly (age 65-74)",
    value: "≈$727/міс",
    cumulative: "≈$8,724/рік full benefit (40+ years Canadian residency)",
    note: "Clawback ('recovery tax') starts at income $90,997 у 2026 (15¢ per $ above). Fully clawed back at $148,065. Newcomers потребують 10+ років residency для будь-якого OAS.",
    source: { url: "https://www.canada.ca/en/services/benefits/publicpensions/cpp/old-age-security.html", label: "canada.ca/OAS" },
    relatedHref: null,
  },
  {
    id: "ccb",
    name: "CCB",
    nameFull: "Canada Child Benefit (max per child)",
    value: "$7,787 (0-5 yrs) / $6,570 (6-17 yrs)",
    cumulative: "Tax-free; income-tested phase-out from family income $36,502",
    note: "Auto-paid monthly to qualifying families with children under 18. Newcomers eligible from arrival (with SIN for child). File T1 + RC66 to register.",
    source: { url: "https://www.canada.ca/en/revenue-agency/services/child-family-benefits/canada-child-benefit-overview.html", label: "canada.ca/CCB" },
    relatedHref: null,
  },
  {
    id: "gst-credit",
    name: "GST/HST credit",
    nameFull: "GST/HST tax-free quarterly credit",
    value: "$535 single / $698 couple",
    cumulative: "+$184 per child under 19",
    note: "Tax-free quarterly payment for low/mid-income individuals/families. Auto-calculated from T1 — file even with $0 income to qualify.",
    source: { url: "https://www.canada.ca/en/revenue-agency/services/child-family-benefits/goods-services-tax-harmonized-sales-tax-gsthst-credit.html", label: "canada.ca/GST-credit" },
    relatedHref: null,
  },
  {
    id: "tfsa-buffer-rrsp",
    name: "RRSP over-contribution buffer",
    nameFull: "Lifetime tolerance before 1%/month penalty",
    value: "$2,000",
    cumulative: "Lifetime, applied automatically",
    note: "Не intentional extra room — це safety net для accidental over-contribution (e.g. employer + personal at year-end). Buffer не earns deduction; deduction available тільки коли room opens up.",
    source: { url: "https://www.canada.ca/en/revenue-agency/services/tax/individuals/topics/rrsps-related-plans/contributing-a-rrsp-prpp/excess-contributions.html", label: "canada.ca/RRSP-over" },
    relatedHref: null,
  },
  {
    id: "t1135",
    name: "T1135 threshold",
    nameFull: "Foreign Income Verification Statement",
    value: "$100,000 CAD",
    cumulative: "Combined cost of foreign assets at ANY point during year",
    note: "Mandatory filing if foreign assets (Ukrainian apartment, US-broker stocks, foreign bank accounts) sum > $100K cost basis (not market value). Penalty $25/day, max $2,500/year.",
    source: { url: "https://www.canada.ca/en/revenue-agency/services/forms-publications/forms/t1135.html", label: "canada.ca/T1135" },
    relatedHref: "/blog/t1135-foreign-property-newcomer",
    relatedLabel: "T1135 повний гайд",
  },
];

const COPY = {
  uk: {
    titleMeta: "CRA ліміти 2026: TFSA, RRSP, FHSA, RESP, HBP, LCGE, CPP — повний довідник",
    descriptionMeta:
      "Усі 2026 ліміти CRA в одному місці: TFSA $7K, RRSP $33,810, FHSA $8K/$40K lifetime, RESP $50K, HBP $60K, LCGE ≈$1.27M, CPP YMPE $73,200. Кожна цифра — з canada.ca source.",
    crumbThis: "CRA ліміти 2026",
    eyebrow: "Reference · 2026",
    title: "CRA ліміти 2026 — повний довідник",
    sub: "Усі релевантні цифри Canada Revenue Agency на 2026 рік в одному місці. Source-attributed з canada.ca. Оновлено: 2026-05-29 (Bank of Canada, CRA Indexation Adjustment).",
    intro: "Цей довідник agreguje 13 найважливіших CRA-цифр 2026: contribution rooms, lifetime maxima, government benefit thresholds, foreign-asset reporting trigger. Кожна цифра підтверджена джерелом з canada.ca. Сторінка оновлюється щорічно у січні після CRA Indexation Adjustment announcement.",
    valueLabel: "2026 значення",
    detailLabel: "Деталь",
    sourceLabel: "Джерело",
    relatedLabel: "Пов'язано",
    footerNote: "Цифри підтверджені на 2026-05-29. CRA публікує annual indexation adjustments у грудні-січні; ця сторінка оновлюється у січні. Для актуальної інформації перевір canada.ca напряму.",
    faqHeading: "Часті питання про ліміти 2026",
    faq: [
      { q: "Який ліміт TFSA на 2026 рік?", a: "Річний ліміт TFSA у 2026 — $7,000. Cumulative room для людини, яка була tax-resident з 2009, становить близько $109,000. Newcomer накопичує room з року отримання tax-resident status; невикористана room переноситься без обмежень." },
      { q: "Який ліміт RRSP на 2026 рік?", a: "18% earned income попереднього року, максимум $33,810 у 2026, мінус pension adjustment. Точна цифра — у рядку «RRSP Deduction Limit» твого Notice of Assessment. Є lifetime буфер $2,000 на випадок випадкового over-contribution без penalty." },
      { q: "Який ліміт FHSA і чи можна поєднати з HBP?", a: "FHSA — $8,000 на рік, $40,000 lifetime. З 2023 року FHSA можна поєднати з Home Buyers' Plan ($60,000 з RRSP) для тієї ж першої покупки — разом до $100,000 на down payment для однієї особи." },
      { q: "Скільки можна зняти через Home Buyers' Plan (HBP) у 2026?", a: "До $60,000 з власного RRSP на купівлю першого дому, з поверненням протягом 15 років. Пара може зняти по $60,000 кожен. У поєднанні з FHSA ($40K) одна особа отримує до $100K tax-advantaged коштів на down payment." },
      { q: "Що таке CPP YMPE на 2026 і скільки платить self-employed?", a: "YMPE (Year's Maximum Pensionable Earnings) у 2026 — $73,200, плюс другий рівень YAMPE $83,200 (CPP2). Self-employed платить обидві частини: 11.9% до YMPE і додатково 4% (CPP2) на earnings між YMPE та YAMPE." },
      { q: "Коли треба подавати форму T1135?", a: "Якщо сукупна вартість (cost basis, не market value) закордонних активів — квартира в Україні, акції в US-брокера, іноземні рахунки — перевищує $100,000 CAD у будь-який момент року. Штраф — $25/день, максимум $2,500/рік." },
    ],
  },
  ru: {
    titleMeta: "CRA лимиты 2026: TFSA, RRSP, FHSA, RESP, HBP, LCGE, CPP — полный справочник",
    descriptionMeta:
      "Все 2026 лимиты CRA в одном месте: TFSA $7K, RRSP $33,810, FHSA $8K/$40K, RESP $50K, HBP $60K, LCGE ≈$1.27M, CPP YMPE $73,200. Каждая цифра — с canada.ca.",
    crumbThis: "CRA лимиты 2026",
    eyebrow: "Reference · 2026",
    title: "CRA лимиты 2026 — полный справочник",
    sub: "Все релевантные цифры Canada Revenue Agency на 2026 год в одном месте. Source-attributed с canada.ca. Обновлено: 2026-05-29.",
    intro: "Этот справочник агрегирует 13 важнейших CRA-цифр 2026: contribution rooms, lifetime maxima, government benefit thresholds, foreign-asset reporting trigger. Каждая цифра подтверждена источником с canada.ca.",
    valueLabel: "2026 значение",
    detailLabel: "Детали",
    sourceLabel: "Источник",
    relatedLabel: "Связано",
    footerNote: "Цифры подтверждены на 2026-05-29. CRA публикует annual indexation adjustments в декабре-январе; страница обновляется в январе.",
    faqHeading: "Частые вопросы о лимитах 2026",
    faq: [
      { q: "Какой лимит TFSA на 2026 год?", a: "Годовой лимит TFSA в 2026 — $7,000. Cumulative room для человека, бывшего tax-resident с 2009, составляет около $109,000. Newcomer накапливает room с года получения tax-resident status; неиспользованная room переносится без ограничений." },
      { q: "Какой лимит RRSP на 2026 год?", a: "18% earned income предыдущего года, максимум $33,810 в 2026, минус pension adjustment. Точная цифра — в строке «RRSP Deduction Limit» твоего Notice of Assessment. Есть lifetime буфер $2,000 на случай случайного over-contribution без penalty." },
      { q: "Какой лимит FHSA и можно ли совместить с HBP?", a: "FHSA — $8,000 в год, $40,000 lifetime. С 2023 года FHSA можно совместить с Home Buyers' Plan ($60,000 из RRSP) для одной покупки первого дома — вместе до $100,000 на down payment для одного человека." },
      { q: "Сколько можно снять через Home Buyers' Plan (HBP) в 2026?", a: "До $60,000 из своего RRSP на покупку первого дома, с возвратом в течение 15 лет. Пара может снять по $60,000 каждый. В сочетании с FHSA ($40K) один человек получает до $100K tax-advantaged средств на down payment." },
      { q: "Что такое CPP YMPE на 2026 и сколько платит self-employed?", a: "YMPE (Year's Maximum Pensionable Earnings) в 2026 — $73,200, плюс второй уровень YAMPE $83,200 (CPP2). Self-employed платит обе части: 11.9% до YMPE и дополнительно 4% (CPP2) на earnings между YMPE и YAMPE." },
      { q: "Когда нужно подавать форму T1135?", a: "Если совокупная стоимость (cost basis, не market value) зарубежных активов — квартира в Украине, акции у US-брокера, иностранные счета — превышает $100,000 CAD в любой момент года. Штраф — $25/день, максимум $2,500/год." },
    ],
  },
  en: {
    titleMeta: "CRA Limits 2026: TFSA, RRSP, FHSA, RESP, HBP, LCGE, CPP — full reference",
    descriptionMeta:
      "All 2026 CRA limits in one place: TFSA $7K, RRSP $33,810, FHSA $8K/$40K lifetime, RESP $50K, HBP $60K, LCGE ≈$1.27M, CPP YMPE $73,200. Every number sourced to canada.ca.",
    crumbThis: "CRA Limits 2026",
    eyebrow: "Reference · 2026",
    title: "Canadian Tax Limits 2026 — full reference",
    sub: "Every relevant CRA figure for 2026 in one place. Source-attributed to canada.ca. Last updated: 2026-05-29.",
    intro: "This reference aggregates the 13 most important 2026 CRA numbers: contribution rooms, lifetime maxima, government benefit thresholds, foreign-asset reporting trigger. Each figure is sourced to canada.ca. Page updates annually in January after CRA Indexation Adjustment announcement.",
    valueLabel: "2026 value",
    detailLabel: "Detail",
    sourceLabel: "Source",
    relatedLabel: "Related",
    footerNote: "Figures confirmed as of 2026-05-29. CRA publishes annual indexation adjustments in December-January; this page updates in January. For current authority, verify at canada.ca directly.",
    faqHeading: "Frequently asked questions about 2026 limits",
    faq: [
      { q: "What is the 2026 TFSA contribution limit?", a: "The 2026 annual TFSA limit is $7,000. Cumulative room for someone who has been a tax resident since 2009 is about $109,000. Newcomers accrue room from the year they become a tax resident; unused room carries forward indefinitely." },
      { q: "What is the 2026 RRSP contribution limit?", a: "18% of prior-year earned income, up to a maximum of $33,810 in 2026, minus any pension adjustment. Your exact figure is on the \"RRSP Deduction Limit\" line of your Notice of Assessment. A $2,000 lifetime buffer covers accidental over-contributions without penalty." },
      { q: "What is the FHSA limit, and can it be combined with the HBP?", a: "FHSA is $8,000 per year, $40,000 lifetime. Since 2023 you can combine an FHSA withdrawal with the Home Buyers' Plan ($60,000 from an RRSP) for the same first-home purchase — up to $100,000 toward a down payment for one person." },
      { q: "How much can I withdraw under the Home Buyers' Plan (HBP) in 2026?", a: "Up to $60,000 from your own RRSP for a first home, repaid over 15 years. A couple can each withdraw $60,000. Combined with an FHSA ($40K), one person can access up to $100K in tax-advantaged down-payment funds." },
      { q: "What is the 2026 CPP YMPE, and how much do the self-employed pay?", a: "The 2026 YMPE (Year's Maximum Pensionable Earnings) is $73,200, plus a second tier, YAMPE, at $83,200 (CPP2). The self-employed pay both halves: 11.9% up to YMPE and an extra 4% (CPP2) on earnings between YMPE and YAMPE." },
      { q: "When do I need to file Form T1135?", a: "When the total cost basis (not market value) of your foreign assets — a Ukrainian apartment, US-broker stocks, foreign accounts — exceeds $100,000 CAD at any point in the year. The penalty is $25/day, up to $2,500/year." },
    ],
  },
};

export async function generateStaticParams() {
  return SUPPORTED_LOCALES.map((locale) => ({ locale }));
}

export async function generateMetadata({ params }) {
  const { locale } = await params;
  const c = COPY[locale] || COPY.uk;
  const path = `/${locale}/cra-limits-2026`;
  const alternates = Object.fromEntries(
    SUPPORTED_LOCALES.map((l) => [{ uk: "uk", ru: "ru", en: "en-CA" }[l], `/${l}/cra-limits-2026`]),
  );
  alternates["x-default"] = "/uk/cra-limits-2026";
  return {
    title: c.titleMeta,
    description: c.descriptionMeta,
    alternates: { canonical: path, languages: alternates },
    openGraph: { title: c.titleMeta, description: c.descriptionMeta, url: `https://sky-fort.ca${path}`, type: "article" },
    twitter: { card: "summary_large_image", title: c.titleMeta, description: c.descriptionMeta },
  };
}

function buildJsonLd(locale, c, path) {
  return {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: c.titleMeta,
    description: c.descriptionMeta,
    inLanguage: { uk: "uk", ru: "ru", en: "en-CA" }[locale],
    datePublished: "2026-01-15",
    dateModified: "2026-05-29",
    author: {
      "@type": "Person",
      name: "Andrii Andriushchenko",
      jobTitle: "Licensed Dealing Representative",
      identifier: "NRD 4575551",
      url: `https://sky-fort.ca/${locale}/author/andrii`,
    },
    publisher: { "@type": "FinancialService", name: "SkyFort Wealth", url: "https://sky-fort.ca" },
    mainEntityOfPage: { "@type": "WebPage", "@id": `https://sky-fort.ca${path}` },
    keywords: "TFSA 2026, RRSP 2026, FHSA 2026, RESP 2026, HBP 2026, LCGE 2026, CPP YMPE 2026, OAS 2026, CCB 2026, GST credit 2026, T1135 threshold, CRA limits 2026",
  };
}

export default async function CraLimits2026Page({ params }) {
  const { locale } = await params;
  const c = COPY[locale] || COPY.uk;
  const path = `/${locale}/cra-limits-2026`;
  const jsonLd = buildJsonLd(locale, c, path);

  return (
    <main id="main" className="min-h-screen bg-[var(--color-bg)] text-white">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      <header className="pt-8 pb-4 px-6">
        <div className="mx-auto max-w-5xl flex items-center justify-between">
          <Link href={`/${locale}`} aria-label="SkyFort home"><Logo variant="full" size="md" /></Link>
          <LangSwitcher />
        </div>
      </header>

      <section className="px-6 pt-4 pb-10">
        <div className="mx-auto max-w-3xl">
          <Breadcrumbs items={[{ label: locale === "ru" ? "Главная" : locale === "en" ? "Home" : "Головна", href: `/${locale}` }, { label: c.crumbThis }]} />
          <div className="mt-6">
            <UpdatedBadge date="2026-05-29" locale={locale} />
          </div>
          <p className="mt-4 text-xs font-bold uppercase tracking-[0.18em] text-[var(--color-brand)]">{c.eyebrow}</p>
          <h1 className="mt-3 text-3xl sm:text-4xl font-extrabold leading-tight">{c.title}</h1>
          <p className="mt-4 text-lg text-white/75">{c.sub}</p>
          <p className="mt-3 text-base text-white/65 leading-relaxed">{c.intro}</p>
        </div>
        <div className="mx-auto max-w-3xl mt-6">
          <AuthorByline locale={locale} />
        </div>
      </section>

      <section className="px-6 pb-16">
        <div className="mx-auto max-w-3xl space-y-4">
          {LIMITS.map((l) => (
            <article key={l.id} id={l.id} className="rounded-2xl border border-white/10 bg-white/[0.03] p-6">
              <div className="flex items-start justify-between gap-4 flex-wrap">
                <div className="min-w-0 flex-1">
                  <h2 className="text-xl sm:text-2xl font-bold text-white">{l.name}</h2>
                  <p className="text-xs text-white/55 mt-0.5">{l.nameFull}</p>
                </div>
                <div className="text-right">
                  <p className="text-[10px] font-bold uppercase tracking-wider text-[var(--color-brand)]">{c.valueLabel}</p>
                  <p className="text-xl sm:text-2xl font-mono font-extrabold text-[var(--color-brand)] mt-0.5">{l.value}</p>
                </div>
              </div>
              {l.cumulative && (
                <p className="mt-2 text-sm text-white/75">
                  <span className="font-semibold text-white/85">→</span> {l.cumulative}
                </p>
              )}
              <p className="mt-3 text-sm text-white/75 leading-relaxed">{l.note}</p>
              <div className="mt-4 flex flex-wrap gap-4 text-xs">
                <a href={l.source.url} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1.5 font-semibold text-white/60 transition-colors duration-150 ease-[var(--ease-out)] hover:text-[var(--color-brand)]">
                  <ExternalLink size={12} aria-hidden="true" />
                  {c.sourceLabel}: {l.source.label}
                </a>
                {l.relatedHref && (
                  <Link href={`/${locale}${l.relatedHref}`} className="font-semibold text-[var(--color-brand)] transition-colors duration-150 ease-[var(--ease-out)] hover:text-[var(--color-brand-hover)]">
                    {c.relatedLabel}: {l.relatedLabel} →
                  </Link>
                )}
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* AEO/GEO: visible FAQ accordion + matching FAQPage JSON-LD. Targets the
          January-peak intent queries ("TFSA limit 2026", "RRSP max 2026",
          "FHSA limit") that AI Overviews + Perplexity answer from FAQPage data.
          Answers mirror the sourced LIMITS rows above — no new claims. */}
      <StaticFaq
        faq={c.faq}
        heading={c.faqHeading}
        jsonLdId={`https://sky-fort.ca${path}#faq`}
      />

      <section className="px-6 pb-20">
        <div className="mx-auto max-w-3xl">
          <div className="rounded-2xl border border-white/10 bg-white/[0.02] p-5">
            <p className="flex items-start gap-2 text-xs text-white/55 leading-relaxed">
              <Calendar size={14} className="mt-0.5 flex-shrink-0" aria-hidden="true" />
              <span>{c.footerNote}</span>
            </p>
          </div>
        </div>
      </section>
    </main>
  );
}
