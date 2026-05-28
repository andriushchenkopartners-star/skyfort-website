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

// Per-locale homepage title + description. Root layout's metadata has
// `title.default` and a `description` in Ukrainian — without these overrides,
// /ru and /en SERP results would display the Ukrainian text (bad for CTR
// because users from those locales don't read it as their own language).
// Caught by May-28 re-audit (1.6 + 1.7).
const HOMEPAGE_META = {
  uk: {
    title:
      "SkyFort · TFSA, real estate, exempt market для українців у Канаді",
    description:
      "Канадські фінанси без банківських казок. Licensed Dealing Representative · Alberta · BC · Ontario. 7 безкоштовних гайдів про TFSA, RRSP, FHSA, real estate та exempt market.",
  },
  ru: {
    title:
      "SkyFort · TFSA, real estate, exempt market для русскоязычных в Канаде",
    description:
      "Канадские финансы без банковских сказок. Licensed Dealing Representative · Alberta · BC · Ontario. 7 бесплатных гайдов о TFSA, RRSP, FHSA, real estate и exempt market.",
  },
  en: {
    title:
      "SkyFort · TFSA, real estate, exempt market for newcomers in Canada",
    description:
      "Canadian finance without bank fairy tales. Licensed Dealing Representative · Alberta · BC · Ontario. 7 free guides on TFSA, RRSP, FHSA, real estate, and exempt market.",
  },
};

export async function generateMetadata({ params }) {
  const { locale } = await params;
  if (!SUPPORTED_LOCALES.includes(locale)) return {};

  const alternates = Object.fromEntries(
    SUPPORTED_LOCALES.map((l) => [HREFLANG[l], `/${l}`])
  );
  alternates["x-default"] = "/uk";

  const meta = HOMEPAGE_META[locale];

  return {
    // Sets `title.default` for this locale subtree. Child routes that export
    // their own `title` will still get wrapped by the root template
    // ("%s · SkyFort") — only the bare /[locale] root uses this default.
    title: { default: meta.title, template: "%s · SkyFort" },
    description: meta.description,
    alternates: {
      canonical: `/${locale}`,
      languages: alternates,
    },
    openGraph: {
      title: meta.title,
      description: meta.description,
      locale: LOCALE_OG[locale],
      alternateLocale: SUPPORTED_LOCALES.filter((l) => l !== locale).map(
        (l) => LOCALE_OG[l]
      ),
    },
    twitter: {
      title: meta.title,
      description: meta.description,
    },
  };
}

export default async function LocaleLayout({ children, params }) {
  const { locale } = await params;
  if (!SUPPORTED_LOCALES.includes(locale)) notFound();
  if (!dictionary[locale]) notFound();
  return <>{children}</>;
}
