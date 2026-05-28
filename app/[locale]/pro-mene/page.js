import AboutClient from "./about-client";
import { SUPPORTED_LOCALES } from "../../_i18n/dictionary";

const META_BY_LOCALE = {
  uk: {
    title: "Про мене — Андрій Андрющенко, Licensed Dealing Representative",
    description:
      "Андрій Андрющенко — ліцензований Dealing Representative (Exempt Market Dealer) у Калгарі. Допомагаю українцям та новоприбулим будувати капітал у Канаді: TFSA, RRSP, FHSA, exempt market. NRD #4575551.",
    ogTitle: "Про мене — Андрій Андрющенко · Licensed Dealing Representative",
    ogDesc:
      "Ліцензований DR у Калгарі. Допомагаю українцям будувати капітал у Канаді чесно і без банківських казок.",
    twDesc: "Licensed Dealing Representative у Калгарі. NRD #4575551.",
  },
  ru: {
    title: "Обо мне — Андрей Андрющенко, Licensed Dealing Representative",
    description:
      "Андрей Андрющенко — лицензированный Dealing Representative (Exempt Market Dealer) в Калгари. Помогаю русскоязычным и новоприбывшим строить капитал в Канаде: TFSA, RRSP, FHSA, exempt market. NRD #4575551.",
    ogTitle: "Обо мне — Андрей Андрющенко · Licensed Dealing Representative",
    ogDesc:
      "Лицензированный DR в Калгари. Помогаю русскоязычным строить капитал в Канаде честно и без банковских сказок.",
    twDesc: "Licensed Dealing Representative в Калгари. NRD #4575551.",
  },
  en: {
    title: "About — Andrii Andriushchenko, Licensed Dealing Representative",
    description:
      "Andrii Andriushchenko — Licensed Dealing Representative (Exempt Market Dealer) in Calgary. Helping Ukrainian and newcomer Canadians build wealth: TFSA, RRSP, FHSA, exempt market. NRD #4575551.",
    ogTitle: "About — Andrii Andriushchenko · Licensed Dealing Representative",
    ogDesc:
      "Licensed DR in Calgary. Helping newcomers build Canadian wealth honestly — no bank fairy tales.",
    twDesc: "Licensed Dealing Representative in Calgary. NRD #4575551.",
  },
};

