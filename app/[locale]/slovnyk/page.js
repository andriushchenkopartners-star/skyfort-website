// app/[locale]/slovnyk/page.js
// Canadian personal-finance glossary — 30+ key terms (CRA, CSA, NI 45-106,
// MPC, CCPC, exempt market). Schema: DefinedTermSet with one DefinedTerm
// per row. Schema.org DefinedTermSet is exactly what AI Overviews and
// Perplexity/Claude/ChatGPT search use to extract canonical definitions
// — strong signal that this site is a referenceable knowledge base.
//
// Compliance posture: definitions are factual + source-attributed
// (canada.ca, ASC, CSA, IFSE). No recommendations, no return claims.
// Each term links to deeper coverage on the site where one exists.
//
// 4th re-audit follow-up: AI search SERP-features prefer "glossary"
// pages with structured term/definition pairs over flowing prose.

import Link from "next/link";
import { BookOpen, ExternalLink } from "lucide-react";
import Logo from "../../_components/Logo";
import Breadcrumbs from "../../_components/Breadcrumbs";
import LangSwitcher from "../../_components/LangSwitcher";
import { SUPPORTED_LOCALES } from "../../_i18n/dictionary";

// Each term: { id, term, definition, source: {label, url}, related: {label, href}? }
// Definitions are 1-3 sentences max so they fit AI-search snippet format.
// IDs become anchor fragments (#tfsa, #rrsp, etc.) for direct linking.
const TERMS_UK = [
  {
    id: "tfsa",
    term: "TFSA — Tax-Free Savings Account",
    definition:
      "Канадський податковий рахунок: інвестиції зростають без податку, withdrawal без штрафу. Ліміт у 2026: $7,000/рік. Cumulative room для tax-resident з 2009 = $109,000. Room починає накопичуватись з року отримання tax-resident статусу.",
    source: { label: "canada.ca/TFSA", url: "https://www.canada.ca/en/revenue-agency/services/tax/individuals/topics/tax-free-savings-account.html" },
    related: { label: "TFSA калькулятор", href: "/calculators/tfsa-growth" },
  },
  {
    id: "rrsp",
    term: "RRSP — Registered Retirement Savings Plan",
    definition:
      "Tax-deferred пенсійний рахунок: внески віднімаються з income (зменшують tax bill), зростають без податку до withdrawal. Ліміт 2026: 18% earned income попереднього року, до $33,810. Conversion у RRIF до 71 року.",
    source: { label: "canada.ca/RRSP", url: "https://www.canada.ca/en/revenue-agency/services/tax/individuals/topics/rrsps-related-plans.html" },
  },
  {
    id: "fhsa",
    term: "FHSA — First Home Savings Account",
    definition:
      "Гібрид TFSA+RRSP для першої купівлі дому. Ліміт $8,000/рік, $40,000 lifetime. Внески віднімаються з income (як RRSP), withdrawal на дім — без податку (як TFSA). 15-річний window — якщо не купив дім, можна перевести у RRSP без штрафу.",
    source: { label: "canada.ca/FHSA", url: "https://www.canada.ca/en/revenue-agency/services/tax/individuals/topics/first-home-savings-account.html" },
  },
  {
    id: "resp",
    term: "RESP — Registered Education Savings Plan",
    definition:
      "Tax-deferred рахунок для освіти дитини. Уряд додає CESG (Canada Education Savings Grant) — 20% від внеску, до $500/рік, lifetime maximum $7,200 на дитину. Lifetime contribution limit $50,000. Withdrawal оподатковується на ім'я студента (typically низький bracket).",
    source: { label: "canada.ca/RESP", url: "https://www.canada.ca/en/services/benefits/education/education-savings.html" },
  },
  {
    id: "cesg",
    term: "CESG — Canada Education Savings Grant",
    definition:
      "Безкоштовний грант від уряду в RESP: 20% від твого внеску, до $500/рік на дитину, lifetime maximum $7,200. \"Гарантований 20% return\" на перший $2,500 внеску на рік. Низькі income сім'ї отримують додатковий A-CESG до 40%.",
    source: { label: "canada.ca/CESG", url: "https://www.canada.ca/en/services/benefits/education/education-savings/cesg.html" },
  },
  {
    id: "hbp",
    term: "HBP — Home Buyers' Plan",
    definition:
      "Можливість позичити до $60,000 з власного RRSP для першої купівлі дому (без податку на withdrawal). Повертати треба протягом 15 років починаючи з 2 року після withdrawal. Часто комбінується з FHSA для максимального down payment.",
    source: { label: "canada.ca/HBP", url: "https://www.canada.ca/en/revenue-agency/services/tax/individuals/topics/rrsps-related-plans/what-home-buyers-plan.html" },
  },
  {
    id: "ccpc",
    term: "CCPC — Canadian-Controlled Private Corporation",
    definition:
      "Приватна корпорація, де >50% акцій належать canadian residents. Має доступ до SBD (Small Business Deduction) — federal corporate tax 9% на перші $500K active business income (звичайна ставка ~38%). База для більшості entrepreneur tax planning.",
    source: { label: "canada.ca/CCPC", url: "https://www.canada.ca/en/revenue-agency/services/tax/businesses/small-businesses-self-employed-income/corporations.html" },
    related: { label: "Гайд для підприємців", href: "/dlya-pidpryyemtsiv" },
  },
  {
    id: "mpc",
    term: "MPC — Medical Professional Corporation",
    definition:
      "Спеціалізована CCPC дозволена для ліцензованих лікарів у більшості провінцій (AB, BC, ON). Дає ті ж SBD переваги + дозволяє spouse як shareholder (income splitting in AB/BC, обмежено в ON через TOSI). Зазвичай incorporate на 2-3 рік practice.",
    source: { label: "CMA — MPC overview", url: "https://www.cma.ca/" },
    related: { label: "Гайд для медиків", href: "/dlya-mediks" },
  },
  {
    id: "sbd",
    term: "SBD — Small Business Deduction",
    definition:
      "Federal corporate tax knockdown для CCPC: на перші $500K active business income — 9% замість 15%. Plus provincial reduction (Alberta 2%, BC 2%, Ontario 3.2%) → total ефективна ставка 11-12% на перший $500K. Phase-out починається з $50K passive income.",
    source: { label: "canada.ca/SBD", url: "https://www.canada.ca/en/revenue-agency/services/tax/businesses/topics/corporations/types-corporations/small-business-corporations.html" },
  },
  {
    id: "lcge",
    term: "LCGE — Lifetime Capital Gains Exemption",
    definition:
      "Можливість sell QSBS (Qualified Small Business Share) акції без податку на capital gains до lifetime limit (2026 ≈ $1.27M, indexed). Тільки для CCPC, акції власної компанії, з 24-місячним holding + 50%+ active business asset test. Ключовий exit-stage benefit.",
    source: { label: "canada.ca/LCGE", url: "https://www.canada.ca/en/revenue-agency/services/tax/individuals/topics/about-your-tax-return/tax-return/completing-a-tax-return/personal-income/line-25400-capital-gains-deduction.html" },
  },
  {
    id: "qsbs",
    term: "QSBS — Qualified Small Business Share",
    definition:
      "Акції CCPC, які кваліфікуються на LCGE. Вимоги: 24-місячне holding period + у момент sale 90%+ assets є active business assets in Canada + у весь holding period 50%+ active assets. Pre-exit \"purification\" може потребуватись щоб скинути passive investments.",
    source: { label: "Income Tax Act §110.6", url: "https://laws-lois.justice.gc.ca/eng/acts/I-3.3/" },
  },
  {
    id: "tosi",
    term: "TOSI — Tax on Split Income",
    definition:
      "Anti-income-splitting правило CRA з 2018: dividends та income з CCPC до family members оподатковуються по highest marginal rate (typically 47-53%), якщо вони не \"actively engaged\" (середній 20 годин/тиждень). Має винятки: вік 65+ власника, age 25+ + 10% ownership, etc.",
    source: { label: "canada.ca/TOSI", url: "https://www.canada.ca/en/revenue-agency/services/tax/businesses/topics/sole-proprietorships-partnerships/tax-on-split-income.html" },
  },
  {
    id: "ipp",
    term: "IPP — Individual Pension Plan",
    definition:
      "Defined-benefit pension plan для одного employee (зазвичай owner-manager CCPC, лікар у MPC). Дозволяє внески значно вищі за RRSP ($40-70K/рік замість $33K) для людей 40+. Funded корпорацією, deductible business expense. Має setup та adminкоштовність ~$3-5K/рік.",
    source: { label: "OSFI — IPP guidance", url: "https://www.osfi-bsif.gc.ca/" },
    related: { label: "Гайд для медиків", href: "/dlya-mediks" },
  },
  {
    id: "rsu",
    term: "RSU — Restricted Stock Unit",
    definition:
      "Форма equity compensation: компанія обіцяє акції після vesting period. У день vesting fair market value додається до твого T4 income і оподатковується як employment income. У Канаді типово 4-річне vesting з 1-річним cliff.",
    source: { label: "CRA — equity compensation", url: "https://www.canada.ca/en/revenue-agency/services/tax/businesses/topics/payroll/benefits-allowances/security-options.html" },
    related: { label: "Гайд для IT-фахівців", href: "/dlya-it-fakhivtsiv" },
  },
  {
    id: "espp",
    term: "ESPP — Employee Stock Purchase Plan",
    definition:
      "Програма де ти контрибутиш частину salary через payroll deductions (typically до 15%) на покупку акцій компанії з discount (typically 15%) у defined purchase dates. Discount оподатковується як employment income; appreciation після purchase — capital gains.",
    source: { label: "CRA — ESPP guidance", url: "https://www.canada.ca/en/revenue-agency/services/tax/businesses/topics/payroll/benefits-allowances/security-options.html" },
  },
  {
    id: "eligible-investor",
    term: "Eligible Investor (NI 45-106 §1.1)",
    definition:
      "Категорія канадських інвесторів які можуть купувати exempt market securities. Вимоги (alternative): (a) net assets $400K+ alone or with spouse, OR (b) pre-tax net income $75K solo / $125K with spouse у 2 з останніх років з expectation продовження.",
    source: { label: "CSA — NI 45-106", url: "https://www.osc.ca/en/securities-law/instruments-rules-policies/4/45-106" },
    related: { label: "60-секундний self-check", href: "/eligibility" },
  },
  {
    id: "accredited-investor",
    term: "Accredited Investor (NI 45-106 §1.1)",
    definition:
      "Вища категорія exempt-market інвесторів. Вимоги (any): (a) net income $200K solo / $300K з spouse у 2 з останніх років, OR (b) net financial assets $1M+ alone or with spouse, OR (c) total net assets $5M+. Доступ до ширшого набору securities + permitted clients для discretionary management.",
    source: { label: "CSA — NI 45-106", url: "https://www.osc.ca/en/securities-law/instruments-rules-policies/4/45-106" },
  },
  {
    id: "emd",
    term: "EMD — Exempt Market Dealer",
    definition:
      "Категорія фірми ліцензованої CSA для дистрибуції securities у exempt market. Може продавати private placements, MICs, private REITs, development LPs до Eligible/Accredited investors. Не може продавати public market securities (різниця від CIRO firm).",
    source: { label: "CSA — EMD overview", url: "https://www.securities-administrators.ca/" },
    related: { label: "EMD vs CIRO vs Insurance", href: "/porivnyannia" },
  },
  {
    id: "ciro",
    term: "CIRO — Canadian Investment Regulatory Organization",
    definition:
      "Самоврядна організація що регулює investment dealers (раніше IIROC) та mutual fund dealers (раніше MFDA). CIRO advisors можуть продавати public market securities — ETF, mutual funds, окремі акції. Перевірка через CIRO AdvisorReport.",
    source: { label: "ciro.ca", url: "https://www.ciro.ca/" },
  },
  {
    id: "nrd",
    term: "NRD — National Registration Database",
    definition:
      "Центральний реєстр CSA усіх ліцензованих financial professionals у Канаді. Кожен Licensed Dealing Representative має NRD номер. Безкоштовний публічний lookup через info.securities-administrators.ca/nrsmobile/nrssearch.aspx — найшвидший спосіб verify будь-якого радника.",
    source: { label: "NRD search", url: "https://info.securities-administrators.ca/nrsmobile/nrssearch.aspx" },
    related: { label: "Перевір мене за 3 хвилини", href: "/perevirka" },
  },
  {
    id: "mic",
    term: "MIC — Mortgage Investment Corporation",
    definition:
      "Спеціальна форма канадської корпорації (Income Tax Act §130.1) для pooled mortgage lending. 100% net income розподіляється акціонерам як dividends (треба для MIC статусу). Поширений exempt market product з target historical returns 7-12%.",
    source: { label: "Income Tax Act §130.1", url: "https://laws-lois.justice.gc.ca/eng/acts/I-3.3/" },
  },
  {
    id: "reit",
    term: "REIT — Real Estate Investment Trust",
    definition:
      "Trust що володіє income-producing real estate. Public REITs торгуються на TSX (доступно через будь-якого broker). Private/exempt REITs — через EMD до Eligible/Accredited investors. Розподіляють 90%+ net income як distributions.",
    source: { label: "CRA — REIT taxation", url: "https://www.canada.ca/en/revenue-agency/services/tax/businesses/topics/corporations.html" },
  },
  {
    id: "noa",
    term: "NoA — Notice of Assessment",
    definition:
      "Документ від CRA після обробки tax return. Містить твій RRSP contribution room на наступний рік + TFSA room + усі carry-forwards. Критичний документ для broker setups та tax planning. Можна отримати через CRA My Account.",
    source: { label: "CRA My Account", url: "https://www.canada.ca/en/revenue-agency/services/e-services/cra-my-account.html" },
  },
  {
    id: "obsi",
    term: "OBSI — Ombudsman for Banking Services and Investments",
    definition:
      "Незалежний канал розгляду скарг на банки + investment dealers у Канаді. Якщо проти радника є офіційна скарга — вона зафіксована публічно в OBSI records. Free-to-use для consumers. Перевірка через obsi.ca.",
    source: { label: "obsi.ca", url: "https://www.obsi.ca/en/index.aspx" },
  },
  {
    id: "ifse",
    term: "IFSE — IFSE Institute (Exempt Market Proficiency)",
    definition:
      "Підрозділ IFIC що випускає IFSE Exempt Market Proficiency Course (EMP) — обов'язкову кваліфікацію для Dealing Representative категорії. Без сертифіката IFSE — NRD реєстрація неможлива. Курс акредитований CSA.",
    source: { label: "ifse.ca/EMP", url: "https://www.ifse.ca/courses/exempt-market-products-emp/" },
  },
  {
    id: "csa",
    term: "CSA — Canadian Securities Administrators",
    definition:
      "Зонтична організація 13 provincial/territorial securities regulators (ASC, BCSC, OSC, etc.). Координує National Instruments (NI 31-103, NI 45-106), які діють як єдиний federal-equivalent securities law у Канаді.",
    source: { label: "securities-administrators.ca", url: "https://www.securities-administrators.ca/" },
  },
  {
    id: "asc",
    term: "ASC — Alberta Securities Commission",
    definition:
      "Регулятор securities ринку Альберти. Член CSA. Веде registry усіх firms та individuals зареєстрованих у AB — включно з Axcess Capital Advisors Inc. (фірма, через яку я працюю). Перевірка через asc.ca/Public-Registrants.",
    source: { label: "asc.ca", url: "https://www.asc.ca/" },
  },
  {
    id: "cuaet",
    term: "CUAET — Canada-Ukraine Authorization for Emergency Travel",
    definition:
      "Спеціальна програма (2022-2024) для українців через war. Не immigration permanent статус — temporary residence + open work permit до 3 років. Tax-resident статус з моменту \"establishing residential ties\" у Канаді (typically arrival date).",
    source: { label: "canada.ca/CUAET", url: "https://www.canada.ca/en/immigration-refugees-citizenship/services/immigrate-canada/ukraine-measures.html" },
  },
  {
    id: "finfluencer",
    term: "Finfluencer",
    definition:
      "Особа що публікує фінансовий контент у соц медіа без професійної ліцензії. Joint CSA/CIRO Staff Notice 31-369 (Dec 2025) встановлює правила: освітній контент дозволений, конкретні рекомендації купити-продати конкретні securities — нелегальні без registration.",
    source: { label: "CSA Notice 31-369", url: "https://www.securities-administrators.ca/" },
    related: { label: "Повне пояснення", href: "/finfluencer-compliance" },
  },
  {
    id: "ymyl",
    term: "YMYL — Your Money or Your Life",
    definition:
      "Google категорія high-stakes контенту (фінанси, здоров'я, право), для якого Search Quality Rater Guidelines вимагають вищого рівня E-E-A-T (Experience, Expertise, Authoritativeness, Trust). Фінансовий контент від licensed professionals має суттєву SERP перевагу над unverified авторами.",
    source: { label: "Google Search Quality Guidelines", url: "https://static.googleusercontent.com/media/guidelines.raterhub.com/en//searchqualityevaluatorguidelines.pdf" },
  },
];

