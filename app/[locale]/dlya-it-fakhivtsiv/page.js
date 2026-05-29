// app/[locale]/dlya-it-fakhivtsiv/page.js
// ICP pillar page #1: IT specialists in Canada (Ukrainian/Russian-speaking
// newcomers in tech). The largest CUAET cohort by salary band; their
// financial-planning needs (RSU vesting, US employer, cross-border tax,
// CCPC for contractors) differ enough from generic newcomer advice to
// justify a dedicated 3000+ word pillar.
//
// 4th re-audit #3.7: ICP-specific pillars are the strongest 2026 topical-
// authority move for an under-supplied YMYL niche in Canadian finance.

import Link from "next/link";
import { ArrowRight, Code, Briefcase, TrendingUp, Target, Coins, Globe } from "lucide-react";
import Logo from "../../_components/Logo";
import Breadcrumbs from "../../_components/Breadcrumbs";
import LangSwitcher from "../../_components/LangSwitcher";
import StaticFaq from "../../_components/StaticFaq";
import CraLimits2026 from "../../_components/CraLimits2026";
import TldrBlock from "../../_components/TldrBlock";
import RelatedLinks from "../../_components/RelatedLinks";
import AuthorByline from "../../_components/AuthorByline";
import ScrollDepthTracker from "../../_components/ScrollDepthTracker";
import { SUPPORTED_LOCALES } from "../../_i18n/dictionary";

const CALENDLY = "https://calendly.com/andriushchenko-partners/new-meeting";

