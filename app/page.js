"use client";

import { useState, useEffect } from "react";
import {
  PiggyBank, ShieldCheck, TrendingUp, CalendarCheck,
  Home, GraduationCap, Compass, MessageCircle, Download, ArrowRight,
  Globe, Mail, Phone, AtSign, Send,
} from "lucide-react";

// ─────────────────────────────────────────────────────────────────────────────
// BRAND LOGO COMPONENT (mark + wordmark)
// ─────────────────────────────────────────────────────────────────────────────

function Logo({ variant = "full", className = "" }) {
  if (variant === "mark") {
    return (
      <svg viewBox="0 0 97 90" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M27.69 0V55.38C12.41 55.38 0 42.98 0 27.69C0 12.41 12.41 0 27.69 0Z" fill="currentColor"/>
        <path d="M34.61 90L34.61 34.62C49.89 34.62 62.3 47.03 62.3 62.31C62.3 77.59 49.89 90 34.61 90Z" fill="currentColor"/>
        <path d="M62.31 27.69C47.02 27.69 34.62 15.29 34.62 0H62.31V27.69Z" fill="currentColor"/>
        <path d="M96.92 27.69L69.23 0H96.92V27.69Z" fill="currentColor"/>
        <path d="M27.69 76.16C27.69 68.51 21.49 62.31 13.84 62.31C6.2 62.31 0 68.51 0 76.16C0 83.8 6.2 90 13.84 90C21.49 90 27.69 83.8 27.69 76.16Z" fill="currentColor"/>
        <path d="M96.92 48.47C96.92 40.82 90.72 34.62 83.08 34.62C75.43 34.62 69.23 40.82 69.23 48.47C69.23 56.11 75.43 62.31 83.08 62.31C90.72 62.31 96.92 56.11 96.92 48.47Z" fill="currentColor"/>
      </svg>
    );
  }

  // Full lockup (mark + SKYFORT text)
  return (
    <div className={`flex items-center gap-3 ${className}`}>
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
// TRANSLATIONS
// ─────────────────────────────────────────────────────────────────────────────

const t = {
  uk: {
    htmlLang: "uk",
    nav: { book: "Записатись" },
    hero: {
      kicker: "Licensed DR · Alberta · BC · Ontario",
      title: "Фінанси для українців",
      titleAccent: "у Канаді",
      titleEnd: "Без банківських казок",
      sub: "TFSA, RRSP, FHSA, real estate, exempt market. Конкретні цифри, регуляторна точність, без впарювання.",
      ctaPrimary: "Записатись на консультацію",
      ctaSecondary: "Завантажити гайди",
    },
    stats: [
      { value: "$34K", label: "TFSA contribution room у 2026" },
      { value: "7–12%", label: "Історичний return broad-market ETF" },
      { value: "$158K", label: "Різниця за 20 років (savings vs ETF)" },
      { value: "30 хв", label: "Discovery call · безкоштовно" },
    ],
    aboutTitle: "Хто я і чому це не черговий блог про гроші",
    about: [
      "Я Андрій Андрющенко — Licensed Dealing Representative, зареєстрований з Axcess Capital Advisors Inc. Особисто ліцензований в Альберті, Британській Колумбії та Онтаріо.",
      "Працюю з людьми, які приїхали в Канаду й хочуть розібратися як насправді працює тутешня фінансова система — без банківських продавців, без TikTok-гуру, без обіцянок 25% дохідності.",
      "На цій сторінці — мої освітні матеріали (всі CCO-approved) і можливість записатись на discovery call.",
    ],
    guidesTitle: "7 безкоштовних гайдів",
    guidesSub: "Завантаж, прочитай, повертайся з питаннями.",
    guides: [
      { icon: PiggyBank, title: "TFSA + Exempt Market", desc: "Як TFSA працює насправді. 5 помилок які знищать рахунок.", file: "01_SkyFort_TFSA_Exempt_Market.pdf" },
      { icon: ShieldCheck, title: "Pension Deficit", desc: "CPP + OAS = $1,800/міс. Витрати на пенсії $4,500. Як закрити різницю.", file: "02_SkyFort_Pension_Deficit.pdf" },
      { icon: TrendingUp, title: "GIC Alternatives", desc: "GIC дає 4%, інфляція з'їдає 3%. 4 альтернативи які працюють краще.", file: "03_SkyFort_GIC_Alternatives.pdf" },
      { icon: CalendarCheck, title: "90 Day Freedom", desc: "Покроковий план виходу з фінансової пастки $120K зарплати.", file: "04_SkyFort_90_Day_Freedom.pdf" },
      { icon: Home, title: "FHSA · перша квартира", desc: "$8K/рік tax-deductible, $40K lifetime. Як використати правильно.", file: "05_SkyFort_FHSA_First_Home.pdf" },
      { icon: GraduationCap, title: "RESP · освіта дитини", desc: "Уряд додає $7,200 безкоштовно. Три стратегії.", file: "06_SkyFort_RESP_Education.pdf" },
      { icon: Compass, title: "Newcomer · 30 кроків", desc: "Що зробити в перші 90 днів у Канаді. Від SIN до першого TFSA.", file: "07_SkyFort_Newcomer_30_Steps.pdf" },
      { icon: MessageCircle, title: "Підготовка до консультації", desc: "Що принести, які питання поставити. Зробить твою першу зустріч у 2× продуктивнішою.", file: "08_SkyFort_Consultation_Prep.pdf" },
    ],
    steps: [
      { n: "01", title: "Завантаж гайд", desc: "Вибери тему. Прочитай. Без email-форм, без spam." },
      { n: "02", title: "Запишись на дзвінок", desc: "30 хвилин. Безкоштовно. Discovery call — регуляторний KYC + suitability крок." },
      { n: "03", title: "Отримай план", desc: "Якщо Eligible Investor — пропоную exempt market. Якщо ні — план через TFSA/RRSP." },
    ],
    faqTitle: "Питання які ставлять усі",
    faq: [
      { q: "Це безкоштовно? У чому каверза?", a: "Discovery call безкоштовний. Якщо рекомендую exempt market продукт і ти підписуєшся — отримую commission від issuer (стандарт у Канаді, прозоро в Offering Memorandum). Якщо ні — нічого не платиш." },
      { q: "Чим ти відрізняєшся від банку?", a: "Банк продає тільки те що в банку. Я як Dealing Representative маю доступ до exempt market — private MICs, REITs, private lending з historical returns 7-12%." },
      { q: "Що таке Eligible Investor?", a: "CSA NI 45-106 категорія. Спрощено: $75K+ income solo / $125K+ household, або $400K net assets ex-primary residence." },
      { q: "Я newcomer, в мене ще немає $400K. Чи є сенс говорити?", a: "Так. 80% моїх клієнтів починають з TFSA/RRSP setup. Exempt market — це коли вже є infrastructure. Дзвінок все одно корисний." },
    ],
    ctaTitle: "Готовий розібратись?",
    ctaSub: "30 хвилин · Zoom або Google Meet · Українською, російською або англійською.",
    ctaBtn: "Записатись на discovery call",
    footer: {
      tagline: "Wealth building для українців у Канаді",
      contactTitle: "Контакти",
      legalTitle: "Регулятор",
      disclaimer: "Andrii Andriushchenko — Dealing Representative registered with Axcess Capital Advisors Inc. (EMD). Personally registered: Alberta, British Columbia, Ontario. Content on this site is educational and is not investment advice. Exempt market investments are restricted to Eligible Investors as defined under National Instrument 45-106.",
      rights: "© 2026 SkyFort Wealth. All rights reserved.",
    },
  },

  ru: {
    htmlLang: "ru",
    nav: { book: "Записаться" },
    hero: {
      kicker: "Licensed DR · Alberta · BC · Ontario",
      title: "Финансы для русскоязычных",
      titleAccent: "в Канаде",
      titleEnd: "Без банковских сказок",
      sub: "TFSA, RRSP, FHSA, real estate, exempt market. Конкретные цифры, регуляторная точность, без впаривания.",
      ctaPrimary: "Записаться на консультацию",
      ctaSecondary: "Скачать гайды",
    },
    stats: [
      { value: "$34K", label: "TFSA contribution room в 2026" },
      { value: "7–12%", label: "Исторический return broad-market ETF" },
      { value: "$158K", label: "Разница за 20 лет (savings vs ETF)" },
      { value: "30 мин", label: "Discovery call · бесплатно" },
    ],
    aboutTitle: "Кто я и почему это не очередной блог про деньги",
    about: [
      "Я Андрей Андрющенко — Licensed Dealing Representative, зарегистрирован с Axcess Capital Advisors Inc. Лицензирован в Альберте, Британской Колумбии и Онтарио.",
      "Работаю с людьми, которые приехали в Канаду и хотят разобраться как реально работает местная финансовая система — без банковских продавцов, без TikTok-гуру.",
      "На этой странице — мои образовательные материалы (все CCO-approved) и возможность записаться на discovery call.",
    ],
    guidesTitle: "7 бесплатных гайдов",
    guidesSub: "Скачай, прочитай, возвращайся с вопросами.",
    guides: [
      { icon: PiggyBank, title: "TFSA + Exempt Market", desc: "Как TFSA работает на самом деле. 5 ошибок которые уничтожат счёт.", file: "01_SkyFort_TFSA_Exempt_Market.pdf" },
      { icon: ShieldCheck, title: "Pension Deficit", desc: "CPP + OAS = $1,800/мес. Расходы на пенсии $4,500. Как закрыть.", file: "02_SkyFort_Pension_Deficit.pdf" },
      { icon: TrendingUp, title: "GIC Alternatives", desc: "GIC даёт 4%, инфляция съедает 3%. 4 альтернативы которые работают лучше.", file: "03_SkyFort_GIC_Alternatives.pdf" },
      { icon: CalendarCheck, title: "90 Day Freedom", desc: "Пошаговый план выхода из финансовой ловушки $120K зарплаты.", file: "04_SkyFort_90_Day_Freedom.pdf" },
      { icon: Home, title: "FHSA · первая квартира", desc: "$8K/год tax-deductible, $40K lifetime. Как использовать правильно.", file: "05_SkyFort_FHSA_First_Home.pdf" },
      { icon: GraduationCap, title: "RESP · образование", desc: "Правительство добавляет $7,200 бесплатно. Три стратегии.", file: "06_SkyFort_RESP_Education.pdf" },
      { icon: Compass, title: "Newcomer · 30 шагов", desc: "Что сделать в первые 90 дней в Канаде. От SIN до первого TFSA.", file: "07_SkyFort_Newcomer_30_Steps.pdf" },
      { icon: MessageCircle, title: "Подготовка к консультации", desc: "Что принести, какие вопросы задать. Сделает первую встречу в 2× продуктивнее.", file: "08_SkyFort_Consultation_Prep.pdf" },
    ],
    stepsTitle: "Как это работает",
    steps: [
      { n: "01", title: "Скачай гайд", desc: "Выбери тему. Прочитай. Без email-форм, без spam." },
      { n: "02", title: "Запишись на звонок", desc: "30 минут. Бесплатно. Discovery call — регуляторный KYC + suitability шаг." },
      { n: "03", title: "Получи план", desc: "Если Eligible Investor — exempt market. Если нет — план через TFSA/RRSP." },
    ],
    faqTitle: "Вопросы которые задают все",
    faq: [
      { q: "Это бесплатно? В чём подвох?", a: "Discovery call бесплатный. Если рекомендую exempt market продукт и ты подписываешься — получаю commission от issuer. Если нет — ничего не платишь." },
      { q: "Чем ты отличаешься от банка?", a: "Банк продаёт только то что в банке. Я как Dealing Representative имею доступ к exempt market — private MICs, REITs с historical returns 7-12%." },
      { q: "Что такое Eligible Investor?", a: "CSA NI 45-106 категория. Упрощённо: $75K+ income solo / $125K+ household, или $400K net assets ex-primary residence." },
      { q: "Я newcomer, у меня ещё нет $400K. Есть ли смысл говорить?", a: "Да. 80% моих клиентов начинают с TFSA/RRSP setup. Exempt market — когда уже есть infrastructure." },
    ],
    ctaTitle: "Готов разобраться?",
    ctaSub: "30 минут · Zoom или Google Meet · На украинском, русском или английском.",
    ctaBtn: "Записаться на discovery call",
    footer: {
      tagline: "Wealth building для русскоязычных в Канаде",
      contactTitle: "Контакты",
      legalTitle: "Регулятор",
      disclaimer: "Andrii Andriushchenko — Dealing Representative registered with Axcess Capital Advisors Inc. (EMD). Personally registered: Alberta, British Columbia, Ontario. Content on this site is educational and is not investment advice.",
      rights: "© 2026 SkyFort Wealth. All rights reserved.",
    },
  },

  en: {
    htmlLang: "en",
    nav: { book: "Book a call" },
    hero: {
      kicker: "Licensed DR · Alberta · BC · Ontario",
      title: "Canadian finance",
      titleAccent: "for newcomers",
      titleEnd: "No bank fairy tales",
      sub: "TFSA, RRSP, FHSA, real estate, exempt market. Real numbers, regulatory precision, no pushy sales.",
      ctaPrimary: "Book a discovery call",
      ctaSecondary: "Download the guides",
    },
    stats: [
      { value: "$34K", label: "TFSA contribution room in 2026" },
      { value: "7–12%", label: "Historical return on broad-market ETFs" },
      { value: "$158K", label: "20-year gap (savings vs ETF)" },
      { value: "30 min", label: "Discovery call · free" },
    ],
    aboutTitle: "Who I am and why this isn't another money blog",
    about: [
      "I'm Andrii Andriushchenko — a Licensed Dealing Representative registered with Axcess Capital Advisors Inc. Personally registered in Alberta, BC, and Ontario.",
      "I work with people who moved to Canada and want to understand how the financial system actually works — without bank salespeople, without TikTok gurus, without promises of 25% returns.",
      "On this page: my educational materials (all CCO-approved) and the option to book a discovery call.",
    ],
    guidesTitle: "7 free guides",
    guidesSub: "Download, read, come back with questions.",
    guides: [
      { icon: PiggyBank, title: "TFSA + Exempt Market", desc: "How TFSA actually works. 5 mistakes that wreck the account.", file: "01_SkyFort_TFSA_Exempt_Market.pdf" },
      { icon: ShieldCheck, title: "Pension Deficit", desc: "CPP + OAS = $1,800/mo. Retirement expenses $4,500. How to close the gap.", file: "02_SkyFort_Pension_Deficit.pdf" },
      { icon: TrendingUp, title: "GIC Alternatives", desc: "GICs pay 4%, inflation eats 3%. 4 alternatives that work better.", file: "03_SkyFort_GIC_Alternatives.pdf" },
      { icon: CalendarCheck, title: "90 Day Freedom", desc: "Step-by-step exit from the $120K-salary trap in Calgary.", file: "04_SkyFort_90_Day_Freedom.pdf" },
      { icon: Home, title: "FHSA · first home", desc: "$8K/yr tax-deductible, $40K lifetime. How to use it right.", file: "05_SkyFort_FHSA_First_Home.pdf" },
      { icon: GraduationCap, title: "RESP · child's education", desc: "Government adds $7,200 for free. Three strategies.", file: "06_SkyFort_RESP_Education.pdf" },
      { icon: Compass, title: "Newcomer · 30 steps", desc: "What to do in your first 90 days in Canada. From SIN to first TFSA.", file: "07_SkyFort_Newcomer_30_Steps.pdf" },
      { icon: MessageCircle, title: "Consultation prep", desc: "What to bring, what to ask. Makes your first call 2× more productive.", file: "08_SkyFort_Consultation_Prep.pdf" },
    ],
    stepsTitle: "How it works",
    steps: [
      { n: "01", title: "Download a guide", desc: "Pick the topic you're thinking about. Read. No email forms, no spam." },
      { n: "02", title: "Book a call", desc: "30 minutes. Free. Discovery call is a regulatory KYC + suitability step." },
      { n: "03", title: "Get a plan", desc: "If Eligible Investor — exempt market options. If not — educational plan via TFSA/RRSP." },
    ],
    faqTitle: "Questions everyone asks",
    faq: [
      { q: "Is it really free? What's the catch?", a: "The discovery call is free. If I recommend an exempt market product and you subscribe, I receive commission from the issuer. If not — you pay nothing." },
      { q: "How are you different from a bank?", a: "A bank can only sell what's inside the bank. As a DR I have access to the exempt market — private MICs, REITs with historical returns of 7-12%." },
      { q: "What's an Eligible Investor?", a: "CSA NI 45-106 category. Simplified: $75K+ solo income / $125K+ household, or $400K net assets excluding primary residence." },
      { q: "I'm a newcomer without $400K yet. Is there still a point?", a: "Yes. 80% of clients start with TFSA/RRSP setup. Exempt market comes when infrastructure is built." },
    ],
    ctaTitle: "Ready to figure it out?",
    ctaSub: "30 minutes · Zoom or Google Meet · Available in Ukrainian, Russian, or English.",
    ctaBtn: "Book a discovery call",
    footer: {
      tagline: "Wealth building for newcomers to Canada",
      contactTitle: "Contact",
      legalTitle: "Regulatory",
      disclaimer: "Andrii Andriushchenko — Dealing Representative registered with Axcess Capital Advisors Inc. (EMD). Personally registered: Alberta, British Columbia, Ontario. Content is educational and not investment advice.",
      rights: "© 2026 SkyFort Wealth. All rights reserved.",
    },
  },
};

const CONFIG = {
  calendlyUrl: "https://calendly.com/andrii-andriushchenko/discovery-call",
  email: "andrii.andriushchenko@axcesscapital.com",
  phone: "(403) 397-2553",
  instagram: "https://instagram.com/andrii.wealthcanada",
  telegram: "https://t.me/skyfortwealth",
  pdfBaseUrl: "/guides",
};

// ─────────────────────────────────────────────────────────────────────────────
// COMPONENTS
// ─────────────────────────────────────────────────────────────────────────────

function LangSwitcher({ lang, setLang }) {
  const langs = [
    { code: "uk", label: "УК" },
    { code: "ru", label: "RU" },
    { code: "en", label: "EN" },
  ];
  return (
    <div className="flex items-center gap-0 rounded-full border border-[#2a2a2a] bg-[#222] p-1" role="group" aria-label="Language">
      <Globe className="ml-2 h-3.5 w-3.5 text-[#6b6b6b]" aria-hidden="true" />
      {langs.map((l) => (
        <button
          key={l.code}
          onClick={() => setLang(l.code)}
          aria-pressed={lang === l.code}
          className={`rounded-full px-3 py-1 text-xs font-bold tracking-wider transition-all ${
            lang === l.code ? "bg-[#2D73E3] text-white" : "text-[#a3a3a3] hover:text-white"
          }`}
        >
          {l.label}
        </button>
      ))}
    </div>
  );
}

function Nav({ lang, setLang, content }) {
  return (
    <nav className="fixed inset-x-0 top-0 z-50 border-b border-[#2a2a2a] bg-[#191919]/80 backdrop-blur-xl">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
        <a href="#top" aria-label="SkyFort home">
          <Logo variant="full" />
        </a>
        <div className="flex items-center gap-3">
          <LangSwitcher lang={lang} setLang={setLang} />
          <a
            href={CONFIG.calendlyUrl}
            target="_blank"
            rel="noopener"
            className="hidden rounded-full bg-[#2D73E3] px-4 py-2 text-xs font-bold uppercase tracking-wider text-white transition-all hover:bg-[#4287ec] sm:inline-flex"
          >
            {content.nav.book}
          </a>
        </div>
      </div>
    </nav>
  );
}

// HERO with geometric brand shapes (inspired by guideline айдентика slide)
function Hero({ content }) {
  return (
    <section id="top" className="relative overflow-hidden pt-36 pb-28 md:pt-44 md:pb-36">
      {/* Background brand shapes — large blue geometric forms like in guideline */}
      <div className="pointer-events-none absolute inset-0 -z-10" aria-hidden="true">
        {/* Large half-circle top-right */}
        <div className="absolute -right-40 -top-32 h-[600px] w-[600px] rounded-full bg-[#2D73E3] opacity-[0.08] blur-3xl" />
        {/* Bottom-left accent */}
        <div className="absolute -left-32 bottom-0 h-[400px] w-[400px] rounded-full bg-[#2D73E3] opacity-[0.06] blur-3xl" />
        {/* Subtle grid overlay */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,#191919_70%)]" />
      </div>

      <div className="mx-auto max-w-6xl px-6">
        <p className="mb-8 text-[10px] font-bold uppercase tracking-[0.3em] text-[#2D73E3]">
          {content.hero.kicker}
        </p>

        <h1 className="font-display-tight text-5xl text-white md:text-7xl lg:text-[88px]">
          {content.hero.title}
          <br />
          <span className="text-[#2D73E3]">{content.hero.titleAccent}.</span>
        </h1>

        <p className="mt-6 font-display text-2xl text-[#a3a3a3] md:text-4xl">
          {content.hero.titleEnd}.
        </p>

        <p className="mt-10 max-w-2xl text-lg leading-relaxed text-[#a3a3a3] md:text-xl">
          {content.hero.sub}
        </p>

        <div className="mt-12 flex flex-col gap-3 sm:flex-row">
          <a
            href={CONFIG.calendlyUrl}
            target="_blank"
            rel="noopener"
            className="group inline-flex items-center justify-center gap-2 rounded-full bg-[#2D73E3] px-7 py-4 text-sm font-bold uppercase tracking-wider text-white transition-all hover:bg-[#4287ec]"
          >
            {content.hero.ctaPrimary}
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" aria-hidden="true" />
          </a>
          <a
            href="#guides"
            className="inline-flex items-center justify-center gap-2 rounded-full border border-[#3a3a3a] px-7 py-4 text-sm font-bold uppercase tracking-wider text-white transition-all hover:border-[#2D73E3] hover:bg-[#222]"
          >
            <Download className="h-4 w-4" aria-hidden="true" />
            {content.hero.ctaSecondary}
          </a>
        </div>
      </div>
    </section>
  );
}

function Stats({ content }) {
  return (
    <section className="border-y border-[#2a2a2a] bg-[#1f1f1f]" aria-label="Key statistics">
      <div className="mx-auto grid max-w-6xl grid-cols-2 gap-px bg-[#2a2a2a] md:grid-cols-4">
        {content.stats.map((s, i) => (
          <div key={i} className="bg-[#1f1f1f] p-8 md:p-10">
            <div className="font-display-tight text-3xl text-[#2D73E3] md:text-5xl">{s.value}</div>
            <div className="mt-3 text-xs leading-relaxed text-[#a3a3a3] md:text-sm">{s.label}</div>
          </div>
        ))}
      </div>
    </section>
  );
}

function About({ content }) {
  return (
    <section className="py-28 md:py-36" id="about">
      <div className="mx-auto max-w-3xl px-6">
        <h2 className="font-display text-4xl leading-[0.95] text-white md:text-6xl">
          {content.aboutTitle}
        </h2>
        <div className="mt-12 space-y-6">
          {content.about.map((p, i) => (
            <p key={i} className="text-lg leading-relaxed text-[#a3a3a3]">{p}</p>
          ))}
        </div>
      </div>
    </section>
  );
}

function Guides({ content }) {
  return (
    <section id="guides" className="py-28 md:py-36">
      <div className="mx-auto max-w-6xl px-6">
        <div className="mb-16 max-w-2xl">
          <h2 className="font-display text-4xl leading-[0.95] text-white md:text-6xl">
            {content.guidesTitle}
          </h2>
          <p className="mt-6 text-lg text-[#a3a3a3]">{content.guidesSub}</p>
        </div>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {content.guides.map((g, i) => {
            const Icon = g.icon;
            return (
              <a
                key={i}
                href={`${CONFIG.pdfBaseUrl}/${g.file}`}
                target="_blank"
                rel="noopener"
                className="card-glow group relative flex flex-col rounded-2xl border border-[#2a2a2a] bg-[#1f1f1f] p-7"
                aria-label={`Download ${g.title} PDF`}
              >
                <div className="mb-6 flex h-11 w-11 items-center justify-center rounded-lg bg-[#2D73E3]/10 text-[#2D73E3]">
                  <Icon className="h-5 w-5" aria-hidden="true" />
                </div>
                <h3 className="font-display text-xl text-white">{g.title}</h3>
                <p className="mt-3 flex-1 text-sm leading-relaxed text-[#a3a3a3]">{g.desc}</p>
                <div className="mt-6 inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-[#2D73E3]">
                  PDF
                  <ArrowRight className="h-3 w-3 transition-transform group-hover:translate-x-0.5" aria-hidden="true" />
                </div>
              </a>
            );
          })}
        </div>
      </div>
    </section>
  );
}

function Steps({ content }) {
  return (
    <section className="py-28 md:py-36">
      <div className="mx-auto max-w-6xl px-6">
        <h2 className="mb-16 font-display text-4xl leading-[0.95] text-white md:text-6xl">
          {content.stepsTitle}
        </h2>
        <ol className="grid gap-12 md:grid-cols-3">
          {content.steps.map((s, i) => (
            <li key={i} className="relative">
              <div className="mb-6 font-display-tight text-6xl text-[#2D73E3]">{s.n}</div>
              <h3 className="font-display text-2xl text-white">{s.title}</h3>
              <p className="mt-4 leading-relaxed text-[#a3a3a3]">{s.desc}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}

function FAQ({ content }) {
  const [open, setOpen] = useState(0);
  return (
    <section className="py-28 md:py-36" id="faq">
      <div className="mx-auto max-w-3xl px-6">
        <h2 className="mb-16 font-display text-4xl leading-[0.95] text-white md:text-6xl">
          {content.faqTitle}
        </h2>
        <dl className="space-y-4">
          {content.faq.map((item, i) => (
            <div key={i} className="overflow-hidden rounded-xl border border-[#2a2a2a] bg-[#1f1f1f]">
              <dt>
                <button
                  onClick={() => setOpen(open === i ? -1 : i)}
                  aria-expanded={open === i}
                  className="flex w-full items-start justify-between gap-4 px-6 py-5 text-left transition-colors hover:bg-[#222]"
                >
                  <span className="font-bold uppercase tracking-wide text-white">{item.q}</span>
                  <span className={`mt-1 text-2xl leading-none text-[#2D73E3] transition-transform ${open === i ? "rotate-45" : ""}`} aria-hidden="true">+</span>
                </button>
              </dt>
              {open === i && (
                <dd className="border-t border-[#2a2a2a] px-6 py-5 leading-relaxed text-[#a3a3a3]">{item.a}</dd>
              )}
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}

function FinalCTA({ content }) {
  return (
    <section className="relative overflow-hidden py-28 md:py-36">
      {/* Background blue shape */}
      <div className="pointer-events-none absolute inset-0 -z-10" aria-hidden="true">
        <div className="absolute left-1/2 top-1/2 h-[500px] w-[500px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#2D73E3] opacity-[0.08] blur-3xl" />
      </div>
      <div className="mx-auto max-w-3xl px-6 text-center">
        <h2 className="font-display-tight text-5xl text-white md:text-7xl">
          {content.ctaTitle}
        </h2>
        <p className="mx-auto mt-8 max-w-xl text-lg text-[#a3a3a3]">{content.ctaSub}</p>
        <a
          href={CONFIG.calendlyUrl}
          target="_blank"
          rel="noopener"
          className="group mt-12 inline-flex items-center justify-center gap-2 rounded-full bg-[#2D73E3] px-8 py-4 text-sm font-bold uppercase tracking-wider text-white transition-all hover:bg-[#4287ec]"
        >
          {content.ctaBtn}
          <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" aria-hidden="true" />
        </a>
      </div>
    </section>
  );
}

function Footer({ content }) {
  return (
    <footer className="border-t border-[#2a2a2a] bg-[#191919] pt-24 pb-12">
      <div className="mx-auto max-w-6xl px-6">
        <div className="grid gap-12 md:grid-cols-3">
          <div>
            <Logo variant="full" />
            <p className="mt-4 text-sm text-[#6b6b6b]">{content.footer.tagline}</p>
          </div>

          <div>
            <h3 className="mb-4 text-xs font-bold uppercase tracking-[0.2em] text-[#6b6b6b]">{content.footer.contactTitle}</h3>
            <ul className="space-y-3 text-sm text-[#a3a3a3]">
              <li><a href={`mailto:${CONFIG.email}`} className="inline-flex items-center gap-2 transition-colors hover:text-[#2D73E3]"><Mail className="h-3.5 w-3.5" aria-hidden="true" />{CONFIG.email}</a></li>
              <li><a href={`tel:${CONFIG.phone.replace(/\D/g, "")}`} className="inline-flex items-center gap-2 transition-colors hover:text-[#2D73E3]"><Phone className="h-3.5 w-3.5" aria-hidden="true" />{CONFIG.phone}</a></li>
              <li><a href={CONFIG.instagram} target="_blank" rel="noopener" className="inline-flex items-center gap-2 transition-colors hover:text-[#2D73E3]"><AtSign className="h-3.5 w-3.5" aria-hidden="true" />Instagram</a></li>
              <li><a href={CONFIG.telegram} target="_blank" rel="noopener" className="inline-flex items-center gap-2 transition-colors hover:text-[#2D73E3]"><Send className="h-3.5 w-3.5" aria-hidden="true" />Telegram</a></li>
            </ul>
          </div>

          <div>
            <h3 className="mb-4 text-xs font-bold uppercase tracking-[0.2em] text-[#6b6b6b]">{content.footer.legalTitle}</h3>
            <p className="text-xs leading-relaxed text-[#6b6b6b]">{content.footer.disclaimer}</p>
          </div>
        </div>

        <div className="mt-16 border-t border-[#2a2a2a] pt-8 text-xs text-[#6b6b6b]">{content.footer.rights}</div>
      </div>
    </footer>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// MAIN
// ─────────────────────────────────────────────────────────────────────────────

export default function SkyFortLanding() {
  const [lang, setLang] = useState("uk");

  useEffect(() => {
    const saved = typeof window !== "undefined" ? localStorage.getItem("skyfort-lang") : null;
    if (saved && t[saved]) { setLang(saved); return; }
    if (typeof navigator !== "undefined") {
      const browserLang = navigator.language.toLowerCase();
      if (browserLang.startsWith("uk")) setLang("uk");
      else if (browserLang.startsWith("ru")) setLang("ru");
      else setLang("en");
    }
  }, []);

  useEffect(() => {
    if (typeof document !== "undefined" && t[lang]) {
      document.documentElement.lang = t[lang].htmlLang;
    }
  }, [lang]);

  const handleSetLang = (newLang) => {
    setLang(newLang);
    if (typeof window !== "undefined") {
      localStorage.setItem("skyfort-lang", newLang);
    }
  };

  const content = t[lang];

  return (
    <main className="min-h-screen bg-[#191919] text-white antialiased">
      <Nav lang={lang} setLang={handleSetLang} content={content} />
      <Hero content={content} />
      <Stats content={content} />
      <About content={content} />
      <Guides content={content} />
      <Steps content={content} />
      <FAQ content={content} />
      <FinalCTA content={content} />
      <Footer content={content} />
    </main>
  );
}
