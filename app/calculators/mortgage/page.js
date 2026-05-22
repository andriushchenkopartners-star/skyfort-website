import MortgageCalculator from "./calculator";

export const metadata = {
  title: "Канадський іпотечний калькулятор — 6 інструментів",
  description:
    "Іпотечний калькулятор для Канади: stress test (OSFI), CMHC, дострокове погашення, розрив контракту, інвестиційна нерухомість, доступність. Калгарі. Трилінгвально, безкоштовно.",
  keywords: [
    "іпотечний калькулятор", "іпотека Калгарі", "mortgage calculator Calgary",
    "stress test калькулятор", "CMHC калькулятор", "mortgage stress test Canada",
    "дострокове погашення іпотеки", "канадська іпотека калькулятор",
    "affordability calculator Canada",
  ],
  alternates: { canonical: "/calculators/mortgage" },
  openGraph: {
    title: "Канадська іпотека — 6 інструментів в одному калькуляторі",
    description:
      "Stress test, CMHC, дострокове погашення, розрив контракту, інвестиція, доступність. Без сюрпризів.",
    url: "https://sky-fort.ca/calculators/mortgage",
    type: "website",
    images: [{ url: "/og-image.png", width: 1200, height: 630, alt: "SkyFort Mortgage Calculator" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Іпотечний калькулятор — SkyFort",
    description: "6 інструментів: stress test, CMHC, дострокове погашення, і більше.",
    images: ["/og-image.png"],
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "WebApplication",
  name: "Canadian Mortgage Calculator",
  applicationCategory: "FinanceApplication",
  operatingSystem: "Web",
  url: "https://sky-fort.ca/calculators/mortgage",
  description:
    "Free Canadian mortgage calculator with 6 tools: OSFI stress test, CMHC insurance, early payoff, lender switch penalty (IRD), investment property cash flow, and affordability. Trilingual.",
  inLanguage: ["uk", "ru", "en"],
  offers: { "@type": "Offer", price: "0", priceCurrency: "CAD" },
  provider: {
    "@type": "FinancialService",
    name: "SkyFort Wealth",
    url: "https://sky-fort.ca",
  },
};

export default function Page() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <MortgageCalculator />
    </>
  );
}
