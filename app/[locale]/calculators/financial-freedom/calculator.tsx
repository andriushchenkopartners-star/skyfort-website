"use client";

import { useState, useMemo } from "react";
import type { ChangeEvent, ReactNode } from "react";
import { useUrlState, copyShareUrl } from "../../../_lib/use-url-state";
import Link from "next/link";
import dynamic from "next/dynamic";
import { ArrowRight, Flame, Calculator, TrendingUp, Sparkles, Users } from "lucide-react";
import Logo from "../../../_components/Logo";
import Breadcrumbs from "../../../_components/Breadcrumbs";
import LangSwitcher from "../../../_components/LangSwitcher";
import TldrBlock from "../../../_components/TldrBlock";
import { resolveLocale } from "../../../_i18n/dictionary";

// Lazy-load recharts (~80KB gzip) — only loads when this chart mounts.
const FireChart = dynamic(() => import("./chart"), {
  ssr: false,
  loading: () => (
    <div
      className="h-[460px] w-full animate-pulse rounded-xl border border-[#2a2a2a] bg-[#1f1f1f]"
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
    kicker: "Калькулятор · Financial Freedom",
    title: "Коли ти станеш фінансово вільним?",
    sub: "Точна дата на основі твоїх цифр. Побач як exempt market прискорює freedom на роки.",
    tldrLabel: "Коротко",
    tldr: "Фінансова незалежність (FIRE) настає, коли пасивний дохід покриває твої витрати — орієнтир «правила 4%» означає капітал приблизно у 25 річних витрат. Цей калькулятор оцінює гіпотетичну дату на основі твоєї норми заощаджень і доходності. Освітній інструмент, не інвестиційна порада.",
    inputs: {
      age: "Твій вік зараз",
      income: "Чистий дохід на місяць",
      expenses: "Витрати на місяць",
      savings: "Поточні заощадження",
    },
    presets: {
      title: "Швидкий старт — обери сценарій:",
      newcomer: "Новачок (соло)",
      dink: "Пара без дітей",
      family: "Сім'я з дітьми",
    },
    fiNumberTitle: "Скільки тобі треба для freedom",
    fiSafe: "Safe (3.5% withdrawal)",
    fiStandard: "Standard (4% Trinity)",
    fiSafeDesc: "Cushion для довшої пенсії, sequence risk protection",
    fiStandardDesc: "Trinity Study класика, 30-річна пенсія",
    yourPlan: "Твій план зараз",
    monthlySavings: "Економиш на місяць",
    savingsRate: "Savings rate",
    yearsToFI: "Років до freedom",
    fiDate: "Дата freedom",
    comparisonTitle: "Порівняння стратегій",
    comparisonSub: "Скільки років до freedom з різними інвестиційними стратегіями",
    table: {
      strategy: "Стратегія",
      years: "Років",
      date: "Дата",
      vsBalanced: "vs Balanced",
    },
    strategyLabels: {
      bank: "Банк savings (1.5%)",
      gic: "GIC (3%)",
      conservative: "Conservative ETF (6%)",
      balanced: "Balanced ETF (8%)",
      exempt: "Exempt Market (9%)",
      aggressive: "Aggressive ETF (10%)",
    },
    exemptBadge: "EMD спеціалізація",
    chartLabels: {
      year: "Рік",
      value: "Net worth, $",
      fiThreshold: "FI threshold (4%)",
    },
    insightTitle: "Exempt market змінює математику",
    insightDescBefore: "Стандартний portfolio (Balanced ETF 8%) дає тобі freedom через",
    insightDescAfter: "Перевід частини портфеля в exempt market (target 9% historical) скорочує цей строк на",
    insightCTA: "Що це для тебе особисто означає — обговоримо на consultation",
    ctaTitle: "Твоя точна стратегія — на 30 хв",
    ctaSub: "Розглянемо твою ситуацію, KYC + suitability, побудуємо персональний exempt market план з урахуванням твоїх ризик-параметрів та горизонту.",
    ctaBtn: "Записатись на consultation",
    negativeSavings: "Витрати перевищують дохід — економія неможлива. Спочатку треба знизити витрати або підняти дохід.",
    disclaimer: "Калькулятор показує гіпотетичні результати на основі середніх історичних доходностей та сталих параметрів. Реальність включає інфляцію, податки, sequence of returns risk, market volatility — які не моделюються повністю. Минулі результати не гарантують майбутніх. Exempt market 9% — це target historical range, не гарантована доходність. Не є investment advice — для персональних рекомендацій запишись на консультацію. ETF, mutual funds та individual stocks — поза моєю ліцензією; для рекомендацій по public market звертайся до CIRO-registered advisor. Я працюю з exempt market securities через Axcess Capital Advisors Inc. (EMD, AB/BC/ON).",
  },

  ru: {
    backToHome: "На главную",
    kicker: "Калькулятор · Financial Freedom",
    title: "Когда ты станешь финансово свободным?",
    sub: "Точная дата на основе твоих цифр. Увидь как exempt market ускоряет freedom на годы.",
    tldrLabel: "Коротко",
    tldr: "Финансовая независимость (FIRE) наступает, когда пассивный доход покрывает твои расходы — ориентир «правила 4%» означает капитал примерно в 25 годовых расходов. Этот калькулятор оценивает гипотетическую дату на основе твоей нормы сбережений и доходности. Образовательный инструмент, не инвестиционный совет.",
    inputs: {
      age: "Твой возраст сейчас",
      income: "Чистый доход в месяц",
      expenses: "Расходы в месяц",
      savings: "Текущие сбережения",
    },
    presets: {
      title: "Быстрый старт — выбери сценарий:",
      newcomer: "Новичок (соло)",
      dink: "Пара без детей",
      family: "Семья с детьми",
    },
    fiNumberTitle: "Сколько тебе нужно для freedom",
    fiSafe: "Safe (3.5% withdrawal)",
    fiStandard: "Standard (4% Trinity)",
    fiSafeDesc: "Запас для длинной пенсии, защита от sequence risk",
    fiStandardDesc: "Trinity Study классика, 30-летняя пенсия",
    yourPlan: "Твой план сейчас",
    monthlySavings: "Откладываешь в месяц",
    savingsRate: "Savings rate",
    yearsToFI: "Лет до freedom",
    fiDate: "Дата freedom",
    comparisonTitle: "Сравнение стратегий",
    comparisonSub: "Сколько лет до freedom при разных инвестиционных стратегиях",
    table: {
      strategy: "Стратегия",
      years: "Лет",
      date: "Дата",
      vsBalanced: "vs Balanced",
    },
    strategyLabels: {
      bank: "Банк savings (1.5%)",
      gic: "GIC (3%)",
      conservative: "Conservative ETF (6%)",
      balanced: "Balanced ETF (8%)",
      exempt: "Exempt Market (9%)",
      aggressive: "Aggressive ETF (10%)",
    },
    exemptBadge: "EMD специализация",
    chartLabels: {
      year: "Год",
      value: "Net worth, $",
      fiThreshold: "FI threshold (4%)",
    },
    insightTitle: "Exempt market меняет математику",
    insightDescBefore: "Стандартный портфель (Balanced ETF 8%) даёт тебе freedom через",
    insightDescAfter: "Перевод части портфеля в exempt market (target 9% historical) сокращает этот срок на",
    insightCTA: "Что это значит для тебя лично — обсудим на consultation",
    ctaTitle: "Твоя точная стратегия — за 30 мин",
    ctaSub: "Разберём твою ситуацию, KYC + suitability, построим персональный exempt market план с учётом твоих риск-параметров и горизонта.",
    ctaBtn: "Записаться на consultation",
    negativeSavings: "Расходы превышают доход — экономия невозможна. Сначала нужно снизить расходы или поднять доход.",
    disclaimer: "Калькулятор показывает гипотетические результаты на основе средних исторических доходностей и постоянных параметров. Реальность включает инфляцию, налоги, sequence of returns risk, market volatility — которые не моделируются полностью. Прошлые результаты не гарантируют будущих. Exempt market 9% — это target historical range, не гарантированная доходность. Не является investment advice — для персональных рекомендаций запишись на консультацию. ETF, mutual funds и individual stocks — вне моей лицензии; для рекомендаций по public market обращайся к CIRO-registered advisor. Я работаю с exempt market securities через Axcess Capital Advisors Inc. (EMD, AB/BC/ON).",
  },

  en: {
    backToHome: "Back to home",
    kicker: "Calculator · Financial Freedom",
    title: "When will you be financially free?",
    sub: "Exact date based on your numbers. See how exempt market accelerates freedom by years.",
    tldrLabel: "TL;DR",
    tldr: "Financial independence (FIRE) is reached when passive income covers your expenses — the «4% rule» benchmark implies a portfolio of roughly 25× your annual spending. This calculator estimates a hypothetical date based on your savings rate and return assumptions. It's an educational tool, not investment advice.",
    inputs: {
      age: "Your age now",
      income: "Net monthly income",
      expenses: "Monthly expenses",
      savings: "Current savings",
    },
    presets: {
      title: "Quick start — pick a scenario:",
      newcomer: "Newcomer (solo)",
      dink: "DINK couple",
      family: "Family with kids",
    },
    fiNumberTitle: "How much you need for freedom",
    fiSafe: "Safe (3.5% withdrawal)",
    fiStandard: "Standard (4% Trinity)",
    fiSafeDesc: "Cushion for longer retirement, sequence risk protection",
    fiStandardDesc: "Trinity Study classic, 30-year retirement",
    yourPlan: "Your plan now",
    monthlySavings: "Saving monthly",
    savingsRate: "Savings rate",
    yearsToFI: "Years to freedom",
    fiDate: "Freedom date",
    comparisonTitle: "Strategy comparison",
    comparisonSub: "Years to freedom with different investment strategies",
    table: {
      strategy: "Strategy",
      years: "Years",
      date: "Date",
      vsBalanced: "vs Balanced",
    },
    strategyLabels: {
      bank: "Bank savings (1.5%)",
      gic: "GIC (3%)",
      conservative: "Conservative ETF (6%)",
      balanced: "Balanced ETF (8%)",
      exempt: "Exempt Market (9%)",
      aggressive: "Aggressive ETF (10%)",
    },
    exemptBadge: "EMD specialty",
    chartLabels: {
      year: "Year",
      value: "Net worth, $",
      fiThreshold: "FI threshold (4%)",
    },
    insightTitle: "Exempt market changes the math",
    insightDescBefore: "Standard portfolio (Balanced ETF 8%) gives you freedom in",
    insightDescAfter: "Moving part of portfolio to exempt market (target 9% historical) shortens this by",
    insightCTA: "What this means for you personally — let's discuss on a consultation",
    ctaTitle: "Your exact strategy — in 30 minutes",
    ctaSub: "We'll review your situation, KYC + suitability, build a personal exempt market plan based on your risk profile and horizon.",
    ctaBtn: "Book a consultation",
    negativeSavings: "Expenses exceed income — saving is impossible. First reduce expenses or increase income.",
    disclaimer: "Calculator shows hypothetical results based on average historical returns and constant parameters. Reality includes inflation, taxes, sequence of returns risk, market volatility — which are not fully modeled. Past performance doesn't guarantee future results. Exempt market 9% is a target historical range, not a guaranteed return. Not investment advice — for personal recommendations, book a consultation. ETFs, mutual funds, and individual stocks are outside my license; for public market recommendations, consult a CIRO-registered advisor. I work with exempt market securities through Axcess Capital Advisors Inc. (EMD, AB/BC/ON).",
  },
};

const CALENDLY_URL = "https://calendly.com/andriushchenko-partners/new-meeting";

// ─────────────────────────────────────────────────────────────────────────────
// SCENARIO PRESETS (Canadian Calgary-realistic, net after-tax)
// ─────────────────────────────────────────────────────────────────────────────

const PRESETS = {
  newcomer: { age: 30, income: 5000, expenses: 3500, savings: 5000 },
  dink: { age: 32, income: 10800, expenses: 5800, savings: 25000 },
  family: { age: 35, income: 11600, expenses: 8300, savings: 35000 },
};

// ─────────────────────────────────────────────────────────────────────────────
// STRATEGIES (visual config + return assumption)
// ─────────────────────────────────────────────────────────────────────────────

const STRATEGIES = [
  { key: "bank",         rate: 1.5, color: "#6b6b6b", strokeWidth: 2, dashed: false },
  { key: "gic",          rate: 3,   color: "#8a8a8a", strokeWidth: 2, dashed: false },
  { key: "conservative", rate: 6,   color: "#7099d6", strokeWidth: 2, dashed: false },
  { key: "balanced",     rate: 8,   color: "#2D73E3", strokeWidth: 3, dashed: false },
  { key: "exempt",       rate: 9,   color: "#FFB627", strokeWidth: 4, dashed: false }, // gold accent
  { key: "aggressive",   rate: 10,  color: "#4287ec", strokeWidth: 2, dashed: true  },
];

// ─────────────────────────────────────────────────────────────────────────────
// MATH
// ─────────────────────────────────────────────────────────────────────────────

/**
 * Years to reach target portfolio value (analytical solution).
 * FV = S(1+r)^n + A * [((1+r)^n - 1) / r]
 * Solve for n given target FV.
 */
function yearsToFI(currentSavings: number, monthlySavings: number, annualRatePercent: number, targetFI: number): number {
  if (currentSavings >= targetFI) return 0;
  if (monthlySavings <= 0) return Infinity;

  const r = annualRatePercent / 100;
  const A = monthlySavings * 12;
  const S = currentSavings;

  if (r === 0) {
    return (targetFI - S) / A;
  }

  const numerator = targetFI + A / r;
  const denominator = S + A / r;
  if (denominator <= 0) return Infinity;

  const ratio = numerator / denominator;
  if (ratio <= 1) return 0;

  return Math.log(ratio) / Math.log(1 + r);
}

/**
 * Project net worth at year y given monthly contributions.
 */
function projectNetWorth(currentSavings: number, monthlySavings: number, annualRatePercent: number, years: number): number {
  const r = annualRatePercent / 100 / 12;
  const n = years * 12;
  if (r === 0) return currentSavings + monthlySavings * n;
  const fvLump = currentSavings * Math.pow(1 + r, n);
  const fvContrib = monthlySavings * ((Math.pow(1 + r, n) - 1) / r);
  return fvLump + fvContrib;
}

/**
 * Build year-by-year chart data for all strategies, capped at maxYears.
 */
function buildChartData(currentSavings: number, monthlySavings: number, maxYears: number): Array<Record<string, number>> {
  const data: Array<Record<string, number>> = [];
  for (let y = 0; y <= maxYears; y++) {
    const row: Record<string, number> = { year: y };
    for (const s of STRATEGIES) {
      row[s.key] = Math.round(projectNetWorth(currentSavings, monthlySavings, s.rate, y));
    }
    data.push(row);
  }
  return data;
}

function formatMoney(n: number) {
  if (!isFinite(n)) return "∞";
  return new Intl.NumberFormat("en-CA", {
    style: "currency",
    currency: "CAD",
    maximumFractionDigits: 0,
  }).format(n);
}

function formatYears(n: number, lang: string) {
  if (!isFinite(n)) return "∞";
  if (n < 0.1) return lang === "en" ? "now" : "зараз";
  if (n >= 100) return "100+";
  return n.toFixed(1);
}

function formatFIDate(yearsFromNow: number, lang: string) {
  if (!isFinite(yearsFromNow) || yearsFromNow > 100) return "—";
  const now = new Date();
  const monthsFromNow = Math.round(yearsFromNow * 12);
  const target = new Date(now.getFullYear(), now.getMonth() + monthsFromNow, 1);
  const locale = lang === "en" ? "en-CA" : lang === "ru" ? "ru-RU" : "uk-UA";
  return new Intl.DateTimeFormat(locale, { month: "long", year: "numeric" }).format(target);
}

// ─────────────────────────────────────────────────────────────────────────────
// LANG SWITCHER
// ─────────────────────────────────────────────────────────────────────────────

// LangSwitcher imported from shared _components

// ─────────────────────────────────────────────────────────────────────────────
// MAIN
// ─────────────────────────────────────────────────────────────────────────────

export default function FIRECalculator({ locale: rawLocale }: { locale?: string }) {
  const locale = resolveLocale(rawLocale) as "uk" | "ru" | "en";
  const lang = locale;
  // Share-URL state (Audit 7 #8 link-magnet)
  const [age, setAge] = useUrlState("age", 32, "number");
  const [income, setIncome] = useUrlState("income", 7000, "number");
  const [expenses, setExpenses] = useUrlState("spend", 4500, "number");
  const [savings, setSavings] = useUrlState("savings", 15000, "number");
  const [copyState, setCopyState] = useState<"idle" | "copied" | "failed">("idle");
  async function onCopyLink() {
    const ok = await copyShareUrl();
    setCopyState(ok ? "copied" : "failed");
    setTimeout(() => setCopyState("idle"), 2000);
  }

  const content = t[locale];

  // Derived
  const monthlySavings = Math.max(0, income - expenses);
  const annualExpenses = expenses * 12;
  const savingsRate = income > 0 ? Math.round((monthlySavings / income) * 100) : 0;
  const fiStandard = annualExpenses * 25;   // 4%
  const fiSafe = annualExpenses * (100 / 3.5); // 3.5% → 28.57x

  const negativeSavings = monthlySavings === 0 && expenses > 0;

  // Years to FI for each strategy (target = 4% standard)
  const strategyResults = useMemo(() => {
    return STRATEGIES.map((s) => {
      const years = yearsToFI(savings, monthlySavings, s.rate, fiStandard);
      return {
        ...s,
        years,
        date: formatFIDate(years, lang),
      };
    });
  }, [savings, monthlySavings, fiStandard, lang]);

  const balancedYears = strategyResults.find((s) => s.key === "balanced")?.years ?? Infinity;
  const exemptYears = strategyResults.find((s) => s.key === "exempt")?.years ?? Infinity;
  const yearsSavedByExempt = isFinite(balancedYears) && isFinite(exemptYears) ? balancedYears - exemptYears : 0;

  // Chart bounds — show through bank+10 years or 50 max, whichever smaller
  const bankYears = strategyResults.find((s) => s.key === "bank")?.years ?? 50;
  const chartMaxYears = Math.min(50, Math.max(20, Math.ceil(bankYears) + 2));

  const chartData = useMemo(
    () => buildChartData(savings, monthlySavings, chartMaxYears),
    [savings, monthlySavings, chartMaxYears]
  );

  const applyPreset = (key: string) => {
    const p = PRESETS[key];
    setAge(p.age);
    setIncome(p.income);
    setExpenses(p.expenses);
    setSavings(p.savings);
  };

  return (
    <main className="min-h-screen bg-[#191919] text-white antialiased">
      {/* NAV */}
      <nav className="fixed inset-x-0 top-0 z-50 border-b border-[#2a2a2a] bg-[#191919]/80 backdrop-blur-xl">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
          <Link href={`/${locale}`} aria-label="SkyFort home">
            <Logo variant="full" />
          </Link>
          <LangSwitcher locale={locale} />
        </div>
      </nav>

      {/* BREADCRUMBS */}
      <div className="mx-auto max-w-6xl px-6 pt-28">
        <Breadcrumbs
          items={[
            { label: content.backToHome, href: `/${locale}` },
            { label: "Фінансова свобода" },
          ]}
        />
      </div>

      {/* HEADER */}
      <section className="relative overflow-hidden pt-12 pb-16">
        <div className="pointer-events-none absolute inset-0 -z-10">
          <div className="absolute -right-40 -top-32 h-[500px] w-[500px] rounded-full bg-accent opacity-[0.06] blur-3xl" />
          <div className="absolute -left-20 top-40 h-[400px] w-[400px] rounded-full bg-[var(--color-brand)] opacity-[0.06] blur-3xl" />
        </div>
        <div className="mx-auto max-w-6xl px-6">
          <p className="mb-6 inline-flex items-center gap-2 text-[10px] font-bold uppercase tracking-[0.3em] text-accent">
            <Flame className="h-3.5 w-3.5" />
            {content.kicker}
          </p>
          <h1 className="font-display-tight text-4xl text-white md:text-6xl lg:text-7xl">
            {content.title}
          </h1>
          <p className="mt-6 max-w-2xl text-lg leading-relaxed text-[#a3a3a3] md:text-xl">
            {content.sub}
          </p>
          <div className="mt-8 max-w-2xl">
            <TldrBlock
              label={content.tldrLabel}
              text={content.tldr}
              pageName={content.title}
              pageUrl={`https://sky-fort.ca/${locale}/calculators/financial-freedom`}
            />
          </div>
        </div>
      </section>

      {/* CALCULATOR */}
      <section className="pb-16">
        <div className="mx-auto max-w-6xl px-6">
          <div className="grid gap-8 lg:grid-cols-[1fr_1.5fr]">
            {/* LEFT — INPUTS */}
            <div className="rounded-2xl border border-[#2a2a2a] bg-[#1f1f1f] p-7">
              {/* Presets */}
              <div className="mb-6 border-b border-[#2a2a2a] pb-6">
                <p className="mb-3 text-xs font-bold uppercase tracking-wider text-[#6b6b6b]">
                  {content.presets.title}
                </p>
                <div className="grid grid-cols-1 gap-2">
                  {[
                    { key: "newcomer", icon: "👤" },
                    { key: "dink", icon: "💑" },
                    { key: "family", icon: "👨‍👩‍👧" },
                  ].map(({ key, icon }) => (
                    <button
                      key={key}
                      onClick={() => applyPreset(key)}
                      className="flex items-center gap-3 rounded-lg border border-[#3a3a3a] px-4 py-2.5 text-left text-sm transition-[transform,border-color,background-color] duration-150 ease-[var(--ease-out)] hover:border-[var(--color-brand)] hover:bg-[var(--color-brand)]/5 active:scale-[0.98]"
                    >
                      <span className="text-lg">{icon}</span>
                      <span className="font-bold text-[#a3a3a3]">{content.presets[key]}</span>
                    </button>
                  ))}
                </div>
              </div>

              <div className="space-y-5">
                <NumberInput label={content.inputs.age} value={age} onChange={setAge} step={1} min={18} max={70} />
                <NumberInput label={content.inputs.income} value={income} onChange={setIncome} prefix="$" step={500} />
                <NumberInput label={content.inputs.expenses} value={expenses} onChange={setExpenses} prefix="$" step={250} />
                <NumberInput label={content.inputs.savings} value={savings} onChange={setSavings} prefix="$" step={1000} />
              </div>

              {/* Live derived */}
              <div className="mt-6 border-t border-[#2a2a2a] pt-5">
                {negativeSavings ? (
                  <p className="text-sm leading-relaxed text-[#ff6b6b]">
                    {content.negativeSavings}
                  </p>
                ) : (
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <p className="text-xs uppercase tracking-wider text-[#6b6b6b]">{content.monthlySavings}</p>
                      <p className="mt-1 font-display text-lg text-white">{formatMoney(monthlySavings)}</p>
                    </div>
                    <div>
                      <p className="text-xs uppercase tracking-wider text-[#6b6b6b]">{content.savingsRate}</p>
                      <p className="mt-1 font-display text-lg text-[var(--color-brand)]">{savingsRate}%</p>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* RIGHT — FI Numbers (dual) */}
            <div className="space-y-6">
              <p className="text-xs font-bold uppercase tracking-[0.3em] text-[#6b6b6b]">
                {content.fiNumberTitle}
              </p>
              <div className="grid gap-4 md:grid-cols-2">
                {/* Safe */}
                <div className="rounded-2xl border border-[#2a2a2a] bg-[#1f1f1f] p-6">
                  <p className="text-xs uppercase tracking-wider text-[#a3a3a3]">{content.fiSafe}</p>
                  <p className="mt-3 font-display-tight text-3xl text-white md:text-4xl">{formatMoney(fiSafe)}</p>
                  <p className="mt-3 text-xs leading-relaxed text-[#6b6b6b]">{content.fiSafeDesc}</p>
                </div>
                {/* Standard */}
                <div className="relative overflow-hidden rounded-2xl border border-[var(--color-brand)]/40 bg-gradient-to-br from-[#1f1f1f] to-[#222] p-6">
                  <div className="pointer-events-none absolute -right-10 -top-10 h-40 w-40 rounded-full bg-[var(--color-brand)] opacity-10 blur-3xl" />
                  <p className="text-xs uppercase tracking-wider text-[var(--color-brand)]">{content.fiStandard}</p>
                  <p className="mt-3 font-display-tight text-3xl text-[var(--color-brand)] md:text-4xl">{formatMoney(fiStandard)}</p>
                  <p className="mt-3 text-xs leading-relaxed text-[#6b6b6b]">{content.fiStandardDesc}</p>
                </div>
              </div>

              {/* Your plan summary */}
              {!negativeSavings && (
                <div className="rounded-2xl border border-[#2a2a2a] bg-[#1f1f1f] p-6">
                  <p className="text-xs font-bold uppercase tracking-wider text-[#6b6b6b]">{content.yourPlan}</p>
                  <div className="mt-4 grid grid-cols-2 gap-4">
                    <div>
                      <p className="text-xs text-[#6b6b6b]">{content.yearsToFI} (Balanced 8%)</p>
                      <p className="mt-1 font-display text-2xl text-white">{formatYears(balancedYears, lang)}</p>
                    </div>
                    <div>
                      <p className="text-xs text-[#6b6b6b]">{content.fiDate} (Balanced 8%)</p>
                      <p className="mt-1 font-display text-2xl text-white">{formatFIDate(balancedYears, lang)}</p>
                    </div>
                  </div>
                </div>
              )}

              {/* Insight box */}
              {!negativeSavings && yearsSavedByExempt > 0 && (
                <div className="rounded-2xl border border-accent/30 bg-accent/5 p-6">
                  <div className="flex items-start gap-3">
                    <Sparkles className="mt-0.5 h-5 w-5 flex-shrink-0 text-accent" />
                    <div>
                      <h3 className="font-display text-lg text-white">{content.insightTitle}</h3>
                      <p className="mt-2 text-sm leading-relaxed text-[#a3a3a3]">
                        {content.insightDescBefore} <span className="font-bold text-white">{formatYears(balancedYears, lang)} {lang === "en" ? "years" : "років"}</span>.{" "}
                        {content.insightDescAfter} <span className="font-bold text-accent">{formatYears(yearsSavedByExempt, lang)} {lang === "en" ? "years" : "років"}</span>.
                      </p>
                      <p className="mt-3 text-xs italic text-[#6b6b6b]">{content.insightCTA}</p>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* COMPARISON TABLE */}
      {!negativeSavings && (
        <section className="pb-16">
          <div className="mx-auto max-w-6xl px-6">
            <h2 className="font-display text-3xl text-white md:text-4xl">{content.comparisonTitle}</h2>
            <p className="mt-2 text-sm text-[#a3a3a3]">{content.comparisonSub}</p>

            <div className="mt-8 overflow-hidden rounded-2xl border border-[#2a2a2a]">
              <table className="w-full">
                <thead className="bg-[#1a1a1a]">
                  <tr>
                    <th className="px-5 py-4 text-left text-xs font-bold uppercase tracking-wider text-[#6b6b6b]">{content.table.strategy}</th>
                    <th className="px-5 py-4 text-right text-xs font-bold uppercase tracking-wider text-[#6b6b6b]">{content.table.years}</th>
                    <th className="px-5 py-4 text-right text-xs font-bold uppercase tracking-wider text-[#6b6b6b]">{content.table.date}</th>
                    <th className="px-5 py-4 text-right text-xs font-bold uppercase tracking-wider text-[#6b6b6b]">{content.table.vsBalanced}</th>
                  </tr>
                </thead>
                <tbody>
                  {strategyResults.map((s) => {
                    const isExempt = s.key === "exempt";
                    const isBalanced = s.key === "balanced";
                    const diff = isFinite(s.years) && isFinite(balancedYears) ? s.years - balancedYears : null;
                    return (
                      <tr
                        key={s.key}
                        className={`border-t border-[#2a2a2a] ${
                          isExempt ? "bg-accent/5" : isBalanced ? "bg-[var(--color-brand)]/5" : ""
                        }`}
                      >
                        <td className="px-5 py-4">
                          <div className="flex items-center gap-3">
                            <span
                              className="inline-block h-3 w-3 flex-shrink-0 rounded-full"
                              style={{ backgroundColor: s.color }}
                            />
                            <span className={`font-bold ${isExempt ? "text-accent" : "text-white"}`}>
                              {content.strategyLabels[s.key]}
                            </span>
                            {isExempt && (
                              <span className="rounded-full bg-accent/20 px-2 py-0.5 text-[9px] font-bold uppercase tracking-wider text-accent">
                                {content.exemptBadge}
                              </span>
                            )}
                          </div>
                        </td>
                        <td className="px-5 py-4 text-right font-display text-lg text-white">
                          {formatYears(s.years, lang)}
                        </td>
                        <td className="px-5 py-4 text-right text-sm text-[#a3a3a3]">{s.date}</td>
                        <td className="px-5 py-4 text-right text-sm">
                          {diff === null || !isFinite(diff) ? (
                            <span className="text-[#6b6b6b]">—</span>
                          ) : Math.abs(diff) < 0.05 ? (
                            <span className="text-[#6b6b6b]">—</span>
                          ) : diff < 0 ? (
                            <span className="font-bold text-accent">{diff.toFixed(1)}</span>
                          ) : (
                            <span className="text-[#ff6b6b]">+{diff.toFixed(1)}</span>
                          )}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        </section>
      )}

      {/* CHART */}
      {!negativeSavings && (
        <section className="pb-20">
          <div className="mx-auto max-w-6xl px-6">
            <div className="rounded-2xl border border-[#2a2a2a] bg-[#1f1f1f] p-4 md:p-6">
              <FireChart
                data={chartData}
                labels={content.chartLabels}
                strategyLabels={content.strategyLabels}
                strategies={STRATEGIES}
                fiStandard={fiStandard}
              />
            </div>
          </div>
        </section>
      )}

      {/* CTA */}
      <section className="relative overflow-hidden border-t border-[#2a2a2a] py-24 md:py-32">
        <div className="pointer-events-none absolute inset-0 -z-10">
          <div className="absolute left-1/2 top-1/2 h-[400px] w-[400px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-accent opacity-[0.08] blur-3xl" />
        </div>
        <div className="mx-auto max-w-3xl px-6 text-center">
          <h2 className="font-display-tight text-4xl text-white md:text-6xl">{content.ctaTitle}</h2>
          <p className="mx-auto mt-6 max-w-xl text-lg text-[#a3a3a3]">{content.ctaSub}</p>
          <a
            href={CALENDLY_URL}
            target="_blank"
            rel="noopener"
            className="group mt-10 inline-flex items-center justify-center gap-2 rounded-full bg-accent px-8 py-4 text-sm font-bold uppercase tracking-wider text-[#191919] transition-[transform,background-color] duration-200 ease-[var(--ease-out)] hover:bg-accent-hover active:scale-[0.98]"
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
// NUMBER INPUT
// ─────────────────────────────────────────────────────────────────────────────

function NumberInput({
  label,
  value,
  onChange,
  prefix,
  suffix,
  step = 1,
  min = 0,
  max = Infinity,
}: {
  label: ReactNode;
  value: number;
  onChange: (n: number) => void;
  prefix?: string;
  suffix?: string;
  step?: number;
  min?: number;
  max?: number;
}) {
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const raw = e.target.value.replace(/[^\d.]/g, "");
    const num = parseFloat(raw);
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
          className="flex h-11 w-11 flex-shrink-0 items-center justify-center rounded-lg border border-[#3a3a3a] text-xl text-[#a3a3a3] transition-[transform,border-color,color] duration-150 ease-[var(--ease-out)] hover:border-[var(--color-brand)] hover:text-white active:scale-95"
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
            className={`w-full rounded-lg border border-[#3a3a3a] bg-[#191919] py-3 text-center font-display text-xl text-white outline-none transition-colors duration-150 ease-[var(--ease-out)] focus:border-[var(--color-brand)] ${
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
          className="flex h-11 w-11 flex-shrink-0 items-center justify-center rounded-lg border border-[#3a3a3a] text-xl text-[#a3a3a3] transition-[transform,border-color,color] duration-150 ease-[var(--ease-out)] hover:border-[var(--color-brand)] hover:text-white active:scale-95"
          aria-label="Increase"
        >
          +
        </button>
      </div>
    </div>
  );
}
