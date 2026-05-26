// Translations for the homepage (and reusable across pages once i18n routing lands).
// Lucide icon refs travel with their entries so guide cards stay self-contained.
//
// When Phase 2 introduces real /uk, /ru, /en routes via next-intl, this file
// can be split into per-locale JSON files. Until then, single dictionary keeps
// edits in one place.

import {
  PiggyBank,
  ShieldCheck,
  TrendingUp,
  CalendarCheck,
  Home,
  GraduationCap,
  Compass,
  MessageCircle,
} from "lucide-react";

export const SUPPORTED_LOCALES = ["uk", "ru", "en"];

export const dictionary = {
  uk: {
    htmlLang: "uk",
    nav: { book: "Записатись", about: "Про мене" },
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
      { value: "7–12%", label: "Історично · приватні MICs та REITs" },
      { value: "$25K+", label: "Поріг входу в exempt market (Eligible)" },
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
    calcPromo: {
      kicker: "Інтерактивний інструмент",
      title: "Скільки буде у твоєму TFSA через 20 років?",
      desc: "Не теорія. Введи свої цифри, побач різницю між банком, GIC і diversified портфоліо своїми очима.",
      cta: "Відкрити калькулятор",
    },
    stepsTitle: "Як це працює",
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
    nav: { book: "Записаться", about: "Обо мне" },
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
      { value: "7–12%", label: "Исторически · частные MICs и REITs" },
      { value: "$25K+", label: "Порог входа в exempt market (Eligible)" },
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
    calcPromo: {
      kicker: "Интерактивный инструмент",
      title: "Сколько будет в твоём TFSA через 20 лет?",
      desc: "Не теория. Введи свои цифры, увидь разницу между банком, GIC и diversified портфолио своими глазами.",
      cta: "Открыть калькулятор",
    },
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
    nav: { book: "Book a call", about: "About" },
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
      { value: "7–12%", label: "Historical · private MICs and REITs" },
      { value: "$25K+", label: "Exempt market entry (Eligible Investor)" },
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
    calcPromo: {
      kicker: "Interactive tool",
      title: "How much will your TFSA have in 20 years?",
      desc: "Not theory. Enter your numbers, see the gap between bank, GIC, and diversified portfolio with your own eyes.",
      cta: "Open the calculator",
    },
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

// Resolve the language string a user has chosen (localStorage / navigator) to a
// supported locale, with safe fallback.
export function resolveLocale(input) {
  if (!input) return "uk";
  const lang = String(input).toLowerCase().slice(0, 2);
  return SUPPORTED_LOCALES.includes(lang) ? lang : "uk";
}
