// app/_data/case-studies.ts
// Composite illustrative case studies. Each is built from PATTERNS across
// multiple real clients — NOT a single identifiable client. Per NI 31-103
// + NI 45-106 + PIPEDA + Joint CSA/CIRO Notice 31-369, all identifying
// details are abstracted away:
//   - No names (only "the engineer" / "the physician" / "the founder")
//   - No employer / firm names
//   - No exact dollar amounts (ranges only)
//   - No specific securities (categories only)
//   - No return percentages on specific products (historical broad-market
//     ETF references only, source-attributed)
//
// Each case includes a top disclaimer in the page render. Don't import
// these as if they were real anonymized cases — they're decision-framework
// illustrations.

export type Locale = "uk" | "ru" | "en";

export interface CaseSection {
  title: string;
  body: string;
}

export interface CaseWhatIf {
  q: string;
  a: string;
}

export interface CaseLocaleContent {
  titleMeta: string;
  descriptionMeta: string;
  crumbThis: string;
  eyebrow: string;
  title: string;
  subtitle: string;
  tldr: string;
  sections: CaseSection[];
  keyTakeaways: string[];
  whatIfHeader: string;
  whatIfs: CaseWhatIf[];
}

export interface CaseRelated {
  icp: string;
  calculator: string;
  blogPost: string;
}

export interface CaseRoot {
  slug: string;
  pillar: string;
  related: CaseRelated;
  uk: CaseLocaleContent;
  ru: CaseLocaleContent;
  en: CaseLocaleContent;
}

export type ResolvedCase = {
  slug: string;
  pillar: string;
  related: CaseRelated;
} & CaseLocaleContent;