// RU translations of the same set, abbreviated.
const TERMS_RU = TERMS_UK.map((t) => {
  const rmap = {
    "tfsa": "TFSA — Tax-Free Savings Account",
    "rrsp": "RRSP — Registered Retirement Savings Plan",
    "fhsa": "FHSA — First Home Savings Account",
    "resp": "RESP — Registered Education Savings Plan",
    "cesg": "CESG — Canada Education Savings Grant",
    "hbp": "HBP — Home Buyers' Plan",
    "ccpc": "CCPC — Canadian-Controlled Private Corporation",
    "mpc": "MPC — Medical Professional Corporation",
    "sbd": "SBD — Small Business Deduction",
    "lcge": "LCGE — Lifetime Capital Gains Exemption",
    "qsbs": "QSBS — Qualified Small Business Share",
    "tosi": "TOSI — Tax on Split Income",
    "ipp": "IPP — Individual Pension Plan",
    "rsu": "RSU — Restricted Stock Unit",
    "espp": "ESPP — Employee Stock Purchase Plan",
    "eligible-investor": "Eligible Investor (NI 45-106 §1.1)",
    "accredited-investor": "Accredited Investor (NI 45-106 §1.1)",
    "emd": "EMD — Exempt Market Dealer",
    "ciro": "CIRO — Canadian Investment Regulatory Organization",
    "nrd": "NRD — National Registration Database",
    "mic": "MIC — Mortgage Investment Corporation",
    "reit": "REIT — Real Estate Investment Trust",
    "noa": "NoA — Notice of Assessment",
    "obsi": "OBSI — Ombudsman for Banking Services and Investments",
    "ifse": "IFSE — IFSE Institute (Exempt Market Proficiency)",
    "csa": "CSA — Canadian Securities Administrators",
    "asc": "ASC — Alberta Securities Commission",
    "cuaet": "CUAET — Canada-Ukraine Authorization for Emergency Travel",
    "finfluencer": "Finfluencer",
    "ymyl": "YMYL — Your Money or Your Life",
  };
  const dmap = {
    "tfsa": "Канадский налоговый счёт: инвестиции растут без налога, withdrawal без штрафа. Лимит 2026: $7,000/год. Cumulative room для tax-resident с 2009 = $109,000.",
    "rrsp": "Tax-deferred пенсионный счёт: взносы вычитаются с income, растут без налога до withdrawal. Лимит 2026: 18% earned income предыдущего года, до $33,810.",
    "fhsa": "Гибрид TFSA+RRSP для первой покупки дома. Лимит $8,000/год, $40,000 lifetime. Взносы вычитаются с income, withdrawal на дом — без налога.",
    "resp": "Tax-deferred счёт для образования ребёнка. Уряд добавляет CESG — 20% от взноса, lifetime $7,200. Lifetime contribution $50,000.",
    "cesg": "Бесплатный грант от уряда в RESP: 20% от взноса, до $500/год на ребёнка, lifetime $7,200. \"Гарантированный 20% return\" на первые $2,500/год.",
    "hbp": "Возможность одолжить до $60,000 с собственного RRSP для первой покупки дома. Вернуть в течение 15 лет начиная со 2-го года.",
    "ccpc": "Частная корпорация где >50% акций принадлежат canadian residents. Доступ к SBD — federal corporate tax 9% на первые $500K active business income.",
    "mpc": "Специализированная CCPC для лицензированных врачей (AB, BC, ON). Те же SBD преимущества + spouse как shareholder.",
    "sbd": "Federal corporate tax knockdown для CCPC: на первые $500K — 9% вместо 15%. Plus provincial reduction. Phase-out с $50K passive income.",
    "lcge": "Sell QSBS акции без налога на capital gains до lifetime limit (~$1.27M в 2026). Только для CCPC с 24-месячным holding.",
    "qsbs": "Акции CCPC которые квалифицируются на LCGE. 24-месячное holding + 90%+ active business assets в Canada в момент sale.",
    "tosi": "Anti-income-splitting правило CRA с 2018: dividends с CCPC к family members оподатковуются по highest marginal rate.",
    "ipp": "Defined-benefit pension plan для одного employee. Взносы $40-70K/год вместо $33K RRSP для людей 40+. Funded корпорацией.",
    "rsu": "Форма equity compensation: компания обещает акции после vesting period. FMV в день vesting — employment income в T4.",
    "espp": "Программа покупки акций компании с discount (15%) через payroll deductions. Discount = employment income; appreciation = capital gains.",
    "eligible-investor": "Категория канадских инвесторов: net assets $400K+ ИЛИ pre-tax income $75K solo / $125K с spouse 2 года подряд.",
    "accredited-investor": "Высшая категория: income $200K solo / $300K с spouse 2 года, ИЛИ net financial assets $1M+, ИЛИ total net assets $5M+.",
    "emd": "Категория фирмы лицензированной CSA для дистрибуции exempt market securities. Не может продавать public market securities.",
    "ciro": "Самоуправляемая организация регулирующая investment dealers и mutual fund dealers. CIRO advisors продают public market securities.",
    "nrd": "Центральный реестр CSA всех лицензированных financial professionals в Канаде. Каждый Licensed DR имеет NRD номер.",
    "mic": "Специальная корпорация (Income Tax Act §130.1) для pooled mortgage lending. 100% net income как dividends. Target returns 7-12% historical.",
    "reit": "Trust владеющий income-producing real estate. Public REITs — на TSX. Private REITs — через EMD к Eligible/Accredited investors.",
    "noa": "Документ от CRA после обработки tax return. Содержит RRSP room + TFSA room + carry-forwards. Получить через CRA My Account.",
    "obsi": "Независимый канал жалоб на банки + investment dealers в Канаде. Жалобы публично зафиксированы. Free-to-use для consumers.",
    "ifse": "Подразделение IFIC выпускающее EMP Course — обязательная квалификация для DR категории. Курс акредитирован CSA.",
    "csa": "Зонтичная организация 13 provincial/territorial securities regulators. Координирует National Instruments (NI 31-103, NI 45-106).",
    "asc": "Регулятор securities рынка Альберты. Член CSA. Ведёт registry firms и individuals зарегистрированных в AB.",
    "cuaet": "Специальная программа (2022-2024) для украинцев. Temporary residence + open work permit до 3 лет.",
    "finfluencer": "Лицо публикующее финансовый контент в соц медиа без профессиональной лицензии. Joint CSA/CIRO Notice 31-369 (Dec 2025) устанавливает правила.",
    "ymyl": "Google категория high-stakes контента (финансы, здоровье, право). Search Quality Rater Guidelines требуют высокого E-E-A-T.",
  };
  return { ...t, term: rmap[t.id] || t.term, definition: dmap[t.id] || t.definition };
});

