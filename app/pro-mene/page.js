import AboutClient from "./about-client";

export const metadata = {
  title: "Про мене — Андрій Андрющенко, Licensed Dealing Representative",
  description:
    "Андрій Андрющенко — ліцензований Dealing Representative (Exempt Market Dealer) у Калгарі. Допомагаю українцям та новоприбулим будувати капітал у Канаді: TFSA, RRSP, FHSA, exempt market. NRD #4575551.",
  keywords: [
    "фінансовий радник Калгарі", "фінансовий радник українець Канада",
    "Dealing Representative Calgary", "exempt market dealer Alberta",
    "Андрій Андрющенко", "Andrii Andriushchenko", "інвестиції українцям Канада",
    "Ukrainian financial advisor Calgary",
  ],
  alternates: { canonical: "/pro-mene" },
  openGraph: {
    title: "Про мене — Андрій Андрющенко · Licensed Dealing Representative",
    description:
      "Ліцензований DR у Калгарі. Допомагаю українцям будувати капітал у Канаді чесно і без банківських казок.",
    url: "https://sky-fort.ca/pro-mene",
    type: "profile",
    images: [{ url: "/andrii.jpg", width: 1200, height: 1600, alt: "Андрій Андрющенко, SkyFort" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Про мене — Андрій Андрющенко · SkyFort",
    description: "Licensed Dealing Representative у Калгарі. NRD #4575551.",
    images: ["/andrii.jpg"],
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: "Andrii Andriushchenko",
  alternateName: "Андрій Андрющенко",
  jobTitle: "Licensed Dealing Representative (Exempt Market Dealer)",
  image: "https://sky-fort.ca/andrii.jpg",
  url: "https://sky-fort.ca/pro-mene",
  worksFor: {
    "@type": "Organization",
    name: "Axcess Capital Advisors Inc.",
  },
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
    recognizedBy: {
      "@type": "Organization",
      name: "Canadian Securities Administrators (CSA)",
    },
    identifier: "NRD 4575551",
    url: "https://info.securities-administrators.ca/nrsmobile/NRSIndivRegistrationRecord.aspx?from=search|indiv&indivId=4575551",
  },
};

export default function Page() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <AboutClient />
    </>
  );
}
