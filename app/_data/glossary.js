// app/_data/glossary.js
// Canonical glossary data (Canadian personal-finance terms) — extracted from
// the /[locale]/slovnyk hub so individual entity pages
// (/[locale]/slovnyk/[term]) can reuse the exact same term/definition data
// and DefinedTerm schema. Compliance posture unchanged: factual,
// source-attributed (canada.ca, CSA, OSFI), no recommendations, no return
// claims. UK is the source; RU overrides term + definition, EN overrides the
// definition only.

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
  // ─── Batch 14 expansion: +20 terms ───────────────────────────────────────
  {
    id: "etf",
    term: "ETF — Exchange-Traded Fund",
    definition:
      "Кошик securities (stocks, bonds) що торгується на біржі як одна акція. Канадські ETF мають MER 0.05-0.30% (vs 1.5-2.5% mutual fund). Доступні через будь-який self-directed broker (Wealthsimple, Questrade). Broad-market: XEQT, VEQT, VFV, XAW.",
    source: { label: "IIROC ETF guidance", url: "https://www.ciro.ca/" },
    related: { label: "MER impact калькулятор", href: "/calculators/mer-impact" },
  },
  {
    id: "mer",
    term: "MER — Management Expense Ratio",
    definition:
      "Щорічна комісія управителя фонду, автоматично віднімається з вартості unit-ів. Канадські банківські mutual funds типово 1.5-2.5%; self-directed ETF 0.05-0.30%. За 30 років 2% MER з'їдає 40-50% потенційного фінального капіталу (T-REX score).",
    source: { label: "CSA — Cost of investing", url: "https://www.securities-administrators.ca/" },
    related: { label: "MER калькулятор", href: "/calculators/mer-impact" },
  },
  {
    id: "trex",
    term: "T-REX Score (Total Return Efficiency Index)",
    definition:
      "Метрика Larry Bates (автор «Beat the Bank»): частка compound return яка залишається у тебе після MER. 100% = ідеально (0 MER). 60% = $40 з кожних $100 потенційного прибутку пішло фонду. Якщо T-REX < 70% — переходь на self-directed ETF.",
    source: { label: "larrybates.ca", url: "https://larrybates.ca/" },
  },
  {
    id: "cra",
    term: "CRA — Canada Revenue Agency",
    definition:
      "Federal податковий орган Канади. Адмініструє income tax, GST/HST, RRSP/TFSA/FHSA contribution rooms, CCB, CESG. Перевір свої ліміти + NoA у CRA My Account (my.cra-arc.gc.ca).",
    source: { label: "canada.ca/CRA", url: "https://www.canada.ca/en/revenue-agency.html" },
  },
  {
    id: "ccb",
    term: "CCB — Canada Child Benefit",
    definition:
      "Tax-free monthly payment для сімей з дітьми до 18. Сума залежить від family income (до $7,787/рік на дитину 0-5, $6,570 на дитину 6-17 у 2026). Автоматично нараховується після tax return.",
    source: { label: "canada.ca/CCB", url: "https://www.canada.ca/en/revenue-agency/services/child-family-benefits/canada-child-benefit-overview.html" },
  },
  {
    id: "oas",
    term: "OAS — Old Age Security",
    definition:
      "Federal pension benefit для residents 65+. Максимум $727/міс (2026) залежить від років residency у Канаді (full 40 years = full amount). Якщо income > $90K — OAS clawback. Newcomers потребують 10+ років residency для будь-якого OAS.",
    source: { label: "canada.ca/OAS", url: "https://www.canada.ca/en/services/benefits/publicpensions/cpp/old-age-security.html" },
  },
  {
    id: "cpp",
    term: "CPP — Canada Pension Plan",
    definition:
      "Contributory pension. Employee + employer кожен платить 5.95% earned income до YMPE $73,200 (2026). Self-employed платять обидві сторони (11.9%). Максимальна benefit при retirement at 65: ~$1,433/міс (потребує 40+ років max contributions).",
    source: { label: "canada.ca/CPP", url: "https://www.canada.ca/en/services/benefits/publicpensions/cpp.html" },
  },
  {
    id: "rrif",
    term: "RRIF — Registered Retirement Income Fund",
    definition:
      "Конверсія RRSP до retirement income vehicle. Має бути зроблена до кінця року коли тобі 71. Мінімальні щорічні withdrawals по age-based formula (4% at 65 до 18% at 95). Все withdrawn оподатковується як income.",
    source: { label: "canada.ca/RRIF", url: "https://www.canada.ca/en/revenue-agency/services/tax/individuals/topics/rrsps-related-plans/transferring/converting-your-rrsp-rrif.html" },
  },
  {
    id: "lif",
    term: "LIF — Life Income Fund",
    definition:
      "Locked-in RRIF — конвертований з locked-in pension funds (LIRA). Має мінімум AND максимум withdrawals щороку (формула регламентує). Provincial rules vary — AB/BC дозволяють unlock 50% LIRA до RRSP one-time.",
    source: { label: "OSFI — LIF rules", url: "https://www.osfi-bsif.gc.ca/" },
  },
  {
    id: "t1135",
    term: "T1135 — Foreign Income Verification Statement",
    definition:
      "CRA reporting requirement якщо твої combined foreign assets > $100K CAD у будь-якому tax year. Включає: foreign bank accounts, foreign rental property, foreign stocks/ETF held у non-Canadian brokers, foreign trusts. Penalty за late filing: $25/день, max $2,500/рік.",
    source: { label: "canada.ca/T1135", url: "https://www.canada.ca/en/revenue-agency/services/forms-publications/forms/t1135.html" },
  },
  {
    id: "noa-detail",
    term: "NoA fields — що шукати у Notice of Assessment",
    definition:
      "Ключові рядки NoA: RRSP Deduction Limit (наступний рік), Unused TFSA Contribution Room, HBP Repayments Outstanding, Carry-forward Losses (capital), Carry-forward Tuition Credits, Pension Adjustment (якщо є RPP). Перевір on CRA My Account кожен квітень.",
    source: { label: "CRA My Account", url: "https://www.canada.ca/en/revenue-agency/services/e-services/cra-my-account.html" },
  },
  {
    id: "lcis",
    term: "Locked-in Pension (LIRA)",
    definition:
      "Locked-in Retirement Account. Створюється при transfer з employer DB/DC pension plan. Не можна withdraw до age 55 (provincial vary). При retirement конвертується у LIF / annuity. Деякі provinces дозволяють 50% one-time unlock.",
    source: { label: "OSFI", url: "https://www.osfi-bsif.gc.ca/" },
  },
  {
    id: "rdsp",
    term: "RDSP — Registered Disability Savings Plan",
    definition:
      "Tax-deferred account для людей з disability tax credit (DTC). Government grants: CDSG до $3,500/рік, CDSB до $1,000/рік для low-income families. Lifetime limit $200K contributions. Withdrawal не affect AISH або інші disability benefits.",
    source: { label: "canada.ca/RDSP", url: "https://www.canada.ca/en/employment-social-development/programs/disability/savings.html" },
  },
  {
    id: "dtc",
    term: "DTC — Disability Tax Credit",
    definition:
      "Non-refundable federal tax credit для людей з severe + prolonged impairment. Approval через Form T2201 (медичним практитіонером). Дає access до RDSP, CDSG/CDSB. Backdate до 10 років past tax refunds можливо при approval.",
    source: { label: "canada.ca/DTC", url: "https://www.canada.ca/en/revenue-agency/services/tax/individuals/segments/tax-credits-deductions-persons-disabilities/disability-tax-credit.html" },
  },
  {
    id: "tax-loss-harvest",
    term: "Tax-loss harvesting",
    definition:
      "Стратегія: продати investment з паперовим збитком у non-registered account щоб realize capital loss, потім купити equivalent (не identical — superficial loss rules) за 30+ днів. Capital loss offsetа́є current/past/future capital gains. Не applicable у TFSA / RRSP.",
    source: { label: "CRA — superficial loss rules", url: "https://www.canada.ca/en/revenue-agency/services/tax/individuals/topics/about-your-tax-return/tax-return/completing-a-tax-return/personal-income/line-12700-capital-gains.html" },
  },
  {
    id: "superficial-loss",
    term: "Superficial loss rule (CRA)",
    definition:
      "CRA anti-abuse rule: якщо ти продаєш security at a loss і re-buy «identical property» у 30 днів (до або після), capital loss disallowed. Identical = same ETF / stock. Workaround: купи дуже схожий but не identical product (e.g. VFV → ZSP — both S&P 500 але різні issuers).",
    source: { label: "CRA — superficial losses", url: "https://www.canada.ca/en/revenue-agency/services/tax/individuals/topics/about-your-tax-return/tax-return/completing-a-tax-return/personal-income/line-12700-capital-gains/transferring-shares-spouse.html" },
  },
  {
    id: "gst-hst",
    term: "GST/HST registration",
    definition:
      "Federal value-added tax. Self-employed / business owners мають register коли revenue > $30K у будь-якому 4-quarter rolling window. Once registered: charge GST/HST на invoices, claim input tax credits на business expenses, file returns quarterly/annually.",
    source: { label: "canada.ca/GST", url: "https://www.canada.ca/en/revenue-agency/services/tax/businesses/topics/gst-hst-businesses.html" },
  },
  {
    id: "ymp-yampe",
    term: "YMPE / YAMPE (CPP enhancements)",
    definition:
      "Year's Maximum Pensionable Earnings ($73,200 у 2026) — основний CPP cap. YAMPE ($83,200 у 2026) — second-tier cap for CPP2 (enhanced CPP rolled out 2024). Earnings between YMPE+YAMPE attract additional 4% CPP2 contribution. Increases future CPP benefits.",
    source: { label: "canada.ca/CPP-enhancement", url: "https://www.canada.ca/en/services/benefits/publicpensions/cpp/cpp-enhancement.html" },
  },
  {
    id: "spousal-rrsp",
    term: "Spousal RRSP",
    definition:
      "RRSP де ти (higher-income spouse) contributeет, але spouse — annuitant (owner). Goal: equalize retirement income між spouses щоб minimize total household tax у retirement. 3-year attribution rule: якщо spouse withdraws < 3 років після твого contribution, withdrawal taxed back до тебе.",
    source: { label: "canada.ca/spousal-RRSP", url: "https://www.canada.ca/en/revenue-agency/services/tax/individuals/topics/rrsps-related-plans/contributing-a-rrsp-prpp/contributing-a-spouse-common-law-partner-rrsp-prpp.html" },
  },
  {
    id: "rrsp-overcontribution",
    term: "RRSP over-contribution",
    definition:
      "CRA дозволяє buffer $2,000 (lifetime) понад твоє RRSP room без penalty. Понад $2,000 — 1% per month penalty на excess. Tax credit на over-contribution не доступний у поточному році, але можна claim у наступному (якщо room звільниться).",
    source: { label: "canada.ca/RRSP-overcontribution", url: "https://www.canada.ca/en/revenue-agency/services/tax/individuals/topics/rrsps-related-plans/contributing-a-rrsp-prpp/excess-contributions.html" },
  },
  // ─── Batch 21 expansion: +15 terms (newcomer basics, tax fundamentals,
  //     entrepreneur dividends, investing, real estate) ─────────────────────
  {
    id: "sin",
    term: "SIN — Social Insurance Number",
    definition:
      "9-значний номер, обов'язковий щоб legally працювати в Канаді та відкрити будь-який registered рахунок (TFSA, RRSP, FHSA). Newcomers подають заяву через Service Canada у перші дні після прибуття — безкоштовно, часто видають того ж дня. Тимчасові residents (включно з CUAET) отримують SIN, що починається на 9.",
    source: { label: "canada.ca/SIN", url: "https://www.canada.ca/en/employment-social-development/services/sin.html" },
  },
  {
    id: "credit-score",
    term: "Credit Score (Equifax / TransUnion)",
    definition:
      "Числовий показник кредитоспроможності 300-900, який ведуть два бюро — Equifax і TransUnion. Newcomers починають з нуля: перша secured credit card + вчасні платежі будують історію за 6-12 місяців. Впливає на approval і ставку по mortgage, оренді та авто-кредиту.",
    source: { label: "FCAC — credit reports", url: "https://www.canada.ca/en/financial-consumer-agency/services/credit-reports-score.html" },
  },
  {
    id: "tax-residency",
    term: "Tax Residency (residential ties)",
    definition:
      "Канада оподатковує за residency, не громадянством. Tax resident платить податок на worldwide income з дати «establishing residential ties» (житло, родина, банк-рахунок) — для newcomers зазвичай дата прибуття. У перший рік ти part-year resident: оподатковується лише дохід після дати в'їзду.",
    source: { label: "canada.ca — newcomers", url: "https://www.canada.ca/en/revenue-agency/services/tax/international-non-residents/individuals-leaving-entering-canada-non-residents/newcomers-canada-immigrants.html" },
  },
  {
    id: "tax-slips",
    term: "Tax Slips — T4, T5, T3, T4A",
    definition:
      "Стандартизовані форми, які payers надсилають тобі й CRA про твій дохід. T4 — employment income; T5 — investment income (dividends, interest); T3 — trust/ETF distributions; T4A — pension, scholarships, self-employed commissions. Усі з'являються у CRA My Account до кінця березня й auto-fill у tax software.",
    source: { label: "canada.ca — tax slips", url: "https://www.canada.ca/en/revenue-agency/services/tax/individuals/topics/about-your-tax-return/tax-return/completing-a-tax-return/tax-slips.html" },
  },
  {
    id: "acb",
    term: "ACB — Adjusted Cost Base",
    definition:
      "Податкова собівартість investment: ціна купівлі + commissions + reinvested distributions, поділена на кількість units. Capital gain = proceeds − ACB. Для одного й того ж security, купленого в різний час, ACB усереднюється. Точний ACB критичний у non-registered accounts; у TFSA/RRSP не релевантний.",
    source: { label: "canada.ca — ACB", url: "https://www.canada.ca/en/revenue-agency/services/tax/individuals/topics/about-your-tax-return/tax-return/completing-a-tax-return/personal-income/line-12700-capital-gains/adjusted-cost-base.html" },
  },
  {
    id: "capital-gains-inclusion",
    term: "Capital Gains Inclusion Rate",
    definition:
      "Частка capital gain, що додається до taxable income. У Канаді 50% — продаєш investment з прибутком $10,000, оподатковується $5,000 за твоєю marginal rate. Gains у TFSA/RRSP/FHSA не оподатковуються взагалі. Principal residence — exempt через PRE.",
    source: { label: "canada.ca — capital gains", url: "https://www.canada.ca/en/revenue-agency/services/tax/individuals/topics/about-your-tax-return/tax-return/completing-a-tax-return/personal-income/line-12700-capital-gains.html" },
  },
  {
    id: "marginal-rate",
    term: "Marginal Tax Rate",
    definition:
      "Ставка податку на твій наступний зароблений долар (combined federal + provincial). Канада має progressive brackets: перші ~$57K федерально 15%, верхні брекети до 33% + provincial. Average rate завжди нижчий за marginal. Знати свій marginal rate потрібно, щоб оцінити вартість RRSP deduction чи bonus.",
    source: { label: "canada.ca — tax rates", url: "https://www.canada.ca/en/revenue-agency/services/tax/individuals/frequently-asked-questions-individuals/canadian-income-tax-rates-individuals-current-previous-years.html" },
  },
  {
    id: "pre",
    term: "PRE — Principal Residence Exemption",
    definition:
      "Звільнення від capital gains tax при продажу житла, що було твоєю principal residence. За кожен рік designation gain не оподатковується; одне житло на сім'ю на рік. Продаж треба report у Schedule 3 навіть якщо повністю exempt — інакше penalty.",
    source: { label: "canada.ca — principal residence", url: "https://www.canada.ca/en/revenue-agency/services/tax/individuals/topics/about-your-tax-return/tax-return/completing-a-tax-return/personal-income/line-12700-capital-gains/principal-residence-other-real-estate.html" },
  },
  {
    id: "cda",
    term: "CDA — Capital Dividend Account",
    definition:
      "Нотаційний рахунок CCPC, що відстежує tax-free частину capital gains (50%, не included), life-insurance proceeds та інше. Власник може виплатити capital dividend з CDA повністю без податку. Ключовий tool для tax-efficient extraction прибутку з корпорації; потребує election (T2054) перед виплатою.",
    source: { label: "canada.ca — capital dividends", url: "https://www.canada.ca/en/revenue-agency/services/tax/businesses/topics/dividends/capital-dividends.html" },
    related: { label: "Гайд для підприємців", href: "/dlya-pidpryyemtsiv" },
  },
  {
    id: "eligible-dividend",
    term: "Eligible vs Non-Eligible Dividends",
    definition:
      "Дві категорії canadian dividends з різним gross-up і dividend tax credit. Eligible (з public company або CCPC income, оподаткованого по general rate) — нижча personal tax. Non-eligible (з SBD income під 9%) — вища personal tax, бо integration вирівнює загальне навантаження. Впливає на salary-vs-dividend рішення власника.",
    source: { label: "canada.ca — dividends", url: "https://www.canada.ca/en/revenue-agency/services/tax/individuals/topics/about-your-tax-return/tax-return/completing-a-tax-return/personal-income/line-12000-taxable-amount-dividends-eligible-other-than-eligible-taxable-canadian-corporations.html" },
    related: { label: "Гайд для підприємців", href: "/dlya-pidpryyemtsiv" },
  },
  {
    id: "integration",
    term: "Tax Integration (corporate–personal)",
    definition:
      "Принцип canadian tax системи: дохід, зароблений через корпорацію і виплачений власнику як dividend, має оподатковуватись приблизно так само, як якби зароблений особисто. На практиці integration недосконала — звідси salary-vs-dividend planning. Пояснює, чому non-eligible dividends несуть вищий personal tax.",
    source: { label: "canada.ca — corporations", url: "https://www.canada.ca/en/revenue-agency/services/tax/businesses/topics/corporations.html" },
    related: { label: "Гайд для підприємців", href: "/dlya-pidpryyemtsiv" },
  },
  {
    id: "gic",
    term: "GIC — Guaranteed Investment Certificate",
    definition:
      "Депозитний продукт з гарантованим поверненням principal + фіксований interest за term (від 30 днів до 5 років). Insured CDIC до $100,000 на institution. Interest оподатковується щороку як звичайний income (не capital gain) — тому ефективніший у TFSA/RRSP. Буває cashable та non-redeemable.",
    source: { label: "FCAC — GICs", url: "https://www.canada.ca/en/financial-consumer-agency/services/savings-investments/guaranteed-investment-certificate.html" },
  },
  {
    id: "foreign-withholding",
    term: "Foreign Withholding Tax",
    definition:
      "Податок, який інша країна утримує з dividends перед виплатою тобі. США утримують 15% з dividends на акції/ETF — але у RRSP/RRIF US-listed ETF звільнені від нього за Canada-US tax treaty. У TFSA та non-registered withholding застосовується. Релевантно при виборі, де тримати US-equity ETF.",
    source: { label: "canada.ca — foreign tax credit", url: "https://www.canada.ca/en/revenue-agency/services/tax/individuals/topics/about-your-tax-return/tax-return/completing-a-tax-return/deductions-credits-expenses/line-40500-federal-foreign-tax-credit.html" },
  },
  {
    id: "cmhc",
    term: "CMHC Mortgage Default Insurance",
    definition:
      "Обов'язкове insurance, коли down payment < 20% вартості житла (high-ratio mortgage). Захищає кредитора, не тебе; премія 2.8-4.0% від суми кредиту додається до mortgage. Дозволяє купити з down payment від 5%. Provided CMHC, Sagen, Canada Guaranty; недоступне для житла понад $1.5M.",
    source: { label: "cmhc-schl.gc.ca", url: "https://www.cmhc-schl.gc.ca/consumers/home-buying/mortgage-loan-insurance-for-consumers" },
    related: { label: "Іпотечний калькулятор", href: "/calculators/mortgage" },
  },
  {
    id: "amortization",
    term: "Amortization vs Term (mortgage)",
    definition:
      "Amortization — повний період погашення mortgage (typically 25-30 років). Term — період дії поточного контракту і ставки (typically 1-5 років), після якого renew за новою ставкою. Insured mortgage у Канаді обмежений 25-річною amortization (нові винятки для first-time buyers — 30). Довша amortization = нижчий платіж, але більше interest загалом.",
    source: { label: "FCAC — mortgages", url: "https://www.canada.ca/en/financial-consumer-agency/services/mortgages.html" },
    related: { label: "Іпотечний калькулятор", href: "/calculators/mortgage" },
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
    // ─── Batch 14: +20 terms (RU translations) ───────────────────────────
    "etf": "Корзина securities (stocks, bonds) торгуемая на бирже как одна акция. Канадские ETF имеют MER 0.05-0.30% (vs 1.5-2.5% mutual fund).",
    "mer": "Ежегодная комиссия управителя фонда. Канадские банковские mutual funds 1.5-2.5%; self-directed ETF 0.05-0.30%. За 30 лет 2% MER съедает 40-50% потенциального капитала.",
    "trex": "Метрика Larry Bates (автор «Beat the Bank»): доля compound return остающаяся у тебя после MER. T-REX < 70% → переходи на self-directed ETF.",
    "cra": "Federal налоговый орган Канады. Администрирует income tax, GST/HST, RRSP/TFSA/FHSA contribution rooms. Проверь свои лимиты в CRA My Account.",
    "ccb": "Tax-free monthly payment для семей с детьми до 18. Сумма зависит от family income (до $7,787/год на ребёнка 0-5 в 2026).",
    "oas": "Federal pension для residents 65+. Максимум $727/мес (2026). Newcomers требуют 10+ лет residency для любого OAS.",
    "cpp": "Contributory pension. Employee + employer каждый платит 5.95% earned income до YMPE $73,200 (2026). Self-employed платят обе стороны (11.9%).",
    "rrif": "Конверсия RRSP в retirement income vehicle. Должна быть сделана до конца года когда тебе 71. Минимальные ежегодные withdrawals по age-based formula.",
    "lif": "Locked-in RRIF — конвертированный из locked-in pension funds (LIRA). Имеет минимум И максимум withdrawals ежегодно.",
    "t1135": "CRA reporting requirement если combined foreign assets > $100K CAD. Penalty за late filing: $25/день, max $2,500/год.",
    "noa-detail": "Ключевые строки NoA: RRSP Deduction Limit, Unused TFSA Contribution Room, HBP Repayments, Carry-forward Losses, Pension Adjustment.",
    "lcis": "Locked-in Retirement Account. Создаётся при transfer из employer DB/DC pension plan. Нельзя withdraw до age 55 (provincial vary).",
    "rdsp": "Tax-deferred account для людей с disability tax credit (DTC). Government grants: CDSG до $3,500/год, CDSB до $1,000/год.",
    "dtc": "Non-refundable federal tax credit для людей с severe + prolonged impairment. Approval через Form T2201. Backdate до 10 лет past tax refunds.",
    "tax-loss-harvest": "Стратегия: продать investment с paper loss в non-registered, потом купить equivalent (не identical — superficial loss rules) за 30+ дней.",
    "superficial-loss": "CRA anti-abuse rule: если продаёшь security at a loss и re-buy «identical property» в 30 дней — capital loss disallowed.",
    "gst-hst": "Federal value-added tax. Self-employed должны register когда revenue > $30K в любом 4-quarter rolling window.",
    "ymp-yampe": "YMPE ($73,200 в 2026) — основной CPP cap. YAMPE ($83,200) — second-tier для CPP2 (enhanced CPP с 2024).",
    "spousal-rrsp": "RRSP где ты contributeешь, но spouse — annuitant. Goal: equalize retirement income. 3-year attribution rule.",
    "rrsp-overcontribution": "CRA позволяет buffer $2,000 (lifetime) сверх RRSP room без penalty. Сверх — 1% per month penalty на excess.",
    // ─── Batch 21: +15 terms (RU translations) ───────────────────────────
    "sin": "9-значный номер, обязательный чтобы legally работать в Канаде и открыть любой registered счёт (TFSA, RRSP, FHSA). Newcomers подают заявление через Service Canada в первые дни — бесплатно, часто выдают в тот же день. Временные residents (включая CUAET) получают SIN начинающийся на 9.",
    "credit-score": "Числовой показатель кредитоспособности 300-900, который ведут два бюро — Equifax и TransUnion. Newcomers начинают с нуля: первая secured credit card + своевременные платежи строят историю за 6-12 месяцев. Влияет на approval и ставку по mortgage, аренде, авто-кредиту.",
    "tax-residency": "Канада облагает налогом по residency, не гражданству. Tax resident платит налог на worldwide income с даты «establishing residential ties» (жильё, семья, банк-счёт) — для newcomers обычно дата прибытия. В первый год ты part-year resident: облагается только доход после даты въезда.",
    "tax-slips": "Стандартизированные формы, которые payers присылают тебе и CRA о твоём доходе. T4 — employment income; T5 — investment income (dividends, interest); T3 — trust/ETF distributions; T4A — pension, стипендии, self-employed commissions. Все появляются в CRA My Account к концу марта и auto-fill в tax software.",
    "acb": "Налоговая себестоимость investment: цена покупки + commissions + reinvested distributions, делённая на количество units. Capital gain = proceeds − ACB. Для одного security, купленного в разное время, ACB усредняется. Точный ACB критичен в non-registered; в TFSA/RRSP не релевантен.",
    "capital-gains-inclusion": "Доля capital gain, добавляемая к taxable income. В Канаде 50% — продаёшь investment с прибылью $10,000, облагается $5,000 по твоей marginal rate. Gains в TFSA/RRSP/FHSA не облагаются вообще. Principal residence — exempt через PRE.",
    "marginal-rate": "Ставка налога на твой следующий заработанный доллар (combined federal + provincial). Канада имеет progressive brackets: первые ~$57K федерально 15%, верхние до 33% + provincial. Average rate всегда ниже marginal. Знать свой marginal rate нужно чтобы оценить стоимость RRSP deduction или bonus.",
    "pre": "Освобождение от capital gains tax при продаже жилья, бывшего твоей principal residence. За каждый год designation gain не облагается; одно жильё на семью в год. Продажу нужно report в Schedule 3 даже если полностью exempt — иначе penalty.",
    "cda": "Нотационный счёт CCPC, отслеживающий tax-free часть capital gains (50%, не included), life-insurance proceeds и др. Владелец может выплатить capital dividend из CDA полностью без налога. Ключевой tool для tax-efficient извлечения прибыли; требует election (T2054) перед выплатой.",
    "eligible-dividend": "Две категории canadian dividends с разным gross-up и dividend tax credit. Eligible (из public company или CCPC income по general rate) — ниже personal tax. Non-eligible (из SBD income под 9%) — выше personal tax, потому что integration выравнивает. Влияет на salary-vs-dividend решение владельца.",
    "integration": "Принцип canadian tax системы: доход, заработанный через корпорацию и выплаченный владельцу как dividend, должен облагаться примерно так же, как если бы заработан лично. На практике integration несовершенна — отсюда salary-vs-dividend planning. Объясняет, почему non-eligible dividends несут выше personal tax.",
    "gic": "Депозитный продукт с гарантированным возвратом principal + фиксированный interest за term (от 30 дней до 5 лет). Insured CDIC до $100,000 на institution. Interest облагается ежегодно как обычный income (не capital gain) — поэтому эффективнее в TFSA/RRSP. Бывает cashable и non-redeemable.",
    "foreign-withholding": "Налог, который другая страна удерживает с dividends перед выплатой тебе. США удерживают 15% с dividends на акции/ETF — но в RRSP/RRIF US-listed ETF освобождены от него по Canada-US tax treaty. В TFSA и non-registered withholding применяется. Релевантно при выборе, где держать US-equity ETF.",
    "cmhc": "Обязательное insurance, когда down payment < 20% стоимости жилья (high-ratio mortgage). Защищает кредитора, не тебя; премия 2.8-4.0% от суммы кредита добавляется к mortgage. Позволяет купить с down payment от 5%. Provided CMHC, Sagen, Canada Guaranty; недоступно для жилья свыше $1.5M.",
    "amortization": "Amortization — полный период погашения mortgage (typically 25-30 лет). Term — период действия текущего контракта и ставки (typically 1-5 лет), после которого renew по новой ставке. Insured mortgage в Канаде ограничен 25-летней amortization (новые исключения для first-time buyers — 30). Дольше amortization = ниже платёж, но больше interest.",
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
    // ─── Batch 14: +20 terms (EN definitions) ────────────────────────────
    "etf": "Exchange-Traded Fund — a basket of securities (stocks, bonds) that trades on an exchange like a single share. Canadian ETFs run 0.05-0.30% MER vs 1.5-2.5% for mutual funds. Available through any self-directed broker. Broad-market: XEQT, VEQT, VFV, XAW.",
    "mer": "Management Expense Ratio — annual fee charged by the fund manager, auto-deducted from unit values. Canadian bank mutual funds typically run 1.5-2.5%; self-directed ETFs run 0.05-0.30%. Over 30 years, 2% MER eats 40-50% of potential final capital (T-REX score).",
    "trex": "T-REX Score (Total Return Efficiency Index) — Larry Bates' metric from 'Beat the Bank': share of compound return you keep after MER. 100% = perfect (no MER). 60% = $40 of every $100 of potential gain went to the fund. T-REX below 70% = switch to self-directed ETF.",
    "cra": "Canada Revenue Agency — federal tax authority. Administers income tax, GST/HST, RRSP/TFSA/FHSA contribution rooms, CCB, CESG. Check your limits + NoA via CRA My Account (my.cra-arc.gc.ca).",
    "ccb": "Canada Child Benefit — tax-free monthly payment for families with children under 18. Amount depends on family income (up to $7,787/yr per child 0-5, $6,570 per child 6-17 in 2026). Auto-calculated from tax return.",
    "oas": "Old Age Security — federal pension benefit for residents 65+. Max $727/mo (2026) depends on years of Canadian residency (full 40 yrs = full amount). If income > $90K — OAS clawback. Newcomers need 10+ years of residency for any OAS.",
    "cpp": "Canada Pension Plan — contributory pension. Employee + employer each pay 5.95% of earned income up to YMPE $73,200 (2026). Self-employed pay both sides (11.9%). Max benefit at age-65 retirement: ~$1,433/mo (requires 40+ years of max contributions).",
    "rrif": "Registered Retirement Income Fund — conversion of RRSP to a retirement income vehicle. Must be done by end of the year you turn 71. Minimum annual withdrawals follow an age-based formula (4% at 65 rising to 18% at 95). All withdrawn taxed as income.",
    "lif": "Life Income Fund — locked-in RRIF converted from locked-in pension funds (LIRA). Has minimum AND maximum annual withdrawals (formula-prescribed). Provincial rules vary — AB/BC allow one-time unlock of 50% LIRA into RRSP.",
    "t1135": "Foreign Income Verification Statement — CRA reporting requirement if your combined foreign assets exceed $100K CAD in any tax year. Covers: foreign bank accounts, foreign rental property, foreign stocks/ETFs held in non-Canadian brokers, foreign trusts. Late-filing penalty: $25/day, $2,500/yr max.",
    "noa-detail": "Key NoA fields to review: RRSP Deduction Limit (next year), Unused TFSA Contribution Room, HBP Repayments Outstanding, Carry-forward Losses (capital), Carry-forward Tuition Credits, Pension Adjustment (if RPP exists). Review on CRA My Account every April.",
    "lcis": "Locked-in Retirement Account (LIRA) — created when transferring from an employer DB/DC pension plan. Cannot withdraw before age 55 (provincial vary). At retirement converts to LIF / annuity. Some provinces allow 50% one-time unlock.",
    "rdsp": "Registered Disability Savings Plan — tax-deferred account for people with Disability Tax Credit (DTC). Government grants: CDSG up to $3,500/yr, CDSB up to $1,000/yr for low-income families. Lifetime contribution limit $200K. Withdrawals don't affect AISH or other disability benefits.",
    "dtc": "Disability Tax Credit — non-refundable federal tax credit for people with severe + prolonged impairment. Approval via Form T2201 (medical practitioner). Unlocks RDSP, CDSG/CDSB. Backdate up to 10 years of past tax refunds possible at approval.",
    "tax-loss-harvest": "Strategy: sell an investment at a paper loss in a non-registered account to realize the capital loss, then buy an equivalent (not identical — superficial loss rules) at least 30+ days later. Capital loss offsets current/past/future capital gains. Not applicable inside TFSA/RRSP.",
    "superficial-loss": "CRA anti-abuse rule: if you sell a security at a loss and re-buy 'identical property' within 30 days (before or after), the capital loss is disallowed. Identical = same ETF/stock. Workaround: buy a very similar but not identical product (e.g. VFV → ZSP — both S&P 500 but different issuers).",
    "gst-hst": "Goods and Services Tax / Harmonized Sales Tax registration — federal value-added tax. Self-employed / business owners must register when revenue exceeds $30K in any 4-quarter rolling window. Once registered: charge GST/HST on invoices, claim input tax credits, file returns quarterly/annually.",
    "ymp-yampe": "YMPE (Year's Maximum Pensionable Earnings, $73,200 in 2026) — primary CPP cap. YAMPE ($83,200 in 2026) — second-tier cap for CPP2 (enhanced CPP rolled out 2024). Earnings between YMPE and YAMPE attract an additional 4% CPP2 contribution.",
    "spousal-rrsp": "Spousal RRSP — RRSP where you (higher-income spouse) contribute but your spouse is the annuitant (owner). Goal: equalize retirement income to minimize total household tax in retirement. 3-year attribution rule: if spouse withdraws within 3 years of your contribution, withdrawal is taxed back to you.",
    "rrsp-overcontribution": "CRA allows a $2,000 lifetime buffer above your RRSP room without penalty. Above $2,000 — 1% per-month penalty on the excess. Tax credit on the over-contribution isn't available in the current year but can be claimed in a future year if room opens up.",
    // ─── Batch 21: +15 terms (EN definitions) ────────────────────────────
    "sin": "Social Insurance Number — a 9-digit number required to work legally in Canada and to open any registered account (TFSA, RRSP, FHSA). Newcomers apply through Service Canada in their first days — free, often same-day. Temporary residents (including CUAET) get a SIN starting with 9.",
    "credit-score": "A 300-900 numeric measure of creditworthiness tracked by two bureaus — Equifax and TransUnion. Newcomers start from zero: a first secured credit card + on-time payments build history over 6-12 months. Affects approval and rate on mortgages, rentals, and auto loans.",
    "tax-residency": "Canada taxes by residency, not citizenship. A tax resident pays tax on worldwide income from the date of establishing residential ties (home, family, bank account) — usually the arrival date for newcomers. In your first year you're a part-year resident: only income after entry is taxed.",
    "tax-slips": "Standardized forms that payers send to you and the CRA reporting your income. T4 — employment income; T5 — investment income (dividends, interest); T3 — trust/ETF distributions; T4A — pension, scholarships, self-employed commissions. All appear in CRA My Account by late March and auto-fill into tax software.",
    "acb": "Adjusted Cost Base — the tax cost of an investment: purchase price + commissions + reinvested distributions, divided by units held. Capital gain = proceeds − ACB. For the same security bought at different times, ACB is averaged. Precise ACB matters in non-registered accounts; irrelevant inside TFSA/RRSP.",
    "capital-gains-inclusion": "The share of a capital gain added to taxable income. In Canada it's 50% — sell an investment at a $10,000 gain and $5,000 is taxed at your marginal rate. Gains inside TFSA/RRSP/FHSA aren't taxed at all. A principal residence is exempt via the PRE.",
    "marginal-rate": "The tax rate on your next earned dollar (combined federal + provincial). Canada uses progressive brackets: the first ~$57K is 15% federally, top brackets reach 33% + provincial. Your average rate is always lower than your marginal rate. Knowing it is key to valuing an RRSP deduction or a bonus.",
    "pre": "Principal Residence Exemption — shelters the capital gain on selling a home that was your principal residence. For each designated year the gain is exempt; one property per family per year. The sale must be reported on Schedule 3 even if fully exempt — otherwise a penalty applies.",
    "cda": "Capital Dividend Account — a notional CCPC account tracking the tax-free half of capital gains (the 50% not included), life-insurance proceeds, and more. The owner can pay a capital dividend out of the CDA entirely tax-free. A key tool for tax-efficient profit extraction; requires a T2054 election before payment.",
    "eligible-dividend": "Two categories of Canadian dividends with different gross-up and dividend tax credit. Eligible (from public-company or general-rate CCPC income) — lower personal tax. Non-eligible (from SBD income taxed at 9%) — higher personal tax, because integration evens out the total. Drives an owner's salary-vs-dividend decision.",
    "integration": "A core principle of Canada's tax system: income earned through a corporation and paid to the owner as a dividend should be taxed roughly the same as if earned personally. In practice integration is imperfect — hence salary-vs-dividend planning. Explains why non-eligible dividends carry higher personal tax.",
    "gic": "Guaranteed Investment Certificate — a deposit product with guaranteed return of principal + fixed interest over a term (30 days to 5 years). CDIC-insured up to $100,000 per institution. Interest is taxed yearly as ordinary income (not capital gain) — so it's more efficient inside a TFSA/RRSP. Comes in cashable and non-redeemable variants.",
    "foreign-withholding": "Tax another country withholds from dividends before paying you. The US withholds 15% on dividends from US stocks/ETFs — but US-listed ETFs held in an RRSP/RRIF are exempt under the Canada-US tax treaty. In a TFSA or non-registered account the withholding applies. Relevant to where you hold US-equity ETFs.",
    "cmhc": "Mortgage default insurance required when your down payment is under 20% of the home price (a high-ratio mortgage). It protects the lender, not you; the 2.8-4.0% premium is added to the mortgage. Lets you buy with as little as 5% down. Provided by CMHC, Sagen, Canada Guaranty; unavailable on homes over $1.5M.",
    "amortization": "Amortization is the full payoff period of a mortgage (typically 25-30 years). The term is how long your current contract and rate last (typically 1-5 years), after which you renew at a new rate. Insured mortgages in Canada cap amortization at 25 years (new exceptions for first-time buyers — 30). Longer amortization = lower payment but more total interest.",
  };
  return { ...t, definition: dmap[t.id] || t.definition };
});

