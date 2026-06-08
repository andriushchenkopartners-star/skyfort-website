"use client";

// app/[locale]/eligibility/quiz.tsx
// Eligible / Accredited Investor self-check (audit 3.3).
// 4-question quiz that maps NI 45-106 §1.1 financial thresholds to one of
// three preliminary tiers (Accredited / Eligible / Non-Eligible). The result
// is explicitly non-binding — formal categorisation only happens via KYC +
// Suitability Assessment with the registered DR. That framing is repeated
// in the intro disclaimer, in the result screen, and in the compliance line
// rendered at the bottom of every step.
//
// Why this lives on the site at all: the most common newcomer question is
// "am I even eligible to invest in private markets?" — answering it without
// a discovery call (a) lowers friction, (b) routes non-Eligible visitors
// straight to TFSA/RRSP/FHSA + calculators (where they actually belong),
// and (c) gives Eligible/Accredited visitors a calibrated next-step CTA.

import { useState } from "react";
import type { ElementType } from "react";
import Link from "next/link";
import {
  CheckCircle2,
  ArrowRight,
  ArrowLeft,
  RotateCcw,
  ShieldCheck,
  Trophy,
  Sparkles,
  BookOpen,
} from "lucide-react";
import { track } from "../../_lib/analytics";

const CALENDLY = "https://calendly.com/andriushchenko-partners/new-meeting";

// ─── Per-locale copy ────────────────────────────────────────────────────────
// All thresholds in CAD, taken verbatim from NI 45-106 §1.1. The wording
// stays neutral: "this counts toward / doesn't count toward" rather than
// "you are / aren't" — preserves the non-binding framing.