const TERMS_EN = TERMS_UK.map((t) => {
  const dmap = {
    "tfsa": "Canadian registered account where investments grow tax-free and withdrawals are tax-free. 2026 limit: $7,000/year. Cumulative room since 2009 = $109,000. Room accrues from year of tax residency.",
    "rrsp": "Tax-deferred retirement account: contributions deduct from income, grow tax-free until withdrawal. 2026 limit: 18% of prior-year earned income, up to $33,810. Converts to RRIF by age 71.",
    "fhsa": "Hybrid TFSA+RRSP for first home purchase. $8,000/year limit, $40,000 lifetime. Contributions deduct from income, qualifying withdrawals tax-free. 15-year window before RRSP rollover.",
    "resp": "Tax-deferred education savings account. Government adds CESG (20% match up to $500/year, $7,200 lifetime). $50,000 lifetime contribution. Withdrawals taxed to student.",
    "cesg": "Free government grant inside RESP: 20% match on contributions, $500/year max, $7,200 lifetime per child. 'Guaranteed 20% return' on the first $2,500 contributed per year.",
    "hbp": "Borrow up to $60,000 from your RRSP for first home purchase tax-free. Repay over 15 years starting year 2 after withdrawal. Often paired with FHSA.",
    "ccpc": "Private corporation with >50% Canadian-resident ownership. Eligible for SBD — 9% federal corporate tax on first $500K active business income (vs ~38% normal). Foundation of most entrepreneur tax planning.",
    "mpc": "Medical Professional Corporation — CCPC allowed for licensed physicians (AB, BC, ON, etc.). Same SBD benefits + spouse as shareholder for income splitting. Typically incorporated in practice year 2-3.",
    "sbd": "Small Business Deduction: federal corporate tax knockdown for CCPC to 9% on first $500K active business income. Plus provincial reduction. Phase-out from $50K passive income.",
    "lcge": "Sell QSBS shares tax-free up to lifetime limit (~$1.27M in 2026, indexed). CCPC-only, 24-month holding + 90% active business asset test at sale + 50% during holding.",
    "qsbs": "Shares of a CCPC that qualify for LCGE. 24-month holding + 90%+ active business assets in Canada at sale + 50%+ during entire holding. Pre-exit 'purification' may be needed.",
    "tosi": "Tax on Split Income — CRA anti-income-splitting rule (2018). Dividends/income from CCPC to family members taxed at highest marginal rate unless they're 'actively engaged' (≥20 hrs/week average).",
    "ipp": "Defined-benefit pension plan for a single employee (usually owner-manager of CCPC, physician in MPC). Allows $40-70K/yr contributions vs $33K RRSP for people 40+. Corporation funds it; deductible business expense.",
    "rsu": "Restricted Stock Unit — equity compensation where company promises shares after vesting. FMV at vesting day added to T4 income, taxed as employment income. Typically 4-year vest with 1-year cliff.",
    "espp": "Employee Stock Purchase Plan — payroll-deducted contributions to buy company stock at a discount (typically 15%). Discount = employment income; appreciation = capital gains.",
    "eligible-investor": "Investor category for exempt market securities (NI 45-106): (a) net assets $400K+ alone or with spouse, OR (b) pre-tax net income $75K solo / $125K with spouse 2 of last 2 years with continuation expected.",
    "accredited-investor": "Higher exempt-market tier: (a) income $200K solo / $300K with spouse 2 of last 2 years, OR (b) net financial assets $1M+ alone or with spouse, OR (c) total net assets $5M+.",
    "emd": "Exempt Market Dealer — CSA-licensed firm category that distributes exempt market securities (MICs, private REITs, development LPs) to Eligible/Accredited investors. Cannot sell public market securities.",
    "ciro": "Canadian Investment Regulatory Organization — SRO regulating investment dealers (former IIROC) and mutual fund dealers (former MFDA). CIRO advisors sell public market securities.",
    "nrd": "National Registration Database — CSA's central registry of all licensed financial professionals in Canada. Every Licensed DR has an NRD number. Free public lookup at info.securities-administrators.ca.",
    "mic": "Mortgage Investment Corporation — special Canadian corporate form (ITA §130.1) for pooled mortgage lending. 100% of net income distributed as dividends. Common exempt-market product, historical target 7-12%.",
    "reit": "Real Estate Investment Trust — trust owning income-producing real estate. Public REITs trade on TSX. Private REITs distributed via EMD to Eligible/Accredited investors. Distributes 90%+ net income.",
    "noa": "Notice of Assessment — CRA document issued after tax return processing. Contains your next-year RRSP room, TFSA room, all carry-forwards. Get it via CRA My Account.",
    "obsi": "Ombudsman for Banking Services and Investments — independent Canadian complaints channel for banks + investment dealers. Public complaint records. Free for consumers. obsi.ca.",
    "ifse": "IFSE Institute — division of IFIC issuing the Exempt Market Proficiency Course (EMP) required for the Dealing Representative category. CSA-accredited curriculum.",
    "csa": "Canadian Securities Administrators — umbrella body of 13 provincial/territorial securities regulators (ASC, BCSC, OSC, etc.). Coordinates National Instruments (NI 31-103, NI 45-106).",
    "asc": "Alberta Securities Commission — Alberta's securities regulator. CSA member. Maintains registry of firms and individuals registered in AB, including my dealer (Axcess Capital Advisors Inc.).",
    "cuaet": "Canada-Ukraine Authorization for Emergency Travel — 2022-2024 program for Ukrainians. Temporary residence + open work permit up to 3 years. Tax residency starts at arrival establishing residential ties.",
    "finfluencer": "Person posting financial content on social media without professional registration. Joint CSA/CIRO Staff Notice 31-369 (Dec 2025) sets rules: educational content OK, specific buy/sell recommendations illegal without registration.",
    "ymyl": "Your Money or Your Life — Google's category of high-stakes content (finance, health, legal). Search Quality Rater Guidelines require elevated E-E-A-T. Licensed-author content has SERP advantage.",
  };
  return { ...t, definition: dmap[t.id] || t.definition };
});