export const GLOSSARY_COPY = {
  uk: {
    titleMeta: "Словник канадських фінансів — 65+ термінів",
    descriptionMeta: "65+ ключових термінів канадських особистих фінансів: TFSA, RRSP, FHSA, RESP, CCPC, MPC, MIC, REIT, NI 45-106, Eligible Investor, EMD. Source-attributed definitions.",
    crumbHome: "Головна",
    crumbThis: "Словник",
    eyebrow: "Glossary · Canadian finance",
    title: "Словник канадських фінансів",
    subtitle: "Ключові терміни TFSA, RRSP, FHSA, CCPC, MPC, exempt market та інших аспектів canadian personal finance — з посиланнями на офіційні джерела CRA, CSA, OSFI.",
    intro: "Словник для українців у Канаді: коли читаєш контент про TFSA contribution room, MPC incorporation чи exempt market eligibility — повертайся сюди за точними визначеннями. Кожен термін має посилання на офіційне джерело (canada.ca, securities-administrators.ca, etc.).",
    sourceLabel: "Джерело",
    relatedLabel: "Більше",
    termEyebrow: "Термін словника",
    backToGlossary: "Усі терміни словника",
    relatedTermsTitle: "Пов'язані терміни",
    ctaTitle: "Потрібен персональний розбір?",
    ctaText: "Discovery call 30 хвилин, без оплати — пояснимо, як цей термін стосується саме твоєї ситуації.",
    ctaButton: "Безкоштовний дзвінок",
    terms: TERMS_UK,
  },
  ru: {
    titleMeta: "Словарь канадских финансов — 65+ терминов",
    descriptionMeta: "65+ ключевых терминов канадских личных финансов: TFSA, RRSP, FHSA, RESP, CCPC, MPC, MIC, REIT, NI 45-106, Eligible Investor, EMD. Source-attributed definitions.",
    crumbHome: "Главная",
    crumbThis: "Словарь",
    eyebrow: "Glossary · Canadian finance",
    title: "Словарь канадских финансов",
    subtitle: "Ключевые термины TFSA, RRSP, FHSA, CCPC, MPC, exempt market и других аспектов canadian personal finance — со ссылками на официальные источники.",
    intro: "Словарь для русскоговорящих в Канаде: когда читаешь контент про TFSA contribution room, MPC incorporation или exempt market eligibility — возвращайся сюда за точными определениями. Каждый термин имеет ссылку на официальный источник.",
    sourceLabel: "Источник",
    relatedLabel: "Подробнее",
    termEyebrow: "Термин словаря",
    backToGlossary: "Все термины словаря",
    relatedTermsTitle: "Связанные термины",
    ctaTitle: "Нужен персональный разбор?",
    ctaText: "Discovery call 30 минут, без оплаты — объясним, как этот термин относится именно к твоей ситуации.",
    ctaButton: "Бесплатный звонок",
    terms: TERMS_RU,
  },
  en: {
    titleMeta: "Canadian finance glossary — 65+ terms",
    descriptionMeta: "65+ key Canadian personal-finance terms: TFSA, RRSP, FHSA, RESP, CCPC, MPC, MIC, REIT, NI 45-106, Eligible Investor, EMD. Source-attributed definitions.",
    crumbHome: "Home",
    crumbThis: "Glossary",
    eyebrow: "Glossary · Canadian finance",
    title: "Canadian finance glossary",
    subtitle: "Key terms — TFSA, RRSP, FHSA, CCPC, MPC, exempt market, and other Canadian personal-finance concepts — linked to official CRA, CSA, and OSFI sources.",
    intro: "Reference glossary for newcomers in Canada: whenever you read about TFSA contribution room, MPC incorporation, or exempt market eligibility — come back here for precise definitions. Every term links to an official source (canada.ca, securities-administrators.ca, etc.).",
    sourceLabel: "Source",
    relatedLabel: "Read more",
    termEyebrow: "Glossary term",
    backToGlossary: "All glossary terms",
    relatedTermsTitle: "Related terms",
    ctaTitle: "Want this explained for your situation?",
    ctaText: "30-minute discovery call, no fee — we'll show how this term applies to your specific case.",
    ctaButton: "Free discovery call",
    terms: TERMS_EN,
  },
};

// ─── Lookup helpers (used by the hub page + per-term entity pages) ──────────

export function getTermIds() {
  return GLOSSARY_COPY.uk.terms.map((t) => t.id);
}

export function getGlossaryTerms(locale) {
  return (GLOSSARY_COPY[locale] || GLOSSARY_COPY.uk).terms;
}

export function getGlossaryTerm(locale, id) {
  return getGlossaryTerms(locale).find((t) => t.id === id) || null;
}

// Deterministic neighbours (array order, wrapping) — gives every entity page a
// handful of internal links without needing category metadata. Pure: safe for
// static generation.
export function getRelatedGlossaryTerms(locale, id, n = 6) {
  const terms = getGlossaryTerms(locale);
  const idx = terms.findIndex((t) => t.id === id);
  if (idx === -1) return [];
  const out = [];
  for (let i = 1; i <= n && i < terms.length; i++) {
    out.push(terms[(idx + i) % terms.length]);
  }
  return out;
}