const COPY = {
  uk: {
    titleMeta: "Фінанси для IT-фахівців у Канаді — повний гайд",
    descriptionMeta:
      "Як українському IT-фахівцю в Канаді оптимізувати TFSA, RRSP, FHSA, RSU vesting, ESPP, exempt market — детальний 12-місячний фреймворк. Licensed DR, NRD #4575551.",
    crumbHome: "Головна",
    crumbThis: "Для IT-фахівців",
    eyebrow: "Pillar guide · 2026",
    title: "Фінанси для IT-фахівців у Канаді",
    subtitle: "Як українському senior engineer / dev / PM з $130-300K зарплатою побудувати капітал за 5 років",
    tldr: "Український IT-фахівець з $130-300K доходом у Канаді: у рік RSU vesting max-out RRSP ($33,810 у 2026) щоб збити marginal tax з 47-53% до ~30%, не тримай vested RSU >20% net worth (концентраційний ризик), при $130K+ income переключай TFSA-first на RRSP-first пріоритет.",
    intro:
      "Якщо ти приїхав у Канаду в IT (Shopify, Amazon AWS YYC, Microsoft, SAP, Telus Digital, EQ Bank, fintech, або через CUAET від європейських компаній з remote contract) — твоя ситуація фінансово сильно відрізняється від \"типового новоприбулого\". Високий доход (часто $130-300K base + RSU vesting + ESPP), стабільний T4 або 1099 from US employer, нерідко acceleration vesting events на $50-150K, складна крос-кордонна податкова ситуація — все це робить стандартні \"newcomer fundamentals\" недостатніми. Цей гайд — конкретний 12-місячний фреймворк для IT-фахівців: що робити з кожним долларом, які помилки коштують десятки тисяч, які інструменти canadian tax system дає саме для тебе.",
    sections: [
      {
        icon: Code,
        title: "Перший місяць у Канаді: фундамент який не пропусти",
        body: "SIN + canadian banking + permanent address — і ти готовий. Перші дії: відкрий business chequing у RBC/Scotia/CIBC (НЕ TD — для IT з US employer їх anti-tax-evasion compliance створює зайві перешкоди). Відкрий self-directed broker — Wealthsimple Trade (зарекомендований для newcomers) або Questrade (краще для US-listed securities + RSU custody). Запам'ятай: TFSA contribution room починає накопичуватись з року отримання tax-resident статусу — для тих хто приїхав у 2024-2025 це ≈ $14-21K вже зараз. RRSP room = 0 у перший рік (немає попереднього Canadian earned income), починається з другого року виходячи з твого першого T4. Замов копію NoA після першої tax season — це твоя \"паспортна сторінка\" для всіх broker setups.",
      },
      {
        icon: Briefcase,
        title: "RSU vesting: один з найскладніших аспектів IT compensation",
        body: "Restricted Stock Units (RSU) vesting events додають до твого T4 income значні суми (типово $30-150K на vesting cliff). Це означає що твій marginal tax bracket стрибає тимчасово — у Альберті з 38% на 47%, в Ontario з 43% на 53%. Стратегія: у рік vesting МАКСИМАЛЬНО використовуй RRSP contribution як refund vehicle. $30K у RRSP при 47% marginal = $14K immediate tax refund. Цей refund реінвестуй у TFSA → подвоюєш ефект. Друге: НЕ тримай vested RSU довго у employer stock — концентраційний ризик. Класичне правило: продай 80% одразу, реінвестуй у broad-market ETF (XEQT, VEQT, VFV). 20% можна залишити якщо віриш у компанію.",
      },
      {
        icon: TrendingUp,
        title: "ESPP (Employee Stock Purchase Plan): 15% discount = гарантований return",
        body: "Якщо твій employer пропонує ESPP — це найближче до \"гарантованого 15% return\" що існує легально. Типовий план: ти контрибутиш до 15% salary після податків через payroll deductions, у purchase date ціна = lower of (1) start-of-period price чи (2) end-of-period price, мінус 15% discount. Це auto-arbitrage. Стратегія: max contribute, продай одразу при vesting (lock in discount + market gain), не тримай у компанії довше року. Tax treatment: 15% discount оподатковується як employment income у T4. Якщо тримаєш > 1 рік після purchase — capital gains на appreciation замість employment income. Більшість IT-фахівців роблять помилку тримати ESPP shares років 3-5 \"для diversification\" — це math error. Discount уже locked in; залиш discount, продай stock.",
      },
      {
        icon: Coins,
        title: "TFSA + RRSP + FHSA пріоритезація для IT-фахівця",
        body: "Стандартний newcomer ranking (TFSA first) для IT-фахівця з $150K+ потребує uniques: RRSP стає пріоритетним коли marginal tax >40% (Ontario $130K+, BC $130K+, AB $150K+). Формула: якщо твоя зарплата + RSU/ESPP > $130K у Ontario/BC або $150K у AB — max RRSP першим ($33,810 у 2026), отримуєш ~$15K tax refund, цей refund інвестуй у TFSA ($7K) + FHSA ($8K) + залишок у non-registered. Через 5 років: ~$170K у RRSP + $35K у TFSA + $40K у FHSA = $245K у tax shelters. На додаток LCGE/QSBS не релевантні для employees — це для entrepreneurs (див. /uk/dlya-pidpryyemtsiv).",
      },
      {
        icon: Globe,
        title: "Cross-border issues: US employer, remote work, NWT",
        body: "Якщо твій employer у США (типово для remote engineers) — особлива увага. 1) US tax withholding на твої RSU/ESPP — ти НЕ зобов'язаний платити US tax якщо ти canadian tax resident і не US citizen (запит Form W-8BEN надсилається твоєму employer). 2) Treaty Article XV між Canada і US дає тобі право на foreign tax credit якщо employer не може stop withholding. 3) FBAR (US Treasury reporting) НЕ потрібен якщо ти не US person. 4) RSU vesting у US employer — vesting day валюти conversion за CRA exchange rates. Не використовуй USD straight у T4. 5) Якщо ти на NWT (Non-Resident Withholding Tax) — не довіряй \"общим\" порадам; це нішевий tax area, потребує специфічного CPA. Дискавері call зі мною = identification чи тобі потрібен cross-border specialist.",
      },
      {
        icon: Target,
        title: "Eligible Investor + exempt market: коли і чому",
        body: "Для IT-фахівця з $150K+ зарплати + 2-3 роки в Канаді — Eligible Investor категорія NI 45-106 (net income $75K+ solo або $125K+ household, net assets $400K+) — реальність на 18-24 місяці. Що це відкриває? Доступ до приватних securities через мене як EMD: MICs (target IRR 8-12% historical), commercial REITs (Calgary multi-family або industrial), development LPs (Calgary East Village, Mission, Beltline). Стратегія: спочатку добудуй public market core (TFSA + RRSP + FHSA через broad-market ETF до ~$200K), потім 15-25% net worth у diversified exempt market portfolio. Чому це працює саме для IT: stable T4 income = predictable cash flow для capital commitments, високий total compensation = швидка accumulation до Eligible Investor thresholds. Self-check за 60 секунд: /uk/eligibility.",
      },
    ],
    roadmapTitle: "12-місячний roadmap для IT-фахівця-newcomer",
    roadmap: [
      { month: "Місяць 1-2", action: "SIN, banking, broker setup. Відкрий Wealthsimple/Questrade. Конвертуй \"runway\" cash у CAD (плаваюча конвертація за поточним курсом — Wealthsimple дає mid-market rates)." },
      { month: "Місяць 2-3", action: "Перші TFSA внески у broad-market ETF (XEQT для simplicity або VEQT для US/CA split). Розпочни RRSP automatic monthly contribution навіть якщо room = 0 поки що (наступний рік накопичиш бази)." },
      { month: "Місяць 3-6", action: "Перший RSU vesting або bonus → 80% продай-і-реінвестуй у diversified ETF, 20% залиш якщо віриш у компанію. ESPP — max contribute, продавай при purchase." },
      { month: "Місяць 6-9", action: "Перша Canadian tax season (April). Отримаєш NoA з RRSP room на наступний рік. Подивись чи треба міняти withholding. Збери crypto/forex/etc. з T4-окремих джерел для full income picture." },
      { month: "Місяць 9-12", action: "За результатами першого року: переоптимізуй TFSA/RRSP/FHSA розподіл. Якщо vesting/RSU підняли total income > $130K — переключай пріоритет на RRSP-first. Якщо приближаєшся до Eligible Investor — discovery call зі мною щоб обговорити exempt market entry timing." },
    ],
    pitfallsTitle: "5 типових помилок IT-фахівців у Канаді",
    pitfalls: [
      { title: "Залишати весь vested RSU у employer stock", body: "Концентраційний ризик. Якщо твої RSU + ESPP > 20% net worth у компанії-роботодавцю — у тебе подвійна expoнsure (work income + investment income обидва залежать від однієї компанії). Diversify за 1-2 квартали після vesting." },
      { title: "TFSA внесок з US-listed stocks без urb-conversion", body: "Якщо твій broker дає US-dollar acct у TFSA — і ти тримаєш US стохи там — CRA може стягувати 15% withholding tax на US dividends. У RRSP — exempt (treaty). Стратегія: US stocks у RRSP, canadian stocks/ETF у TFSA. Tax-efficient placement критично для IT-фахівця з diversified portfolio." },
      { title: "Не використовувати RRSP до vesting року", body: "Якщо знаєш що у тебе буде vesting event на $50K+ через 6-12 міс — НЕ contribute у RRSP зараз, save room для maximum tax saving у vesting рік. Marginal rate матиметься на vesting day." },
      { title: "Ігнорувати FHSA \"бо не плануєш покупки\"", body: "FHSA $8K/рік деduktабельний з income і має 15-річний window для перенесення в RRSP без штрафу якщо не купляєш дім. Це додаткові RRSP-equivalent $40K за 5 років. Workaround якщо плани змінились." },
      { title: "Робити US tax filing з Canadian tax preparer", body: "Якщо у тебе є US-source income (RSU/ESPP від US employer, US shares, US rental property) — звичайний H&R Block НЕ кваліфікований. Шукай Canadian CPA з US tax specialization (часто маркуються \"US Person Tax Services\"). Помилки тут — $5-20K корекцій + штрафи." },
    ],
    scenariosTitle: "3 типових сценарії — конкретні числа",
    scenarios: [
      {
        name: "IT-фахівець, single, 28 років, $130K + $25K RSU/рік",
        breakdown: "Marginal tax AB ~38%. План: max RRSP $33,810 → $13K refund → у TFSA $7K + FHSA $8K + non-registered $13K. За 5 років TFSA = ~$48K, RRSP = ~$210K, FHSA = $42K. Total tax-sheltered = ~$300K. Перший дім affordable у Калгарі за 3-4 роки через FHSA + HBP. Eligible Investor на 2-3 рік.",
      },
      {
        name: "Senior dev, married, 35 років, $180K + $40K RSU + spouse $90K",
        breakdown: "Combined income $310K, Ontario marginal на high bracket ~53.5%. RRSP пара = $67K/рік максимум, refund ~$28K. Через 5 років: RRSP family = $400K, TFSA family = $70K, FHSA = $80K (якщо обидва ще не власники дому). Total = ~$550K у tax shelters. Eligible Investor категорія unlocked одразу (income test). 15% net worth у diversified exempt market = ~$80K через мене як EMD.",
      },
      {
        name: "Tech contractor (1099 US employer), 32 років, $220K",
        breakdown: "Self-employed Canadian tax classification — інша гра. Створюй CCPC (Canadian-Controlled Private Corporation) — деталі див. /uk/dlya-pidpryyemtsiv. Salary vs dividend split, IPP (Individual Pension Plan) як corporate-level retirement vehicle, RRSP як personal-level. Через 5 років з properly-structured corp = ~$400K у corporate retained earnings + personal RRSP. На додаток LCGE на майбутньому exit якщо solo founder.",
      },
    ],
    faqTitle: "Часті питання IT-фахівців",
    faq: [
      {
        q: "Чи можу я тримати US-listed stocks (S&P 500, NASDAQ) у TFSA?",
        a: "Технічно так, але tax-неефективно. CRA дозволяє US stocks у TFSA, але US стягує 15% withholding tax на dividends і ти не можеш claim foreign tax credit (TFSA = tax-exempt account). У RRSP — treaty exempts withholding. Стратегія: US-listed dividend-paying stocks → RRSP. US growth stocks (low dividend) можна у TFSA. CA stocks/ETF — будь-який account.",
      },
      {
        q: "Чи варто конвертувати ESPP shares у Canadian-listed equivalent?",
        a: "Не для tax purposes — конверсія = triggered capital gain. Стратегія: продавай ESPP shares (US-listed) при purchase, потім купуй diversified ETF (Canadian-listed) на ту ж суму. Це elaborated cost base + diversification + simpler tax reporting.",
      },
      {
        q: "RRSP чи TFSA пріоритет якщо я планую виїхати з Канади за 3-5 років?",
        a: "TFSA. Якщо ти стаєш Non-Resident, RRSP withdrawal оподатковується 25% Canadian withholding (deemed). TFSA withdrawal у Non-Resident year = tax-free (ти не отримуєш future TFSA room назад). Якщо у плані повернення до України / переїзд до US — TFSA-first завжди.",
      },
      {
        q: "Що робити з мого Ukrainian pension (НПФ) / банківських depositів?",
        a: "Декларуй на CRA Form T1135 (Foreign Income Verification) якщо сумарна foreign assets > $100K CAD. Це не означає що ти платиш податок Канаді на них — це reporting requirement. Закриваючи ukrainian рахунки і trans-сорь у Канаду = можна, але обережно з курсовим conversion (CRA exchange rate, не bank rate). Workаrоund: тримай у offshore (Schwab International, IB) — більше flexibility, але reporting той самий.",
      },
      {
        q: "Чи можу я використати CCPC якщо я W-2 employee (не contractor)?",
        a: "Ні. CCPC підходить для self-employed (1099 US, T4A Canadian, business income). Якщо ти W-2 employee у CA company — твої tax options обмежені TFSA/RRSP/FHSA/non-registered. CCPC тільки якщо паралельно ведеш side business (consulting, training, SaaS, etc.) з documented business activity.",
      },
      {
        q: "Що таке Eligible Investor і чи я ним є?",
        a: "CSA NI 45-106 категорія для access до exempt market. Спрощено: net income $75K solo або $125K household за останні 2 роки + reasonable expectation на наступний АБО net assets $400K (без primary residence). Для IT-фахівця з $130K+ income — типово досягається на 2-3 рік. Self-check за 60 секунд: /uk/eligibility.",
      },
    ],
    bottomCtaTitle: "Готовий побудувати свій IT-конкретний фінансовий план?",
    bottomCtaText:
      "30-хвилинний discovery call. Розберемо твою конкретну compensation структуру (RSU vesting schedule, ESPP, base salary, bonus), tax bracket, immigration status, і побудуємо 12-місячний roadmap з конкретними числами для твоєї situation. Без обіцянок дохідності. CCO-approved.",
    bottomCtaBtn: "Записатись на discovery call",
    secondaryCtaText: "Перш ніж записатись — пройди 60-секундний Eligible Investor self-check",
    secondaryCtaLink: "Self-check NI 45-106 →",
  },
  ru: {
    titleMeta: "Финансы для IT-специалистов в Канаде — полный гайд",
    descriptionMeta:
      "Как русскоязычному IT-специалисту в Канаде оптимизировать TFSA, RRSP, FHSA, RSU vesting, ESPP, exempt market — детальный 12-месячный фреймворк. Licensed DR, NRD #4575551.",
    crumbHome: "Главная",
    crumbThis: "Для IT-специалистов",
    eyebrow: "Pillar guide · 2026",
    title: "Финансы для IT-специалистов в Канаде",
    subtitle: "Как русскоязычному senior engineer / dev / PM с $130-300K зарплатой построить капитал за 5 лет",
    tldr: "Русскоговорящий IT-специалист с $130-300K доходом в Канаде: в год RSU vesting max-out RRSP ($33,810 в 2026) чтобы сбить marginal tax с 47-53% до ~30%, не держи vested RSU >20% net worth, при $130K+ переключай TFSA-first на RRSP-first приоритет.",
    intro:
      "Если ты приехал в Канаду в IT (Shopify, Amazon AWS YYC, Microsoft, SAP, Telus Digital, EQ Bank, fintech, или через CUAET от европейских компаний с remote contract) — твоя ситуация финансово сильно отличается от \"типичного новоприбывшего\". Высокий доход (часто $130-300K base + RSU vesting + ESPP), стабильный T4 или 1099 from US employer, нередко acceleration vesting events на $50-150K, сложная кросс-граничная налоговая ситуация — всё это делает стандартные \"newcomer fundamentals\" недостаточными. Этот гайд — конкретный 12-месячный фреймворк для IT-специалистов: что делать с каждым долларом, какие ошибки стоят десятки тысяч, какие инструменты canadian tax system даёт именно для тебя.",
    sections: [
      {
        icon: Code,
        title: "Первый месяц в Канаде: фундамент который не пропусти",
        body: "SIN + canadian banking + permanent address — и ты готов. Первые действия: открой business chequing в RBC/Scotia/CIBC (НЕ TD — для IT с US employer их anti-tax-evasion compliance создаёт лишние препятствия). Открой self-directed broker — Wealthsimple Trade (рекомендован для newcomers) или Questrade (лучше для US-listed securities + RSU custody). Запомни: TFSA contribution room начинает накапливаться с года получения tax-resident статуса — для тех кто приехал в 2024-2025 это ≈ $14-21K уже сейчас. RRSP room = 0 в первый год (нет предыдущего Canadian earned income), начинается со второго года исходя из твоего первого T4.",
      },
      {
        icon: Briefcase,
        title: "RSU vesting: один из самых сложных аспектов IT compensation",
        body: "Restricted Stock Units (RSU) vesting events добавляют к твоему T4 income значительные суммы (типично $30-150K на vesting cliff). Это означает что твой marginal tax bracket прыгает временно — в Альберте с 38% на 47%, в Ontario с 43% на 53%. Стратегия: в год vesting МАКСИМАЛЬНО используй RRSP contribution как refund vehicle. $30K в RRSP при 47% marginal = $14K immediate tax refund. Этот refund реинвестируй в TFSA → удваиваешь эффект. Второе: НЕ держи vested RSU долго в employer stock — концентрационный риск. Классическое правило: продай 80% сразу, реинвестируй в broad-market ETF (XEQT, VEQT, VFV). 20% можно оставить если веришь в компанию.",
      },
      {
        icon: TrendingUp,
        title: "ESPP (Employee Stock Purchase Plan): 15% discount = гарантированный return",
        body: "Если твой employer предлагает ESPP — это самое близкое к \"гарантированному 15% return\" что существует легально. Типичный план: ты контрибутишь до 15% salary после налогов через payroll deductions, в purchase date цена = lower of (1) start-of-period price или (2) end-of-period price, минус 15% discount. Это auto-arbitrage. Стратегия: max contribute, продай сразу при vesting (lock in discount + market gain). Большинство IT-специалистов делают ошибку держать ESPP shares 3-5 лет \"для diversification\" — это math error. Discount уже locked in; оставь discount, продай stock.",
      },
      {
        icon: Coins,
        title: "TFSA + RRSP + FHSA приоритизация для IT-специалиста",
        body: "Стандартный newcomer ranking (TFSA first) для IT-специалиста с $150K+ требует uniques: RRSP становится приоритетным когда marginal tax >40% (Ontario $130K+, BC $130K+, AB $150K+). Формула: если твоя зарплата + RSU/ESPP > $130K в Ontario/BC или $150K в AB — max RRSP первым ($33,810 в 2026), получаешь ~$15K tax refund, этот refund инвестируй в TFSA ($7K) + FHSA ($8K) + остаток в non-registered. Через 5 лет: ~$170K в RRSP + $35K в TFSA + $40K в FHSA = $245K в tax shelters.",
      },
      {
        icon: Globe,
        title: "Cross-border issues: US employer, remote work, NWT",
        body: "Если твой employer в США (типично для remote engineers) — особое внимание. 1) US tax withholding на твои RSU/ESPP — ты НЕ обязан платить US tax если ты canadian tax resident и не US citizen (запрос Form W-8BEN отправляется твоему employer). 2) Treaty Article XV между Canada и US даёт тебе право на foreign tax credit если employer не может stop withholding. 3) FBAR (US Treasury reporting) НЕ нужен если ты не US person. 4) RSU vesting в US employer — vesting day валюты conversion по CRA exchange rates. Не используй USD straight в T4.",
      },
      {
        icon: Target,
        title: "Eligible Investor + exempt market: когда и почему",
        body: "Для IT-специалиста с $150K+ зарплаты + 2-3 года в Канаде — Eligible Investor категория NI 45-106 (net income $75K+ solo или $125K+ household, net assets $400K+) — реальность на 18-24 месяца. Что это открывает? Доступ к частным securities через меня как EMD: MICs (target IRR 8-12% historical), commercial REITs (Calgary multi-family или industrial), development LPs (Calgary East Village, Mission, Beltline). Стратегия: сначала достроить public market core (TFSA + RRSP + FHSA через broad-market ETF до ~$200K), потом 15-25% net worth в diversified exempt market portfolio. Self-check за 60 секунд: /ru/eligibility.",
      },
    ],
    roadmapTitle: "12-месячный roadmap для IT-специалиста-newcomer",
    roadmap: [
      { month: "Месяц 1-2", action: "SIN, banking, broker setup. Открой Wealthsimple/Questrade. Конвертируй \"runway\" cash в CAD." },
      { month: "Месяц 2-3", action: "Первые TFSA взносы в broad-market ETF (XEQT для simplicity или VEQT для US/CA split). Начни RRSP automatic monthly contribution даже если room = 0 пока что." },
      { month: "Месяц 3-6", action: "Первый RSU vesting или bonus → 80% продай-и-реинвестируй в diversified ETF, 20% оставь если веришь в компанию. ESPP — max contribute, продавай при purchase." },
      { month: "Месяц 6-9", action: "Первая Canadian tax season (April). Получишь NoA с RRSP room на следующий год. Посмотри нужно ли менять withholding." },
      { month: "Месяц 9-12", action: "По результатам первого года: переоптимизируй TFSA/RRSP/FHSA распределение. Если vesting/RSU подняли total income > $130K — переключай приоритет на RRSP-first. Если приближаешься к Eligible Investor — discovery call со мной чтобы обсудить exempt market entry timing." },
    ],
    pitfallsTitle: "5 типичных ошибок IT-специалистов в Канаде",
    pitfalls: [
      { title: "Оставлять весь vested RSU в employer stock", body: "Концентрационный риск. Если твои RSU + ESPP > 20% net worth в компании-работодателе — у тебя двойная exposure. Diversify за 1-2 квартала после vesting." },
      { title: "TFSA взнос с US-listed stocks без understanding tax inefficiency", body: "Если твой broker даёт US-dollar acct в TFSA — и ты держишь US стоки там — CRA может взимать 15% withholding tax на US dividends. В RRSP — exempt (treaty). Стратегия: US stocks в RRSP, canadian stocks/ETF в TFSA." },
      { title: "Не использовать RRSP до vesting года", body: "Если знаешь что у тебя будет vesting event на $50K+ через 6-12 мес — НЕ contribute в RRSP сейчас, save room для maximum tax saving в vesting год." },
      { title: "Игнорировать FHSA \"потому что не планируешь покупки\"", body: "FHSA $8K/год deductible с income и имеет 15-летний window для переноса в RRSP без штрафа если не покупаешь дом. Это дополнительные RRSP-equivalent $40K за 5 лет." },
      { title: "Делать US tax filing с Canadian tax preparer", body: "Если у тебя есть US-source income (RSU/ESPP от US employer, US shares, US rental property) — обычный H&R Block НЕ квалифицирован. Ищи Canadian CPA с US tax specialization." },
    ],
    scenariosTitle: "3 типичных сценария — конкретные числа",
    scenarios: [
      {
        name: "IT-специалист, single, 28 лет, $130K + $25K RSU/год",
        breakdown: "Marginal tax AB ~38%. План: max RRSP $33,810 → $13K refund → в TFSA $7K + FHSA $8K + non-registered $13K. За 5 лет TFSA = ~$48K, RRSP = ~$210K, FHSA = $42K. Total tax-sheltered = ~$300K. Первый дом affordable в Калгари за 3-4 года через FHSA + HBP. Eligible Investor на 2-3 год.",
      },
      {
        name: "Senior dev, married, 35 лет, $180K + $40K RSU + spouse $90K",
        breakdown: "Combined income $310K, Ontario marginal на high bracket ~53.5%. RRSP пара = $67K/год максимум, refund ~$28K. Через 5 лет: RRSP family = $400K, TFSA family = $70K, FHSA = $80K. Total = ~$550K в tax shelters. Eligible Investor категория unlocked сразу.",
      },
      {
        name: "Tech contractor (1099 US employer), 32 года, $220K",
        breakdown: "Self-employed Canadian tax classification — другая игра. Создавай CCPC (Canadian-Controlled Private Corporation) — детали см. /ru/dlya-pidpryyemtsiv. Salary vs dividend split, IPP, RRSP. Через 5 лет с properly-structured corp = ~$400K в corporate retained earnings + personal RRSP.",
      },
    ],
    faqTitle: "Частые вопросы IT-специалистов",
    faq: [
      {
        q: "Могу ли я держать US-listed stocks (S&P 500, NASDAQ) в TFSA?",
        a: "Технически да, но tax-неэффективно. CRA разрешает US stocks в TFSA, но US взимает 15% withholding tax на dividends и ты не можешь claim foreign tax credit. В RRSP — treaty exempts withholding. Стратегия: US-listed dividend-paying stocks → RRSP. US growth stocks → TFSA. CA stocks/ETF — любой account.",
      },
      {
        q: "Стоит ли конвертировать ESPP shares в Canadian-listed equivalent?",
        a: "Не для tax purposes — конверсия = triggered capital gain. Стратегия: продавай ESPP shares (US-listed) при purchase, потом покупай diversified ETF (Canadian-listed) на ту же сумму.",
      },
      {
        q: "RRSP или TFSA приоритет если я планирую выехать из Канады за 3-5 лет?",
        a: "TFSA. Если ты становишься Non-Resident, RRSP withdrawal облагается 25% Canadian withholding (deemed). TFSA withdrawal в Non-Resident year = tax-free. Если в плане возвращение в Украину / переезд в US — TFSA-first всегда.",
      },
      {
        q: "Что делать с моих Russian/Ukrainian банковских depositов?",
        a: "Декларируй на CRA Form T1135 (Foreign Income Verification) если суммарные foreign assets > $100K CAD. Это не означает что ты платишь налог Канаде на них — это reporting requirement.",
      },
      {
        q: "Могу ли я использовать CCPC если я W-2 employee (не contractor)?",
        a: "Нет. CCPC подходит для self-employed (1099 US, T4A Canadian, business income). Если ты W-2 employee в CA company — твои tax options ограничены TFSA/RRSP/FHSA/non-registered.",
      },
      {
        q: "Что такое Eligible Investor и являюсь ли я им?",
        a: "CSA NI 45-106 категория для access к exempt market. Упрощённо: net income $75K solo или $125K household за последние 2 года + reasonable expectation на следующий ИЛИ net assets $400K (без primary residence). Self-check за 60 секунд: /ru/eligibility.",
      },
    ],
    bottomCtaTitle: "Готов построить свой IT-конкретный финансовый план?",
    bottomCtaText:
      "30-минутный discovery call. Разберём твою конкретную compensation структуру (RSU vesting schedule, ESPP, base salary, bonus), tax bracket, immigration status, и построим 12-месячный roadmap с конкретными числами для твоей situation. Без обещаний доходности. CCO-approved.",
    bottomCtaBtn: "Записаться на discovery call",
    secondaryCtaText: "Перед тем как записаться — пройди 60-секундный Eligible Investor self-check",
    secondaryCtaLink: "Self-check NI 45-106 →",
  },
  en: {
    titleMeta: "Finance for tech workers in Canada — full guide",
    descriptionMeta:
      "How a Ukrainian/Russian-speaking IT specialist in Canada optimises TFSA, RRSP, FHSA, RSU vesting, ESPP, and exempt market — a concrete 12-month framework. Licensed DR, NRD #4575551.",
    crumbHome: "Home",
    crumbThis: "For IT specialists",
    eyebrow: "Pillar guide · 2026",
    title: "Finance for IT specialists in Canada",
    subtitle: "How a Ukrainian/Russian-speaking senior engineer / dev / PM on $130-300K builds wealth in 5 years",
    tldr: "Ukrainian tech worker in Canada on $130-300K: in RSU vesting years max out RRSP ($33,810 in 2026) to knock marginal tax from 47-53% down to ~30%, don't hold vested RSUs as >20% of net worth (concentration risk), switch TFSA-first to RRSP-first when income crosses $130K.",
    intro:
      "If you arrived in Canada in tech (Shopify, Amazon AWS YYC, Microsoft, SAP, Telus Digital, EQ Bank, fintech, or via CUAET with a remote contract for a European company) — your financial situation differs substantially from the \"typical newcomer\". High income (often $130-300K base + RSU vesting + ESPP), stable T4 or 1099 from a US employer, frequent acceleration vesting events of $50-150K, and a cross-border tax setup all make generic newcomer fundamentals insufficient. This guide is a concrete 12-month framework for IT specialists: what to do with each dollar, which mistakes cost tens of thousands, and which Canadian tax tools were built for you.",
    sections: [
      {
        icon: Code,
        title: "Month 1 in Canada: the foundation you can't skip",
        body: "SIN + Canadian banking + permanent address — you're ready. First moves: open a business chequing account at RBC/Scotia/CIBC (NOT TD — for IT with a US employer their anti-tax-evasion compliance creates needless friction). Open a self-directed broker — Wealthsimple Trade (newcomer-friendly) or Questrade (better for US-listed securities + RSU custody). Remember: TFSA contribution room starts accumulating from your tax-resident year — for arrivals in 2024-2025 that's ≈ $14-21K already. RRSP room = 0 in year one (no prior Canadian earned income), then builds from year two based on your first T4.",
      },
      {
        icon: Briefcase,
        title: "RSU vesting: one of the trickiest IT-compensation pieces",
        body: "Restricted Stock Units vesting events add meaningful sums to your T4 income (typically $30-150K per cliff). That bumps your marginal bracket — Alberta 38% → 47%, Ontario 43% → 53%. Strategy: in a vesting year MAX OUT RRSP contributions as a refund vehicle. $30K into RRSP at 47% marginal = $14K immediate refund. Reinvest the refund into TFSA → doubled effect. Second: DO NOT hold vested RSU in employer stock long-term — concentration risk. Classic rule: sell 80% immediately, reinvest into a broad-market ETF (XEQT, VEQT, VFV). Keep 20% if you believe in the company.",
      },
      {
        icon: TrendingUp,
        title: "ESPP: a 15% discount = the closest thing to a guaranteed return",
        body: "If your employer offers an ESPP it's the closest legal product to \"guaranteed 15% return\". Typical plan: you contribute up to 15% of salary post-tax via payroll deductions; on purchase date the price = lower of (1) start-of-period or (2) end-of-period price, minus a 15% discount. Auto-arbitrage. Strategy: max contribute, sell immediately at purchase (lock in discount + market gain), don't hold company stock more than a year. Most IT specialists mistakenly hold ESPP shares 3-5 years \"for diversification\" — math error. The discount is already locked in; keep the discount, sell the stock.",
      },
      {
        icon: Coins,
        title: "TFSA + RRSP + FHSA priority order for an IT specialist",
        body: "Standard newcomer ranking (TFSA-first) needs tweaking once IT compensation pushes you into >40% marginal (Ontario $130K+, BC $130K+, AB $150K+). Formula: if salary + RSU/ESPP > $130K in ON/BC or $150K in AB — max RRSP first ($33,810 in 2026), get ~$15K refund, then redirect the refund into TFSA ($7K) + FHSA ($8K) + the remainder into non-registered. Five years: ~$170K RRSP + $35K TFSA + $40K FHSA = $245K in tax shelters.",
      },
      {
        icon: Globe,
        title: "Cross-border issues: US employer, remote work, NWT",
        body: "If your employer is in the US (typical for remote engineers) special care applies. 1) US tax withholding on your RSU/ESPP — you are NOT required to pay US tax if you're a Canadian tax resident and not a US citizen (submit Form W-8BEN to your employer). 2) Treaty Article XV between Canada and US gives you foreign tax credit if the employer can't stop withholding. 3) FBAR (US Treasury reporting) is NOT required if you're not a US person. 4) RSU vesting in a US employer — vesting-day currency conversion via CRA exchange rates, not USD straight on T4.",
      },
      {
        icon: Target,
        title: "Eligible Investor + exempt market: when and why",
        body: "For an IT specialist at $150K+ income + 2-3 years in Canada, Eligible Investor status under NI 45-106 (net income $75K+ solo or $125K+ household, net assets $400K+) is realistic at 18-24 months. What it unlocks: private securities via me as EMD — MICs (historical 8-12% IRR target), commercial REITs (Calgary multi-family or industrial), development LPs (Calgary East Village, Mission, Beltline). Strategy: build the public-market core first (TFSA + RRSP + FHSA through broad-market ETFs to ~$200K), then layer 15-25% net worth into a diversified exempt market portfolio. 60-second self-check: /en/eligibility.",
      },
    ],
    roadmapTitle: "12-month roadmap for an IT newcomer",
    roadmap: [
      { month: "Month 1-2", action: "SIN, banking, broker setup. Open Wealthsimple/Questrade. Convert your \"runway\" cash to CAD at mid-market rates." },
      { month: "Month 2-3", action: "First TFSA contributions into a broad-market ETF (XEQT for simplicity or VEQT for US/CA split). Start automatic monthly RRSP contributions even if room = 0 yet." },
      { month: "Month 3-6", action: "First RSU vesting or bonus → sell-and-reinvest 80% into diversified ETF, keep 20% if you believe in the company. ESPP — max contribute, sell at purchase." },
      { month: "Month 6-9", action: "First Canadian tax season (April). NoA arrives with RRSP room for next year. Check whether your withholding needs adjusting." },
      { month: "Month 9-12", action: "Based on year one results: re-optimise TFSA/RRSP/FHSA allocation. If vesting/RSU push total income > $130K — switch priority to RRSP-first. If you're approaching Eligible Investor status — discovery call to discuss exempt market entry timing." },
    ],
    pitfallsTitle: "5 typical IT-specialist mistakes in Canada",
    pitfalls: [
      { title: "Leaving all vested RSU in employer stock", body: "Concentration risk. If RSU + ESPP > 20% net worth in your employer you have double exposure (work income + investment income depend on the same company). Diversify over 1-2 quarters post-vesting." },
      { title: "TFSA contributions in US-listed stocks without understanding tax inefficiency", body: "If your broker offers USD account in TFSA and you hold US stocks there — CRA can't stop US withholding 15% on dividends, and you can't claim foreign tax credit (TFSA = tax-exempt). RRSP is treaty-exempt. Strategy: US dividend stocks → RRSP, US growth → TFSA, CA stocks → any." },
      { title: "Not saving RRSP room for a vesting year", body: "If you know a $50K+ vesting event is 6-12 months out — DON'T contribute to RRSP now, save the room for maximum tax saving at vesting. Your marginal rate at vesting day matters." },
      { title: "Ignoring FHSA \"because no home plans yet\"", body: "FHSA $8K/year is deductible AND has a 15-year window to roll into RRSP without penalty if you don't buy. That's an extra RRSP-equivalent $40K over 5 years. Hedge if plans change." },
      { title: "Filing US tax with a Canadian tax preparer", body: "If you have US-source income (RSU/ESPP from US employer, US shares, US rentals) — H&R Block is not qualified. Find a Canadian CPA with US tax specialization. Mistakes here = $5-20K corrections + penalties." },
    ],
    scenariosTitle: "3 typical scenarios — concrete numbers",
    scenarios: [
      {
        name: "IT specialist, single, 28, $130K + $25K RSU/year",
        breakdown: "Marginal tax AB ~38%. Plan: max RRSP $33,810 → $13K refund → into TFSA $7K + FHSA $8K + non-registered $13K. Over 5 years TFSA = ~$48K, RRSP = ~$210K, FHSA = $42K. Total tax-sheltered = ~$300K. First home affordable in Calgary in 3-4 years via FHSA + HBP. Eligible Investor by year 2-3.",
      },
      {
        name: "Senior dev, married, 35, $180K + $40K RSU + spouse $90K",
        breakdown: "Combined income $310K, Ontario marginal at high bracket ~53.5%. RRSP couple = $67K/year max, refund ~$28K. Over 5 years: family RRSP = $400K, TFSA = $70K, FHSA = $80K. Total = ~$550K in tax shelters. Eligible Investor unlocked immediately (income test).",
      },
      {
        name: "Tech contractor (1099 US employer), 32, $220K",
        breakdown: "Self-employed Canadian tax classification — different game. Set up a CCPC (see /en/dlya-pidpryyemtsiv for details). Salary vs dividend split, IPP, RRSP. Over 5 years with a properly-structured corp = ~$400K in corporate retained earnings + personal RRSP.",
      },
    ],
    faqTitle: "IT specialist FAQ",
    faq: [
      {
        q: "Can I hold US-listed stocks (S&P 500, NASDAQ) in a TFSA?",
        a: "Technically yes, but tax-inefficient. CRA allows US stocks in TFSA, but the US withholds 15% on dividends and you can't claim a foreign tax credit (TFSA = tax-exempt). RRSP is treaty-exempt. Strategy: US dividend-paying stocks → RRSP. US growth stocks → TFSA OK. CA stocks/ETFs — any account.",
      },
      {
        q: "Should I convert ESPP shares to a Canadian-listed equivalent?",
        a: "Not for tax — the conversion triggers a capital gain. Strategy: sell ESPP shares (US-listed) at purchase, then buy a diversified Canadian-listed ETF for the same amount. Cleaner cost base + diversification + simpler tax reporting.",
      },
      {
        q: "RRSP or TFSA priority if I plan to leave Canada in 3-5 years?",
        a: "TFSA. If you become Non-Resident, RRSP withdrawal is hit with 25% Canadian withholding (deemed). TFSA withdrawal as Non-Resident = tax-free. If you're planning a return to Ukraine or a move to the US — TFSA-first always.",
      },
      {
        q: "What do I do with my Ukrainian / Russian bank deposits?",
        a: "Declare on CRA Form T1135 (Foreign Income Verification) if total foreign assets > $100K CAD. That doesn't mean you pay Canadian tax on them — just a reporting requirement.",
      },
      {
        q: "Can I use a CCPC if I'm W-2 employee (not contractor)?",
        a: "No. CCPC fits self-employed (US 1099, Canadian T4A, business income). If you're W-2 at a CA company your tax options are limited to TFSA/RRSP/FHSA/non-registered.",
      },
      {
        q: "What's an Eligible Investor and am I one?",
        a: "A CSA NI 45-106 category that unlocks the exempt market. Simplified: net income $75K solo or $125K household for the last 2 years + reasonable expectation for the next, OR net assets $400K (excluding primary residence). For IT specialists at $130K+ income that's usually achieved by year 2-3. Self-check: /en/eligibility.",
      },
    ],
    bottomCtaTitle: "Ready to build an IT-specific financial plan?",
    bottomCtaText:
      "30-minute discovery call. We work through your specific compensation structure (RSU vesting schedule, ESPP, base salary, bonus), tax bracket, immigration status, and build a 12-month roadmap with concrete numbers for your situation. No return promises. CCO-approved.",
    bottomCtaBtn: "Book a discovery call",
    secondaryCtaText: "Before booking — take the 60-second Eligible Investor self-check",
    secondaryCtaLink: "NI 45-106 self-check →",
  },
};