const COPY = {
  uk: {
    titleMeta: "Словник канадських фінансів — TFSA, RRSP, FHSA, CCPC, exempt market",
    descriptionMeta: "30+ ключових термінів канадських особистих фінансів: TFSA, RRSP, FHSA, RESP, CCPC, MPC, MIC, REIT, NI 45-106, Eligible Investor, EMD. Source-attributed definitions.",
    crumbHome: "Головна",
    crumbThis: "Словник",
    eyebrow: "Glossary · Canadian finance",
    title: "Словник канадських фінансів",
    subtitle: "Ключові терміни TFSA, RRSP, FHSA, CCPC, MPC, exempt market та інших аспектів canadian personal finance — з посиланнями на офіційні джерела CRA, CSA, OSFI.",
    intro: "Словник для українців у Канаді: коли читаєш контент про TFSA contribution room, MPC incorporation чи exempt market eligibility — повертайся сюди за точними визначеннями. Кожен термін має посилання на офіційне джерело (canada.ca, securities-administrators.ca, etc.).",
    sourceLabel: "Джерело",
    relatedLabel: "Більше",
    terms: TERMS_UK,
  },
  ru: {
    titleMeta: "Словарь канадских финансов — TFSA, RRSP, FHSA, CCPC, exempt market",
    descriptionMeta: "30+ ключевых терминов канадских личных финансов: TFSA, RRSP, FHSA, RESP, CCPC, MPC, MIC, REIT, NI 45-106, Eligible Investor, EMD. Source-attributed definitions.",
    crumbHome: "Главная",
    crumbThis: "Словарь",
    eyebrow: "Glossary · Canadian finance",
    title: "Словарь канадских финансов",
    subtitle: "Ключевые термины TFSA, RRSP, FHSA, CCPC, MPC, exempt market и других аспектов canadian personal finance — со ссылками на официальные источники.",
    intro: "Словарь для русскоговорящих в Канаде: когда читаешь контент про TFSA contribution room, MPC incorporation или exempt market eligibility — возвращайся сюда за точными определениями. Каждый термин имеет ссылку на официальный источник.",
    sourceLabel: "Источник",
    relatedLabel: "Подробнее",
    terms: TERMS_RU,
  },
  en: {
    titleMeta: "Canadian finance glossary — TFSA, RRSP, FHSA, CCPC, exempt market",
    descriptionMeta: "30+ key Canadian personal-finance terms: TFSA, RRSP, FHSA, RESP, CCPC, MPC, MIC, REIT, NI 45-106, Eligible Investor, EMD. Source-attributed definitions.",
    crumbHome: "Home",
    crumbThis: "Glossary",
    eyebrow: "Glossary · Canadian finance",
    title: "Canadian finance glossary",
    subtitle: "Key terms — TFSA, RRSP, FHSA, CCPC, MPC, exempt market, and other Canadian personal-finance concepts — linked to official CRA, CSA, and OSFI sources.",
    intro: "Reference glossary for newcomers in Canada: whenever you read about TFSA contribution room, MPC incorporation, or exempt market eligibility — come back here for precise definitions. Every term links to an official source (canada.ca, securities-administrators.ca, etc.).",
    sourceLabel: "Source",
    relatedLabel: "Read more",
    terms: TERMS_EN,
  },
};