const COPY = {
  uk: {
    intro: {
      kicker: "Self-check",
      title: "Чи ти Eligible Investor?",
      sub: "4 питання · 60 секунд · попередня класифікація за NI 45-106 §1.1.",
      whyTitle: "Чому це не «остаточна відповідь»",
      whyText:
        "Це попередній self-check на основі фінансових порогів CSA NI 45-106. Формальна класифікація як Eligible / Accredited Investor підтверджується лише через KYC + Suitability Assessment із зареєстрованим Dealing Representative. Тут — освітня орієнтація, не legal opinion.",
      privacyNote:
        "Відповіді обробляються тільки у твоєму браузері — ніщо не передається на сервер.",
      start: "Почати",
    },
    nav: {
      back: "Назад",
      next: "Далі",
      finish: "Побачити результат",
      progress: (cur: number, total: number) => `Питання ${cur} з ${total}`,
      retake: "Пройти ще раз",
    },
    questions: [
      {
        id: "q1",
        q: "Твій особистий валовий дохід за останні 2 роки (і очікуваний у цьому році)?",
        hint: "Зарплата, business income, дивіденди, відсотки — усе до податків. Не сімейний.",
        options: [
          { value: "lt75k", label: "До $75K" },
          { value: "gt75kLte125k", label: "$75K – $125K" },
          { value: "gt125kLte200k", label: "$125K – $200K" },
          { value: "gt200kLte300k", label: "$200K – $300K" },
          { value: "over300k", label: "Понад $300K" },
        ],
      },
      {
        id: "q2",
        q: "Сімейний дохід (твій + чоловіка/дружини), останні 2 роки?",
        hint: "Якщо без шлюбу/партнера — обери «не застосовно».",
        options: [
          { value: "na", label: "Не застосовно (single)" },
          { value: "lt125k", label: "До $125K" },
          { value: "gt125kLte250k", label: "$125K – $250K" },
          { value: "gt250kLte300k", label: "$250K – $300K" },
          { value: "over300k", label: "Понад $300K" },
        ],
      },
      {
        id: "q3",
        q: "Чисті фінансові активи (готівка + інвестиції + securities), без основного житла?",
        hint: "Усе в TFSA, RRSP, brokerage, savings, GIC, exempt market — мінус борги по них. Дім сюди НЕ йде.",
        options: [
          { value: "lt100k", label: "До $100K" },
          { value: "gt100kLte400k", label: "$100K – $400K" },
          { value: "gt400kLte1m", label: "$400K – $1M" },
          { value: "over1m", label: "Понад $1M" },
        ],
      },
      {
        id: "q4",
        q: "Загальна чиста вартість (усе що володієш мінус усе що винен)?",
        hint: "Включаючи дім, авто, бізнес — мінус mortgage, кредити, інші борги.",
        options: [
          { value: "lt500k", label: "До $500K" },
          { value: "gt500kLte1m", label: "$500K – $1M" },
          { value: "gt1mLte5m", label: "$1M – $5M" },
          { value: "over5m", label: "Понад $5M" },
        ],
      },
    ],
    results: {
      accredited: {
        badge: "Accredited Investor",
        title: "Імовірно — Accredited Investor",
        oneLine:
          "За фінансовими тестами NI 45-106 ти, ймовірно, кваліфікуєшся як Accredited Investor — найвищий рівень доступу до exempt market.",
        whatItMeans:
          "Доступ до повного спектру exempt-market продуктів, включно з тими що недоступні Eligible Investors. Жодних обмежень по сумі інвестиції. Підтверджується через formal Accredited Investor Certificate на KYC.",
        nextStep: "Discovery call → KYC → Suitability Assessment → конкретні product offerings.",
        cta: "Записатись на discovery call",
        ctaSecondary: "Спочатку прочитати про exempt market",
        ctaSecondaryHref: "/exempt-market-ukrayintsyam",
      },
      eligible: {
        badge: "Eligible Investor",
        title: "Імовірно — Eligible Investor",
        oneLine:
          "За фінансовими тестами NI 45-106 ти, ймовірно, кваліфікуєшся як Eligible Investor — доступ до значної частини exempt-market продуктів через OM exemption.",
        whatItMeans:
          "Доступ до більшості exempt-market продуктів з певними обмеженнями (наприклад, ліміт на суму інвестиції в окремі OM exemptions залежно від продукту). Підтверджується через formal Eligibility certification на KYC.",
        nextStep: "Discovery call → KYC → Suitability Assessment → product fit і конкретна стратегія.",
        cta: "Записатись на discovery call",
        ctaSecondary: "Спочатку прочитати про exempt market",
        ctaSecondaryHref: "/exempt-market-ukrayintsyam",
      },
      non_eligible: {
        badge: "Поки що — Non-Eligible",
        title: "Поки що exempt market закритий — і це нормально",
        oneLine:
          "За фінансовими тестами NI 45-106 поки що ти не кваліфікуєшся ні як Eligible, ні як Accredited Investor. Це не проблема — у Канаді є потужні tax-efficient інструменти для будь-якого рівня доходу.",
        whatItMeans:
          "80% моїх клієнтів починають саме тут. TFSA + RRSP + FHSA правильно налаштовані за 5-10 років дають серйозний капітал — і коли ти доростеш до Eligible Investor, exempt market буде логічним наступним кроком.",
        nextStep: "Подивись калькулятори (TFSA, mortgage, FIRE) — побач свою реальну математику. І/або discovery call: розберемо план на 12 місяців.",
        cta: "Discovery call (все одно безкоштовно)",
        ctaSecondary: "Відкрити TFSA калькулятор",
        ctaSecondaryHref: "/calculators/tfsa-growth",
      },
    },
    bottomDisclaimer:
      "Self-check на основі NI 45-106 §1.1 фінансових порогів. Формальна класифікація — лише через KYC + Suitability Assessment з зареєстрованим Dealing Representative. NRD #4575551 · Axcess Capital Advisors Inc.",
  },
  ru: {
    intro: {
      kicker: "Self-check",
      title: "Ты Eligible Investor?",
      sub: "4 вопроса · 60 секунд · предварительная классификация по NI 45-106 §1.1.",
      whyTitle: "Почему это не «окончательный ответ»",
      whyText:
        "Это предварительный self-check на основе финансовых порогов CSA NI 45-106. Формальная классификация как Eligible / Accredited Investor подтверждается только через KYC + Suitability Assessment с зарегистрированным Dealing Representative. Здесь — образовательная ориентация, не legal opinion.",
      privacyNote:
        "Ответы обрабатываются только в твоём браузере — ничего не передаётся на сервер.",
      start: "Начать",
    },
    nav: {
      back: "Назад",
      next: "Далее",
      finish: "Увидеть результат",
      progress: (cur: number, total: number) => `Вопрос ${cur} из ${total}`,
      retake: "Пройти ещё раз",
    },
    questions: [
      {
        id: "q1",
        q: "Твой личный валовый доход за последние 2 года (и ожидаемый в этом году)?",
        hint: "Зарплата, business income, дивиденды, проценты — всё до налогов. Не семейный.",
        options: [
          { value: "lt75k", label: "До $75K" },
          { value: "gt75kLte125k", label: "$75K – $125K" },
          { value: "gt125kLte200k", label: "$125K – $200K" },
          { value: "gt200kLte300k", label: "$200K – $300K" },
          { value: "over300k", label: "Свыше $300K" },
        ],
      },
      {
        id: "q2",
        q: "Семейный доход (твой + мужа/жены), последние 2 года?",
        hint: "Если без брака/партнёра — выбери «не применимо».",
        options: [
          { value: "na", label: "Не применимо (single)" },
          { value: "lt125k", label: "До $125K" },
          { value: "gt125kLte250k", label: "$125K – $250K" },
          { value: "gt250kLte300k", label: "$250K – $300K" },
          { value: "over300k", label: "Свыше $300K" },
        ],
      },
      {
        id: "q3",
        q: "Чистые финансовые активы (наличные + инвестиции + securities), без основного жилья?",
        hint: "Всё в TFSA, RRSP, brokerage, savings, GIC, exempt market — минус долги по ним. Дом сюда НЕ идёт.",
        options: [
          { value: "lt100k", label: "До $100K" },
          { value: "gt100kLte400k", label: "$100K – $400K" },
          { value: "gt400kLte1m", label: "$400K – $1M" },
          { value: "over1m", label: "Свыше $1M" },
        ],
      },
      {
        id: "q4",
        q: "Общая чистая стоимость (всё что владеешь минус всё что должен)?",
        hint: "Включая дом, авто, бизнес — минус mortgage, кредиты, другие долги.",
        options: [
          { value: "lt500k", label: "До $500K" },
          { value: "gt500kLte1m", label: "$500K – $1M" },
          { value: "gt1mLte5m", label: "$1M – $5M" },
          { value: "over5m", label: "Свыше $5M" },
        ],
      },
    ],
    results: {
      accredited: {
        badge: "Accredited Investor",
        title: "Вероятно — Accredited Investor",
        oneLine:
          "По финансовым тестам NI 45-106 ты, вероятно, квалифицируешься как Accredited Investor — самый высокий уровень доступа к exempt market.",
        whatItMeans:
          "Доступ ко всему спектру exempt-market продуктов, включая те что недоступны Eligible Investors. Никаких ограничений по сумме инвестиции. Подтверждается через formal Accredited Investor Certificate на KYC.",
        nextStep: "Discovery call → KYC → Suitability Assessment → конкретные product offerings.",
        cta: "Записаться на discovery call",
        ctaSecondary: "Сначала прочитать об exempt market",
        ctaSecondaryHref: "/exempt-market-ukrayintsyam",
      },
      eligible: {
        badge: "Eligible Investor",
        title: "Вероятно — Eligible Investor",
        oneLine:
          "По финансовым тестам NI 45-106 ты, вероятно, квалифицируешься как Eligible Investor — доступ к значительной части exempt-market продуктов через OM exemption.",
        whatItMeans:
          "Доступ к большинству exempt-market продуктов с определёнными ограничениями (например, лимит на сумму инвестиции в отдельные OM exemptions в зависимости от продукта). Подтверждается через formal Eligibility certification на KYC.",
        nextStep: "Discovery call → KYC → Suitability Assessment → product fit и конкретная стратегия.",
        cta: "Записаться на discovery call",
        ctaSecondary: "Сначала прочитать об exempt market",
        ctaSecondaryHref: "/exempt-market-ukrayintsyam",
      },
      non_eligible: {
        badge: "Пока — Non-Eligible",
        title: "Пока exempt market закрыт — и это нормально",
        oneLine:
          "По финансовым тестам NI 45-106 пока ты не квалифицируешься ни как Eligible, ни как Accredited Investor. Это не проблема — в Канаде есть мощные tax-efficient инструменты для любого уровня дохода.",
        whatItMeans:
          "80% моих клиентов начинают именно здесь. TFSA + RRSP + FHSA правильно настроенные за 5-10 лет дают серьёзный капитал — и когда ты дорастёшь до Eligible Investor, exempt market будет логичным следующим шагом.",
        nextStep: "Посмотри калькуляторы (TFSA, mortgage, FIRE) — увидь свою реальную математику. И/или discovery call: разберём план на 12 месяцев.",
        cta: "Discovery call (всё равно бесплатно)",
        ctaSecondary: "Открыть TFSA калькулятор",
        ctaSecondaryHref: "/calculators/tfsa-growth",
      },
    },
    bottomDisclaimer:
      "Self-check на основе NI 45-106 §1.1 финансовых порогов. Формальная классификация — только через KYC + Suitability Assessment с зарегистрированным Dealing Representative. NRD #4575551 · Axcess Capital Advisors Inc.",
  },
  en: {
    intro: {
      kicker: "Self-check",
      title: "Are you an Eligible Investor?",
      sub: "4 questions · 60 seconds · preliminary categorisation per NI 45-106 §1.1.",
      whyTitle: "Why this isn't a 'final answer'",
      whyText:
        "This is a preliminary self-check based on CSA NI 45-106 financial thresholds. Formal Eligible / Accredited Investor classification is confirmed only via KYC + Suitability Assessment with a registered Dealing Representative. What you see here is educational orientation, not a legal opinion.",
      privacyNote:
        "Your answers are processed only in your browser — nothing is sent to a server.",
      start: "Start",
    },
    nav: {
      back: "Back",
      next: "Next",
      finish: "See result",
      progress: (cur: number, total: number) => `Question ${cur} of ${total}`,
      retake: "Take again",
    },
    questions: [
      {
        id: "q1",
        q: "Your personal gross income over each of the last 2 years (and expected this year)?",
        hint: "Salary, business income, dividends, interest — all pre-tax. Not household.",
        options: [
          { value: "lt75k", label: "Under $75K" },
          { value: "gt75kLte125k", label: "$75K – $125K" },
          { value: "gt125kLte200k", label: "$125K – $200K" },
          { value: "gt200kLte300k", label: "$200K – $300K" },
          { value: "over300k", label: "Over $300K" },
        ],
      },
      {
        id: "q2",
        q: "Combined household income (you + spouse), over each of the last 2 years?",
        hint: "If unmarried / no common-law partner, choose 'not applicable'.",
        options: [
          { value: "na", label: "Not applicable (single)" },
          { value: "lt125k", label: "Under $125K" },
          { value: "gt125kLte250k", label: "$125K – $250K" },
          { value: "gt250kLte300k", label: "$250K – $300K" },
          { value: "over300k", label: "Over $300K" },
        ],
      },
      {
        id: "q3",
        q: "Net financial assets (cash + investments + securities), EXCLUDING primary residence?",
        hint: "Everything in TFSA, RRSP, brokerage, savings, GIC, exempt market — minus debts on those. Your home does NOT count here.",
        options: [
          { value: "lt100k", label: "Under $100K" },
          { value: "gt100kLte400k", label: "$100K – $400K" },
          { value: "gt400kLte1m", label: "$400K – $1M" },
          { value: "over1m", label: "Over $1M" },
        ],
      },
      {
        id: "q4",
        q: "Total net worth (everything you own minus everything you owe)?",
        hint: "Including home, cars, business — minus mortgage, loans, other debts.",
        options: [
          { value: "lt500k", label: "Under $500K" },
          { value: "gt500kLte1m", label: "$500K – $1M" },
          { value: "gt1mLte5m", label: "$1M – $5M" },
          { value: "over5m", label: "Over $5M" },
        ],
      },
    ],
    results: {
      accredited: {
        badge: "Accredited Investor",
        title: "Likely Accredited Investor",
        oneLine:
          "Based on the NI 45-106 financial tests you likely qualify as an Accredited Investor — the highest tier of exempt market access.",
        whatItMeans:
          "Access to the full spectrum of exempt-market products, including those not available to Eligible Investors. No investment-amount caps. Confirmed via formal Accredited Investor Certificate at KYC.",
        nextStep: "Discovery call → KYC → Suitability Assessment → specific product offerings.",
        cta: "Book a discovery call",
        ctaSecondary: "Read about exempt market first",
        ctaSecondaryHref: "/exempt-market-ukrayintsyam",
      },
      eligible: {
        badge: "Eligible Investor",
        title: "Likely Eligible Investor",
        oneLine:
          "Based on the NI 45-106 financial tests you likely qualify as an Eligible Investor — access to a significant portion of exempt-market products via the OM exemption.",
        whatItMeans:
          "Access to most exempt-market products with some product-specific caps (some OM exemptions limit per-issue investment amounts). Confirmed via formal Eligibility certification at KYC.",
        nextStep: "Discovery call → KYC → Suitability Assessment → product fit and a specific strategy.",
        cta: "Book a discovery call",
        ctaSecondary: "Read about exempt market first",
        ctaSecondaryHref: "/exempt-market-ukrayintsyam",
      },
      non_eligible: {
        badge: "Not yet Eligible",
        title: "Exempt market isn't open yet — and that's fine",
        oneLine:
          "Based on the NI 45-106 financial tests you don't qualify yet as either Eligible or Accredited. That's normal — Canada has powerful tax-efficient tools at every income level.",
        whatItMeans:
          "80% of my clients start exactly here. A properly-set-up TFSA + RRSP + FHSA over 5–10 years builds serious capital — and once you've grown into Eligible Investor status, exempt market is the natural next step.",
        nextStep: "Look at the calculators (TFSA, mortgage, FIRE) — see your real math. And/or a discovery call to map a 12-month plan.",
        cta: "Discovery call (still free)",
        ctaSecondary: "Open the TFSA calculator",
        ctaSecondaryHref: "/calculators/tfsa-growth",
      },
    },
    bottomDisclaimer:
      "Self-check based on NI 45-106 §1.1 financial thresholds. Formal classification only via KYC + Suitability Assessment with a registered Dealing Representative. NRD #4575551 · Axcess Capital Advisors Inc.",
  },
};

