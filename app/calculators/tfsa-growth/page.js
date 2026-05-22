import TFSACalculator from "./calculator";

export const metadata = {
  title: "TFSA калькулятор — скільки буде через 20 років",
  description:
    "Безкоштовний TFSA калькулятор для Канади. Порахуй ріст compound interest, порівняй банк, GIC та ETF. Трилінгвальний (UK/RU/EN). Від Licensed Dealing Representative у Калгарі.",
  keywords: [
    "TFSA калькулятор", "TFSA калькулятор Канада", "TFSA growth calculator",
    "compound interest калькулятор", "TFSA vs GIC", "TFSA ETF Канада",
    "інвестиційний калькулятор українцям", "TFSA Calgary",
  ],
  alternates: { canonical: "/calculators/tfsa-growth" },
  openGraph: {
    title: "TFSA калькулятор — скільки буде у твоєму TFSA через 20 років?",
    description:
      "Реальна математика compound interest. Порівняй банк, GIC і ETF — побач різницю своїми очима.",
    url: "https://sky-fort.ca/calculators/tfsa-growth",
    type: "website",
    images: [{ url: "/og-image.png", width: 1200, height: 630, alt: "SkyFort TFSA Calculator" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "TFSA калькулятор — SkyFort",
    description: "Порахуй ріст TFSA. Порівняй банк, GIC, ETF.",
    images: ["/og-image.png"],
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "WebApplication",
  name: "TFSA Growth Calculator",
  applicationCategory: "FinanceApplication",
  operatingSystem: "Web",
  url: "https://sky-fort.ca/calculators/tfsa-growth",
  description:
    "Free TFSA growth calculator with compound interest math. Compare bank savings, GIC, and ETF strategies. Trilingual (Ukrainian/Russian/English).",
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
      <TFSACalculator />
    </>
  );
}