export async function generateStaticParams() {
  return SUPPORTED_LOCALES.map((locale) => ({ locale }));
}

export async function generateMetadata({ params }) {
  const { locale } = await params;
  const c = COPY[locale] || COPY.uk;
  const path = `/${locale}/slovnyk`;
  const alternates = Object.fromEntries(
    SUPPORTED_LOCALES.map((l) => [
      { uk: "uk", ru: "ru", en: "en-CA" }[l],
      `/${l}/slovnyk`,
    ])
  );
  alternates["x-default"] = "/uk/slovnyk";
  return {
    title: c.titleMeta,
    description: c.descriptionMeta,
    alternates: { canonical: path, languages: alternates },
    openGraph: {
      title: c.titleMeta,
      description: c.descriptionMeta,
      url: `https://sky-fort.ca${path}`,
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: c.titleMeta,
      description: c.descriptionMeta,
    },
  };
}

// DefinedTermSet JSON-LD — schema.org's official glossary structure.
// AI Overviews and Perplexity treat DefinedTerm nodes as canonical
// definitions; this is the structured-data equivalent of "we are the
// reference for these terms".
function buildDefinedTermSetJsonLd(locale, c, path) {
  return {
    "@context": "https://schema.org",
    "@type": "DefinedTermSet",
    name: c.title,
    description: c.subtitle,
    inLanguage: { uk: "uk", ru: "ru", en: "en-CA" }[locale],
    url: `https://sky-fort.ca${path}`,
    hasDefinedTerm: c.terms.map((t) => ({
      "@type": "DefinedTerm",
      "@id": `https://sky-fort.ca${path}#${t.id}`,
      name: t.term,
      description: t.definition,
      inDefinedTermSet: `https://sky-fort.ca${path}`,
      ...(t.source ? { url: t.source.url } : {}),
    })),
  };
}

