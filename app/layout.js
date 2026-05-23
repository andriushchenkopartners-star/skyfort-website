import { Manrope } from "next/font/google";
import "./globals.css";
import Nav from "./Nav";

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

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "FinancialService",
  name: "SkyFort Wealth",
  alternateName: ["SkyFort", "СкайФорт"],
  description: "Licensed Dealing Representative offering educational content and consultations on TFSA, RRSP, FHSA, exempt market investments, and Canadian real estate for newcomers.",
  url: "https://sky-fort.ca",
  logo: "https://sky-fort.ca/icon.svg",
  image: "https://sky-fort.ca/og-image.png",
  telephone: "+1-403-397-2553",
  email: "andrii.andriushchenko@axcesscapital.com",
  address: { "@type": "PostalAddress", addressLocality: "Calgary", addressRegion: "AB", addressCountry: "CA" },
  areaServed: [
    { "@type": "AdministrativeArea", name: "Alberta" },
    { "@type": "AdministrativeArea", name: "British Columbia" },
    { "@type": "AdministrativeArea", name: "Ontario" },
  ],
  founder: {
    "@type": "Person",
    name: "Andrii Andriushchenko",
    jobTitle: "Licensed Dealing Representative",
    worksFor: { "@type": "Organization", name: "Axcess Capital Advisors Inc." },
  },
  knowsLanguage: ["uk", "ru", "en"],
};

export default function RootLayout({ children }) {
  return (
    <html lang="uk" className={manrope.variable}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="font-sans antialiased">
        <Nav />
        {children}
      </body>
    </html>
  );
}