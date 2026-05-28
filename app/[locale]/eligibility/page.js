// app/[locale]/eligibility/page.js
// Server wrapper for the Eligible Investor self-check quiz (audit 3.3).
// Owns metadata + JSON-LD + page shell; the interactive quiz lives in
// quiz.jsx as a client component.

import Link from "next/link";
import Logo from "../../_components/Logo";
import Breadcrumbs from "../../_components/Breadcrumbs";
import LangSwitcher from "../../_components/LangSwitcher";
import EligibilityQuiz from "./quiz";
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

export async function generateStaticParams() {
  return SUPPORTED_LOCALES.map((locale) => ({ locale }));
}

export async function generateMetadata({ params }) {
  const { locale } = await params;
  const m = META[locale] || META.uk;
  const path = `/${locale}/eligibility`;
  const alternates = Object.fromEntries(
    SUPPORTED_LOCALES.map((l) => [
      { uk: "uk-UA", ru: "ru-RU", en: "en-CA" }[l],
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
      inLanguage: { uk: "uk-UA", ru: "ru-RU", en: "en-CA" }[locale],
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
      </div>

      <EligibilityQuiz locale={locale} />
    </main>
  );
}