export default async function GlossaryPage({ params }) {
  const { locale } = await params;
  const c = COPY[locale] || COPY.uk;
  const path = `/${locale}/slovnyk`;
  const jsonLd = buildDefinedTermSetJsonLd(locale, c, path);

  return (
    <main id="main" className="min-h-screen bg-[var(--color-bg)] text-white">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <header className="pt-8 pb-4 px-6">
        <div className="mx-auto max-w-5xl flex items-center justify-between">
          <Link href={`/${locale}`} aria-label="SkyFort home">
            <Logo variant="full" size="md" />
          </Link>
          <LangSwitcher />
        </div>
      </header>

      <section className="px-6 pt-4 pb-10">
        <div className="mx-auto max-w-5xl">
          <Breadcrumbs
            items={[
              { label: c.crumbHome, href: `/${locale}` },
              { label: c.crumbThis },
            ]}
          />
          <div className="mt-6 max-w-3xl">
            <p className="text-xs font-bold uppercase tracking-[0.18em] text-[var(--color-brand)]">
              {c.eyebrow}
            </p>
            <h1 className="mt-3 text-4xl sm:text-5xl font-extrabold leading-tight">
              {c.title}
            </h1>
            <p className="mt-4 text-lg text-white/75">{c.subtitle}</p>
            <p className="mt-3 text-sm text-white/65">{c.intro}</p>
          </div>
        </div>
      </section>

      <section className="px-6 pb-12">
        <div className="mx-auto max-w-5xl">
          <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-5">
            <p className="mb-3 flex items-center gap-2 text-xs font-bold uppercase tracking-[0.16em] text-white/60">
              <BookOpen size={14} aria-hidden="true" />
              {c.terms.length} terms
            </p>
            <div className="flex flex-wrap gap-2">
              {c.terms.map((t) => (
                <a
                  key={t.id}
                  href={`#${t.id}`}
                  className="rounded-md border border-white/10 bg-black/30 px-3 py-1.5 text-xs font-semibold text-white/80 transition-colors hover:border-[var(--color-brand)]/40 hover:text-white"
                >
                  {t.term.split(" — ")[0].split(" (")[0]}
                </a>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="px-6 pb-20">
        <div className="mx-auto max-w-3xl">
          <dl className="space-y-5">
            {c.terms.map((t) => (
              <div
                key={t.id}
                id={t.id}
                className="scroll-mt-24 rounded-2xl border border-white/10 bg-white/[0.03] p-6"
              >
                <dt className="text-lg sm:text-xl font-bold text-white">
                  {t.term}
                </dt>
                <dd className="mt-3 text-sm leading-relaxed text-white/80">
                  {t.definition}
                </dd>
                <div className="mt-4 flex flex-wrap items-center gap-4 text-xs">
                  {t.source && (
                    <a
                      href={t.source.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 font-semibold text-white/60 hover:text-[var(--color-brand)]"
                    >
                      <ExternalLink size={12} aria-hidden="true" />
                      {c.sourceLabel}: {t.source.label}
                    </a>
                  )}
                  {t.related && (
                    <Link
                      href={`/${locale}${t.related.href}`}
                      className="font-semibold text-[var(--color-brand)] hover:text-[var(--color-brand-hover)]"
                    >
                      {c.relatedLabel}: {t.related.label} →
                    </Link>
                  )}
                </div>
              </div>
            ))}
          </dl>
        </div>
      </section>
    </main>
  );
}
