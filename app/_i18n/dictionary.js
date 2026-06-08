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
    homeTldr: {
      label: "Коротко",
      text: "SkyFort Wealth — це освітня фінансова практика Андрія Андрющенка, ліцензованого Dealing Representative (NRD #4575551) при Axcess Capital Advisors Inc. (Exempt Market Dealer). Тут українсько- та російськомовні новоприбулі в Канаді отримують зрозумілі пояснення про TFSA, RRSP, FHSA, іпотеку й exempt market — освітньо, без персональних інвестиційних порад.",
    },
    stats: [
      { value: "0%", label: "Податок на TFSA — на ріст і виплати назавжди" },
      { value: "$109K", label: "Накопичений TFSA room 2026 для резидентів з 2009 · твій ≈ $34K (2022), $27K (2023), $20K (2024)" },
      { value: "7–12%", label: "Історичний діапазон · широкий ринок diversified" },
      { value: "від $5K", label: "Поріг входу в exempt market (залежить від продукту)" },
    ],
    aboutTitle: "Хто я і чому це не черговий блог про гроші",
    about: [
      "Більшість українців у Канаді платять банку 1.5–2% MER на рік за mutual fund, який ледь випереджає інфляцію. Радник в офісі посміхається. Цифри в Fund Facts — в дрібному шрифті. Через 30 років різниця між self-directed ETF і високо-MER mutual fund при тому самому внеску — шестизначна. Це не «не пощастило». Це система, яку ніхто не пояснює рідною мовою.",
      "Я Андрій Андрющенко — Licensed Dealing Representative з Axcess Capital, особисто ліцензований в AB · BC · ON. Не банкір. Не страховий агент. Не запитую «який твій бюджет на інвестиції» — питаю «який результат ти хочеш через 10 років». TFSA, RRSP, FHSA, exempt market — рахуємо разом, що насправді працює саме для твоєї ситуації.",
      "Discovery call — 30 хвилин, безкоштовно. Якщо exempt market не для тебе — скажу прямо й направлю до кращої альтернативи. Якщо так — показую цифри з Offering Memorandum, а не обіцянки. Усі матеріали CCO-approved.",
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
      { q: "Скільки взагалі коштує радник у Канаді?", a: "Залежить від моделі. Банківські радники «безкоштовні» — але їхня оплата вшита в MER mutual fund (1.5–2%/рік). CIRO independent advisors часто беруть % від AUM (1–1.5%). У моєму випадку — discovery call безкоштовний; commission від issuer (якщо підписуєшся) — прозоро вказана в Offering Memorandum. Без підписки нічого не платиш." },
      { q: "Чим ти відрізняєшся від банку?", a: "Банк продає лише те, що в банку — здебільшого власні mutual funds з MER 1.5–2%. Я як Dealing Representative маю доступ до exempt market — приватні MIC, REIT, private lending. Це окремий клас активів зі своїм профілем ризику та ліквідності; конкретні діапазони повернення обговорюємо на discovery call після Suitability Assessment." },
      { q: "В чому різниця між EMD і CIRO advisor?", a: "EMD (Exempt Market Dealer) — ліцензія для приватних securities (MIC, REIT, LP), доступних лише Eligible/Accredited Investors. CIRO (раніше IIROC + MFDA) — для публічних securities (ETF, mutual funds, акції). Це РІЗНІ ліцензії, регулюються однією CSA, але працюють з різними продуктами. Я EMD. Для ETF/mutual funds потрібен CIRO advisor. Деталі — у нашій порівняльній таблиці на /uk/porivnyannia." },
      { q: "Що таке Eligible Investor?", a: "CSA NI 45-106 категорія. Спрощено: $75K+ income solo / $125K+ household, або $400K net assets без primary residence. Це не «тест IQ» — це регуляторні кваліфікації. Для нижчих категорій є альтернативи через TFSA/RRSP/FHSA. 60-секундний self-check за NI 45-106 — на сторінці /uk/eligibility." },
      { q: "Як я можу перевірити твою реєстрацію?", a: "NRD #4575551 на офіційному сайті CSA: info.securities-administrators.ca/nrsmobile/nrssearch.aspx. Це загальна база усіх зареєстрованих financial professionals у Канаді — перевірка займає 30 секунд. Покрокова інструкція на /uk/perevirka." },
      { q: "Що таке Suitability Assessment і навіщо він?", a: "Вимога NI 31-103. Перед будь-якою рекомендацією я зобов'язаний оцінити: твоє фінансове становище, цілі, time horizon, толерантність до ризику, knowledge & experience. Це не формальність — це захищає тебе. Якщо я порекомендую продукт що не suitable, регулятор може анулювати ліцензію. Тому «просто дай мені 12% дохідність» не працює — потрібен KYC." },
      { q: "Я newcomer, в мене ще немає $400K. Чи є сенс говорити?", a: "Так. 80% моїх клієнтів починають з TFSA/RRSP/FHSA setup. Exempt market — це коли вже є infrastructure. Дзвінок все одно корисний — отримаєш план що робити в наступні 12 місяців." },
      { q: "Я тільки приїхав за CUAET — мені треба чекати?", a: "Ні. SIN + canadian banking + permanent address — і ти можеш відкривати TFSA, RRSP, FHSA. Перші 12 місяців у Канаді — найкращий час навчитись (доки податкова ситуація ще нескладна). Exempt market потребує Eligible Investor категорії, але TFSA/RRSP/FHSA доступні відразу резидентам." },
      { q: "Що відбувається після discovery call?", a: "Один з трьох сценаріїв. (1) Ти не Eligible Investor — отримуєш план через TFSA/RRSP/FHSA + калькулятори/гайди. Повертаємось коли будеш готовий. (2) Eligible Investor + готовий — формальний KYC, Suitability Assessment, конкретний продукт + Offering Memorandum для review (5-7 днів). (3) Eligible Investor але exempt market не підходить — направляю до CIRO advisor для public market альтернатив." },
      { q: "Чи можу інвестувати exempt market через TFSA?", a: "Технічно так — exempt market securities можна тримати в TFSA/RRSP/FHSA акаунтах якщо рахунок self-directed з підтримкою alternative investments. Практично — більшість новоприбулих спочатку наповнюють TFSA broad-market ETF (через CIRO advisor або self-directed), а потім додають exempt market у non-registered або self-directed RRSP. Обговоримо на discovery call." },
      { q: "Які саме продукти ти можеш запропонувати?", a: "Через Axcess Capital — приватні MIC (mortgage investment corporations), REITs, private lending funds, development LPs. Конкретні issuers і поточні offerings — приватна інформація (NI 45-106 обмежує public-facing marketing), показую на discovery call після KYC. Кожен продукт — з повним Offering Memorandum, fund fact sheet, audited financials." },
    ],
    ctaTitle: "Готовий розібратись?",
    ctaSub: "30 хвилин · Zoom або Google Meet · Українською, російською або англійською.",
    ctaBtn: "Записатись на discovery call",
    ctaDisclosure:
      "Андрій Андрющенко — Dealing Representative при Axcess Capital Advisors Inc. (Exempt Market Dealer), NRD #4575551. Це освітня консультація, не персональна інвестиційна порада.",
    ctaVerify: "Перевірити мою реєстрацію",
    footer: {
      tagline: "Wealth building для українців у Канаді",
      contactTitle: "Контакти",
      legalTitle: "Регулятор",
      disclaimer: "Andrii Andriushchenko — Dealing Representative registered with Axcess Capital Advisors Inc. (EMD). Personally registered: Alberta, British Columbia, Ontario. Content on this site is educational and is not investment advice. Exempt market investments are restricted to Eligible Investors as defined under National Instrument 45-106.",
      finfluencerNote: "Освітній контент загального характеру — не персоналізована порада. Усі публічні матеріали (включно з TikTok / Instagram / YouTube) є освітніми. Персональні рекомендації надаються лише після формального KYC + Suitability Assessment згідно з NI 31-103. Відповідно до Joint CSA/CIRO Staff Notice 31-369 (грудень 2025).",
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
    homeTldr: {
      label: "Коротко",
      text: "SkyFort Wealth — это образовательная финансовая практика Андрея Андрющенко, лицензированного Dealing Representative (NRD #4575551) при Axcess Capital Advisors Inc. (Exempt Market Dealer). Здесь украинско- и русскоязычные новоприбывшие в Канаде получают понятные объяснения про TFSA, RRSP, FHSA, ипотеку и exempt market — образовательно, без персональных инвестиционных советов.",
    },
    stats: [
      { value: "0%", label: "Налог на TFSA — на рост и выплаты навсегда" },
      { value: "$109K", label: "Накопленный TFSA room 2026 для резидентов с 2009 · твой ≈ $34K (2022), $27K (2023), $20K (2024)" },
      { value: "7–12%", label: "Исторический диапазон · широкий рынок diversified" },
      { value: "от $5K", label: "Порог входа в exempt market (зависит от продукта)" },
    ],
    aboutTitle: "Кто я и почему это не очередной блог про деньги",
    about: [
      "Большинство русскоязычных в Канаде платят банку 1.5–2% MER в год за mutual fund, который едва обгоняет инфляцию. Советник в офисе улыбается. Цифры в Fund Facts — мелким шрифтом. Через 30 лет разница между self-directed ETF и высоко-MER mutual fund при том же взносе — шестизначная. Это не «не повезло». Это система, которую никто не объясняет на родном языке.",
      "Я Андрей Андрющенко — Licensed Dealing Representative с Axcess Capital, лично лицензирован в AB · BC · ON. Не банкир. Не страховой агент. Не спрашиваю «какой у тебя бюджет на инвестиции» — спрашиваю «какой результат ты хочешь через 10 лет». TFSA, RRSP, FHSA, exempt market — считаем вместе, что реально работает именно для твоей ситуации.",
      "Discovery call — 30 минут, бесплатно. Если exempt market не для тебя — скажу прямо и направлю к лучшей альтернативе. Если да — показываю цифры из Offering Memorandum, а не обещания. Все материалы CCO-approved.",
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
      { q: "Это бесплатно? В чём подвох?", a: "Discovery call бесплатный. Если рекомендую exempt market продукт и ты подписываешься — получаю commission от issuer (стандарт в Канаде, прозрачно в Offering Memorandum). Если нет — ничего не платишь." },
      { q: "Сколько вообще стоит советник в Канаде?", a: "Зависит от модели. Банковские советники «бесплатные» — но их оплата вшита в MER mutual fund (1.5–2%/год). CIRO independent advisors часто берут % от AUM (1–1.5%). В моём случае — discovery call бесплатный; commission от issuer (если подписываешься) — прозрачно указано в Offering Memorandum. Без подписки ничего не платишь." },
      { q: "Чем ты отличаешься от банка?", a: "Банк продаёт только то, что в банке — в основном собственные mutual funds с MER 1.5–2%. Я как Dealing Representative имею доступ к exempt market — частные MIC, REIT, private lending. Это отдельный класс активов со своим профилем риска и ликвидности; конкретные диапазоны доходности обсуждаем на discovery call после Suitability Assessment." },
      { q: "В чём разница между EMD и CIRO advisor?", a: "EMD (Exempt Market Dealer) — лицензия для частных securities (MIC, REIT, LP), доступных только Eligible/Accredited Investors. CIRO (раньше IIROC + MFDA) — для публичных securities (ETF, mutual funds, акции). Это РАЗНЫЕ лицензии, регулируются одной CSA, но работают с разными продуктами. Я EMD. Для ETF/mutual funds нужен CIRO advisor. Детали — в сравнительной таблице на /ru/porivnyannia." },
      { q: "Что такое Eligible Investor?", a: "CSA NI 45-106 категория. Упрощённо: $75K+ income solo / $125K+ household, или $400K net assets без primary residence. Это не «тест IQ» — это регуляторные квалификации. Для более низких категорий есть альтернативы через TFSA/RRSP/FHSA. 60-секундный self-check по NI 45-106 — на странице /ru/eligibility." },
      { q: "Как я могу проверить твою регистрацию?", a: "NRD #4575551 на официальном сайте CSA: info.securities-administrators.ca/nrsmobile/nrssearch.aspx. Это общая база всех зарегистрированных financial professionals в Канаде — проверка занимает 30 секунд. Пошаговая инструкция на /ru/perevirka." },
      { q: "Что такое Suitability Assessment и зачем он?", a: "Требование NI 31-103. Перед любой рекомендацией я обязан оценить: твоё финансовое положение, цели, time horizon, толерантность к риску, knowledge & experience. Это не формальность — это защищает тебя. Если я порекомендую продукт что не suitable, регулятор может аннулировать лицензию. Поэтому «просто дай мне 12% доходность» не работает — нужен KYC." },
      { q: "Я newcomer, у меня ещё нет $400K. Есть ли смысл говорить?", a: "Да. 80% моих клиентов начинают с TFSA/RRSP/FHSA setup. Exempt market — когда уже есть infrastructure. Звонок всё равно полезен — получишь план что делать в следующие 12 месяцев." },
      { q: "Я только приехал по CUAET — мне надо ждать?", a: "Нет. SIN + canadian banking + permanent address — и ты можешь открывать TFSA, RRSP, FHSA. Первые 12 месяцев в Канаде — лучшее время учиться (пока налоговая ситуация ещё несложная). Exempt market требует Eligible Investor категории, но TFSA/RRSP/FHSA доступны сразу резидентам." },
      { q: "Что происходит после discovery call?", a: "Один из трёх сценариев. (1) Ты не Eligible Investor — получаешь план через TFSA/RRSP/FHSA + калькуляторы/гайды. Возвращаемся когда будешь готов. (2) Eligible Investor + готов — формальный KYC, Suitability Assessment, конкретный продукт + Offering Memorandum для review (5-7 дней). (3) Eligible Investor но exempt market не подходит — направляю к CIRO advisor для public market альтернатив." },
      { q: "Могу ли инвестировать exempt market через TFSA?", a: "Технически да — exempt market securities можно держать в TFSA/RRSP/FHSA аккаунтах если счёт self-directed с поддержкой alternative investments. Практически — большинство новоприбывших сначала наполняют TFSA broad-market ETF (через CIRO advisor или self-directed), а потом добавляют exempt market в non-registered или self-directed RRSP. Обсудим на discovery call." },
      { q: "Какие именно продукты ты можешь предложить?", a: "Через Axcess Capital — частные MIC (mortgage investment corporations), REITs, private lending funds, development LPs. Конкретные issuers и текущие offerings — частная информация (NI 45-106 ограничивает public-facing marketing), показываю на discovery call после KYC. Каждый продукт — с полным Offering Memorandum, fund fact sheet, audited financials." },
    ],
    ctaTitle: "Готов разобраться?",
    ctaSub: "30 минут · Zoom или Google Meet · На украинском, русском или английском.",
    ctaBtn: "Записаться на discovery call",
    ctaDisclosure:
      "Андрей Андрющенко — Dealing Representative при Axcess Capital Advisors Inc. (Exempt Market Dealer), NRD #4575551. Это образовательная консультация, не персональная инвестиционная рекомендация.",
    ctaVerify: "Проверить мою регистрацию",
    footer: {
      tagline: "Wealth building для русскоязычных в Канаде",
      contactTitle: "Контакты",
      legalTitle: "Регулятор",
      disclaimer: "Andrii Andriushchenko — Dealing Representative registered with Axcess Capital Advisors Inc. (EMD). Personally registered: Alberta, British Columbia, Ontario. Content on this site is educational and is not investment advice.",
      finfluencerNote: "Образовательный контент общего характера — не персонализированная рекомендация. Все публичные материалы (включая TikTok / Instagram / YouTube) являются образовательными. Персональные рекомендации даются только после формального KYC + Suitability Assessment согласно NI 31-103. В соответствии с Joint CSA/CIRO Staff Notice 31-369 (декабрь 2025).",
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
    homeTldr: {
      label: "TL;DR",
      text: "SkyFort Wealth is the educational financial practice of Andrii Andriushchenko, a licensed Dealing Representative (NRD #4575551) with Axcess Capital Advisors Inc. (Exempt Market Dealer). It helps Ukrainian- and Russian-speaking newcomers to Canada understand TFSAs, RRSPs, FHSAs, mortgages, and the exempt market — educational, never personal investment advice.",
    },
    stats: [
      { value: "0%", label: "Tax on TFSA growth and withdrawals — forever" },
      { value: "$109K", label: "2026 cumulative TFSA room for residents since 2009 · yours ≈ $34K (2022), $27K (2023), $20K (2024)" },
      { value: "7–12%", label: "Historical range · broad-market diversified" },
      { value: "from $5K", label: "Exempt market entry (product-dependent)" },
    ],
    aboutTitle: "Who I am and why this isn't another money blog",
    about: [
      "Most newcomers in Canada pay their bank a 1.5–2% MER every year for a mutual fund that barely outpaces inflation. The advisor smiles. The numbers in the Fund Facts are tiny print. Over 30 years, the gap between a self-directed ETF and a high-MER mutual fund on the same contributions runs into six figures. That's not bad luck. It's a system nobody explains in your own language.",
      "I'm Andrii Andriushchenko — Licensed Dealing Representative with Axcess Capital, personally registered in AB · BC · ON. Not a banker. Not an insurance agent. I don't ask 'what's your investment budget' — I ask 'what result do you want in 10 years'. TFSA, RRSP, FHSA, exempt market — we work the math together on what actually fits your situation.",
      "Discovery call — 30 minutes, free. If exempt market isn't for you, I'll say so directly and point you to a better alternative. If it is, I show you numbers from the Offering Memorandum — not promises. All materials CCO-approved.",
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
      { q: "Is it really free? What's the catch?", a: "The discovery call is free. If I recommend an exempt market product and you subscribe, I receive commission from the issuer (standard Canadian practice, disclosed in the Offering Memorandum). If not — you pay nothing." },
      { q: "What does a financial advisor actually cost in Canada?", a: "Depends on the model. Bank advisors are 'free' — but the fee is baked into the mutual fund's MER (1.5–2% per year). CIRO independent advisors often charge a % of AUM (1–1.5%). In my case the discovery call is free, and the commission from the issuer (if you subscribe) is disclosed in the Offering Memorandum. No subscription, no payment." },
      { q: "How are you different from a bank?", a: "A bank can only sell what's inside the bank — usually its own mutual funds with a 1.5–2% MER. As a DR I have access to the exempt market — private MICs, REITs, private lending. It's a separate asset class with its own risk and liquidity profile; specific return ranges are something we discuss on the discovery call after a Suitability Assessment." },
      { q: "What's the difference between EMD and CIRO advisors?", a: "EMD (Exempt Market Dealer) is licensed for private securities (MIC, REIT, LP) available only to Eligible/Accredited Investors. CIRO (formerly IIROC + MFDA) is for public securities (ETFs, mutual funds, listed stocks). Two DIFFERENT licenses, one regulator (CSA), different products. I'm EMD. For ETFs/mutual funds you'd want a CIRO advisor. Full comparison at /en/porivnyannia." },
      { q: "What's an Eligible Investor?", a: "CSA NI 45-106 category. Simplified: $75K+ solo income / $125K+ household, or $400K net assets excluding primary residence. It's not an IQ test — it's a regulatory qualification. For lower thresholds there are alternatives via TFSA/RRSP/FHSA. 60-second self-check under NI 45-106 — at /en/eligibility." },
      { q: "How can I verify your registration?", a: "NRD #4575551 on the official CSA site: info.securities-administrators.ca/nrsmobile/nrssearch.aspx. It's the common registry of every registered financial professional in Canada — the check takes 30 seconds. Step-by-step at /en/perevirka." },
      { q: "What's a Suitability Assessment and why does it matter?", a: "NI 31-103 requirement. Before any recommendation I have to assess: your financial situation, goals, time horizon, risk tolerance, knowledge & experience. It's not a formality — it protects you. If I recommend a product that isn't suitable, the regulator can revoke my license. So 'just give me 12% returns' doesn't work — KYC comes first." },
      { q: "I'm a newcomer without $400K yet. Is there still a point?", a: "Yes. 80% of clients start with TFSA/RRSP/FHSA setup. Exempt market comes when the infrastructure is built. The call is still useful — you'll leave with a plan for the next 12 months." },
      { q: "I just arrived on CUAET — do I need to wait?", a: "No. SIN + Canadian banking + permanent address — and you can open TFSA, RRSP, FHSA. The first 12 months in Canada are the best time to learn (while your tax situation is still simple). Exempt market needs the Eligible Investor category, but TFSA/RRSP/FHSA are open to any resident immediately." },
      { q: "What happens after the discovery call?", a: "One of three paths. (1) You're not an Eligible Investor — you get a plan via TFSA/RRSP/FHSA + calculators/guides. We pick up when you're ready. (2) Eligible Investor and ready — formal KYC, Suitability Assessment, specific product + Offering Memorandum for review (5–7 business days). (3) Eligible Investor but exempt market isn't a fit — I refer you to a CIRO advisor for public market alternatives." },
      { q: "Can I invest in exempt market through a TFSA?", a: "Technically yes — exempt market securities can be held in TFSA/RRSP/FHSA accounts if the account is self-directed with alternative-investment support. Practically — most newcomers fund their TFSA with broad-market ETFs first (via a CIRO advisor or self-directed), then layer exempt market in a non-registered or self-directed RRSP. We work the math on the discovery call." },
      { q: "What products exactly can you offer?", a: "Through Axcess Capital — private MICs (mortgage investment corporations), REITs, private lending funds, development LPs. Specific issuers and current offerings are private (NI 45-106 limits public-facing marketing); I show them on the discovery call after KYC. Every product comes with a full Offering Memorandum, fund fact sheet, and audited financials." },
    ],
    ctaTitle: "Ready to figure it out?",
    ctaSub: "30 minutes · Zoom or Google Meet · Available in Ukrainian, Russian, or English.",
    ctaBtn: "Book a discovery call",
    ctaDisclosure:
      "Andrii Andriushchenko — Dealing Representative with Axcess Capital Advisors Inc. (Exempt Market Dealer), NRD #4575551. This is an educational consultation, not personal investment advice.",
    ctaVerify: "Verify my registration",
    footer: {
      tagline: "Wealth building for newcomers to Canada",
      contactTitle: "Contact",
      legalTitle: "Regulatory",
      disclaimer: "Andrii Andriushchenko — Dealing Representative registered with Axcess Capital Advisors Inc. (EMD). Personally registered: Alberta, British Columbia, Ontario. Content is educational and not investment advice.",
      finfluencerNote: "General educational content — not personalised advice. All public materials (including TikTok / Instagram / YouTube) are educational. Personal recommendations are made only after a formal KYC + Suitability Assessment under NI 31-103. Per Joint CSA/CIRO Staff Notice 31-369 (December 2025).",
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
