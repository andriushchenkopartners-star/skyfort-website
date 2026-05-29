// app/[locale]/porivnyannia/page.js
// EMD vs CIRO vs Insurance comparison page (audit recommendation 3.12).
// One of the highest-search-volume YMYL queries in Canada — people are
// confused about which advisor license they actually need. Ranking for
// this question pre-qualifies traffic both for Andrii's pipeline (EMD) and
// referral relationships with CIRO advisors (NI 31-103 §13.7-13.10).
//
// IMPORTANT framing: every license has its purpose. The page does NOT
// claim EMD is "better." Each license fits different client situations.
// Andrii is EMD; for ETFs/mutual funds the page openly recommends a
// CIRO-registered advisor; for insurance, an insurance broker.

import Link from "next/link";
import {
  CheckCircle2,
  XCircle,
  Building2,
  Users,
  GraduationCap,
  DollarSign,
  Shield,
  Briefcase,
  Target,
  ExternalLink,
} from "lucide-react";
import Logo from "../../_components/Logo";
import Breadcrumbs from "../../_components/Breadcrumbs";
import LangSwitcher from "../../_components/LangSwitcher";
import StaticFaq from "../../_components/StaticFaq";
import AuthorByline from "../../_components/AuthorByline";
import RelatedLinks from "../../_components/RelatedLinks";
import { SUPPORTED_LOCALES } from "../../_i18n/dictionary";

const NRD_URL = "https://info.securities-administrators.ca/nrsmobile/nrssearch.aspx";
const CIRO_URL = "https://www.ciro.ca/";
const AIC_URL = "https://www.abcouncil.ab.ca/";
const CALENDLY = "https://calendly.com/andriushchenko-partners/new-meeting";

// ─── Comparison content per locale ─────────────────────────────────────────

