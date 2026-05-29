// app/_data/comparisons.ts
// Comparison pages — Audit 7 Section 3 #9. AI engines cite comparison
// tables more than any other format (clean structured A-vs-B data).
// Compliance posture: educational framing, no "X is better" verdicts,
// no return guarantees beyond source-attributed historical ranges, no
// recommendations of specific securities. Each comparison ends with
// "when each makes sense" framework, not a winner.

export type Locale = "uk" | "ru" | "en";

export interface ComparisonRow {
  aspect: string;
  a: string;
  b: string;
}

export interface ComparisonFaq {
  q: string;
  a: string;
}

export interface ComparisonLocaleContent {
  titleMeta: string;
  descriptionMeta: string;
  crumbThis: string;
  eyebrow: string;
  title: string;
  subtitle: string;
  tldr: string;
  optionA: string;
  optionB: string;
  intro: string;
  rows: ComparisonRow[];
  whenATitle: string;
  whenA: string[];
  whenBTitle: string;
  whenB: string[];
  faqs: ComparisonFaq[];
}

export interface ComparisonRoot {
  slug: string;
  related: { icp?: string; calculator?: string; blogPost?: string; pillar?: string };
  uk: ComparisonLocaleContent;
  ru: ComparisonLocaleContent;
  en: ComparisonLocaleContent;
}

export type ResolvedComparison = {
  slug: string;
  related: ComparisonRoot["related"];
} & ComparisonLocaleContent;

