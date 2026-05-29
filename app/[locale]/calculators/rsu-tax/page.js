// app/[locale]/calculators/rsu-tax/page.js
// RSU vesting tax calculator — landing page wrapper around the interactive
// component. Server component for metadata + JSON-LD; client component
// does the math.
//
// Built per batch 9 plan: natural extension of the /dlya-it-fakhivtsiv
// pillar. Inputs: base salary, RSU vesting amount, province, RRSP
// contribution. Outputs: marginal rate without RRSP, tax with RRSP
// (showing the immediate refund), and net keep on the RSU.

import RsuCalculator from "./calculator";
import StaticFaq from "../../../_components/StaticFaq";
import RelatedLinks from "../../../_components/RelatedLinks";
import AuthorByline from "../../../_components/AuthorByline";
import { SUPPORTED_LOCALES } from "../../../_i18n/dictionary";

const META = {
  uk: {
    title: "RSU Tax калькулятор Канада — повна математика 2026",
    description:
      "Порахуй точну податкову вартість RSU vesting у Канаді (AB/BC/ON) + immediate RRSP refund. Для IT-фахівців з $50K-150K vesting events.",
  },
  ru: {
    title: "RSU Tax калькулятор Канада — полная математика 2026",
    description:
      "Посчитай точную налоговую стоимость RSU vesting в Канаде (AB/BC/ON) + immediate RRSP refund. Для IT-специалистов с $50K-150K vesting events.",
  },
  en: {
    title: "RSU tax calculator Canada — full vesting math 2026",
    description:
      "Calculate the exact tax cost of an RSU vesting event in Canada (AB/BC/ON) + immediate RRSP refund. For tech workers with $50K-150K vesting events.",
  },
};

