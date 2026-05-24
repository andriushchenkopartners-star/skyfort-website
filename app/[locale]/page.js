"use client";

import { use } from "react";
import {
  HomeNav,
  Hero,
  Stats,
  About,
  Guides,
  CalcPromo,
  MortgagePromo,
  FireCalcPromo,
  Steps,
  Faq,
  FinalCta,
  Footer,
} from "../_sections";
import TrustBar from "../_components/TrustBar";
import { dictionary as t, resolveLocale } from "../_i18n/dictionary";

export default function SkyFortLanding({ params }) {
  const { locale: rawLocale } = use(params);
  const locale = resolveLocale(rawLocale);
  const content = t[locale];

  return (
    <main id="main" className="min-h-screen bg-[#191919] text-white antialiased">
      <HomeNav locale={locale} content={content} />
      <Hero content={content} />
      <TrustBar locale={locale} />
      <Stats content={content} />
      <About content={content} />
      <Guides content={content} />
      <CalcPromo content={content} locale={locale} />
      <FireCalcPromo locale={locale} />
      <MortgagePromo locale={locale} />
      <Steps content={content} />
      <Faq content={content} />
      <FinalCta content={content} />
      <Footer content={content} />
    </main>
  );
}
