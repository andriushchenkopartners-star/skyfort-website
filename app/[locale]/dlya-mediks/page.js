// app/[locale]/dlya-mediks/page.js
// ICP pillar #2: medical professionals (doctors, specialists, residents)
// in Canada. Distinct from IT specialists primarily because most established
// physicians operate through a Medical Professional Corporation (MPC) —
// completely different tax structure (small business deduction, IPP vs
// RRSP, holding companies for asset protection, estate planning).
//
// Targets the under-supplied Ukrainian/Russian-speaking medical-newcomer
// niche (residency match through MCC + provincial College registration is
// a 2-5 year journey; financial planning during and after is poorly served).

import Link from "next/link";
import { ArrowRight, Stethoscope, Building2, Coins, Shield, ScrollText, Target } from "lucide-react";
import Logo from "../../_components/Logo";
import Breadcrumbs from "../../_components/Breadcrumbs";
import LangSwitcher from "../../_components/LangSwitcher";
import StaticFaq from "../../_components/StaticFaq";
import CraLimits2026 from "../../_components/CraLimits2026";
import TldrBlock from "../../_components/TldrBlock";
import RelatedLinks from "../../_components/RelatedLinks";
import AuthorByline from "../../_components/AuthorByline";
import UpdatedBadge from "../../_components/UpdatedBadge";
import ScrollDepthTracker from "../../_components/ScrollDepthTracker";
import StickyCta from "../../_components/StickyCta";
import TopicSuggestForm from "../../_components/TopicSuggestForm";
import { SUPPORTED_LOCALES } from "../../_i18n/dictionary";

const CALENDLY = "https://calendly.com/andriushchenko-partners/new-meeting";

