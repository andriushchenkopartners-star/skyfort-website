import { Manrope, Instrument_Serif } from "next/font/google";
import "./globals.css";

const manrope = Manrope({
  subsets: ["latin", "cyrillic"],
  variable: "--font-sans",
  display: "swap",
});

const instrumentSerif = Instrument_Serif({
  subsets: ["latin"],
  weight: ["400"],
  style: ["normal", "italic"],
  variable: "--font-serif",
  display: "swap",
});

// ─────────────────────────────────────────────────────────────
// SEO METADATA
// ─────────────────────────────────────────────────────────────

export const metadata = {
  metadataBase: new URL("https://sky-fort.ca"),

  title: {
    default:
      "SkyFort · TFSA, real estate, exempt market для українців у Канаді",
    template: "%s · SkyFort",
  },
  description:
    "Канадські фінанси без банківських казок. Licensed Dealing Representative · Alberta · BC · Ontario. 7 безкоштовних гайдів про TFSA, RRSP, FHSA, real estate та exempt market. Українською, російською, англійською.",

  keywords: [
    // Ukrainian
    "TFSA Канада",
    "exempt market Канада",
    "інвестиції Канада українцям",
    "RRSP українцям",
    "FHSA Канада",
    "новачкам в Канаді фінанси",
    "real estate Калгарі",
    "Dealing Representative Альберта",
    "wealth building Канада",
    // Russian
    "TFSA для иммигрантов",
    "инвестиции в Канаде",
    "exempt market Альберта",
    "недвижимость Калгари",
    "финансовый советник Канада",
    // English
    "TFSA Canada newcomers",
    "exempt market Alberta",
    "Calgary real estate investing",
    "Canadian wealth building immigrants",
    "Dealing Representative Calgary",
    "FHSA first home Canada",
    "RRSP newcomers Canada",
    "private MIC investing Canada",
  ],

  authors: [{ name: "Andrii Andriushchenko" }],
  creator: "Andrii Andriushchenko",
  publisher: "SkyFort Wealth",
  category: "finance",

  // Hreflang — currently same URL for all langs (client-side switch).
  // After URL routing (Day 7-8) → update to /uk, /ru, /en
  alternates: {
    canonical: "/",
    languages: {
      "uk-UA": "/",
      "ru-RU": "/",
      "en-CA": "/",
      "x-default": "/",
    },
  },

  openGraph: {
    title: "SkyFort · Wealth building for Ukrainian Canadians",
    description:
      "Канадські фінанси без банківських казок. TFSA, real estate, exempt market. 7 безкоштовних гайдів.",
    url: "https://sky-fort.ca",
    siteName: "SkyFort",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "SkyFort — Canadian finance for newcomers",
      },
    ],
    locale: "uk_UA",
    alternateLocale: ["ru_RU", "en_CA"],
    type: "website",
  },

  twitter: {
    card: "summary_large_image",
    title: "SkyFort · Canadian finance for newcomers",
    description:
      "Licensed Dealing Representative · 7 free guides on TFSA, RRSP, exempt market · УК · RU · EN",
    images: ["/og-image.png"],
    creator: "@andrii_skyfort",
  },

  robots: {
    index: true,
    follow: true,
    nocache: false,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },

  icons: {
    icon: [
      { url: "/favicon.ico" },
      { url: "/icon.svg", type: "image/svg+xml" },
    ],
    apple: "/apple-icon.png",
  },

  manifest: "/manifest.webmanifest",
};

export const viewport = {
  themeColor: "#0a0a0a",
  width: "device-width",
  initialScale: 1,
};

// ─────────────────────────────────────────────────────────────
// JSON-LD Structured Data (Schema.org)
// ─────────────────────────────────────────────────────────────

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "FinancialService",
  name: "SkyFort Wealth",
  alternateName: ["SkyFort", "СкайФорт"],
  description:
    "Licensed Dealing Representative offering educational content and consultations on TFSA, RRSP, FHSA, exempt market investments, and Canadian real estate for newcomers.",
  url: "https://sky-fort.ca",
  logo: "https://sky-fort.ca/icon.svg",
  image: "https://sky-fort.ca/og-image.png",
  telephone: "+1-403-397-2553",
  email: "andrii.andriushchenko@axcesscapital.com",
  address: {
    "@type": "PostalAddress",
    addressLocality: "Calgary",
    addressRegion: "AB",
    addressCountry: "CA",
  },
  areaServed: [
    { "@type": "AdministrativeArea", name: "Alberta" },
    { "@type": "AdministrativeArea", name: "British Columbia" },
    { "@type": "AdministrativeArea", name: "Ontario" },
  ],
  founder: {
    "@type": "Person",
    name: "Andrii Andriushchenko",
    jobTitle: "Licensed Dealing Representative",
    worksFor: {
      "@type": "Organization",
      name: "Axcess Capital Advisors Inc.",
    },
  },
  knowsLanguage: ["uk", "ru", "en"],
  serviceType: [
    "Tax-Free Savings Account (TFSA) consultation",
    "Registered Retirement Savings Plan (RRSP) planning",
    "First Home Savings Account (FHSA) guidance",
    "Exempt market investments",
    "Canadian real estate investing",
  ],
  priceRange: "Free discovery call · $$",
  sameAs: [],
};

export default function RootLayout({ children }) {
  return (
    <html
      lang="uk"
      className={`${manrope.variable} ${instrumentSerif.variable}`}
    >
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="bg-zinc-950 font-sans">{children}</body>
    </html>
  );
}
