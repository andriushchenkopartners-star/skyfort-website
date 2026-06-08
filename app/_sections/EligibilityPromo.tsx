// app/_sections/EligibilityPromo.tsx
// Homepage promo strip for the Eligible Investor self-check quiz at
// /[locale]/eligibility. Sits between Steps and EmailCapture as an
// alternative "quick path" — visitors who aren't ready to commit to a
// 30-min call get a 60-sec self-diagnostic instead.
//
// Server component (no client logic). Localised inline.

import Link from "next/link";
import { ArrowRight, ShieldCheck } from "lucide-react";

type Locale = "uk" | "ru" | "en";

interface EligibilityCopy {
  eyebrow: string;
  title: string;
  body: string;
  bullet1: string;
  bullet2: string;
  bullet3: string;
  cta: string;
}

const COPY: Record<Locale, EligibilityCopy> = {
  uk: {
    eyebrow: "Тест за 60 секунд",
    title: "Чи ти Eligible Investor?",
    body: "За регуляторними фінансовими тестами NI 45-106 ти або відкритий до exempt market, або краще будуєш базу через TFSA / RRSP / FHSA. 4 питання — і ти знаєш свою попередню категорію.",
    bullet1: "Без email · усе у твоєму браузері",
    bullet2: "60 секунд · 4 питання",
    bullet3: "За CSA NI 45-106 §1.1",
    cta: "Пройти self-check",
  },
  ru: {
    eyebrow: "Тест за 60 секунд",
    title: "Ты Eligible Investor?",
    body: "По регуляторным финансовым тестам NI 45-106 ты или открыт для exempt market, или лучше строишь базу через TFSA / RRSP / FHSA. 4 вопроса — и ты знаешь свою предварительную категорию.",
    bullet1: "Без email · всё в твоём браузере",
    bullet2: "60 секунд · 4 вопроса",
    bullet3: "По CSA NI 45-106 §1.1",
    cta: "Пройти self-check",
  },
  en: {
    eyebrow: "60-second self-check",
    title: "Are you an Eligible Investor?",
    body: "Under NI 45-106 financial tests, you're either opened up to the exempt market or you should start by building a base with TFSA / RRSP / FHSA first. 4 questions — and you have your preliminary category.",
    bullet1: "No email · all in your browser",
    bullet2: "60 seconds · 4 questions",
    bullet3: "Per CSA NI 45-106 §1.1",
    cta: "Take the self-check",
  },
};

export default function EligibilityPromo({ locale = "uk" }: { locale?: Locale }) {
  const c = COPY[locale] || COPY.uk;
  return (
    <section className="relative overflow-hidden py-20 md:py-28">
      {/* Subtle brand glow */}
      <div className="pointer-events-none absolute inset-0 z-0" aria-hidden="true">
        <div className="absolute -left-32 top-1/2 h-[420px] w-[420px] -translate-y-1/2 rounded-full bg-[var(--color-brand)] opacity-[0.07] blur-3xl" />
      </div>

      <div className="relative mx-auto max-w-6xl px-6">
        <div className="overflow-hidden rounded-3xl border border-[var(--color-brand)]/30 bg-gradient-to-br from-[var(--color-bg-card)] to-[#0d2860] p-10 md:p-14">
          <div className="grid items-center gap-10 md:grid-cols-[1.4fr_1fr]">
            <div>
              <p className="mb-4 inline-flex items-center gap-2 text-[10px] font-bold uppercase tracking-[0.3em] text-[var(--color-brand)]">
                <ShieldCheck className="h-3.5 w-3.5" aria-hidden="true" />
                {c.eyebrow}
              </p>
              <h2 className="font-display-tight text-3xl text-white md:text-5xl">{c.title}</h2>
              <p className="mt-5 max-w-xl text-base leading-relaxed text-[#c4c4c4] md:text-lg">{c.body}</p>
              <Link
                href={`/${locale}/eligibility`}
                className="group mt-8 inline-flex items-center gap-2 rounded-full bg-[var(--color-brand)] px-6 py-3 text-sm font-bold uppercase tracking-wider text-white transition-[transform,background-color] duration-200 ease-[var(--ease-out)] hover:bg-[var(--color-brand-hover)] active:scale-[0.98]"
              >
                {c.cta}
                <ArrowRight
                  className="h-4 w-4 transition-transform group-hover:translate-x-0.5"
                  aria-hidden="true"
                />
              </Link>
            </div>
            <div className="hidden md:block">
              <ul className="space-y-3 rounded-2xl border border-[var(--color-border-strong)] bg-[var(--color-bg)] p-6">
                {[c.bullet1, c.bullet2, c.bullet3].map((b, i) => (
                  <li
                    key={i}
                    className="flex items-start gap-3 text-sm text-[#c4c4c4]"
                  >
                    <span className="mt-1 inline-block h-1.5 w-1.5 flex-shrink-0 rounded-full bg-[var(--color-brand)]" />
                    <span>{b}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
