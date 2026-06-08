import Link from "next/link";
import { ArrowRight, Calculator } from "lucide-react";

type Locale = "uk" | "ru" | "en";

interface CalcSample {
  meta: string;
  value: string;
  vs: string;
}

interface CalcPromoContent {
  calcPromo: {
    kicker: string;
    title: string;
    desc: string;
    cta: string;
  };
}

// Localised mini-stat copy for the right-hand sample card.
// Previously these strings were hardcoded in Ukrainian, which leaked onto
// /ru and /en — caught by May-28 re-audit (1.5).
const SAMPLE: Record<Locale, CalcSample> = {
  uk: { meta: "$500/міс · 20 років · diversified 8%", value: "$295K", vs: "vs $120K у банку" },
  ru: { meta: "$500/мес · 20 лет · diversified 8%", value: "$295K", vs: "vs $120K в банке" },
  en: { meta: "$500/mo · 20 years · diversified 8%", value: "$295K", vs: "vs $120K in bank savings" },
};

export default function CalcPromo({ content, locale }: { content: CalcPromoContent; locale: Locale }) {
  const s = SAMPLE[locale] || SAMPLE.uk;
  return (
    <section className="relative overflow-hidden py-20 md:py-28">
      <div className="pointer-events-none absolute inset-0 z-0" aria-hidden="true">
        <div className="absolute -left-32 top-1/2 h-[400px] w-[400px] -translate-y-1/2 rounded-full bg-[var(--color-brand)] opacity-[0.07] blur-3xl" />
      </div>
      <div className="mx-auto max-w-6xl px-6">
        <div className="overflow-hidden rounded-3xl border border-[var(--color-brand)]/30 bg-gradient-to-br from-[#1f1f1f] to-[#1a2d4a] p-10 md:p-14">
          <div className="grid items-center gap-8 md:grid-cols-[1.5fr_1fr]">
            <div>
              <p className="mb-4 inline-flex items-center gap-2 text-[10px] font-bold uppercase tracking-[0.3em] text-[var(--color-brand)]">
                <Calculator className="h-3.5 w-3.5" />
                {content.calcPromo.kicker}
              </p>
              <h2 className="font-display-tight text-3xl text-white md:text-5xl">
                {content.calcPromo.title}
              </h2>
              <p className="mt-5 max-w-lg text-base leading-relaxed text-[#a3a3a3] md:text-lg">
                {content.calcPromo.desc}
              </p>
              <Link
                href={`/${locale}/calculators/tfsa-growth`}
                className="group mt-8 inline-flex items-center gap-2 rounded-full bg-[var(--color-brand)] px-6 py-3 text-sm font-bold uppercase tracking-wider text-white transition-[transform,background-color] duration-200 ease-[var(--ease-out)] hover:bg-[var(--color-brand-hover)] active:scale-[0.98]"
              >
                {content.calcPromo.cta}
                <ArrowRight
                  className="h-4 w-4 transition-transform group-hover:translate-x-0.5"
                  aria-hidden="true"
                />
              </Link>
            </div>
            <div className="hidden md:block">
              <div className="rounded-2xl border border-[#3a3a3a] bg-[#191919] p-6 text-center">
                <p className="text-xs uppercase tracking-wider text-[#6b6b6b]">
                  {s.meta}
                </p>
                <p className="mt-3 font-display-tight text-5xl text-[var(--color-brand)]">
                  {s.value}
                </p>
                <p className="mt-2 text-xs text-[#6b6b6b]">{s.vs}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