export const COMPARISONS: Record<string, ComparisonRoot> = {
  "emd-vs-wealthsimple": {
    slug: "emd-vs-wealthsimple",
    related: { pillar: "/porivnyannia", calculator: "/calculators/mer-impact", blogPost: "/blog/yak-pereviryty-finansovogo-radnyka-v-kanadi" },
    uk: {
      titleMeta: "EMD vs Wealthsimple: exempt market чи robo-advisor",
      descriptionMeta: "Чим відрізняється робота з Exempt Market Dealer (приватні securities) від Wealthsimple (robo-advisor ETF). Доступ, ризик, ліквідність, комісії — порівняльна таблиця.",
      crumbThis: "EMD vs Wealthsimple",
      eyebrow: "Порівняння · 2026",
      title: "EMD vs Wealthsimple",
      subtitle: "Exempt Market Dealer (приватні securities) проти Wealthsimple (robo-advisor на ETF) — що це за два різні світи і кому що підходить",
      tldr: "Wealthsimple — robo-advisor для public-market ETF: відкрив за 10 хв, $0 мінімум, повна ліквідність, MER 0.4-0.5% (managed) або 0.2% (self-directed). EMD (як Axcess Capital, через мене) дає доступ до private securities (MICs, REITs, development LPs) тільки для Eligible/Accredited Investors, з KYC + suitability, lower liquidity, target historical 7-12%. Це НЕ конкуренти — Wealthsimple для liquid core, EMD для diversification поза public market після того як core побудований.",
      optionA: "EMD (Axcess Capital)",
      optionB: "Wealthsimple",
      intro: "Найпоширеніше непорозуміння українців-newcomers: «Wealthsimple vs радник — що обрати?». Це хибна дилема — вони рішають різні задачі. Wealthsimple — це platform для public-market ETF (S&P 500, broad-market). EMD — це канал доступу до private securities, які взагалі не торгуються на біржі. Ось точна різниця.",
      rows: [
        { aspect: "Що продає", a: "Приватні securities: MICs, private REITs, development LPs, private credit (NI 45-106 exempt)", b: "Public-market ETF, окремі акції, crypto — все що на біржі" },
        { aspect: "Хто може інвестувати", a: "Тільки Eligible Investor ($75K solo / $400K assets) або Accredited ($200K / $1M)", b: "Будь-хто, $0 мінімум, без income тесту" },
        { aspect: "Час входу", a: "KYC + Suitability Assessment + offering memorandum review (дні-тижні)", b: "Реєстрація онлайн ~10 хв" },
        { aspect: "Ліквідність", a: "Low: redemption windows (квартал/рік), lock-up periods", b: "High: продаж у будь-який торговий день" },
        { aspect: "Target historical return", a: "7-12% (MICs), 15-22% (development LPs) — target, не гарантія", b: "Ринковий (broad-market ETF ~7-10% historical)" },
        { aspect: "Кореляція з фондовим ринком", a: "Low (real estate, private debt не падають синхронно з TSX/S&P)", b: "High (це і є фондовий ринок)" },
        { aspect: "Комісії", a: "Embedded у offering (management fee + carry); EMD отримує commission", b: "0.4-0.5% MER managed; 0.2% self-directed ETF" },
        { aspect: "Регуляція", a: "CSA NI 31-103 + NI 45-106, EMD-ліцензований DR (NRD)", b: "CIRO-registered (Wealthsimple Investments Inc.)" },
        { aspect: "Освіта + персональний контакт", a: "1-on-1 discovery call, KYC, поточний supervision", b: "Self-serve app + chat support" },
      ],
      whenATitle: "Коли EMD має сенс",
      whenA: [
        "Ти вже Eligible/Accredited Investor (income $75K+ або net assets $400K+)",
        "Liquid public-market core вже побудований (TFSA/RRSP у broad-market ETF)",
        "Хочеш diversification поза фондовим ринком (real estate, private debt)",
        "Готовий до lower liquidity заради вищого target return + low correlation",
        "Цінуєш персональний KYC + suitability process",
      ],
      whenBTitle: "Коли Wealthsimple має сенс",
      whenB: [
        "Тільки починаєш — будуєш перший $10-200K у TFSA/RRSP",
        "Потрібна повна ліквідність (можливо знадобляться гроші раптом)",
        "Не Eligible Investor yet (income < $75K, assets < $400K)",
        "Хочеш простий passive broad-market ETF підхід",
        "Воліш self-serve без paperwork",
      ],
      faqs: [
        { q: "Чи можу я мати і Wealthsimple, і EMD-інвестиції одночасно?", a: "Так — і це найрозумніший підхід. Wealthsimple/Questrade для liquid public-market core (TFSA + RRSP у broad-market ETF), EMD exempt market для 15-25% net worth diversification після того як core побудований. Це не «або-або»." },
        { q: "Wealthsimple дешевший — навіщо платити EMD комісії?", a: "Різні продукти. MER Wealthsimple покриває public ETF (які ти можеш купити сам за 0.2%). EMD commission покриває доступ до private securities, які взагалі недоступні через Wealthsimple. Порівнювати комісії напряму — як порівнювати ціну таксі і ціну літака: різні маршрути." },
        { q: "Чи EMD безпечніший за Wealthsimple бо «персональний радник»?", a: "Безпека = регуляція, не персональність. Обидва CSA-регульовані (EMD через NI 31-103/45-106, Wealthsimple через CIRO). Різниця в продуктах + ліквідності, не в «безпеці». Exempt market має ВИЩИЙ ризик (illiquidity, concentration) — тому обмежений Eligible Investors. Перевір будь-якого radniка через NRD search." },
        { q: "Я newcomer з $30K — що мені робити?", a: "Wealthsimple/Questrade, broad-market ETF у TFSA. EMD ще не для тебе (не Eligible Investor + немає liquid core). Через 2-3 роки коли income $75K+ і core $50K+ — тоді discovery call про exempt market. Self-check: /uk/eligibility." },
      ],
    },
    ru: {
      titleMeta: "EMD vs Wealthsimple: exempt market или robo-advisor",
      descriptionMeta: "Чем отличается работа с Exempt Market Dealer (частные securities) от Wealthsimple (robo-advisor ETF). Доступ, риск, ликвидность, комиссии.",
      crumbThis: "EMD vs Wealthsimple",
      eyebrow: "Сравнение · 2026",
      title: "EMD vs Wealthsimple",
      subtitle: "Exempt Market Dealer (частные securities) против Wealthsimple (robo-advisor на ETF) — два разных мира и кому что подходит",
      tldr: "Wealthsimple — robo-advisor для public-market ETF: открыл за 10 мин, $0 минимум, полная ликвидность, MER 0.4-0.5%. EMD (как Axcess Capital, через меня) даёт доступ к private securities (MICs, REITs, development LPs) только для Eligible/Accredited Investors, с KYC, lower liquidity, target historical 7-12%. Это НЕ конкуренты — Wealthsimple для liquid core, EMD для diversification после построения core.",
      optionA: "EMD (Axcess Capital)",
      optionB: "Wealthsimple",
      intro: "Распространённое непонимание: «Wealthsimple vs советник — что выбрать?». Ложная дилемма — они решают разные задачи. Wealthsimple — платформа для public-market ETF. EMD — канал доступа к private securities, которые не торгуются на бирже.",
      rows: [
        { aspect: "Что продаёт", a: "Частные securities: MICs, private REITs, development LPs (NI 45-106 exempt)", b: "Public-market ETF, акции, crypto" },
        { aspect: "Кто может инвестировать", a: "Только Eligible ($75K/$400K) или Accredited ($200K/$1M)", b: "Любой, $0 минимум" },
        { aspect: "Время входа", a: "KYC + Suitability + memorandum review (дни-недели)", b: "Регистрация ~10 мин" },
        { aspect: "Ликвидность", a: "Low: redemption windows, lock-up", b: "High: продажа в любой торговый день" },
        { aspect: "Target historical return", a: "7-12% (MICs), 15-22% (development LPs) — target", b: "Рыночный (broad-market ETF ~7-10%)" },
        { aspect: "Корреляция с рынком", a: "Low (real estate, private debt)", b: "High (это и есть рынок)" },
        { aspect: "Комиссии", a: "Embedded в offering; EMD получает commission", b: "0.4-0.5% MER managed; 0.2% self-directed" },
        { aspect: "Регуляция", a: "CSA NI 31-103 + NI 45-106 (NRD)", b: "CIRO-registered" },
      ],
      whenATitle: "Когда EMD имеет смысл",
      whenA: ["Ты уже Eligible/Accredited Investor", "Liquid core уже построен", "Хочешь diversification вне рынка", "Готов к lower liquidity ради target return", "Ценишь персональный KYC process"],
      whenBTitle: "Когда Wealthsimple имеет смысл",
      whenB: ["Только начинаешь ($10-200K в TFSA/RRSP)", "Нужна полная ликвидность", "Не Eligible Investor yet", "Хочешь простой passive ETF подход", "Предпочитаешь self-serve"],
      faqs: [
        { q: "Можно иметь и Wealthsimple, и EMD одновременно?", a: "Да — самый разумный подход. Wealthsimple для liquid core, EMD exempt market для 15-25% net worth diversification после построения core." },
        { q: "Wealthsimple дешевле — зачем платить EMD?", a: "Разные продукты. EMD commission покрывает доступ к private securities, недоступным через Wealthsimple. Сравнивать комиссии напрямую — как цену такси и самолёта." },
        { q: "EMD безопаснее?", a: "Безопасность = регуляция, не персональность. Оба CSA-регулируемы. Exempt market имеет ВЫШЕ риск (illiquidity) — потому ограничен Eligible Investors." },
        { q: "Я newcomer с $30K — что делать?", a: "Wealthsimple/Questrade, broad-market ETF в TFSA. EMD ещё не для тебя. Self-check: /ru/eligibility." },
      ],
    },
    en: {
      titleMeta: "EMD vs Wealthsimple: exempt market or robo-advisor",
      descriptionMeta: "How working with an Exempt Market Dealer (private securities) differs from Wealthsimple (robo-advisor ETFs). Access, risk, liquidity, fees compared.",
      crumbThis: "EMD vs Wealthsimple",
      eyebrow: "Comparison · 2026",
      title: "EMD vs Wealthsimple",
      subtitle: "Exempt Market Dealer (private securities) vs Wealthsimple (robo-advisor ETFs) — two different worlds and who each suits",
      tldr: "Wealthsimple is a robo-advisor for public-market ETFs: open in 10 min, $0 minimum, full liquidity, 0.4-0.5% MER (managed) or 0.2% (self-directed). An EMD (like Axcess Capital, through me) gives access to private securities (MICs, REITs, development LPs) only for Eligible/Accredited Investors, with KYC + suitability, lower liquidity, target historical 7-12%. They're NOT competitors — Wealthsimple for the liquid core, EMD for diversification beyond public markets once the core is built.",
      optionA: "EMD (Axcess Capital)",
      optionB: "Wealthsimple",
      intro: "The most common newcomer confusion: 'Wealthsimple vs an advisor — which do I choose?' False dilemma — they solve different problems. Wealthsimple is a platform for public-market ETFs. An EMD is an access channel to private securities that don't trade on an exchange at all.",
      rows: [
        { aspect: "What it sells", a: "Private securities: MICs, private REITs, development LPs, private credit (NI 45-106 exempt)", b: "Public-market ETFs, individual stocks, crypto — anything exchange-listed" },
        { aspect: "Who can invest", a: "Only Eligible Investor ($75K solo / $400K assets) or Accredited ($200K / $1M)", b: "Anyone, $0 minimum, no income test" },
        { aspect: "Time to start", a: "KYC + Suitability Assessment + offering memorandum review (days-weeks)", b: "Online sign-up ~10 min" },
        { aspect: "Liquidity", a: "Low: redemption windows (quarterly/annual), lock-up periods", b: "High: sell any trading day" },
        { aspect: "Target historical return", a: "7-12% (MICs), 15-22% (development LPs) — target, not guaranteed", b: "Market (broad-market ETF ~7-10% historical)" },
        { aspect: "Correlation with stock market", a: "Low (real estate, private debt don't move with TSX/S&P)", b: "High (it IS the stock market)" },
        { aspect: "Fees", a: "Embedded in offering (management fee + carry); EMD earns commission", b: "0.4-0.5% MER managed; 0.2% self-directed ETF" },
        { aspect: "Regulation", a: "CSA NI 31-103 + NI 45-106, EMD-licensed DR (NRD)", b: "CIRO-registered (Wealthsimple Investments Inc.)" },
        { aspect: "Education + personal contact", a: "1-on-1 discovery call, KYC, ongoing supervision", b: "Self-serve app + chat support" },
      ],
      whenATitle: "When an EMD makes sense",
      whenA: [
        "You're already an Eligible/Accredited Investor (income $75K+ or net assets $400K+)",
        "Liquid public-market core already built (TFSA/RRSP in broad-market ETFs)",
        "You want diversification beyond the stock market (real estate, private debt)",
        "Comfortable with lower liquidity for higher target return + low correlation",
        "You value a personal KYC + suitability process",
      ],
      whenBTitle: "When Wealthsimple makes sense",
      whenB: [
        "Just starting — building your first $10-200K in TFSA/RRSP",
        "You need full liquidity (might need the money suddenly)",
        "Not an Eligible Investor yet (income < $75K, assets < $400K)",
        "You want a simple passive broad-market ETF approach",
        "You prefer self-serve with no paperwork",
      ],
      faqs: [
        { q: "Can I have both Wealthsimple and EMD investments at the same time?", a: "Yes — and it's the smartest approach. Wealthsimple/Questrade for the liquid public-market core (TFSA + RRSP in broad-market ETFs), EMD exempt market for 15-25% of net worth as diversification once the core is built. It's not either/or." },
        { q: "Wealthsimple is cheaper — why pay EMD fees?", a: "Different products. Wealthsimple's MER covers public ETFs (which you can buy yourself at 0.2%). EMD commission covers access to private securities entirely unavailable through Wealthsimple. Comparing fees directly is like comparing a taxi fare to a flight: different routes." },
        { q: "Is an EMD safer than Wealthsimple because 'personal advisor'?", a: "Safety = regulation, not personal touch. Both are CSA-regulated (EMD via NI 31-103/45-106, Wealthsimple via CIRO). The difference is products + liquidity, not 'safety'. Exempt market carries HIGHER risk (illiquidity, concentration) — which is why it's limited to Eligible Investors. Verify any advisor via NRD search." },
        { q: "I'm a newcomer with $30K — what should I do?", a: "Wealthsimple/Questrade, broad-market ETF in a TFSA. EMD isn't for you yet (not an Eligible Investor + no liquid core). In 2-3 years when income is $75K+ and core is $50K+ — then a discovery call about exempt market. Self-check: /en/eligibility." },
      ],
    },
  },

  "mic-vs-gic": {
    slug: "mic-vs-gic",
    related: { pillar: "/porivnyannia", calculator: "/calculators/mer-impact", blogPost: "/blog/exempt-market-calgary-commercial-real-estate-rozvytok" },
    uk: {
      titleMeta: "MIC vs GIC: mortgage investment corporation чи GIC",
      descriptionMeta: "MIC (Mortgage Investment Corporation) проти GIC (Guaranteed Investment Certificate): дохідність, ризик, ліквідність, гарантії, оподаткування. Порівняльна таблиця 2026.",
      crumbThis: "MIC vs GIC",
      eyebrow: "Порівняння · 2026",
      title: "MIC vs GIC",
      subtitle: "Mortgage Investment Corporation проти Guaranteed Investment Certificate — два інструменти для income, але з протилежним профілем ризику",
      tldr: "GIC — гарантований депозит (CDIC-insured до $100K), 3-4% historical, повністю predictable, zero ризик капіталу. MIC — pooled mortgage lending (private), target historical 7-12%, monthly distributions, АЛЕ не гарантований, не CDIC-insured, low liquidity, тільки для Eligible Investors. GIC для capital preservation; MIC для higher income з готовністю прийняти credit + liquidity ризик. Не замінники — різні job-to-be-done.",
      optionA: "MIC",
      optionB: "GIC",
      intro: "GIC знають усі — банк гарантує повернення + фіксований відсоток. MIC менш відомий: це корпорація (Income Tax Act §130.1), що pool-ить гроші інвесторів і видає mortgages, розподіляючи 100% net income як dividends. Обидва дають income, але профіль ризику протилежний.",
      rows: [
        { aspect: "Що це", a: "Корпорація що видає private mortgages, розподіляє 100% net income як dividends", b: "Депозит у банку з гарантованою ставкою на фіксований термін" },
        { aspect: "Target / гарантована дохідність", a: "7-12% historical (target, НЕ гарантований)", b: "3-4% (гарантований контрактом)" },
        { aspect: "Гарантія капіталу", a: "Немає — залежить від underlying mortgage performance", b: "CDIC-insured до $100K на банк (повна гарантія)" },
        { aspect: "Ліквідність", a: "Low: redemption тільки у вікнах (квартал/рік)", b: "Locked до maturity (або penalty за дострокове); cashable GIC liquid" },
        { aspect: "Хто може купити", a: "Тільки Eligible Investor (NI 45-106)", b: "Будь-хто" },
        { aspect: "Розподіл доходу", a: "Monthly distributions (типово)", b: "At maturity або annual" },
        { aspect: "Оподаткування", a: "Dividends оподатковуються як interest income (не eligible dividend)", b: "Interest income (повна marginal ставка)" },
        { aspect: "У registered account", a: "Так (TFSA/RRSP через trustee account)", b: "Так (будь-який broker/банк)" },
        { aspect: "Ризик", a: "Credit ризик (defaults), liquidity ризик, manager ризик", b: "Майже нульовий (тільки inflation ризик)" },
      ],
      whenATitle: "Коли MIC має сенс",
      whenA: [
        "Ти Eligible Investor з diversified portfolio",
        "Шукаєш higher income + готовий прийняти credit/liquidity ризик",
        "Хочеш real-estate exposure без купівлі фізичної нерухомості",
        "Маєш достатньо liquid reserves поза MIC (бо MIC illiquid)",
        "Розумієш що target return ≠ гарантія",
      ],
      whenBTitle: "Коли GIC має сенс",
      whenB: [
        "Capital preservation — найважливіше (emergency fund, short horizon)",
        "Потрібна 100% predictability (заплановані витрати: down payment через рік)",
        "Не хочеш жодного ризику капіталу",
        "Не Eligible Investor",
        "Гроші знадобляться у конкретну дату",
      ],
      faqs: [
        { q: "Якщо MIC дає 7-12%, а GIC 3-4%, навіщо взагалі GIC?", a: "Бо 7-12% MIC — target, не гарантія, і капітал під ризиком + illiquid. GIC 3-4% — гарантовано + CDIC-insured + (cashable) liquid. Для emergency fund або грошей які знадобляться через рік — GIC. Для long-term income з diversified portfolio де ти Eligible Investor — MIC може мати місце. Різні задачі." },
        { q: "MIC distributions оподатковуються як eligible dividends?", a: "Ні — попри назву «dividends», MIC distributions оподатковуються як interest income (повна marginal rate), не як eligible dividends з dividend tax credit. Тому MIC найефективніший у RRSP/TFSA (tax-sheltered), не у non-registered." },
        { q: "Чи може MIC втратити мої гроші?", a: "Так — MIC не гарантований і не CDIC-insured. Якщо underlying mortgages default-нуть масово (наприклад real estate crash), capital під ризиком. Це чому він обмежений Eligible Investors і чому historical 7-12% — це compensation за цей ризик. GIC такого ризику не має." },
        { q: "Як купити MIC?", a: "Через Exempt Market Dealer (як Axcess Capital) після KYC + Suitability. Не доступний через Wealthsimple/банк. Self-check Eligible Investor: /uk/eligibility." },
      ],
    },
    ru: {
      titleMeta: "MIC vs GIC: mortgage investment corporation или GIC",
      descriptionMeta: "MIC (Mortgage Investment Corporation) против GIC: доходность, риск, ликвидность, гарантии, налогообложение. Сравнительная таблица 2026.",
      crumbThis: "MIC vs GIC",
      eyebrow: "Сравнение · 2026",
      title: "MIC vs GIC",
      subtitle: "Mortgage Investment Corporation против Guaranteed Investment Certificate — два инструмента для income с противоположным профилем риска",
      tldr: "GIC — гарантированный депозит (CDIC-insured до $100K), 3-4% historical, predictable, zero риск капитала. MIC — pooled mortgage lending, target historical 7-12%, monthly distributions, НО не гарантирован, не CDIC-insured, low liquidity, только для Eligible Investors. GIC для capital preservation; MIC для higher income с готовностью принять credit + liquidity риск.",
      optionA: "MIC",
      optionB: "GIC",
      intro: "GIC знают все — банк гарантирует возврат + фиксированный процент. MIC менее известен: корпорация (Income Tax Act §130.1), которая pool-ит деньги инвесторов и выдаёт mortgages, распределяя 100% net income как dividends.",
      rows: [
        { aspect: "Что это", a: "Корпорация выдающая private mortgages, распределяет 100% net income", b: "Депозит в банке с гарантированной ставкой" },
        { aspect: "Target / гарантированная доходность", a: "7-12% historical (target, НЕ гарантирован)", b: "3-4% (гарантирован контрактом)" },
        { aspect: "Гарантия капитала", a: "Нет — зависит от mortgage performance", b: "CDIC-insured до $100K (полная гарантия)" },
        { aspect: "Ликвидность", a: "Low: redemption в окнах", b: "Locked до maturity; cashable GIC liquid" },
        { aspect: "Кто может купить", a: "Только Eligible Investor (NI 45-106)", b: "Любой" },
        { aspect: "Налогообложение", a: "Как interest income (не eligible dividend)", b: "Interest income (полная marginal)" },
        { aspect: "Риск", a: "Credit, liquidity, manager риск", b: "Почти нулевой (только inflation)" },
      ],
      whenATitle: "Когда MIC имеет смысл",
      whenA: ["Ты Eligible Investor с diversified portfolio", "Higher income + готов принять риск", "Real-estate exposure без покупки недвижимости", "Есть liquid reserves вне MIC", "Понимаешь target ≠ гарантия"],
      whenBTitle: "Когда GIC имеет смысл",
      whenB: ["Capital preservation важнее всего", "Нужна 100% predictability", "Не хочешь риска капитала", "Не Eligible Investor", "Деньги нужны к конкретной дате"],
      faqs: [
        { q: "Если MIC даёт 7-12%, а GIC 3-4%, зачем GIC?", a: "Потому что 7-12% MIC — target, не гарантия, капитал под риском + illiquid. GIC гарантирован + CDIC-insured + liquid. Для emergency fund — GIC. Для long-term income где ты Eligible Investor — MIC. Разные задачи." },
        { q: "MIC distributions как eligible dividends?", a: "Нет — облагаются как interest income (полная marginal), не eligible dividends. Поэтому MIC эффективнее в RRSP/TFSA." },
        { q: "Может MIC потерять мои деньги?", a: "Да — не гарантирован, не CDIC-insured. При массовых defaults капитал под риском. Поэтому ограничен Eligible Investors." },
        { q: "Как купить MIC?", a: "Через EMD (как Axcess Capital) после KYC. Не доступен через банк. Self-check: /ru/eligibility." },
      ],
    },
    en: {
      titleMeta: "MIC vs GIC: mortgage investment corporation or GIC",
      descriptionMeta: "MIC (Mortgage Investment Corporation) vs GIC (Guaranteed Investment Certificate): return, risk, liquidity, guarantees, taxation. 2026 comparison table.",
      crumbThis: "MIC vs GIC",
      eyebrow: "Comparison · 2026",
      title: "MIC vs GIC",
      subtitle: "Mortgage Investment Corporation vs Guaranteed Investment Certificate — two income tools with opposite risk profiles",
      tldr: "A GIC is a guaranteed deposit (CDIC-insured to $100K), 3-4% historical, fully predictable, zero capital risk. A MIC is pooled mortgage lending (private), target historical 7-12%, monthly distributions, BUT not guaranteed, not CDIC-insured, low liquidity, Eligible Investors only. GIC for capital preservation; MIC for higher income if you'll accept credit + liquidity risk. Not substitutes — different jobs to be done.",
      optionA: "MIC",
      optionB: "GIC",
      intro: "Everyone knows GICs — the bank guarantees your principal plus a fixed rate. MICs are less familiar: a corporation (Income Tax Act §130.1) that pools investor money to issue mortgages, distributing 100% of net income as dividends. Both produce income, but opposite risk profiles.",
      rows: [
        { aspect: "What it is", a: "Corporation issuing private mortgages, distributes 100% of net income as dividends", b: "Bank deposit with a guaranteed rate for a fixed term" },
        { aspect: "Target / guaranteed return", a: "7-12% historical (target, NOT guaranteed)", b: "3-4% (guaranteed by contract)" },
        { aspect: "Capital guarantee", a: "None — depends on underlying mortgage performance", b: "CDIC-insured to $100K per bank (full guarantee)" },
        { aspect: "Liquidity", a: "Low: redemption only in windows (quarterly/annual)", b: "Locked to maturity (or penalty for early); cashable GICs are liquid" },
        { aspect: "Who can buy", a: "Eligible Investor only (NI 45-106)", b: "Anyone" },
        { aspect: "Income distribution", a: "Monthly distributions (typical)", b: "At maturity or annual" },
        { aspect: "Taxation", a: "Distributions taxed as interest income (not eligible dividend)", b: "Interest income (full marginal rate)" },
        { aspect: "In a registered account", a: "Yes (TFSA/RRSP via trustee account)", b: "Yes (any broker/bank)" },
        { aspect: "Risk", a: "Credit risk (defaults), liquidity risk, manager risk", b: "Near-zero (only inflation risk)" },
      ],
      whenATitle: "When a MIC makes sense",
      whenA: [
        "You're an Eligible Investor with a diversified portfolio",
        "Seeking higher income + willing to accept credit/liquidity risk",
        "Want real-estate exposure without buying physical property",
        "Have sufficient liquid reserves outside the MIC (since MICs are illiquid)",
        "You understand target return ≠ guarantee",
      ],
      whenBTitle: "When a GIC makes sense",
      whenB: [
        "Capital preservation is paramount (emergency fund, short horizon)",
        "You need 100% predictability (planned expense: down payment in a year)",
        "You want zero capital risk",
        "Not an Eligible Investor",
        "You'll need the money on a specific date",
      ],
      faqs: [
        { q: "If a MIC pays 7-12% and a GIC 3-4%, why hold a GIC at all?", a: "Because the 7-12% MIC figure is a target, not a guarantee, and capital is at risk + illiquid. A GIC's 3-4% is guaranteed + CDIC-insured + (cashable) liquid. For an emergency fund or money you'll need within a year — GIC. For long-term income within a diversified portfolio where you're an Eligible Investor — a MIC may have a place. Different jobs." },
        { q: "Are MIC distributions taxed as eligible dividends?", a: "No — despite the 'dividends' label, MIC distributions are taxed as interest income (full marginal rate), not eligible dividends with the dividend tax credit. That's why MICs are most efficient inside RRSP/TFSA (tax-sheltered), not non-registered." },
        { q: "Can a MIC lose my money?", a: "Yes — a MIC isn't guaranteed and isn't CDIC-insured. If underlying mortgages default en masse (e.g. a real-estate crash), capital is at risk. That's why it's limited to Eligible Investors and why the historical 7-12% is compensation for that risk. A GIC has no such risk." },
        { q: "How do I buy a MIC?", a: "Through an Exempt Market Dealer (like Axcess Capital) after KYC + Suitability. Not available through Wealthsimple/a bank. Eligible Investor self-check: /en/eligibility." },
      ],
    },
  },

  "exempt-market-vs-etf": {
    slug: "exempt-market-vs-etf",
    related: { pillar: "/porivnyannia", calculator: "/calculators/mer-impact", blogPost: "/blog/etf-placement-rrsp-tfsa-fhsa-strategy" },
    uk: {
      titleMeta: "Exempt market vs ETF: приватні securities чи біржові фонди",
      descriptionMeta: "Exempt market (private securities) проти ETF (біржові фонди): доступ, ліквідність, кореляція, дохідність, комісії. Як вони доповнюють одне одного у portfolio.",
      crumbThis: "Exempt market vs ETF",
      eyebrow: "Порівняння · 2026",
      title: "Exempt market vs ETF",
      subtitle: "Приватні securities (exempt market) проти біржових фондів (ETF) — не суперники, а два шари диверсифікованого portfolio",
      tldr: "ETF — біржові фонди (broad-market public equity), повна ліквідність, MER 0.05-0.30%, доступні всім, корелюють з ринком. Exempt market — private securities (MICs, REITs, LPs), low liquidity, target 7-22%, тільки Eligible Investors, low correlation з ринком. Стратегія: ETF як liquid core (60-80% portfolio), exempt market як diversifier (15-25%) після того як core побудований. Не «або-або».",
      optionA: "Exempt market",
      optionB: "ETF",
      intro: "ETF — це фундамент сучасного passive investing: дешево, ліквідно, diversified. Exempt market — це інший шар: private securities які не торгуються на біржі. Розумна стратегія використовує обидва на різних рівнях portfolio.",
      rows: [
        { aspect: "Де торгується", a: "Не торгується на біржі (private placement)", b: "На біржі (TSX, NYSE) — у будь-який торговий день" },
        { aspect: "Ліквідність", a: "Low: redemption windows, lock-ups", b: "High: миттєвий продаж" },
        { aspect: "Доступ", a: "Тільки Eligible/Accredited Investor (NI 45-106)", b: "Будь-хто, $0 мінімум" },
        { aspect: "Кореляція з фондовим ринком", a: "Low (real estate, private debt, development)", b: "High (це і є ринок)" },
        { aspect: "Target historical return", a: "7-12% (MICs/REITs), 15-22% (development LPs)", b: "Ринковий (~7-10% broad-market historical)" },
        { aspect: "Комісії", a: "Embedded management fee + carry (вищі)", b: "0.05-0.30% MER (дуже низькі)" },
        { aspect: "Transparency", a: "Offering memorandum, quarterly/annual reporting", b: "Daily NAV, повна публічна звітність" },
        { aspect: "Мінімум входу", a: "$5-30K на offering (типово)", b: "$1 (вартість 1 share)" },
        { aspect: "Роль у portfolio", a: "Diversifier (15-25% net worth)", b: "Core holding (60-80%)" },
      ],
      whenATitle: "Коли exempt market має сенс",
      whenA: [
        "Liquid ETF core вже побудований (TFSA/RRSP filled)",
        "Ти Eligible Investor",
        "Хочеш зменшити кореляцію portfolio з фондовим ринком",
        "Готовий до illiquidity заради higher target return",
        "Шукаєш real estate / private debt exposure",
      ],
      whenBTitle: "Коли ETF має сенс (майже завжди як база)",
      whenB: [
        "Будуєш core portfolio — ETF це default перший крок",
        "Цінуєш ліквідність + низькі комісії",
        "Хочеш broad-market diversification одним інструментом",
        "Не Eligible Investor (ETF — твій єдиний шлях)",
        "Tax-efficient placement (US ETF у RRSP, CA ETF у TFSA)",
      ],
      faqs: [
        { q: "Чи треба мені exempt market якщо у мене вже є ETF?", a: "Не обов'язково. ETF core достатній для більшості людей. Exempt market — це опціональний diversifier для Eligible Investors які вже побудували liquid core і хочуть зменшити correlation + додати real estate/private debt exposure. Якщо ти ще будуєш перші $50-200K — фокусуйся на ETF." },
        { q: "Exempt market дає вищий return — навіщо тоді ETF?", a: "Target return ≠ гарантований return, і exempt market illiquid + higher risk. ETF дає ліквідність, transparency, низькі комісії, і broad-market diversification за 0.2%. Exempt market — це не «краще», це «інше»: вищий target за вищий ризик + illiquidity. Тому це diversifier, не replacement." },
        { q: "Який % portfolio у exempt market розумний?", a: "Загальний framework: 15-25% net worth для Eligible Investors з побудованим liquid core. Решта 60-80% — liquid public-market ETF. Конкретний % залежить від твого horizon, liquidity needs, risk tolerance — це визначається у Suitability Assessment, не загальним правилом." },
        { q: "Як почати з ETF як newcomer?", a: "Wealthsimple/Questrade self-directed, broad-market ETF (XEQT, VEQT, VFV) у TFSA. Placement matrix: /uk/blog/etf-placement-rrsp-tfsa-fhsa-strategy. Exempt market — пізніше, коли Eligible Investor + core готовий." },
      ],
    },
    ru: {
      titleMeta: "Exempt market vs ETF: частные securities или биржевые фонды",
      descriptionMeta: "Exempt market (private securities) против ETF: доступ, ликвидность, корреляция, доходность, комиссии. Как они дополняют друг друга в portfolio.",
      crumbThis: "Exempt market vs ETF",
      eyebrow: "Сравнение · 2026",
      title: "Exempt market vs ETF",
      subtitle: "Частные securities (exempt market) против биржевых фондов (ETF) — не соперники, а два слоя диверсифицированного portfolio",
      tldr: "ETF — биржевые фонды, полная ликвидность, MER 0.05-0.30%, доступны всем, коррелируют с рынком. Exempt market — private securities, low liquidity, target 7-22%, только Eligible Investors, low correlation. Стратегия: ETF как liquid core (60-80%), exempt market как diversifier (15-25%) после построения core.",
      optionA: "Exempt market",
      optionB: "ETF",
      intro: "ETF — фундамент passive investing: дёшево, ликвидно, diversified. Exempt market — другой слой: private securities не торгуемые на бирже. Разумная стратегия использует оба на разных уровнях portfolio.",
      rows: [
        { aspect: "Где торгуется", a: "Не на бирже (private placement)", b: "На бирже (TSX, NYSE)" },
        { aspect: "Ликвидность", a: "Low: redemption windows, lock-ups", b: "High: мгновенная продажа" },
        { aspect: "Доступ", a: "Только Eligible/Accredited (NI 45-106)", b: "Любой, $0 минимум" },
        { aspect: "Корреляция с рынком", a: "Low (real estate, private debt)", b: "High (это и есть рынок)" },
        { aspect: "Target return", a: "7-12% (MICs/REITs), 15-22% (LPs)", b: "Рыночный (~7-10%)" },
        { aspect: "Комиссии", a: "Embedded management + carry (выше)", b: "0.05-0.30% MER (очень низкие)" },
        { aspect: "Минимум входа", a: "$5-30K на offering", b: "$1 (стоимость 1 share)" },
        { aspect: "Роль в portfolio", a: "Diversifier (15-25%)", b: "Core holding (60-80%)" },
      ],
      whenATitle: "Когда exempt market имеет смысл",
      whenA: ["Liquid ETF core построен", "Ты Eligible Investor", "Хочешь уменьшить корреляцию", "Готов к illiquidity ради return", "Real estate / private debt exposure"],
      whenBTitle: "Когда ETF имеет смысл (почти всегда как база)",
      whenB: ["Строишь core — ETF это default", "Ценишь ликвидность + низкие комиссии", "Broad-market diversification одним инструментом", "Не Eligible Investor", "Tax-efficient placement"],
      faqs: [
        { q: "Нужен ли exempt market если есть ETF?", a: "Не обязательно. ETF core достаточен для большинства. Exempt market — опциональный diversifier для Eligible Investors с построенным core." },
        { q: "Exempt market даёт выше return — зачем ETF?", a: "Target ≠ гарантия, exempt market illiquid + higher risk. ETF даёт ликвидность, transparency, низкие комиссии. Это не «лучше», это «другое»." },
        { q: "Какой % portfolio в exempt market?", a: "15-25% net worth для Eligible Investors с построенным core. Конкретный % — в Suitability Assessment." },
        { q: "Как начать с ETF?", a: "Wealthsimple/Questrade, broad-market ETF (XEQT) в TFSA. Placement: /ru/blog/etf-placement-rrsp-tfsa-fhsa-strategy." },
      ],
    },
    en: {
      titleMeta: "Exempt market vs ETF: private securities or exchange funds",
      descriptionMeta: "Exempt market (private securities) vs ETFs (exchange-traded funds): access, liquidity, correlation, return, fees. How they complement each other in a portfolio.",
      crumbThis: "Exempt market vs ETF",
      eyebrow: "Comparison · 2026",
      title: "Exempt market vs ETF",
      subtitle: "Private securities (exempt market) vs exchange-traded funds (ETFs) — not rivals, but two layers of a diversified portfolio",
      tldr: "ETFs are exchange-traded funds (broad-market public equity), full liquidity, 0.05-0.30% MER, available to anyone, correlated with the market. Exempt market is private securities (MICs, REITs, LPs), low liquidity, target 7-22%, Eligible Investors only, low correlation with the market. Strategy: ETFs as the liquid core (60-80% of portfolio), exempt market as a diversifier (15-25%) once the core is built. Not either/or.",
      optionA: "Exempt market",
      optionB: "ETF",
      intro: "ETFs are the foundation of modern passive investing: cheap, liquid, diversified. Exempt market is a different layer: private securities that don't trade on an exchange. A smart strategy uses both at different levels of the portfolio.",
      rows: [
        { aspect: "Where it trades", a: "Doesn't trade on an exchange (private placement)", b: "On an exchange (TSX, NYSE) — any trading day" },
        { aspect: "Liquidity", a: "Low: redemption windows, lock-ups", b: "High: instant sale" },
        { aspect: "Access", a: "Eligible/Accredited Investor only (NI 45-106)", b: "Anyone, $0 minimum" },
        { aspect: "Correlation with stock market", a: "Low (real estate, private debt, development)", b: "High (it IS the market)" },
        { aspect: "Target historical return", a: "7-12% (MICs/REITs), 15-22% (development LPs)", b: "Market (~7-10% broad-market historical)" },
        { aspect: "Fees", a: "Embedded management fee + carry (higher)", b: "0.05-0.30% MER (very low)" },
        { aspect: "Transparency", a: "Offering memorandum, quarterly/annual reporting", b: "Daily NAV, full public reporting" },
        { aspect: "Minimum to start", a: "$5-30K per offering (typical)", b: "$1 (price of 1 share)" },
        { aspect: "Role in portfolio", a: "Diversifier (15-25% of net worth)", b: "Core holding (60-80%)" },
      ],
      whenATitle: "When exempt market makes sense",
      whenA: [
        "Liquid ETF core already built (TFSA/RRSP filled)",
        "You're an Eligible Investor",
        "You want to reduce portfolio correlation with the stock market",
        "Comfortable with illiquidity for a higher target return",
        "Seeking real estate / private debt exposure",
      ],
      whenBTitle: "When ETFs make sense (almost always, as the base)",
      whenB: [
        "Building your core portfolio — ETFs are the default first step",
        "You value liquidity + low fees",
        "You want broad-market diversification in one instrument",
        "Not an Eligible Investor (ETFs are your only path)",
        "Tax-efficient placement (US ETF in RRSP, CA ETF in TFSA)",
      ],
      faqs: [
        { q: "Do I need exempt market if I already have ETFs?", a: "Not necessarily. An ETF core is enough for most people. Exempt market is an optional diversifier for Eligible Investors who've already built a liquid core and want to reduce correlation + add real estate/private debt exposure. If you're still building your first $50-200K, focus on ETFs." },
        { q: "Exempt market offers a higher return — so why hold ETFs?", a: "Target return ≠ guaranteed return, and exempt market is illiquid + higher risk. ETFs give liquidity, transparency, low fees, and broad-market diversification for 0.2%. Exempt market isn't 'better', it's 'different': higher target for higher risk + illiquidity. That's why it's a diversifier, not a replacement." },
        { q: "What % of a portfolio in exempt market is reasonable?", a: "General framework: 15-25% of net worth for Eligible Investors with a built liquid core. The other 60-80% stays in liquid public-market ETFs. The specific % depends on your horizon, liquidity needs, and risk tolerance — determined in a Suitability Assessment, not by a blanket rule." },
        { q: "How do I start with ETFs as a newcomer?", a: "Wealthsimple/Questrade self-directed, broad-market ETF (XEQT, VEQT, VFV) in a TFSA. Placement matrix: /en/blog/etf-placement-rrsp-tfsa-fhsa-strategy. Exempt market comes later, once you're an Eligible Investor + the core is built." },
      ],
    },
  },
};

export function getComparisonSlugs(): string[] {
  return Object.keys(COMPARISONS);
}

export function getComparison(slug: string, locale: Locale = "uk"): ResolvedComparison | null {
  const c = COMPARISONS[slug];
  if (!c) return null;
  return { slug: c.slug, related: c.related, ...(c[locale] || c.uk) };
}

export function getAllComparisons(locale: Locale = "uk"): ResolvedComparison[] {
  return Object.keys(COMPARISONS).map((slug) => getComparison(slug, locale)!);
}
