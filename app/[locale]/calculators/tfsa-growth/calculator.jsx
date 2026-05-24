"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import dynamic from "next/dynamic";
import { ArrowRight, TrendingUp, Calculator } from "lucide-react";
import Logo from "../../../_components/Logo";
import Breadcrumbs from "../../../_components/Breadcrumbs";
import LangSwitcher from "../../../_components/LangSwitcher";
import { resolveLocale } from "../../../_i18n/dictionary";

// Lazy-load the chart (recharts is ~80KB gzip) — saves it from the initial bundle.
const TfsaChart = dynamic(() => import("./chart"), {
  ssr: false,
  loading: () => (
    <div
      className="h-[420px] w-full animate-pulse rounded-xl border border-[#2a2a2a] bg-[#1f1f1f]"
      aria-label="Loading chart"
    />
  ),
});

// ─────────────────────────────────────────────────────────────────────────────
// TRANSLATIONS
// ─────────────────────────────────────────────────────────────────────────────

const t = {
  uk: {
    backToHome: "На головну",
    kicker: "Калькулятор · TFSA Growth",
    title: "Скільки буде у твоєму TFSA через 20 років?",
    sub: "Реальна математика compound interest. Порівняй банк, GIC і ETF — побач різницю своїми очима.",
    inputs: {
      initial: "Початковий капітал",
      monthly: "Щомісячний внесок",
      years: "Років",
      rate: "Очікувана річна доходність",
    },
    placeholders: {
      initial: "10000",
      monthly: "500",
      years: "20",
      rate: "8",
    },
    presets: {
      title: "Або обери стратегію:",
      bank: { label: "Банк savings", rate: 1.5 },
      gic: { label: "GIC", rate: 3 },
      conservative: { label: "Conservative ETF", rate: 6 },
      balanced: { label: "Balanced ETF", rate: 8 },
      aggressive: { label: "Aggressive ETF", rate: 10 },
    },
    resultLabel: "Через X років ти матимеш",
    contributed: "Внесено власних коштів",
    gained: "Заробив compound interest",
    comparisonTitle: "Порівняння стратегій",
    chartLabels: {
      year: "Рік",
      value: "Сума, $",
      bank: "Банк (1.5%)",
      gic: "GIC (3%)",
      conservative: "Conservative ETF (6%)",
      balanced: "Balanced ETF (8%)",
      aggressive: "Aggressive ETF (10%)",
      yourPlan: "Твій план",
    },
    insightTitle: "Що це значить",
    insightDesc: "Кожен 1% різниці у річній доходності за 20 років = десятки тисяч доларів. Банк savings гарантує що ти втрачаєш до інфляції. GIC ледь покриває inflation. ETF historically випереджає на 4-7%.",
    ctaTitle: "Готовий зробити перший крок?",
    ctaSub: "30-хвилинна безкоштовна консультація. Розглянемо твою ситуацію і налаштуємо TFSA правильно.",
    ctaBtn: "Записатись на consultation",
    disclaimer: "Калькулятор показує гіпотетичні результати на основі середніх історичних доходностей. Минулі результати не гарантують майбутніх. Не є investment advice — для персональних рекомендацій запишись на консультацію. ETF, mutual funds та individual stocks — поза моєю ліцензією; для рекомендацій по public market звертайся до CIRO-registered advisor. Я працюю з exempt market securities через Axcess Capital Advisors Inc. (EMD, AB/BC/ON).",
  },

  ru: {
    backToHome: "На главную",
    kicker: "Калькулятор · TFSA Growth",
    title: "Сколько будет в твоём TFSA через 20 лет?",
    sub: "Реальная математика compound interest. Сравни банк, GIC и ETF — увидь разницу своими глазами.",
    inputs: {
      initial: "Начальный капитал",
      monthly: "Ежемесячный взнос",
      years: "Лет",
      rate: "Ожидаемая годовая доходность",
    },
    placeholders: {
      initial: "10000",
      monthly: "500",
      years: "20",
      rate: "8",
    },
    presets: {
      title: "Или выбери стратегию:",
      bank: { label: "Банк savings", rate: 1.5 },
      gic: { label: "GIC", rate: 3 },
      conservative: { label: "Conservative ETF", rate: 6 },
      balanced: { label: "Balanced ETF", rate: 8 },
      aggressive: { label: "Aggressive ETF", rate: 10 },
    },
    resultLabel: "Через X лет ты получишь",
    contributed: "Внесено собственных средств",
    gained: "Заработано compound interest",
    comparisonTitle: "Сравнение стратегий",
    chartLabels: {
      year: "Год",
      value: "Сумма, $",
      bank: "Банк (1.5%)",
      gic: "GIC (3%)",
      conservative: "Conservative ETF (6%)",
      balanced: "Balanced ETF (8%)",
      aggressive: "Aggressive ETF (10%)",
      yourPlan: "Твой план",
    },
    insightTitle: "Что это значит",
    insightDesc: "Каждый 1% разницы в годовой доходности за 20 лет = десятки тысяч долларов. Банк savings гарантирует что ты теряешь к инфляции. GIC едва покрывает инфляцию. ETF historically опережает на 4-7%.",
    ctaTitle: "Готов сделать первый шаг?",
    ctaSub: "30-минутная бесплатная консультация. Разберём твою ситуацию и настроим TFSA правильно.",
    ctaBtn: "Записаться на consultation",
    disclaimer: "Калькулятор показывает гипотетические результаты на основе средних исторических доходностей. Прошлые результаты не гарантируют будущих. Не является investment advice — для персональных рекомендаций запишись на консультацию. ETF, mutual funds и individual stocks — вне моей лицензии; для рекомендаций по public market обращайся к CIRO-registered advisor. Я работаю с exempt market securities через Axcess Capital Advisors Inc. (EMD, AB/BC/ON).",
  },

  en: {
    backToHome: "Back to home",
    kicker: "Calculator · TFSA Growth",
    title: "How much will your TFSA have in 20 years?",
    sub: "Real compound interest math. Compare bank, GIC, and ETF — see the difference with your own eyes.",
    inputs: {
      initial: "Initial capital",
      monthly: "Monthly contribution",
      years: "Years",
      rate: "Expected annual return",
    },
    placeholders: {
      initial: "10000",
      monthly: "500",
      years: "20",
      rate: "8",
    },
    presets: {
      title: "Or pick a strategy:",
      bank: { label: "Bank savings", rate: 1.5 },
      gic: { label: "GIC", rate: 3 },
      conservative: { label: "Conservative ETF", rate: 6 },
      balanced: { label: "Balanced ETF", rate: 8 },
      aggressive: { label: "Aggressive ETF", rate: 10 },
    },
    resultLabel: "In X years you'll have",
    contributed: "Own contributions",
    gained: "Compound interest earned",
    comparisonTitle: "Strategy comparison",
    chartLabels: {
      year: "Year",
      value: "Amount, $",
      bank: "Bank (1.5%)",
      gic: "GIC (3%)",
      conservative: "Conservative ETF (6%)",
      balanced: "Balanced ETF (8%)",
      aggressive: "Aggressive ETF (10%)",
      yourPlan: "Your plan",
    },
    insightTitle: "What this means",
    insightDesc: "Every 1% difference in annual return over 20 years = tens of thousands of dollars. Bank savings guarantees you lose to inflation. GIC barely covers inflation. ETF historically outperforms by 4-7%.",
    ctaTitle: "Ready to take the first step?",
    ctaSub: "30-minute free consultation. We'll review your situation and set up your TFSA properly.",
    ctaBtn: "Book a consultation",
    disclaimer: "Calculator shows hypothetical results based on average historical returns. Past performance doesn't guarantee future results. Not investment advice — for personal recommendations, book a consultation. ETFs, mutual funds, and individual stocks are outside my license; for public market recommendations, consult a CIRO-registered advisor. I work with exempt market securities through Axcess Capital Advisors Inc. (EMD, AB/BC/ON).",
  },
};