const COPY = {
  uk: {
    titleMeta: "EMD vs CIRO vs Insurance — який радник у Канаді тобі насправді потрібен?",
    descriptionMeta:
      "Прозоре порівняння 3 типів фінансових ліцензій у Канаді 2026: EMD, CIRO (колишні IIROC + MFDA), Insurance. Хто що продає, кому підходить, як перевірити. Освітньо.",
    kicker: "Порівняння ліцензій",
    title: "EMD vs CIRO vs Insurance",
    subtitle: "Який канадський фінансовий радник тобі насправді потрібен?",
    intro:
      "У Канаді три основні категорії регульованих фінансових professionals — і кожна робить РІЗНУ роботу. Більшість людей за життя потребують більше ніж одну. Ця сторінка пояснює коли яка ліцензія потрібна, у простих словах, без жаргону.",
    historyNote:
      "У 2023 IIROC і MFDA об'єдналися в єдиний регулятор — CIRO (Canadian Investment Regulatory Organization). У цій таблиці ми вживаємо «CIRO» як парасольковий термін для public market (ETF, mutual funds, акції). EMD і Insurance — окремі ліцензії.",
    aspectLabels: {
      regulator: "Регулятор",
      products: "Які продукти продає",
      clientBar: "Кому доступно",
      compensation: "Типова оплата",
      education: "Освітні вимоги",
      framework: "Регуляторний фреймворк",
      bestFor: "Найкраще для",
      verify: "Як перевірити",
    },
    licenses: [
      {
        name: "EMD",
        fullName: "Exempt Market Dealer",
        andriiBadge: "✅ Це я",
        accent: "brand",
        regulator: "CSA (провінційний — ASC в Альберті)",
        products: "Приватні securities: MIC (mortgage investment corp.), REIT, development LP, private lending funds, deals прямо з issuers. Усі продукти доступні через Offering Memorandum (NI 45-106).",
        clientBar: "Тільки Eligible Investor або Accredited Investor (вищий поріг доходу/активів). Не для широкого ринку.",
        compensation: "Commission від issuer при підписці, прозоро вказана в OM. Без AUM fee. Discovery call безкоштовний.",
        education: "Exempt Market Proficiency Course (IFSE Institute) + provincial registration.",
        framework: "NI 31-103 (registration), NI 45-106 (prospectus exemptions).",
        bestFor: "Eligible Investors які хочуть приватний ринок як додаток до publicly-traded портфоліо. Diversification, доступ до alternative asset class.",
        verifyLabel: "CSA NRD (моя реєстрація: #4575551)",
        verifyUrl: NRD_URL,
      },
      {
        name: "CIRO",
        fullName: "Canadian Investment Regulatory Organization",
        andriiBadge: "❌ Не я",
        accent: "neutral",
        regulator: "CIRO (національний SRO, нагляд CSA). Заснований 2023 з об'єднання IIROC + MFDA.",
        products: "Публічні securities: ETF, mutual funds, акції на біржі, облігації, options, GIC. Усе що торгується на TSX, NYSE, NASDAQ, тощо.",
        clientBar: "Будь-хто. Немає мінімального порогу.",
        compensation: "Зазвичай % від AUM (1–1.5%/рік) або per-trade commission. Деякі fee-only моделі (flat $/рік).",
        education: "CSC (Canadian Securities Course) + WME (Wealth Management Essentials) для investment advisor; різні courses для портфельних managers.",
        framework: "UMIR (Universal Market Integrity Rules), NI 31-103, CIRO Member Rules.",
        bestFor: "Більшість канадських інвесторів. Особливо якщо хочеш self-directed або keep things simple через broad-market ETF. Якщо в тебе >$100K — є сенс розглядати fee-only CIRO advisor.",
        verifyLabel: "CIRO advisor search",
        verifyUrl: CIRO_URL,
      },
      {
        name: "Insurance",
        fullName: "Life Insurance License (provincial)",
        andriiBadge: "❌ Не я",
        accent: "neutral",
        regulator: "Provincial Insurance Council (у Альберті — AIC, Alberta Insurance Council).",
        products: "Life insurance (term, whole life, universal), critical illness, disability insurance, annuities, segregated funds.",
        clientBar: "Будь-хто.",
        compensation: "Commission від страхової компанії при оформленні поліса. Часто структурована як upfront + trail.",
        education: "LLQP (Life License Qualification Program) + provincial exam.",
        framework: "Provincial Insurance Acts. У Альберті — Alberta Insurance Act + AIC bylaws.",
        bestFor: "Якщо у тебе залежні (діти, чоловік/дружина, батьки), або власний бізнес з key-person risk. Чим раніше беремо term life поки здорові — тим дешевша премія за роки.",
        verifyLabel: "AIC license search",
        verifyUrl: AIC_URL,
      },
    ],
    decisionTitle: "Швидке рішення: яка ліцензія тобі потрібна?",
    decisionItems: [
      {
        scenario: "Хочу вкласти $20K у ETF (S&P 500, broad market) у TFSA",
        answer: "CIRO advisor (або self-directed broker: Questrade, Wealthsimple).",
        bg: "neutral",
      },
      {
        scenario: "Маю $150K готівки і shopping for advisor",
        answer: "Спочатку — CIRO fee-only advisor для public market core. Потім — EMD для diversification у private market якщо ти Eligible Investor.",
        bg: "neutral",
      },
      {
        scenario: "Я Eligible Investor, хочу приватний MIC або REIT",
        answer: "EMD (це я). Discovery call → Suitability Assessment → Offering Memorandum review.",
        bg: "brand",
      },
      {
        scenario: "Дружина має 2 дітей під 10 років і немає life insurance",
        answer: "Insurance broker. Найдешевше — term life поки молода і здорова.",
        bg: "neutral",
      },
      {
        scenario: "Я тільки приїхав за CUAET. У мене $5K. З чого почати?",
        answer: "TFSA через self-directed (Wealthsimple/Questrade) — broad-market ETF (XEQT, VEQT). EMD/CIRO/Insurance — пізніше, по мірі росту.",
        bg: "neutral",
      },
    ],
    faqTitle: "Часті питання про ліцензії",
    faq: [
      {
        q: "Чи може одна людина мати EMD + CIRO + Insurance ліцензії одночасно?",
        a: "Теоретично так, але це майже не зустрічається. Кожна ліцензія вимагає окремих exams, окремої compliance інфраструктури, і часто конфлікт інтересів. Більшість professionals спеціалізуються в одній. Часто-зустрічається комбінація: CIRO + Insurance (через окрему insurance брокерську фірму).",
      },
      {
        q: "Що сталось з MFDA? Я бачив цю абревіатуру раніше.",
        a: "MFDA (Mutual Fund Dealers Association) історично була окремим SRO для mutual fund dealers (не для повного public market). У 2023 році MFDA об'єдналася з IIROC в єдиний регулятор — CIRO. Якщо advisor каже «я MFDA» — він тепер під CIRO. Стара термінологія може ще зустрічатись у документації до 2023 року.",
      },
      {
        q: "EMD дає вищу дохідність ніж CIRO public market?",
        a: "Це неправильне питання. EMD і CIRO — це РІЗНІ класи активів (приватний vs публічний), не «кращий vs гірший». Приватний ринок зазвичай має менше ліквідності, довший horizon, інший профіль ризику. У diversified плані вони доповнюють одне одного. Хто говорить «EMD дає більше» — або не розуміє, або продає.",
      },
      {
        q: "Чи потрібно мати CIRO advisor якщо я self-directed на Wealthsimple?",
        a: "Ні. Self-directed брокер (Wealthsimple Trade, Questrade, IB) — це коли ти сам обираєш ETF/акції/mutual funds. Жодних рекомендацій тобі не дають. Просто платформа виконує твої trades. Підходить для тих хто хоче простоту і не потребує персонального плану.",
      },
      {
        q: "Чи може EMD радник продати мені ETF?",
        a: "Ні. EMD ліцензія дозволяє продавати лише exempt market securities (private MICs, REITs, LPs). ETF — це публічний security який торгується на біржі, він поза EMD scope. Якщо EMD пропонує тобі ETF — це регуляторне порушення.",
      },
      {
        q: "Як я можу перевірити будь-якого радника у Канаді?",
        a: "CSA NRD search (info.securities-administrators.ca/nrsmobile/nrssearch.aspx) покриває EMD, CIRO IIROC і CIRO MFDA registrations. Для Insurance — окремий пошук на сайті provincial Insurance Council (наприклад AIC.ab.ca для Альберти). Якщо людину не знайти в жодному з них — це червоний прапор.",
      },
    ],
    bottomCtaTitle: "Не впевнений яка категорія тобі потрібна?",
    bottomCtaText:
      "Discovery call — 30 хвилин, безкоштовно. Розберемо твою ситуацію і визначимо що тобі насправді потрібно: EMD, CIRO, Insurance, або їх комбінація. Якщо EMD не для тебе — направлю до CIRO/Insurance advisor якого знаю особисто.",
    bottomCtaBtn: "Записатись на discovery call",
    eligibilityPromoTitle: "Або перевір за 60 секунд — чи ти Eligible Investor?",
    eligibilityPromoBody: "4 питання, без email — і знаєш чи відкритий тобі exempt market (моя зона), чи краще починати з TFSA/RRSP/FHSA (зона CIRO).",
    eligibilityPromoCta: "Пройти self-check",
    crumbHome: "Головна",
    crumbThis: "Порівняння ліцензій",
    verifyLinkLabel: "Перевір мене за 3 хвилини",
  },
  ru: {
    titleMeta: "EMD vs CIRO vs Insurance — какой советник в Канаде тебе действительно нужен?",
    descriptionMeta:
      "Прозрачное сравнение 3 типов финансовых лицензий в Канаде 2026: EMD, CIRO (бывшие IIROC + MFDA), Insurance. Кто что продаёт, кому подходит, как проверить. Образовательно.",
    kicker: "Сравнение лицензий",
    title: "EMD vs CIRO vs Insurance",
    subtitle: "Какой канадский финансовый советник тебе действительно нужен?",
    intro:
      "В Канаде три основные категории регулируемых финансовых professionals — и каждая делает РАЗНУЮ работу. Большинство людей за жизнь нуждаются больше чем в одной. Эта страница объясняет когда какая лицензия нужна, простыми словами, без жаргона.",
    historyNote:
      "В 2023 IIROC и MFDA объединились в единый регулятор — CIRO (Canadian Investment Regulatory Organization). В этой таблице мы используем «CIRO» как зонтичный термин для public market (ETF, mutual funds, акции). EMD и Insurance — отдельные лицензии.",
    aspectLabels: {
      regulator: "Регулятор",
      products: "Какие продукты продаёт",
      clientBar: "Кому доступно",
      compensation: "Типичная оплата",
      education: "Образовательные требования",
      framework: "Регуляторный фреймворк",
      bestFor: "Лучше всего для",
      verify: "Как проверить",
    },
    licenses: [
      {
        name: "EMD",
        fullName: "Exempt Market Dealer",
        andriiBadge: "✅ Это я",
        accent: "brand",
        regulator: "CSA (провинциальный — ASC в Альберте)",
        products: "Частные securities: MIC (mortgage investment corp.), REIT, development LP, private lending funds, deals напрямую с issuers. Все продукты доступны через Offering Memorandum (NI 45-106).",
        clientBar: "Только Eligible Investor или Accredited Investor (более высокий порог дохода/активов). Не для широкого рынка.",
        compensation: "Commission от issuer при подписке, прозрачно указана в OM. Без AUM fee. Discovery call бесплатный.",
        education: "Exempt Market Proficiency Course (IFSE Institute) + provincial registration.",
        framework: "NI 31-103 (registration), NI 45-106 (prospectus exemptions).",
        bestFor: "Eligible Investors которые хотят частный рынок как дополнение к publicly-traded портфолио. Diversification, доступ к alternative asset class.",
        verifyLabel: "CSA NRD (моя регистрация: #4575551)",
        verifyUrl: NRD_URL,
      },
      {
        name: "CIRO",
        fullName: "Canadian Investment Regulatory Organization",
        andriiBadge: "❌ Не я",
        accent: "neutral",
        regulator: "CIRO (национальный SRO, надзор CSA). Основан в 2023 объединением IIROC + MFDA.",
        products: "Публичные securities: ETF, mutual funds, акции на бирже, облигации, options, GIC. Всё что торгуется на TSX, NYSE, NASDAQ и т.д.",
        clientBar: "Кто угодно. Нет минимального порога.",
        compensation: "Обычно % от AUM (1–1.5%/год) или per-trade commission. Некоторые fee-only модели (flat $/год).",
        education: "CSC (Canadian Securities Course) + WME (Wealth Management Essentials) для investment advisor; разные courses для портфельных managers.",
        framework: "UMIR (Universal Market Integrity Rules), NI 31-103, CIRO Member Rules.",
        bestFor: "Большинство канадских инвесторов. Особенно если хочешь self-directed или keep things simple через broad-market ETF. Если у тебя >$100K — есть смысл рассматривать fee-only CIRO advisor.",
        verifyLabel: "CIRO advisor search",
        verifyUrl: CIRO_URL,
      },
      {
        name: "Insurance",
        fullName: "Life Insurance License (provincial)",
        andriiBadge: "❌ Не я",
        accent: "neutral",
        regulator: "Provincial Insurance Council (в Альберте — AIC, Alberta Insurance Council).",
        products: "Life insurance (term, whole life, universal), critical illness, disability insurance, annuities, segregated funds.",
        clientBar: "Кто угодно.",
        compensation: "Commission от страховой компании при оформлении полиса. Часто структурирована как upfront + trail.",
        education: "LLQP (Life License Qualification Program) + provincial exam.",
        framework: "Provincial Insurance Acts. В Альберте — Alberta Insurance Act + AIC bylaws.",
        bestFor: "Если у тебя зависимые (дети, муж/жена, родители), или собственный бизнес с key-person risk. Чем раньше берём term life пока здоровы — тем дешевле премия за годы.",
        verifyLabel: "AIC license search",
        verifyUrl: AIC_URL,
      },
    ],
    decisionTitle: "Быстрое решение: какая лицензия тебе нужна?",
    decisionItems: [
      {
        scenario: "Хочу вложить $20K в ETF (S&P 500, broad market) в TFSA",
        answer: "CIRO advisor (или self-directed broker: Questrade, Wealthsimple).",
        bg: "neutral",
      },
      {
        scenario: "Имею $150K наличных и shopping for advisor",
        answer: "Сначала — CIRO fee-only advisor для public market core. Потом — EMD для diversification в private market если ты Eligible Investor.",
        bg: "neutral",
      },
      {
        scenario: "Я Eligible Investor, хочу частный MIC или REIT",
        answer: "EMD (это я). Discovery call → Suitability Assessment → Offering Memorandum review.",
        bg: "brand",
      },
      {
        scenario: "Жена с 2 детьми под 10 лет и нет life insurance",
        answer: "Insurance broker. Самое дешёвое — term life пока молода и здорова.",
        bg: "neutral",
      },
      {
        scenario: "Я только приехал по CUAET. У меня $5K. С чего начать?",
        answer: "TFSA через self-directed (Wealthsimple/Questrade) — broad-market ETF (XEQT, VEQT). EMD/CIRO/Insurance — позже, по мере роста.",
        bg: "neutral",
      },
    ],
    faqTitle: "Частые вопросы про лицензии",
    faq: [
      {
        q: "Может ли один человек иметь EMD + CIRO + Insurance лицензии одновременно?",
        a: "Теоретически да, но это почти не встречается. Каждая лицензия требует отдельных exams, отдельной compliance инфраструктуры, и часто конфликт интересов. Большинство professionals специализируются в одной. Часто встречается комбинация: CIRO + Insurance (через отдельную insurance брокерскую фирму).",
      },
      {
        q: "Что случилось с MFDA? Я видел эту аббревиатуру раньше.",
        a: "MFDA (Mutual Fund Dealers Association) исторически была отдельным SRO для mutual fund dealers (не для полного public market). В 2023 году MFDA объединилась с IIROC в единый регулятор — CIRO. Если advisor говорит «я MFDA» — он теперь под CIRO. Старая терминология может ещё встречаться в документации до 2023 года.",
      },
      {
        q: "EMD даёт более высокую доходность чем CIRO public market?",
        a: "Это неправильный вопрос. EMD и CIRO — это РАЗНЫЕ классы активов (частный vs публичный), не «лучший vs худший». Частный рынок обычно имеет меньше ликвидности, более длинный horizon, другой профиль риска. В diversified плане они дополняют друг друга. Кто говорит «EMD даёт больше» — либо не понимает, либо продаёт.",
      },
      {
        q: "Нужно ли иметь CIRO advisor если я self-directed на Wealthsimple?",
        a: "Нет. Self-directed брокер (Wealthsimple Trade, Questrade, IB) — это когда ты сам выбираешь ETF/акции/mutual funds. Никаких рекомендаций тебе не дают. Просто платформа исполняет твои trades. Подходит для тех кто хочет простоту и не нуждается в персональном плане.",
      },
      {
        q: "Может ли EMD советник продать мне ETF?",
        a: "Нет. EMD лицензия позволяет продавать только exempt market securities (private MICs, REITs, LPs). ETF — это публичный security который торгуется на бирже, он вне EMD scope. Если EMD предлагает тебе ETF — это регуляторное нарушение.",
      },
      {
        q: "Как я могу проверить любого советника в Канаде?",
        a: "CSA NRD search (info.securities-administrators.ca/nrsmobile/nrssearch.aspx) покрывает EMD, CIRO IIROC и CIRO MFDA registrations. Для Insurance — отдельный поиск на сайте provincial Insurance Council (например AIC.ab.ca для Альберты). Если человека не найти ни в одном из них — это красный флаг.",
      },
    ],
    bottomCtaTitle: "Не уверен какая категория тебе нужна?",
    bottomCtaText:
      "Discovery call — 30 минут, бесплатно. Разберём твою ситуацию и определим что тебе действительно нужно: EMD, CIRO, Insurance, или их комбинация. Если EMD не для тебя — направлю к CIRO/Insurance advisor которого знаю лично.",
    bottomCtaBtn: "Записаться на discovery call",
    eligibilityPromoTitle: "Или проверь за 60 секунд — Eligible ли ты Investor?",
    eligibilityPromoBody: "4 вопроса, без email — и знаешь открыт ли тебе exempt market (моя зона), или лучше начинать с TFSA/RRSP/FHSA (зона CIRO).",
    eligibilityPromoCta: "Пройти self-check",
    crumbHome: "Главная",
    crumbThis: "Сравнение лицензий",
    verifyLinkLabel: "Проверь меня за 3 минуты",
  },
  en: {
    titleMeta: "EMD vs CIRO vs Insurance — which Canadian advisor do you actually need?",
    descriptionMeta:
      "Honest comparison of the 3 Canadian financial-advisor licenses in 2026: EMD, CIRO (formerly IIROC + MFDA), Insurance. Who sells what, who fits which, how to verify. Educational.",
    kicker: "License comparison",
    title: "EMD vs CIRO vs Insurance",
    subtitle: "Which Canadian financial advisor do you actually need?",
    intro:
      "Canada has three main categories of regulated financial professionals — and each does DIFFERENT work. Most people need more than one over a lifetime. This page explains when you need which license, in plain English, with no jargon.",
    historyNote:
      "In 2023 IIROC and MFDA merged into a single regulator — CIRO (Canadian Investment Regulatory Organization). We use 'CIRO' here as the umbrella term for the public market (ETFs, mutual funds, stocks). EMD and Insurance are separate licenses.",
    aspectLabels: {
      regulator: "Regulator",
      products: "What they sell",
      clientBar: "Who can access",
      compensation: "Typical compensation",
      education: "Education requirements",
      framework: "Regulatory framework",
      bestFor: "Best for",
      verify: "How to verify",
    },
    licenses: [
      {
        name: "EMD",
        fullName: "Exempt Market Dealer",
        andriiBadge: "✅ This is me",
        accent: "brand",
        regulator: "CSA (provincial — ASC in Alberta)",
        products: "Private securities: MIC (mortgage investment corp), REITs, development LPs, private lending funds, deals directly with issuers. All products distributed via Offering Memorandum under NI 45-106.",
        clientBar: "Only Eligible Investor or Accredited Investor (high income/asset threshold). Not for the general market.",
        compensation: "Commission from the issuer on subscription, disclosed in the OM. No AUM fee. Discovery call is free.",
        education: "Exempt Market Proficiency Course (IFSE Institute) + provincial registration.",
        framework: "NI 31-103 (registration), NI 45-106 (prospectus exemptions).",
        bestFor: "Eligible Investors who want private-market exposure layered onto a publicly-traded core. Diversification into an alternative asset class.",
        verifyLabel: "CSA NRD (my registration: #4575551)",
        verifyUrl: NRD_URL,
      },
      {
        name: "CIRO",
        fullName: "Canadian Investment Regulatory Organization",
        andriiBadge: "❌ Not me",
        accent: "neutral",
        regulator: "CIRO (national SRO under CSA oversight). Formed in 2023 by merging IIROC + MFDA.",
        products: "Public securities: ETFs, mutual funds, exchange-listed stocks, bonds, options, GICs. Everything traded on TSX, NYSE, NASDAQ, etc.",
        clientBar: "Anyone. No minimum threshold.",
        compensation: "Typically % of AUM (1–1.5%/year) or per-trade commission. Some fee-only models charge a flat dollar amount.",
        education: "CSC (Canadian Securities Course) + WME (Wealth Management Essentials) for an investment advisor; different courses for portfolio managers.",
        framework: "UMIR (Universal Market Integrity Rules), NI 31-103, CIRO Member Rules.",
        bestFor: "Most Canadian investors. Especially if you want to be self-directed or keep things simple with broad-market ETFs. If you have >$100K, a fee-only CIRO advisor is worth considering.",
        verifyLabel: "CIRO advisor search",
        verifyUrl: CIRO_URL,
      },
      {
        name: "Insurance",
        fullName: "Life Insurance License (provincial)",
        andriiBadge: "❌ Not me",
        accent: "neutral",
        regulator: "Provincial Insurance Council (Alberta — AIC, Alberta Insurance Council).",
        products: "Life insurance (term, whole life, universal), critical illness, disability insurance, annuities, segregated funds.",
        clientBar: "Anyone.",
        compensation: "Commission from the insurance company on policy issue. Often structured as an upfront + trail.",
        education: "LLQP (Life License Qualification Program) + provincial exam.",
        framework: "Provincial Insurance Acts. In Alberta — Alberta Insurance Act + AIC bylaws.",
        bestFor: "If you have dependents (kids, spouse, parents) or a business with key-person risk. The earlier you take term life while healthy, the cheaper the premium long-term.",
        verifyLabel: "AIC license search",
        verifyUrl: AIC_URL,
      },
    ],
    decisionTitle: "Quick decision: which license do you need?",
    decisionItems: [
      {
        scenario: "I want to put $20K into an ETF (S&P 500, broad market) inside a TFSA",
        answer: "CIRO advisor (or a self-directed broker: Questrade, Wealthsimple).",
        bg: "neutral",
      },
      {
        scenario: "I have $150K in cash and I'm shopping for an advisor",
        answer: "Start with a fee-only CIRO advisor for the public-market core. Then look at EMD for private-market diversification if you're an Eligible Investor.",
        bg: "neutral",
      },
      {
        scenario: "I'm an Eligible Investor, I want a private MIC or REIT",
        answer: "EMD (that's me). Discovery call → Suitability Assessment → Offering Memorandum review.",
        bg: "brand",
      },
      {
        scenario: "My spouse has 2 kids under 10 and no life insurance",
        answer: "Insurance broker. Cheapest path is term life while you're young and healthy.",
        bg: "neutral",
      },
      {
        scenario: "I just arrived on CUAET. I have $5K. Where do I start?",
        answer: "TFSA via self-directed (Wealthsimple/Questrade) — broad-market ETFs (XEQT, VEQT). EMD/CIRO/Insurance — later, as you grow.",
        bg: "neutral",
      },
    ],
    faqTitle: "FAQ about licenses",
    faq: [
      {
        q: "Can one person hold EMD + CIRO + Insurance licenses at the same time?",
        a: "Technically yes, almost never in practice. Each license requires separate exams, separate compliance infrastructure, and often raises conflict-of-interest concerns. Most professionals specialise in one. A common combo is CIRO + Insurance through a separate insurance brokerage entity.",
      },
      {
        q: "What happened to MFDA? I've seen the acronym.",
        a: "MFDA (Mutual Fund Dealers Association) was historically a separate SRO just for mutual fund dealers (not full public-market). In 2023 MFDA merged with IIROC into one regulator — CIRO. If an advisor says 'I'm MFDA' they're now under CIRO. The old acronym still appears in pre-2023 documentation.",
      },
      {
        q: "Does EMD deliver higher returns than CIRO public market?",
        a: "Wrong question. EMD and CIRO are DIFFERENT asset classes (private vs public), not 'better vs worse'. The private market usually has lower liquidity, longer horizons, and a different risk profile. In a diversified plan they complement each other. Anyone telling you 'EMD pays more' either doesn't understand it or is selling.",
      },
      {
        q: "Do I need a CIRO advisor if I'm self-directed on Wealthsimple?",
        a: "No. A self-directed broker (Wealthsimple Trade, Questrade, IB) is where YOU pick the ETFs/stocks/mutual funds. No advice is given. The platform just executes your trades. Good for people who want simplicity and don't need a personal plan.",
      },
      {
        q: "Can an EMD advisor sell me an ETF?",
        a: "No. An EMD license only authorizes exempt market securities (private MICs, REITs, LPs). An ETF is a public security traded on an exchange — outside EMD scope. If an EMD offers you an ETF, that's a regulatory breach.",
      },
      {
        q: "How do I check any advisor in Canada?",
        a: "CSA NRD search (info.securities-administrators.ca/nrsmobile/nrssearch.aspx) covers EMD, CIRO IIROC and CIRO MFDA registrations. For insurance — separate lookup on the provincial Insurance Council site (e.g. AIC.ab.ca for Alberta). If you can't find someone in any of those, it's a red flag.",
      },
    ],
    bottomCtaTitle: "Not sure which category you need?",
    bottomCtaText:
      "Discovery call — 30 minutes, free. We work through your situation and figure out what you actually need: EMD, CIRO, Insurance, or some combination. If EMD isn't for you, I'll point you to a CIRO or Insurance advisor I know personally.",
    bottomCtaBtn: "Book a discovery call",
    eligibilityPromoTitle: "Or check in 60 seconds — are you an Eligible Investor?",
    eligibilityPromoBody: "4 questions, no email — and you'll know whether exempt market is open to you (my zone) or whether to start with TFSA/RRSP/FHSA first (CIRO zone).",
    eligibilityPromoCta: "Take the self-check",
    crumbHome: "Home",
    crumbThis: "License comparison",
    verifyLinkLabel: "Verify me in 3 minutes",
  },
};

