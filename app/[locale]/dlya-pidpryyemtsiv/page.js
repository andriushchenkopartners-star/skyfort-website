// app/[locale]/dlya-pidpryyemtsiv/page.js
// ICP pillar #3: entrepreneurs / self-employed / business owners in Canada.
// Distinct from IT (W-2) and medics (MPC) — has CCPC structures, TOSI
// rules, LCGE on qualified small business shares ($1M+ exemption), holdco
// + family trust arrangements, active vs passive income split. Most
// complex of the 3 ICPs from a tax-planning perspective.

import Link from "next/link";
import { ArrowRight, Building2, ScrollText, TrendingUp, Users, Coins, Target } from "lucide-react";
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
    titleMeta: "Фінанси для підприємців у Канаді — повний гайд",
    descriptionMeta:
      "Як українському підприємцю/self-employed у Канаді структурувати CCPC, обрати salary vs dividend, використати LCGE $1M+, setup holdco і exempt market. Licensed DR.",
    crumbHome: "Головна",
    crumbThis: "Для підприємців",
    eyebrow: "Pillar guide · 2026",
    title: "Фінанси для підприємців у Канаді",
    subtitle: "Як українському business owner / self-employed / IT contractor побудувати $3M+ corporate wealth за 10 років",
    tldr: "Український підприємець з CCPC $500K-1M+ revenue у Канаді: SBD дає 11-12% corporate tax на перші $500K active income, family trust для income splitting (з урахуванням TOSI rules), LCGE ≈ $1.27M tax-free capital gain на QSBS sale (24+ міс holding), holdco для asset protection.",
    intro:
      "Якщо ти переїхав у Канаду і запустив бізнес (consulting, SaaS, restaurant, e-commerce, real estate flipping, IT contracting через corporate entity) — твоя фінансова реальність принципово відрізняється від W-2 employee. Через CCPC (Canadian-Controlled Private Corporation) ти отримуєш доступ до інструментів які залишаються недоступні для employees: small business deduction (11-13% corporate tax на перші $500K active business income), salary/dividend optimization, LCGE на $1M+ при exit, holdco structures для asset protection і tax-deferred passive accumulation, family trust для income splitting. Цей гайд: як українському підприємцю-newcomer optimally structure business+personal finances у Канаді 2026. CCO-approved educational content.",
    sections: [
      {
        icon: Building2,
        title: "CCPC setup: коли і як",
        body: "CCPC — це канадська приватна корпорація, контрольована canadian residents. Дає small business deduction (SBD): 11-13% corporate tax (vs 50%+ personal) на перші $500K active business income. Setup: federal CBCA $300 або provincial (AB $450) — мінімум $1500 з legal + accountant setup. Коли incorporate: коли personal income > $80K AND business profit > $50K понад personal needs. Якщо менше — sole proprietorship (T2125) дешевше. Структура: opco (operating company), окремий corporate bank account (RBC/CIBC/Scotia Business Account), corporate brokerage (Wealthsimple Business або Questrade Business), separate accounting (QuickBooks + monthly CPA $300-500/міс).",
      },
      {
        icon: Coins,
        title: "Salary vs dividend split — головна оптимізація",
        body: "Раз/рік ти вирішуєш як забрати money з corp. T4 salary: creates RRSP room (18% earned income до $33,810 у 2026), створює CPP entitlement (~$1,300/міс при max), оподатковується personal marginal rate. T5 dividends: лише personal tax (no payroll), tax-integrated з corporate tax, не створює RRSP room/CPP entitlement. Класична strategy 2026: salary $188K (max RRSP $33,810 + maintain CPP entitlement). Понад того — eligible dividends. Якщо business profit > $200K + personal needs — leftover lower-rate corp accumulation. CPP-pay vs CPP-skip: math-залежно. Молодий підприємець (30-40) — skip CPP, invest equivalent у TFSA/non-registered.",
      },
      {
        icon: Users,
        title: "TOSI (Tax on Split Income) і family trust",
        body: "До 2018 income splitting через CCPC до family members був стандартом. Tax on Split Income (TOSI) rules (effective 2018) приклали kibosh на більшість таких schemes: split income до adult family members highest marginal rate якщо вони не активно engaged у business. Винятки залишились: spouse age 65+ (post-retirement spousal income), shareholders 25+ years involved, qualified small business carve-outs. Family trust як ownership structure все ще useful для: estate planning, future capital gains splitting (sale of shares), pre-2018 grandfathering. Setup family trust = $3-5K legal + ongoing accounting $1-2K/рік. Не overcomplicate без real splitting opportunity.",
      },
      {
        icon: TrendingUp,
        title: "Active vs passive income — критичний $500K SBD trap",
        body: "SBD дозволяє 11-13% corporate tax на перші $500K active business income. Critical catch: якщо твоя CCPC накопичила $500K+ passive income (investments, rental, royalties), SBD limit reduces $5 за кожен $1 passive income понад $50K. У $150K passive income — SBD = $0, твоя corp платить full corporate rate 25-27% на ALL active income. Це чому **holdco structure** критична для accumulating entrepreneur: opco залишається 'active business only' = full SBD; holdco отримує retained earnings через Section 112 dividends (tax-free transfer), накопичує passive investments. Без holdco — кожен $1 passive accumulation шкодить opco's SBD entitlement.",
      },
      {
        icon: ScrollText,
        title: "LCGE: $1M+ tax-free exit on qualified small business shares",
        body: "Lifetime Capital Gains Exemption (LCGE) для Qualified Small Business Corporation Shares (QSBS) у 2026 = $1,016,836 (indexed annually). Це означає: коли ти продаєш CCPC або its shares — перші $1M+ capital gain TAX-FREE (заощадження $250-300K залежно від province). Requirements: shares owned 24+ months, 90%+ assets used in active business в Канаді на момент sale, 50%+ assets used in active business throughout 24-month holding period. Strategy: structure business так щоб maintain QSBS qualification. Passive investments inside opco РУЙНУЮТЬ qualification — це ще одна причина holdco isolation. Plan exit 2-3 роки наперед щоб maintain qualification.",
      },
      {
        icon: Target,
        title: "Exempt market через holdco — optimal entrepreneur structure",
        body: "Як successful CCPC owner ти типово Eligible або Accredited Investor (net assets $400K+, often $1M+ через retained earnings). Strategy: holdco акумулює passive investments — частина у public market (broad-market ETF через corporate brokerage), частина у exempt market (MICs, private REITs, development LPs through me as EMD). Distributions можна reinvest tax-free всередині holdco або use для дивідендів на personal level. Перевага vs personal-level investing: corp accumulates, deferred tax, optimal for long-horizon entrepreneur з 10-20 year wealth-building horizon. /uk/eligibility — self-check за 60 секунд.",
      },
    ],
    roadmapTitle: "10-річний roadmap для українського підприємця-newcomer",
    roadmap: [
      { month: "Рік 1-2: початок бізнесу", action: "Запуск как sole proprietor (T2125). Track revenue/expenses у QuickBooks/Wave. Personal: max RRSP/TFSA/FHSA з обмежених коштів. Не incorporate доки revenue < $80K + profit < $50K понад personal needs." },
      { month: "Рік 2-3: incorporation point", action: "Personal income > $80K + business profit consistent > $50K — incorporate як CCPC. Setup federal CBCA, corp banking, monthly CPA. Перший year: paid yourself $80K salary, retained $50K у corp." },
      { month: "Роки 3-5: scale + accumulate", action: "Bus profit $150K+. Optimize salary/dividend: salary $188K (max RRSP), dividends $30-50K, retained $50-100K. Build personal TFSA + RRSP + FHSA paralel. Не використовуй corp money on personal lifestyle." },
      { month: "Рік 5: holdco setup", action: "Якщо corp retained earnings > $300K + plan exempt market — setup holdco. Section 112 transfer щомісяця. Holdco акумулює passive, opco залишається active = preserve LCGE qualification + SBD." },
      { month: "Роки 5-8: exempt market entry", action: "Через mене як EMD — diversified exempt market positions у holdco (15-25% of investment portfolio). MICs, private REITs, development LPs. Tax-deferred distributions reinvest всередині holdco." },
      { month: "Рік 8+: exit planning", action: "Якщо plan to sell business — 2-year QSBS preservation: opco active-business-only ratio, holdco separate. LCGE $1M+ tax-free. Estate planning з will/trust lawyer. IPP setup якщо 40+." },
    ],
    pitfallsTitle: "5 типових помилок підприємців-newcomers",
    pitfalls: [
      { title: "Incorporate занадто рано", body: "До stable $80K+ personal income і $50K+ retained profit — sole proprietor cheaper ($0 setup, $300-500 accounting/рік vs $1500 setup + $2500/рік для CCPC). Wait stable revenue ≥ 12 місяців." },
      { title: "Mixing personal + corporate finances", body: "Single biggest mistake. Personal expenses paid from corp = shareholder benefit = taxable on personal return + потенційні CRA penalties. Strict separation: corporate card for corp expenses, personal card for personal." },
      { title: "Active business operations + passive investments у тій самій corp", body: "Destroys QSBS qualification для LCGE, reduces SBD limit. Без holdco isolation — потенційно $250-300K tax-free LCGE lost при exit. Critical для будь-якого entrepreneur з 5+ year scaling plan." },
      { title: "Не setup IPP після 40 років з incorporated business", body: "IPP allows $5-15K додаткових contributions vs RRSP, fully deductible для corp. Багато 45+ підприємців stick з RRSP-only, втрачаючи $50-150K tax savings до retirement." },
      { title: "Late-stage TOSI violations", body: "Paying spouse/adult kids dividend through CCPC без active business involvement = TOSI top-marginal rate. Якщо не sure — consult CPA. Save thousands у inadvertent TOSI assessments." },
    ],
    scenariosTitle: "3 типових сценарії",
    scenarios: [
      {
        name: "IT consulting CCPC, 35 років, $250K revenue / $180K profit",
        breakdown: "Salary $188K (max RRSP $33,810), $0 dividends, $0 retained year 1 — focus build personal tax shelters. Year 2 onward: salary $188K + dividends $40K + retained $50K. У рік 5 — corp retained ~$250K → holdco setup. Personal: TFSA $35K + RRSP $170K + FHSA $40K. Total tax-sheltered + corp accumulation у рік 5 = ~$500K.",
      },
      {
        name: "Restaurant owner, 42, established CCPC, $1.2M revenue / $250K profit",
        breakdown: "Salary $188K + dividends $60K + retained $80K (after RRSP $33,810 + family expenses). Holdco transition у year 3. Year 5: opco retained $400K, holdco $200K invested (60% public ETF + 25% private REITs + 15% bond ladder). IPP setup at 45 — $40K extra annual deductible. At 55: estimated total $2.5-3.5M corporate+personal net worth.",
      },
      {
        name: "SaaS founder, 38, pre-revenue stage with $500K raised + $200K personal income",
        breakdown: "CCPC already setup (необхідно для investors). Personal income $200K = max RRSP + TFSA + FHSA personal. Corp = treat retained startup funds as investment portfolio (broad-market ETF при cash). Plan exit (acquisition) in 3-5 years → preserve QSBS for LCGE $1M+. Setup founder vesting agreement з lawyer. Family trust planning якщо kids та plan family wealth transfer.",
      },
    ],
    faqTitle: "Часті питання підприємців",
    faq: [
      {
        q: "Sole proprietor vs CCPC: коли switch?",
        a: "Switch коли: (1) personal income > $80K, (2) business profit > $50K beyond personal needs, (3) ти готовий до accounting overhead $2-3K/рік + payroll administration. Sole prop OK для side hustle або раннього стартапу. CCPC дає tax savings $10-20K/рік при $150K+ profit.",
      },
      {
        q: "Чи можна вести Ukrainian client invoicing через Canadian CCPC?",
        a: "Так — це foreign revenue. Декларуй як T2 corporate income (no GST/HST на foreign-billed services). Currency conversion за CRA exchange rates або monthly average. Tax obligations: Canadian corporate tax on the income (CCPC = world income). NO double taxation якщо Ukraine не stops withholding (treaty Canada-Ukraine usually exempts).",
      },
      {
        q: "Family trust setup vs holdco — що пріоритет?",
        a: "Holdco пріоритет для asset protection + tax-deferred accumulation. Family trust додатково для (1) future income splitting opportunities (post-TOSI grandfathering, spousal income 65+), (2) estate planning (multiplied LCGE через trust beneficiaries — up to 5x $1M), (3) creditor protection beyond corp. Setup both якщо net worth $1M+ AND family planning matters.",
      },
      {
        q: "LCGE qualification — як maintain?",
        a: "Qualified Small Business Corporation Shares (QSBS) requirements: (1) shares owned 24+ months, (2) 90%+ assets used in active business in Canada at sale, (3) 50%+ assets used in active business throughout 24-month holding period. Critical: passive investments inside opco destroy this. Holdco isolation — way to preserve. Plan exit 2-3 years out з accountant review.",
      },
      {
        q: "TOSI applies to my situation?",
        a: "Type \"yes\" якщо: (1) ти pay dividend to spouse/child/parent that isn't 65+ AND they don't have active engagement у business, (2) you don't qualify for excluded business exception. Top-marginal personal tax applied. Save thousands consulting CPA before любого dividend distribution.",
      },
      {
        q: "Чи можна exempt market investments через opco без holdco?",
        a: "Технічно так, але руйнує LCGE qualification AND зменшує SBD. Holdco structure обов'язкова для будь-якого serious exempt market accumulation. Setup holdco одразу як corp retained earnings hit $200-300K і plan exempt market entry. Тоді opco залишається 'active business only'.",
      },
    ],
    bottomCtaTitle: "Готовий до конкретного CCPC + holdco + exempt market плану?",
    bottomCtaText:
      "30-хвилинний discovery call. Розберемо твою конкретну ситуацію: business stage, revenue/profit, personal needs, existing structure, exit horizon. Будь-який підприємець-newcomer потребує персоналізованої roadmap, не template. CCO-approved.",
    bottomCtaBtn: "Записатись на discovery call",
    secondaryCtaText: "Перш — перевір Eligible Investor status",
    secondaryCtaLink: "60-секундний self-check →",
  },
  ru: {
    titleMeta: "Финансы для предпринимателей в Канаде — полный гайд",
    descriptionMeta:
      "Как русскоязычному предпринимателю/self-employed в Канаде структурировать CCPC, выбрать salary vs dividend, использовать LCGE $1M+, setup holdco и exempt market.",
    crumbHome: "Главная",
    crumbThis: "Для предпринимателей",
    eyebrow: "Pillar guide · 2026",
    title: "Финансы для предпринимателей в Канаде",
    subtitle: "Как русскоязычному business owner / self-employed / IT contractor построить $3M+ corporate wealth за 10 лет",
    tldr: "Русскоговорящий предприниматель с CCPC $500K-1M+ revenue в Канаде: SBD даёт 11-12% corporate tax на первые $500K, family trust для income splitting (с учётом TOSI rules), LCGE ≈ $1.27M tax-free на QSBS sale (24+ мес holding), holdco для asset protection.",
    intro:
      "Если ты переехал в Канаду и запустил бизнес (consulting, SaaS, restaurant, e-commerce, real estate flipping, IT contracting через corporate entity) — твоя финансовая реальность принципиально отличается от W-2 employee. Через CCPC (Canadian-Controlled Private Corporation) ты получаешь доступ к инструментам которые остаются недоступными для employees: small business deduction (11-13% corporate tax на первые $500K active business income), salary/dividend optimization, LCGE на $1M+ при exit, holdco structures, family trust. Этот гайд: как русскоязычному предпринимателю-newcomer optimally structure business+personal finances в Канаде 2026. CCO-approved.",
    sections: [
      {
        icon: Building2,
        title: "CCPC setup: когда и как",
        body: "CCPC — это канадская частная корпорация, контролируемая canadian residents. Даёт small business deduction (SBD): 11-13% corporate tax (vs 50%+ personal) на первые $500K active business income. Setup: federal CBCA $300 или provincial (AB $450) — минимум $1500 с legal + accountant setup. Когда incorporate: когда personal income > $80K AND business profit > $50K сверх personal needs. Структура: opco (operating company), отдельный corporate bank account, corporate brokerage, separate accounting (QuickBooks + monthly CPA $300-500/мес).",
      },
      {
        icon: Coins,
        title: "Salary vs dividend split — главная оптимизация",
        body: "Раз/год ты решаешь как забрать money с corp. T4 salary: creates RRSP room (18% earned income до $33,810 в 2026), создаёт CPP entitlement, облагается personal marginal rate. T5 dividends: только personal tax, tax-integrated с corporate tax, не создаёт RRSP room/CPP. Классическая strategy 2026: salary $188K (max RRSP + maintain CPP). Сверх — eligible dividends. CPP-pay vs CPP-skip: math-зависимо.",
      },
      {
        icon: Users,
        title: "TOSI (Tax on Split Income) и family trust",
        body: "До 2018 income splitting через CCPC до family members был стандартом. TOSI rules (effective 2018) положили конец большинству таких schemes: split income до adult family members highest marginal rate если они не активно engaged в business. Исключения: spouse age 65+, shareholders 25+ years involved, qualified small business carve-outs. Family trust как ownership structure всё ещё useful для estate planning, multiplied LCGE.",
      },
      {
        icon: TrendingUp,
        title: "Active vs passive income — критичный $500K SBD trap",
        body: "SBD позволяет 11-13% corporate tax на первые $500K active business income. Critical catch: если твоя CCPC накопила $500K+ passive income, SBD limit reduces $5 за каждый $1 passive income сверх $50K. В $150K passive income — SBD = $0. Holdco structure критична для accumulating entrepreneur: opco остаётся 'active business only' = full SBD; holdco получает retained earnings через Section 112 dividends.",
      },
      {
        icon: ScrollText,
        title: "LCGE: $1M+ tax-free exit on qualified small business shares",
        body: "Lifetime Capital Gains Exemption (LCGE) для Qualified Small Business Corporation Shares (QSBS) в 2026 = $1,016,836. Когда ты продаёшь CCPC — первые $1M+ capital gain TAX-FREE. Requirements: shares owned 24+ months, 90%+ assets used in active business в Канаде на момент sale, 50%+ throughout 24-month holding period. Passive investments inside opco РАЗРУШАЮТ qualification — отсюда необходимость holdco isolation.",
      },
      {
        icon: Target,
        title: "Exempt market через holdco — optimal entrepreneur structure",
        body: "Как successful CCPC owner ты типично Eligible или Accredited Investor. Strategy: holdco накапливает passive investments — часть в public market, часть в exempt market (MICs, private REITs, development LPs через меня как EMD). Distributions можно reinvest tax-free внутри holdco. Self-check: /ru/eligibility.",
      },
    ],
    roadmapTitle: "10-летний roadmap для русскоязычного предпринимателя-newcomer",
    roadmap: [
      { month: "Год 1-2: начало бизнеса", action: "Запуск как sole proprietor. Track revenue/expenses. Не incorporate пока revenue < $80K + profit < $50K сверх personal needs." },
      { month: "Год 2-3: incorporation point", action: "Personal income > $80K + business profit consistent > $50K — incorporate как CCPC. Setup federal CBCA, corp banking, monthly CPA." },
      { month: "Годы 3-5: scale + accumulate", action: "Bus profit $150K+. Optimize salary/dividend. Build personal TFSA + RRSP + FHSA parallel." },
      { month: "Год 5: holdco setup", action: "Если corp retained earnings > $300K + plan exempt market — setup holdco. Section 112 transfer ежемесячно." },
      { month: "Годы 5-8: exempt market entry", action: "Через меня как EMD — diversified exempt market positions в holdco. MICs, private REITs, development LPs." },
      { month: "Год 8+: exit planning", action: "Если plan to sell business — 2-year QSBS preservation. LCGE $1M+ tax-free. Estate planning. IPP setup если 40+." },
    ],
    pitfallsTitle: "5 типичных ошибок предпринимателей-newcomers",
    pitfalls: [
      { title: "Incorporate слишком рано", body: "До stable $80K+ personal income и $50K+ retained profit — sole proprietor cheaper. Wait stable revenue ≥ 12 месяцев." },
      { title: "Mixing personal + corporate finances", body: "Single biggest mistake. Personal expenses paid from corp = shareholder benefit = taxable + потенциальные CRA penalties. Strict separation." },
      { title: "Active business operations + passive investments в той же corp", body: "Destroys QSBS qualification для LCGE, reduces SBD limit. Без holdco isolation — потенциально $250-300K tax-free LCGE lost." },
      { title: "Не setup IPP после 40 лет с incorporated business", body: "IPP allows $5-15K дополнительных contributions vs RRSP, fully deductible для corp." },
      { title: "Late-stage TOSI violations", body: "Paying spouse/adult kids dividend через CCPC без active business involvement = TOSI top-marginal rate." },
    ],
    scenariosTitle: "3 типичных сценария",
    scenarios: [
      {
        name: "IT consulting CCPC, 35 лет, $250K revenue / $180K profit",
        breakdown: "Salary $188K + retained corp. Year 5: corp retained ~$250K → holdco setup. Personal: TFSA $35K + RRSP $170K + FHSA $40K = ~$500K total tax-sheltered + corp accumulation.",
      },
      {
        name: "Restaurant owner, 42, established CCPC, $1.2M revenue / $250K profit",
        breakdown: "Salary $188K + dividends $60K + retained $80K. Holdco в year 3. Year 5: opco retained $400K, holdco $200K invested. IPP setup at 45. At 55: $2.5-3.5M corporate+personal net worth.",
      },
      {
        name: "SaaS founder, 38, pre-revenue stage с $500K raised + $200K personal income",
        breakdown: "CCPC уже setup. Personal income $200K = max RRSP + TFSA + FHSA. Plan exit в 3-5 years → preserve QSBS для LCGE $1M+.",
      },
    ],
    faqTitle: "Частые вопросы предпринимателей",
    faq: [
      {
        q: "Sole proprietor vs CCPC: когда switch?",
        a: "Switch когда: (1) personal income > $80K, (2) business profit > $50K beyond personal needs, (3) ты готов к accounting overhead $2-3K/год. CCPC даёт tax savings $10-20K/год при $150K+ profit.",
      },
      {
        q: "Можно ли вести Ukrainian client invoicing через Canadian CCPC?",
        a: "Да — это foreign revenue. Декларируй как T2 corporate income. Currency conversion по CRA exchange rates. NO double taxation если Ukraine не stops withholding.",
      },
      {
        q: "Family trust setup vs holdco — что приоритет?",
        a: "Holdco приоритет для asset protection + tax-deferred accumulation. Family trust дополнительно для estate planning + multiplied LCGE. Setup both если net worth $1M+.",
      },
      {
        q: "LCGE qualification — как maintain?",
        a: "QSBS requirements: (1) shares owned 24+ months, (2) 90%+ assets used in active business в Canada at sale, (3) 50%+ throughout 24-month period. Passive investments inside opco destroy this. Holdco isolation — way to preserve.",
      },
      {
        q: "TOSI applies к моей ситуации?",
        a: "Yes если: pay dividend to spouse/child/parent that isn't 65+ AND they don't have active engagement в business. Top-marginal personal tax applied. Consult CPA before любого dividend distribution.",
      },
      {
        q: "Можно exempt market investments через opco без holdco?",
        a: "Технически да, но разрушает LCGE qualification AND уменьшает SBD. Holdco structure обязательна для любого serious exempt market accumulation.",
      },
    ],
    bottomCtaTitle: "Готов к конкретному CCPC + holdco + exempt market плану?",
    bottomCtaText:
      "30-минутный discovery call. Разберём твою конкретную ситуацию: business stage, revenue/profit, personal needs, existing structure, exit horizon.",
    bottomCtaBtn: "Записаться на discovery call",
    secondaryCtaText: "Прежде — проверь Eligible Investor status",
    secondaryCtaLink: "60-секундный self-check →",
  },
  en: {
    titleMeta: "Finance for entrepreneurs in Canada — full guide",
    descriptionMeta:
      "How a Ukrainian/Russian-speaking entrepreneur / self-employed in Canada structures their CCPC, picks salary vs dividend, uses LCGE $1M+, sets up holdco and exempt market. Licensed DR.",
    crumbHome: "Home",
    crumbThis: "For entrepreneurs",
    eyebrow: "Pillar guide · 2026",
    title: "Finance for entrepreneurs in Canada",
    subtitle: "How a Ukrainian/Russian-speaking business owner / self-employed / IT contractor builds $3M+ corporate wealth over 10 years",
    tldr: "Ukrainian entrepreneur with $500K-1M+ revenue CCPC in Canada: SBD gives 11-12% corporate tax on first $500K active income, family trust for income splitting (TOSI rules apply), LCGE ≈ $1.27M tax-free on QSBS sale (24+ mo holding), holdco for asset protection.",
    intro:
      "If you moved to Canada and launched a business (consulting, SaaS, restaurant, e-commerce, real estate flipping, IT contracting through a corporate entity) — your financial reality fundamentally differs from a W-2 employee. Through a CCPC (Canadian-Controlled Private Corporation) you get tools unavailable to employees: small business deduction (11-13% corporate tax on the first $500K active business income), salary/dividend optimization, LCGE on $1M+ at exit, holdco structures for asset protection and tax-deferred passive accumulation, family trust for income splitting. This guide: how a Ukrainian/Russian-speaking newcomer entrepreneur optimally structures business + personal finances in 2026 Canada. CCO-approved educational content.",
    sections: [
      {
        icon: Building2,
        title: "CCPC setup: when and how",
        body: "CCPC = Canadian Private Corporation controlled by Canadian residents. Gives small business deduction (SBD): 11-13% corporate tax (vs 50%+ personal) on the first $500K active business income. Setup: federal CBCA $300 or provincial (AB $450) — minimum $1500 with legal + accountant setup. When to incorporate: personal income > $80K AND business profit > $50K above personal needs. Structure: opco (operating company), separate corporate bank account, corporate brokerage, separate accounting (QuickBooks + monthly CPA $300-500/month).",
      },
      {
        icon: Coins,
        title: "Salary vs dividend split — your main optimization",
        body: "Once a year you decide how to draw money from corp. T4 salary: creates RRSP room (18% earned income up to $33,810 in 2026), builds CPP entitlement, taxed at personal marginal rate. T5 dividends: personal tax only, tax-integrated with corporate tax, no RRSP room/CPP. Classic 2026 strategy: salary $188K (max RRSP + maintain CPP). Above that — eligible dividends. CPP-pay vs CPP-skip: math-dependent.",
      },
      {
        icon: Users,
        title: "TOSI (Tax on Split Income) and family trust",
        body: "Before 2018 income splitting through CCPC to family members was standard. TOSI rules (effective 2018) shut down most such schemes: split income to adult family members at highest marginal rate unless they're actively engaged in the business. Exceptions remain: spouse age 65+, shareholders 25+ years involved, qualified small business carve-outs. Family trust as ownership structure still useful for estate planning, multiplied LCGE (up to 5x $1M through trust beneficiaries).",
      },
      {
        icon: TrendingUp,
        title: "Active vs passive income — the critical $500K SBD trap",
        body: "SBD allows 11-13% corporate tax on the first $500K active business income. Critical catch: if your CCPC accumulates $500K+ passive income, SBD limit reduces $5 per $1 passive income beyond $50K. At $150K passive income — SBD = $0, your corp pays full corporate rate 25-27% on ALL active income. This is why **holdco structure** is critical for an accumulating entrepreneur.",
      },
      {
        icon: ScrollText,
        title: "LCGE: $1M+ tax-free exit on qualified small business shares",
        body: "Lifetime Capital Gains Exemption (LCGE) for Qualified Small Business Corporation Shares (QSBS) in 2026 = $1,016,836 (indexed annually). When you sell your CCPC — the first $1M+ capital gain is TAX-FREE (saving $250-300K depending on province). Requirements: shares owned 24+ months, 90%+ assets used in active business in Canada at sale, 50%+ throughout the 24-month holding period. Passive investments inside opco DESTROY qualification.",
      },
      {
        icon: Target,
        title: "Exempt market through holdco — the optimal entrepreneur structure",
        body: "As a successful CCPC owner you're typically an Eligible or Accredited Investor (net assets $400K+, often $1M+ via retained earnings). Strategy: holdco accumulates passive investments — part in public market (broad-market ETF via corporate brokerage), part in exempt market (MICs, private REITs, development LPs through me as EMD). Distributions can reinvest tax-free inside holdco or fund personal-level dividends. Self-check: /en/eligibility.",
      },
    ],
    roadmapTitle: "10-year roadmap for a newcomer entrepreneur",
    roadmap: [
      { month: "Year 1-2: starting the business", action: "Launch as sole proprietor (T2125). Track revenue/expenses in QuickBooks/Wave. Don't incorporate until revenue < $80K + profit < $50K above personal needs." },
      { month: "Year 2-3: incorporation point", action: "Personal income > $80K + consistent business profit > $50K — incorporate as CCPC. Set up federal CBCA, corp banking, monthly CPA." },
      { month: "Years 3-5: scale + accumulate", action: "Business profit $150K+. Optimize salary/dividend. Build personal TFSA + RRSP + FHSA in parallel." },
      { month: "Year 5: holdco setup", action: "If corp retained earnings > $300K + plan exempt market — set up holdco. Section 112 transfer monthly." },
      { month: "Years 5-8: exempt market entry", action: "Through me as EMD — diversified exempt market positions in holdco. MICs, private REITs, development LPs." },
      { month: "Year 8+: exit planning", action: "If planning to sell business — 2-year QSBS preservation. LCGE $1M+ tax-free. Estate planning. IPP setup if 40+." },
    ],
    pitfallsTitle: "5 typical newcomer-entrepreneur mistakes",
    pitfalls: [
      { title: "Incorporating too early", body: "Before stable $80K+ personal income and $50K+ retained profit, sole proprietor is cheaper. Wait for stable revenue ≥ 12 months." },
      { title: "Mixing personal + corporate finances", body: "Single biggest mistake. Personal expenses paid from corp = shareholder benefit = taxable + potential CRA penalties. Strict separation." },
      { title: "Active business operations + passive investments in the same corp", body: "Destroys QSBS qualification for LCGE, reduces SBD limit. Without holdco isolation — potentially $250-300K tax-free LCGE lost." },
      { title: "Not setting up IPP after 40 with incorporated business", body: "IPP allows $5-15K extra contributions vs RRSP, fully deductible for corp." },
      { title: "Late-stage TOSI violations", body: "Paying spouse/adult kids dividend through CCPC without active business involvement = TOSI top-marginal rate." },
    ],
    scenariosTitle: "3 typical scenarios",
    scenarios: [
      {
        name: "IT consulting CCPC, 35, $250K revenue / $180K profit",
        breakdown: "Salary $188K (max RRSP $33,810), $0 dividends, $0 retained year 1. Year 2+: salary $188K + dividends $40K + retained $50K. Year 5: corp retained ~$250K → holdco setup. Personal: TFSA $35K + RRSP $170K + FHSA $40K. Total tax-sheltered + corp accumulation year 5 = ~$500K.",
      },
      {
        name: "Restaurant owner, 42, established CCPC, $1.2M revenue / $250K profit",
        breakdown: "Salary $188K + dividends $60K + retained $80K. Holdco transition year 3. Year 5: opco retained $400K, holdco $200K invested. IPP setup at 45. At 55: $2.5-3.5M corporate + personal net worth.",
      },
      {
        name: "SaaS founder, 38, pre-revenue stage with $500K raised + $200K personal income",
        breakdown: "CCPC already set up. Personal income $200K = max RRSP + TFSA + FHSA. Plan exit (acquisition) in 3-5 years → preserve QSBS for LCGE $1M+.",
      },
    ],
    faqTitle: "Entrepreneur FAQ",
    faq: [
      {
        q: "Sole proprietor vs CCPC: when to switch?",
        a: "Switch when: (1) personal income > $80K, (2) business profit > $50K beyond personal needs, (3) you're ready for $2-3K/year accounting overhead. CCPC saves $10-20K/year in tax at $150K+ profit.",
      },
      {
        q: "Can I invoice Ukrainian clients through a Canadian CCPC?",
        a: "Yes — that's foreign revenue. Declare as T2 corporate income. Currency conversion at CRA exchange rates. No double taxation if Ukraine doesn't impose withholding (treaty Canada-Ukraine usually exempts).",
      },
      {
        q: "Family trust setup vs holdco — which is priority?",
        a: "Holdco is priority for asset protection + tax-deferred accumulation. Family trust additionally for (1) future income splitting opportunities, (2) estate planning (multiplied LCGE), (3) creditor protection beyond corp. Set up both if net worth $1M+ AND family planning matters.",
      },
      {
        q: "LCGE qualification — how to maintain?",
        a: "QSBS requirements: (1) shares owned 24+ months, (2) 90%+ assets used in active business in Canada at sale, (3) 50%+ throughout 24-month holding period. Passive investments inside opco destroy this. Holdco isolation preserves it. Plan exit 2-3 years out with accountant review.",
      },
      {
        q: "Does TOSI apply to my situation?",
        a: "Yes if: (1) you pay a dividend to spouse/child/parent that isn't 65+ AND they don't have active engagement in the business, (2) you don't qualify for an excluded business exception. Top-marginal personal tax applied. Consult CPA before any dividend distribution.",
      },
      {
        q: "Can I make exempt market investments through opco without a holdco?",
        a: "Technically yes, but it destroys LCGE qualification AND reduces SBD. Holdco structure is mandatory for any serious exempt market accumulation. Set up holdco immediately when corp retained earnings hit $200-300K and you plan exempt market entry.",
      },
    ],
    bottomCtaTitle: "Ready for a concrete CCPC + holdco + exempt market plan?",
    bottomCtaText:
      "30-minute discovery call. We'll work through your specific situation: business stage, revenue/profit, personal needs, existing structure, exit horizon.",
    bottomCtaBtn: "Book a discovery call",
    secondaryCtaText: "Before booking — check Eligible Investor status",
    secondaryCtaLink: "60-second self-check →",
  },
};