// ─── Classification logic (NI 45-106 §1.1) ──────────────────────────────────
// Order of evaluation: Accredited > Eligible > Non. First match wins.
type ResultKey = "accredited" | "eligible" | "non_eligible";

function classify(answers: Record<string, string>): ResultKey {
  const { q1, q2, q3, q4 } = answers;

  // Accredited tests (NI 45-106 §1.1 (j)(k)(l))
  // — net income > $200K solo OR > $300K with spouse, both years
  // — financial assets > $1M
  // — net assets > $5M
  if (q1 === "gt200kLte300k" || q1 === "over300k") return "accredited";
  if (q2 === "over300k") return "accredited";
  if (q3 === "over1m") return "accredited";
  if (q4 === "over5m") return "accredited";

  // Eligible tests (NI 45-106 §1.1 (m)(n))
  // — net income > $75K solo OR > $125K with spouse, both years
  // — net assets > $400K
  if (q1 === "gt75kLte125k" || q1 === "gt125kLte200k") return "eligible";
  if (
    q2 === "gt125kLte250k" ||
    q2 === "gt250kLte300k" ||
    q2 === "over300k"
  )
    return "eligible";
  if (q3 === "gt400kLte1m") return "eligible";
  if (q4 === "gt500kLte1m" || q4 === "gt1mLte5m") return "eligible";

  return "non_eligible";
}

