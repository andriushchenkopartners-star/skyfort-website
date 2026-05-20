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

export const metadata = {
  title: "SkyFort · Wealth building for newcomers to Canada",
  description:
    "TFSA, RRSP, FHSA, real estate, exempt market. Educational content from a Licensed Dealing Representative. Українська · Русский · English.",
  metadataBase: new URL("https://sky-fort.ca"),
  openGraph: {
    title: "SkyFort · Wealth for Ukrainian Canadians",
    description:
      "Канадські фінанси без банківських казок. TFSA, real estate, exempt market.",
    url: "https://sky-fort.ca",
    siteName: "SkyFort",
    type: "website",
    locale: "uk_UA",
  },
  twitter: {
    card: "summary_large_image",
    title: "SkyFort · Wealth for newcomers to Canada",
    description:
      "Licensed Dealing Representative · Educational content · 7 free guides",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="uk" className={`${manrope.variable} ${instrumentSerif.variable}`}>
      <body className="bg-zinc-950 font-sans">{children}</body>
    </html>
  );
}