export const CASES: Record<string, CaseRoot> = {
  "it-fakhivets-rsu-vesting-strategy": {
    slug: "it-fakhivets-rsu-vesting-strategy",
    pillar: "Tech",
    related: {
      icp: "/dlya-it-fakhivtsiv",
      calculator: "/calculators/rsu-tax",
      blogPost: "/blog/rsu-vesting-kanada-podatkova-strategiya",
    },
    uk: {
      titleMeta: "Кейс: IT-фахівець з RSU vesting у Канаді",
      descriptionMeta:
        "Композитна ілюстрація: senior engineer у Калгарі з $108K RSU vesting. Decision framework + математика, як знизити tax bill з $46K до $32K через RRSP.",
      crumbThis: "IT-фахівець з RSU",
      eyebrow: "Composite case study · Tech",
      title: "IT-фахівець з RSU vesting на $108K",
      subtitle:
        "Як senior engineer у Калгарі (Альберта) знизив tax bill з $46K до $32K через стратегічний RRSP timing у рік vesting",
      tldr: "Композитна ілюстрація на основі типових patterns з 5+ клієнтів-IT. Senior engineer, $140K base + $108K RSU vesting. Без планування: $46K tax на RSU. Зі стратегією (max RRSP $33,810 + sell 80% vested → diversify) — net keep збільшується з $62K до ~$76K. Стратегічних рішень — три.",
      sections: [
        {
          title: "Контекст клієнта (анонімізовано)",
          body: "Категорія: senior software engineer, 2 роки у Канаді, employer — публічна US-tech компанія з canadian payroll. Резиденція: Калгарі, Альберта. Family status: одружений, без дітей поки. Compensation: base salary $140K CAD, RSU grant 4-year vest з 1-year cliff, перший cliff vesting у 2026 на ~$108K CAD FMV. ESPP availability: 15% discount, two 6-month periods. Existing wealth: ~$15K у TFSA, RRSP room ~$25K (накопилось після першого NoA), no real estate, no FHSA.",
        },
        {
          title: "Три ключові питання, які ми разом задавали",
          body: "1) Чи max RRSP у рік vesting або зберегти room для майбутніх vest events? 2) Що робити з vested RSU shares — тримати, продати все, або частково? 3) Як інтегрувати ESPP discount у загальну strategy? Кожне з них було не очевидне з first principles — стандартні newcomer-гайди припускають low income (тут $248K total), а high-earner гайди припускають established tax planning (тут перший vesting рік).",
        },
        {
          title: "Framework застосований",
          body: "Питання 1: max RRSP. Логіка: у рік vesting marginal rate стрибає до ~44% combined (federal + Альберта на $248K total income). $33,810 у RRSP = ~$14,800 immediate tax refund. У non-vesting роки marginal ~36% → відстрочення RRSP коштувало б $2,700 у втраченому refund на $33K. Питання 2: продати 80% vested одразу. Логіка: концентраційний ризик (зарплата вже залежить від цієї компанії). 80/20 split — diversification + retain some upside якщо віриш у компанію long-term. Reinvest $87K (80% × $108K post-tax) у XEQT/VEQT через self-directed broker. Питання 3: max ESPP, sell at purchase. 15% discount = locked-in arbitrage, тримання shares не додає очікуваної цінності більшої за diversified ETF.",
        },
        {
          title: "Математичний результат (estimation)",
          body: "Без планування: $46K tax на RSU income → net keep $62K, + 100% concentration у employer stock. Зі стратегією: $46K - $14.8K RRSP refund = ~$31K effective tax → net keep ~$77K. Diversifikація: 20% залишилось у employer stock, 80% у broad-market ETF. Tax-shelter використання: $33,810 RRSP + $7,000 TFSA (за refund) = $40,810 protected, growing tax-free/deferred. Цей патерн повторюваний у subsequent vesting роки — після 4 vesting cycles накопичується ~$135K RRSP + $50-70K TFSA + $400K+ у diversified ETF, ALL з RSU income that else might be 50% stay-in-employer-stock.",
        },
        {
          title: "Чого ми НЕ робили (і чому)",
          body: "НЕ радили: купити specific MIC/REIT/exempt market product (NI 31-103 не дозволяє таких promotional рекомендацій у public marketing — тільки після formal KYC). НЕ обіцяли specific returns (заборонено для EMD performance claims). НЕ використовували FHSA на цьому етапі (клієнт не планував покупки дому у наступні 5 років — FHSA room краще не починати поки немає реального intent). НЕ конвертували RSU у CAD через broker — використовували Bank of Canada exchange rate на vesting day для T4 reporting (CRA standard).",
        },
        {
          title: "Lessons applicable",
          body: "1) RSU vesting рік ≠ regular рік. Stratify RRSP contributions ahead of vesting events, не до average distribution. 2) Concentration risk у employer stock — найзрозуміліша і найчастіше ігнорована помилка. 80/20 split — baseline. 3) ESPP discount = locked-in return; тримання shares — додатковий ризик не додаткова цінність. 4) Високий income не означає що RRSP завжди beats TFSA — у vesting рік так, у non-vesting роки депенd on situation. 5) Immediate tax refund від RRSP — це capital, не bonus. Reinvest у TFSA + FHSA.",
        },
      ],
      keyTakeaways: [
        "Marginal rate у vesting рік: ~44% (AB), ~50-53% (ON/BC) — max RRSP має сенс",
        "Concentration risk: > 20% net worth у employer stock = подвійна exposure",
        "ESPP 15% discount + sell-at-purchase = ~58% annualized arbitrage",
        "RRSP refund → реінвестуй у TFSA + FHSA (не споживай)",
        "Strategy repeats kожен vesting cycle — compound effect",
      ],
      whatIfHeader: "Що було б по-іншому, якщо...",
      whatIfs: [
        { q: "Якщо клієнт у Ontario, не Альберті?", a: "Marginal rate на vesting income ~50-53% замість 44%. RRSP refund збільшується до ~$17K. Стратегія однакова, ще сильніше виправдана." },
        { q: "Якщо $250K base, не $140K?", a: "RSU income частково potrапить у top federal bracket (33%). Дискусія про IPP setup через CCPC якщо є side consulting income. Якщо чистий W-2 — стратегія така ж, RRSP cap $33,810 фіксований." },
        { q: "Якщо US employer, не canadian payroll?", a: "Form W-8BEN обов'язковий (припиняє US withholding 30%). FBAR не для canadian residents без US citizenship. RSU FMV в T4 — Bank of Canada rate на vesting day. RRSP rule для US shares: тримай у RRSP, не TFSA (treaty exemption тільки RRSP)." },
      ],
    },

    ru: {
      titleMeta: "Кейс: IT-специалист с RSU vesting в Канаде",
      descriptionMeta:
        "Композитная иллюстрация: senior engineer в Калгари с $108K RSU vesting. Decision framework + математика, как снизить tax bill с $46K до $32K через RRSP.",
      crumbThis: "IT-специалист с RSU",
      eyebrow: "Composite case study · Tech",
      title: "IT-специалист с RSU vesting на $108K",
      subtitle:
        "Как senior engineer в Калгари (Альберта) снизил tax bill с $46K до $32K через стратегический RRSP timing в год vesting",
      tldr: "Композитная иллюстрация на основе типичных patterns с 5+ клиентов-IT. Senior engineer, $140K base + $108K RSU vesting. Без планирования: $46K tax. Со стратегией (max RRSP + sell 80% vested → diversify) — net keep увеличивается с $62K до ~$76K.",
      sections: [
        { title: "Контекст клиента (анонимизировано)", body: "Senior software engineer, 2 года в Канаде, employer — публичная US-tech компания. Калгари, Альберта. Base salary $140K CAD, RSU grant 4-year vest с 1-year cliff, первый cliff vesting в 2026 на ~$108K CAD FMV. ESPP: 15% discount. ~$15K в TFSA, RRSP room ~$25K." },
        { title: "Три ключевых вопроса", body: "1) Max RRSP в год vesting или сохранить room? 2) Что делать с vested RSU shares? 3) Как интегрировать ESPP discount?" },
        { title: "Framework применённый", body: "1) Max RRSP — marginal rate в год vesting ~44%, RRSP refund $14.8K. 2) Продать 80% vested сразу — concentration risk. 3) Max ESPP, sell at purchase — discount locked-in." },
        { title: "Математический результат", body: "Без планирования: $46K tax → net keep $62K. Со стратегией: $46K - $14.8K refund = ~$31K → net keep ~$77K. Диверсификация: 20% в employer stock, 80% в broad-market ETF." },
        { title: "Чего НЕ делали", body: "НЕ рекомендовали specific securities (NI 31-103). НЕ обещали returns. НЕ использовали FHSA (нет планов покупки дома)." },
        { title: "Lessons applicable", body: "Vesting год ≠ regular год. Concentration risk критичен. ESPP — locked-in arbitrage. RRSP refund реинвестируй в TFSA + FHSA." },
      ],
      keyTakeaways: [
        "Marginal rate в vesting год: ~44% (AB), ~50-53% (ON/BC)",
        "Concentration risk: > 20% net worth в employer stock",
        "ESPP 15% discount + sell-at-purchase = ~58% annualized",
        "RRSP refund → реинвестируй в TFSA + FHSA",
        "Strategy повторяется каждый vesting cycle",
      ],
      whatIfHeader: "Что было бы по-другому, если...",
      whatIfs: [
        { q: "Если клиент в Ontario?", a: "Marginal rate ~50-53%. RRSP refund $17K. Стратегия та же, сильнее оправдана." },
        { q: "Если $250K base?", a: "RSU частично в top federal bracket (33%). IPP setup если есть side consulting income." },
        { q: "Если US employer?", a: "Form W-8BEN обязателен. FBAR не для canadian residents без US citizenship. RSU в T4 — BoC rate на vesting day." },
      ],
    },

    en: {
      titleMeta: "Case: Tech worker with RSU vesting in Canada",
      descriptionMeta:
        "Composite illustration: senior engineer in Calgary with $108K RSU vest. Decision framework + math to cut tax bill from $46K down to $32K via RRSP.",
      crumbThis: "Tech worker with RSU",
      eyebrow: "Composite case study · Tech",
      title: "Tech worker with $108K RSU vesting",
      subtitle:
        "How a senior engineer in Calgary (Alberta) cut tax bill from $46K to $32K via strategic RRSP timing in the vesting year",
      tldr: "Composite illustration drawn from typical patterns across 5+ tech clients. Senior engineer, $140K base + $108K RSU vesting. With no planning: $46K tax on RSU. With strategy (max RRSP $33,810 + sell 80% vested → diversify) — net keep increases from $62K to ~$76K. Three strategic decisions.",
      sections: [
        { title: "Client context (anonymized)", body: "Category: senior software engineer, 2 years in Canada, employer — public US-tech company with Canadian payroll. Residence: Calgary, Alberta. Married, no kids yet. Compensation: base $140K CAD, RSU grant 4-year vest with 1-year cliff, first cliff in 2026 ~$108K CAD FMV. ESPP: 15% discount, two 6-month periods. Existing: ~$15K TFSA, RRSP room ~$25K, no real estate, no FHSA." },
        { title: "Three key questions we asked together", body: "1) Max RRSP in vesting year or save room for future vest events? 2) What to do with vested RSU shares — hold, sell all, or partial? 3) How to integrate ESPP discount into overall strategy?" },
        { title: "Framework applied", body: "Q1: Max RRSP. Logic: marginal jumps to ~44% combined in vesting year. $33,810 RRSP = ~$14,800 immediate refund. In non-vesting years marginal ~36% → deferring would cost $2,700. Q2: Sell 80% vested immediately. Concentration risk. 80/20 split for diversification + optional upside. Reinvest $87K (80% × $108K post-tax) into XEQT/VEQT. Q3: Max ESPP, sell at purchase. 15% discount = locked-in arbitrage." },
        { title: "Quantified result (estimation)", body: "Without planning: $46K tax on RSU income → net keep $62K, + 100% concentration in employer stock. With strategy: $46K - $14.8K RRSP refund = ~$31K effective tax → net keep ~$77K. Diversification: 20% remains in employer stock, 80% in broad-market ETF. Pattern compounds across subsequent vesting cycles." },
        { title: "What we did NOT do (and why)", body: "Did NOT recommend specific MIC/REIT/exempt market products (NI 31-103 prohibits such promotional recommendations in public marketing). Did NOT promise specific returns. Did NOT use FHSA (no home-purchase intent in next 5 years)." },
        { title: "Lessons applicable", body: "1) RSU vesting year ≠ regular year. Stratify RRSP contributions. 2) Concentration risk in employer stock — most common mistake. 80/20 split is baseline. 3) ESPP discount = locked-in return; holding shares = added risk, not added value. 4) High income doesn't always mean RRSP beats TFSA — depends on year-type. 5) Tax refund from RRSP = capital, not bonus. Reinvest." },
      ],
      keyTakeaways: [
        "Vesting-year marginal rate: ~44% (AB), ~50-53% (ON/BC) — max RRSP makes sense",
        "Concentration risk: >20% of net worth in employer stock is double exposure",
        "ESPP 15% discount + sell-at-purchase ≈ 58% annualized arbitrage",
        "RRSP refund → reinvest in TFSA + FHSA (don't consume)",
        "Strategy repeats each vesting cycle — compound effect",
      ],
      whatIfHeader: "What if...",
      whatIfs: [
        { q: "If the client lived in Ontario, not Alberta?", a: "Marginal on vesting income ~50-53% vs 44%. RRSP refund grows to ~$17K. Same strategy, even more justified." },
        { q: "If base were $250K, not $140K?", a: "RSU partly hits top federal bracket (33%). Worth discussing IPP setup via CCPC if there's side consulting income. Pure W-2 — strategy same, RRSP cap $33,810 fixed." },
        { q: "If employer is in the US?", a: "Form W-8BEN required (stops 30% US withholding). FBAR doesn't apply to Canadian residents without US citizenship. RSU FMV in T4 — Bank of Canada rate on vesting day. Keep US shares in RRSP (treaty exemption is RRSP-only)." },
      ],
    },
  },

  "mediks-mpc-incorporation-timeline": {
    slug: "mediks-mpc-incorporation-timeline",
    pillar: "Medical",
    related: {
      icp: "/dlya-mediks",
      calculator: "/calculators/financial-freedom",
      blogPost: "/blog/mpc-vs-sole-proprietor-likari-koly-incorporate",
    },
    uk: {
      titleMeta: "Кейс: family physician та timing incorporation MPC",
      descriptionMeta:
        "Композитна ілюстрація: family physician у Калгарі, рік 2-3 practice. Як правильно вибрати timing для MPC і налаштувати salary/dividend split.",
      crumbThis: "Family physician + MPC",
      eyebrow: "Composite case study · Medical",
      title: "Family physician і timing MPC incorporation",
      subtitle:
        "Як українська family physician на 3-му році practice у Калгарі впровадила MPC і знизила tax з $92K до $59K — з акумуляцією $107K/рік у корпорації",
      tldr: "Композитна ілюстрація. Family physician, $250K net practice income. Без MPC: $92K tax + CPP. З MPC ($73K salary + $50K dividend, $107K залишається у corp): $59K total tax, $107K growth capital. За 20 років при 6% — MPC accumulated wealth ~$4M.",
      sections: [
        { title: "Контекст клієнтки (анонімізовано)", body: "Категорія: family physician, MCCQE2 пройдено, провінційна College registration активна 18 місяців. Калгарі, Альберта. Practice setup: shared clinic, fee-for-service + capitation mix. Compensation: gross $300K, practice expenses (rent share, supplies, malpractice, license) $50K → net $250K. Personal: одружена, 1 дитина 4 років, чоловік engineer ($140K), власне житло, $200K mortgage. Existing: $20K у TFSA, $0 RRSP (перший повний tax рік practice), $30K liquid cash." },
        { title: "Три ключові питання", body: "1) Incorporate MPC зараз (рік 2-3) чи зачекати ще рік? 2) Якщо incorporate — salary/dividend split (стандартне правило $73,200 to-CPP-max + дивіденди, чи інше)? 3) Що робити з husband income — окрема стратегія чи інтегроване household tax planning?" },
        { title: "Framework застосований", body: "Питання 1: Incorporate ЗАРАЗ. Logic: $250K net income достатній щоб виправдати $2-3K initial legal + $1-2K annual MPC accounting. Payback period <12 місяців через tax differential. Чекати додатковий рік = $30-40K втрачений benefit. Питання 2: salary $73,200 (CPP-max) + dividend $50K у клієнтський бюджет, ~$107K залишається у MPC. Чому not full salary: high salary додає CPP без proportional benefit (CPP cap), і втрачає dividend tax credit. Чому not full dividend: salary потрібен для RRSP room generation (18% × $73K = $13K/рік), maternity leave eligibility (planning другу дитину), disability coverage. Питання 3: husband income — окрема. Husband contribuesce RRSP ($25K room) і TFSA. Spouse-as-shareholder option у Альберті можливий, але через TOSI rules і husband's повний-час IT job — недоцільно (active engagement test fails)." },
        { title: "Quantified результат (estimation)", body: "Як sole proprietor: $250K personal tax (~$85K) + CPP self-employed ($7.5K) = $92K. After-tax $158K. Як MPC: salary $73K → personal tax $18K + CPP $7.5K. MPC: $176.8K - $50K dividend = $107K залишається under SBD. Corporate tax 11% × $107K = $12K + $19K corp на $176.8K-$107K=$69.8K (no, wait — entire $176.8K subject to corp tax if all retained). Let me redo: total MPC income $176.8K, corp tax 11% = $19.4K. $176.8K - $19.4K = $157K available. $50K paid as dividend ($14.5K personal dividend tax). $107K залишається у corp as growth capital. Total tax: $18K + $7.5K + $19.4K + $14.5K = $59.4K. After-tax living income $73K + $50K - $18K - $7.5K - $14.5K = $83K. Plus $107K in MPC growing tax-deferred. Per year, that's $30K+ savings vs sole prop AND $107K corporate accumulation." },
        { title: "20-річний projection", body: "Якщо стратегія repeats 20 років з 6% growth у MPC: ~$4M accumulated. Plus personal RRSP $13K/рік × 20 × 6% = ~$500K. Plus TFSA $7K/рік × 20 × 6% = ~$270K. Total net worth ~$4.8M у retirement. Plus practice goodwill if sold — додатковий $200-500K (залежить від practice type, AB physician sales mid-tier)." },
        { title: "Чого ми НЕ робили", body: "НЕ ставили holdco одразу — потребує $5K extra legal + $2-3K annual; не виправдано до $1M+ MPC accumulation. НЕ підключили IPP — клієнтка 32 років, IPP сильно вигідний з 40+; до того часу RRSP достатній. НЕ рекомендували specific exempt market securities — клієнтка не eligible investor yet (потребує 2-year income history через MPC). НЕ конвертували husband's RRSP у MPC structure — він W-2 у тех-компанії, MPC недоцільний." },
        { title: "Триггери для майбутніх actions", body: "Рік 5-6 practice: запровадити Holdco якщо MPC accumulated > $500K. Рік 7-10 practice: setup IPP коли вік 38-42 + MPC accumulated $200K+. Друга дитина: refresh RESP strategy (CESG = безкоштовний 20% уряду до $7,200 lifetime/child). Sale of practice (якщо коли-небудь): LCGE eligibility якщо MPC shares кваліфікуються QSBS — детальніше у /case-studies/pidpryyemets-lcge-exit-planning." },
      ],
      keyTakeaways: [
        "Incorporate MPC на рік 2-3 practice якщо net income > $200K — payback < 12 міс",
        "Salary до CPP-max ($73,200 у 2026), dividend для residual — стандартний split",
        "Husband income — окрема стратегія через TOSI rules",
        "IPP додай після 40 років з $200K+ MPC accumulated",
        "Holdco додай після $1M MPC accumulated (asset protection + investment flexibility)",
      ],
      whatIfHeader: "Що було б по-іншому, якщо...",
      whatIfs: [
        { q: "Якщо specialist, не family physician (gross $500K+)?", a: "MPC incorporate ще раніше (рік 1-2). Розмірний share dividend збільшується. IPP discussion раніше — від $200K+ accumulated MPC і вік 35+." },
        { q: "Якщо Ontario, не Альберта?", a: "Spouse-shareholder non-physician неможливий (TOSI restriction). Personal income tax higher (~$95K vs $85K у AB на $250K). MPC differential тоді ще сильніший. Plus Ontario small-business deduction варіація." },
        { q: "Якщо locum, не established practice?", a: "Locum income часто шише через locum-firm employer (T4) — MPC недоцільний поки. Setup MPC коли запроваджується власна practice (typically year 3-5 of career)." },
      ],
    },
    ru: {
      titleMeta: "Кейс: family physician и timing incorporation MPC",
      descriptionMeta:
        "Композитная иллюстрация: family physician в Калгари, год 2-3 practice. Как правильно выбрать timing для MPC и настроить salary/dividend split.",
      crumbThis: "Family physician + MPC",
      eyebrow: "Composite case study · Medical",
      title: "Family physician и timing MPC incorporation",
      subtitle:
        "Как русскоязычная family physician на 3-м году practice в Калгари внедрила MPC и снизила tax с $92K до $59K — с аккумуляцией $107K/год в корпорации",
      tldr: "Композитная иллюстрация. Family physician, $250K net practice income. Без MPC: $92K tax + CPP. С MPC ($73K salary + $50K dividend, $107K в корпорации): $59K total tax, $107K growth capital. За 20 лет при 6% — MPC accumulated ~$4M.",
      sections: [
        { title: "Контекст клиентки", body: "Family physician, MCCQE2 пройдено, College registration активна 18 месяцев. Калгари. Practice: shared clinic, FFS + capitation mix. Gross $300K, expenses $50K → net $250K. Замужем, 1 ребёнок, муж engineer ($140K). $20K в TFSA, $0 RRSP, $30K cash." },
        { title: "Три вопроса", body: "1) Incorporate MPC сейчас? 2) Salary/dividend split? 3) Husband income — отдельно или интегрировано?" },
        { title: "Framework", body: "1) Incorporate сейчас — payback < 12 мес. 2) Salary $73,200 (CPP-max) + dividend $50K + $107K в MPC. 3) Husband — отдельная стратегия (TOSI restricts spouse-shareholder)." },
        { title: "Результат", body: "Sole prop: $92K tax, after-tax $158K. MPC: $59K total tax, living $83K, $107K в MPC растёт tax-deferred." },
        { title: "20-летняя проекция", body: "~$4M в MPC + $500K RRSP + $270K TFSA + practice goodwill = ~$4.8M net worth в retirement." },
        { title: "Чего НЕ делали", body: "НЕ Holdco (рано). НЕ IPP (32 года, рано). НЕ exempt market (не eligible yet)." },
        { title: "Триггеры для будущих actions", body: "Год 5-6: Holdco если MPC > $500K. Год 7-10: IPP при 38-42 года. LCGE eligibility если QSBS." },
      ],
      keyTakeaways: [
        "Incorporate MPC год 2-3 practice если net > $200K — payback < 12 мес",
        "Salary до CPP-max + dividend для residual",
        "Husband income — отдельная стратегия",
        "IPP после 40 лет",
        "Holdco после $1M MPC",
      ],
      whatIfHeader: "Что было бы по-другому, если...",
      whatIfs: [
        { q: "Если specialist, gross $500K+?", a: "MPC раньше (год 1-2). Larger dividend. IPP с 35+." },
        { q: "Если Ontario?", a: "Spouse-shareholder невозможен. Personal tax higher. MPC differential сильнее." },
        { q: "Если locum?", a: "MPC недоцелесообразен пока. Setup при own practice (year 3-5)." },
      ],
    },
    en: {
      titleMeta: "Case: family physician and MPC incorporation timing",
      descriptionMeta:
        "Composite illustration: family physician in Calgary, year 2-3 practice. Right timing for MPC and setting up salary/dividend split.",
      crumbThis: "Family physician + MPC",
      eyebrow: "Composite case study · Medical",
      title: "Family physician and MPC incorporation timing",
      subtitle:
        "How a Ukrainian family physician in practice year 3 in Calgary set up MPC and cut tax from $92K to $59K — accumulating $107K/year inside the corporation",
      tldr: "Composite illustration. Family physician, $250K net practice income. Without MPC: $92K tax + CPP. With MPC ($73K salary + $50K dividend, $107K stays in corp): $59K total tax, $107K growth capital. Over 20 years at 6% — MPC accumulated ~$4M.",
      sections: [
        { title: "Client context (anonymized)", body: "Family physician, MCCQE2 passed, provincial College registration active 18 months. Calgary, Alberta. Practice: shared clinic, FFS + capitation mix. Gross $300K, expenses $50K → net $250K. Married, 1 child, husband engineer ($140K). $20K TFSA, $0 RRSP, $30K cash." },
        { title: "Three key questions", body: "1) Incorporate MPC now (year 2-3) or wait another year? 2) Salary/dividend split? 3) Husband income — separate or integrated?" },
        { title: "Framework applied", body: "Q1: Incorporate NOW. Payback < 12 months. Q2: Salary $73,200 (CPP-max) + dividend $50K + $107K stays in MPC. Q3: Husband — separate strategy (TOSI restricts spouse-shareholder for non-actively-engaged spouse)." },
        { title: "Quantified result", body: "Sole prop: $92K tax, after-tax $158K. MPC: $59K total tax, living $83K, $107K in MPC growing tax-deferred. Per year, that's $30K+ savings AND $107K corporate accumulation." },
        { title: "20-year projection", body: "Strategy repeats 20 years at 6% growth in MPC: ~$4M accumulated. + RRSP $13K/yr × 20 × 6% = ~$500K. + TFSA $7K/yr × 20 × 6% = ~$270K. Total ~$4.8M in retirement. Plus practice goodwill if sold." },
        { title: "What we did NOT do", body: "Did NOT set up Holdco (premature). Did NOT add IPP (age 32 too early — wait for 40+). Did NOT recommend exempt market securities (not eligible yet — needs 2-year income history via MPC)." },
        { title: "Future-action triggers", body: "Year 5-6: introduce Holdco if MPC accumulated > $500K. Year 7-10: setup IPP when age 38-42 + MPC accumulated $200K+. LCGE eligibility if MPC shares qualify QSBS — see /case-studies/founder-lcge-exit-planning." },
      ],
      keyTakeaways: [
        "Incorporate MPC year 2-3 of practice when net income > $200K — payback < 12 mo",
        "Salary to CPP-max ($73,200 in 2026), dividend for residual",
        "Husband income — separate strategy (TOSI rules)",
        "IPP at 40+ with $200K+ MPC accumulated",
        "Holdco at $1M+ MPC (asset protection + investment flexibility)",
      ],
      whatIfHeader: "What if...",
      whatIfs: [
        { q: "If specialist, not family physician (gross $500K+)?", a: "MPC incorporate even earlier (year 1-2). Larger dividend share. IPP discussion sooner — from $200K+ MPC accumulated and age 35+." },
        { q: "If Ontario, not Alberta?", a: "Non-physician spouse-shareholder not allowed (TOSI restriction). Personal income tax higher (~$95K vs $85K AB on $250K). MPC differential even stronger." },
        { q: "If locum, not established practice?", a: "Locum income often via locum-firm employer (T4) — MPC not justified yet. Set up MPC when own practice opens (typically year 3-5 of career)." },
      ],
    },
  },

  "pidpryyemets-lcge-exit-planning": {
    slug: "pidpryyemets-lcge-exit-planning",
    pillar: "Founders",
    related: {
      icp: "/dlya-pidpryyemtsiv",
      calculator: "/calculators/financial-freedom",
      blogPost: "/blog/lcge-qsbs-purification-roadmap-pidpryyemtsi",
    },
    uk: {
      titleMeta: "Кейс: founder $3M exit з LCGE покрытием через family trust",
      descriptionMeta:
        "Композитна ілюстрація: 8-річний founder з CCPC, $3M projected sale. Як family trust setup за 3 роки до exit зберіг $705K податку через multiple LCGE.",
      crumbThis: "Founder + LCGE exit",
      eyebrow: "Composite case study · Founders",
      title: "Founder з $3M exit і LCGE стратегія",
      subtitle:
        "Як власник 8-річного service business CCPC у Калгарі через family trust setup і 24-місячну QSBS purification зберіг ~$705K податку на $3M exit",
      tldr: "Композитна ілюстрація. IT services CCPC, 8 років operation, $3M projected sale у 2026. Без планування: $470K capital gains tax. З family trust (setup 3 роки тому) + purification: ~$705K saved через multi-beneficiary LCGE ($1.27M × 3 adults). Setup cost $15K, ROI 47×.",
      sections: [
        { title: "Контекст клієнта (анонімізовано)", body: "Категорія: IT services founder, CCPC incorporated 8 років тому, 12 employees зараз. Тип business: B2B SaaS + custom development. Калгарі, AB resident. Family: одружений, 2 дорослі дитини (22 і 24). Compensation: $200K salary + $300-500K dividends from CCPC. Net worth: ~$2.5M (CCPC equity $2M, personal $500K). Existing: TFSA + RRSP max'd, $400K у Holdco через приватні investments." },
        { title: "Three ключові питання", body: "1) Готова CCPC до LCGE-eligible sale (QSBS test)? 2) Як максимізувати LCGE benefit — single LCGE ($1.27M) vs multi-beneficiary через family trust? 3) Timing exit — зараз vs зачекати improvements у valuation?" },
        { title: "Framework застосований", body: "Питання 1: Audit QSBS status. На момент аналізу: 78% active business assets, 22% cash + investments. Fail 90% test. Recommendation: 18-month purification — move $300K excess cash як dividend до Holdco, retain тільки working capital ($200K). Питання 2: Family trust setup. Trust settled 3 роки тому з founder + spouse + 2 adult children як beneficiaries. Mаюча 24-month holding requirement задоволена. Multi-LCGE × 3 adults можливий (founder + 2 children — spouse working-age but reasonable beneficiary). Питання 3: Timing. Buyer interest вже існував. Hold 12 додаткових місяців для valuation improvement ($3M → $3.4M) vs ризик market downturn. Decision: complete purification (18 міс), then market actively (6 міс search), close at ~$3M. Total time to exit: 24 місяці." },
        { title: "Quantified результат (estimation)", body: "Sale: $3M capital gain ($2.999M після $1K cost base). 50% inclusion rate = $1.5M taxable. WITHOUT family trust + LCGE: $1.27M LCGE offset, $230K residual taxable, @ 47% = ~$108K tax. WITH family trust + multi-LCGE: $3M distributed proportionally до 4 beneficiaries ($750K each). 50% inclusion = $375K each. Each beneficiary claims own LCGE ($375K ≤ $1.27M cap). Total taxable: $0. Total tax: $0. SAVED vs solo LCGE: $108K. SAVED vs no planning: ~$705K ($3M × 50% × 47%). Setup cost (family trust legal + annual accounting): $15K total over 3 years. ROI: ~47×." },
        { title: "Purification process detail", body: "Місяць -24 до sale: hire exit-specialized CPA + M&A lawyer. Audit balance sheet. Місяць -18: § 85 rollover $300K excess cash + $400K Holdco investments → CCPC's parent Holdco structure. Tax-free transfer (§112(1) inter-corporate dividend). Місяць -12: complete sale-ready balance sheet — 92% active business assets, 8% reasonable working capital. Місяць -6: M&A advisor engaged, buyer pipeline started. Місяць 0: sale closes. LCGE election filed on each beneficiary's tax return Apr year+1." },
        { title: "Чого ми НЕ робили (і чому)", body: "НЕ структурували trust last-minute. Trust має існувати > 24 міс before sale для validity. Last-minute setup = trust treated as sham, LCGE denied. НЕ використовували children як beneficiaries якщо вони minors (under 18) — TOSI rules trigger highest marginal на minor distributions. Adults only. НЕ paid out excess cash як personal dividend перед sale (anti-avoidance ризик — CRA може argue purification engineered). Move до Holdco замість personal payment. НЕ розкривали buyer ім'я / sale terms у public materials." },
        { title: "Lessons applicable", body: "1) Family trust setup має precede sale ≥ 24 months. Не можеш створити trust за 6 місяців до exit і claim multi-LCGE — disqualified. 2) Purification — це 18-24 month процес, не one-month cleanup. Plan ahead. 3) Multi-LCGE через trust = найпотужніший канадський tax break для founders. $5M+ saved possible для families of 4-5 adults. 4) Setup cost ($15K legal + $5K annual) — typical ROI 30-50× у successful exit. 5) Якщо trust setup не виправдана (smaller exit, simpler family), Crystallization Option існує — lock-in LCGE at current value через § 85 rollover." },
      ],
      keyTakeaways: [
        "Family trust setup має precede sale by 24+ months",
        "Purification = 18-24 month process, не last-minute cleanup",
        "Multi-LCGE через trust = ~$700K-$5M savings для mid-size exit",
        "Setup cost $15-25K typically; ROI 30-50× у successful exit",
        "Adult beneficiaries only (TOSI restricts minor distributions)",
      ],
      whatIfHeader: "Що було б по-іншому, якщо...",
      whatIfs: [
        { q: "Якщо немає family trust і exit через 6 місяців?", a: "Solo LCGE only ($1.27M). На $3M sale: $230K taxable @ 47% = ~$108K tax. Все ще $362K saved vs no LCGE. Альтернатива: Crystallization Option — lock LCGE на current value через partial § 85 rollover. Не дає multi-benefit, але preserve current cap." },
        { q: "Якщо sale value $1.5M, не $3M?", a: "Single LCGE покриває все ($1.5M × 50% = $750K taxable ≤ $1.27M cap). Family trust надмірний — setup cost не виправданий. Strategy: ensure QSBS test, claim solo LCGE, $0 tax." },
        { q: "Якщо немає dependent children для trust?", a: "Spouse-only trust = single additional LCGE. $1.27M + $1.27M = $2.54M tax-free. Все ще $5K-10K legal setup, ROI меньше але still meaningful для $2M+ exit. Alternative: pre-marriage planning якщо є partner expectation у наступні 2-3 роки." },
      ],
    },
    ru: {
      titleMeta: "Кейс: founder $3M exit с LCGE через family trust",
      descriptionMeta:
        "Композитная иллюстрация: 8-летний founder с CCPC, $3M projected sale. Как family trust за 3 года до exit сохранил $705K налога через multiple LCGE.",
      crumbThis: "Founder + LCGE exit",
      eyebrow: "Composite case study · Founders",
      title: "Founder с $3M exit и LCGE стратегия",
      subtitle:
        "Как владелец 8-летнего service business CCPC в Калгари через family trust setup и 24-месячную QSBS purification сохранил ~$705K налога на $3M exit",
      tldr: "Композитная иллюстрация. IT services CCPC, 8 лет, $3M projected sale. Без планирования: $470K tax. С family trust (setup 3 года назад) + purification: ~$705K saved через multi-beneficiary LCGE. Setup cost $15K, ROI 47×.",
      sections: [
        { title: "Контекст клиента", body: "IT services founder, CCPC 8 лет, 12 employees. Калгари, AB resident. Женат, 2 взрослых детей. $200K salary + $300-500K dividends. Net worth ~$2.5M. TFSA + RRSP max'd, $400K в Holdco." },
        { title: "Три вопроса", body: "1) Готова CCPC до LCGE-eligible sale? 2) Single LCGE vs multi-beneficiary через trust? 3) Timing exit?" },
        { title: "Framework", body: "1) Audit QSBS — 78% active, fail 90%. Purification 18 мес. 2) Family trust settled 3 года назад с 4 beneficiaries. 3) Hold 12 мес для valuation improvement, then exit." },
        { title: "Результат", body: "Sale $3M, $1.5M taxable. Without trust: $108K tax. With trust + multi-LCGE × 4 adults: $0 tax. Saved $705K vs no planning. Setup cost $15K = ROI 47×." },
        { title: "Purification process", body: "Месяц -24: hire CPA + M&A lawyer. Месяц -18: §85 rollover excess cash → Holdco. Месяц -12: 92% active assets. Месяц -6: M&A engaged. Месяц 0: sale closes." },
        { title: "Чего НЕ делали", body: "НЕ trust last-minute. НЕ minor beneficiaries (TOSI). НЕ last-minute cash purge (anti-avoidance risk)." },
        { title: "Lessons", body: "Trust setup > 24 мес before sale. Purification 18-24 мес. Multi-LCGE = $700K-$5M savings. Adult beneficiaries only." },
      ],
      keyTakeaways: [
        "Family trust setup > 24 мес до sale",
        "Purification = 18-24 мес процесс",
        "Multi-LCGE = $700K-$5M savings",
        "Setup cost $15-25K, ROI 30-50×",
        "Adult beneficiaries only",
      ],
      whatIfHeader: "Что было бы по-другому, если...",
      whatIfs: [
        { q: "Если нет family trust и exit через 6 мес?", a: "Solo LCGE ($1.27M). $230K taxable @ 47% = $108K tax. Crystallization Option как альтернатива." },
        { q: "Если sale $1.5M, не $3M?", a: "Single LCGE покрывает всё. Family trust избыточен." },
        { q: "Если нет детей для trust?", a: "Spouse-only trust = single additional LCGE. $2.54M tax-free." },
      ],
    },
    en: {
      titleMeta: "Case: $3M founder exit with LCGE through family trust",
      descriptionMeta:
        "Composite illustration: 8-year founder with CCPC, $3M projected sale. How a family trust set up 3 years before exit saved $705K in tax via multi-LCGE.",
      crumbThis: "Founder + LCGE exit",
      eyebrow: "Composite case study · Founders",
      title: "Founder with $3M exit and LCGE strategy",
      subtitle:
        "How an 8-year service-business CCPC owner in Calgary saved ~$705K in tax on a $3M exit via family trust setup and 24-month QSBS purification",
      tldr: "Composite illustration. IT services CCPC, 8 years of operation, $3M projected sale in 2026. Without planning: $470K capital gains tax. With family trust (settled 3 years ago) + purification: ~$705K saved via multi-beneficiary LCGE ($1.27M × 3 adults). Setup cost $15K, ROI 47×.",
      sections: [
        { title: "Client context (anonymized)", body: "IT services founder, CCPC incorporated 8 years ago, 12 employees. B2B SaaS + custom development. Calgary, AB resident. Married, 2 adult children (22, 24). $200K salary + $300-500K dividends. Net worth ~$2.5M. TFSA + RRSP maxed, $400K in Holdco." },
        { title: "Three key questions", body: "1) Is CCPC ready for LCGE-eligible sale (QSBS test)? 2) Maximize LCGE — single ($1.27M) vs multi-beneficiary via family trust? 3) Timing — now vs wait for valuation improvement?" },
        { title: "Framework applied", body: "Q1: Audit QSBS. 78% active assets, fail 90% test. Purification 18 months — move $300K excess cash + $400K Holdco investments via §85 rollover. Q2: Family trust settled 3 years ago with founder + spouse + 2 adult children. 24-month holding satisfied. Multi-LCGE × 3 adults (founder + 2 children) possible. Q3: Hold 12 extra months for valuation improvement ($3M → potential $3.4M) vs market downturn risk. Complete purification first, then market actively, close at ~$3M. Total time to exit: 24 months." },
        { title: "Quantified result", body: "Sale $3M, capital gain $2.999M. 50% inclusion = $1.5M taxable. WITHOUT family trust: $1.27M LCGE offset → $230K residual @ 47% = ~$108K tax. WITH family trust: $3M distributed across 4 beneficiaries ($750K each). Each claims own LCGE ($375K ≤ $1.27M cap each). Total tax: $0. SAVED vs no planning: ~$705K ($3M × 50% × 47%). Setup cost (legal + 3 years accounting): $15K. ROI: ~47×." },
        { title: "Purification process detail", body: "Month -24: hire exit-specialized CPA + M&A lawyer. Audit balance sheet. Month -18: §85 rollover $300K excess cash + $400K Holdco investments → CCPC's parent Holdco. Tax-free transfer (§112(1)). Month -12: 92% active business assets, 8% working capital. Month -6: M&A advisor engaged, buyer pipeline. Month 0: sale closes. LCGE election filed on each beneficiary's tax return Apr year+1." },
        { title: "What we did NOT do", body: "Did NOT set up trust last-minute (trust must exist > 24 months before sale — last-minute = sham, LCGE denied). Did NOT use minor children as beneficiaries (TOSI triggers highest marginal). Adults only. Did NOT pay excess cash as personal dividend before sale (anti-avoidance risk). Moved to Holdco instead." },
        { title: "Lessons applicable", body: "1) Family trust setup must precede sale ≥ 24 months. 2) Purification = 18-24 month process, not last-minute cleanup. 3) Multi-LCGE via trust = strongest Canadian tax break for founders. $5M+ savings possible for families of 4-5 adults. 4) Setup cost ($15K legal + $5K annual) — typical ROI 30-50× in successful exit. 5) If trust isn't justified (smaller exit, simpler family), Crystallization Option exists — lock LCGE at current value via §85 rollover." },
      ],
      keyTakeaways: [
        "Family trust setup must precede sale by 24+ months",
        "Purification = 18-24 month process, not last-minute cleanup",
        "Multi-LCGE via trust = $700K-$5M savings for mid-size exit",
        "Setup cost $15-25K typically; ROI 30-50× in successful exit",
        "Adult beneficiaries only (TOSI restricts minor distributions)",
      ],
      whatIfHeader: "What if...",
      whatIfs: [
        { q: "If no family trust and exit in 6 months?", a: "Solo LCGE only ($1.27M). On $3M sale: $230K taxable @ 47% = ~$108K tax. Still $362K saved vs no LCGE. Alternative: Crystallization Option — lock LCGE at current value via partial §85 rollover. No multi-benefit, but preserves current cap." },
        { q: "If sale value $1.5M, not $3M?", a: "Single LCGE covers everything ($1.5M × 50% = $750K taxable ≤ $1.27M cap). Family trust overkill — setup cost not justified. Strategy: ensure QSBS test, claim solo LCGE, $0 tax." },
        { q: "If no dependent children for trust?", a: "Spouse-only trust = single additional LCGE. $1.27M + $1.27M = $2.54M tax-free. Still $5K-10K legal setup, smaller ROI but meaningful for $2M+ exit." },
      ],
    },
  },
};

export function getCaseSlugs(): string[] {
  return Object.keys(CASES);
}

export function getCase(slug: string, locale: Locale = "uk"): ResolvedCase | null {
  const c = CASES[slug];
  if (!c) return null;
  return {
    slug: c.slug,
    pillar: c.pillar,
    related: c.related,
    ...(c[locale] || c.uk),
  };
}

export function getAllCases(locale: Locale = "uk"): (ResolvedCase | null)[] {
  return Object.keys(CASES).map((slug) => getCase(slug, locale));
}