export async function generateStaticParams() {
  return SUPPORTED_LOCALES.map((locale) => ({ locale }));
}

export async function generateMetadata({ params }) {
  const { locale } = await params;
  const c = COPY[locale] || COPY.uk;
  const path = `/${locale}/porivnyannia`;
  const alternates = Object.fromEntries(
    SUPPORTED_LOCALES.map((l) => [
      { uk: "uk", ru: "ru", en: "en-CA" }[l],
      `/${l}/porivnyannia`,
    ])
  );
  alternates["x-default"] = "/uk/porivnyannia";
  return {
    title: c.titleMeta,
    description: c.descriptionMeta,
    keywords: [
      "EMD vs CIRO", "EMD vs IIROC", "EMD vs MFDA",
      "Exempt Market Dealer Canada", "CIRO advisor",
      "MFDA vs CIRO", "які ліцензії фінансові Канада",
      "different financial advisor licenses Canada",
      "Eligible Investor Canada",
    ],
    alternates: { canonical: path, languages: alternates },
    openGraph: {
      title: c.titleMeta,
      description: c.descriptionMeta,
      url: `https://sky-fort.ca${path}`,
      type: "article",
    },
    twitter: {
      card: "summary_large_image",
      title: c.titleMeta,
      description: c.descriptionMeta,
    },
  };
}

