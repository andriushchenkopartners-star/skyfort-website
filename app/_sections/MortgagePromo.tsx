import Link from "next/link";
import { ArrowRight, Home } from "lucide-react";

type Locale = "uk" | "ru" | "en";

interface MortgagePromoCopy {
  kicker: string;
  title: string;
  desc: string;
  cta: string;
  stat1: string;
  stat2: string;
  stat3: string;
}

const COPY: Record<Locale, MortgagePromoCopy> = {
  uk: {
    kicker: "Калькулятор · Іпотека",
    title: "Канадська іпотека — 6 інструментів",
    desc: "Stress test, CMHC, дострокове погашення, розрив контракту, інвестиція, доступність — все в одному.",
    cta: "Відкрити калькулятор",
    stat1: "$650K · 20% · 4.5% · 25р",
    stat2: "$2,890",
    stat3: "Bi-weekly: −3 роки",
  },
  ru: {
    kicker: "Калькулятор · Ипотека",
    title: "Канадская ипотека — 6 инструментов",
    desc: "Стресс-тест, CMHC, досрочное погашение, разрыв контракта, инвестиция, доступность — всё в одном.",
    cta: "Открыть калькулятор",
    stat1: "$650K · 20% · 4.5% · 25р",
    stat2: "$2,890",
    stat3: "Bi-weekly: −3 года",
  },
  en: {
    kicker: "Calculator · Mortgage",
    title: "Canadian mortgage — 6 tools",
    desc: "Stress test, CMHC, early payoff, break penalty, investment, affordability — all in one.",
    cta: "Open calculator",
    stat1: "$650K · 20% · 4.5% · 25y",
    stat2: "$2,890",
    stat3: "Bi-weekly: −3 years",
  },
};

export default function MortgagePromo({ locale }: { locale: Locale }) {
  const c = COPY[locale] || COPY.uk;
  return (
    <section className="relative overflow-hidden py-20 md:py-28">
      <div className="pointer-events-none absolute inset-0 z-0" aria-hidden="true">
        <div className="absolute -left-32 top-1/2 h-[400px] w-[400px] -translate-y-1/2 rounded-full bg-[var(--color-brand)] opacity-[0.07] blur-3xl" />
      </div>
      <div className="mx-auto max-w-6xl px-6">
        <div className="overflow-hidden rounded-3xl border border-[var(--color-brand)]/30 bg-gradient-to-br from-[#1f1f1f] to-[#1a2438] p-10 md:p-14">
          <div className="grid items-center gap-8 md:grid-cols-[1.5fr_1fr]">
            <div>
              <p className="mb-4 inline-flex items-center gap-2 text-[10px] font-bold uppercase tracking-[0.3em] text-[var(--color-brand)]">
                <Home className="h-3.5 w-3.5" />
                {c.kicker}
              </p>
              <h2 className="font-display-tight text-3xl text-white md:text-5xl">
                {c.title}
              </h2>
              <p className="mt-5 max-w-lg text-base leading-relaxed text-[#a3a3a3] md:text-lg">
                {c.desc}
              </p>
              <Link
                href={`/${locale}/calculators/mortgage`}
                className="group mt-8 inline-flex items-center gap-2 rounded-full bg-[var(--color-brand)] px-6 py-3 text-sm font-bold uppercase tracking-wider text-white transition-all hover:bg-[var(--color-brand-hover)]"
              >
                {c.cta}
                <ArrowRight
                  className="h-4 w-4 transition-transform group-hover:translate-x-0.5"
                  aria-hidden="true"
                />
              </Link>
            </div>
            <div className="hidden md:block">
              <div className="rounded-2xl border border-[#3a3a3a] bg-[#191919] p-6 text-center">
                <p className="text-xs uppercase tracking-wider text-[#6b6b6b]">
                  {c.stat1}
                </p>
                <p className="mt-3 font-display-tight text-5xl text-[var(--color-brand)]">
                  {c.stat2}
                </p>
                <p className="mt-2 text-xs text-green-400">{c.stat3}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
