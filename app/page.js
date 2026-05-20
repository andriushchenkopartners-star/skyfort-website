"use client";

import { useState, useEffect } from "react";
import {
  PiggyBank,
  ShieldCheck,
  TrendingUp,
  CalendarCheck,
  Home,
  GraduationCap,
  Compass,
  Download,
  ArrowRight,
  Globe,
  Mail,
  Phone,
  AtSign,
  Send,
} from "lucide-react";

// ─────────────────────────────────────────────────────────────────────────────
// TRANSLATIONS
// ─────────────────────────────────────────────────────────────────────────────

const t = {
  uk: {
    htmlLang: "uk",
    nav: { book: "Записатись" },
    hero: {
      kicker: "Licensed DR · Alberta · BC · Ontario",
      title: "Фінанси для українців у Канаді.",
      titleAccent: "Без банківських казок.",
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
      "На цій сторінці — мої освітні матеріали (всі CCO-approved) і можливість записатись на discovery call, де ми разом подивимось на твою ситуацію.",
    ],
    guidesTitle: "7 безкоштовних гайдів",
    guidesSub: "Завантаж, прочитай, повертайся з питаннями.",
    guides: [
      { icon: PiggyBank, title: "TFSA + Exempt Market", desc: "Як TFSA працює насправді. 5 помилок які знищать рахунок. Що таке exempt market і кому туди можна.", file: "01_SkyFort_TFSA_Exempt_Market.pdf" },
      { icon: ShieldCheck, title: "Pension Deficit", desc: "CPP + OAS = $1,800/міс. Витрати на пенсії $4,500. Як закрити різницю.", file: "02_SkyFort_Pension_Deficit.pdf" },
      { icon: TrendingUp, title: "GIC Alternatives", desc: "GIC дає 4%, інфляція з'їдає 3%. 4 альтернативи які працюють краще.", file: "03_SkyFort_GIC_Alternatives.pdf" },
      { icon: CalendarCheck, title: "90 Day Freedom", desc: "Покроковий план виходу з фінансової пастки $120K зарплати в Калгарі.", file: "04_SkyFort_90_Day_Freedom.pdf" },
      { icon: Home, title: "FHSA · перша квартира", desc: "$8K/рік tax-deductible, $40K lifetime. Як використати правильно.", file: "05_SkyFort_FHSA_First_Home.pdf" },
      { icon: GraduationCap, title: "RESP · освіта дитини", desc: "Уряд додає $7,200 безкоштовно. Три стратегії — від $208 до $50K одразу.", file: "06_SkyFort_RESP_Education.pdf" },
      { icon: Compass, title: "Newcomer · 30 кроків", desc: "Що зробити в перші 90 днів у Канаді. Від SIN до першого TFSA.", file: "07_SkyFort_Newcomer_30_Steps.pdf" },
    ],
    stepsTitle: "Як це працює",
    steps: [
      { n: "01", title: "Завантаж гайд", desc: "Вибери тему яка тебе зараз цікавить. Прочитай. Без email-форм, без spam." },
      { n: "02", title: "Запишись на дзвінок", desc: "30 хвилин. Безкоштовно. Discovery call — це регуляторний KYC + suitability крок, не продаж." },
      { n: "03", title: "Отримай план", desc: "Якщо ти Eligible Investor — пропоную exempt market варіанти. Якщо ні — даю освітній план через TFSA/RRSP." },
    ],
    faqTitle: "Питання які ставлять усі",
    faq: [
      { q: "Це безкоштовно? У чому каверза?", a: "Discovery call безкоштовний. Якщо рекомендую exempt market продукт і ти на нього підписуєшся — я отримую commission від issuer (це стандарт у Канаді, прозоро прописано в Offering Memorandum). Якщо ні — нічого не плачу, нічого не винний." },
      { q: "Чим ти відрізняєшся від банку?", a: "Банк може продати тільки те що у банку. Я як Dealing Representative маю доступ до exempt market — це private MICs, REITs, private lending з historical returns 7-12% — те що не продається через RBC чи TD." },
      { q: "Що таке Eligible Investor?", a: "CSA NI 45-106 категорія. Спрощено: $75K+ income solo / $125K+ household, або $400K net assets ex-primary residence. На discovery call я перевіряю статус через офіційну анкету." },
      { q: "Я newcomer, в мене ще немає $400K. Чи є сенс говорити?", a: "Так. 80% моїх клієнтів починають з TFSA/RRSP setup і освіти. Exempt market — це коли вже є infrastructure. Дзвінок все одно корисний — побудуєш roadmap на 2-3 роки." },
    ],
    ctaTitle: "Готовий розібратись?",
    ctaSub: "30 хвилин · Zoom або Google Meet · Українською, російською або англійською.",
    ctaBtn: "Записатись на discovery call",
    footer: {
      tagline: "Wealth building для українців у Канаді",
      contactTitle: "Контакти",
      legalTitle: "Регулятор",
      disclaimer: "Andrii Andriushchenko — Dealing Representative registered with Axcess Capital Advisors Inc. (EMD). Personally registered: Alberta, British Columbia, Ontario. Content on this site is educational and is not investment advice or a solicitation to buy/sell securities. Exempt market investments are restricted to Eligible Investors as defined under National Instrument 45-106. Past performance does not guarantee future results.",
      rights: "© 2026 SkyFort Wealth. All rights reserved.",
    },
  },

  ru: {
    htmlLang: "ru",
    nav: { book: "Записаться" },
    hero: {
      kicker: "Licensed DR · Alberta · BC · Ontario",
      title: "Финансы для русскоязычных в Канаде.",
      titleAccent: "Без банковских сказок.",
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
      "Я Андрей Андрющенко — Licensed Dealing Representative, зарегистрирован с Axcess Capital Advisors Inc. Лично лицензирован в Альберте, Британской Колумбии и Онтарио.",
      "Работаю с людьми, которые приехали в Канаду и хотят разобраться как реально работает местная финансовая система — без банковских продавцов, без TikTok-гуру, без обещаний 25% доходности.",
      "На этой странице — мои образовательные материалы (все CCO-approved) и возможность записаться на discovery call, где мы вместе посмотрим на твою ситуацию.",
    ],
    guidesTitle: "7 бесплатных гайдов",
    guidesSub: "Скачай, прочитай, возвращайся с вопросами.",
    guides: [
      { icon: PiggyBank, title: "TFSA + Exempt Market", desc: "Как TFSA работает на самом деле. 5 ошибок которые уничтожат счёт. Что такое exempt market и кому туда можно.", file: "01_SkyFort_TFSA_Exempt_Market.pdf" },
      { icon: ShieldCheck, title: "Pension Deficit", desc: "CPP + OAS = $1,800/мес. Расходы на пенсии $4,500. Как закрыть разницу.", file: "02_SkyFort_Pension_Deficit.pdf" },
      { icon: TrendingUp, title: "GIC Alternatives", desc: "GIC даёт 4%, инфляция съедает 3%. 4 альтернативы которые работают лучше.", file: "03_SkyFort_GIC_Alternatives.pdf" },
      { icon: CalendarCheck, title: "90 Day Freedom", desc: "Пошаговый план выхода из финансовой ловушки $120K зарплаты в Калгари.", file: "04_SkyFort_90_Day_Freedom.pdf" },
      { icon: Home, title: "FHSA · первая квартира", desc: "$8K/год tax-deductible, $40K lifetime. Как использовать правильно.", file: "05_SkyFort_FHSA_First_Home.pdf" },
      { icon: GraduationCap, title: "RESP · образование ребёнка", desc: "Правительство добавляет $7,200 бесплатно. Три стратегии — от $208 до $50K сразу.", file: "06_SkyFort_RESP_Education.pdf" },
      { icon: Compass, title: "Newcomer · 30 шагов", desc: "Что сделать в первые 90 дней в Канаде. От SIN до первого TFSA.", file: "07_SkyFort_Newcomer_30_Steps.pdf" },
    ],
    stepsTitle: "Как это работает",
    steps: [
      { n: "01", title: "Скачай гайд", desc: "Выбери тему которая тебя сейчас интересует. Прочитай. Без email-форм, без spam." },
      { n: "02", title: "Запишись на звонок", desc: "30 минут. Бесплатно. Discovery call — это регуляторный KYC + suitability шаг, не продажа." },
      { n: "03", title: "Получи план", desc: "Если ты Eligible Investor — предлагаю exempt market варианты. Если нет — даю образовательный план через TFSA/RRSP." },
    ],
    faqTitle: "Вопросы которые задают все",
    faq: [
      { q: "Это бесплатно? В чём подвох?", a: "Discovery call бесплатный. Если рекомендую exempt market продукт и ты на него подписываешься — я получаю commission от issuer (это стандарт в Канаде, прозрачно прописано в Offering Memorandum). Если нет — ничего не платишь, ничего не должен." },
      { q: "Чем ты отличаешься от банка?", a: "Банк может продать только то что в банке. Я как Dealing Representative имею доступ к exempt market — это private MICs, REITs, private lending с historical returns 7-12% — то что не продаётся через RBC или TD." },
      { q: "Что такое Eligible Investor?", a: "CSA NI 45-106 категория. Упрощённо: $75K+ income solo / $125K+ household, или $400K net assets ex-primary residence. На discovery call я проверяю статус через официальную анкету." },
      { q: "Я newcomer, у меня ещё нет $400K. Есть ли смысл говорить?", a: "Да. 80% моих клиентов начинают с TFSA/RRSP setup и образования. Exempt market — это когда уже есть infrastructure. Звонок всё равно полезен — построишь roadmap на 2-3 года." },
    ],
    ctaTitle: "Готов разобраться?",
    ctaSub: "30 минут · Zoom или Google Meet · На украинском, русском или английском.",
    ctaBtn: "Записаться на discovery call",
    footer: {
      tagline: "Wealth building для русскоязычных в Канаде",
      contactTitle: "Контакты",
      legalTitle: "Регулятор",
      disclaimer: "Andrii Andriushchenko — Dealing Representative registered with Axcess Capital Advisors Inc. (EMD). Personally registered: Alberta, British Columbia, Ontario. Content on this site is educational and is not investment advice or a solicitation to buy/sell securities. Exempt market investments are restricted to Eligible Investors as defined under National Instrument 45-106. Past performance does not guarantee future results.",
      rights: "© 2026 SkyFort Wealth. All rights reserved.",
    },
  },

  en: {
    htmlLang: "en",
    nav: { book: "Book a call" },
    hero: {
      kicker: "Licensed DR · Alberta · BC · Ontario",
      title: "Canadian finance for newcomers.",
      titleAccent: "No bank fairy tales.",
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
      "I'm Andrii Andriushchenko — a Licensed Dealing Representative registered with Axcess Capital Advisors Inc. Personally registered in Alberta, British Columbia, and Ontario.",
      "I work with people who moved to Canada and want to understand how the financial system actually works here — without bank salespeople, without TikTok gurus, without promises of 25% returns.",
      "On this page: my educational materials (all CCO-approved) and the option to book a discovery call where we look at your situation together.",
    ],
    guidesTitle: "7 free guides",
    guidesSub: "Download, read, come back with questions.",
    guides: [
      { icon: PiggyBank, title: "TFSA + Exempt Market", desc: "How TFSA actually works. 5 mistakes that wreck the account. What exempt market is and who can access it.", file: "01_SkyFort_TFSA_Exempt_Market.pdf" },
      { icon: ShieldCheck, title: "Pension Deficit", desc: "CPP + OAS = $1,800/mo. Retirement expenses $4,500. How to close the gap.", file: "02_SkyFort_Pension_Deficit.pdf" },
      { icon: TrendingUp, title: "GIC Alternatives", desc: "GICs pay 4%, inflation eats 3%. 4 alternatives that work better.", file: "03_SkyFort_GIC_Alternatives.pdf" },
      { icon: CalendarCheck, title: "90 Day Freedom", desc: "Step-by-step exit from the $120K-salary trap in Calgary.", file: "04_SkyFort_90_Day_Freedom.pdf" },
      { icon: Home, title: "FHSA · first home", desc: "$8K/yr tax-deductible, $40K lifetime. How to use it right.", file: "05_SkyFort_FHSA_First_Home.pdf" },
      { icon: GraduationCap, title: "RESP · child's education", desc: "Government adds $7,200 for free. Three strategies — from $208/mo to $50K lump sum.", file: "06_SkyFort_RESP_Education.pdf" },
      { icon: Compass, title: "Newcomer · 30 steps", desc: "What to do in your first 90 days in Canada. From SIN to your first TFSA.", file: "07_SkyFort_Newcomer_30_Steps.pdf" },
    ],
    stepsTitle: "How it works",
    steps: [
      { n: "01", title: "Download a guide", desc: "Pick the topic you're thinking about right now. Read. No email forms, no spam." },
      { n: "02", title: "Book a call", desc: "30 minutes. Free. The discovery call is a regulatory KYC + suitability step, not a sales pitch." },
      { n: "03", title: "Get a plan", desc: "If you're an Eligible Investor — I show exempt market options. If not — an educational plan via TFSA/RRSP." },
    ],
    faqTitle: "Questions everyone asks",
    faq: [
      { q: "Is it really free? What's the catch?", a: "The discovery call is free. If I recommend an exempt market product and you subscribe to it, I receive commission from the issuer (this is standard in Canada and transparently disclosed in the Offering Memorandum). If not — you pay nothing, you owe nothing." },
      { q: "How are you different from a bank?", a: "A bank can only sell what's inside the bank. As a Dealing Representative I have access to the exempt market — private MICs, REITs, private lending with historical returns of 7-12% — products you can't get through RBC or TD." },
      { q: "What's an Eligible Investor?", a: "A CSA NI 45-106 category. Simplified: $75K+ solo income / $125K+ household, or $400K net assets excluding primary residence. I verify status on the discovery call via the official questionnaire." },
      { q: "I'm a newcomer and don't have $400K yet. Is there still a point in talking?", a: "Yes. 80% of my clients start with TFSA/RRSP setup and education. Exempt market comes when the infrastructure is built. The call is still useful — you walk away with a 2–3 year roadmap." },
    ],
    ctaTitle: "Ready to figure it out?",
    ctaSub: "30 minutes · Zoom or Google Meet · Available in Ukrainian, Russian, or English.",
    ctaBtn: "Book a discovery call",
    footer: {
      tagline: "Wealth building for newcomers to Canada",
      contactTitle: "Contact",
      legalTitle: "Regulatory",
      disclaimer: "Andrii Andriushchenko — Dealing Representative registered with Axcess Capital Advisors Inc. (EMD). Personally registered: Alberta, British Columbia, Ontario. Content on this site is educational and is not investment advice or a solicitation to buy/sell securities. Exempt market investments are restricted to Eligible Investors as defined under National Instrument 45-106. Past performance does not guarantee future results.",
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
    { code: "uk", label: "УК", aria: "Українською" },
    { code: "ru", label: "RU", aria: "На русском" },
    { code: "en", label: "EN", aria: "In English" },
  ];

  return (
    <div
      className="flex items-center gap-0 rounded-full border border-white/10 bg-white/5 p-1 backdrop-blur-sm"
      role="group"
      aria-label="Language selector"
    >
      <Globe className="ml-2 h-3.5 w-3.5 text-white/40" aria-hidden="true" />
      {langs.map((l) => (
        <button
          key={l.code}
          onClick={() => setLang(l.code)}
          aria-label={l.aria}
          aria-pressed={lang === l.code}
          className={`rounded-full px-3 py-1 text-xs font-medium tracking-wide transition-all ${
            lang === l.code
              ? "bg-white text-zinc-900"
              : "text-white/60 hover:text-white"
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
    <nav
      className="fixed left-0 right-0 top-0 z-50 border-b border-white/5 bg-zinc-950/70 backdrop-blur-xl"
      aria-label="Primary navigation"
    >
      <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
        <a href="#top" className="flex items-center gap-2" aria-label="SkyFort home">
          <div className="flex h-8 w-8 items-center justify-center rounded-md bg-white text-zinc-900">
            <span className="font-serif text-lg font-bold leading-none">S</span>
          </div>
          <span className="font-serif text-lg tracking-tight text-white">SkyFort</span>
        </a>
        <div className="flex items-center gap-3">
          <LangSwitcher lang={lang} setLang={setLang} />
          <a
            href={CONFIG.calendlyUrl}
            target="_blank"
            rel="noopener"
            className="hidden rounded-full bg-white px-4 py-2 text-xs font-medium tracking-wide text-zinc-900 transition-all hover:bg-zinc-200 sm:inline-flex"
          >
            {content.nav.book}
          </a>
        </div>
      </div>
    </nav>
  );
}

function Hero({ content }) {
  return (
    <section id="top" className="relative overflow-hidden pt-40 pb-32 md:pt-48 md:pb-40" aria-labelledby="hero-title">
      <div className="pointer-events-none absolute inset-0 -z-10" aria-hidden="true">
        <div className="absolute left-1/2 top-0 h-[600px] w-[1200px] -translate-x-1/2 rounded-full bg-blue-600/10 blur-[120px]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,rgb(9,9,11)_70%)]" />
      </div>

      <div className="mx-auto max-w-6xl px-6">
        <p className="mb-6 text-xs font-medium uppercase tracking-[0.2em] text-blue-400">{content.hero.kicker}</p>
        <h1 id="hero-title" className="font-serif text-5xl leading-[1.05] tracking-tight text-white md:text-7xl lg:text-[88px]">
          {content.hero.title}
          <br />
          <span className="italic text-zinc-400">{content.hero.titleAccent}</span>
        </h1>
        <p className="mt-8 max-w-2xl text-lg text-zinc-400 md:text-xl">{content.hero.sub}</p>
        <div className="mt-10 flex flex-col gap-3 sm:flex-row">
          <a href={CONFIG.calendlyUrl} target="_blank" rel="noopener" className="group inline-flex items-center justify-center gap-2 rounded-full bg-white px-6 py-3.5 text-sm font-medium text-zinc-900 transition-all hover:bg-zinc-200">
            {content.hero.ctaPrimary}
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" aria-hidden="true" />
          </a>
          <a href="#guides" className="inline-flex items-center justify-center gap-2 rounded-full border border-white/20 px-6 py-3.5 text-sm font-medium text-white transition-all hover:bg-white/5">
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
    <section className="border-y border-white/5 bg-zinc-950/50" aria-label="Key statistics">
      <div className="mx-auto grid max-w-6xl grid-cols-2 gap-8 px-6 py-16 md:grid-cols-4">
        {content.stats.map((s, i) => (
          <div key={i} className="border-l border-white/10 pl-5">
            <div className="font-serif text-3xl text-white md:text-4xl">{s.value}</div>
            <div className="mt-2 text-xs leading-relaxed text-zinc-500 md:text-sm">{s.label}</div>
          </div>
        ))}
      </div>
    </section>
  );
}

function About({ content }) {
  return (
    <section className="py-24 md:py-32" id="about" aria-labelledby="about-title">
      <div className="mx-auto max-w-3xl px-6">
        <h2 id="about-title" className="font-serif text-3xl leading-tight text-white md:text-5xl">{content.aboutTitle}</h2>
        <div className="mt-10 space-y-6">
          {content.about.map((p, i) => (
            <p key={i} className="text-lg leading-relaxed text-zinc-400">{p}</p>
          ))}
        </div>
      </div>
    </section>
  );
}

function Guides({ content }) {
  return (
    <section id="guides" className="py-24 md:py-32" aria-labelledby="guides-title">
      <div className="mx-auto max-w-6xl px-6">
        <div className="mb-16 max-w-2xl">
          <h2 id="guides-title" className="font-serif text-3xl leading-tight text-white md:text-5xl">{content.guidesTitle}</h2>
          <p className="mt-4 text-lg text-zinc-400">{content.guidesSub}</p>
        </div>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {content.guides.map((g, i) => {
            const Icon = g.icon;
            return (
              <a key={i} href={`${CONFIG.pdfBaseUrl}/${g.file}`} target="_blank" rel="noopener" className="group relative flex flex-col rounded-2xl border border-white/10 bg-white/[0.02] p-6 transition-all hover:border-white/20 hover:bg-white/[0.04]" aria-label={`Download ${g.title} PDF`}>
                <div className="mb-5 flex h-10 w-10 items-center justify-center rounded-lg bg-blue-500/10 text-blue-400">
                  <Icon className="h-5 w-5" aria-hidden="true" />
                </div>
                <h3 className="font-serif text-xl text-white">{g.title}</h3>
                <p className="mt-3 flex-1 text-sm leading-relaxed text-zinc-400">{g.desc}</p>
                <div className="mt-5 inline-flex items-center gap-1.5 text-xs font-medium tracking-wide text-blue-400">
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
    <section className="py-24 md:py-32" aria-labelledby="steps-title">
      <div className="mx-auto max-w-6xl px-6">
        <h2 id="steps-title" className="mb-16 font-serif text-3xl leading-tight text-white md:text-5xl">{content.stepsTitle}</h2>
        <ol className="grid gap-12 md:grid-cols-3">
          {content.steps.map((s, i) => (
            <li key={i}>
              <div className="mb-6 font-serif text-2xl text-blue-400">{s.n}</div>
              <h3 className="font-serif text-2xl text-white">{s.title}</h3>
              <p className="mt-4 text-zinc-400">{s.desc}</p>
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
    <section className="py-24 md:py-32" id="faq" aria-labelledby="faq-title">
      <div className="mx-auto max-w-3xl px-6">
        <h2 id="faq-title" className="mb-16 font-serif text-3xl leading-tight text-white md:text-5xl">{content.faqTitle}</h2>
        <dl className="space-y-4">
          {content.faq.map((item, i) => (
            <div key={i} className="overflow-hidden rounded-xl border border-white/10 bg-white/[0.02]">
              <dt>
                <button onClick={() => setOpen(open === i ? -1 : i)} aria-expanded={open === i} className="flex w-full items-start justify-between gap-4 px-6 py-5 text-left transition-colors hover:bg-white/[0.02]">
                  <span className="font-serif text-lg text-white">{item.q}</span>
                  <span className={`mt-1 text-2xl leading-none text-zinc-500 transition-transform ${open === i ? "rotate-45" : ""}`} aria-hidden="true">+</span>
                </button>
              </dt>
              {open === i && (
                <dd className="border-t border-white/5 px-6 py-5 text-zinc-400">{item.a}</dd>
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
    <section className="py-24 md:py-32" aria-labelledby="cta-title">
      <div className="mx-auto max-w-3xl px-6 text-center">
        <h2 id="cta-title" className="font-serif text-4xl leading-tight text-white md:text-6xl">{content.ctaTitle}</h2>
        <p className="mx-auto mt-6 max-w-xl text-lg text-zinc-400">{content.ctaSub}</p>
        <a href={CONFIG.calendlyUrl} target="_blank" rel="noopener" className="group mt-10 inline-flex items-center justify-center gap-2 rounded-full bg-white px-8 py-4 text-base font-medium text-zinc-900 transition-all hover:bg-zinc-200">
          {content.ctaBtn}
          <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" aria-hidden="true" />
        </a>
      </div>
    </section>
  );
}

function Footer({ content }) {
  return (
    <footer className="border-t border-white/5 bg-zinc-950 pt-20 pb-12" aria-labelledby="footer-title">
      <h2 id="footer-title" className="sr-only">Footer</h2>
      <div className="mx-auto max-w-6xl px-6">
        <div className="grid gap-12 md:grid-cols-3">
          <div>
            <div className="flex items-center gap-2">
              <div className="flex h-8 w-8 items-center justify-center rounded-md bg-white text-zinc-900">
                <span className="font-serif text-lg font-bold leading-none">S</span>
              </div>
              <span className="font-serif text-lg text-white">SkyFort</span>
            </div>
            <p className="mt-4 text-sm text-zinc-500">{content.footer.tagline}</p>
          </div>

          <div>
            <h3 className="mb-4 text-xs font-medium uppercase tracking-[0.2em] text-zinc-500">{content.footer.contactTitle}</h3>
            <ul className="space-y-3 text-sm text-zinc-400">
              <li><a href={`mailto:${CONFIG.email}`} className="inline-flex items-center gap-2 transition-colors hover:text-white"><Mail className="h-3.5 w-3.5" aria-hidden="true" />{CONFIG.email}</a></li>
              <li><a href={`tel:${CONFIG.phone.replace(/\D/g, "")}`} className="inline-flex items-center gap-2 transition-colors hover:text-white"><Phone className="h-3.5 w-3.5" aria-hidden="true" />{CONFIG.phone}</a></li>
              <li><a href={CONFIG.instagram} target="_blank" rel="noopener" className="inline-flex items-center gap-2 transition-colors hover:text-white"><AtSign className="h-3.5 w-3.5" aria-hidden="true" />Instagram</a></li>
              <li><a href={CONFIG.telegram} target="_blank" rel="noopener" className="inline-flex items-center gap-2 transition-colors hover:text-white"><Send className="h-3.5 w-3.5" aria-hidden="true" />Telegram</a></li>
            </ul>
          </div>

          <div>
            <h3 className="mb-4 text-xs font-medium uppercase tracking-[0.2em] text-zinc-500">{content.footer.legalTitle}</h3>
            <p className="text-xs leading-relaxed text-zinc-500">{content.footer.disclaimer}</p>
          </div>
        </div>

        <div className="mt-16 border-t border-white/5 pt-8 text-xs text-zinc-600">{content.footer.rights}</div>
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
    if (saved && t[saved]) {
      setLang(saved);
      return;
    }
    if (typeof navigator !== "undefined") {
      const browserLang = navigator.language.toLowerCase();
      if (browserLang.startsWith("uk")) setLang("uk");
      else if (browserLang.startsWith("ru")) setLang("ru");
      else setLang("en");
    }
  }, []);

  // Update <html lang> attribute when language changes (for accessibility tools and SEO crawlers that re-render)
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
    <main className="min-h-screen bg-zinc-950 text-white antialiased">
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