const COPY = {
  uk: {
    titleMeta: "Фінанси для лікарів у Канаді — повний гайд",
    descriptionMeta:
      "Як українському лікарю в Канаді структурувати MPC (Medical Professional Corporation), IPP, holdco і exempt market — детальний фреймворк для residents, family doctors, specialists. Licensed DR.",
    crumbHome: "Головна",
    crumbThis: "Для лікарів",
    eyebrow: "Pillar guide · 2026",
    title: "Фінанси для лікарів у Канаді",
    subtitle: "Як українському family doctor / specialist з MPC побудувати $5M+ net worth до 55 років",
    tldr: "Українська лікарка у Канаді з $250K+ practice income: incorporate MPC на 2-3 рік practice, salary до CPP-max ($73,200 у 2026) + дивіденди для residual, IPP при 40+ років з $200K+ accumulated, holdco для asset protection після $1M+ corporate assets.",
    intro:
      "Канадська медицина має унікальну фінансову structuру: 70%+ practising physicians працюють через Medical Professional Corporation (MPC) — це принципово інша tax game ніж W-2 employee. Income часто $250K-$600K+ (family doctor 1.0 FTE ~$280-380K у Альберті/Онтаріо, specialists $400K-$800K+), але без правильної corp structure ти платиш ~50% marginal personal tax. З MPC + holdco + IPP — effective lifetime tax drops significantly. Цей гайд: як українському лікарю-newcomer (через MCC + IMG residency match) побудувати financial machine за 10 років. CCO-approved educational content.",
    sections: [
      {
        icon: Stethoscope,
        title: "Residency / first years: фундамент до incorporation",
        body: "У residency $60-90K income — incorporation поки не вигідна (corp setup $2-5K legal + $2-3K accounting/рік). Стратегія: max RRSP (18% earned income), потім TFSA $7K, потім FHSA $8K, потім non-registered. Студентські loans (MD program — типово $80-150K canadian або conversion з ukrainian education) — refinance через MD Financial Management або RBC Healthcare line of credit (часто prime rate). Не пріоритезуй repayment проти max tax shelters — RRSP refund вище за loan interest.",
      },
      {
        icon: Building2,
        title: "Incorporation: коли і чому",
        body: "Incorporate коли personal income > $150K AND ти готовий залишати $50K+ у corp щороку (не використовуєш на personal spending). Чому: small business deduction (SBD) дає 11-13% corporate tax rate на перші $500K active business income (vs 50%+ personal marginal). Tax-deferred accumulation у corp — у тебе $30K додатково кожного року порівняно з withdrawing all to personal. Mеchаніка: setup federal CBCA або provincial corp ($1500-3000), separate corporate bank account, separate corporate brokerage, monthly accounting CPA $300-500. Не incorporate якщо не готовий до compliance overhead.",
      },
      {
        icon: ScrollText,
        title: "Salary vs dividend split — основне рішення року",
        body: "Раз на рік ти вирішуєш як забрати money з corp: T4 salary (creates RRSP room + CPP contributions + EI exempt for corp owners) або T5 dividends (нижчий effective tax integration). Класичне правило 2026: pay yourself enough salary щоб max-out RRSP ($33,810 у 2026 потребує ~$188K earned income → salary $188K), решта — dividends. Чому: RRSP створює tax-deferred personal retirement vehicle ON TOP of corp accumulation. CPP — обов'язковий якщо salary; для лікарів-incorporated вибір CPP-pay vs CPP-skip залежить від wins (50% chance CPP буде там в 65 років — пораджу не покладатись).",
      },
      {
        icon: Coins,
        title: "IPP (Individual Pension Plan): superior до RRSP при $150K+ income",
        body: "IPP — defined-benefit pension plan через corp, дозволяє більший contribution ніж RRSP, особливо для лікарів 40+ років. У 2026 типовий IPP contribution для 45-річного лікаря з $180K T4 salary = $35-45K/рік (vs RRSP max $33,810). Корп може deductувати full IPP contribution. Корисніше за RRSP коли: (1) ти 40+, (2) корп має stable cash flow, (3) ти incorporated 5+ років. Setup $2-5K, ongoing actuarial $1-2K/рік. Strategy: switch from RRSP-only to IPP+RRSP combo на 40-42 роки якщо incorporated. Setup через MD Financial або spcialized IPP provider.",
      },
      {
        icon: Shield,
        title: "Holdco + asset protection",
        body: "Holdco (Holding Corporation) — окрема corp що володіє shares твого MPC. Чому: (1) дозволяє dividend transfer з MPC до holdco tax-free (Section 112), (2) protects passive investments від MPC professional liability claims, (3) facilitates eventual exit/sale (зокрема для practice buyouts колег), (4) optimal structure для exempt market investments. Setup: $2500-4000 legal. Strategy для лікаря що накопичив $300K+ у MPC retained earnings: transfer щомісяця/щокварталу до holdco, всередині holdco — diversified investment portfolio. Active income stays у MPC, passive accumulation у holdco — separates liability.",
      },
      {
        icon: Target,
        title: "Exempt market + Eligible Investor як integrated estate strategy",
        body: "Лікар з 5+ роками practice + MPC + holdco — типово automatic Accredited Investor (net worth $1M+ або net financial assets $1M+). Це відкриває full exempt market: MICs (target IRR 8-12%), commercial REITs, private lending funds, development LPs. Стратегія: 15-25% holdco's investment portfolio у diversified exempt market positions. Перевага: distributions можна reinvest у holdco без personal tax, потім використати для buy-out partner у retirement або estate transfer. Для лікаря-newcomer з 10-річним horizon — exempt market може accelerate retirement readiness на 3-5 років. Self-check: /uk/eligibility.",
      },
    ],
    roadmapTitle: "10-річний roadmap для українського лікаря-newcomer",
    roadmap: [
      { month: "Роки 0-2: MCC + residency match", action: "Складай MCCQE1 + MCCQE2. Знайди residency. Income низький — max RRSP basics + FHSA. Не incorporate." },
      { month: "Роки 2-5: residency + first practice", action: "Income росте до $90-150K. Max RRSP + TFSA + FHSA. Open self-directed brokerage. Початок RRSP-via-broker (Wealthsimple/Questrade) для cost efficiency." },
      { month: "Рік 5: incorporation decision", action: "Якщо personal income > $150K і готовий залишати $50K+ у corp — incorporate MPC. Setup CPA + corporate banking + corporate brokerage." },
      { month: "Роки 5-8: corp accumulation phase", action: "Salary до max RRSP, дивіденди optimised до nil personal tax bracket. Retained earnings inside corp = invested portfolio. RDTOH tracking critical." },
      { month: "Рік 8: holdco setup", action: "Якщо MPC retained earnings $300K+ і ти plan exempt market entry — setup holdco. Tax-free Section 112 dividend transfer. Liability separation." },
      { month: "Роки 8-10: IPP + exempt market", action: "Switch RRSP-only → IPP+RRSP combo. Open holdco discovery з exempt market: 15-25% allocation. Estate planning conversations з wills/trusts lawyer." },
    ],
    pitfallsTitle: "5 типових помилок лікарів-newcomers",
    pitfalls: [
      { title: "Incorporate занадто рано", body: "Якщо ти не залишаєш $50K+ у corp annually — compliance overhead ($2-5K accounting + setup) перевищує tax savings. Чекай stable income $150K+ AND стабільні monthly expenses що < salary potential." },
      { title: "Ignor IPP після 40", body: "Після 40 років IPP дозволяє $5-15K додаткових contributions vs RRSP — і це повністю deductible для corp. Багато лікарів продовжують RRSP-only до 50-55 років, втрачаючи $50-150K tax savings." },
      { title: "Тримати все у MPC без holdco", body: "MPC є під professional liability — якщо patient suit судить тебе, всі MPC assets at risk. Holdco isolates passive investments. Не setup holdco = exposed millions у retained earnings до potential claims." },
      { title: "Не replenish RRSP після IPP setup", body: "IPP не заміняє RRSP повністю — RRSP має HBP / LLP options, FHSA combinability. Continue parallel RRSP contributions навіть з IPP." },
      { title: "Investing у MPC stocks/securities без RDTOH planning", body: "Refundable Dividend Tax On Hand (RDTOH) — критичний для passive income inside MPC. Без planning, MPC investments оподатковуються ~50% spuke before refund. Holdco structure фіксує." },
    ],
    scenariosTitle: "3 типових сценарії",
    scenarios: [
      {
        name: "Family doctor, 35 років, just incorporated MPC, $320K billings",
        breakdown: "Salary $188K (max RRSP $33,810), dividends $80K (eligible for tax integration), $52K retained inside MPC. Year 1: TFSA $7K + FHSA $8K + RRSP $33,810 = $48,810 personal tax shelter. MPC accumulates $52K invested у diversified ETF. За 5 років MPC retained earnings ~$330K. У рік 6 — holdco + IPP transition.",
      },
      {
        name: "Specialist, 45 років, established MPC + holdco, $580K billings",
        breakdown: "Salary $188K + dividends $150K + IPP contribution $42K from MPC, $200K retained transferred to holdco щорічно. Holdco investments: 60% public market (XEQT/VEQT через Wealthsimple), 25% private REITs/MICs (через мене як EMD), 15% liquid bond ladder. За 10 років holdco net worth $2-3M, MPC $500K+, personal RRSP+TFSA $400K = $3-3.9M lifetime accumulation.",
      },
      {
        name: "Resident, 32 років, $85K income, $120K student loans",
        breakdown: "Don't incorporate yet. Strategy: max RRSP $15K (refund ~$4.5K AB rate), TFSA $7K, FHSA $8K. Student loan refinance through RBC Healthcare LOC (prime + 0.5%) instead of federal Canada Student Loan (prime + 1%). Total tax shelter per year $30K + tax refund $4.5K. У 5-річний horizon residency completion — $150K у tax shelters + paid down loans.",
      },
    ],
    faqTitle: "Часті питання лікарів",
    faq: [
      {
        q: "Чи варто incorporated як family doctor з $250K billings?",
        a: "Залежить від твоєї personal spending vs ability to leave money inside corp. Якщо ти треба $200K/рік на life — incorporation marginal benefit. Якщо ти треба $130K і можеш залишати $50K+ у corp — incorporation дає ~$10-15K/рік tax savings. Discovery call з accountant + me для конкретних numbers.",
      },
      {
        q: "MD Financial Management чи self-directed?",
        a: "MD Financial — convenient (banking + investing + insurance one stop), але high MERs (1.5-2.5%) і limited exempt market access. Self-directed через Wealthsimple/Questrade — cheaper, AAA cash management. Recommendation: keep RRSP/TFSA self-directed, banking з MD або RBC Healthcare, exempt market через me як EMD.",
      },
      {
        q: "Як медичний newcomer може отримати holdco якщо MPC ще не setup?",
        a: "Holdco standalone setup можливий — це окремий corp без operational ties до MPC. Корисно якщо ти plan eventual MPC setup і хочеш asset accumulation роздільну. Але cost (legal $2-3K + accounting $1.5K/рік) не варто пока не маєш $100K+ для accumulation.",
      },
      {
        q: "Чи покриває MPC professional liability insurance мої passive investments?",
        a: "Ні. MPC liability protection — для operating activities (medical services). Investments inside MPC at risk if successful malpractice claim against you. Holdco isolation потрібен. Окремо: CMPA (Canadian Medical Protective Association) дає malpractice coverage, але не protects MPC corporate assets.",
      },
      {
        q: "IPP setup process — складно?",
        a: "Setup ~6-8 тижнів через specialized provider (Common Wealth IPP, Westcoast Actuaries, etc.). Costs: actuarial valuation $1500-2500, trust setup $1500, ongoing actuarial $1000-1500/рік. Складність на одного-стажу, потім automated. Net benefit для 40+ лікаря: $5-15K додаткових deductible contributions per year.",
      },
      {
        q: "Як incorporate якщо я з Ukrainian medical education без full Canadian recognition?",
        a: "Якщо ти ще не practising as full physician (residency matching pending) — не incorporate. Якщо ти practising через ISP program (Internationally-Trained Physicians) з provincial license — same rules as Canadian-trained: $150K+ income threshold, then incorporate. Якщо ти на CASPER assessment / clinical fellowship — обмежені incomes, RRSP-only поки що.",
      },
    ],
    bottomCtaTitle: "Готовий до конкретного MPC + IPP + exempt market плану?",
    bottomCtaText:
      "30-хвилинний discovery call. Розберемо твою конкретну ситуацію: billings, expenses, immigration status, incorporation date, existing holdings. Будь-який лікар-newcomer повинен мати персоналізовану financial roadmap, не template.",
    bottomCtaBtn: "Записатись на discovery call",
    secondaryCtaText: "Перш — перевір Eligible Investor status",
    secondaryCtaLink: "60-секундний self-check →",
  },
  ru: {
    titleMeta: "Финансы для врачей в Канаде — полный гайд",
    descriptionMeta:
      "Как русскоязычному врачу в Канаде структурировать MPC (Medical Professional Corporation), IPP, holdco и exempt market — детальный фреймворк для residents, family doctors, specialists.",
    crumbHome: "Главная",
    crumbThis: "Для врачей",
    eyebrow: "Pillar guide · 2026",
    title: "Финансы для врачей в Канаде",
    subtitle: "Как русскоязычному family doctor / specialist с MPC построить $5M+ net worth к 55 годам",
    tldr: "Русскоговорящая врач в Канаде с $250K+ practice income: incorporate MPC на 2-3 год practice, salary до CPP-max ($73,200 в 2026) + дивиденды для residual, IPP при 40+ лет с $200K+ accumulated, holdco для asset protection после $1M+ corporate assets.",
    intro:
      "Канадская медицина имеет уникальную финансовую structuру: 70%+ practising physicians работают через Medical Professional Corporation (MPC) — это принципиально другая tax game чем W-2 employee. Income часто $250K-$600K+ (family doctor 1.0 FTE ~$280-380K в Альберте/Онтарио, specialists $400K-$800K+), но без правильной corp structure ты платишь ~50% marginal personal tax. С MPC + holdco + IPP — effective lifetime tax drops significantly. Этот гайд: как русскоязычному врачу-newcomer (через MCC + IMG residency match) построить financial machine за 10 лет. CCO-approved educational content.",
    sections: [
      {
        icon: Stethoscope,
        title: "Residency / первые годы: фундамент до incorporation",
        body: "В residency $60-90K income — incorporation пока не выгодна (corp setup $2-5K legal + $2-3K accounting/год). Стратегия: max RRSP (18% earned income), потом TFSA $7K, потом FHSA $8K, потом non-registered. Студенческие loans (MD program — типично $80-150K canadian или conversion с ukrainian education) — refinance через MD Financial Management или RBC Healthcare line of credit (часто prime rate). Не приоритизируй repayment против max tax shelters — RRSP refund выше чем loan interest.",
      },
      {
        icon: Building2,
        title: "Incorporation: когда и почему",
        body: "Incorporate когда personal income > $150K AND ты готов оставлять $50K+ в corp ежегодно (не используешь на personal spending). Почему: small business deduction (SBD) даёт 11-13% corporate tax rate на первые $500K active business income (vs 50%+ personal marginal). Tax-deferred accumulation в corp — у тебя $30K дополнительно каждый год по сравнению с withdrawing all to personal. Механика: setup federal CBCA или provincial corp ($1500-3000), separate corporate bank account, separate corporate brokerage, monthly accounting CPA $300-500.",
      },
      {
        icon: ScrollText,
        title: "Salary vs dividend split — основное решение года",
        body: "Раз в год ты решаешь как забрать money с corp: T4 salary (creates RRSP room + CPP contributions) или T5 dividends (более низкий effective tax integration). Классическое правило 2026: pay yourself enough salary чтобы max-out RRSP ($33,810 в 2026 требует ~$188K earned income → salary $188K), остальное — dividends. Почему: RRSP создаёт tax-deferred personal retirement vehicle ON TOP of corp accumulation.",
      },
      {
        icon: Coins,
        title: "IPP (Individual Pension Plan): superior к RRSP при $150K+ income",
        body: "IPP — defined-benefit pension plan через corp, позволяет больший contribution чем RRSP, особенно для врачей 40+ лет. В 2026 типичный IPP contribution для 45-летнего врача с $180K T4 salary = $35-45K/год (vs RRSP max $33,810). Корп может deductировать full IPP contribution. Полезнее RRSP когда: (1) ты 40+, (2) корп имеет stable cash flow, (3) ты incorporated 5+ лет.",
      },
      {
        icon: Shield,
        title: "Holdco + asset protection",
        body: "Holdco (Holding Corporation) — отдельная corp которая владеет shares твоего MPC. Почему: (1) позволяет dividend transfer с MPC к holdco tax-free (Section 112), (2) protects passive investments от MPC professional liability claims, (3) facilitates eventual exit/sale, (4) optimal structure для exempt market investments. Setup: $2500-4000 legal. Strategy для врача который накопил $300K+ в MPC retained earnings: transfer ежемесячно/ежеквартально к holdco, внутри holdco — diversified investment portfolio.",
      },
      {
        icon: Target,
        title: "Exempt market + Eligible Investor как integrated estate strategy",
        body: "Врач с 5+ годами practice + MPC + holdco — типично automatic Accredited Investor (net worth $1M+ или net financial assets $1M+). Это открывает full exempt market: MICs (target IRR 8-12%), commercial REITs, private lending funds, development LPs. Стратегия: 15-25% holdco's investment portfolio в diversified exempt market positions. Self-check: /ru/eligibility.",
      },
    ],
    roadmapTitle: "10-летний roadmap для русскоязычного врача-newcomer",
    roadmap: [
      { month: "Годы 0-2: MCC + residency match", action: "Сдавай MCCQE1 + MCCQE2. Найди residency. Income низкий — max RRSP basics + FHSA. Не incorporate." },
      { month: "Годы 2-5: residency + first practice", action: "Income растёт до $90-150K. Max RRSP + TFSA + FHSA. Open self-directed brokerage." },
      { month: "Год 5: incorporation decision", action: "Если personal income > $150K и готов оставлять $50K+ в corp — incorporate MPC. Setup CPA + corporate banking." },
      { month: "Годы 5-8: corp accumulation phase", action: "Salary до max RRSP, дивиденды optimised до nil personal tax bracket. Retained earnings inside corp = invested portfolio." },
      { month: "Год 8: holdco setup", action: "Если MPC retained earnings $300K+ и ты plan exempt market entry — setup holdco. Tax-free Section 112 dividend transfer." },
      { month: "Годы 8-10: IPP + exempt market", action: "Switch RRSP-only → IPP+RRSP combo. Open holdco discovery с exempt market: 15-25% allocation. Estate planning conversations." },
    ],
    pitfallsTitle: "5 типичных ошибок врачей-newcomers",
    pitfalls: [
      { title: "Incorporate слишком рано", body: "Если ты не оставляешь $50K+ в corp annually — compliance overhead ($2-5K accounting + setup) превышает tax savings. Жди stable income $150K+ AND stable monthly expenses что < salary potential." },
      { title: "Игнор IPP после 40", body: "После 40 лет IPP позволяет $5-15K дополнительных contributions vs RRSP — и это полностью deductible для corp. Многие врачи продолжают RRSP-only до 50-55 лет, теряя $50-150K tax savings." },
      { title: "Держать всё в MPC без holdco", body: "MPC находится под professional liability — если patient suit судит тебя, все MPC assets at risk. Holdco isolates passive investments." },
      { title: "Не replenish RRSP после IPP setup", body: "IPP не заменяет RRSP полностью — RRSP имеет HBP / LLP options, FHSA combinability. Continue parallel RRSP contributions даже с IPP." },
      { title: "Investing в MPC stocks/securities без RDTOH planning", body: "Refundable Dividend Tax On Hand (RDTOH) — критичный для passive income inside MPC. Без planning, MPC investments облагаются ~50% before refund." },
    ],
    scenariosTitle: "3 типичных сценария",
    scenarios: [
      {
        name: "Family doctor, 35 лет, just incorporated MPC, $320K billings",
        breakdown: "Salary $188K (max RRSP $33,810), dividends $80K, $52K retained inside MPC. Year 1: TFSA $7K + FHSA $8K + RRSP $33,810 = $48,810 personal tax shelter. MPC накапливает $52K invested в diversified ETF. За 5 лет MPC retained earnings ~$330K. В год 6 — holdco + IPP transition.",
      },
      {
        name: "Specialist, 45 лет, established MPC + holdco, $580K billings",
        breakdown: "Salary $188K + dividends $150K + IPP contribution $42K from MPC, $200K retained transferred to holdco ежегодно. Holdco investments: 60% public market, 25% private REITs/MICs, 15% liquid bond ladder. За 10 лет holdco net worth $2-3M, MPC $500K+, personal RRSP+TFSA $400K = $3-3.9M lifetime accumulation.",
      },
      {
        name: "Resident, 32 года, $85K income, $120K student loans",
        breakdown: "Don't incorporate yet. Strategy: max RRSP $15K (refund ~$4.5K AB rate), TFSA $7K, FHSA $8K. Student loan refinance through RBC Healthcare LOC. Total tax shelter per year $30K + tax refund $4.5K.",
      },
    ],
    faqTitle: "Частые вопросы врачей",
    faq: [
      {
        q: "Стоит ли incorporated как family doctor с $250K billings?",
        a: "Зависит от твоего personal spending vs ability to leave money inside corp. Если тебе нужно $200K/год на life — incorporation marginal benefit. Если тебе нужно $130K и можешь оставлять $50K+ в corp — incorporation даёт ~$10-15K/год tax savings.",
      },
      {
        q: "MD Financial Management или self-directed?",
        a: "MD Financial — convenient но high MERs (1.5-2.5%) и limited exempt market access. Self-directed через Wealthsimple/Questrade — cheaper. Recommendation: keep RRSP/TFSA self-directed, banking с MD или RBC Healthcare, exempt market через меня как EMD.",
      },
      {
        q: "Как медицинский newcomer может получить holdco если MPC ещё не setup?",
        a: "Holdco standalone setup возможен — это отдельный corp без operational ties к MPC. Полезно если ты plan eventual MPC setup и хочешь asset accumulation раздельную. Но cost (legal $2-3K + accounting $1.5K/год) не стоит пока не имеешь $100K+ для accumulation.",
      },
      {
        q: "Покрывает ли MPC professional liability insurance мои passive investments?",
        a: "Нет. MPC liability protection — для operating activities. Investments inside MPC at risk if successful malpractice claim against you. Holdco isolation нужен. Отдельно: CMPA даёт malpractice coverage, но не protects MPC corporate assets.",
      },
      {
        q: "IPP setup process — сложно?",
        a: "Setup ~6-8 недель через specialized provider. Costs: actuarial valuation $1500-2500, trust setup $1500, ongoing actuarial $1000-1500/год. Net benefit для 40+ врача: $5-15K дополнительных deductible contributions per year.",
      },
      {
        q: "Как incorporate если я с Ukrainian medical education без full Canadian recognition?",
        a: "Если ты ещё не practising as full physician — не incorporate. Если ты practising через ISP program с provincial license — same rules: $150K+ income threshold, then incorporate.",
      },
    ],
    bottomCtaTitle: "Готов к конкретному MPC + IPP + exempt market плану?",
    bottomCtaText:
      "30-минутный discovery call. Разберём твою конкретную ситуацию: billings, expenses, immigration status, incorporation date, existing holdings.",
    bottomCtaBtn: "Записаться на discovery call",
    secondaryCtaText: "Прежде — проверь Eligible Investor status",
    secondaryCtaLink: "60-секундный self-check →",
  },
  en: {
    titleMeta: "Finance for physicians in Canada — full guide",
    descriptionMeta:
      "How a Ukrainian/Russian-speaking physician in Canada structures their Medical Professional Corporation (MPC), Individual Pension Plan (IPP), holdco, and exempt market — concrete framework for residents, family doctors, specialists. Licensed DR.",
    crumbHome: "Home",
    crumbThis: "For physicians",
    eyebrow: "Pillar guide · 2026",
    title: "Finance for physicians in Canada",
    subtitle: "How a Ukrainian/Russian-speaking family doctor / specialist with an MPC builds $5M+ net worth by 55",
    tldr: "Ukrainian physician in Canada with $250K+ practice income: incorporate MPC in practice year 2-3, salary to CPP-max ($73,200 in 2026) + dividends for residual, IPP at 40+ with $200K+ accumulated, holdco for asset protection past $1M corporate assets.",
    intro:
      "Canadian medicine has a unique financial structure: 70%+ practising physicians operate through a Medical Professional Corporation (MPC) — a fundamentally different tax game than W-2 employment. Income often $250K-$600K+ (family doctor 1.0 FTE ~$280-380K in Alberta/Ontario, specialists $400K-$800K+), but without the right corp structure you pay ~50% marginal personal tax. With MPC + holdco + IPP, lifetime effective tax drops significantly. This guide: how a Ukrainian/Russian-speaking newcomer-physician (via MCC + IMG residency match) builds a financial machine over 10 years. CCO-approved educational content.",
    sections: [
      {
        icon: Stethoscope,
        title: "Residency / first years: foundation before incorporation",
        body: "During residency $60-90K income — incorporation isn't worth it yet (corp setup $2-5K legal + $2-3K accounting/year). Strategy: max RRSP (18% earned income), then TFSA $7K, then FHSA $8K, then non-registered. Student loans (MD program — typically $80-150K Canadian or conversion from Ukrainian education) — refinance through MD Financial Management or RBC Healthcare line of credit. Don't prioritize repayment over max tax shelters — the RRSP refund beats loan interest.",
      },
      {
        icon: Building2,
        title: "Incorporation: when and why",
        body: "Incorporate when personal income > $150K AND you're ready to leave $50K+ in corp annually. Why: the small business deduction (SBD) gives an 11-13% corporate tax rate on the first $500K active business income (vs 50%+ personal marginal). Tax-deferred accumulation in corp adds $30K of capital every year vs withdrawing all to personal. Mechanics: setup federal CBCA or provincial corp ($1500-3000), separate corporate banking, separate corporate brokerage, monthly CPA $300-500.",
      },
      {
        icon: ScrollText,
        title: "Salary vs dividend split — your annual key decision",
        body: "Once a year you decide how to draw money from your corp: T4 salary (creates RRSP room + CPP contributions) or T5 dividends (lower effective tax integration). Classic 2026 rule: pay yourself enough salary to max out RRSP ($33,810 needs ~$188K earned income → salary $188K), the rest as dividends. Why: RRSP creates a tax-deferred personal retirement vehicle ON TOP of corp accumulation.",
      },
      {
        icon: Coins,
        title: "IPP (Individual Pension Plan): superior to RRSP at $150K+ income",
        body: "IPP is a defined-benefit pension plan through your corp that allows larger contributions than RRSP, especially for physicians 40+. In 2026 a typical IPP contribution for a 45-year-old physician on $180K T4 salary = $35-45K/year (vs RRSP max $33,810). Corp deducts the full IPP contribution. More useful than RRSP when: (1) you're 40+, (2) corp has stable cash flow, (3) you've been incorporated 5+ years.",
      },
      {
        icon: Shield,
        title: "Holdco + asset protection",
        body: "Holdco (Holding Corporation) — a separate corp that owns shares of your MPC. Why: (1) allows tax-free Section 112 dividend transfer MPC → holdco, (2) protects passive investments from MPC professional liability claims, (3) facilitates eventual exit/sale, (4) optimal structure for exempt market investments. Setup: $2500-4000 legal. Strategy for a physician with $300K+ in MPC retained earnings: transfer monthly/quarterly to holdco; inside holdco — diversified investment portfolio.",
      },
      {
        icon: Target,
        title: "Exempt market + Eligible Investor as integrated estate strategy",
        body: "A physician with 5+ years of practice + MPC + holdco is typically an automatic Accredited Investor (net worth $1M+ or net financial assets $1M+). That unlocks the full exempt market: MICs (historical 8-12% IRR target), commercial REITs, private lending funds, development LPs. Strategy: 15-25% of the holdco's investment portfolio in diversified exempt-market positions. Self-check: /en/eligibility.",
      },
    ],
    roadmapTitle: "10-year roadmap for a Ukrainian/Russian-speaking newcomer physician",
    roadmap: [
      { month: "Years 0-2: MCC + residency match", action: "Pass MCCQE1 + MCCQE2. Find residency. Low income — max RRSP basics + FHSA. Don't incorporate." },
      { month: "Years 2-5: residency + first practice", action: "Income grows to $90-150K. Max RRSP + TFSA + FHSA. Open a self-directed brokerage." },
      { month: "Year 5: incorporation decision", action: "If personal income > $150K and you can leave $50K+ in corp — incorporate the MPC. Set up CPA + corporate banking." },
      { month: "Years 5-8: corp accumulation phase", action: "Salary to max RRSP, dividends optimised down to nil personal tax bracket. Retained earnings inside corp = invested portfolio." },
      { month: "Year 8: holdco setup", action: "If MPC retained earnings $300K+ and you plan exempt market entry — set up holdco. Tax-free Section 112 dividend transfer." },
      { month: "Years 8-10: IPP + exempt market", action: "Switch RRSP-only → IPP+RRSP combo. Open holdco's exempt market entry — 15-25% allocation. Estate planning conversations with a wills/trusts lawyer." },
    ],
    pitfallsTitle: "5 typical mistakes for newcomer-physicians",
    pitfalls: [
      { title: "Incorporating too early", body: "If you're not leaving $50K+ in corp annually — compliance overhead ($2-5K accounting + setup) outweighs tax savings. Wait for stable $150K+ income AND stable monthly expenses < salary potential." },
      { title: "Ignoring IPP after 40", body: "After 40 IPP allows $5-15K extra deductible contributions vs RRSP — fully deductible for the corp. Many physicians stick with RRSP-only until 50-55, losing $50-150K in tax savings." },
      { title: "Holding everything in MPC without holdco", body: "MPC sits under professional liability — if a patient suit succeeds, all MPC assets are at risk. Holdco isolates passive investments." },
      { title: "Not replenishing RRSP after IPP setup", body: "IPP doesn't fully replace RRSP — RRSP has HBP / LLP options and FHSA combinability. Continue parallel RRSP contributions even with IPP." },
      { title: "Investing in MPC stocks/securities without RDTOH planning", body: "Refundable Dividend Tax On Hand (RDTOH) is critical for passive income inside MPC. Without planning, MPC investments are taxed ~50% upfront before refund. Holdco structure fixes it." },
    ],
    scenariosTitle: "3 typical scenarios",
    scenarios: [
      {
        name: "Family doctor, 35, just incorporated MPC, $320K billings",
        breakdown: "Salary $188K (max RRSP $33,810), dividends $80K, $52K retained inside MPC. Year 1: TFSA $7K + FHSA $8K + RRSP $33,810 = $48,810 personal tax shelter. MPC accumulates $52K invested in diversified ETF. Over 5 years MPC retained earnings ~$330K. Year 6 — holdco + IPP transition.",
      },
      {
        name: "Specialist, 45, established MPC + holdco, $580K billings",
        breakdown: "Salary $188K + dividends $150K + IPP contribution $42K from MPC, $200K retained transferred to holdco annually. Holdco investments: 60% public market, 25% private REITs/MICs, 15% liquid bond ladder. Over 10 years holdco net worth $2-3M, MPC $500K+, personal RRSP+TFSA $400K = $3-3.9M lifetime accumulation.",
      },
      {
        name: "Resident, 32, $85K income, $120K student loans",
        breakdown: "Don't incorporate yet. Strategy: max RRSP $15K (refund ~$4.5K AB rate), TFSA $7K, FHSA $8K. Refinance student loan through RBC Healthcare LOC. Total tax shelter per year $30K + tax refund $4.5K. 5-year horizon to residency completion = $150K in tax shelters + paid-down loans.",
      },
    ],
    faqTitle: "Physician FAQ",
    faq: [
      {
        q: "Should I incorporate as a family doctor at $250K billings?",
        a: "Depends on your personal spending vs ability to leave money inside corp. If you need $200K/year for life — incorporation has marginal benefit. If you need $130K and can leave $50K+ in corp — incorporation saves ~$10-15K/year in tax.",
      },
      {
        q: "MD Financial Management or self-directed?",
        a: "MD Financial is convenient but high MERs (1.5-2.5%) and limited exempt market access. Self-directed via Wealthsimple/Questrade is cheaper. Recommendation: keep RRSP/TFSA self-directed, banking with MD or RBC Healthcare, exempt market through me as EMD.",
      },
      {
        q: "Can a newcomer physician get a holdco if the MPC isn't set up yet?",
        a: "A standalone holdco is possible — a separate corp without operational ties to MPC. Useful if you plan eventual MPC setup and want asset accumulation separate. But cost ($2-3K legal + $1.5K/year accounting) isn't worth it until you have $100K+ to accumulate.",
      },
      {
        q: "Does MPC professional liability insurance cover my passive investments?",
        a: "No. MPC liability protection is for operating activities. Investments inside MPC are at risk if a malpractice claim succeeds. Holdco isolation is needed. CMPA provides malpractice coverage but doesn't protect MPC corporate assets.",
      },
      {
        q: "IPP setup process — is it hard?",
        a: "Setup ~6-8 weeks through a specialized provider. Costs: actuarial valuation $1500-2500, trust setup $1500, ongoing actuarial $1000-1500/year. Net benefit for a 40+ physician: $5-15K extra deductible contributions per year.",
      },
      {
        q: "How do I incorporate if I'm a Ukrainian medical graduate without full Canadian recognition?",
        a: "If you're not yet practising as a full physician — don't incorporate. If you're practising through an ISP program with a provincial license — same rules apply: $150K+ income threshold, then incorporate.",
      },
    ],
    bottomCtaTitle: "Ready for a concrete MPC + IPP + exempt market plan?",
    bottomCtaText:
      "30-minute discovery call. We'll work through your specific situation: billings, expenses, immigration status, incorporation date, existing holdings.",
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
  const path = `/${locale}/dlya-mediks`;
  const alternates = Object.fromEntries(
    SUPPORTED_LOCALES.map((l) => [
      { uk: "uk", ru: "ru", en: "en-CA" }[l],
      `/${l}/dlya-mediks`,
    ])
  );
  alternates["x-default"] = "/uk/dlya-mediks";
  return {
    title: c.titleMeta,
    description: c.descriptionMeta,
    keywords: [
      "physician finance Canada",
      "MPC Medical Professional Corporation",
      "IPP Individual Pension Plan",
      "doctor incorporation Canada",
      "лікарі Канада фінанси",
      "врачи Канада финансы",
      "MD Financial",
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

// MedicalWebPage schema (Audit 5 #11 / Batch 9 pattern). MedicalWebPage is
// Schema.org's elevated YMYL type for content addressing medical
// professionals / patients — Google's Search Quality Rater Guidelines hold
// it to a higher E-E-A-T standard. Layering it next to Article makes the
// regulatory + professional angle of MPC / IPP / holdco content explicit
// to AI Overviews + Google KG.
function buildMedicalWebPageJsonLd(locale, c, path) {
  return {
    "@context": "https://schema.org",
    "@type": "MedicalWebPage",
    "@id": `https://sky-fort.ca${path}#medicalwebpage`,
    name: c.titleMeta,
    description: c.descriptionMeta,
    url: `https://sky-fort.ca${path}`,
    inLanguage: { uk: "uk", ru: "ru", en: "en-CA" }[locale],
    audience: {
      "@type": "MedicalAudience",
      audienceType: "Medical professionals (physicians, residents, specialists)",
      geographicArea: {
        "@type": "Country",
        name: "Canada",
      },
    },
    about: [
      {
        "@type": "Thing",
        name: "Medical Professional Corporation (MPC)",
        description: "Specialized CCPC permitted for licensed Canadian physicians in AB, BC, ON, SK, MB, NS, NB. Provides Small Business Deduction, salary/dividend split, IPP eligibility, and asset protection.",
      },
      {
        "@type": "Thing",
        name: "Individual Pension Plan (IPP)",
        description: "Defined-benefit pension plan for one-person CCPC. Allows $40-70K/year contributions for physicians 40+, vs $33,810 RRSP limit. OSFI-regulated.",
      },
      {
        "@type": "Thing",
        name: "Holdco asset protection",
        description: "Holding company structure connecting to MPC via §112(1) tax-free dividend. Protects accumulated wealth from malpractice claims against MPC.",
      },
    ],
    reviewedBy: {
      "@type": "Person",
      name: "Andrii Andriushchenko",
      jobTitle: "Licensed Dealing Representative",
      identifier: "NRD 4575551",
      url: `https://sky-fort.ca/${locale}/pro-mene`,
    },
    lastReviewed: "2026-05-28",
  };
}

export default async function MediksPillarPage({ params }) {
  const { locale } = await params;
  const c = COPY[locale] || COPY.uk;
  const path = `/${locale}/dlya-mediks`;

  return (
    <main id="main" className="min-h-screen bg-[var(--color-bg)] text-white">
      <ScrollDepthTracker page="dlya-mediks" />
      <StickyCta locale={locale} page="dlya-mediks" />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(buildJsonLd(locale, c, path)) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(buildMedicalWebPageJsonLd(locale, c, path)) }}
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
          <div className="mb-3">
            <UpdatedBadge date="2026-05-29" locale={locale} />
          </div>
          <TldrBlock
            text={c.tldr}
            pageName={c.titleMeta}
            pageUrl={`https://sky-fort.ca/${locale}/dlya-mediks`}
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
            href: `/${locale}/dlya-pidpryyemtsiv`,
            label: locale === "ru" ? "Для предпринимателей" : locale === "en" ? "For founders" : "Для підприємців",
            description: locale === "ru" ? "CCPC, TOSI, LCGE — гайд для founders." : locale === "en" ? "CCPC, TOSI, LCGE — founder pillar." : "CCPC, TOSI, LCGE — гайд для засновників.",
          },
          {
            href: `/${locale}/eligibility`,
            label: locale === "ru" ? "Eligible Investor self-check" : locale === "en" ? "Eligible Investor self-check" : "Eligible Investor self-check",
            description: locale === "ru" ? "Подходишь ли под exempt market через MPC." : locale === "en" ? "Does your MPC fit exempt market thresholds?" : "Чи попадає твоя MPC у exempt market.",
          },
          {
            href: `/${locale}/calculators/financial-freedom`,
            label: locale === "ru" ? "Калькулятор FI" : locale === "en" ? "Financial-freedom calculator" : "Калькулятор FI",
            description: locale === "ru" ? "Какой net worth нужен для retirement в 55." : locale === "en" ? "What net worth funds retirement at 55." : "Який net worth для retirement у 55.",
          },
        ]}
      />
      <StaticFaq faq={c.faq} heading={c.faqTitle} jsonLdId={`https://sky-fort.ca${path}#faq`} />

      <section className="mx-auto max-w-3xl px-6 py-12">
        <TopicSuggestForm locale={locale} source="dlya-mediks" />
      </section>

      <section className="mx-auto max-w-3xl px-6 py-24 text-center">
        <h2 className="font-display-tight text-3xl text-white md:text-5xl">{c.bottomCtaTitle}</h2>
        <p className="mx-auto mt-5 max-w-2xl text-lg leading-relaxed text-[#a3a3a3]">{c.bottomCtaText}</p>
        <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
          <a
            href={CALENDLY}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-full bg-[var(--color-brand)] px-8 py-4 text-sm font-bold uppercase tracking-wider text-white transition-[transform,background-color] duration-200 ease-[var(--ease-out)] hover:bg-[var(--color-brand-hover)] active:scale-[0.98]"
          >
            {c.bottomCtaBtn}
            <ArrowRight className="h-4 w-4" aria-hidden="true" />
          </a>
        </div>
        <div className="mt-6 text-sm">
          <Link href={`/${locale}/eligibility`} className="text-[var(--color-brand)] transition-colors duration-150 ease-[var(--ease-out)] hover:text-[var(--color-brand-hover)]">
            {c.secondaryCtaText} · {c.secondaryCtaLink}
          </Link>
        </div>
      </section>
    </main>
  );
}
