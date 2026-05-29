// app/[locale]/calculators/mpc-vs-sole-proprietor/page.js
// MPC vs Sole Proprietor calculator for Canadian physicians.
// Inputs: gross practice income, province, lifestyle salary needed,
// estimated practice expenses. Outputs: tax + CPP under both scenarios
// + capital remaining inside MPC for tax-deferred accumulation.

import MpcCalculator from "./calculator";
import StaticFaq from "../../../_components/StaticFaq";
import RelatedLinks from "../../../_components/RelatedLinks";
import AuthorByline from "../../../_components/AuthorByline";
import { SUPPORTED_LOCALES } from "../../../_i18n/dictionary";

const META = {
  uk: {
    title: "MPC vs Sole Proprietor калькулятор для лікарів",
    description:
      "Family physician з $300K gross: різниця $30-50K/рік податку через MPC. Точна математика salary/dividend split + tax-deferred capital у corporation.",
  },
  ru: {
    title: "MPC vs Sole Proprietor калькулятор для врачей",
    description:
      "Family physician с $300K gross: разница $30-50K/год налога через MPC. Точная математика salary/dividend split + tax-deferred capital в корпорации.",
  },
  en: {
    title: "MPC vs Sole Proprietor calculator for physicians",
    description:
      "Family physician at $300K gross: $30-50K/year tax difference via MPC. Exact math of salary/dividend split + tax-deferred capital inside the corporation.",
  },
};

const FAQ = {
  uk: [
    {
      q: "Що ця калькуляція не враховує?",
      a: "Setup costs ($2-3K legal + $1-2K annual MPC accounting), GST/HST на non-insured services, IPP можливості (40+ років), Holdco структури, spouse-as-shareholder в AB/BC, провінційні surtaxes. Це estimation для baseline decision — для personal налаштування discovery call з Licensed DR (NRD #4575551) + medical-specialized CPA.",
    },
    {
      q: "Як обчислюється «capital у MPC»?",
      a: "Net practice income MINUS salary paid out MINUS dividend paid out MINUS corporate tax (SBD 11% effective у AB на перші $500K). Це гроші, що ростуть tax-deferred всередині corporation. На 6% growth × 20 років ця accumulation типово стає $2-4M.",
    },
    {
      q: "Чому salary до CPP-max ($73,200 у 2026), а не вище/нижче?",
      a: "Salary > CPP-max не earns extra CPP benefit (cap reached), але додає personal income tax + CPP cost. Salary < CPP-max втрачає RRSP room generation (18% × salary) + maternity leave eligibility + disability coverage. $73,200 — sweet spot для більшості physicians.",
    },
    {
      q: "Чи цей калькулятор для Ontario / BC?",
      a: "Так — обери провінцію у dropdown. AB, BC, ON brackets включені. Ontario має слабшу spouse-shareholder опцію (TOSI restriction) — це обмежує income splitting, але tax math сам по собі коректний.",
    },
    {
      q: "Коли incorporate — рік 1 чи рік 2-3 practice?",
      a: "Standard recommendation: рік 2-3, коли practice стабілізована і net income > $200K. Incorporation cost (~$3K) має payback < 12 місяців при цьому income. У рік 1 типово net < $200K через student loan repayments + setup costs — payback довший. Виняток: high-earning specialist (e.g. radiologist) може incorporate раніше.",
    },
  ],
  ru: [
    {
      q: "Что калькуляция не учитывает?",
      a: "Setup costs ($2-3K legal + $1-2K annual), GST/HST, IPP (40+ лет), Holdco, spouse-as-shareholder в AB/BC, surtaxes. Estimation для baseline decision.",
    },
    {
      q: "Как считается «capital в MPC»?",
      a: "Net income - salary - dividend - corporate tax. Растёт tax-deferred. За 20 лет при 6% = $2-4M.",
    },
    {
      q: "Почему salary до CPP-max?",
      a: "Salary > CPP-max не earns extra CPP benefit. Salary < теряет RRSP room. $73,200 — sweet spot.",
    },
    {
      q: "Калькулятор для Ontario / BC?",
      a: "Да — выбери провинцию. AB, BC, ON brackets включены. Ontario имеет более слабую spouse-shareholder опцию.",
    },
    {
      q: "Когда incorporate?",
      a: "Рекомендация: год 2-3 practice, когда net > $200K. Payback < 12 мес.",
    },
  ],
  en: [
    {
      q: "What does this calculation NOT account for?",
      a: "Setup costs ($2-3K legal + $1-2K annual MPC accounting), GST/HST on non-insured services, IPP eligibility (40+), Holdco structures, spouse-as-shareholder in AB/BC, provincial surtaxes. This is a baseline-decision estimation — for individual setup book a discovery call with a Licensed DR (NRD #4575551) + medical-specialized CPA.",
    },
    {
      q: "How is 'capital in MPC' calculated?",
      a: "Net practice income MINUS salary paid out MINUS dividend paid out MINUS corporate tax (SBD ~11% effective in AB on first $500K). Money that grows tax-deferred inside the corporation. At 6% growth over 20 years this typically reaches $2-4M.",
    },
    {
      q: "Why salary to CPP-max ($73,200 in 2026)?",
      a: "Salary above CPP-max earns no extra CPP benefit (cap reached) but adds personal tax + CPP cost. Salary below CPP-max loses RRSP room (18% × salary) + maternity leave eligibility + disability coverage. $73,200 is the sweet spot for most physicians.",
    },
    {
      q: "Does this work for Ontario / BC?",
      a: "Yes — choose province in the dropdown. AB, BC, ON brackets included. Ontario has a weaker spouse-shareholder option (TOSI restriction), limiting income splitting, but the tax math itself is correct.",
    },
    {
      q: "When to incorporate — year 1 or year 2-3 of practice?",
      a: "Standard: year 2-3, when practice is stabilized and net income > $200K. Incorporation cost (~$3K) pays back in <12 months at this income. Year 1 typically nets < $200K due to student loans + setup costs — longer payback. Exception: high-earning specialists (e.g. radiology) may incorporate sooner.",
    },
  ],
};

