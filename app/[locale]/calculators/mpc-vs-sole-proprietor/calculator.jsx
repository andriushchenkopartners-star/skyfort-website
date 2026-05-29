// MPC vs Sole Proprietor interactive calculator.

"use client";

import { useState, useMemo } from "react";
import { Calculator, Info, Stethoscope, Link as LinkIcon } from "lucide-react";
import { useUrlState, copyShareUrl } from "../../../_lib/use-url-state";

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

// SBD effective rate (combined federal 9% + provincial small biz reduction).
// AB ≈ 11%, BC ≈ 11%, ON ≈ 12.2%.
const SBD_RATE = { AB: 0.11, BC: 0.11, ON: 0.122 };

// Eligible-dividend effective tax rate at high marginal (~$130K+ personal).
// AB ≈ 32%, BC ≈ 36%, ON ≈ 39%.
const ELIGIBLE_DIV_RATE = { AB: 0.32, BC: 0.36, ON: 0.39 };

const CPP_MAX_2026 = 73200;
const CPP_RATE = 0.115; // employee + employer combined for self-employed

function computeTax(income, province) {
  if (income <= 0) return 0;
  let fed = 0, prev = 0;
  for (const b of FED_BRACKETS_2026) {
    const t = Math.min(income, b.upTo) - prev;
    if (t > 0) fed += t * b.rate;
    if (income <= b.upTo) break;
    prev = b.upTo;
  }
  let prov = 0;
  prev = 0;
  for (const b of PROV_BRACKETS_2026[province] || PROV_BRACKETS_2026.AB) {
    const t = Math.min(income, b.upTo) - prev;
    if (t > 0) prov += t * b.rate;
    if (income <= b.upTo) break;
    prev = b.upTo;
  }
  return fed + prov;
}

