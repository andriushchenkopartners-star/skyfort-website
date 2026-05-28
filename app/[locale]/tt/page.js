import Image from "next/image";
import TtLandingClient from "./tt-client";
import { SUPPORTED_LOCALES } from "../../_i18n/dictionary";

const META = {
  uk: {
    title: "Бачив у TikTok? Ось 4 кроки · SkyFort",
    description:
      "Безкоштовний дзвінок, гайди по TFSA/RRSP/FHSA та калькулятори для українців у Канаді. Licensed Dealing Representative.",
    ogTitle: "SkyFort · TikTok bio link",
    ogDesc: "Усе що тобі треба після TikTok-відео — за один екран.",
  },
  ru: {
    title: "Видел в TikTok? Вот 4 шага · SkyFort",
    description:
      "Бесплатный звонок, гайды по TFSA/RRSP/FHSA и калькуляторы для русскоязычных в Канаде. Licensed Dealing Representative.",
    ogTitle: "SkyFort · TikTok bio link",
    ogDesc: "Всё что нужно после TikTok-видео — на одном экране.",
  },
  en: {
    title: "Saw me on TikTok? Here are 4 steps · SkyFort",
    description:
      "Free discovery call, TFSA/RRSP/FHSA guides, and calculators for newcomers in Canada. Licensed Dealing Representative.",
    ogTitle: "SkyFort · TikTok bio link",
    ogDesc: "Everything you need after a TikTok video — on one screen.",
  },
};

export async function generateMetadata({ params }) {
  const { locale } = await params;
  const m = META[locale] || META.uk;
  const path = `/${locale}/tt`;
  const alternates = Object.fromEntries(
    SUPPORTED_LOCALES.map((l) => [
      { uk: "uk", ru: "ru", en: "en-CA" }[l],
      `/${l}/tt`,
    ])
  );
  alternates["x-default"] = "/uk/tt";
  return {
    title: m.title,
    description: m.description,
    alternates: { canonical: path, languages: alternates },
    openGraph: {
      title: m.ogTitle,
      description: m.ogDesc,
      url: `https://sky-fort.ca${path}`,
      // images: omitted — opengraph-image.js generates a TikTok-branded card.
    },
    twitter: {
      card: "summary_large_image",
      title: m.ogTitle,
    },
  };
}

export default async function TtLandingPage({ params }) {
  const { locale } = await params;
  return (
    <main id="main" className="min-h-screen bg-[var(--color-bg)]">
      <TtLandingClient
        locale={locale}
        portraitSrc="/andrii.jpg"
        portraitAlt="Andrii Andriushchenko, Licensed Dealing Representative, Calgary"
        ImageComponent={Image}
      />
    </main>
  );
}
