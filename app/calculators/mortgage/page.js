"use client";

import { useState, useMemo, useEffect } from "react";
import Link from "next/link";
import {
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend,
  ResponsiveContainer, BarChart, Bar,
} from "recharts";
import {
  ArrowLeft, ArrowRight, Home, Building2, CreditCard,
  Zap, RefreshCw, Star, TrendingUp, DollarSign, AlertTriangle, CheckCircle2,
} from "lucide-react";

// ─────────────────────────────────────────────────────────────────────────────
// LOGO
// ─────────────────────────────────────────────────────────────────────────────
function Logo() {
  return (
    <div className="flex items-center gap-3">
      <svg viewBox="0 0 97 90" className="h-7 w-auto text-[#2D73E3]" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M27.69 0V55.38C12.41 55.38 0 42.98 0 27.69C0 12.41 12.41 0 27.69 0Z" fill="currentColor"/>
        <path d="M34.61 90L34.61 34.62C49.89 34.62 62.3 47.03 62.3 62.31C62.3 77.59 49.89 90 34.61 90Z" fill="currentColor"/>
        <path d="M62.31 27.69C47.02 27.69 34.62 15.29 34.62 0H62.31V27.69Z" fill="currentColor"/>
        <path d="M96.92 27.69L69.23 0H96.92V27.69Z" fill="currentColor"/>
        <path d="M27.69 76.16C27.69 68.51 21.49 62.31 13.84 62.31C6.2 62.31 0 68.51 0 76.16C0 83.8 6.2 90 13.84 90C21.49 90 27.69 83.8 27.69 76.16Z" fill="currentColor"/>
        <path d="M96.92 48.47C96.92 40.82 90.72 34.62 83.08 34.62C75.43 34.62 69.23 40.82 69.23 48.47C69.23 56.11 75.43 62.31 83.08 62.31C90.72 62.31 96.92 56.11 96.92 48.47Z" fill="currentColor"/>
      </svg>
      <span className="text-lg font-bold tracking-wider text-white">SKYFORT</span>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// MATH HELPERS
// ─────────────────────────────────────────────────────────────────────────────
function calcPayment(principal, annualRate, years) {
  if (principal <= 0 || years <= 0) return 0;
  const r = annualRate / 100 / 12;
  const n = years * 12;
  if (r === 0) return principal / n;
  return principal * r * Math.pow(1 + r, n) / (Math.pow(1 + r, n) - 1);
}

function cmhc(price, down) {
  const ratio = down / price;
  if (ratio >= 0.20) return { pct: 0, premium: 0 };
  if (ratio < 0.05) return { pct: null, premium: 0 };
  const pct = ratio < 0.10 ? 0.040 : ratio < 0.15 ? 0.031 : 0.028;
  return { pct, premium: Math.round((price - down) * pct) };
}

function stressRate(rate) { return Math.max(rate + 2, 5.25); }

function qualifyingIncome(payment, propTaxYr, heatingMo) {
  return (payment + propTaxYr / 12 + heatingMo) / 0.39 * 12;
}

function buildSchedule(principal, annualRate, years, extra = 0) {
  const r = annualRate / 100 / 12;
  const base = calcPayment(principal, annualRate, years);
  const pmt = base + extra;
  let bal = principal;
  let totalInterest = 0;
  const data = [];
  let month = 0;
  while (bal > 1 && month < (years + 10) * 12) {
    const int = bal * r;
    const prin = Math.min(pmt - int, bal);
    if (prin <= 0) break;
    bal -= prin;
    totalInterest += int;
    month++;
    if (month % 12 === 0) data.push({ year: month / 12, balance: Math.round(Math.max(0, bal)) });
  }
  return { data, totalInterest: Math.round(totalInterest), months: month };
}

// ─────────────────────────────────────────────────────────────────────────────
// FORMAT HELPERS
// ─────────────────────────────────────────────────────────────────────────────
const C = (n, dec = 0) => {
  if (!isFinite(n) || isNaN(n)) return "—";
  return new Intl.NumberFormat("en-CA", { style: "currency", currency: "CAD", maximumFractionDigits: dec }).format(n);
};
const P = (n) => `${n.toFixed(2)}%`;
const YM = (months) => {
  const y = Math.floor(months / 12), m = Math.round(months % 12);
  return y > 0 ? `${y}р ${m}м` : `${m}м`;
};

// ─────────────────────────────────────────────────────────────────────────────
// TRANSLATIONS
// ─────────────────────────────────────────────────────────────────────────────
const T = {
  uk: {
    back: "На головну", kicker: "Калькулятор · Іпотека",
    title: "Іпотека в Канаді — без сюрпризів",
    sub: "6 інструментів: стрес-тест, CMHC, дострокове погашення, розрив контракту, інвестиція, доступність.",
    tabs: ["🏠 Основне житло", "🏢 Інвестиція", "💳 HELOC", "⚡ Дострокове", "🔄 Зміна лендера", "⭐ Доступність"],
    cta: "Записатись на консультацію",
    ctaSub: "30 хв — розберемо твою ситуацію, порахуємо реальні цифри, знайдемо найкращий варіант.",
    disclaimer: "Калькулятор надає орієнтовні результати. Реальні умови залежать від лендера та кредитної історії. Не є фінансовою порадою. ETF, mutual funds та individual stocks — поза моєю ліцензією; для public market — до CIRO-registered advisor. Exempt market securities — через Axcess Capital Advisors Inc. (EMD, AB/BC/ON).",
  },
  ru: {
    back: "На главную", kicker: "Калькулятор · Ипотека",
    title: "Ипотека в Канаде — без сюрпризов",
    sub: "6 инструментов: стресс-тест, CMHC, досрочное погашение, разрыв контракта, инвестиция, доступность.",
    tabs: ["🏠 Основное жильё", "🏢 Инвестиция", "💳 HELOC", "⚡ Досрочное", "🔄 Смена лендера", "⭐ Доступность"],
    cta: "Записаться на консультацию",
    ctaSub: "30 мин — разберём твою ситуацию, посчитаем реальные цифры, найдём лучший вариант.",
    disclaimer: "Калькулятор предоставляет ориентировочные результаты. Реальные условия зависят от лендера и кредитной истории. Не является финансовым советом. ETF, mutual funds и individual stocks — вне моей лицензии; для public market — к CIRO-registered advisor. Exempt market securities — через Axcess Capital Advisors Inc. (EMD, AB/BC/ON).",
  },
  en: {
    back: "Back to home", kicker: "Calculator · Mortgage",
    title: "Canadian mortgage — no surprises",
    sub: "6 tools: stress test, CMHC, early payoff, break penalty, investment property, affordability.",
    tabs: ["🏠 Primary Home", "🏢 Investment", "💳 HELOC", "⚡ Early Payoff", "🔄 Lender Switch", "⭐ Affordability"],
    cta: "Book a consultation",
    ctaSub: "30 min — we'll review your situation, calculate real numbers, find the best option.",
    disclaimer: "Calculator provides estimates only. Actual terms depend on lender and credit history. Not financial advice. ETFs, mutual funds, and individual stocks are outside my license; for public market, consult a CIRO-registered advisor. Exempt market securities through Axcess Capital Advisors Inc. (EMD, AB/BC/ON).",
  },
};

const CALENDLY = "https://calendly.com/andriushchenko-partners/new-meeting";

// ─────────────────────────────────────────────────────────────────────────────
// SHARED UI
// ─────────────────────────────────────────────────────────────────────────────
function LangSwitcher({ lang, setLang }) {
  return (
    <div className="flex items-center rounded-full border border-[#2a2a2a] bg-[#222] p-1">
      {["uk","ru","en"].map(c => (
        <button key={c} onClick={() => setLang(c)}
          className={`rounded-full px-3 py-1 text-xs font-bold tracking-wider transition-all ${lang===c?"bg-[#2D73E3] text-white":"text-[#a3a3a3] hover:text-white"}`}>
          {c==="uk"?"УК":c.toUpperCase()}
        </button>
      ))}
    </div>
  );
}

function NInput({ label, value, onChange, prefix, suffix, step=1, min=0, max=9999999, note }) {
  return (
    <div>
      <label className="mb-1.5 flex items-center justify-between text-xs font-bold uppercase tracking-wider text-[#a3a3a3]">
        <span>{label}</span>
        {note && <span className="text-[10px] text-[#6b6b6b] normal-case font-normal tracking-normal">{note}</span>}
      </label>
      <div className="flex items-center gap-2">
        <button onClick={() => onChange(Math.max(min, parseFloat((value-step).toFixed(4))))}
          className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-lg border border-[#3a3a3a] text-lg text-[#a3a3a3] hover:border-[#2D73E3] hover:text-white transition-all">−</button>
        <div className="relative flex-1">
          {prefix && <span className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-sm text-[#6b6b6b]">{prefix}</span>}
          <input type="text" inputMode="decimal" value={value}
            onChange={e => { const v=parseFloat(e.target.value.replace(/[^\d.]/g,"")); if(!isNaN(v)) onChange(Math.min(max,Math.max(min,v))); }}
            className={`w-full rounded-lg border border-[#3a3a3a] bg-[#191919] py-2.5 text-center text-lg font-bold text-white outline-none focus:border-[#2D73E3] transition-colors ${prefix?"pl-7":""} ${suffix?"pr-7":""}`}/>
          {suffix && <span className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-sm text-[#6b6b6b]">{suffix}</span>}
        </div>
        <button onClick={() => onChange(Math.min(max, parseFloat((value+step).toFixed(4))))}
          className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-lg border border-[#3a3a3a] text-lg text-[#a3a3a3] hover:border-[#2D73E3] hover:text-white transition-all">+</button>
      </div>
    </div>
  );
}

function Card({ label, value, sub, color = "neutral" }) {
  const cls = {
    neutral: "border-[#2a2a2a] bg-[#1f1f1f]",
    blue: "border-[#2D73E3]/40 bg-[#2D73E3]/5",
    gold: "border-[#FFB627]/40 bg-[#FFB627]/5",
    red: "border-red-500/40 bg-red-500/5",
    green: "border-green-500/40 bg-green-500/5",
  }[color];
  const valCls = { neutral:"text-white", blue:"text-[#2D73E3]", gold:"text-[#FFB627]", red:"text-red-400", green:"text-green-400" }[color];
  const lblCls = { neutral:"text-[#6b6b6b]", blue:"text-[#2D73E3]", gold:"text-[#FFB627]", red:"text-red-400", green:"text-green-400" }[color];
  return (
    <div className={`rounded-xl border p-4 ${cls}`}>
      <p className={`text-xs uppercase tracking-wider ${lblCls}`}>{label}</p>
      <p className={`mt-1.5 text-2xl font-bold ${valCls}`}>{value}</p>
      {sub && <p className="mt-1 text-xs text-[#6b6b6b]">{sub}</p>}
    </div>
  );
}

function SelectGroup({ options, value, onChange }) {
  return (
    <div className="flex flex-wrap gap-2">
      {options.map(o => (
        <button key={o.value} onClick={() => onChange(o.value)}
          className={`rounded-full border px-3 py-1.5 text-xs font-bold uppercase tracking-wider transition-all ${value===o.value?"border-[#2D73E3] bg-[#2D73E3] text-white":"border-[#3a3a3a] text-[#a3a3a3] hover:border-[#2D73E3] hover:text-white"}`}>
          {o.label}
        </button>
      ))}
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// MODE 0: PRIMARY RESIDENCE
// ─────────────────────────────────────────────────────────────────────────────
function ModeResidence({ lang }) {
  const [price, setPrice] = useState(650000);
  const [down, setDown] = useState(130000);
  const [amort, setAmort] = useState(25);
  const [rate, setRate] = useState(4.5);
  const [propTax, setPropTax] = useState(4500);
  const [heating, setHeating] = useState(150);

  const labels = {
    uk: { price:"Вартість нерухомості", down:"Перший внесок", amort:"Амортизація (роки)", rate:"Відсоткова ставка", tax:"Податок на нерухомість/рік", heat:"Опалення/місяць" },
    ru: { price:"Стоимость недвижимости", down:"Первый взнос", amort:"Амортизация (лет)", rate:"Процентная ставка", tax:"Налог на недвижимость/год", heat:"Отопление/месяц" },
    en: { price:"Property price", down:"Down payment", amort:"Amortization (years)", rate:"Interest rate", tax:"Property tax/year", heat:"Heating/month" },
  }[lang];

  const ins = {
    uk: { title:"Стрес-тест (OSFI)", stressRate:"Кваліфікаційна ставка", income:"Потрібний дохід/рік", cmhcLabel:"CMHC страховка", totalInt:"Загальні відсотки", accel:"Прискорений bi-weekly" },
    ru: { title:"Стресс-тест (OSFI)", stressRate:"Квалификационная ставка", income:"Нужный доход/год", cmhcLabel:"Страховка CMHC", totalInt:"Общие проценты", accel:"Ускоренный bi-weekly" },
    en: { title:"Stress Test (OSFI)", stressRate:"Qualifying rate", income:"Required income/yr", cmhcLabel:"CMHC insurance", totalInt:"Total interest", accel:"Accelerated bi-weekly" },
  }[lang];

  const dp = down / price;
  const cmhcData = cmhc(price, down);
  const insuredPrincipal = price - down + (cmhcData.premium || 0);
  const monthlyPmt = calcPayment(insuredPrincipal, rate, amort);

  const stressR = stressRate(rate);
  const stressPayment = calcPayment(insuredPrincipal, stressR, amort);
  const reqIncome = qualifyingIncome(stressPayment, propTax, heating);

  const { data: schedBase, totalInterest } = useMemo(() => buildSchedule(insuredPrincipal, rate, amort), [insuredPrincipal, rate, amort]);

  // Accelerated bi-weekly
  const accelPayment = monthlyPmt / 2;
  const { months: accelMonths, totalInterest: accelInterest } = useMemo(() => {
    const r = rate / 100 / 12;
    let bal = insuredPrincipal;
    let totalInt = 0;
    let month = 0;
    // bi-weekly = 26 payments/yr = every 2 weeks
    // Simulate monthly: 26 payments/yr = 13 months of payment per year
    const monthlyEquiv = accelPayment * 26 / 12;
    while (bal > 1 && month < (amort + 10) * 12) {
      const int = bal * r;
      const prin = Math.min(monthlyEquiv - int, bal);
      if (prin <= 0) break;
      bal -= prin;
      totalInt += int;
      month++;
    }
    return { months: month, totalInterest: Math.round(totalInt) };
  }, [insuredPrincipal, rate, amort, accelPayment]);

  const monthsSaved = amort * 12 - accelMonths;
  const interestSaved = totalInterest - accelInterest;

  const ineligible = cmhcData.pct === null;
  const noInsurance = dp >= 0.20;

  return (
    <div className="space-y-8">
      <div className="grid gap-6 md:grid-cols-2">
        {/* Inputs */}
        <div className="space-y-5 rounded-2xl border border-[#2a2a2a] bg-[#1f1f1f] p-6">
          <NInput label={labels.price} value={price} onChange={setPrice} prefix="$" step={5000} />
          <NInput label={labels.down} value={down} onChange={setDown} prefix="$" step={5000}
            note={`${(dp*100).toFixed(1)}% LTV`} />
          <SelectGroup
            options={[{value:15,label:"15р"},{value:20,label:"20р"},{value:25,label:"25р"},{value:30,label:"30р"}]}
            value={amort} onChange={setAmort} />
          <NInput label={labels.rate} value={rate} onChange={setRate} suffix="%" step={0.05} min={0.5} max={20} />
          <NInput label={labels.tax} value={propTax} onChange={setPropTax} prefix="$" step={100} />
          <NInput label={labels.heat} value={heating} onChange={setHeating} prefix="$" step={25} />
        </div>

        {/* Results */}
        <div className="space-y-4">
          {ineligible && (
            <div className="rounded-xl border border-red-500/30 bg-red-500/5 p-4 text-sm text-red-400">
              ⚠️ Мінімальний перший внесок — 5%. При ціні {C(price)} → мінімум {C(price * 0.05)}.
            </div>
          )}

          <Card label={lang==="en"?"Monthly payment":lang==="ru"?"Ежемесячный платёж":"Щомісячний платіж"} value={C(monthlyPmt)} color="blue"
            sub={`${C(accelPayment)} ${lang==="en"?"bi-weekly":lang==="ru"?"bi-weekly":"bi-weekly"}`} />

          {!noInsurance && !ineligible && (
            <Card label={ins.cmhcLabel} value={C(cmhcData.premium)} color="gold"
              sub={`${P(cmhcData.pct * 100)} ${lang==="en"?"of insured amount":lang==="ru"?"от суммы ипотеки":"від суми іпотеки"}`} />
          )}

          <Card label={ins.totalInt} value={C(totalInterest)} color="neutral"
            sub={`${lang==="en"?"Total cost":lang==="ru"?"Полная стоимость":"Повна вартість"}: ${C(insuredPrincipal + totalInterest)}`} />

          {/* Stress test box */}
          <div className="rounded-xl border border-[#2D73E3]/30 bg-[#2D73E3]/5 p-5">
            <p className="text-xs font-bold uppercase tracking-wider text-[#2D73E3]">{ins.title}</p>
            <div className="mt-3 grid grid-cols-2 gap-3">
              <div>
                <p className="text-xs text-[#6b6b6b]">{ins.stressRate}</p>
                <p className="text-xl font-bold text-white">{P(stressR)}</p>
              </div>
              <div>
                <p className="text-xs text-[#6b6b6b]">{ins.income}</p>
                <p className="text-xl font-bold text-[#2D73E3]">{C(reqIncome)}</p>
              </div>
            </div>
            <p className="mt-3 text-xs text-[#6b6b6b]">
              {lang==="en"
                ? `Bank qualifies you at stress test rate. GDS ≤ 39%: max ${P(39)} of gross income.`
                : lang==="ru"
                ? `Банк квалифицирует по стресс-тест ставке. GDS ≤ 39% от дохода.`
                : `Банк кваліфікує за стрес-тест ставкою. GDS ≤ 39% від доходу.`}
            </p>
          </div>

          {/* Accelerated bi-weekly savings */}
          {monthsSaved > 0 && (
            <div className="rounded-xl border border-green-500/30 bg-green-500/5 p-5">
              <p className="text-xs font-bold uppercase tracking-wider text-green-400">
                {ins.accel} {lang==="en"?"savings":lang==="ru"?"экономия":"економія"}
              </p>
              <div className="mt-3 grid grid-cols-2 gap-3">
                <div>
                  <p className="text-xs text-[#6b6b6b]">{lang==="en"?"Time saved":lang==="ru"?"Время сохранено":"Зекономлено часу"}</p>
                  <p className="text-xl font-bold text-green-400">{YM(monthsSaved)}</p>
                </div>
                <div>
                  <p className="text-xs text-[#6b6b6b]">{lang==="en"?"Interest saved":lang==="ru"?"Процентов сохранено":"Зекономлено відсотків"}</p>
                  <p className="text-xl font-bold text-green-400">{C(interestSaved)}</p>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Chart */}
      {schedBase.length > 0 && (
        <div className="rounded-2xl border border-[#2a2a2a] bg-[#1f1f1f] p-5">
          <p className="mb-4 text-sm font-bold uppercase tracking-wider text-[#6b6b6b]">
            {lang==="en"?"Balance over time":lang==="ru"?"Остаток по годам":"Залишок по роках"}
          </p>
          <div className="h-[280px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={schedBase} margin={{top:5,right:20,left:10,bottom:5}}>
                <CartesianGrid strokeDasharray="3 3" stroke="#2a2a2a" />
                <XAxis dataKey="year" stroke="#6b6b6b" style={{fontSize:11}} />
                <YAxis stroke="#6b6b6b" style={{fontSize:11}} tickFormatter={v=>`$${(v/1000).toFixed(0)}K`} />
                <Tooltip contentStyle={{backgroundColor:"#1f1f1f",border:"1px solid #2D73E3",borderRadius:8,color:"#fff"}} formatter={v=>C(v)} />
                <Line type="monotone" dataKey="balance" name={lang==="en"?"Balance":lang==="ru"?"Остаток":"Залишок"} stroke="#2D73E3" strokeWidth={3} dot={false} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
      )}
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// MODE 1: INVESTMENT PROPERTY
// ─────────────────────────────────────────────────────────────────────────────
function ModeInvestment({ lang }) {
  const [price, setPrice] = useState(550000);
  const [downPct, setDownPct] = useState(20);
  const [rate, setRate] = useState(5.0);
  const [amort, setAmort] = useState(25);
  const [rent, setRent] = useState(2400);
  const [vacancy, setVacancy] = useState(5);
  const [propTax, setPropTax] = useState(4200);
  const [maintenance, setMaintenance] = useState(1);
  const [mgmt, setMgmt] = useState(8);

  const down = price * downPct / 100;
  const mortgage = price - down;
  const monthlyMortgage = calcPayment(mortgage, rate, amort);

  const effectiveRent = rent * (1 - vacancy / 100);
  const monthlyTax = propTax / 12;
  const monthlyMaintenance = price * maintenance / 100 / 12;
  const monthlyMgmt = rent * mgmt / 100;
  const totalExpenses = monthlyMortgage + monthlyTax + monthlyMaintenance + monthlyMgmt;
  const cashFlow = effectiveRent - totalExpenses;

  const capRate = (effectiveRent * 12 - propTax - price * maintenance / 100 - rent * mgmt / 100 * 12) / price * 100;
  const cashOnCash = (cashFlow * 12) / down * 100;
  const grm = price / (rent * 12);
  const breakEvenRent = totalExpenses / (1 - vacancy / 100);

  const isPositive = cashFlow >= 0;

  const lbl = {
    uk: { price:"Ціна нерухомості", down:"Внесок %", rate:"Ставка", amort:"Амортизація", rent:"Оренда/місяць", vacancy:"Вакантність %", tax:"Податок/рік", maint:"Утримання % від ціни/рік", mgmt:"Управління %", flow:"Щомісячний cashflow", capRate:"Cap rate", coc:"Cash-on-cash", grm:"GRM", breakeven:"Break-even оренда" },
    ru: { price:"Цена недвижимости", down:"Взнос %", rate:"Ставка", amort:"Амортизация", rent:"Аренда/месяц", vacancy:"Вакантность %", tax:"Налог/год", maint:"Обслуживание %/год", mgmt:"Управление %", flow:"Ежемесячный cashflow", capRate:"Cap rate", coc:"Cash-on-cash", grm:"GRM", breakeven:"Break-even аренда" },
    en: { price:"Property price", down:"Down payment %", rate:"Rate", amort:"Amortization", rent:"Monthly rent", vacancy:"Vacancy %", tax:"Property tax/yr", maint:"Maintenance %/yr", mgmt:"Mgmt fee %", flow:"Monthly cash flow", capRate:"Cap rate", coc:"Cash-on-cash", grm:"GRM", breakeven:"Break-even rent" },
  }[lang];

  const expenseItems = [
    { label: lang==="en"?"Mortgage":lang==="ru"?"Ипотека":"Іпотека", value: monthlyMortgage, color: "#2D73E3" },
    { label: lang==="en"?"Property tax":lang==="ru"?"Налог":"Податок", value: monthlyTax, color: "#7099d6" },
    { label: lang==="en"?"Maintenance":lang==="ru"?"Обслуживание":"Утримання", value: monthlyMaintenance, color: "#9bb5e0" },
    { label: lang==="en"?"Management":lang==="ru"?"Управление":"Управління", value: monthlyMgmt, color: "#b8cce8" },
  ];

  return (
    <div className="space-y-8">
      <div className="grid gap-6 md:grid-cols-2">
        <div className="space-y-5 rounded-2xl border border-[#2a2a2a] bg-[#1f1f1f] p-6">
          <NInput label={lbl.price} value={price} onChange={setPrice} prefix="$" step={10000} />
          <NInput label={lbl.down} value={downPct} onChange={setDownPct} suffix="%" step={1} min={20} max={50}
            note={`${C(down)} — min 20% for investment`} />
          <NInput label={lbl.rate} value={rate} onChange={setRate} suffix="%" step={0.05} min={0.5} max={20} />
          <SelectGroup options={[{value:20,label:"20р"},{value:25,label:"25р"},{value:30,label:"30р"}]} value={amort} onChange={setAmort} />
          <NInput label={lbl.rent} value={rent} onChange={setRent} prefix="$" step={50} />
          <NInput label={lbl.vacancy} value={vacancy} onChange={setVacancy} suffix="%" step={1} min={0} max={30} />
          <NInput label={lbl.tax} value={propTax} onChange={setPropTax} prefix="$" step={100} />
          <NInput label={lbl.maint} value={maintenance} onChange={setMaintenance} suffix="%" step={0.1} min={0} max={5} />
          <NInput label={lbl.mgmt} value={mgmt} onChange={setMgmt} suffix="%" step={1} min={0} max={15} />
        </div>

        <div className="space-y-4">
          <Card label={lbl.flow} value={C(cashFlow)} color={isPositive?"green":"red"}
            sub={`${lang==="en"?"Effective rent":lang==="ru"?"Эффект. аренда":"Ефект. оренда"}: ${C(effectiveRent)}/mo`} />
          <div className="grid grid-cols-3 gap-3">
            <Card label={lbl.capRate} value={`${capRate.toFixed(2)}%`} color={capRate>=4?"blue":"neutral"} />
            <Card label={lbl.coc} value={`${cashOnCash.toFixed(2)}%`} color={cashOnCash>=5?"blue":"neutral"} />
            <Card label={lbl.grm} value={grm.toFixed(1)} />
          </div>
          <Card label={lbl.breakeven} value={C(breakEvenRent)} sub={lang==="en"?"Minimum rent to break even":lang==="ru"?"Мин. аренда для безубыточности":"Мін. оренда для беззбитковості"} color="gold" />

          {/* Expense waterfall */}
          <div className="rounded-xl border border-[#2a2a2a] bg-[#1f1f1f] p-4">
            <p className="mb-3 text-xs font-bold uppercase tracking-wider text-[#6b6b6b]">
              {lang==="en"?"Monthly expenses breakdown":lang==="ru"?"Разбивка расходов":"Розбивка витрат"}
            </p>
            <div className="space-y-2">
              {expenseItems.map(e => (
                <div key={e.label} className="flex items-center gap-3">
                  <span className="w-24 text-xs text-[#a3a3a3]">{e.label}</span>
                  <div className="flex-1 overflow-hidden rounded-full bg-[#2a2a2a]" style={{height:6}}>
                    <div className="h-full rounded-full" style={{width:`${Math.min(100,(e.value/totalExpenses)*100)}%`,backgroundColor:e.color}} />
                  </div>
                  <span className="w-20 text-right text-xs font-bold text-white">{C(e.value)}</span>
                </div>
              ))}
              <div className="mt-2 flex items-center justify-between border-t border-[#2a2a2a] pt-2">
                <span className="text-xs font-bold text-[#6b6b6b]">{lang==="en"?"Total":lang==="ru"?"Итого":"Всього"}</span>
                <span className="text-sm font-bold text-white">{C(totalExpenses)}</span>
              </div>
            </div>
          </div>

          {/* Insight */}
          <div className={`rounded-xl border p-4 text-sm leading-relaxed ${isPositive?"border-green-500/30 bg-green-500/5 text-green-400":"border-red-500/30 bg-red-500/5 text-red-400"}`}>
            {isPositive
              ? (lang==="en" ? `✅ Positive cash flow of ${C(cashFlow)}/month. Annual: ${C(cashFlow*12)}.`
                : lang==="ru" ? `✅ Положительный cashflow ${C(cashFlow)}/мес. Год: ${C(cashFlow*12)}.`
                : `✅ Позитивний cashflow ${C(cashFlow)}/міс. Рік: ${C(cashFlow*12)}.`)
              : (lang==="en" ? `⚠️ Negative cash flow ${C(cashFlow)}/month. You need ${C(breakEvenRent - rent)} more in rent.`
                : lang==="ru" ? `⚠️ Отрицательный cashflow ${C(cashFlow)}/мес. Нужно ещё ${C(breakEvenRent-rent)} аренды.`
                : `⚠️ Негативний cashflow ${C(cashFlow)}/міс. Потрібно ще ${C(breakEvenRent-rent)} оренди.`)}
          </div>
        </div>
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// MODE 2: HELOC
// ─────────────────────────────────────────────────────────────────────────────
function ModeHELOC({ lang }) {
  const [homeValue, setHomeValue] = useState(800000);
  const [mortgageBalance, setMortgageBalance] = useState(420000);
  const [helocRate, setHelocRate] = useState(6.7);
  const [investRate, setInvestRate] = useState(9.0);
  const [borrowAmount, setBorrowAmount] = useState(50000);

  // HELOC limit: min(home * 80% - mortgage, home * 65%)
  const maxHeloc80 = homeValue * 0.80 - mortgageBalance;
  const maxHeloc65 = homeValue * 0.65;
  const availableHeloc = Math.max(0, Math.min(maxHeloc80, maxHeloc65));

  const monthlyInterest = borrowAmount * helocRate / 100 / 12;

  // Arbitrage: borrow at HELOC rate, invest at investRate
  const annualBorrowCost = borrowAmount * helocRate / 100;
  const annualInvestReturn = borrowAmount * investRate / 100;
  const annualSpread = annualInvestReturn - annualBorrowCost;
  const spreadPct = (annualSpread / borrowAmount) * 100;

  const equity = homeValue - mortgageBalance;
  const ltvCombined = (mortgageBalance + borrowAmount) / homeValue * 100;

  const lbl = {
    uk: { home:"Оціночна вартість будинку", mortgage:"Залишок іпотеки", helocRate:"Ставка HELOC (prime+)", invest:"Очікувана дохідність інвестиції", borrow:"Сума позики HELOC", available:"Доступний HELOC", equity:"Власний капітал", interest:"Відсотки/місяць", arbitrage:"Арбітраж (річний)", ltv:"Комбінований LTV" },
    ru: { home:"Оценочная стоимость дома", mortgage:"Остаток ипотеки", helocRate:"Ставка HELOC (prime+)", invest:"Ожидаемая доходность", borrow:"Сумма займа HELOC", available:"Доступный HELOC", equity:"Собственный капитал", interest:"Проценты/месяц", arbitrage:"Арбитраж (годовой)", ltv:"Комбинированный LTV" },
    en: { home:"Appraised home value", mortgage:"Outstanding mortgage", helocRate:"HELOC rate (prime+)", invest:"Expected investment return", borrow:"HELOC borrow amount", available:"Available HELOC", equity:"Home equity", interest:"Monthly interest", arbitrage:"Annual arbitrage", ltv:"Combined LTV" },
  }[lang];

  const safeToInvest = ltvCombined <= 80 && borrowAmount <= availableHeloc;

  return (
    <div className="space-y-8">
      <div className="grid gap-6 md:grid-cols-2">
        <div className="space-y-5 rounded-2xl border border-[#2a2a2a] bg-[#1f1f1f] p-6">
          <NInput label={lbl.home} value={homeValue} onChange={setHomeValue} prefix="$" step={10000} />
          <NInput label={lbl.mortgage} value={mortgageBalance} onChange={setMortgageBalance} prefix="$" step={5000} />
          <NInput label={lbl.helocRate} value={helocRate} onChange={setHelocRate} suffix="%" step={0.05} min={1} max={20} />
          <div className="border-t border-[#2a2a2a] pt-4">
            <p className="mb-3 text-xs font-bold uppercase tracking-wider text-[#FFB627]">
              {lang==="en"?"Investment Arbitrage Scenario":lang==="ru"?"Сценарий арбитража":"Сценарій арбітражу"}
            </p>
            <NInput label={lbl.invest} value={investRate} onChange={setInvestRate} suffix="%" step={0.5} min={1} max={20} />
            <div className="mt-4">
              <NInput label={lbl.borrow} value={borrowAmount} onChange={setBorrowAmount} prefix="$" step={5000} max={availableHeloc}
                note={`max ${C(availableHeloc)}`} />
            </div>
          </div>
        </div>

        <div className="space-y-4">
          <Card label={lbl.available} value={C(availableHeloc)} color="blue"
            sub={`${lang==="en"?"Combined rule":lang==="ru"?"Правило":"Правило"}: min(80% - mortgage, 65% of value)`} />
          <div className="grid grid-cols-2 gap-3">
            <Card label={lbl.equity} value={C(equity)} color="neutral" sub={`${((equity/homeValue)*100).toFixed(1)}%`} />
            <Card label={lbl.ltv} value={`${ltvCombined.toFixed(1)}%`} color={ltvCombined>80?"red":"green"} sub={lang==="en"?"Combined LTV":lang==="ru"?"Комб. LTV":"Комб. LTV"} />
          </div>
          <Card label={lbl.interest} value={C(monthlyInterest)} sub={lang==="en"?"Interest-only on HELOC":lang==="ru"?"Только проценты":"Тільки відсотки"} color="gold" />

          {/* Arbitrage result */}
          <div className={`rounded-xl border p-5 ${safeToInvest && annualSpread > 0 ? "border-green-500/30 bg-green-500/5" : "border-[#FFB627]/30 bg-[#FFB627]/5"}`}>
            <p className="text-xs font-bold uppercase tracking-wider text-[#FFB627]">{lbl.arbitrage}</p>
            <div className="mt-3 grid grid-cols-3 gap-3">
              <div>
                <p className="text-xs text-[#6b6b6b]">{lang==="en"?"Borrow cost":lang==="ru"?"Стоимость":"Вартість"}</p>
                <p className="text-lg font-bold text-red-400">{C(annualBorrowCost)}</p>
              </div>
              <div>
                <p className="text-xs text-[#6b6b6b]">{lang==="en"?"Return":lang==="ru"?"Доход":"Дохід"}</p>
                <p className="text-lg font-bold text-green-400">{C(annualInvestReturn)}</p>
              </div>
              <div>
                <p className="text-xs text-[#6b6b6b]">{lang==="en"?"Net spread":lang==="ru"?"Спред":"Спред"}</p>
                <p className={`text-lg font-bold ${annualSpread>0?"text-green-400":"text-red-400"}`}>{C(annualSpread)}</p>
              </div>
            </div>
            <p className="mt-3 text-xs text-[#6b6b6b]">
              {annualSpread > 0
                ? (lang==="en" ? `✅ ${P(spreadPct)} net annual spread on ${C(borrowAmount)} borrowed. Strategy works if investment returns hold.`
                  : lang==="ru" ? `✅ Чистый спред ${P(spreadPct)} на ${C(borrowAmount)}. Стратегия работает при условии стабильной доходности.`
                  : `✅ Чистий спред ${P(spreadPct)} на ${C(borrowAmount)}. Стратегія працює при стабільній дохідності.`)
                : (lang==="en" ? `⚠️ Negative spread — investment return doesn't cover HELOC cost.`
                  : lang==="ru" ? `⚠️ Отрицательный спред — доходность не покрывает стоимость HELOC.`
                  : `⚠️ Від'ємний спред — дохідність не покриває вартість HELOC.`)}
            </p>
          </div>

          <div className="rounded-xl border border-[#2a2a2a] bg-[#191919] p-4 text-xs text-[#6b6b6b] leading-relaxed">
            🇨🇦 {lang==="en"
              ? "Canadian HELOC rules: max 80% combined LTV (mortgage + HELOC), max HELOC = 65% of home value. Rate = prime + spread."
              : lang==="ru"
              ? "Правила HELOC в Канаде: макс. 80% LTV (ипотека + HELOC), HELOC ≤ 65% от стоимости. Ставка = prime + спред."
              : "HELOC в Канаді: макс. 80% LTV (іпотека + HELOC), HELOC ≤ 65% вартості. Ставка = prime + спред."}
          </div>
        </div>
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// MODE 3: EARLY PAYOFF
// ─────────────────────────────────────────────────────────────────────────────
function ModeEarlyPayoff({ lang }) {
  const [balance, setBalance] = useState(350000);
  const [rate, setRate] = useState(4.5);
  const [remainingYears, setRemainingYears] = useState(22);
  const [extra, setExtra] = useState(500);
  const [lumpSum, setLumpSum] = useState(20000);

  const base = useMemo(() => buildSchedule(balance, rate, remainingYears), [balance, rate, remainingYears]);
  const withExtra = useMemo(() => buildSchedule(balance, rate, remainingYears, extra), [balance, rate, remainingYears, extra]);
  const withLump = useMemo(() => {
    const newBal = Math.max(0, balance - lumpSum);
    return buildSchedule(newBal, rate, remainingYears);
  }, [balance, rate, remainingYears, lumpSum]);

  // Accelerated bi-weekly
  const baseMonthly = calcPayment(balance, rate, remainingYears);
  const accelBiWeeklyPmt = baseMonthly / 2;
  const accelMonthlyEquiv = accelBiWeeklyPmt * 26 / 12;
  const withAccel = useMemo(() => buildSchedule(balance, rate, remainingYears, accelMonthlyEquiv - baseMonthly), [balance, rate, remainingYears, accelMonthlyEquiv, baseMonthly]);

  const lbl = {
    uk: { balance:"Залишок іпотеки", rate:"Ставка", years:"Залишилося років", extra:"Доплата/місяць", lump:"Разова виплата", base:"Базовий план", extraPlan:"Доплата щомісяця", accel:"Bi-weekly прискорений", lumpPlan:"Разова виплата", saved:"Зекономлено", timeSaved:"Часу зекономлено" },
    ru: { balance:"Остаток ипотеки", rate:"Ставка", years:"Осталось лет", extra:"Доплата/месяц", lump:"Разовая выплата", base:"Базовый план", extraPlan:"Доплата ежемесячно", accel:"Bi-weekly ускоренный", lumpPlan:"Разовая выплата", saved:"Сэкономлено", timeSaved:"Времени сэкономлено" },
    en: { balance:"Mortgage balance", rate:"Rate", years:"Years remaining", extra:"Extra/month", lump:"Lump sum payment", base:"Base plan", extraPlan:"Extra monthly", accel:"Accelerated bi-weekly", lumpPlan:"Lump sum", saved:"Interest saved", timeSaved:"Time saved" },
  }[lang];

  const scenarios = [
    { label: lbl.base, data: base, color: "#6b6b6b", months: base.months, interest: base.totalInterest },
    { label: lbl.extraPlan, data: withExtra, color: "#2D73E3", months: withExtra.months, interest: withExtra.totalInterest, savings: base.totalInterest - withExtra.totalInterest, timeSaved: base.months - withExtra.months },
    { label: lbl.accel, data: withAccel, color: "#7099d6", months: withAccel.months, interest: withAccel.totalInterest, savings: base.totalInterest - withAccel.totalInterest, timeSaved: base.months - withAccel.months },
    { label: lbl.lumpPlan, data: withLump, color: "#FFB627", months: withLump.months, interest: withLump.totalInterest, savings: base.totalInterest - withLump.totalInterest, timeSaved: base.months - withLump.months },
  ];

  // Build combined chart data
  const maxYears = Math.ceil(base.months / 12) + 1;
  const chartData = useMemo(() => {
    const d = [];
    for (let y = 0; y <= maxYears; y++) {
      const row = { year: y };
      scenarios.forEach((s, i) => {
        const point = s.data.data.find(p => p.year === y);
        row[`s${i}`] = point ? point.balance : y * 12 > s.data.months ? 0 : undefined;
      });
      d.push(row);
    }
    return d;
  }, [base, withExtra, withAccel, withLump]);

  return (
    <div className="space-y-8">
      <div className="grid gap-6 md:grid-cols-2">
        <div className="space-y-5 rounded-2xl border border-[#2a2a2a] bg-[#1f1f1f] p-6">
          <NInput label={lbl.balance} value={balance} onChange={setBalance} prefix="$" step={5000} />
          <NInput label={lbl.rate} value={rate} onChange={setRate} suffix="%" step={0.05} min={0.5} max={20} />
          <NInput label={lbl.years} value={remainingYears} onChange={setRemainingYears} step={1} min={1} max={30} />
          <div className="border-t border-[#2a2a2a] pt-4">
            <p className="mb-4 text-xs font-bold uppercase tracking-wider text-[#2D73E3]">
              {lang==="en"?"Scenarios":lang==="ru"?"Сценарии":"Сценарії"}
            </p>
            <NInput label={lbl.extra} value={extra} onChange={setExtra} prefix="$" step={100} min={0} />
            <div className="mt-4">
              <NInput label={lbl.lump} value={lumpSum} onChange={setLumpSum} prefix="$" step={5000} max={balance} />
            </div>
          </div>
        </div>

        <div className="space-y-3">
          {scenarios.map((s, i) => (
            <div key={i} className={`rounded-xl border p-4 ${i===0?"border-[#2a2a2a] bg-[#1f1f1f]":"border-[#2a2a2a] bg-[#1f1f1f] hover:border-[#2D73E3]/30 transition-colors"}`}>
              <div className="flex items-center gap-2 mb-3">
                <span className="h-3 w-3 rounded-full flex-shrink-0" style={{backgroundColor:s.color}} />
                <span className="font-bold text-white text-sm">{s.label}</span>
              </div>
              <div className="grid grid-cols-3 gap-3">
                <div>
                  <p className="text-xs text-[#6b6b6b]">{lang==="en"?"Payoff":lang==="ru"?"Погашение":"Погашення"}</p>
                  <p className="text-sm font-bold text-white">{YM(s.months)}</p>
                </div>
                <div>
                  <p className="text-xs text-[#6b6b6b]">{lang==="en"?"Total interest":lang==="ru"?"Проценты":"Відсотки"}</p>
                  <p className="text-sm font-bold text-white">{C(s.interest)}</p>
                </div>
                {s.savings !== undefined && (
                  <div>
                    <p className="text-xs text-green-400">{lbl.saved}</p>
                    <p className="text-sm font-bold text-green-400">{C(s.savings)}</p>
                  </div>
                )}
              </div>
              {s.timeSaved > 0 && (
                <p className="mt-2 text-xs text-green-400">
                  ⚡ {lbl.timeSaved}: {YM(s.timeSaved)}
                </p>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Combined chart */}
      <div className="rounded-2xl border border-[#2a2a2a] bg-[#1f1f1f] p-5">
        <p className="mb-4 text-sm font-bold uppercase tracking-wider text-[#6b6b6b]">
          {lang==="en"?"Balance comparison":lang==="ru"?"Сравнение остатков":"Порівняння залишків"}
        </p>
        <div className="h-[280px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={chartData} margin={{top:5,right:20,left:10,bottom:5}}>
              <CartesianGrid strokeDasharray="3 3" stroke="#2a2a2a" />
              <XAxis dataKey="year" stroke="#6b6b6b" style={{fontSize:11}} />
              <YAxis stroke="#6b6b6b" style={{fontSize:11}} tickFormatter={v=>`$${(v/1000).toFixed(0)}K`} />
              <Tooltip contentStyle={{backgroundColor:"#1f1f1f",border:"1px solid #2D73E3",borderRadius:8,color:"#fff"}} formatter={v=>C(v)} />
              <Legend wrapperStyle={{fontSize:11,paddingTop:12}} />
              {scenarios.map((s,i) => (
                <Line key={i} type="monotone" dataKey={`s${i}`} name={s.label} stroke={s.color}
                  strokeWidth={i===0?2:3} dot={false} connectNulls={false} />
              ))}
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// MODE 4: LENDER SWITCH
// ─────────────────────────────────────────────────────────────────────────────
function ModeLenderSwitch({ lang }) {
  const [balance, setBalance] = useState(380000);
  const [currentRate, setCurrentRate] = useState(5.5);
  const [remainingMonths, setRemainingMonths] = useState(36);
  const [newRate, setNewRate] = useState(4.0);
  const [postedRate, setPostedRate] = useState(6.0);
  const [amort, setAmort] = useState(22);

  // Penalties
  const threeMonthInt = balance * (currentRate / 100) / 12 * 3;
  const irdDiff = Math.max(0, currentRate - postedRate) / 100;
  const irdPenalty = balance * irdDiff * (remainingMonths / 12);
  const penalty = Math.max(threeMonthInt, irdPenalty);
  const penaltyType = irdPenalty >= threeMonthInt ? "IRD" : "3-month";

  // Monthly savings
  const oldPayment = calcPayment(balance, currentRate, amort);
  const newPayment = calcPayment(balance, newRate, amort);
  const monthlySavings = oldPayment - newPayment;

  // Break-even
  const breakEvenMonths = monthlySavings > 0 ? penalty / monthlySavings : Infinity;
  const worthIt = isFinite(breakEvenMonths) && breakEvenMonths < remainingMonths;

  const lbl = {
    uk: { balance:"Залишок", curRate:"Поточна ставка", months:"Залишилося місяців у терміні", newRate:"Нова ставка (пропозиція)", posted:"Posted rate банку для залишку терміну", amort:"Залишок амортизації (роки)", penalty:"Штраф за розрив", threeM:"3-місячні відсотки", ird:"IRD штраф", type:"Тип штрафу", savings:"Економія/місяць", breakeven:"Break-even місяців", verdict:"Висновок" },
    ru: { balance:"Остаток", curRate:"Текущая ставка", months:"Осталось месяцев в сроке", newRate:"Новая ставка (предложение)", posted:"Posted rate банка для остатка срока", amort:"Остаток амортизации (лет)", penalty:"Штраф за разрыв", threeM:"3-месячные проценты", ird:"IRD штраф", type:"Тип штрафа", savings:"Экономия/месяц", breakeven:"Break-even месяцев", verdict:"Вывод" },
    en: { balance:"Balance", curRate:"Current rate", months:"Months remaining in term", newRate:"New rate (offer)", posted:"Bank's posted rate for remaining term", amort:"Remaining amortization (yrs)", penalty:"Break penalty", threeM:"3-month interest", ird:"IRD penalty", type:"Penalty type", savings:"Monthly savings", breakeven:"Break-even months", verdict:"Verdict" },
  }[lang];

  return (
    <div className="space-y-8">
      <div className="grid gap-6 md:grid-cols-2">
        <div className="space-y-5 rounded-2xl border border-[#2a2a2a] bg-[#1f1f1f] p-6">
          <NInput label={lbl.balance} value={balance} onChange={setBalance} prefix="$" step={5000} />
          <NInput label={lbl.curRate} value={currentRate} onChange={setCurrentRate} suffix="%" step={0.05} min={0.5} max={20} />
          <NInput label={lbl.months} value={remainingMonths} onChange={setRemainingMonths} step={1} min={1} max={60} />
          <div className="border-t border-[#2a2a2a] pt-4">
            <p className="mb-4 text-xs font-bold uppercase tracking-wider text-[#2D73E3]">
              {lang==="en"?"New offer":lang==="ru"?"Новое предложение":"Нова пропозиція"}
            </p>
            <NInput label={lbl.newRate} value={newRate} onChange={setNewRate} suffix="%" step={0.05} min={0.5} max={20} />
            <div className="mt-4">
              <NInput label={lbl.posted} value={postedRate} onChange={setPostedRate} suffix="%" step={0.05} min={0.5} max={20}
                note={lang==="en"?"Ask your bank":lang==="ru"?"Спросите у банка":"Запитайте у банку"} />
            </div>
          </div>
          <NInput label={lbl.amort} value={amort} onChange={setAmort} step={1} min={1} max={30} />
        </div>

        <div className="space-y-4">
          {/* Penalty comparison */}
          <div className="rounded-xl border border-[#2a2a2a] bg-[#1f1f1f] p-5">
            <p className="mb-3 text-xs font-bold uppercase tracking-wider text-[#6b6b6b]">
              {lang==="en"?"Penalty calculation":lang==="ru"?"Расчёт штрафа":"Розрахунок штрафу"}
            </p>
            <div className="grid grid-cols-2 gap-3">
              <div className={`rounded-lg border p-3 ${penaltyType!=="IRD"?"border-[#2a2a2a]":"border-red-500/40 bg-red-500/5"}`}>
                <p className="text-xs text-[#6b6b6b]">{lbl.ird}</p>
                <p className={`text-xl font-bold ${penaltyType==="IRD"?"text-red-400":"text-white"}`}>{C(irdPenalty)}</p>
              </div>
              <div className={`rounded-lg border p-3 ${penaltyType!=="3-month"?"border-[#2a2a2a]":"border-red-500/40 bg-red-500/5"}`}>
                <p className="text-xs text-[#6b6b6b]">{lbl.threeM}</p>
                <p className={`text-xl font-bold ${penaltyType==="3-month"?"text-red-400":"text-white"}`}>{C(threeMonthInt)}</p>
              </div>
            </div>
            <div className="mt-3 flex items-center justify-between rounded-lg bg-[#191919] p-3">
              <span className="text-xs text-[#6b6b6b]">{lbl.penalty} ({lbl.type}: {penaltyType})</span>
              <span className="font-bold text-red-400">{C(penalty)}</span>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <Card label={lbl.savings} value={C(monthlySavings)} color={monthlySavings>0?"green":"red"} sub={`${lang==="en"?"Per year":lang==="ru"?"В год":"На рік"}: ${C(monthlySavings*12)}`} />
            <Card label={lbl.breakeven} value={isFinite(breakEvenMonths)?`${Math.ceil(breakEvenMonths)} мес`:"∞"} color={worthIt?"green":"gold"} />
          </div>

          {/* Verdict */}
          <div className={`rounded-xl border p-5 ${worthIt?"border-green-500/30 bg-green-500/5":"border-red-500/30 bg-red-500/5"}`}>
            <p className={`text-sm font-bold ${worthIt?"text-green-400":"text-red-400"}`}>
              {worthIt ? "✅" : "⚠️"} {lbl.verdict}
            </p>
            <p className="mt-2 text-sm text-[#a3a3a3]">
              {worthIt
                ? (lang==="en"
                  ? `Worth switching. You'll recoup the ${C(penalty)} penalty in ${Math.ceil(breakEvenMonths)} months. With ${remainingMonths} months left in term, you save ${C(monthlySavings*(remainingMonths-Math.ceil(breakEvenMonths)))} net.`
                  : lang==="ru"
                  ? `Стоит менять. Штраф ${C(penalty)} окупится за ${Math.ceil(breakEvenMonths)} мес. С ${remainingMonths} мес. в сроке — чистая экономия ${C(monthlySavings*(remainingMonths-Math.ceil(breakEvenMonths)))}.`
                  : `Варто переходити. Штраф ${C(penalty)} окупиться за ${Math.ceil(breakEvenMonths)} міс. При ${remainingMonths} міс. у терміні — чиста економія ${C(monthlySavings*(remainingMonths-Math.ceil(breakEvenMonths)))}.`)
                : (lang==="en"
                  ? `Not worth breaking now. Break-even (${Math.ceil(breakEvenMonths)} months) exceeds remaining term (${remainingMonths} months). Wait for renewal.`
                  : lang==="ru"
                  ? `Не стоит разрывать сейчас. Break-even (${Math.ceil(breakEvenMonths)} мес.) превышает остаток срока (${remainingMonths} мес.). Ждите обновления.`
                  : `Не варто розривати зараз. Break-even (${Math.ceil(breakEvenMonths)} міс.) перевищує залишок терміну (${remainingMonths} міс.). Чекайте на renewal.`)}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// MODE 5: AFFORDABILITY (reverse calculator)
// ─────────────────────────────────────────────────────────────────────────────
function ModeAffordability({ lang }) {
  const [grossIncome, setGrossIncome] = useState(120000);
  const [downPayment, setDownPayment] = useState(80000);
  const [rate, setRate] = useState(4.5);
  const [amort, setAmort] = useState(25);
  const [propTax, setPropTax] = useState(4500);
  const [heating, setHeating] = useState(150);

  const sRate = stressRate(rate);

  // Max monthly PITH at GDS 39%
  const maxMonthlyPITH = (grossIncome / 12) * 0.39;
  const maxPayment = maxMonthlyPITH - propTax / 12 - heating;

  // Max qualifying mortgage at stress test rate
  const r = sRate / 100 / 12;
  const n = amort * 12;
  const maxMortgage = maxPayment > 0
    ? maxPayment * (Math.pow(1 + r, n) - 1) / (r * Math.pow(1 + r, n))
    : 0;
  const maxPrice = maxMortgage + downPayment;

  // Actual payment at contract rate
  const actualPayment = calcPayment(maxMortgage, rate, amort);

  // Check CMHC eligibility
  const cmhcData = cmhc(maxPrice, downPayment);
  const needsCMHC = cmhcData.pct !== null && cmhcData.pct > 0;
  const totalMortgage = needsCMHC ? maxMortgage + cmhcData.premium : maxMortgage;

  // Rate sensitivity table
  const rateTable = [3.0, 3.5, 4.0, 4.5, 5.0, 5.5, 6.0].map(r => {
    const sr = stressRate(r);
    const rMo = sr / 100 / 12;
    const mPmt = maxPayment;
    const maxM = mPmt > 0 ? mPmt * (Math.pow(1+rMo,n)-1) / (rMo * Math.pow(1+rMo,n)) : 0;
    return { rate: r, maxPrice: Math.round(maxM + downPayment), maxMortgage: Math.round(maxM) };
  });

  const lbl = {
    uk: { income:"Валовий дохід/рік", down:"Перший внесок", rate:"Ставка", amort:"Амортизація (роки)", tax:"Податок/рік", heat:"Опалення/місяць", maxPrice:"Максимальна ціна покупки", maxMortgage:"Максимальна іпотека", payment:"Реальний платіж/місяць", stressNote:"Кваліфікація за стрес-тест", table:"Залежність від ставки" },
    ru: { income:"Валовой доход/год", down:"Первый взнос", rate:"Ставка", amort:"Амортизация (лет)", tax:"Налог/год", heat:"Отопление/месяц", maxPrice:"Максимальная цена покупки", maxMortgage:"Максимальная ипотека", payment:"Реальный платёж/месяц", stressNote:"Квалификация по стресс-тесту", table:"Зависимость от ставки" },
    en: { income:"Gross income/year", down:"Down payment", rate:"Rate", amort:"Amortization (yrs)", tax:"Property tax/yr", heat:"Heating/month", maxPrice:"Max purchase price", maxMortgage:"Max mortgage", payment:"Actual payment/month", stressNote:"Qualifying at stress test rate", table:"Rate sensitivity" },
  }[lang];

  return (
    <div className="space-y-8">
      <div className="grid gap-6 md:grid-cols-2">
        <div className="space-y-5 rounded-2xl border border-[#2a2a2a] bg-[#1f1f1f] p-6">
          <NInput label={lbl.income} value={grossIncome} onChange={setGrossIncome} prefix="$" step={5000} />
          <NInput label={lbl.down} value={downPayment} onChange={setDownPayment} prefix="$" step={5000} />
          <NInput label={lbl.rate} value={rate} onChange={setRate} suffix="%" step={0.05} min={0.5} max={12} />
          <SelectGroup options={[{value:20,label:"20р"},{value:25,label:"25р"},{value:30,label:"30р"}]} value={amort} onChange={setAmort} />
          <NInput label={lbl.tax} value={propTax} onChange={setPropTax} prefix="$" step={100} />
          <NInput label={lbl.heat} value={heating} onChange={setHeating} prefix="$" step={25} />
        </div>

        <div className="space-y-4">
          <Card label={lbl.maxPrice} value={C(maxPrice)} color="blue"
            sub={`${lang==="en"?"Down payment":lang==="ru"?"Взнос":"Внесок"}: ${C(downPayment)} (${((downPayment/maxPrice)*100).toFixed(1)}%)`} />
          <div className="grid grid-cols-2 gap-3">
            <Card label={lbl.maxMortgage} value={C(maxMortgage)} />
            <Card label={lbl.payment} value={C(actualPayment)} color="green" sub={`@ ${P(rate)}`} />
          </div>

          {needsCMHC && (
            <div className="rounded-xl border border-[#FFB627]/30 bg-[#FFB627]/5 p-4">
              <p className="text-xs font-bold uppercase tracking-wider text-[#FFB627]">CMHC</p>
              <p className="mt-1 text-sm text-[#a3a3a3]">
                {lang==="en"
                  ? `Down payment < 20% → CMHC insurance ${C(cmhcData.premium)} (${P(cmhcData.pct * 100)} of mortgage) added to mortgage.`
                  : lang==="ru"
                  ? `Взнос < 20% → страховка CMHC ${C(cmhcData.premium)} (${P(cmhcData.pct*100)} от ипотеки) добавляется к ипотеке.`
                  : `Внесок < 20% → страховка CMHC ${C(cmhcData.premium)} (${P(cmhcData.pct*100)} від іпотеки) додається до іпотеки.`}
              </p>
            </div>
          )}

          <div className="rounded-xl border border-[#2a2a2a] bg-[#191919] p-4 text-xs text-[#6b6b6b]">
            {lbl.stressNote}: {P(sRate)} | GDS ≤ 39% | {lang==="en"?"Based on":"На основі"} ${(grossIncome/12).toFixed(0)}/mo
          </div>
        </div>
      </div>

      {/* Rate sensitivity table */}
      <div className="rounded-2xl border border-[#2a2a2a] overflow-hidden">
        <div className="bg-[#1a1a1a] px-5 py-3">
          <p className="text-xs font-bold uppercase tracking-wider text-[#6b6b6b]">{lbl.table}</p>
        </div>
        <table className="w-full">
          <thead className="bg-[#161616]">
            <tr>
              <th className="px-5 py-3 text-left text-xs font-bold uppercase tracking-wider text-[#6b6b6b]">
                {lang==="en"?"Rate":lang==="ru"?"Ставка":"Ставка"}
              </th>
              <th className="px-5 py-3 text-left text-xs font-bold uppercase tracking-wider text-[#6b6b6b]">
                {lang==="en"?"Stress test":lang==="ru"?"Стресс-тест":"Стрес-тест"}
              </th>
              <th className="px-5 py-3 text-right text-xs font-bold uppercase tracking-wider text-[#6b6b6b]">
                {lang==="en"?"Max price":lang==="ru"?"Макс. цена":"Макс. ціна"}
              </th>
              <th className="px-5 py-3 text-right text-xs font-bold uppercase tracking-wider text-[#6b6b6b]">
                {lang==="en"?"Max mortgage":lang==="ru"?"Макс. ипотека":"Макс. іпотека"}
              </th>
            </tr>
          </thead>
          <tbody>
            {rateTable.map(row => {
              const isCurrent = Math.abs(row.rate - rate) < 0.01;
              return (
                <tr key={row.rate} className={`border-t border-[#1f1f1f] ${isCurrent?"bg-[#2D73E3]/5":""}`}>
                  <td className="px-5 py-3">
                    <span className={`font-bold ${isCurrent?"text-[#2D73E3]":"text-white"}`}>{P(row.rate)}</span>
                    {isCurrent && <span className="ml-2 text-[9px] font-bold uppercase text-[#2D73E3]">
                      {lang==="en"?"current":lang==="ru"?"текущая":"поточна"}
                    </span>}
                  </td>
                  <td className="px-5 py-3 text-[#6b6b6b] text-sm">{P(stressRate(row.rate))}</td>
                  <td className="px-5 py-3 text-right font-bold text-white">{C(row.maxPrice)}</td>
                  <td className="px-5 py-3 text-right text-sm text-[#a3a3a3]">{C(row.maxMortgage)}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// MAIN PAGE
// ─────────────────────────────────────────────────────────────────────────────
const MODES = [
  { icon: Home, component: ModeResidence },
  { icon: Building2, component: ModeInvestment },
  { icon: CreditCard, component: ModeHELOC },
  { icon: Zap, component: ModeEarlyPayoff },
  { icon: RefreshCw, component: ModeLenderSwitch },
  { icon: Star, component: ModeAffordability },
];

export default function MortgageCalculator() {
  const [lang, setLang] = useState("uk");
  const [activeMode, setActiveMode] = useState(0);

  useEffect(() => {
    const saved = typeof window !== "undefined" ? localStorage.getItem("skyfort-lang") : null;
    if (saved && T[saved]) setLang(saved);
  }, []);

  const handleSetLang = (l) => {
    setLang(l);
    if (typeof window !== "undefined") localStorage.setItem("skyfort-lang", l);
  };

  const t = T[lang];
  const ActiveComponent = MODES[activeMode].component;

  return (
    <main className="min-h-screen bg-[#191919] text-white antialiased">
      {/* NAV */}
      <nav className="fixed inset-x-0 top-0 z-50 border-b border-[#2a2a2a] bg-[#191919]/80 backdrop-blur-xl">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
          <Link href="/" aria-label="SkyFort home"><Logo /></Link>
          <LangSwitcher lang={lang} setLang={handleSetLang} />
        </div>
      </nav>

      {/* BACK */}
      <div className="mx-auto max-w-6xl px-6 pt-28">
        <Link href="/" className="inline-flex items-center gap-2 text-sm font-bold uppercase tracking-wider text-[#a3a3a3] hover:text-[#2D73E3] transition-colors">
          <ArrowLeft className="h-4 w-4" />
          {t.back}
        </Link>
      </div>

      {/* HEADER */}
      <section className="relative overflow-hidden pt-12 pb-10">
        <div className="pointer-events-none absolute inset-0 -z-10">
          <div className="absolute -right-40 -top-32 h-[500px] w-[500px] rounded-full bg-[#2D73E3] opacity-[0.07] blur-3xl" />
          <div className="absolute -left-20 top-20 h-[300px] w-[300px] rounded-full bg-[#FFB627] opacity-[0.05] blur-3xl" />
        </div>
        <div className="mx-auto max-w-6xl px-6">
          <p className="mb-5 inline-flex items-center gap-2 text-[10px] font-bold uppercase tracking-[0.3em] text-[#2D73E3]">
            <Home className="h-3.5 w-3.5" />
            {t.kicker}
          </p>
          <h1 className="font-display-tight text-4xl text-white md:text-6xl">{t.title}</h1>
          <p className="mt-5 max-w-2xl text-base leading-relaxed text-[#a3a3a3] md:text-lg">{t.sub}</p>
        </div>
      </section>

      {/* MODE TABS */}
      <div className="sticky top-[65px] z-40 border-b border-[#2a2a2a] bg-[#191919]/95 backdrop-blur-xl">
        <div className="mx-auto max-w-6xl px-6">
          <div className="flex overflow-x-auto scrollbar-hide gap-0">
            {t.tabs.map((tab, i) => (
              <button
                key={i}
                onClick={() => setActiveMode(i)}
                className={`flex-shrink-0 px-4 py-4 text-xs font-bold uppercase tracking-wider border-b-2 transition-all whitespace-nowrap ${
                  activeMode === i
                    ? "border-[#2D73E3] text-white"
                    : "border-transparent text-[#6b6b6b] hover:text-[#a3a3a3]"
                }`}
              >
                {tab}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* ACTIVE MODE */}
      <section className="py-12">
        <div className="mx-auto max-w-6xl px-6">
          <ActiveComponent lang={lang} />
        </div>
      </section>

      {/* CTA */}
      <section className="relative overflow-hidden border-t border-[#2a2a2a] py-20 md:py-28">
        <div className="pointer-events-none absolute inset-0 -z-10">
          <div className="absolute left-1/2 top-1/2 h-[400px] w-[400px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#2D73E3] opacity-[0.07] blur-3xl" />
        </div>
        <div className="mx-auto max-w-3xl px-6 text-center">
          <h2 className="font-display-tight text-4xl text-white md:text-5xl">
            {lang==="en"?"Numbers are clear. Strategy is next."
             :lang==="ru"?"Цифры ясны. Теперь стратегия."
             :"Цифри зрозумілі. Далі — стратегія."}
          </h2>
          <p className="mx-auto mt-5 max-w-xl text-base text-[#a3a3a3]">{t.ctaSub}</p>
          <a href={CALENDLY} target="_blank" rel="noopener"
            className="group mt-8 inline-flex items-center gap-2 rounded-full bg-[#2D73E3] px-8 py-4 text-sm font-bold uppercase tracking-wider text-white hover:bg-[#4287ec] transition-all">
            {t.cta}
            <ArrowRight className="h-4 w-4 group-hover:translate-x-0.5 transition-transform" />
          </a>
        </div>
      </section>

      {/* DISCLAIMER */}
      <footer className="border-t border-[#2a2a2a] py-8">
        <div className="mx-auto max-w-3xl px-6">
          <p className="text-xs leading-relaxed text-[#6b6b6b]">{t.disclaimer}</p>
        </div>
      </footer>
    </main>
  );
}