const RELATED = {
  uk: {
    heading: "Пов'язані матеріали",
    items: [
      { href: "/uk/dlya-mediks", label: "Гайд для лікарів у Канаді", description: "MPC, IPP, Holdco — 10-річний roadmap." },
      { href: "/uk/blog/mpc-vs-sole-proprietor-likari-koly-incorporate", label: "Блог: MPC vs sole proprietor", description: "Глибокий розбір з 10-річним прикладом." },
      { href: "/uk/case-studies/mediks-mpc-incorporation-timeline", label: "Кейс: family physician + MPC", description: "Композитна ілюстрація з конкретними цифрами." },
      { href: "/uk/eligibility", label: "Eligible Investor self-check", description: "Чи відкривається exempt market через MPC." },
    ],
  },
  ru: {
    heading: "Связанные материалы",
    items: [
      { href: "/ru/dlya-mediks", label: "Гайд для врачей в Канаде", description: "MPC, IPP, Holdco — 10-летний roadmap." },
      { href: "/ru/blog/mpc-vs-sole-proprietor-likari-koly-incorporate", label: "Блог: MPC vs sole proprietor", description: "Глубокий разбор с 10-летним примером." },
      { href: "/ru/case-studies/mediks-mpc-incorporation-timeline", label: "Кейс: family physician + MPC", description: "Композитная иллюстрация." },
      { href: "/ru/eligibility", label: "Eligible Investor self-check", description: "Открывается ли exempt market через MPC." },
    ],
  },
  en: {
    heading: "Related",
    items: [
      { href: "/en/dlya-mediks", label: "Physician financial guide", description: "MPC, IPP, Holdco — 10-year roadmap." },
      { href: "/en/blog/mpc-vs-sole-proprietor-likari-koly-incorporate", label: "Blog: MPC vs sole proprietor", description: "Deep dive with 10-year example." },
      { href: "/en/case-studies/mediks-mpc-incorporation-timeline", label: "Case: family physician + MPC", description: "Composite illustration with concrete numbers." },
      { href: "/en/eligibility", label: "Eligible Investor self-check", description: "Does exempt market open up via MPC." },
    ],
  },
};

export async function generateStaticParams() {
  return SUPPORTED_LOCALES.map((locale) => ({ locale }));
}

export async function generateMetadata({ params }) {
  const { locale } = await params;
  const m = META[locale] || META.uk;
  const path = `/${locale}/calculators/mpc-vs-sole-proprietor`;
  const alternates = Object.fromEntries(
    SUPPORTED_LOCALES.map((l) => [{ uk: "uk", ru: "ru", en: "en-CA" }[l], `/${l}/calculators/mpc-vs-sole-proprietor`]),
  );
  alternates["x-default"] = "/uk/calculators/mpc-vs-sole-proprietor";
  return {
    title: m.title,
    description: m.description,
    alternates: { canonical: path, languages: alternates },
    openGraph: { title: m.title, description: m.description, url: `https://sky-fort.ca${path}`, type: "website" },
    twitter: { card: "summary_large_image", title: m.title, description: m.description },
  };
}

export default async function MpcCalcPage({ params }) {
  const { locale } = await params;
  const faq = FAQ[locale] || FAQ.uk;
  const rel = RELATED[locale] || RELATED.uk;
  const path = `/${locale}/calculators/mpc-vs-sole-proprietor`;

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    name: META[locale]?.title || META.uk.title,
    description: META[locale]?.description || META.uk.description,
    url: `https://sky-fort.ca${path}`,
    applicationCategory: "FinanceApplication",
    operatingSystem: "Any",
    offers: { "@type": "Offer", price: "0", priceCurrency: "CAD" },
    datePublished: "2026-05-28",
    dateModified: "2026-05-28",
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
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <div className="mx-auto max-w-5xl px-6 pt-10 pb-8">
        <AuthorByline locale={locale} className="mb-6" />
      </div>
      <MpcCalculator locale={locale} />
      <RelatedLinks heading={rel.heading} items={rel.items} />
      <StaticFaq faq={faq} heading={locale === "ru" ? "Частые вопросы" : locale === "en" ? "FAQ" : "Часті питання"} jsonLdId={`https://sky-fort.ca${path}#faq`} />
    </main>
  );
}
