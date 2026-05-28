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
  EligibilityPromo,
  Faq,
  Testimonials,
  FinalCta,
  Footer,
} from "../_sections";
import TrustBar from "../_components/TrustBar";
import EmailCaptureForm from "../_components/EmailCaptureForm";
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
      <EligibilityPromo locale={locale} />

      {/* Email capture — між Steps і FAQ, ~30% scroll */}
      <section className="border-y border-[#2a2a2a] bg-[#1f1f1f] py-20 md:py-28">
        <div className="mx-auto max-w-3xl px-6">
          <EmailCaptureForm
            locale={locale}
            variant="card"
            source="homepage_inline"
            leadMagnet="TFSA_GUIDE"
          />
        </div>
      </section>

      <Faq content={content} />
      <Testimonials locale={locale} />
      <FinalCta content={content} />
      <Footer content={content} locale={locale} />
    </main>
  );
}