export async function generateStaticParams() {
  return SUPPORTED_LOCALES.map((locale) => ({ locale }));
}

export async function generateMetadata({ params }) {
  const { locale } = await params;
  const c = COPY[locale] || COPY.uk;
  const path = `/${locale}/dlya-it-fakhivtsiv`;
  const alternates = Object.fromEntries(
    SUPPORTED_LOCALES.map((l) => [
      { uk: "uk", ru: "ru", en: "en-CA" }[l],
      `/${l}/dlya-it-fakhivtsiv`,
    ])
  );
  alternates["x-default"] = "/uk/dlya-it-fakhivtsiv";
  return {
    title: c.titleMeta,
    description: c.descriptionMeta,
    keywords: [
      "IT specialists Canada finance",
      "TFSA RRSP IT Canada",
      "RSU vesting Canada tax",
      "ESPP Canada strategy",
      "IT-фахівці Канада фінанси",
      "IT-специалисты Канада финансы",
      "Eligible Investor IT Canada",
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
      title: c.title,
      description: c.descriptionMeta,
    },
  };
}

function buildJsonLd(locale, c, path) {
  return {
    "@context": "https://schema.org",
    "@type": "Article",
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
    publisher: { "@type": "FinancialService", name: "SkyFort Wealth", url: "https://sky-fort.ca" },
    mainEntityOfPage: { "@type": "WebPage", "@id": `https://sky-fort.ca${path}` },
  };
}