// Map result key → icon for the result card hero.
const RESULT_ICON: Record<ResultKey, ElementType> = {
  accredited: Trophy,
  eligible: Sparkles,
  non_eligible: BookOpen,
};

export default function EligibilityQuiz({ locale = "uk" }: { locale?: string }) {
  const c = COPY[locale] || COPY.uk;
  const [step, setStep] = useState(-1); // -1 = intro, 0..3 = questions, 4 = result
  const [answers, setAnswers] = useState<Record<string, string>>({});

  const totalQs = c.questions.length;

  function start() {
    track("eligibility_quiz_start", { locale });
    setStep(0);
  }

  function pickAnswer(qid: string, value: string) {
    setAnswers((prev) => ({ ...prev, [qid]: value }));
  }

  function goNext() {
    if (step < totalQs - 1) {
      setStep(step + 1);
    } else {
      // Move to result
      const result = classify(answers);
      track("eligibility_quiz_complete", { locale, result });
      setStep(totalQs);
    }
  }

  function goBack() {
    if (step > 0) setStep(step - 1);
  }

  function retake() {
    setAnswers({});
    setStep(-1);
  }

  // ── Intro screen ──────────────────────────────────────────────────────────
  if (step === -1) {
    return (
      <section className="mx-auto max-w-3xl px-6 py-12 md:py-16">
        <p className="mb-4 text-[10px] font-bold uppercase tracking-[0.3em] text-[var(--color-brand)]">
          {c.intro.kicker}
        </p>
        <h1 className="font-display-tight text-5xl text-white md:text-7xl">{c.intro.title}</h1>
        <p className="mt-6 text-lg leading-relaxed text-[var(--color-fg-muted)]">{c.intro.sub}</p>

        <div className="mt-10 rounded-3xl border border-[var(--color-border)] bg-[var(--color-bg-card)] p-7 md:p-10">
          <div className="flex items-start gap-4">
            <ShieldCheck className="mt-1 h-6 w-6 flex-shrink-0 text-[var(--color-brand)]" aria-hidden="true" />
            <div>
              <h2 className="font-display text-xl text-white md:text-2xl">{c.intro.whyTitle}</h2>
              <p className="mt-4 text-sm leading-relaxed text-[#c4c4c4]">{c.intro.whyText}</p>
              <p className="mt-3 text-xs text-[var(--color-fg-subtle)]">{c.intro.privacyNote}</p>
            </div>
          </div>
        </div>

        <button
          type="button"
          onClick={start}
          className="mt-10 inline-flex items-center gap-2 rounded-full bg-[var(--color-brand)] px-8 py-4 text-sm font-bold uppercase tracking-wider text-white transition-[transform,background-color] duration-200 ease-[var(--ease-out)] hover:bg-[var(--color-brand-hover)] active:scale-[0.98]"
        >
          {c.intro.start}
          <ArrowRight className="h-4 w-4" aria-hidden="true" />
        </button>

        <p className="mt-12 text-xs text-[var(--color-fg-subtle)]">{c.bottomDisclaimer}</p>
      </section>
    );
  }

  // ── Question screens ──────────────────────────────────────────────────────
  if (step >= 0 && step < totalQs) {
    const q = c.questions[step];
    const selected = answers[q.id];
    const canAdvance = !!selected;

    return (
      <section className="mx-auto max-w-2xl px-6 py-12 md:py-16">
        {/* Progress */}
        <div className="mb-8">
          <div className="mb-2 text-xs font-bold uppercase tracking-wider text-[var(--color-fg-subtle)]">
            {c.nav.progress(step + 1, totalQs)}
          </div>
          <div className="h-1 w-full overflow-hidden rounded-full bg-[var(--color-border)]">
            <div
              className="h-full bg-[var(--color-brand)] transition-[width] duration-300 ease-[var(--ease-out)]"
              style={{ width: `${((step + 1) / totalQs) * 100}%` }}
            />
          </div>
        </div>

        {/* Question */}
        <h2 className="font-display text-2xl text-white md:text-3xl">{q.q}</h2>
        <p className="mt-3 text-sm leading-relaxed text-[var(--color-fg-muted)]">{q.hint}</p>

        {/* Options */}
        <ul className="mt-8 space-y-3">
          {q.options.map((opt) => {
            const isSelected = selected === opt.value;
            return (
              <li key={opt.value}>
                <button
                  type="button"
                  onClick={() => pickAnswer(q.id, opt.value)}
                  className={`flex w-full items-center justify-between gap-4 rounded-xl border px-5 py-4 text-left transition-[transform,border-color,background-color] duration-150 ease-[var(--ease-out)] active:scale-[0.99] ${
                    isSelected
                      ? "border-[var(--color-brand)] bg-[var(--color-brand)]/10"
                      : "border-[var(--color-border)] bg-[var(--color-bg-card)] hover:border-[var(--color-brand)]/40"
                  }`}
                  aria-pressed={isSelected}
                >
                  <span className={`font-semibold ${isSelected ? "text-white" : "text-[#c4c4c4]"}`}>
                    {opt.label}
                  </span>
                  <span
                    className={`flex h-5 w-5 flex-shrink-0 items-center justify-center rounded-full border-2 ${
                      isSelected
                        ? "border-[var(--color-brand)] bg-[var(--color-brand)]"
                        : "border-[var(--color-border-strong)]"
                    }`}
                    aria-hidden="true"
                  >
                    {isSelected && <CheckCircle2 className="h-3 w-3 text-white" />}
                  </span>
                </button>
              </li>
            );
          })}
        </ul>

        {/* Nav */}
        <div className="mt-10 flex items-center justify-between">
          <button
            type="button"
            onClick={goBack}
            disabled={step === 0}
            className="inline-flex items-center gap-2 text-sm font-semibold text-[var(--color-fg-muted)] transition-colors hover:text-[var(--color-brand)] disabled:cursor-not-allowed disabled:opacity-30"
          >
            <ArrowLeft className="h-4 w-4" aria-hidden="true" />
            {c.nav.back}
          </button>
          <button
            type="button"
            onClick={goNext}
            disabled={!canAdvance}
            className="inline-flex items-center gap-2 rounded-full bg-[var(--color-brand)] px-6 py-3 text-sm font-bold uppercase tracking-wider text-white transition-[transform,background-color] duration-200 ease-[var(--ease-out)] hover:bg-[var(--color-brand-hover)] active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-30"
          >
            {step === totalQs - 1 ? c.nav.finish : c.nav.next}
            <ArrowRight className="h-4 w-4" aria-hidden="true" />
          </button>
        </div>

        <p className="mt-12 text-xs text-[var(--color-fg-subtle)]">{c.bottomDisclaimer}</p>
      </section>
    );
  }

  // ── Result screen ─────────────────────────────────────────────────────────
  const resultKey = classify(answers);
  const r = c.results[resultKey];
  const Icon = RESULT_ICON[resultKey];
  const isTopTier = resultKey === "accredited" || resultKey === "eligible";

  return (
    <section className="mx-auto max-w-3xl px-6 py-12 md:py-16">
      {/* Hero result card */}
      <div
        className={`overflow-hidden rounded-3xl border p-8 md:p-12 ${
          isTopTier
            ? "border-[var(--color-brand)]/40 bg-gradient-to-br from-[var(--color-bg-card)] to-[#1a2d4a]"
            : "border-[var(--color-border)] bg-[var(--color-bg-card)]"
        }`}
      >
        <div className="flex items-start gap-5">
          <div
            className={`flex h-14 w-14 flex-shrink-0 items-center justify-center rounded-2xl ${
              isTopTier ? "bg-[var(--color-brand)]/15" : "bg-[var(--color-bg-elevated)]"
            }`}
          >
            <Icon
              className={`h-7 w-7 ${isTopTier ? "text-[var(--color-brand)]" : "text-[var(--color-fg-muted)]"}`}
              aria-hidden="true"
            />
          </div>
          <div className="min-w-0">
            <span
              className={`inline-flex items-center rounded-full px-3 py-1 text-[10px] font-bold uppercase tracking-wider ${
                isTopTier
                  ? "bg-[var(--color-brand)]/15 text-[var(--color-brand)]"
                  : "bg-[var(--color-bg-elevated)] text-[var(--color-fg-muted)]"
              }`}
            >
              {r.badge}
            </span>
            <h2 className="mt-3 font-display-tight text-3xl text-white md:text-5xl">{r.title}</h2>
          </div>
        </div>

        <p className="mt-7 text-lg leading-relaxed text-[#c4c4c4]">{r.oneLine}</p>

        <div className="mt-6 rounded-2xl border border-[var(--color-border)] bg-[var(--color-bg)] p-5 md:p-6">
          <h3 className="text-xs font-bold uppercase tracking-wider text-[var(--color-fg-subtle)]">
            {locale === "en" ? "What it means" : locale === "ru" ? "Что это значит" : "Що це означає"}
          </h3>
          <p className="mt-3 text-sm leading-relaxed text-[#c4c4c4]">{r.whatItMeans}</p>
        </div>

        <div className="mt-6 rounded-2xl border border-[var(--color-brand)]/30 bg-[var(--color-brand)]/5 p-5 md:p-6">
          <h3 className="text-xs font-bold uppercase tracking-wider text-[var(--color-brand)]">
            {locale === "en" ? "Next step" : locale === "ru" ? "Следующий шаг" : "Наступний крок"}
          </h3>
          <p className="mt-3 text-sm leading-relaxed text-white">{r.nextStep}</p>
        </div>

        {/* CTAs */}
        <div className="mt-8 flex flex-wrap items-center gap-4">
          <a
            href={CALENDLY}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => track("eligibility_quiz_cta_calendly", { locale, result: resultKey })}
            className="inline-flex items-center gap-2 rounded-full bg-[var(--color-brand)] px-7 py-3.5 text-sm font-bold uppercase tracking-wider text-white transition-[transform,background-color] duration-200 ease-[var(--ease-out)] hover:bg-[var(--color-brand-hover)] active:scale-[0.98]"
          >
            {r.cta}
            <ArrowRight className="h-4 w-4" aria-hidden="true" />
          </a>
          {r.ctaSecondary && r.ctaSecondaryHref && (
            <Link
              href={r.ctaSecondaryHref}
              onClick={() => track("eligibility_quiz_cta_secondary", { locale, result: resultKey })}
              className="inline-flex items-center gap-2 text-sm font-semibold text-[var(--color-brand)] transition-colors duration-150 ease-[var(--ease-out)] hover:text-[var(--color-brand-hover)]"
            >
              {r.ctaSecondary}
              <ArrowRight className="h-3.5 w-3.5" aria-hidden="true" />
            </Link>
          )}
        </div>
      </div>

      {/* Retake */}
      <div className="mt-8 text-center">
        <button
          type="button"
          onClick={retake}
          className="inline-flex items-center gap-2 text-sm text-[var(--color-fg-muted)] transition-colors hover:text-[var(--color-brand)]"
        >
          <RotateCcw className="h-3.5 w-3.5" aria-hidden="true" />
          {c.nav.retake}
        </button>
      </div>

      <p className="mt-12 text-xs text-[var(--color-fg-subtle)]">{c.bottomDisclaimer}</p>
    </section>
  );
}
