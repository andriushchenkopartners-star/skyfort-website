// app/[locale]/eligibility/page.js
// Server wrapper for the Eligible Investor self-check quiz (audit 3.3).
// Owns metadata + JSON-LD + page shell; the interactive quiz lives in
// quiz.jsx as a client component.

import Link from "next/link";
import Logo from "../../_components/Logo";
import Breadcrumbs from "../../_components/Breadcrumbs";
import LangSwitcher from "../../_components/LangSwitcher";
import EligibilityQuiz from "./quiz";
import AuthorByline from "../../_components/AuthorByline";
import { SUPPORTED_LOCALES } from "../../_i18n/dictionary";

const NRD_URL =
  "https://info.securities-administrators.ca/nrsmobile/nrssearch.aspx";

const META = {
  uk: {
    title: "Чи ти Eligible Investor? Self-check за NI 45-106",
    description:
      "60-секундний self-check: чи кваліфікуєшся ти як Eligible / Accredited Investor у Канаді за фінансовими тестами NI 45-106. Освітньо. NRD #4575551.",
    crumbHome: "Головна",
    crumbThis: "Self-check",
  },
  ru: {
    title: "Ты Eligible Investor? Self-check по NI 45-106",
    description:
      "60-секундный self-check: квалифицируешься ли ты как Eligible / Accredited Investor в Канаде по финансовым тестам NI 45-106. Образовательно. NRD #4575551.",
    crumbHome: "Главная",
    crumbThis: "Self-check",
  },
  en: {
    title: "Are you an Eligible Investor? NI 45-106 self-check",
    description:
      "60-second self-check: do you qualify as an Eligible / Accredited Investor in Canada under NI 45-106 financial tests? Educational. NRD #4575551.",
    crumbHome: "Home",
    crumbThis: "Self-check",
  },
};