const T = {
  uk: {
    title: "MPC vs Sole Proprietor",
    sub: "Лікарю в Канаді: який tax differential дає MPC проти sole proprietor",
    inputs: {
      gross: "Gross practice income ($)",
      expenses: "Practice expenses (rent, supplies, malpractice)",
      province: "Провінція",
      salary: "Salary з MPC ($) — типово CPP-max",
      dividend: "Dividend з MPC ($)",
    },
    presets: "Типові scenarios:",
    p1: "$300K · $50K expenses · AB · year 2-3",
    p2: "$500K · $80K expenses · ON · specialist",
    p3: "$200K · $40K expenses · AB · year 1",
    out: {
      title: "Comparison",
      colSP: "Sole Proprietor",
      colMPC: "MPC",
      personalTax: "Personal tax",
      cpp: "CPP",
      corpTax: "Corporate tax (SBD)",
      divTax: "Dividend tax",
      totalTax: "Total tax/year",
      livingIncome: "Living income (after tax)",
      mpcCapital: "Capital у MPC (tax-deferred)",
      savings: "Total annual savings з MPC",
    },
    p20Title: "20-річна проекція (6% growth)",
    p20Body: "Кожен рік $X залишається у MPC і росте при 6%. За 20 років акумулює $Y. Plus personal RRSP/TFSA contributions з salary.",
    disclaimer:
      "Estimation з 2026 federal + AB/BC/ON brackets + SBD ~11% + eligible dividend rate. Не враховує: setup costs, IPP, Holdco, spouse-shareholder (TOSI), provincial surtaxes, GST/HST. ~92% accuracy для baseline decision. Не tax advice — медичний CPA + Licensed DR (NRD #4575551).",
  },
  ru: {
    title: "MPC vs Sole Proprietor",
    sub: "Врачу в Канаде: tax differential MPC vs sole proprietor",
    inputs: {
      gross: "Gross practice income ($)",
      expenses: "Practice expenses",
      province: "Провинция",
      salary: "Salary из MPC ($) — типично CPP-max",
      dividend: "Dividend из MPC ($)",
    },
    presets: "Типичные scenarios:",
    p1: "$300K · $50K expenses · AB · year 2-3",
    p2: "$500K · $80K expenses · ON · specialist",
    p3: "$200K · $40K expenses · AB · year 1",
    out: {
      title: "Comparison",
      colSP: "Sole Proprietor",
      colMPC: "MPC",
      personalTax: "Personal tax",
      cpp: "CPP",
      corpTax: "Corporate tax (SBD)",
      divTax: "Dividend tax",
      totalTax: "Total tax/год",
      livingIncome: "Living income (после tax)",
      mpcCapital: "Capital в MPC (tax-deferred)",
      savings: "Total annual savings с MPC",
    },
    p20Title: "20-летняя проекция (6% growth)",
    p20Body: "Каждый год $X остаётся в MPC и растёт при 6%. За 20 лет акумулирует $Y.",
    disclaimer:
      "Estimation с 2026 brackets + SBD + eligible dividend rate. Не учитывает setup costs, IPP, Holdco, TOSI, surtaxes. ~92% accuracy. Не tax advice — CPA + Licensed DR (NRD #4575551).",
  },
  en: {
    title: "MPC vs Sole Proprietor",
    sub: "Physician in Canada: tax differential from MPC vs sole proprietor",
    inputs: {
      gross: "Gross practice income ($)",
      expenses: "Practice expenses (rent, supplies, malpractice)",
      province: "Province",
      salary: "Salary from MPC ($) — typically CPP-max",
      dividend: "Dividend from MPC ($)",
    },
    presets: "Typical scenarios:",
    p1: "$300K · $50K expenses · AB · year 2-3",
    p2: "$500K · $80K expenses · ON · specialist",
    p3: "$200K · $40K expenses · AB · year 1",
    out: {
      title: "Comparison",
      colSP: "Sole Proprietor",
      colMPC: "MPC",
      personalTax: "Personal tax",
      cpp: "CPP",
      corpTax: "Corporate tax (SBD)",
      divTax: "Dividend tax",
      totalTax: "Total tax/year",
      livingIncome: "Living income (after tax)",
      mpcCapital: "Capital in MPC (tax-deferred)",
      savings: "Total annual savings via MPC",
    },
    p20Title: "20-year projection (6% growth)",
    p20Body: "Each year $X stays in MPC and grows at 6%. Over 20 years accumulates $Y.",
    disclaimer:
      "Estimation with 2026 federal + AB/BC/ON brackets + SBD ~11% + eligible dividend rate. Doesn't account for: setup costs, IPP, Holdco, spouse-shareholder (TOSI), provincial surtaxes, GST/HST. ~92% accuracy for baseline decision. Not tax advice — medical CPA + Licensed DR (NRD #4575551).",
  },
};

const PRESETS = [
  { gross: 300000, expenses: 50000, province: "AB", salary: 73200, dividend: 50000 },
  { gross: 500000, expenses: 80000, province: "ON", salary: 73200, dividend: 100000 },
  { gross: 200000, expenses: 40000, province: "AB", salary: 73200, dividend: 30000 },
];

function fmt(n) {
  return "$" + Math.round(n).toLocaleString("en-CA");
}