const FAQ = {
  uk: [
    {
      q: "Як саме оподатковуються RSU у Канаді?",
      a: "У день vesting fair market value vested shares (у CAD за Bank of Canada rate того ж дня) додається до твого T4 employment income і оподатковується по marginal rate. Це означає, що $80K RSU може коштувати тобі $35-45K податку залежно від провінції та твоєї базової зарплати.",
    },
    {
      q: "Чому RRSP так сильно економить податок у рік vesting?",
      a: "Кожен dollar у RRSP знижує твій taxable income на цей dollar. Якщо у тебе $250K total income і ти max RRSP $33,810 — твій topi marginal bracket (де RSU income сидить) знижується. На 47% marginal це дає $14,500 immediate refund при сплаті податків наступного квітня.",
    },
    {
      q: "Чи треба продавати vested shares одразу?",
      a: "Стандартна рекомендація: продай 80% одразу і реінвестуй у broad-market ETF (XEQT, VEQT, VFV). Залиш 20% якщо щиро віриш у компанію. Чому: твоя зарплата вже залежить від цієї компанії — concentration risk у portfolio створює double exposure.",
    },
    {
      q: "Що робити з US-listed RSU?",
      a: "Подай Form W-8BEN твоєму employer (заявляє canadian tax residency, не US person — припиняє 30% US withholding). Конверсія FMV у CAD — за Bank of Canada rate на vesting day. Тримай US shares у RRSP (не TFSA) щоб уникнути 15% US dividend withholding tax (Canada-US treaty exemption тільки для RRSP).",
    },
    {
      q: "Як цей калькулятор обчислює marginal rate?",
      a: "Використовує federal 2026 brackets (15% / 20.5% / 26% / 29% / 33%) плюс provincial brackets для AB (10% flat), BC (5.06-20.5%), Ontario (5.05-13.16%). Не враховує: provincial surtaxes (ON), Quebec abatement, CPP/EI deductions, dividend tax credits. Це estimation на ~95% accuracy для типового scenario.",
    },
  ],
  ru: [
    {
      q: "Как именно облагаются RSU в Канаде?",
      a: "В день vesting fair market value vested shares (в CAD по Bank of Canada rate того же дня) добавляется в T4 employment income и облагается по marginal rate. $80K RSU может стоить $35-45K налога зависимо от провинции и базовой зарплаты.",
    },
    {
      q: "Почему RRSP так сильно экономит налог?",
      a: "Каждый dollar в RRSP снижает taxable income на этот dollar. При $250K total income и max RRSP $33,810 — твой top marginal bracket снижается. На 47% marginal это даёт $14,500 immediate refund.",
    },
    {
      q: "Нужно ли продавать vested shares сразу?",
      a: "Продай 80% сразу и реинвестируй в broad-market ETF (XEQT, VEQT, VFV). Оставь 20% если веришь в компанию. Concentration risk критичен — твоя зарплата уже зависит от компании.",
    },
    {
      q: "Что делать с US-listed RSU?",
      a: "Подай Form W-8BEN твоему employer. Конверсия FMV в CAD — по BoC rate на vesting day. Держи US shares в RRSP (не TFSA) для избежания 15% US dividend withholding.",
    },
    {
      q: "Как калькулятор считает marginal rate?",
      a: "Federal 2026 brackets (15%/20.5%/26%/29%/33%) + provincial для AB (10% flat), BC (5.06-20.5%), Ontario (5.05-13.16%). Не учитывает provincial surtaxes, CPP/EI, dividend tax credits. ~95% accuracy estimation.",
    },
  ],
  en: [
    {
      q: "How exactly are RSUs taxed in Canada?",
      a: "On vesting day, the fair market value of vested shares (in CAD at Bank of Canada rate that day) is added to your T4 employment income and taxed at your marginal rate. An $80K RSU vest can cost you $35-45K in tax depending on province and base salary.",
    },
    {
      q: "Why does RRSP save so much tax in a vesting year?",
      a: "Every dollar contributed to RRSP reduces taxable income by that dollar. At $250K total income with $33,810 max RRSP, your top marginal bracket (where RSU income sits) drops. At 47% marginal that's $14,500 immediate refund.",
    },
    {
      q: "Should I sell vested shares immediately?",
      a: "Standard recommendation: sell 80% immediately and reinvest in a broad-market ETF (XEQT, VEQT, VFV). Hold 20% if you genuinely believe in the company. Why: your salary already depends on this company — concentration risk creates double exposure.",
    },
    {
      q: "What about US-listed RSUs?",
      a: "File Form W-8BEN with your employer (declares Canadian tax residency, not US person — stops 30% US withholding). Convert FMV to CAD at Bank of Canada rate on vesting day. Hold US shares in RRSP (not TFSA) to avoid 15% US dividend withholding (Canada-US treaty exemption is RRSP-only).",
    },
    {
      q: "How does this calculator compute marginal rate?",
      a: "Uses federal 2026 brackets (15% / 20.5% / 26% / 29% / 33%) plus provincial brackets for AB (10% flat), BC (5.06-20.5%), Ontario (5.05-13.16%). Doesn't account for: provincial surtaxes (ON), Quebec abatement, CPP/EI deductions, dividend tax credits. ~95% accuracy for typical scenarios.",
    },
  ],
};

