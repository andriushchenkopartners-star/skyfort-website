import MortgageCalculator from "./calculator";
import { SUPPORTED_LOCALES } from "../../../_i18n/dictionary";

const META = {
  uk: {
    title: "Канадський іпотечний калькулятор — 6 інструментів",
    description:
      "Іпотечний калькулятор для Канади: stress test (OSFI), CMHC, дострокове погашення, розрив контракту, інвестиційна нерухомість, доступність. Калгарі. Безкоштовно.",
    ogTitle: "Канадська іпотека — 6 інструментів в одному калькуляторі",
    ogDesc: "Stress test, CMHC, дострокове погашення, розрив контракту, інвестиція, доступність. Без сюрпризів.",
    twDesc: "6 інструментів: stress test, CMHC, дострокове погашення, і більше.",
  },
  ru: {
    title: "Канадский ипотечный калькулятор — 6 инструментов",
    description:
      "Ипотечный калькулятор для Канады: stress test (OSFI), CMHC, досрочное погашение, разрыв контракта, инвестиционная недвижимость, доступность. Калгари. Бесплатно.",
    ogTitle: "Канадская ипотека — 6 инструментов в одном калькуляторе",
    ogDesc: "Stress test, CMHC, досрочное погашение, разрыв контракта, инвестиция, доступность. Без сюрпризов.",
    twDesc: "6 инструментов: stress test, CMHC, досрочное погашение и больше.",
  },
  en: {
    title: "Canadian mortgage calculator — 6 tools",
    description:
      "Canadian mortgage calculator: OSFI stress test, CMHC, early payoff, break penalty, investment property cash flow, affordability. Calgary-focused. Free.",
    ogTitle: "Canadian mortgage — 6 tools in one calculator",
    ogDesc: "Stress test, CMHC, early payoff, break penalty, investment, affordability — no surprises.",
    twDesc: "6 tools: stress test, CMHC, early payoff, and more.",
  },
};

export async function generateMetadata({ params }) {
  const { locale } = await params;
  const m = META[locale] || META.uk;
  const path = `/${locale}/calculators/mortgage`;
  const alternates = Object.fromEntries(
    SUPPORTED_LOCALES.map((l) => [
      { uk: "uk-UA", ru: "ru-RU", en: "en-CA" }[l],
      `/${l}/calculators/mortgage`,
    ])
  );
  alternates["x-default"] = "/uk/calculators/mortgage";
  return {
    title: m.title,
    description: m.description,
    keywords: [
      "іпотечний калькулятор", "іпотека Калгарі", "mortgage calculator Calgary",
      "stress test калькулятор", "CMHC калькулятор", "mortgage stress test Canada",
      "дострокове погашення іпотеки", "канадська іпотека калькулятор",
      "affordability calculator Canada",
    ],
    alternates: { canonical: path, languages: alternates },
    openGraph: {
      title: m.ogTitle,
      description: m.ogDesc,
      url: `https://sky-fort.ca${path}`,
      type: "website",
      images: [{ url: "/og-image.png", width: 1200, height: 630, alt: "SkyFort Mortgage Calculator" }],
    },
    twitter: {
      card: "summary_large_image",
      title: m.ogTitle,
      description: m.twDesc,
      images: ["/og-image.png"],
    },
  };
}

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebApplication",
      name: "Canadian Mortgage Calculator",
      applicationCategory: "FinanceApplication",
      operatingSystem: "Web",
      url: "https://sky-fort.ca/uk/calculators/mortgage",
      description:
        "Free Canadian mortgage calculator with 6 tools: OSFI stress test, CMHC insurance, early payoff, lender switch penalty (IRD), investment property cash flow, and affordability. Trilingual.",
      inLanguage: ["uk", "ru", "en"],
      offers: { "@type": "Offer", price: "0", priceCurrency: "CAD" },
      provider: { "@type": "FinancialService", name: "SkyFort Wealth", url: "https://sky-fort.ca" },
    },
    {
      "@type": "HowTo",
      name: "How to check if you qualify for a Canadian mortgage (OSFI stress test)",
      description:
        "Use the qualifying rate (greater of contract rate + 2% or 5.25%) to check Gross Debt Service (GDS) and Total Debt Service (TDS) ratios against OSFI limits.",
      totalTime: "PT3M",
      estimatedCost: { "@type": "MonetaryAmount", currency: "CAD", value: "0" },
      tool: [{ "@type": "HowToTool", name: "SkyFort Mortgage Calculator" }],
      step: [
        { "@type": "HowToStep", position: 1, name: "Enter home price and down payment", text: "Type the property price and what you can put down (minimum 5% under $500K, 10% on the portion $500K-$1M)." },
        { "@type": "HowToStep", position: 2, name: "Pick rate and amortization", text: "Use today's posted contract rate and an amortization (25 years for insured, up to 30 for uninsured)." },
        { "@type": "HowToStep", position: 3, name: "Review stress-test result", text: "The calculator applies the qualifying rate and tells you the required household income to pass GDS (39%) and TDS (44%)." },
        { "@type": "HowToStep", position: 4, name: "Try CMHC premium", text: "Down payment under 20% triggers CMHC insurance — see the premium added to your mortgage balance." },
        { "@type": "HowToStep", position: 5, name: "Test scenarios", text: "Switch to bi-weekly accelerated, lump-sum prepayments, or break-penalty calculations to see how they change interest paid." },
      ],
    },
  ],
};

export default async function Page({ params }) {
  const { locale } = await params;
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <MortgageCalculator locale={locale} />
    </>
  );
}