// SSR/AI-crawler fallback — the interactive quiz lives in quiz.jsx (client
// component) and the actual 4 questions only appear after user clicks "Start".
// AI crawlers (GPTBot, ClaudeBot, PerplexityBot) typically don't execute JS,
// so they'd only see the intro + Start button.
//
// To make the page extraction-ready, we mirror the question content as a
// static <details>/<summary> block server-side below the interactive widget.
// Same NI 45-106 §1.1 thresholds, same option ranges, same disclaimer. No
// JavaScript required to read this block. Caught by the 3rd re-audit (1.7).
const QUIZ_PREVIEW = {
  uk: {
    heading: "Питання у текстовому вигляді",
    intro:
      "Усі 4 quiz-питання нижче доступні без JavaScript — для screen readers, AI-індексаторів, або якщо ти просто хочеш переглянути зміст перш ніж починати.",
    questions: [
      { n: 1, q: "Особистий валовий дохід — останні 2 роки + очікуваний у цьому році", opts: "до $75K · $75-125K · $125-200K · $200-300K · понад $300K" },
      { n: 2, q: "Сімейний дохід (твій + чоловіка/дружини), останні 2 роки", opts: "не застосовно · до $125K · $125-250K · $250-300K · понад $300K" },
      { n: 3, q: "Чисті фінансові активи (готівка + інвестиції), без primary residence", opts: "до $100K · $100-400K · $400K-1M · понад $1M" },
      { n: 4, q: "Загальна чиста вартість (усе що володієш мінус усе що винен)", opts: "до $500K · $500K-1M · $1M-5M · понад $5M" },
    ],
    legalTitle: "Регуляторні тести (CSA NI 45-106 §1.1)",
    legal: "Accredited Investor — будь-який з: дохід >$200K solo або >$300K household обидва роки; net financial assets >$1M; net total assets >$5M. Eligible Investor — будь-який з: дохід >$75K solo або >$125K household обидва роки; net assets >$400K (без primary residence). Жоден з цих тестів — пройшов Non-Eligible, що нормально для більшості новоприбулих.",
    disclaimer: "Це освітній self-check на основі фінансових порогів NI 45-106 §1.1, а не legal opinion. Формальна Eligible / Accredited Investor классифікація підтверджується лише через KYC + Suitability Assessment із зареєстрованим Dealing Representative.",
  },
  ru: {
    heading: "Вопросы в текстовом виде",
    intro:
      "Все 4 quiz-вопроса ниже доступны без JavaScript — для screen readers, AI-индексаторов, или если ты просто хочешь посмотреть содержание перед тем как начать.",
    questions: [
      { n: 1, q: "Личный валовый доход — последние 2 года + ожидаемый в этом году", opts: "до $75K · $75-125K · $125-200K · $200-300K · свыше $300K" },
      { n: 2, q: "Семейный доход (твой + мужа/жены), последние 2 года", opts: "не применимо · до $125K · $125-250K · $250-300K · свыше $300K" },
      { n: 3, q: "Чистые финансовые активы (наличные + инвестиции), без primary residence", opts: "до $100K · $100-400K · $400K-1M · свыше $1M" },
      { n: 4, q: "Общая чистая стоимость (всё что владеешь минус всё что должен)", opts: "до $500K · $500K-1M · $1M-5M · свыше $5M" },
    ],
    legalTitle: "Регуляторные тесты (CSA NI 45-106 §1.1)",
    legal: "Accredited Investor — любой из: доход >$200K solo или >$300K household оба года; net financial assets >$1M; net total assets >$5M. Eligible Investor — любой из: доход >$75K solo или >$125K household оба года; net assets >$400K (без primary residence). Ни один из этих тестов — Non-Eligible, что нормально для большинства новоприбывших.",
    disclaimer: "Это образовательный self-check на основе финансовых порогов NI 45-106 §1.1, а не legal opinion. Формальная Eligible / Accredited Investor классификация подтверждается только через KYC + Suitability Assessment с зарегистрированным Dealing Representative.",
  },
  en: {
    heading: "Questions in plain text",
    intro:
      "All 4 quiz questions are available below without JavaScript — for screen readers, AI crawlers, or if you just want to review the content before starting.",
    questions: [
      { n: 1, q: "Personal gross income — each of the last 2 years + expected this year", opts: "under $75K · $75-125K · $125-200K · $200-300K · over $300K" },
      { n: 2, q: "Household income (you + spouse), each of the last 2 years", opts: "not applicable · under $125K · $125-250K · $250-300K · over $300K" },
      { n: 3, q: "Net financial assets (cash + investments), excluding primary residence", opts: "under $100K · $100-400K · $400K-1M · over $1M" },
      { n: 4, q: "Total net worth (everything you own minus everything you owe)", opts: "under $500K · $500K-1M · $1M-5M · over $5M" },
    ],
    legalTitle: "Regulatory tests (CSA NI 45-106 §1.1)",
    legal: "Accredited Investor — any of: income >$200K solo or >$300K household in both years; net financial assets >$1M; net total assets >$5M. Eligible Investor — any of: income >$75K solo or >$125K household in both years; net assets >$400K (excluding primary residence). Neither test met — Non-Eligible, which is normal for most newcomers.",
    disclaimer: "This is an educational self-check based on NI 45-106 §1.1 financial thresholds, not a legal opinion. Formal Eligible / Accredited Investor classification is confirmed only via KYC + Suitability Assessment with a registered Dealing Representative.",
  },
};

export async function generateStaticParams() {
  return SUPPORTED_LOCALES.map((locale) => ({ locale }));
}

export async function generateMetadata({ params }) {
  const { locale } = await params;
  const m = META[locale] || META.uk;
  const path = `/${locale}/eligibility`;
  const alternates = Object.fromEntries(
    SUPPORTED_LOCALES.map((l) => [
      { uk: "uk", ru: "ru", en: "en-CA" }[l],
      `/${l}/eligibility`,
    ])
  );
  alternates["x-default"] = "/uk/eligibility";
  return {
    title: m.title,
    description: m.description,
    keywords: [
      "Eligible Investor Canada",
      "Accredited Investor Canada",
      "NI 45-106",
      "self-check Eligible Investor",
      "exempt market eligibility",
      "перевір Eligible Investor",
      "квалификация Eligible Investor",
    ],
    alternates: { canonical: path, languages: alternates },
    openGraph: {
      title: m.title,
      description: m.description,
      url: `https://sky-fort.ca${path}`,
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: m.title,
      description: m.description,
    },
  };
}

