import FIRECalculator from "./calculator";

export const metadata = {
  title: "Калькулятор фінансової свободи (FIRE) — Канада",
  description:
    "Дізнайся точну дату фінансової свободи. FIRE калькулятор з канадським контекстом: 4% rule, exempt market стратегія. Безкоштовно, трилінгвально. Licensed Dealing Representative.",
  keywords: [
    "FIRE калькулятор", "фінансова свобода калькулятор", "financial freedom calculator Canada",
    "FIRE Canada", "4% rule калькулятор", "коли вийти на пенсію калькулятор",
    "exempt market інвестиції", "passive income Канада",
  ],
  alternates: { canonical: "/calculators/financial-freedom" },
  openGraph: {
    title: "Коли ти станеш фінансово вільним? — FIRE калькулятор",
    description:
      "Точна дата freedom на основі твоїх цифр. Побач як exempt market прискорює це на роки.",
    url: "https://sky-fort.ca/calculators/financial-freedom",
    type: "website",
    images: [{ url: "/og-image.png", width: 1200, height: 630, alt: "SkyFort FIRE Calculator" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "FIRE калькулятор — SkyFort",
    description: "Дізнайся свою дату фінансової свободи.",
    images: ["/og-image.png"],
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "WebApplication",
  name: "Financial Freedom (FIRE) Calculator",
  applicationCategory: "FinanceApplication",
  operatingSystem: "Web",
  url: "https://sky-fort.ca/calculators/financial-freedom",
  description:
    "Free FIRE calculator with Canadian context. Calculate your financial independence date using the 4% rule and 3.5% safe withdrawal rate, with exempt market strategy comparison. Trilingual.",
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
      <FIRECalculator />
    </>
  );
}
