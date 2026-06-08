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
import TldrBlock from "../_components/TldrBlock";
import Reveal from "../_components/Reveal";
import { dictionary as t, resolveLocale } from "../_i18n/dictionary";

export default function SkyFortLanding({ params }) {
  const { locale: rawLocale } = use(params);
  const locale = resolveLocale(rawLocale);
  const content = t[locale];

  return (
    <main id="main" className="min-h-screen bg-[var(--color-bg)] text-white antialiased">
      <HomeNav locale={locale} content={content} />
      <Hero content={content} />
      <TrustBar locale={locale} />
      <section className="mx-auto max-w-3xl px-6 pt-10">
        <TldrBlock
          label={content.homeTldr.label}
          text={content.homeTldr.text}
          pageName="SkyFort Wealth"
          pageUrl={`https://sky-fort.ca/${locale}`}
        />
      </section>
      <Reveal><Stats content={content} /></Reveal>
      <Reveal><About content={content} /></Reveal>
      <Guides content={content} />
      <Reveal><CalcPromo content={content} locale={locale} /></Reveal>
      <Reveal><FireCalcPromo locale={locale} /></Reveal>
      <Reveal><MortgagePromo locale={locale} /></Reveal>
      <Reveal><Steps content={content} /></Reveal>
      <Reveal><EligibilityPromo locale={locale} /></Reveal>

      {/* Email capture — між Steps і FAQ, ~30% scroll */}
      <section className="border-y border-[var(--color-border)] bg-[var(--color-bg-card)] py-20 md:py-28">
        <div className="mx-auto max-w-3xl px-6">
          <EmailCaptureForm
            locale={locale}
            variant="card"
            source="homepage_inline"
            leadMagnet="TFSA_GUIDE"
          />
        </div>
      </section>

      <Reveal><Faq content={content} /></Reveal>
      <Reveal><Testimonials locale={locale} /></Reveal>
      <Reveal><FinalCta content={content} /></Reveal>
      <Footer content={content} locale={locale} />
    </main>
  );
}