const CALENDLY_URL = "https://calendly.com/andriushchenko-partners/new-meeting";

// ─────────────────────────────────────────────────────────────────────────────
// COMPOUND INTEREST MATH
// ─────────────────────────────────────────────────────────────────────────────

/**
 * Calculate future value with monthly contributions.
 * FV = PV × (1+r)^n + PMT × [((1+r)^n - 1) / r]
 */
function futureValue(initial, monthly, annualRatePercent, years) {
  const r = annualRatePercent / 100 / 12; // monthly rate
  const n = years * 12; // months

  if (r === 0) {
    return initial + monthly * n;
  }

  const fvLumpSum = initial * Math.pow(1 + r, n);
  const fvContributions = monthly * ((Math.pow(1 + r, n) - 1) / r);

  return fvLumpSum + fvContributions;
}

/**
 * Generate year-by-year chart data for all strategies.
 */
function buildChartData(initial, monthly, years) {
  const data = [];
  for (let y = 0; y <= years; y++) {
    data.push({
      year: y,
      bank: Math.round(futureValue(initial, monthly, 1.5, y)),
      gic: Math.round(futureValue(initial, monthly, 3, y)),
      conservative: Math.round(futureValue(initial, monthly, 6, y)),
      balanced: Math.round(futureValue(initial, monthly, 8, y)),
      aggressive: Math.round(futureValue(initial, monthly, 10, y)),
    });
  }
  return data;
}

