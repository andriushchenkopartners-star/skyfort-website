import FIRECalculator from "./calculator";
import { SUPPORTED_LOCALES } from "../../../_i18n/dictionary";

const META = {
  uk: {
    title: "Калькулятор фінансової свободи (FIRE) — Канада",
    description:
      "Дізнайся точну дату фінансової свободи. FIRE калькулятор з канадським контекстом: 4% rule, exempt market стратегія. Безкоштовно. Licensed Dealing Representative.",
    ogTitle: "Коли ти станеш фінансово вільним? — FIRE калькулятор",
    ogDesc: "Точна дата freedom на основі твоїх цифр. Побач як exempt market прискорює це на роки.",
    twDesc: "Дізнайся свою дату фінансової свободи.",
  },
  ru: {
    title: "Калькулятор финансовой свободы (FIRE) — Канада",
    description:
      "Узнай точную дату финансовой свободы. FIRE калькулятор с канадским контекстом: 4% rule, exempt market стратегия. Бесплатно. Licensed Dealing Representative.",
    ogTitle: "Когда ты станешь финансово свободным? — FIRE калькулятор",
    ogDesc: "Точная дата freedom на основе твоих цифр. Увидь как exempt market ускоряет это на годы.",
    twDesc: "Узнай свою дату финансовой свободы.",
  },
  en: {
    title: "Financial Freedom (FIRE) calculator — Canada",
    description:
      "Get your exact financial-independence date. FIRE calculator with Canadian context: 4% rule, exempt-market accelerator. Free. Licensed Dealing Representative.",
    ogTitle: "When will you be financially free? — FIRE calculator",
    ogDesc: "Exact freedom date based on your numbers. See how exempt market accelerates it by years.",
    twDesc: "Find your financial-freedom date.",
  },
};

export async function generateMetadata({ params }) {
  const { locale } = await params;
  const m = META[locale] || META.uk;
  const path = `/${locale}/calculators/financial-freedom`;
  const alternates = Object.fromEntries(
    SUPPORTED_LOCALES.map((l) => [
      { uk: "uk-UA", ru: "ru-RU", en: "en-CA" }[l],
      `/${l}/calculators/financial-freedom`,
    ])
  );
  alternates["x-default"] = "/uk/calculators/financial-freedom";
  return {
    title: m.title,
    description: m.description,
    keywords: [
      "FIRE калькулятор", "фінансова свобода калькулятор", "financial freedom calculator Canada",
      "FIRE Canada", "4% rule калькулятор", "коли вийти на пенсію калькулятор",
      "exempt market інвестиції", "passive income Канада",
    ],
    alternates: { canonical: path, languages: alternates },
    openGraph: {
      title: m.ogTitle,
      description: m.ogDesc,
      url: `https://sky-fort.ca${path}`,
      type: "website",
      images: [{ url: "/og-image.png", width: 1200, height: 630, alt: "SkyFort FIRE Calculator" }],
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
      name: "Financial Freedom (FIRE) Calculator",
      applicationCategory: "FinanceApplication",
      operatingSystem: "Web",
      url: "https://sky-fort.ca/uk/calculators/financial-freedom",
      description:
        "Free FIRE calculator with Canadian context. Calculate your financial-independence date using the 4% rule and 3.5% safe withdrawal rate, with exempt market strategy comparison. Trilingual.",
      inLanguage: ["uk", "ru", "en"],
      offers: { "@type": "Offer", price: "0", priceCurrency: "CAD" },
      provider: { "@type": "FinancialService", name: "SkyFort Wealth", url: "https://sky-fort.ca" },
    },
    {
      "@type": "HowTo",
      name: "How to calculate your financial-independence date",
      description:
        "Estimate when you can stop working using the 4% rule (FI Standard) and 3.5% safe withdrawal rate (FI Safe), with Canadian tax and exempt-market context.",
      totalTime: "PT3M",
      estimatedCost: { "@type": "MonetaryAmount", currency: "CAD", value: "0" },
      tool: [{ "@type": "HowToTool", name: "SkyFort FIRE Calculator" }],
      step: [
        { "@type": "HowToStep", position: 1, name: "Enter age and income", text: "Your current age, monthly take-home income after tax." },
        { "@type": "HowToStep", position: 2, name: "Enter monthly expenses", text: "What you actually spend per month. The smaller the gap with income, the longer to FI." },
        { "@type": "HowToStep", position: 3, name: "Enter current savings", text: "Total invested assets across all accounts (TFSA, RRSP, non-registered)." },
        { "@type": "HowToStep", position: 4, name: "Compare return scenarios", text: "See FI date for balanced (8%), aggressive (10%), and exempt-market-blended portfolios." },
        { "@type": "HowToStep", position: 5, name: "Choose your path", text: "Decide whether to optimize savings rate or seek higher returns via Eligible-Investor strategies." },
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
      <FIRECalculator locale={locale} />
    </>
  );
}