export default async function ItPillarPage({ params }) {
  const { locale } = await params;
  const c = COPY[locale] || COPY.uk;
  const path = `/${locale}/dlya-it-fakhivtsiv`;

  return (
    <main id="main" className="min-h-screen bg-[var(--color-bg)] text-white">
      <ScrollDepthTracker page="dlya-it-fakhivtsiv" />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(buildJsonLd(locale, c, path)) }}
      />

      <nav className="fixed inset-x-0 top-0 z-50 border-b border-[#2a2a2a] bg-[#191919]/80 backdrop-blur-xl">
        <div className="mx-auto flex max-w-5xl items-center justify-between px-6 py-4">
          <Link href={`/${locale}`}><Logo variant="full" /></Link>
          <LangSwitcher locale={locale} />
        </div>
      </nav>

      <div className="mx-auto max-w-4xl px-6 pt-28">
        <Breadcrumbs items={[{ label: c.crumbHome, href: `/${locale}` }, { label: c.crumbThis }]} />

        <header className="mt-10 pb-10">
          <p className="mb-4 text-[10px] font-bold uppercase tracking-[0.3em] text-[var(--color-brand)]">{c.eyebrow}</p>
          <h1 className="font-display-tight text-4xl text-white md:text-6xl">{c.title}</h1>
          <p className="mt-4 text-xl font-bold text-[#c4c4c4] md:text-2xl">{c.subtitle}</p>
          <p className="mt-6 text-lg leading-relaxed text-[#a3a3a3]">{c.intro}</p>
        </header>

        <div className="pb-4">
          <TldrBlock
            text={c.tldr}
            pageName={c.titleMeta}
            pageUrl={`https://sky-fort.ca/${locale}/dlya-it-fakhivtsiv`}
          />
          <div className="mt-4">
            <AuthorByline locale={locale} />
          </div>
        </div>

        <section className="mt-8 pb-12 space-y-5">
          {c.sections.map((s, i) => {
            const Icon = s.icon;
            return (
              <article key={i} className="rounded-2xl border border-[var(--color-border)] bg-[var(--color-bg-card)] p-7 md:p-8">
                <div className="flex items-start gap-5">
                  <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-xl border border-[var(--color-brand)]/30 bg-[var(--color-brand)]/10">
                    <Icon className="h-5 w-5 text-[var(--color-brand)]" aria-hidden="true" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <h2 className="font-display text-xl text-white md:text-2xl">{s.title}</h2>
                    <p className="mt-3 text-base leading-relaxed text-[#c4c4c4]">{s.body}</p>
                  </div>
                </div>
              </article>
            );
          })}
        </section>

        <CraLimits2026 locale={locale} />

        <section className="mt-8 pb-12">
          <h2 className="mb-6 font-display text-3xl text-white md:text-4xl">{c.roadmapTitle}</h2>
          <ol className="space-y-3">
            {c.roadmap.map((step, i) => (
              <li key={i} className="rounded-xl border border-[var(--color-border)] bg-[var(--color-bg-card)] p-5">
                <div className="text-xs font-bold uppercase tracking-wider text-[var(--color-brand)]">{step.month}</div>
                <p className="mt-2 text-sm text-[#c4c4c4]">{step.action}</p>
              </li>
            ))}
          </ol>
        </section>

        <section className="mt-8 pb-12">
          <h2 className="mb-6 font-display text-3xl text-white md:text-4xl">{c.pitfallsTitle}</h2>
          <ul className="space-y-3">
            {c.pitfalls.map((p, i) => (
              <li key={i} className="rounded-xl border border-[var(--color-border)] bg-[var(--color-bg-card)] p-5">
                <div className="font-semibold text-white">{i + 1}. {p.title}</div>
                <p className="mt-2 text-sm text-[#a3a3a3]">{p.body}</p>
              </li>
            ))}
          </ul>
        </section>

        <section className="mt-8 pb-12">
          <h2 className="mb-6 font-display text-3xl text-white md:text-4xl">{c.scenariosTitle}</h2>
          <ul className="space-y-3">
            {c.scenarios.map((s, i) => (
              <li key={i} className="rounded-2xl border border-[var(--color-brand)]/30 bg-gradient-to-br from-[var(--color-bg-card)] to-[#1a2d4a] p-6">
                <div className="font-bold text-white">{s.name}</div>
                <p className="mt-3 text-sm leading-relaxed text-[#c4c4c4]">{s.breakdown}</p>
              </li>
            ))}
          </ul>
        </section>
      </div>

      <RelatedLinks
        heading={
          locale === "ru" ? "Связанные руководства" : locale === "en" ? "Related guides" : "Пов'язані гайди"
        }
        items={[
          {
            href: `/${locale}/dlya-mediks`,
            label: locale === "ru" ? "Для медиков" : locale === "en" ? "For physicians" : "Для медиків",
            description: locale === "ru" ? "MPC, IPP, holdco — гайд для врачей." : locale === "en" ? "MPC, IPP, holdco — physician pillar." : "MPC, IPP, holdco — гайд для лікарів.",
          },
          {
            href: `/${locale}/dlya-pidpryyemtsiv`,
            label: locale === "ru" ? "Для предпринимателей" : locale === "en" ? "For founders" : "Для підприємців",
            description: locale === "ru" ? "CCPC, TOSI, LCGE — гайд для founders." : locale === "en" ? "CCPC, TOSI, LCGE — founder pillar." : "CCPC, TOSI, LCGE — гайд для засновників.",
          },
          {
            href: `/${locale}/eligibility`,
            label: locale === "ru" ? "Eligible Investor self-check" : locale === "en" ? "Eligible Investor self-check" : "Eligible Investor self-check",
            description: locale === "ru" ? "60 секунд — попадаешь ли ты в exempt market." : locale === "en" ? "60 seconds — do you fit exempt market thresholds?" : "60 секунд — чи попадаєш у exempt market.",
          },
          {
            href: `/${locale}/calculators/tfsa-growth`,
            label: locale === "ru" ? "TFSA calculator" : locale === "en" ? "TFSA calculator" : "TFSA калькулятор",
            description: locale === "ru" ? "Compound math на твои реальные числа." : locale === "en" ? "Compound math on your real numbers." : "Compound math на твої реальні числа.",
          },
        ]}
      />
      <StaticFaq faq={c.faq} heading={c.faqTitle} jsonLdId={`https://sky-fort.ca${path}#faq`} />

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
            <ArrowRight className="h-4 w-4" aria-hidden="true" />
          </a>
        </div>
        <div className="mt-6 text-sm">
          <Link href={`/${locale}/eligibility`} className="text-[var(--color-brand)] hover:text-[var(--color-brand-hover)]">
            {c.secondaryCtaText} · {c.secondaryCtaLink}
          </Link>
        </div>
      </section>
    </main>
  );
}
