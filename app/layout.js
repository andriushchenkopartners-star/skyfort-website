import { Manrope } from "next/font/google";
import Script from "next/script";
import "./globals.css";
import Nav from "./Nav";
import WhatsAppButton from "./_components/WhatsAppButton";
import CookieConsent from "./_components/CookieConsent";

const GA_ID = process.env.NEXT_PUBLIC_GA_ID;
const CLARITY_ID = process.env.NEXT_PUBLIC_CLARITY_ID;

const manrope = Manrope({
  subsets: ["latin", "cyrillic"],
  variable: "--font-sans",
  weight: ["300", "400", "500", "600", "700", "800"],
  display: "swap",
});

export const metadata = {
  metadataBase: new URL("https://sky-fort.ca"),
  title: {
    default:
      "SkyFort · TFSA, real estate, exempt market для українців у Канаді",
    template: "%s · SkyFort",
  },
  description:
    "Канадські фінанси без банківських казок. Licensed Dealing Representative · Alberta · BC · Ontario. 7 безкоштовних гайдів про TFSA, RRSP, FHSA, real estate та exempt market.",
  keywords: [
    "TFSA Канада", "exempt market Канада", "інвестиції Канада українцям",
    "RRSP українцям", "FHSA Канада", "real estate Калгарі",
    "TFSA Canada newcomers", "exempt market Alberta", "Calgary real estate investing",
    "Canadian wealth building immigrants", "Dealing Representative Calgary",
  ],
  authors: [{ name: "Andrii Andriushchenko" }],
  creator: "Andrii Andriushchenko",
  publisher: "SkyFort Wealth",
  category: "finance",
  alternates: {
    canonical: "/",
    languages: {
      "uk-UA": "/", "ru-RU": "/", "en-CA": "/", "x-default": "/",
    },
  },
  openGraph: {
    title: "SkyFort · Wealth building for Ukrainian Canadians",
    description: "Канадські фінанси без банківських казок. TFSA, real estate, exempt market.",
    url: "https://sky-fort.ca",
    siteName: "SkyFort",
    images: [{ url: "/og-image.png", width: 1200, height: 630, alt: "SkyFort" }],
    locale: "uk_UA",
    alternateLocale: ["ru_RU", "en_CA"],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "SkyFort · Canadian finance for newcomers",
    description: "Licensed Dealing Representative · 7 free guides",
    images: ["/og-image.png"],
  },
  verification: {
    google: "dOuBBo24wiTaB5nFxBV-IVJ3LpRRz3bxjn2i09Dfijw",
  },
  robots: {
    index: true, follow: true,
    googleBot: { index: true, follow: true, "max-image-preview": "large" },
  },
  icons: {
    icon: [{ url: "/icon.svg", type: "image/svg+xml" }],
  },
  manifest: "/manifest.webmanifest",
};

export const viewport = {
  themeColor: "#191919",
  width: "device-width",
  initialScale: 1,
};