// Icon picker for each aspect row of the comparison.
function aspectIcon(key) {
  return {
    regulator: Shield,
    products: Briefcase,
    clientBar: Users,
    compensation: DollarSign,
    education: GraduationCap,
    framework: Building2,
    bestFor: Target,
  }[key];
}

// ItemList JSON-LD — the 3 licenses are an ordered comparison list.
// Plus an Article wrapper so the whole page is identified as a comparison.
function buildJsonLd(locale, c, path) {
  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Article",
        "@id": `https://sky-fort.ca${path}#article`,
        headline: c.titleMeta,
        description: c.descriptionMeta,
        inLanguage: { uk: "uk", ru: "ru", en: "en-CA" }[locale],
        author: {
          "@type": "Person",
          name: "Andrii Andriushchenko",
          jobTitle: "Licensed Dealing Representative",
          identifier: "NRD 4575551",
          url: `https://sky-fort.ca/${locale}/pro-mene`,
        },
        publisher: {
          "@type": "FinancialService",
          name: "SkyFort Wealth",
          url: "https://sky-fort.ca",
        },
        mainEntityOfPage: { "@type": "WebPage", "@id": `https://sky-fort.ca${path}` },
      },
      {
        "@type": "ItemList",
        "@id": `https://sky-fort.ca${path}#licenses`,
        name: "Canadian financial advisor licenses",
        numberOfItems: c.licenses.length,
        itemListOrder: "ItemListUnordered",
        itemListElement: c.licenses.map((lic, i) => ({
          "@type": "ListItem",
          position: i + 1,
          item: {
            "@type": "Thing",
            name: `${lic.name} — ${lic.fullName}`,
            description: lic.bestFor,
          },
        })),
      },
    ],
  };
}