const RELATED = {
  uk: {
    heading: "Пов'язані матеріали",
    items: [
      { href: "/uk/dlya-it-fakhivtsiv", label: "Гайд для IT-фахівців у Канаді", description: "Повний 12-місячний roadmap для $130-300K доходу — RSU, ESPP, RRSP, exempt market." },
      { href: "/uk/blog/rsu-vesting-kanada-podatkova-strategiya", label: "RSU vesting у Канаді: повна математика", description: "Детальний blog пост з RRSP стратегією + US-employer cross-border issues." },
      { href: "/uk/eligibility", label: "Eligible Investor self-check", description: "60 секунд — чи відкривається exempt market для тебе при $200K+ household income." },
      { href: "/uk/calculators/tfsa-growth", label: "TFSA калькулятор", description: "Куди реінвестувати RRSP refund — porównaj scenarios." },
    ],
  },
  ru: {
    heading: "Связанные материалы",
    items: [
      { href: "/ru/dlya-it-fakhivtsiv", label: "Гайд для IT-специалистов в Канаде", description: "Полный 12-месячный roadmap для $130-300K дохода." },
      { href: "/ru/blog/rsu-vesting-kanada-podatkova-strategiya", label: "RSU vesting в Канаде: полная математика", description: "Детальный blog пост с RRSP стратегией + US-employer issues." },
      { href: "/ru/eligibility", label: "Eligible Investor self-check", description: "60 секунд — открывается ли exempt market при $200K+ income." },
      { href: "/ru/calculators/tfsa-growth", label: "TFSA калькулятор", description: "Куда реинвестировать RRSP refund." },
    ],
  },
  en: {
    heading: "Related",
    items: [
      { href: "/en/dlya-it-fakhivtsiv", label: "Tech worker financial guide", description: "Full 12-month roadmap for $130-300K income — RSU, ESPP, RRSP, exempt market." },
      { href: "/en/blog/rsu-vesting-kanada-podatkova-strategiya", label: "RSU vesting in Canada: full math", description: "Detailed blog post with RRSP strategy + US-employer cross-border issues." },
      { href: "/en/eligibility", label: "Eligible Investor self-check", description: "60 seconds — does exempt market open up at $200K+ income." },
      { href: "/en/calculators/tfsa-growth", label: "TFSA calculator", description: "Where to reinvest RRSP refund — compare scenarios." },
    ],
  },
};

export async function generateStaticParams() {
  return SUPPORTED_LOCALES.map((locale) => ({ locale }));
}

export async function generateMetadata({ params }) {
  const { locale } = await params;
  const m = META[locale] || META.uk;
  const path = `/${locale}/calculators/rsu-tax`;
  const alternates = Object.fromEntries(
    SUPPORTED_LOCALES.map((l) => [{ uk: "uk", ru: "ru", en: "en-CA" }[l], `/${l}/calculators/rsu-tax`]),
  );
  alternates["x-default"] = "/uk/calculators/rsu-tax";
  return {
    title: m.title,
    description: m.description,
    alternates: { canonical: path, languages: alternates },
    openGraph: { title: m.title, description: m.description, url: `https://sky-fort.ca${path}`, type: "website" },
    twitter: { card: "summary_large_image", title: m.title, description: m.description },
  };
}

export default async function RsuTaxCalcPage({ params }) {
  const { locale } = await params;
  const faq = FAQ[locale] || FAQ.uk;
  const rel = RELATED[locale] || RELATED.uk;
  const path = `/${locale}/calculators/rsu-tax`;

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    name: META[locale]?.title || META.uk.title,
    description: META[locale]?.description || META.uk.description,
    url: `https://sky-fort.ca${path}`,
    applicationCategory: "FinanceApplication",
    operatingSystem: "Any",
    offers: { "@type": "Offer", price: "0", priceCurrency: "CAD" },
    author: {
      "@type": "Person",
      name: "Andrii Andriushchenko",
      jobTitle: "Licensed Dealing Representative",
      identifier: "NRD 4575551",
      url: `https://sky-fort.ca/${locale}/pro-mene`,
    },
  };

  return (
    <main id="main" className="min-h-screen bg-[var(--color-bg)] text-white">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <div className="mx-auto max-w-5xl px-6 pt-10 pb-8">
        <AuthorByline locale={locale} className="mb-6" />
      </div>
      <RsuCalculator locale={locale} />
      <RelatedLinks heading={rel.heading} items={rel.items} />
      <StaticFaq faq={faq} heading={locale === "ru" ? "Частые вопросы" : locale === "en" ? "FAQ" : "Часті питання"} jsonLdId={`https://sky-fort.ca${path}#faq`} />
    </main>
  );
}