export async function generateMetadata({ params }) {
  const { locale } = await params;
  const m = META_BY_LOCALE[locale] || META_BY_LOCALE.uk;
  const path = `/${locale}/pro-mene`;
  const alternates = Object.fromEntries(
    SUPPORTED_LOCALES.map((l) => [
      { uk: "uk", ru: "ru", en: "en-CA" }[l],
      `/${l}/pro-mene`,
    ])
  );
  alternates["x-default"] = "/uk/pro-mene";

  return {
    title: m.title,
    description: m.description,
    keywords: [
      "фінансовий радник Калгарі", "фінансовий радник українець Канада",
      "Dealing Representative Calgary", "exempt market dealer Alberta",
      "Андрій Андрющенко", "Andrii Andriushchenko", "інвестиції українцям Канада",
      "Ukrainian financial advisor Calgary",
    ],
    alternates: { canonical: path, languages: alternates },
    openGraph: {
      title: m.ogTitle,
      description: m.ogDesc,
      url: `https://sky-fort.ca${path}`,
      type: "profile",
      // images: omitted — opengraph-image.js generates a branded card.
      // The portrait /andrii.jpg is still used in the page body itself.
    },
    twitter: {
      card: "summary_large_image",
      title: m.ogTitle,
      description: m.twDesc,
    },
  };
}

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  "@id": "https://sky-fort.ca/pro-mene#person",
  name: "Andrii Andriushchenko",
  alternateName: ["Андрій Андрющенко", "Андрей Андрющенко"],
  honorificPrefix: "Licensed Dealing Representative",
  jobTitle: "Licensed Dealing Representative (Exempt Market Dealer)",
  image: "https://sky-fort.ca/andrii.jpg",
  url: "https://sky-fort.ca/uk/pro-mene",
  // hasOccupation gives more structured detail than jobTitle alone — Google
  // Knowledge Graph and AI Overviews extract this as the canonical role.
  hasOccupation: {
    "@type": "Occupation",
    name: "Licensed Dealing Representative",
    occupationLocation: {
      "@type": "Country",
      name: "Canada",
    },
    skills:
      "Exempt market securities, TFSA / RRSP / FHSA / RESP planning, " +
      "CCPC structures, MPC for physicians, IPP, LCGE on QSBS, " +
      "newcomer financial planning, CUAET tax onboarding",
  },
  // memberOf surfaces the regulatory umbrella above the firm — useful for
  // AI assistants asked "which regulator licensed this person?"
  memberOf: [
    { "@type": "Organization", name: "Axcess Capital Advisors Inc." },
    { "@type": "Organization", name: "Canadian Securities Administrators (CSA)" },
  ],
  worksFor: { "@type": "Organization", name: "Axcess Capital Advisors Inc." },
  brand: { "@type": "Brand", name: "SkyFort Wealth" },
  nationality: [
    { "@type": "Country", name: "Ukraine" },
    { "@type": "Country", name: "Canada" },
  ],
  address: {
    "@type": "PostalAddress",
    addressLocality: "Calgary",
    addressRegion: "AB",
    addressCountry: "CA",
  },
  knowsLanguage: ["uk", "ru", "en"],
  // Expanded specialty list — Phase-5 additions add ICP pillars (IT, medics,
  // founders) and the regulatory/structural concepts we cover deeply
  // (CCPC, MPC, IPP, LCGE, TOSI, exempt market, Eligible/Accredited Investor).
  knowsAbout: [
    "TFSA — Tax-Free Savings Account",
    "RRSP — Registered Retirement Savings Plan",
    "FHSA — First Home Savings Account",
    "RESP — Registered Education Savings Plan",
    "Exempt Market Investments (NI 45-106)",
    "Eligible Investor self-certification",
    "Accredited Investor categorization",
    "Canadian Real Estate Investing",
    "Calgary real estate market",
    "Mortgage Investment Corporations (MICs)",
    "Private REITs",
    "Newcomer / CUAET financial planning",
    "CCPC — Canadian-Controlled Private Corporation",
    "MPC — Medical Professional Corporation",
    "Salary vs Dividend optimization",
    "IPP — Individual Pension Plan",
    "LCGE — Lifetime Capital Gains Exemption",
    "QSBS — Qualified Small Business Shares",
    "TOSI — Tax on Split Income",
    "Holdco / Family Trust structures",
    "RSU vesting tax optimization",
    "ESPP — Employee Stock Purchase Plan",
    "Cross-border (US/Canada) employment tax",
    "Finfluencer compliance (CSA/CIRO Notice 31-369)",
    "Wealth Building for Ukrainian/Russian-speaking immigrants",
  ],
  areaServed: [
    { "@type": "AdministrativeArea", name: "Alberta" },
    { "@type": "AdministrativeArea", name: "British Columbia" },
    { "@type": "AdministrativeArea", name: "Ontario" },
  ],
  // Multiple credentials — Schema.org accepts array of hasCredential.
  // CSA Registration covers the legal/regulatory side; IFSE EMP covers
  // the academic prerequisite (required for the registration to be granted).
  hasCredential: [
    {
      "@type": "EducationalOccupationalCredential",
      credentialCategory: "Professional Registration",
      name: "Dealing Representative (Exempt Market Dealer) — Alberta, British Columbia, Ontario",
      recognizedBy: {
        "@type": "Organization",
        name: "Canadian Securities Administrators (CSA)",
      },
      identifier: "NRD 4575551",
      url: "https://info.securities-administrators.ca/nrsmobile/nrssearch.aspx",
    },
    {
      "@type": "EducationalOccupationalCredential",
      credentialCategory: "Professional Qualification",
      name: "Exempt Market Proficiency Course (EMP)",
      recognizedBy: { "@type": "Organization", name: "IFSE Institute (IFIC)" },
      url: "https://www.ifse.ca/courses/exempt-market-products-emp/",
    },
  ],
  // sameAs feeds Google's Knowledge Graph entity matching — every public
  // surface where Andrii's brand appears should be cross-referenced here.
  // Caught by May-28 re-audit (3.7): "Two brands with identical content
  // quality will receive unequal AI citation treatment if one has built
  // entity authority and the other hasn't."
  sameAs: [
    "https://info.securities-administrators.ca/nrsmobile/nrssearch.aspx",
    "https://www.tiktok.com/@andrii.wealthcanada",
    "https://instagram.com/andrii.wealthcanada",
    "https://t.me/skyfortwealth",
    "https://calendly.com/andriushchenko-partners/new-meeting",
    "https://axcesscapital.ca/",
    "https://sky-fort.ca/uk/perevirka",
    "https://sky-fort.ca/uk/presa",
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
      <AboutClient locale={locale} />
    </>
  );
}
