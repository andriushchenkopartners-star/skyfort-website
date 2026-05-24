import Link from "next/link";
import { ArrowRight, Flame } from "lucide-react";

const COPY = {
  uk: {
    kicker: "Калькулятор · Financial Freedom",
    title: "Коли ти станеш фінансово вільним?",
    desc: "Точна дата freedom на основі твоїх цифр. Побач як exempt market прискорює це на роки.",
    cta: "Розрахувати freedom date",
    stat1: "Сім'я · $11.6K/міс · ETF 8%",
    stat2: "19 років",
    stat3: "Exempt market: −1 рік",
  },
  ru: {
    kicker: "Калькулятор · Financial Freedom",
    title: "Когда ты станешь финансово свободным?",
    desc: "Точная дата freedom на основе твоих цифр. Увидь как exempt market ускоряет это на годы.",
    cta: "Рассчитать freedom date",
    stat1: "Семья · $11.6K/мес · ETF 8%",
    stat2: "19 лет",
    stat3: "Exempt market: −1 год",
  },
  en: {
    kicker: "Calculator · Financial Freedom",
    title: "When will you be financially free?",
    desc: "Exact freedom date based on your numbers. See how exempt market accelerates it by years.",
    cta: "Calculate freedom date",
    stat1: "Family · $11.6K/mo · ETF 8%",
    stat2: "19 years",
    stat3: "Exempt market: −1 year",
  },
};

export default function FireCalcPromo({ locale }) {
  const c = COPY[locale] || COPY.uk;
  return (
    <section className="relative overflow-hidden py-20 md:py-28">
      <div className="pointer-events-none absolute inset-0 z-0" aria-hidden="true">
        <div className="absolute -right-32 top-1/2 h-[400px] w-[400px] -translate-y-1/2 rounded-full bg-[#FFB627] opacity-[0.07] blur-3xl" />
      </div>
      <div className="mx-auto max-w-6xl px-6">
        <div className="overflow-hidden rounded-3xl border border-[#FFB627]/30 bg-gradient-to-br from-[#1f1f1f] to-[#2d2418] p-10 md:p-14">
          <div className="grid items-center gap-8 md:grid-cols-[1.5fr_1fr]">
            <div>
              <p className="mb-4 inline-flex items-center gap-2 text-[10px] font-bold uppercase tracking-[0.3em] text-[#FFB627]">
                <Flame className="h-3.5 w-3.5" />
                {c.kicker}
              </p>
              <h2 className="font-display-tight text-3xl text-white md:text-5xl">
                {c.title}
              </h2>
              <p className="mt-5 max-w-lg text-base leading-relaxed text-[#a3a3a3] md:text-lg">
                {c.desc}
              </p>
              <Link
                href={`/${locale}/calculators/financial-freedom`}
                className="group mt-8 inline-flex items-center gap-2 rounded-full bg-[#FFB627] px-6 py-3 text-sm font-bold uppercase tracking-wider text-[#191919] transition-all hover:bg-[#ffd066]"
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
                <p className="mt-3 font-display-tight text-5xl text-[#FFB627]">
                  {c.stat2}
                </p>
                <p className="mt-2 text-xs text-[#FFB627]/80">{c.stat3}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
