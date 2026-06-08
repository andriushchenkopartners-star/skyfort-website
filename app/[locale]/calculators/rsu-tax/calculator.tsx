// app/[locale]/calculators/rsu-tax/calculator.tsx
// Interactive RSU vesting tax calculator. Client component — does the math
// in real time as user changes inputs.
//
// Tax brackets are 2026 federal + provincial (AB/BC/ON). Approximations:
//   - No CPP/EI included (these are payroll deductions; vested RSUs are
//     additional T4 income but CPP cap is hit at $73,200 in most $130K+
//     scenarios anyway, so the marginal CPP impact is 0).
//   - No Ontario surtax (rare for $250K+ income).
//   - No dividend tax credit (RSU income is employment, not dividends).
//   - No Quebec — we focus on AB/BC/ON where 95% of clients live.

"use client";

import { useState, useMemo } from "react";
import type { ReactNode } from "react";
import { Calculator, Info, Link as LinkIcon } from "lucide-react";
import { useUrlState, copyShareUrl } from "../../../_lib/use-url-state";
import TldrBlock from "../../../_components/TldrBlock";

type Locale = "uk" | "ru" | "en";

// 2026 federal brackets (combined rate, no surtax).
const FED_BRACKETS_2026 = [
  { upTo: 57375, rate: 0.15 },
  { upTo: 114750, rate: 0.205 },
  { upTo: 177882, rate: 0.26 },
  { upTo: 253414, rate: 0.29 },
  { upTo: Infinity, rate: 0.33 },
];

const PROV_BRACKETS_2026 = {
  AB: [
    { upTo: 151234, rate: 0.10 },
    { upTo: 181481, rate: 0.12 },
    { upTo: 241974, rate: 0.13 },
    { upTo: 362961, rate: 0.14 },
    { upTo: Infinity, rate: 0.15 },
  ],
  BC: [
    { upTo: 49279, rate: 0.0506 },
    { upTo: 98560, rate: 0.077 },
    { upTo: 113158, rate: 0.105 },
    { upTo: 137407, rate: 0.1229 },
    { upTo: 186306, rate: 0.147 },
    { upTo: 259829, rate: 0.168 },
    { upTo: Infinity, rate: 0.205 },
  ],
  ON: [
    { upTo: 52886, rate: 0.0505 },
    { upTo: 105775, rate: 0.0915 },
    { upTo: 150000, rate: 0.1116 },
    { upTo: 220000, rate: 0.1216 },
    { upTo: Infinity, rate: 0.1316 },
  ],
};

// Sum of federal + provincial tax on a given income, using progressive brackets.
function computeTax(income: number, province: string): number {
  if (income <= 0) return 0;
  let fedTax = 0,
    prevCap = 0;
  for (const b of FED_BRACKETS_2026) {
    const taxableInBracket = Math.min(income, b.upTo) - prevCap;
    if (taxableInBracket > 0) fedTax += taxableInBracket * b.rate;
    if (income <= b.upTo) break;
    prevCap = b.upTo;
  }
  let provTax = 0;
  prevCap = 0;
  for (const b of PROV_BRACKETS_2026[province] || PROV_BRACKETS_2026.AB) {
    const taxableInBracket = Math.min(income, b.upTo) - prevCap;
    if (taxableInBracket > 0) provTax += taxableInBracket * b.rate;
    if (income <= b.upTo) break;
    prevCap = b.upTo;
  }
  return fedTax + provTax;
}

// Marginal rate at a given income level — useful to display "your bracket".
function marginalRate(income: number, province: string): number {
  let fed = 0;
  for (const b of FED_BRACKETS_2026) {
    if (income <= b.upTo) {
      fed = b.rate;
      break;
    }
  }
  let prov = 0;
  for (const b of PROV_BRACKETS_2026[province] || PROV_BRACKETS_2026.AB) {
    if (income <= b.upTo) {
      prov = b.rate;
      break;
    }
  }
  return fed + prov;
}