export default function MpcCalculator({ locale = "uk" }) {
  const t = T[locale] || T.uk;
  const [gross, setGross] = useUrlState("gross", 300000, "number");
  const [expenses, setExpenses] = useUrlState("expenses", 50000, "number");
  const [province, setProvince] = useUrlState("prov", "AB");
  const [salary, setSalary] = useUrlState("salary", CPP_MAX_2026, "number");
  const [dividend, setDividend] = useUrlState("dividend", 50000, "number");
  const [copyState, setCopyState] = useState("idle");

  async function onCopyLink() {
    const ok = await copyShareUrl();
    setCopyState(ok ? "copied" : "failed");
    setTimeout(() => setCopyState("idle"), 2000);
  }

  const result = useMemo(() => {
    const netPractice = Math.max(0, gross - expenses);

    // Sole proprietor: all flows to personal income.
    const spTax = computeTax(netPractice, province);
    const spCpp = Math.min(netPractice, CPP_MAX_2026) * CPP_RATE;
    const spTotal = spTax + spCpp;
    const spLiving = netPractice - spTotal;

    // MPC: salary (personal) + dividend (after corp tax) + retained (in MPC).
    const personalTaxOnSalary = computeTax(salary, province);
    const cppOnSalary = Math.min(salary, CPP_MAX_2026) * CPP_RATE;
    const corpIncome = Math.max(0, netPractice - salary);
    const corpTax = corpIncome * (SBD_RATE[province] || 0.11);
    const corpAfterTax = corpIncome - corpTax;
    const dividendActual = Math.min(dividend, corpAfterTax);
    const dividendTax = dividendActual * (ELIGIBLE_DIV_RATE[province] || 0.32);
    const retainedInMpc = corpAfterTax - dividendActual;
    const mpcTotal = personalTaxOnSalary + cppOnSalary + corpTax + dividendTax;
    const mpcLiving = salary - personalTaxOnSalary - cppOnSalary + dividendActual - dividendTax;

    const savings = spTotal - mpcTotal;

    // 20-year projection — straight-line compound on retained MPC.
    const proj20 = retainedInMpc > 0
      ? retainedInMpc * ((Math.pow(1.06, 20) - 1) / 0.06)
      : 0;

    return {
      spTax, spCpp, spTotal, spLiving,
      personalTaxOnSalary, cppOnSalary, corpTax, dividendTax,
      retainedInMpc, mpcTotal, mpcLiving, savings, proj20,
    };
  }, [gross, expenses, province, salary, dividend]);

  return (
    <section className="px-6 pb-12">
      <div className="mx-auto max-w-3xl">
        <div className="mb-6">
          <p className="text-xs font-bold uppercase tracking-[0.18em] text-[var(--color-brand)]">
            <Stethoscope className="inline-block h-4 w-4 mr-1" /> Calculator · Medical
          </p>
          <h1 className="mt-3 text-3xl sm:text-4xl font-extrabold">{t.title}</h1>
          <p className="mt-3 text-lg text-white/75">{t.sub}</p>
        </div>

        <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-6">
          {/* Inputs */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Field label={t.inputs.gross}>
              <input type="number" min={0} value={gross} onChange={(e) => setGross(Number(e.target.value) || 0)} className="w-full rounded-lg border border-white/15 bg-black/30 px-3 py-2 text-white" />
            </Field>
            <Field label={t.inputs.expenses}>
              <input type="number" min={0} value={expenses} onChange={(e) => setExpenses(Number(e.target.value) || 0)} className="w-full rounded-lg border border-white/15 bg-black/30 px-3 py-2 text-white" />
            </Field>
            <Field label={t.inputs.province}>
              <select value={province} onChange={(e) => setProvince(e.target.value)} className="w-full rounded-lg border border-white/15 bg-black/30 px-3 py-2 text-white">
                <option value="AB">Alberta</option>
                <option value="BC">British Columbia</option>
                <option value="ON">Ontario</option>
              </select>
            </Field>
            <Field label={t.inputs.salary}>
              <input type="number" min={0} value={salary} onChange={(e) => setSalary(Number(e.target.value) || 0)} className="w-full rounded-lg border border-white/15 bg-black/30 px-3 py-2 text-white" />
            </Field>
            <Field label={t.inputs.dividend}>
              <input type="number" min={0} value={dividend} onChange={(e) => setDividend(Number(e.target.value) || 0)} className="w-full rounded-lg border border-white/15 bg-black/30 px-3 py-2 text-white" />
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
                    setGross(p.gross);
                    setExpenses(p.expenses);
                    setProvince(p.province);
                    setSalary(p.salary);
                    setDividend(p.dividend);
                  }}
                  className="rounded-md border border-white/10 bg-black/40 px-3 py-1.5 text-xs font-semibold text-white/85 hover:border-[var(--color-brand)]/40 hover:text-white"
                >
                  {t[`p${i + 1}`]}
                </button>
              ))}
            </div>
          </div>

          {/* Comparison */}
          <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="rounded-xl border border-white/15 bg-white/[0.04] p-5">
              <p className="text-xs font-bold uppercase tracking-[0.14em] text-white/65">{t.out.colSP}</p>
              <dl className="mt-3 space-y-2 text-sm">
                <RowMini label={t.out.personalTax} value={fmt(result.spTax)} />
                <RowMini label={t.out.cpp} value={fmt(result.spCpp)} />
                <RowMini label={t.out.totalTax} value={fmt(result.spTotal)} bold />
                <RowMini label={t.out.livingIncome} value={fmt(result.spLiving)} good />
              </dl>
            </div>
            <div className="rounded-xl border border-[var(--color-brand)]/40 bg-[var(--color-brand)]/[0.08] p-5">
              <p className="text-xs font-bold uppercase tracking-[0.14em] text-[var(--color-brand)]">{t.out.colMPC}</p>
              <dl className="mt-3 space-y-2 text-sm">
                <RowMini label={t.out.personalTax} value={fmt(result.personalTaxOnSalary)} />
                <RowMini label={t.out.cpp} value={fmt(result.cppOnSalary)} />
                <RowMini label={t.out.corpTax} value={fmt(result.corpTax)} />
                <RowMini label={t.out.divTax} value={fmt(result.dividendTax)} />
                <RowMini label={t.out.totalTax} value={fmt(result.mpcTotal)} bold />
                <RowMini label={t.out.livingIncome} value={fmt(result.mpcLiving)} good />
                <RowMini label={t.out.mpcCapital} value={fmt(result.retainedInMpc)} good bold />
              </dl>
            </div>
          </div>

          {/* Savings */}
          <div className="mt-5 rounded-xl border border-amber-500/30 bg-amber-500/[0.07] p-5">
            <p className="text-xs font-bold uppercase tracking-[0.14em] text-amber-300">{t.out.savings}</p>
            <p className="mt-2 text-3xl font-extrabold text-amber-100">{fmt(result.savings)}/yr</p>
            <p className="mt-3 text-sm text-white/85">
              <strong>{t.p20Title}:</strong>{" "}
              {locale === "ru"
                ? `MPC аккумулирует $${Math.round(result.proj20).toLocaleString("en-CA")} за 20 лет (при 6% growth retained $${Math.round(result.retainedInMpc).toLocaleString("en-CA")}/год).`
                : locale === "en"
                ? `MPC accumulates $${Math.round(result.proj20).toLocaleString("en-CA")} over 20 years (at 6% growth on $${Math.round(result.retainedInMpc).toLocaleString("en-CA")}/yr retained).`
                : `MPC акумулює $${Math.round(result.proj20).toLocaleString("en-CA")} за 20 років (при 6% growth retained $${Math.round(result.retainedInMpc).toLocaleString("en-CA")}/рік).`}
            </p>
          </div>

          {/* Share-link */}
          <div className="mt-5 flex flex-wrap items-center gap-3">
            <button
              type="button"
              onClick={onCopyLink}
              className="inline-flex items-center gap-2 rounded-lg border border-[var(--color-brand)]/40 bg-[var(--color-brand)]/[0.08] px-4 py-2 text-sm font-bold text-[var(--color-brand)] hover:bg-[var(--color-brand)]/[0.14]"
            >
              <LinkIcon size={14} aria-hidden="true" />
              {copyState === "copied"
                ? locale === "ru" ? "Скопировано!" : locale === "en" ? "Copied!" : "Скопійовано!"
                : copyState === "failed"
                ? locale === "ru" ? "Ошибка" : locale === "en" ? "Failed" : "Помилка"
                : locale === "ru" ? "Скопировать сценарий" : locale === "en" ? "Copy scenario link" : "Скопіювати посилання"}
            </button>
            <p className="text-xs text-white/55">
              {locale === "ru" ? "URL зберігає всі поля" : locale === "en" ? "URL preserves all inputs" : "URL зберігає всі поля"}
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

function Field({ label, children }) {
  return (
    <label className="block">
      <span className="mb-1 block text-xs font-bold uppercase tracking-wider text-white/60">{label}</span>
      {children}
    </label>
  );
}

function RowMini({ label, value, bold, good }) {
  return (
    <div className="flex items-baseline justify-between gap-3">
      <dt className="text-white/65 text-xs">{label}</dt>
      <dd className={`font-mono ${bold ? "font-bold" : "font-semibold"} ${good ? "text-[var(--color-brand)]" : "text-white"}`}>
        {value}
      </dd>
    </div>
  );
}
