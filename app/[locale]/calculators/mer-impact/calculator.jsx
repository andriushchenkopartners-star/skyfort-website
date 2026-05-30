// MER impact calculator — interactive client component.
// Math: compound monthly contributions at (gross - mer) annualized rate.
// Compares two scenarios side-by-side: high-MER (bank mutual fund) vs
// low-MER (self-directed ETF).
//
// T-REX score = (final value at low MER) / (final value at high MER).
// Higher T-REX = more of your money working for you, less for the fund.

"use client";

import { useState, useMemo } from "react";
import { TrendingDown, Calculator, Info, Link as LinkIcon } from "lucide-react";
import { useUrlState, copyShareUrl } from "../../../_lib/use-url-state";
import TldrBlock from "../../../_components/TldrBlock";

function compound({ monthly, years, annualRate, mer }) {
  const netRate = (annualRate - mer) / 100;
  const monthlyRate = netRate / 12;
  const n = years * 12;
  // Future value of an ordinary annuity (contributions at end of period).
  if (monthlyRate === 0) return monthly * n;
  return monthly * ((Math.pow(1 + monthlyRate, n) - 1) / monthlyRate);
}

const T = {
  uk: {
    title: "MER калькулятор: скільки комісії з'їдають",
    sub: "Реальна різниця між банківським mutual fund та self-directed ETF на твоїй horizon",
    tldrLabel: "Коротко",
    tldr: "MER (management expense ratio) — це річна комісія фонду, яку стягують незалежно від результату. Навіть 1–2% різниці за десятиліття коштують десятки тисяч через втрачений складний відсоток. Цей калькулятор показує гіпотетичну різницю між високим і низьким MER. Освітній інструмент, не інвестиційна порада.",
    inputs: {
      monthly: "Щомісячний внесок ($)",
      years: "Років",
      grossReturn: "Очікувана gross дохідність (%)",
      highMer: "MER #1 (типово банк)",
      lowMer: "MER #2 (типово self-directed ETF)",
    },
    presets: "Швидкі сценарії:",
    p1: "$500/міс · 30 років · 8%",
    p2: "$1,000/міс · 25 років · 7%",
    p3: "$300/міс · 40 років · 8%",
    out: {
      title: "Результати",
      finalHigh: "Фінальний капітал з MER #1",
      finalLow: "Фінальний капітал з MER #2",
      delta: "Різниця у $",
      deltaPct: "Втрачено через високий MER",
      trex: "T-REX score (efficiency)",
      yearsLost: "Років роботи віддано фонду",
    },
    explainTitle: "Як читати T-REX score",
    explainBody:
      "T-REX = яка частка compound return залишається в тебе після MER. 100% = ідеально (0 MER). 60% = $40 з кожних $100 потенційного прибутку пішло фонду. Larry Bates у книзі «Beat the Bank» каже: «Якщо T-REX < 70%, ти платиш за послугу яку можеш отримати у 10× дешевше через self-directed ETF».",
    embedTitle: "Поділись цим калькулятором",
    embedSub: "Вставити на свій сайт або blog",
    disclaimer:
      "Estimation на основі простого compound math (constant rate, monthly contributions). Не враховує taxes, contribution limits, market volatility. Не investment advice — для індивідуального налаштування CPA + Licensed DR (NRD #4575551).",
  },
  ru: {
    title: "MER калькулятор: сколько комиссии съедают",
    sub: "Реальная разница между банковским mutual fund и self-directed ETF",
    tldrLabel: "Коротко",
    tldr: "MER (management expense ratio) — это годовая комиссия фонда, взимаемая независимо от результата. Даже 1–2% разницы за десятилетие стоят десятки тысяч из-за потерянного сложного процента. Этот калькулятор показывает гипотетическую разницу между высоким и низким MER. Образовательный инструмент, не инвестиционный совет.",
    inputs: {
      monthly: "Ежемесячный взнос ($)",
      years: "Лет",
      grossReturn: "Ожидаемая gross доходность (%)",
      highMer: "MER #1 (типично банк)",
      lowMer: "MER #2 (типично self-directed ETF)",
    },
    presets: "Быстрые сценарии:",
    p1: "$500/мес · 30 лет · 8%",
    p2: "$1,000/мес · 25 лет · 7%",
    p3: "$300/мес · 40 лет · 8%",
    out: {
      title: "Результаты",
      finalHigh: "Финальный капитал с MER #1",
      finalLow: "Финальный капитал с MER #2",
      delta: "Разница в $",
      deltaPct: "Потеряно через высокий MER",
      trex: "T-REX score (efficiency)",
      yearsLost: "Лет работы отдано фонду",
    },
    explainTitle: "Как читать T-REX score",
    explainBody:
      "T-REX = какая часть compound return остаётся у тебя после MER. 100% = идеально. 60% = $40 из каждых $100 потенциального дохода ушло фонду.",
    embedTitle: "Поделись калькулятором",
    embedSub: "Вставить на свой сайт или blog",
    disclaimer:
      "Estimation на основе compound math. Не учитывает taxes, limits, volatility. Не investment advice — для индивидуальной настройки CPA + Licensed DR (NRD #4575551).",
  },
  en: {
    title: "MER impact calculator: how much fees eat",
    sub: "Real dollar gap between bank mutual fund and self-directed ETF over your horizon",
    tldrLabel: "TL;DR",
    tldr: "An MER (management expense ratio) is a fund's annual fee, charged regardless of performance. Even a 1–2% difference compounds into tens of thousands lost over a decade. This calculator shows the hypothetical gap between a high and low MER. It's an educational tool, not investment advice.",
    inputs: {
      monthly: "Monthly contribution ($)",
      years: "Years",
      grossReturn: "Expected gross return (%)",
      highMer: "MER #1 (typically bank)",
      lowMer: "MER #2 (typically self-directed ETF)",
    },
    presets: "Quick scenarios:",
    p1: "$500/mo · 30 yrs · 8%",
    p2: "$1,000/mo · 25 yrs · 7%",
    p3: "$300/mo · 40 yrs · 8%",
    out: {
      title: "Results",
      finalHigh: "Final capital with MER #1",
      finalLow: "Final capital with MER #2",
      delta: "Difference in $",
      deltaPct: "Lost to higher MER",
      trex: "T-REX score (efficiency)",
      yearsLost: "Years of work given to the fund",
    },
    explainTitle: "How to read the T-REX score",
    explainBody:
      "T-REX = the share of compound return you actually keep after MER. 100% = perfect (no MER). 60% = $40 of every $100 of potential gain went to the fund. Larry Bates in 'Beat the Bank': 'If T-REX is below 70%, you're paying for a service you could get 10× cheaper via self-directed ETF.'",
    embedTitle: "Share this calculator",
    embedSub: "Embed on your site or blog",
    disclaimer:
      "Estimation based on simple compound math (constant rate, monthly contributions). Does not account for taxes, contribution limits, market volatility. Not investment advice — for individual setup consult a CPA + Licensed DR (NRD #4575551).",
  },
};

