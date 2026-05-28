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
      { uk: "uk-UA", ru: "ru-RU", en: "en-CA" }[l],
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
  jobTitle: "Licensed Dealing Representative (Exempt Market Dealer)",
  image: "https://sky-fort.ca/andrii.jpg",
  url: "https://sky-fort.ca/uk/pro-mene",
  worksFor: { "@type": "Organization", name: "Axcess Capital Advisors Inc." },
  address: {
    "@type": "PostalAddress",
    addressLocality: "Calgary",
    addressRegion: "AB",
    addressCountry: "CA",
  },
  knowsLanguage: ["uk", "ru", "en"],
  knowsAbout: [
    "TFSA", "RRSP", "FHSA", "Exempt Market Investments",
    "Canadian Real Estate", "Wealth Building for Newcomers",
  ],
  areaServed: [
    { "@type": "AdministrativeArea", name: "Alberta" },
    { "@type": "AdministrativeArea", name: "British Columbia" },
    { "@type": "AdministrativeArea", name: "Ontario" },
  ],
  hasCredential: {
    "@type": "EducationalOccupationalCredential",
    credentialCategory: "Professional Registration",
    name: "Dealing Representative (Exempt Market Dealer) — Alberta, British Columbia, Ontario",
    recognizedBy: { "@type": "Organization", name: "Canadian Securities Administrators (CSA)" },
    identifier: "NRD 4575551",
    url: "https://info.securities-administrators.ca/nrsmobile/nrssearch.aspx",
  },
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