function formatMoney(n) {
  return new Intl.NumberFormat("en-CA", {
    style: "currency",
    currency: "CAD",
    maximumFractionDigits: 0,
  }).format(n);
}

// ─────────────────────────────────────────────────────────────────────────────
// LANG SWITCHER
// ─────────────────────────────────────────────────────────────────────────────

// LangSwitcher imported from shared _components

// ─────────────────────────────────────────────────────────────────────────────
// MAIN CALCULATOR
// ─────────────────────────────────────────────────────────────────────────────

export default function TFSACalculator({ locale: rawLocale }) {
  const locale = resolveLocale(rawLocale);
  const lang = locale; // alias kept for legacy references inside this file
  const [initial, setInitial] = useState(10000);
  const [monthly, setMonthly] = useState(500);
  const [years, setYears] = useState(20);
  const [rate, setRate] = useState(8);

  const content = t[locale];

  // Calculations
  const finalValue = useMemo(
    () => futureValue(initial, monthly, rate, years),
    [initial, monthly, rate, years]
  );
  const totalContributed = initial + monthly * 12 * years;
  const gained = finalValue - totalContributed;
  const chartData = useMemo(
    () => buildChartData(initial, monthly, years),
    [initial, monthly, years]
  );

  const resultLabelText = content.resultLabel.replace("X", years);

  return (
    <main className="min-h-screen bg-[#191919] text-white antialiased">
      {/* NAV */}
      <nav className="fixed inset-x-0 top-0 z-50 border-b border-[#2a2a2a] bg-[#191919]/80 backdrop-blur-xl">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
          <Link href={`/${locale}`} aria-label="SkyFort home">
            <Logo variant="full" />
          </Link>
          <div className="flex items-center gap-3">
            <LangSwitcher locale={locale} />
          </div>
        </div>
      </nav>

      {/* BREADCRUMBS */}
      <div className="mx-auto max-w-6xl px-6 pt-28">
        <Breadcrumbs
          items={[
            { label: content.backToHome, href: `/${locale}` },
            { label: "TFSA-калькулятор" },
          ]}
        />
      </div>

      {/* HEADER */}
      <section className="relative overflow-hidden pt-12 pb-16">
        <div className="pointer-events-none absolute inset-0 -z-10">
          <div className="absolute -right-40 -top-32 h-[500px] w-[500px] rounded-full bg-[var(--color-brand)] opacity-[0.08] blur-3xl" />
        </div>
        <div className="mx-auto max-w-6xl px-6">
          <p className="mb-6 inline-flex items-center gap-2 text-[10px] font-bold uppercase tracking-[0.3em] text-[var(--color-brand)]">
            <Calculator className="h-3.5 w-3.5" />
            {content.kicker}
          </p>
          <h1 className="font-display-tight text-4xl text-white md:text-6xl lg:text-7xl">
            {content.title}
          </h1>
          <p className="mt-6 max-w-2xl text-lg leading-relaxed text-[#a3a3a3] md:text-xl">
            {content.sub}
          </p>
        </div>
      </section>

      {/* CALCULATOR */}
      <section className="pb-16">
        <div className="mx-auto max-w-6xl px-6">
          <div className="grid gap-8 lg:grid-cols-[1fr_1.5fr]">
            {/* LEFT — INPUTS */}
            <div className="rounded-2xl border border-[#2a2a2a] bg-[#1f1f1f] p-7">
              <div className="space-y-6">
                <NumberInput
                  label={content.inputs.initial}
                  value={initial}
                  onChange={setInitial}
                  prefix="$"
                  step={1000}
                />
                <NumberInput
                  label={content.inputs.monthly}
                  value={monthly}
                  onChange={setMonthly}
                  prefix="$"
                  step={100}
                />
                <NumberInput
                  label={content.inputs.years}
                  value={years}
                  onChange={setYears}
                  step={1}
                  min={1}
                  max={50}
                />
                <NumberInput
                  label={content.inputs.rate}
                  value={rate}
                  onChange={setRate}
                  suffix="%"
                  step={0.5}
                  decimal
                />
              </div>

              <div className="mt-8 border-t border-[#2a2a2a] pt-6">
                <p className="mb-3 text-xs font-bold uppercase tracking-wider text-[#6b6b6b]">
                  {content.presets.title}
                </p>
                <div className="flex flex-wrap gap-2">
                  {["bank", "gic", "conservative", "balanced", "aggressive"].map((key) => {
                    const preset = content.presets[key];
                    const isActive = rate === preset.rate;
                    return (
                      <button
                        key={key}
                        onClick={() => setRate(preset.rate)}
                        className={`rounded-full border px-3 py-1.5 text-xs font-bold uppercase tracking-wider transition-all ${
                          isActive
                            ? "border-[var(--color-brand)] bg-[var(--color-brand)] text-white"
                            : "border-[#3a3a3a] text-[#a3a3a3] hover:border-[var(--color-brand)] hover:text-white"
                        }`}
                      >
                        {preset.label}
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* RIGHT — RESULTS */}
            <div className="space-y-6">
              {/* Big result number */}
              <div className="relative overflow-hidden rounded-2xl border border-[#2a2a2a] bg-gradient-to-br from-[#1f1f1f] to-[#222] p-8">
                <div className="pointer-events-none absolute -right-20 -top-20 h-64 w-64 rounded-full bg-[var(--color-brand)] opacity-10 blur-3xl" />
                <p className="text-sm text-[#a3a3a3]">{resultLabelText}</p>
                <p className="mt-3 font-display-tight text-5xl text-[var(--color-brand)] md:text-7xl">
                  {formatMoney(finalValue)}
                </p>
                <div className="mt-6 grid grid-cols-2 gap-4 border-t border-[#2a2a2a] pt-6">
                  <div>
                    <p className="text-xs uppercase tracking-wider text-[#6b6b6b]">
                      {content.contributed}
                    </p>
                    <p className="mt-1 font-display text-xl text-white">
                      {formatMoney(totalContributed)}
                    </p>
                  </div>
                  <div>
                    <p className="text-xs uppercase tracking-wider text-[#6b6b6b]">
                      {content.gained}
                    </p>
                    <p className="mt-1 font-display text-xl text-[var(--color-brand)]">
                      +{formatMoney(gained)}
                    </p>
                  </div>
                </div>
              </div>

              {/* Insight box */}
              <div className="rounded-2xl border border-[var(--color-brand)]/30 bg-[var(--color-brand)]/5 p-6">
                <div className="flex items-start gap-3">
                  <TrendingUp className="mt-0.5 h-5 w-5 flex-shrink-0 text-[var(--color-brand)]" />
                  <div>
                    <h3 className="font-display text-lg text-white">{content.insightTitle}</h3>
                    <p className="mt-2 text-sm leading-relaxed text-[#a3a3a3]">{content.insightDesc}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CHART */}
      <section className="pb-20">
        <div className="mx-auto max-w-6xl px-6">
          <h2 className="mb-8 font-display text-3xl text-white md:text-4xl">
            {content.comparisonTitle}
          </h2>
          <div className="rounded-2xl border border-[#2a2a2a] bg-[#1f1f1f] p-4 md:p-6">
            <TfsaChart data={chartData} labels={content.chartLabels} />
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="relative overflow-hidden border-t border-[#2a2a2a] py-24 md:py-32">
        <div className="pointer-events-none absolute inset-0 -z-10">
          <div className="absolute left-1/2 top-1/2 h-[400px] w-[400px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[var(--color-brand)] opacity-[0.08] blur-3xl" />
        </div>
        <div className="mx-auto max-w-3xl px-6 text-center">
          <h2 className="font-display-tight text-4xl text-white md:text-6xl">
            {content.ctaTitle}
          </h2>
          <p className="mx-auto mt-6 max-w-xl text-lg text-[#a3a3a3]">{content.ctaSub}</p>
          <a
            href={CALENDLY_URL}
            target="_blank"
            rel="noopener"
            className="group mt-10 inline-flex items-center justify-center gap-2 rounded-full bg-[var(--color-brand)] px-8 py-4 text-sm font-bold uppercase tracking-wider text-white transition-all hover:bg-[var(--color-brand-hover)]"
          >
            {content.ctaBtn}
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
          </a>
        </div>
      </section>

      {/* DISCLAIMER */}
      <footer className="border-t border-[#2a2a2a] py-10">
        <div className="mx-auto max-w-3xl px-6">
          <p className="text-xs leading-relaxed text-[#6b6b6b]">{content.disclaimer}</p>
        </div>
      </footer>
    </main>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// NUMBER INPUT WITH +/- BUTTONS
// ─────────────────────────────────────────────────────────────────────────────

function NumberInput({ label, value, onChange, prefix, suffix, step = 1, min = 0, max = Infinity, decimal = false }) {
  const handleChange = (e) => {
    const raw = e.target.value.replace(/[^\d.]/g, "");
    const num = decimal ? parseFloat(raw) : parseInt(raw, 10);
    if (isNaN(num)) {
      onChange(0);
      return;
    }
    onChange(Math.min(max, Math.max(min, num)));
  };

  const increment = () => onChange(Math.min(max, value + step));
  const decrement = () => onChange(Math.max(min, value - step));

  return (
    <div>
      <label className="mb-2 block text-xs font-bold uppercase tracking-wider text-[#a3a3a3]">
        {label}
      </label>
      <div className="flex items-center gap-2">
        <button
          onClick={decrement}
          className="flex h-11 w-11 flex-shrink-0 items-center justify-center rounded-lg border border-[#3a3a3a] text-xl text-[#a3a3a3] transition-all hover:border-[var(--color-brand)] hover:text-white"
          aria-label="Decrease"
        >
          −
        </button>
        <div className="relative flex-1">
          {prefix && (
            <span className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-[#6b6b6b]">
              {prefix}
            </span>
          )}
          <input
            type="text"
            inputMode="numeric"
            value={value}
            onChange={handleChange}
            className={`w-full rounded-lg border border-[#3a3a3a] bg-[#191919] py-3 text-center font-display text-xl text-white outline-none transition-colors focus:border-[var(--color-brand)] ${
              prefix ? "pl-8" : ""
            } ${suffix ? "pr-8" : ""}`}
          />
          {suffix && (
            <span className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-[#6b6b6b]">
              {suffix}
            </span>
          )}
        </div>
        <button
          onClick={increment}
          className="flex h-11 w-11 flex-shrink-0 items-center justify-center rounded-lg border border-[#3a3a3a] text-xl text-[#a3a3a3] transition-all hover:border-[var(--color-brand)] hover:text-white"
          aria-label="Increase"
        >
          +
        </button>
      </div>
    </div>
  );
}