const PRESETS = [
  { monthly: 500, years: 30, grossReturn: 8, highMer: 2.0, lowMer: 0.2 },
  { monthly: 1000, years: 25, grossReturn: 7, highMer: 2.0, lowMer: 0.2 },
  { monthly: 300, years: 40, grossReturn: 8, highMer: 2.0, lowMer: 0.2 },
];

function fmt(n) {
  return "$" + Math.round(n).toLocaleString("en-CA");
}

export default function MerCalculator({ locale = "uk" }) {
  const t = T[locale] || T.uk;
  // useUrlState — reads ?monthly=500&years=30&… on mount, writes URL on
  // every change (debounced via microtask). Shared link reproduces exact
  // scenario for the recipient. Audit 7 #8 link-magnet pattern.
  const [monthly, setMonthly] = useUrlState("monthly", 500, "number");
  const [years, setYears] = useUrlState("years", 30, "number");
  const [grossReturn, setGrossReturn] = useUrlState("rate", 8, "number");
  const [highMer, setHighMer] = useUrlState("merA", 2.0, "number");
  const [lowMer, setLowMer] = useUrlState("merB", 0.2, "number");
  const [copyState, setCopyState] = useState("idle");

  async function onCopyLink() {
    const ok = await copyShareUrl();
    setCopyState(ok ? "copied" : "failed");
    setTimeout(() => setCopyState("idle"), 2000);
  }

  const result = useMemo(() => {
    const finalHigh = compound({ monthly, years, annualRate: grossReturn, mer: highMer });
    const finalLow = compound({ monthly, years, annualRate: grossReturn, mer: lowMer });
    const delta = finalLow - finalHigh;
    const deltaPct = finalLow > 0 ? (delta / finalLow) * 100 : 0;
    const trex = finalLow > 0 ? (finalHigh / finalLow) * 100 : 0;
    // Years-lost = how many additional contribution-years the high-MER
    // investor would need to match the low-MER outcome (rough estimate
    // assuming continuation at the same low-MER rate).
    const yearsLost = delta > 0 ? Math.round((delta / (finalLow / years)) * 10) / 10 : 0;
    return { finalHigh, finalLow, delta, deltaPct, trex, yearsLost };
  }, [monthly, years, grossReturn, highMer, lowMer]);

  const embedSnippet = `<iframe src="https://sky-fort.ca/${locale}/calculators/mer-impact?embed=1" width="100%" height="640" frameborder="0" loading="lazy"></iframe>`;

  return (
    <section className="px-6 pb-12">
      <div className="mx-auto max-w-3xl">
        <div className="mb-6">
          <p className="text-xs font-bold uppercase tracking-[0.18em] text-[var(--color-brand)]">
            <Calculator className="inline-block h-4 w-4 mr-1" /> Calculator
          </p>
          <h1 className="mt-3 text-3xl sm:text-4xl font-extrabold">{t.title}</h1>
          <p className="mt-3 text-lg text-white/75">{t.sub}</p>
          <div className="mt-6">
            <TldrBlock
              label={t.tldrLabel}
              text={t.tldr}
              pageName={t.title}
              pageUrl={`https://sky-fort.ca/${locale}/calculators/mer-impact`}
            />
          </div>
        </div>

        <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-6">
          {/* Inputs */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Field label={t.inputs.monthly}>
              <input type="number" min={0} value={monthly} onChange={(e) => setMonthly(Number(e.target.value) || 0)} className="w-full rounded-lg border border-white/15 bg-black/30 px-3 py-2 text-white" />
            </Field>
            <Field label={t.inputs.years}>
              <input type="number" min={1} max={60} value={years} onChange={(e) => setYears(Number(e.target.value) || 1)} className="w-full rounded-lg border border-white/15 bg-black/30 px-3 py-2 text-white" />
            </Field>
            <Field label={t.inputs.grossReturn}>
              <input type="number" min={0} step={0.5} value={grossReturn} onChange={(e) => setGrossReturn(Number(e.target.value) || 0)} className="w-full rounded-lg border border-white/15 bg-black/30 px-3 py-2 text-white" />
            </Field>
            <Field label={t.inputs.highMer}>
              <input type="number" min={0} step={0.1} value={highMer} onChange={(e) => setHighMer(Number(e.target.value) || 0)} className="w-full rounded-lg border border-white/15 bg-black/30 px-3 py-2 text-white" />
            </Field>
            <Field label={t.inputs.lowMer}>
              <input type="number" min={0} step={0.05} value={lowMer} onChange={(e) => setLowMer(Number(e.target.value) || 0)} className="w-full rounded-lg border border-white/15 bg-black/30 px-3 py-2 text-white" />
            </Field>
          </div>

          {/* Presets */}
          <div className="mt-5">
            <p className="mb-2 text-xs font-bold uppercase tracking-wider text-white/50">{t.presets}</p>
            <div className="flex flex-wrap gap-2">
              {PRESETS.map((p, i) => (
                <button
                  key={i}
                  type="button"
                  onClick={() => {
                    setMonthly(p.monthly);
                    setYears(p.years);
                    setGrossReturn(p.grossReturn);
                    setHighMer(p.highMer);
                    setLowMer(p.lowMer);
                  }}
                  className="rounded-md border border-white/10 bg-black/40 px-3 py-1.5 text-xs font-semibold text-white/85 hover:border-[var(--color-brand)]/40 hover:text-white"
                >
                  {t[`p${i + 1}`]}
                </button>
              ))}
            </div>
          </div>

          {/* Outputs */}
          <div className="mt-6 rounded-xl border border-[var(--color-brand)]/30 bg-[var(--color-brand)]/[0.06] p-5">
            <p className="text-xs font-bold uppercase tracking-[0.14em] text-[var(--color-brand)]">{t.out.title}</p>
            <dl className="mt-3 space-y-2.5 text-sm">
              <Row label={`${t.out.finalHigh} (${highMer}%)`} value={fmt(result.finalHigh)} muted />
              <Row label={`${t.out.finalLow} (${lowMer}%)`} value={fmt(result.finalLow)} good />
              <Row label={t.out.delta} value={fmt(result.delta)} big good />
              <Row label={t.out.deltaPct} value={Math.round(result.deltaPct) + "%"} />
              <Row label={t.out.trex} value={Math.round(result.trex) + "%"} />
              <Row label={t.out.yearsLost} value={result.yearsLost + " " + (locale === "en" ? "years" : "р.")} />
            </dl>
          </div>

          {/* T-REX explainer */}
          <div className="mt-5 rounded-xl border border-amber-500/30 bg-amber-500/[0.05] p-4">
            <p className="flex items-center gap-2 text-xs font-bold uppercase tracking-[0.14em] text-amber-300">
              <TrendingDown size={14} aria-hidden="true" /> {t.explainTitle}
            </p>
            <p className="mt-2 text-sm leading-relaxed text-white/80">{t.explainBody}</p>
          </div>

          {/* Share-link button (Audit 7 #8 link-magnet pattern) */}
          <div className="mt-5 flex flex-wrap items-center gap-3">
            <button
              type="button"
              onClick={onCopyLink}
              className="inline-flex items-center gap-2 rounded-lg border border-[var(--color-brand)]/40 bg-[var(--color-brand)]/[0.08] px-4 py-2 text-sm font-bold text-[var(--color-brand)] hover:bg-[var(--color-brand)]/[0.14]"
            >
              <LinkIcon size={14} aria-hidden="true" />
              {copyState === "copied"
                ? locale === "ru"
                  ? "Скопировано!"
                  : locale === "en"
                  ? "Copied!"
                  : "Скопійовано!"
                : copyState === "failed"
                ? locale === "ru"
                  ? "Ошибка копирования"
                  : locale === "en"
                  ? "Copy failed"
                  : "Помилка копіювання"
                : locale === "ru"
                ? "Скопировать мою ссылку"
                : locale === "en"
                ? "Copy my link"
                : "Скопіювати моє посилання"}
            </button>
            <p className="text-xs text-white/55">
              {locale === "ru"
                ? "URL містить твої параметри — поділись з friend"
                : locale === "en"
                ? "URL contains your inputs — share with a friend"
                : "URL містить твої параметри — поділись з другом"}
            </p>
          </div>

          {/* Embed snippet */}
          <div className="mt-5">
            <p className="text-xs font-bold uppercase tracking-wider text-white/50">{t.embedTitle}</p>
            <p className="mt-1 text-xs text-white/55">{t.embedSub}</p>
            <pre className="mt-2 overflow-x-auto rounded-lg border border-white/10 bg-black/40 p-3 text-[11px] text-white/75">
              <code>{embedSnippet}</code>
            </pre>
          </div>

          {/* Disclaimer */}
          <p className="mt-5 flex items-start gap-2 text-xs text-white/55 leading-relaxed">
            <Info className="mt-0.5 h-3 w-3 flex-shrink-0" aria-hidden="true" />
            <span>{t.disclaimer}</span>
          </p>
        </div>
      </div>
    </section>
  );
}

function Field({ label, children }) {
  return (
    <label className="block">
      <span className="mb-1 block text-xs font-bold uppercase tracking-wider text-white/60">{label}</span>
      {children}
    </label>
  );
}

function Row({ label, value, muted, good, big }) {
  return (
    <div className="flex items-baseline justify-between gap-4 border-b border-white/5 pb-2 last:border-0 last:pb-0">
      <dt className="text-white/65">{label}</dt>
      <dd className={`font-mono font-semibold ${big ? "text-xl text-white" : "text-base"} ${good ? "text-[var(--color-brand)]" : muted ? "text-white/55" : "text-white"}`}>
        {value}
      </dd>
    </div>
  );
}