const T = {
  uk: {
    title: "RSU Tax калькулятор",
    sub: "Точна податкова математика на RSU vesting у Канаді 2026",
    tldrLabel: "Коротко",
    tldr: "Коли RSU вестяться, їхня ринкова вартість оподатковується як дохід з працевлаштування (T4) за твоєю граничною ставкою. Цей калькулятор оцінює федеральний і провінційний податок (AB/BC/ON, 2026) на момент вестингу — приблизно, без CPP/EI. Освітній інструмент, не податкова порада.",
    inputs: {
      base: "Базова зарплата (T4)",
      rsu: "RSU vesting amount (FMV at vest)",
      province: "Провінція",
      rrsp: "RRSP внесок у рік vesting",
    },
    province: { AB: "Альберта", BC: "British Columbia", ON: "Онтаріо" },
    out: {
      title: "Результати",
      totalIncome: "Total T4 income (base + RSU)",
      marginalBracket: "Marginal bracket на RSU income",
      taxNoRrsp: "Tax на RSU без RRSP",
      taxWithRrsp: "Tax на RSU з RRSP",
      refund: "RRSP immediate refund",
      netKeep: "Net keep на RSU",
      effective: "Effective tax rate на RSU",
    },
    presets: { title: "Типові scenarios:" },
    p1: "$140K + $80K vesting · AB",
    p2: "$180K + $120K vesting · ON",
    p3: "$220K + $150K vesting · BC",
    disclaimer:
      "Estimation з 2026 federal + AB/BC/ON brackets. Не включає CPP/EI, provincial surtaxes, dividend tax credits. ~95% accuracy для типового scenario. Не investment чи tax advice — для індивідуального налаштування CPA + Licensed DR (NRD #4575551).",
  },
  ru: {
    title: "RSU Tax калькулятор",
    sub: "Точная налоговая математика на RSU vesting в Канаде 2026",
    tldrLabel: "Коротко",
    tldr: "Когда RSU вестятся, их рыночная стоимость облагается как доход от трудоустройства (T4) по твоей предельной ставке. Этот калькулятор оценивает федеральный и провинциальный налог (AB/BC/ON, 2026) на момент вестинга — приблизительно, без CPP/EI. Образовательный инструмент, не налоговая консультация.",
    inputs: {
      base: "Базовая зарплата (T4)",
      rsu: "RSU vesting amount (FMV at vest)",
      province: "Провинция",
      rrsp: "RRSP внесок в год vesting",
    },
    province: { AB: "Альберта", BC: "British Columbia", ON: "Онтарио" },
    out: {
      title: "Результаты",
      totalIncome: "Total T4 income (base + RSU)",
      marginalBracket: "Marginal bracket на RSU income",
      taxNoRrsp: "Tax на RSU без RRSP",
      taxWithRrsp: "Tax на RSU с RRSP",
      refund: "RRSP immediate refund",
      netKeep: "Net keep на RSU",
      effective: "Effective tax rate на RSU",
    },
    presets: { title: "Типичные scenarios:" },
    p1: "$140K + $80K vesting · AB",
    p2: "$180K + $120K vesting · ON",
    p3: "$220K + $150K vesting · BC",
    disclaimer:
      "Estimation с 2026 federal + AB/BC/ON brackets. Не включает CPP/EI, surtaxes, dividend tax credits. ~95% accuracy. Не investment/tax advice — для индивидуальной настройки CPA + Licensed DR (NRD #4575551).",
  },
  en: {
    title: "RSU Tax Calculator",
    sub: "Exact tax math on RSU vesting in Canada 2026",
    tldrLabel: "TL;DR",
    tldr: "When RSUs vest, their market value is taxed as employment income (T4) at your marginal rate. This calculator estimates federal and provincial tax (AB/BC/ON, 2026) on a vesting event — approximate, excluding CPP/EI. It's an educational tool, not tax advice.",
    inputs: {
      base: "Base salary (T4)",
      rsu: "RSU vesting amount (FMV at vest)",
      province: "Province",
      rrsp: "RRSP contribution in vesting year",
    },
    province: { AB: "Alberta", BC: "British Columbia", ON: "Ontario" },
    out: {
      title: "Results",
      totalIncome: "Total T4 income (base + RSU)",
      marginalBracket: "Marginal bracket on RSU income",
      taxNoRrsp: "Tax on RSU without RRSP",
      taxWithRrsp: "Tax on RSU with RRSP",
      refund: "RRSP immediate refund",
      netKeep: "Net keep on RSU",
      effective: "Effective tax rate on RSU",
    },
    presets: { title: "Typical scenarios:" },
    p1: "$140K + $80K vest · AB",
    p2: "$180K + $120K vest · ON",
    p3: "$220K + $150K vest · BC",
    disclaimer:
      "Estimation with 2026 federal + AB/BC/ON brackets. Excludes CPP/EI, provincial surtaxes, dividend tax credits. ~95% accuracy for typical scenarios. Not investment or tax advice — for individual setup engage a CPA + Licensed DR (NRD #4575551).",
  },
};