// WebApplication + Quiz JSON-LD — both surfaces this as a tool to Google.
// Quiz schema isn't a top-tier rich-snippet type yet but doesn't hurt.
const buildJsonLd = (locale) => ({
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebApplication",
      name: "Eligible Investor Self-Check",
      applicationCategory: "FinanceApplication",
      operatingSystem: "Web",
      url: `https://sky-fort.ca/${locale}/eligibility`,
      description:
        "Preliminary NI 45-106 financial-threshold self-check. Educational tool, not legal advice. Provided by a Licensed Dealing Representative.",
      inLanguage: ["uk", "ru", "en"],
      offers: { "@type": "Offer", price: "0", priceCurrency: "CAD" },
      provider: {
        "@type": "FinancialService",
        name: "SkyFort Wealth",
        url: "https://sky-fort.ca",
      },
    },
    {
      "@type": "Quiz",
      name: "Eligible Investor self-check (NI 45-106)",
      about: {
        "@type": "Thing",
        name: "Eligible Investor and Accredited Investor categories under CSA National Instrument 45-106",
      },
      educationalLevel: "Adult education",
      learningResourceType: "Self-assessment",
      inLanguage: { uk: "uk", ru: "ru", en: "en-CA" }[locale],
      provider: {
        "@type": "FinancialService",
        name: "SkyFort Wealth",
        url: "https://sky-fort.ca",
      },
    },
  ],
});

export default async function EligibilityPage({ params }) {
  const { locale } = await params;
  const m = META[locale] || META.uk;
  const jsonLd = buildJsonLd(locale);

  return (
    <main id="main" className="min-h-screen bg-[var(--color-bg)] text-white">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* NAV */}
      <nav className="fixed inset-x-0 top-0 z-50 border-b border-[#2a2a2a] bg-[#191919]/80 backdrop-blur-xl">
        <div className="mx-auto flex max-w-3xl items-center justify-between px-6 py-4">
          <Link href={`/${locale}`}><Logo variant="full" /></Link>
          <LangSwitcher locale={locale} />
        </div>
      </nav>

      <div className="mx-auto max-w-3xl px-6 pt-28">
        <Breadcrumbs
          items={[
            { label: m.crumbHome, href: `/${locale}` },
            { label: m.crumbThis },
          ]}
        />
        <div className="mt-8">
          <AuthorByline locale={locale} />
        </div>
      </div>

      <EligibilityQuiz locale={locale} />

      {/* SSR fallback — full question text indexed by Google + AI crawlers
          even without running the client quiz. */}
      <section className="mx-auto max-w-3xl px-6 pb-20 pt-4">
        <details className="group rounded-2xl border border-[var(--color-border)] bg-[var(--color-bg-card)] open:border-[var(--color-brand)]/30">
          <summary className="cursor-pointer list-none p-6 md:p-7">
            <div className="flex items-center justify-between gap-4">
              <h2 className="font-display text-xl text-white md:text-2xl">
                {(QUIZ_PREVIEW[locale] || QUIZ_PREVIEW.uk).heading}
              </h2>
              <span
                aria-hidden="true"
                className="text-2xl leading-none text-[var(--color-brand)] transition-transform group-open:rotate-45"
              >
                +
              </span>
            </div>
            <p className="mt-3 text-sm leading-relaxed text-[var(--color-fg-muted)]">
              {(QUIZ_PREVIEW[locale] || QUIZ_PREVIEW.uk).intro}
            </p>
          </summary>
          <div className="border-t border-[var(--color-border)] p-6 md:p-8">
            <ol className="space-y-5">
              {(QUIZ_PREVIEW[locale] || QUIZ_PREVIEW.uk).questions.map((q) => (
                <li key={q.n}>
                  <h3 className="text-sm font-bold uppercase tracking-wider text-[var(--color-brand)]">
                    Q{q.n}
                  </h3>
                  <p className="mt-2 font-semibold text-white">{q.q}</p>
                  <p className="mt-2 text-sm text-[var(--color-fg-muted)]">
                    <span className="font-semibold">→</span> {q.opts}
                  </p>
                </li>
              ))}
            </ol>
            <div className="mt-8 rounded-xl border border-[var(--color-border-strong)] bg-[var(--color-bg)] p-5">
              <h3 className="text-xs font-bold uppercase tracking-wider text-[var(--color-fg-subtle)]">
                {(QUIZ_PREVIEW[locale] || QUIZ_PREVIEW.uk).legalTitle}
              </h3>
              <p className="mt-3 text-sm leading-relaxed text-[var(--color-fg-muted)]">
                {(QUIZ_PREVIEW[locale] || QUIZ_PREVIEW.uk).legal}
              </p>
            </div>
            <p className="mt-5 text-xs leading-relaxed text-[var(--color-fg-subtle)]">
              {(QUIZ_PREVIEW[locale] || QUIZ_PREVIEW.uk).disclaimer}
            </p>
          </div>
        </details>
      </section>
    </main>
  );
}