const businessJsonLd = {
  "@context": "https://schema.org",
  "@type": ["FinancialService", "LocalBusiness"],
  "@id": "https://sky-fort.ca/#business",
  name: "SkyFort Wealth",
  alternateName: ["SkyFort", "СкайФорт"],
  description:
    "Licensed Dealing Representative offering educational content and consultations on TFSA, RRSP, FHSA, exempt market investments, and Canadian real estate for newcomers.",
  url: "https://sky-fort.ca",
  logo: "https://sky-fort.ca/icon.svg",
  image: "https://sky-fort.ca/og-image.png",
  telephone: "+1-403-397-2553",
  email: "andrii@sky-fort.ca",
  priceRange: "Free consultation",
  address: {
    "@type": "PostalAddress",
    addressLocality: "Calgary",
    addressRegion: "AB",
    addressCountry: "CA",
  },
  geo: {
    "@type": "GeoCoordinates",
    latitude: 51.0447,
    longitude: -114.0719,
  },
  areaServed: [
    { "@type": "AdministrativeArea", name: "Alberta" },
    { "@type": "AdministrativeArea", name: "British Columbia" },
    { "@type": "AdministrativeArea", name: "Ontario" },
  ],
  serviceType: [
    "TFSA planning",
    "RRSP planning for newcomers",
    "FHSA strategy",
    "Exempt market investments",
    "Mortgage education",
    "Real estate consultation",
  ],
  hasOfferCatalog: {
    "@type": "OfferCatalog",
    name: "SkyFort services",
    itemListElement: [
      {
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: "TFSA planning",
          description:
            "Educational guidance on TFSA contribution room, withdrawals, recontribution rules, and growth strategies for newcomers to Canada.",
          serviceType: "Financial planning",
          areaServed: ["Alberta", "British Columbia", "Ontario"],
          provider: { "@id": "https://sky-fort.ca/#business" },
        },
        price: "0",
        priceCurrency: "CAD",
        availability: "https://schema.org/InStock",
      },
      {
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: "RRSP planning for newcomers",
          description:
            "How RRSP contribution room is built, tax-deduction strategy, RRSP vs TFSA priority for first 5 years in Canada.",
          serviceType: "Financial planning",
          areaServed: ["Alberta", "British Columbia", "Ontario"],
          provider: { "@id": "https://sky-fort.ca/#business" },
        },
        price: "0",
        priceCurrency: "CAD",
        availability: "https://schema.org/InStock",
      },
      {
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: "FHSA strategy",
          description:
            "$40,000 lifetime First Home Savings Account: how to combine with RRSP Home Buyers' Plan and TFSA for the first Canadian home.",
          serviceType: "Financial planning",
          areaServed: ["Alberta", "British Columbia", "Ontario"],
          provider: { "@id": "https://sky-fort.ca/#business" },
        },
        price: "0",
        priceCurrency: "CAD",
        availability: "https://schema.org/InStock",
      },
      {
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: "Exempt market investments",
          description:
            "Access to MIC (Mortgage Investment Corporations), REIT, and private lending products via Axcess Capital Advisors Inc. for Eligible Investors under CSA NI 45-106.",
          serviceType: "Investment dealer service",
          areaServed: ["Alberta", "British Columbia", "Ontario"],
          provider: { "@id": "https://sky-fort.ca/#business" },
        },
        availability: "https://schema.org/InStock",
      },
      {
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: "Mortgage and real-estate education",
          description:
            "Canadian mortgage math: OSFI stress test, CMHC, down payment scenarios, accelerated payments, and real-estate-as-investment fundamentals for Calgary buyers.",
          serviceType: "Financial education",
          areaServed: ["Alberta", "British Columbia", "Ontario"],
          provider: { "@id": "https://sky-fort.ca/#business" },
        },
        price: "0",
        priceCurrency: "CAD",
        availability: "https://schema.org/InStock",
      },
    ],
  },
  contactPoint: {
    "@type": "ContactPoint",
    telephone: "+1-403-397-2553",
    email: "andrii@sky-fort.ca",
    contactType: "customer support",
    areaServed: ["AB", "BC", "ON"],
    availableLanguage: ["uk", "ru", "en"],
  },
  founder: {
    "@type": "Person",
    "@id": "https://sky-fort.ca/pro-mene#person",
    name: "Andrii Andriushchenko",
    jobTitle: "Licensed Dealing Representative",
    worksFor: { "@type": "Organization", name: "Axcess Capital Advisors Inc." },
    hasCredential: {
      "@type": "EducationalOccupationalCredential",
      credentialCategory: "license",
      recognizedBy: { "@type": "Organization", name: "Canadian Securities Administrators" },
      identifier: "NRD 4575551",
    },
  },
  knowsLanguage: ["uk", "ru", "en"],
  openingHoursSpecification: [
    {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
      opens: "09:00",
      closes: "18:00",
    },
  ],
  sameAs: [
    "https://info.securities-administrators.ca/nrsmobile/nrssearch.aspx",
    "https://www.tiktok.com/@andrii.wealthcanada",
    "https://instagram.com/andrii.wealthcanada",
  ],
  paymentAccepted: ["Cash", "Credit Card", "Debit Card", "e-Transfer", "Wire Transfer"],
  currenciesAccepted: "CAD",
  slogan: "Canadian finance for newcomers — without the bank fairy tales.",
  award: "Licensed Dealing Representative · NRD #4575551 · CSA-registered in AB / BC / ON",
  hasCredential: {
    "@type": "EducationalOccupationalCredential",
    "@id": "https://sky-fort.ca/#credential",
    credentialCategory: "license",
    identifier: "NRD 4575551",
    recognizedBy: {
      "@type": "Organization",
      name: "Canadian Securities Administrators",
      url: "https://www.securities-administrators.ca/",
    },
    educationalLevel: "Professional",
    url: "https://info.securities-administrators.ca/nrsmobile/nrssearch.aspx",
  },
  isicV4: "6499", // Other financial service activities
  naics: "523930", // Investment advice
};

const websiteJsonLd = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  "@id": "https://sky-fort.ca/#website",
  url: "https://sky-fort.ca",
  name: "SkyFort",
  publisher: { "@id": "https://sky-fort.ca/#business" },
  inLanguage: ["uk-UA", "ru-RU", "en-CA"],
  potentialAction: {
    "@type": "SearchAction",
    target: "https://sky-fort.ca/?q={search_term_string}",
    "query-input": "required name=search_term_string",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="uk" className={manrope.variable}>
      <head>
        <link rel="preconnect" href="https://calendly.com" />
        <link rel="dns-prefetch" href="https://calendly.com" />
        <link rel="alternate" type="application/rss+xml" title="SkyFort Blog" href="/blog/rss.xml" />
        {GA_ID && <link rel="dns-prefetch" href="https://www.googletagmanager.com" />}
        {CLARITY_ID && <link rel="dns-prefetch" href="https://www.clarity.ms" />}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(businessJsonLd) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteJsonLd) }}
        />
      </head>
      <body className="font-sans antialiased">
        <a href="#main" className="skip-link">Перейти до контенту</a>
        <Nav />
        {children}
        <WhatsAppButton />
        <CookieConsent />

        {GA_ID && (
          <>
            <Script
              src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`}
              strategy="afterInteractive"
            />
            <Script id="ga4-init" strategy="afterInteractive">
              {`
                window.dataLayer = window.dataLayer || [];
                function gtag(){dataLayer.push(arguments);}
                gtag('js', new Date());
                gtag('config', '${GA_ID}', { anonymize_ip: true });
              `}
            </Script>
          </>
        )}

        {CLARITY_ID && (
          <Script id="ms-clarity" strategy="afterInteractive">
            {`
              (function(c,l,a,r,i,t,y){
                c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
                t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
                y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
              })(window, document, "clarity", "script", "${CLARITY_ID}");
            `}
          </Script>
        )}
      </body>
    </html>
  );
}