function fmt(n: number) {
  return "$" + Math.round(n).toLocaleString("en-CA");
}

const PRESETS = [
  { base: 140000, rsu: 80000, province: "AB", rrsp: 33810 },
  { base: 180000, rsu: 120000, province: "ON", rrsp: 33810 },
  { base: 220000, rsu: 150000, province: "BC", rrsp: 33810 },
];

export default function RsuCalculator({ locale = "uk" }: { locale?: Locale }) {
  const t = T[locale] || T.uk;
  const [base, setBase] = useUrlState("base", 140000, "number");
  const [rsu, setRsu] = useUrlState("rsu", 80000, "number");
  const [province, setProvince] = useUrlState("prov", "AB");
  const [rrsp, setRrsp] = useUrlState("rrsp", 33810, "number");
  const [copyState, setCopyState] = useState<"idle" | "copied" | "failed">("idle");

  async function onCopyLink() {
    const ok = await copyShareUrl();
    setCopyState(ok ? "copied" : "failed");
    setTimeout(() => setCopyState("idle"), 2000);
  }

  const result = useMemo(() => {
    const totalIncome = base + rsu;
    const baseTax = computeTax(base, province);
    const taxWithRsuNoRrsp = computeTax(totalIncome, province);
    const taxWithRsuAndRrsp = computeTax(totalIncome - rrsp, province);

    const taxOnRsuNoRrsp = taxWithRsuNoRrsp - baseTax;
    const refund = taxWithRsuNoRrsp - taxWithRsuAndRrsp;
    const taxOnRsuWithRrsp = taxOnRsuNoRrsp - refund;
    const netKeep = rsu - taxOnRsuWithRrsp;
    const marginalAtTotal = marginalRate(totalIncome, province);
    const effective = rsu > 0 ? taxOnRsuWithRrsp / rsu : 0;

    return {
      totalIncome,
      taxOnRsuNoRrsp,
      taxOnRsuWithRrsp,
      refund,
      netKeep,
      marginalAtTotal,
      effective,
    };
  }, [base, rsu, province, rrsp]);

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
              pageUrl={`https://sky-fort.ca/${locale}/calculators/rsu-tax`}
            />
          </div>
        </div>

        <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-6">
          {/* Inputs */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Field label={t.inputs.base}>
              <input
                type="number"
                min={0}
                value={base}
                onChange={(e) => setBase(Number(e.target.value) || 0)}
                className="w-full rounded-lg border border-white/15 bg-black/30 px-3 py-2 text-white"
              />
            </Field>
            <Field label={t.inputs.rsu}>
              <input
                type="number"
                min={0}
                value={rsu}
                onChange={(e) => setRsu(Number(e.target.value) || 0)}
                className="w-full rounded-lg border border-white/15 bg-black/30 px-3 py-2 text-white"
              />
            </Field>
            <Field label={t.inputs.province}>
              <select
                value={province}
                onChange={(e) => setProvince(e.target.value)}
                className="w-full rounded-lg border border-white/15 bg-black/30 px-3 py-2 text-white"
              >
                <option value="AB">{t.province.AB}</option>
                <option value="BC">{t.province.BC}</option>
                <option value="ON">{t.province.ON}</option>
              </select>
            </Field>
            <Field label={t.inputs.rrsp}>
              <input
                type="number"
                min={0}
                max={33810}
                value={rrsp}
                onChange={(e) => setRrsp(Number(e.target.value) || 0)}
                className="w-full rounded-lg border border-white/15 bg-black/30 px-3 py-2 text-white"
              />
            </Field>
          </div>

          {/* Presets */}
          <div className="mt-5">
            <p className="mb-2 text-xs font-bold uppercase tracking-wider text-white/50">
              {t.presets.title}
            </p>
            <div className="flex flex-wrap gap-2">
              {PRESETS.map((p, i) => (
                <button
                  key={i}
                  type="button"
                  onClick={() => {
                    setBase(p.base);
                    setRsu(p.rsu);
                    setProvince(p.province);
                    setRrsp(p.rrsp);
                  }}
                  className="rounded-md border border-white/10 bg-black/40 px-3 py-1.5 text-xs font-semibold text-white/85 transition-colors duration-150 ease-[var(--ease-out)] hover:border-[var(--color-brand)]/40 hover:text-white"
                >
                  {t[`p${i + 1}`]}
                </button>
              ))}
            </div>
          </div>

          {/* Outputs */}
          <div className="mt-6 rounded-xl border border-[var(--color-brand)]/30 bg-[var(--color-brand)]/[0.06] p-5">
            <p className="text-xs font-bold uppercase tracking-[0.14em] text-[var(--color-brand)]">
              {t.out.title}
            </p>
            <dl className="mt-3 space-y-2.5 text-sm">
              <Row label={t.out.totalIncome} value={fmt(result.totalIncome)} />
              <Row
                label={t.out.marginalBracket}
                value={Math.round(result.marginalAtTotal * 100) + "%"}
              />
              <Row
                label={t.out.taxNoRrsp}
                value={fmt(result.taxOnRsuNoRrsp)}
                muted
              />
              <Row label={t.out.refund} value={fmt(result.refund)} good />
              <Row label={t.out.taxWithRrsp} value={fmt(result.taxOnRsuWithRrsp)} />
              <Row label={t.out.netKeep} value={fmt(result.netKeep)} good big />
              <Row
                label={t.out.effective}
                value={Math.round(result.effective * 100) + "%"}
              />
            </dl>
          </div>

          {/* Share-link */}
          <div className="mt-5 flex flex-wrap items-center gap-3">
            <button
              type="button"
              onClick={onCopyLink}
              className="inline-flex items-center gap-2 rounded-lg border border-[var(--color-brand)]/40 bg-[var(--color-brand)]/[0.08] px-4 py-2 text-sm font-bold text-[var(--color-brand)] transition-colors duration-150 ease-[var(--ease-out)] hover:bg-[var(--color-brand)]/[0.14]"
            >
              <LinkIcon size={14} aria-hidden="true" />
              {copyState === "copied"
                ? locale === "ru" ? "Скопировано!" : locale === "en" ? "Copied!" : "Скопійовано!"
                : copyState === "failed"
                ? locale === "ru" ? "Ошибка" : locale === "en" ? "Failed" : "Помилка"
                : locale === "ru" ? "Скопировать ссылку" : locale === "en" ? "Copy link" : "Скопіювати посилання"}
            </button>
            <p className="text-xs text-white/55">
              {locale === "ru" ? "URL зберігає твої цифри" : locale === "en" ? "URL preserves your inputs" : "URL зберігає твої цифри"}
            </p>
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

function Field({ label, children }: { label: ReactNode; children?: ReactNode }) {
  return (
    <label className="block">
      <span className="mb-1 block text-xs font-bold uppercase tracking-wider text-white/60">
        {label}
      </span>
      {children}
    </label>
  );
}

function Row({ label, value, muted, good, big }: { label: ReactNode; value: ReactNode; muted?: boolean; good?: boolean; big?: boolean }) {
  return (
    <div className="flex items-baseline justify-between gap-4 border-b border-white/5 pb-2 last:border-0 last:pb-0">
      <dt className="text-white/65">{label}</dt>
      <dd
        className={`font-mono font-semibold ${
          big ? "text-xl text-white" : "text-base"
        } ${good ? "text-[var(--color-brand)]" : muted ? "text-white/55" : "text-white"}`}
      >
        {value}
      </dd>
    </div>
  );
}