export default async function PorivnyanniaPage({ params }) {
  const { locale } = await params;
  const c = COPY[locale] || COPY.uk;
  const path = `/${locale}/porivnyannia`;
  const jsonLd = buildJsonLd(locale, c, path);

  return (
    <main id="main" className="min-h-screen bg-[var(--color-bg)] text-white">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      {/* NAV */}
      <nav className="fixed inset-x-0 top-0 z-50 border-b border-[#2a2a2a] bg-[#191919]/80 backdrop-blur-xl">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
          <Link href={`/${locale}`}><Logo variant="full" /></Link>
          <LangSwitcher locale={locale} />
        </div>
      </nav>

      <div className="mx-auto max-w-6xl px-6 pt-28">
        <Breadcrumbs
          items={[
            { label: c.crumbHome, href: `/${locale}` },
            { label: c.crumbThis },
          ]}
        />

        {/* HERO */}
        <header className="mt-10 pb-8">
          <p className="mb-4 text-[10px] font-bold uppercase tracking-[0.3em] text-[var(--color-brand)]">{c.kicker}</p>
          <h1 className="font-display-tight text-5xl text-white md:text-7xl">{c.title}</h1>
          <p className="mt-4 text-2xl font-bold text-[#c4c4c4] md:text-3xl">{c.subtitle}</p>
          <p className="mt-6 max-w-3xl text-lg leading-relaxed text-[#a3a3a3]">{c.intro}</p>
        </header>
        <div className="mb-12 max-w-3xl">
          <AuthorByline locale={locale} />
        </div>

        {/* HISTORY NOTE */}
        <section className="mb-12 rounded-2xl border border-[var(--color-border)] bg-[var(--color-bg-card)] p-5 md:p-6">
          <p className="text-sm leading-relaxed text-[#a3a3a3]">
            <strong className="text-white">Note:</strong> {c.historyNote}
          </p>
        </section>

        {/* 3 LICENSE CARDS — stacked, mobile-friendly */}
        <section className="space-y-6 pb-12">
          {c.licenses.map((lic, i) => {
            const isMe = lic.accent === "brand";
            return (
              <article
                key={i}
                className={`rounded-3xl border p-7 md:p-10 ${
                  isMe
                    ? "border-[var(--color-brand)]/40 bg-gradient-to-br from-[var(--color-bg-card)] to-[#1a2d4a]"
                    : "border-[var(--color-border)] bg-[var(--color-bg-card)]"
                }`}
              >
                <div className="mb-6 flex flex-wrap items-start justify-between gap-3">
                  <div>
                    <h2 className="font-display-tight text-4xl text-white md:text-5xl">{lic.name}</h2>
                    <p className="mt-2 text-sm text-[#a3a3a3]">{lic.fullName}</p>
                  </div>
                  <span
                    className={`inline-flex items-center rounded-full px-4 py-2 text-xs font-bold uppercase tracking-wider ${
                      isMe
                        ? "border border-[var(--color-brand)]/50 bg-[var(--color-brand)]/15 text-[var(--color-brand)]"
                        : "border border-[var(--color-border-strong)] bg-[var(--color-bg-elevated)] text-[#a3a3a3]"
                    }`}
                  >
                    {lic.andriiBadge}
                  </span>
                </div>

                <dl className="grid gap-x-8 gap-y-5 md:grid-cols-2">
                  {[
                    "regulator",
                    "products",
                    "clientBar",
                    "compensation",
                    "education",
                    "framework",
                    "bestFor",
                  ].map((key) => {
                    const Icon = aspectIcon(key);
                    return (
                      <div key={key}>
                        <dt className="mb-2 flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[var(--color-fg-subtle)]">
                          <Icon className="h-3.5 w-3.5 text-[var(--color-brand)]" aria-hidden="true" />
                          {c.aspectLabels[key]}
                        </dt>
                        <dd className="text-sm leading-relaxed text-[#c4c4c4]">{lic[key]}</dd>
                      </div>
                    );
                  })}
                </dl>

                <div className="mt-7 border-t border-[var(--color-border)] pt-5">
                  <a
                    href={lic.verifyUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 text-sm font-semibold text-[var(--color-brand)] hover:text-[var(--color-brand-hover)]"
                  >
                    <ExternalLink className="h-3.5 w-3.5" aria-hidden="true" />
                    <span className="text-[var(--color-fg-subtle)]">{c.aspectLabels.verify}:</span>
                    {lic.verifyLabel}
                  </a>
                </div>
              </article>
            );
          })}
        </section>

        {/* DECISION FLOWCHART */}
        <section className="mt-8 pb-12">
          <h2 className="mb-8 font-display text-3xl text-white md:text-5xl">{c.decisionTitle}</h2>
          <ul className="space-y-4">
            {c.decisionItems.map((item, i) => {
              const isMe = item.bg === "brand";
              return (
                <li
                  key={i}
                  className={`rounded-2xl border p-6 ${
                    isMe
                      ? "border-[var(--color-brand)]/40 bg-[var(--color-brand)]/5"
                      : "border-[var(--color-border)] bg-[var(--color-bg-card)]"
                  }`}
                >
                  <div className="grid gap-4 md:grid-cols-[1fr_1fr] md:items-center">
                    <div className="flex items-start gap-3">
                      {isMe ? (
                        <CheckCircle2 className="mt-1 h-5 w-5 flex-shrink-0 text-[var(--color-brand)]" aria-hidden="true" />
                      ) : (
                        <XCircle className="mt-1 h-5 w-5 flex-shrink-0 text-[var(--color-fg-subtle)]" aria-hidden="true" />
                      )}
                      <p className="text-base font-semibold text-white">{item.scenario}</p>
                    </div>
                    <p className={`text-sm leading-relaxed ${isMe ? "text-white" : "text-[#c4c4c4]"}`}>
                      <span className="font-bold text-[var(--color-brand)]">→</span> {item.answer}
                    </p>
                  </div>
                </li>
              );
            })}
          </ul>
        </section>

        {/* Eligibility promo — natural follow-up to the decision flowchart */}
        <section className="mt-8 pb-16">
          <div className="overflow-hidden rounded-3xl border border-[var(--color-brand)]/30 bg-gradient-to-br from-[var(--color-bg-card)] to-[#0d2860] p-7 md:p-10">
            <div className="grid items-center gap-6 md:grid-cols-[1.4fr_auto]">
              <div>
                <h3 className="font-display text-2xl text-white md:text-3xl">{c.eligibilityPromoTitle}</h3>
                <p className="mt-3 text-base leading-relaxed text-[#c4c4c4]">{c.eligibilityPromoBody}</p>
              </div>
              <Link
                href={`/${locale}/eligibility`}
                className="inline-flex items-center justify-center gap-2 rounded-full bg-[var(--color-brand)] px-7 py-3.5 text-sm font-bold uppercase tracking-wider text-white transition-all hover:bg-[var(--color-brand-hover)]"
              >
                {c.eligibilityPromoCta}
                <ExternalLink className="h-3.5 w-3.5" aria-hidden="true" />
              </Link>
            </div>
          </div>
        </section>
      </div>

      {/* More comparisons — internal cluster to new /porivnyannia/[slug] pages */}
      <RelatedLinks
        heading={locale === "ru" ? "Другие сравнения" : locale === "en" ? "More comparisons" : "Інші порівняння"}
        items={[
          { href: `/${locale}/porivnyannia/emd-vs-wealthsimple`, label: "EMD vs Wealthsimple", description: locale === "ru" ? "Exempt market или robo-advisor" : locale === "en" ? "Exempt market or robo-advisor" : "Exempt market чи robo-advisor" },
          { href: `/${locale}/porivnyannia/mic-vs-gic`, label: "MIC vs GIC", description: locale === "ru" ? "Mortgage corp или гарантированный депозит" : locale === "en" ? "Mortgage corp or guaranteed deposit" : "Mortgage corp чи гарантований депозит" },
          { href: `/${locale}/porivnyannia/exempt-market-vs-etf`, label: "Exempt market vs ETF", description: locale === "ru" ? "Частные securities или биржевые фонды" : locale === "en" ? "Private securities or exchange funds" : "Приватні securities чи біржові фонди" },
          { href: `/${locale}/eligibility`, label: "Eligible Investor self-check", description: locale === "ru" ? "60 секунд — открывается ли exempt market" : locale === "en" ? "60 seconds — does exempt market open up" : "60 секунд — чи відкривається exempt market" },
        ]}
      />

      {/* FAQ */}
      <StaticFaq
        faq={c.faq}
        heading={c.faqTitle}
        jsonLdId={`https://sky-fort.ca/${locale}/porivnyannia#faq`}
      />

      {/* CTA */}
      <section className="mx-auto max-w-3xl px-6 py-24 text-center">
        <h2 className="font-display-tight text-3xl text-white md:text-5xl">{c.bottomCtaTitle}</h2>
        <p className="mx-auto mt-5 max-w-2xl text-lg leading-relaxed text-[#a3a3a3]">{c.bottomCtaText}</p>
        <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
          <a
            href={CALENDLY}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-full bg-[var(--color-brand)] px-8 py-4 text-sm font-bold uppercase tracking-wider text-white transition-all hover:bg-[var(--color-brand-hover)]"
          >
            {c.bottomCtaBtn}
          </a>
          <Link
            href={`/${locale}/perevirka`}
            className="inline-flex items-center gap-2 text-sm font-semibold text-[var(--color-brand)] hover:text-[var(--color-brand-hover)]"
          >
            {c.verifyLinkLabel}
            <ExternalLink className="h-3.5 w-3.5" aria-hidden="true" />
          </Link>
        </div>
      </section>
    </main>
  );
}