export async function generateStaticParams() {
  return SUPPORTED_LOCALES.map((locale) => ({ locale }));
}

export async function generateMetadata({ params }) {
  const { locale } = await params;
  const c = COPY[locale] || COPY.uk;
  const path = `/${locale}/dlya-pidpryyemtsiv`;
  const alternates = Object.fromEntries(
    SUPPORTED_LOCALES.map((l) => [
      { uk: "uk", ru: "ru", en: "en-CA" }[l],
      `/${l}/dlya-pidpryyemtsiv`,
    ])
  );
  alternates["x-default"] = "/uk/dlya-pidpryyemtsiv";
  return {
    title: c.titleMeta,
    description: c.descriptionMeta,
    keywords: [
      "entrepreneur finance Canada",
      "CCPC small business Canada",
      "LCGE QSBS Canada",
      "holdco operating company",
      "salary vs dividend Canada",
      "підприємці Канада фінанси",
      "предприниматели Канада финансы",
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

export default async function EntrepreneursPillarPage({ params }) {
  const { locale } = await params;
  const c = COPY[locale] || COPY.uk;
  const path = `/${locale}/dlya-pidpryyemtsiv`;

  return (
    <main id="main" className="min-h-screen bg-[var(--color-bg)] text-white">
      <ScrollDepthTracker page="dlya-pidpryyemtsiv" />
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
            pageUrl={`https://sky-fort.ca/${locale}/dlya-pidpryyemtsiv`}
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
            href: `/${locale}/dlya-it-fakhivtsiv`,
            label: locale === "ru" ? "Для IT-специалистов" : locale === "en" ? "For tech workers" : "Для IT-фахівців",
            description: locale === "ru" ? "RSU, ESPP, RRSP — гайд для tech." : locale === "en" ? "RSUs, ESPP, RRSP — tech worker pillar." : "RSU, ESPP, RRSP — гайд для IT.",
          },
          {
            href: `/${locale}/dlya-mediks`,
            label: locale === "ru" ? "Для медиков" : locale === "en" ? "For physicians" : "Для медиків",
            description: locale === "ru" ? "MPC, IPP, holdco — гайд для врачей." : locale === "en" ? "MPC, IPP, holdco — physician pillar." : "MPC, IPP, holdco — гайд для лікарів.",
          },
          {
            href: `/${locale}/eligibility`,
            label: locale === "ru" ? "Eligible Investor self-check" : locale === "en" ? "Eligible Investor self-check" : "Eligible Investor self-check",
            description: locale === "ru" ? "60 секунд — exempt market через holdco." : locale === "en" ? "60 seconds — exempt market via holdco." : "60 секунд — exempt market через holdco.",
          },
          {
            href: `/${locale}/slovnyk`,
            label: locale === "ru" ? "Словарь" : locale === "en" ? "Glossary" : "Словник",
            description: locale === "ru" ? "CCPC, TOSI, LCGE, QSBS — определения." : locale === "en" ? "CCPC, TOSI, LCGE, QSBS — definitions." : "CCPC, TOSI, LCGE, QSBS — визначення.",
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
