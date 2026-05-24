import TFSACalculator from "./calculator";
import { SUPPORTED_LOCALES } from "../../../_i18n/dictionary";

const META = {
  uk: {
    title: "TFSA калькулятор — скільки буде через 20 років",
    description:
      "Безкоштовний TFSA калькулятор для Канади. Порахуй ріст compound interest, порівняй банк, GIC та ETF. Від Licensed Dealing Representative у Калгарі.",
    ogTitle: "TFSA калькулятор — скільки буде у твоєму TFSA через 20 років?",
    ogDesc:
      "Реальна математика compound interest. Порівняй банк, GIC і ETF — побач різницю своїми очима.",
    twDesc: "Порахуй ріст TFSA. Порівняй банк, GIC, ETF.",
  },
  ru: {
    title: "TFSA калькулятор — сколько будет через 20 лет",
    description:
      "Бесплатный TFSA калькулятор для Канады. Посчитай рост compound interest, сравни банк, GIC и ETF. От Licensed Dealing Representative в Калгари.",
    ogTitle: "TFSA калькулятор — сколько будет в твоём TFSA через 20 лет?",
    ogDesc:
      "Реальная математика compound interest. Сравни банк, GIC и ETF — увидь разницу своими глазами.",
    twDesc: "Посчитай рост TFSA. Сравни банк, GIC, ETF.",
  },
  en: {
    title: "TFSA calculator — how much in 20 years",
    description:
      "Free Canadian TFSA calculator. Run compound interest math, compare bank, GIC, and ETF. From a Licensed Dealing Representative in Calgary.",
    ogTitle: "TFSA calculator — how much will your TFSA have in 20 years?",
    ogDesc:
      "Real compound-interest math. Compare bank, GIC and ETF — see the gap with your own eyes.",
    twDesc: "Calculate TFSA growth. Compare bank, GIC, ETF.",
  },
};

export async function generateMetadata({ params }) {
  const { locale } = await params;
  const m = META[locale] || META.uk;
  const path = `/${locale}/calculators/tfsa-growth`;
  const alternates = Object.fromEntries(
    SUPPORTED_LOCALES.map((l) => [
      { uk: "uk-UA", ru: "ru-RU", en: "en-CA" }[l],
      `/${l}/calculators/tfsa-growth`,
    ])
  );
  alternates["x-default"] = "/uk/calculators/tfsa-growth";
  return {
    title: m.title,
    description: m.description,
    keywords: [
      "TFSA калькулятор", "TFSA калькулятор Канада", "TFSA growth calculator",
      "compound interest калькулятор", "TFSA vs GIC", "TFSA ETF Канада",
      "інвестиційний калькулятор українцям", "TFSA Calgary",
    ],
    alternates: { canonical: path, languages: alternates },
    openGraph: {
      title: m.ogTitle,
      description: m.ogDesc,
      url: `https://sky-fort.ca${path}`,
      type: "website",
      images: [{ url: "/og-image.png", width: 1200, height: 630, alt: "SkyFort TFSA Calculator" }],
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
      name: "TFSA Growth Calculator",
      applicationCategory: "FinanceApplication",
      operatingSystem: "Web",
      url: "https://sky-fort.ca/uk/calculators/tfsa-growth",
      description:
        "Free TFSA growth calculator with compound interest math. Compare bank savings, GIC, and ETF strategies. Trilingual (Ukrainian/Russian/English).",
      inLanguage: ["uk", "ru", "en"],
      offers: { "@type": "Offer", price: "0", priceCurrency: "CAD" },
      provider: { "@type": "FinancialService", name: "SkyFort Wealth", url: "https://sky-fort.ca" },
    },
    {
      "@type": "HowTo",
      name: "How to calculate TFSA growth over 20 years",
      description:
        "Calculate compound interest in a TFSA and compare bank savings, GIC, and ETF outcomes side-by-side.",
      totalTime: "PT2M",
      estimatedCost: { "@type": "MonetaryAmount", currency: "CAD", value: "0" },
      tool: [{ "@type": "HowToTool", name: "SkyFort TFSA Growth Calculator" }],
      step: [
        { "@type": "HowToStep", position: 1, name: "Enter your starting balance", text: "Type in what you already have in your TFSA (or 0 if you're starting fresh)." },
        { "@type": "HowToStep", position: 2, name: "Add monthly contribution", text: "How much do you plan to contribute each month? Default $500." },
        { "@type": "HowToStep", position: 3, name: "Pick a time horizon", text: "Set the number of years — 10, 20, or 30 — to see compound interest in action." },
        { "@type": "HowToStep", position: 4, name: "Compare scenarios", text: "Compare bank savings (1-2%), GIC (4-5%), and broad-market ETF (7-12% historical) outcomes." },
        { "@type": "HowToStep", position: 5, name: "Book a discovery call", text: "If the gap surprises you, book a free 30-minute call to discuss your real situation." },
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
      <TFSACalculator locale={locale} />
    </>
  );
}
