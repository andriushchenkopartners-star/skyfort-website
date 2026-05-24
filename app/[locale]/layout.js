// Locale-specific layout. Sets html lang via metadata, generates hreflang alternates,
// and validates the locale segment so unsupported paths 404 instead of rendering empty.

import { notFound } from "next/navigation";
import { SUPPORTED_LOCALES, dictionary } from "../_i18n/dictionary";

export async function generateStaticParams() {
  return SUPPORTED_LOCALES.map((locale) => ({ locale }));
}

const LOCALE_OG = {
  uk: "uk_UA",
  ru: "ru_RU",
  en: "en_CA",
};

const HREFLANG = {
  uk: "uk-UA",
  ru: "ru-RU",
  en: "en-CA",
};

export async function generateMetadata({ params }) {
  const { locale } = await params;
  if (!SUPPORTED_LOCALES.includes(locale)) return {};

  const alternates = Object.fromEntries(
    SUPPORTED_LOCALES.map((l) => [HREFLANG[l], `/${l}`])
  );
  alternates["x-default"] = "/uk";

  return {
    alternates: {
      canonical: `/${locale}`,
      languages: alternates,
    },
    openGraph: {
      locale: LOCALE_OG[locale],
      alternateLocale: SUPPORTED_LOCALES.filter((l) => l !== locale).map(
        (l) => LOCALE_OG[l]
      ),
    },
  };
}

export default async function LocaleLayout({ children, params }) {
  const { locale } = await params;
  if (!SUPPORTED_LOCALES.includes(locale)) notFound();
  if (!dictionary[locale]) notFound();
  return <>{children}</>;
}
