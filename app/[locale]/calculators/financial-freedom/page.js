import FIRECalculator from "./calculator";
import StaticFaq from "../../../_components/StaticFaq";
import { SUPPORTED_LOCALES } from "../../../_i18n/dictionary";

// ─── FAQ (educational; no return guarantees; EMD-compliant) ─────────────────
const FAQ = {
  uk: [
    {
      q: "Що таке FI number і як він рахується?",
      a: "Financial Independence number — це капітал, з якого можеш жити, не працюючи. За класичним 4% rule (Trinity Study, США): річні витрати × 25 = FI Standard. За консервативнішим 3.5% safe withdrawal rate: річні витрати × ~28.6 = FI Safe. Канадський контекст: ще додай CPP/OAS у 60+, що зменшує потрібний капітал.",
    },
    {
      q: "Чи реально 4% rule досі працює?",
      a: "Дослідження Trinity (1998, 2018 оновлення) показали 95%+ ймовірність протриматись 30 років при 4% виведенні з балансованого портфеля 60/40. Критики кажуть це для США/30 років і не враховує сучасні низькі дохідності облігацій. Для довшого виходу (40+ років) консервативніший 3.25–3.5% безпечніший.",
    },
    {
      q: "Чи можна жити з $1M в Канаді?",
      a: "$1M × 4% = $40K/рік до податку. У Калгарі для пари без іпотеки — це працює (умовно). У Торонто/Ванкувері — недостатньо. Калькулятор показує точне число для твоїх витрат. Додай CPP ($1,300+/міс у 60+ років при максимумі) і OAS ($720+/міс) — потрібний капітал суттєво зменшується.",
    },
    {
      q: "Як CPP і OAS впливають на FI план?",
      a: "CPP — пенсія за внесками (можна брати з 60, повна з 65). OAS — за резидентство в Канаді (мінімум 10 років після 18). Новоприбулим: щоб отримати повний CPP, потрібно 39+ років внесків — більшість українських новоприбулих отримає часткову пенсію. Калькулятор НЕ враховує це автоматично — закладай у свій план.",
    },
    {
      q: "Чи прискорить exempt market мою дату FI?",
      a: "Освітньо: вищі очікувані доходи (8–12% vs 6–8% balanced) скорочують термін до FI на роки. Але exempt market несе вищий ризик (низька ліквідність, можлива втрата капіталу) і доступний лише Eligible/Accredited Investor. Це не альтернатива — це додатковий інструмент після основи з TFSA/RRSP. Особиста придатність — лише через Suitability Assessment.",
    },
    {
      q: "Що найшвидше прискорює дату FI?",
      a: "Математично: підвищення savings rate (різниця доход − витрати) сильніше за пошук вищої дохідності. Підняти savings rate з 20% до 40% скорочує термін до FI приблизно вдвічі — це більше ніж стрибок з 7% до 10% дохідності. У реальному житті — комбінація: оптимізувати витрати + збільшити доход + правильно інвестувати.",
    },
  ],
  ru: [
    {
      q: "Что такое FI number и как он считается?",
      a: "Financial Independence number — это капитал, с которого можешь жить, не работая. По классическому 4% rule (Trinity Study, США): годовые расходы × 25 = FI Standard. По более консервативному 3.5% safe withdrawal rate: годовые расходы × ~28.6 = FI Safe. Канадский контекст: ещё добавь CPP/OAS в 60+, что уменьшает нужный капитал.",
    },
    {
      q: "Реально ли 4% rule до сих пор работает?",
      a: "Исследования Trinity (1998, обновления 2018) показали 95%+ вероятность продержаться 30 лет при 4% выводе из балансированного портфеля 60/40. Критики говорят это для США/30 лет и не учитывает современные низкие доходности облигаций. Для более долгого выхода (40+ лет) консервативный 3.25–3.5% безопаснее.",
    },
    {
      q: "Можно ли жить с $1M в Канаде?",
      a: "$1M × 4% = $40K/год до налогов. В Калгари для пары без ипотеки — работает (условно). В Торонто/Ванкувере — недостаточно. Калькулятор показывает точное число для твоих расходов. Добавь CPP ($1,300+/мес в 60+ при максимуме) и OAS ($720+/мес) — нужный капитал существенно уменьшается.",
    },
    {
      q: "Как CPP и OAS влияют на FI план?",
      a: "CPP — пенсия по взносам (можно брать с 60, полная с 65). OAS — за residency в Канаде (минимум 10 лет после 18). Новоприбывшим: чтобы получить полный CPP, нужно 39+ лет взносов — большинство украинских новоприбывших получит частичную пенсию. Калькулятор НЕ учитывает это автоматически — закладывай в свой план.",
    },
    {
      q: "Ускорит ли exempt market мою дату FI?",
      a: "Образовательно: более высокие ожидаемые доходы (8–12% vs 6–8% balanced) сокращают срок до FI на годы. Но exempt market несёт более высокий риск (низкая ликвидность, возможная потеря капитала) и доступен только Eligible/Accredited Investor. Это не альтернатива — это дополнительный инструмент после основы из TFSA/RRSP. Личная пригодность — только через Suitability Assessment.",
    },
    {
      q: "Что быстрее всего ускоряет дату FI?",
      a: "Математически: повышение savings rate (разница доход − расходы) сильнее поиска большей доходности. Поднять savings rate с 20% до 40% сокращает срок до FI примерно вдвое — это больше чем скачок с 7% до 10% доходности. В реальной жизни — комбинация: оптимизировать расходы + увеличить доход + правильно инвестировать.",
    },
  ],
  en: [
    {
      q: "What is a FI number and how is it calculated?",
      a: "Your Financial Independence number is the capital you can live off without working. By the classic 4% rule (Trinity Study, US): annual expenses × 25 = FI Standard. With the more conservative 3.5% safe withdrawal rate: annual expenses × ~28.6 = FI Safe. Canadian context: add CPP/OAS at 60+ to shrink the capital you actually need.",
    },
    {
      q: "Does the 4% rule still hold up?",
      a: "Trinity Study (1998, 2018 updates) showed 95%+ probability of lasting 30 years drawing 4% from a balanced 60/40 portfolio. Critics note it's US-based, 30-year horizon, and doesn't reflect today's low bond yields. For a longer retirement (40+ years), 3.25–3.5% is safer.",
    },
    {
      q: "Can you live on $1M in Canada?",
      a: "$1M × 4% = $40K/year pre-tax. In Calgary, for a couple with no mortgage, that's workable (barely). In Toronto/Vancouver it isn't. The calculator gives the exact number for your real expenses. Layer in CPP ($1,300+/month at 65 if maxed) and OAS ($720+/month) and the capital you need drops significantly.",
    },
    {
      q: "How do CPP and OAS affect a FI plan?",
      a: "CPP is the contributory pension (start at 60, full at 65). OAS is residency-based (minimum 10 years in Canada after 18). For newcomers: full CPP needs 39+ years of contributions, so most Ukrainian newcomers will get a partial pension. The calculator does NOT include this automatically — model it into your plan.",
    },
    {
      q: "Does exempt market accelerate the FI date?",
      a: "Educationally: higher expected returns (8–12% vs 6–8% balanced) shorten the path to FI by years. But exempt market carries higher risk (low liquidity, possible loss of capital) and is only available to Eligible/Accredited Investors. It's not an alternative to TFSA/RRSP basics — it's an additional tool layered on top. Personal suitability is determined only through a formal Suitability Assessment.",
    },
    {
      q: "What's the single biggest lever for an earlier FI date?",
      a: "Mathematically: raising your savings rate (income minus expenses) beats chasing higher returns. Lifting savings rate from 20% to 40% roughly halves your time to FI — a bigger effect than moving from 7% to 10% returns. In real life it's the combination: cut expenses, grow income, invest properly.",
    },
  ],
};
const FAQ_HEADING = {
  uk: "Часті питання про FIRE у Канаді",
  ru: "Частые вопросы про FIRE в Канаде",
  en: "FIRE in Canada — FAQ",
};

const META = {
  uk: {
    title: "Калькулятор фінансової свободи (FIRE) — Канада",
    description:
      "Дізнайся точну дату фінансової свободи. FIRE калькулятор з канадським контекстом: 4% rule, exempt market стратегія. Безкоштовно. Licensed Dealing Representative.",
    ogTitle: "Коли ти станеш фінансово вільним? — FIRE калькулятор",
    ogDesc: "Точна дата freedom на основі твоїх цифр. Побач як exempt market прискорює це на роки.",
    twDesc: "Дізнайся свою дату фінансової свободи.",
  },
  ru: {
    title: "Калькулятор финансовой свободы (FIRE) — Канада",
    description:
      "Узнай точную дату финансовой свободы. FIRE калькулятор с канадским контекстом: 4% rule, exempt market стратегия. Бесплатно. Licensed Dealing Representative.",
    ogTitle: "Когда ты станешь финансово свободным? — FIRE калькулятор",
    ogDesc: "Точная дата freedom на основе твоих цифр. Увидь как exempt market ускоряет это на годы.",
    twDesc: "Узнай свою дату финансовой свободы.",
  },
  en: {
    title: "Financial Freedom (FIRE) calculator — Canada",
    description:
      "Get your exact financial-independence date. FIRE calculator with Canadian context: 4% rule, exempt-market accelerator. Free. Licensed Dealing Representative.",
    ogTitle: "When will you be financially free? — FIRE calculator",
    ogDesc: "Exact freedom date based on your numbers. See how exempt market accelerates it by years.",
    twDesc: "Find your financial-freedom date.",
  },
};

export async function generateMetadata({ params }) {
  const { locale } = await params;
  const m = META[locale] || META.uk;
  const path = `/${locale}/calculators/financial-freedom`;
  const alternates = Object.fromEntries(
    SUPPORTED_LOCALES.map((l) => [
      { uk: "uk-UA", ru: "ru-RU", en: "en-CA" }[l],
      `/${l}/calculators/financial-freedom`,
    ])
  );
  alternates["x-default"] = "/uk/calculators/financial-freedom";
  return {
    title: m.title,
    description: m.description,
    keywords: [
      "FIRE калькулятор", "фінансова свобода калькулятор", "financial freedom calculator Canada",
      "FIRE Canada", "4% rule калькулятор", "коли вийти на пенсію калькулятор",
      "exempt market інвестиції", "passive income Канада",
    ],
    alternates: { canonical: path, languages: alternates },
    openGraph: {
      title: m.ogTitle,
      description: m.ogDesc,
      url: `https://sky-fort.ca${path}`,
      type: "website",
      images: [{ url: "/og-image.png", width: 1200, height: 630, alt: "SkyFort FIRE Calculator" }],
    },
    twitter: {
      card: "summary_large_image",
      title: m.ogTitle,
      description: m.twDesc,
      images: ["/og-image.png"],
    },
  };
}

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebApplication",
      name: "Financial Freedom (FIRE) Calculator",
      applicationCategory: "FinanceApplication",
      operatingSystem: "Web",
      url: "https://sky-fort.ca/uk/calculators/financial-freedom",
      description:
        "Free FIRE calculator with Canadian context. Calculate your financial-independence date using the 4% rule and 3.5% safe withdrawal rate, with exempt market strategy comparison. Trilingual.",
      inLanguage: ["uk", "ru", "en"],
      offers: { "@type": "Offer", price: "0", priceCurrency: "CAD" },
      provider: { "@type": "FinancialService", name: "SkyFort Wealth", url: "https://sky-fort.ca" },
    },
    {
      "@type": "HowTo",
      name: "How to calculate your financial-independence date",
      description:
        "Estimate when you can stop working using the 4% rule (FI Standard) and 3.5% safe withdrawal rate (FI Safe), with Canadian tax and exempt-market context.",
      totalTime: "PT3M",
      estimatedCost: { "@type": "MonetaryAmount", currency: "CAD", value: "0" },
      tool: [{ "@type": "HowToTool", name: "SkyFort FIRE Calculator" }],
      step: [
        { "@type": "HowToStep", position: 1, name: "Enter age and income", text: "Your current age, monthly take-home income after tax." },
        { "@type": "HowToStep", position: 2, name: "Enter monthly expenses", text: "What you actually spend per month. The smaller the gap with income, the longer to FI." },
        { "@type": "HowToStep", position: 3, name: "Enter current savings", text: "Total invested assets across all accounts (TFSA, RRSP, non-registered)." },
        { "@type": "HowToStep", position: 4, name: "Compare return scenarios", text: "See FI date for balanced (8%), aggressive (10%), and exempt-market-blended portfolios." },
        { "@type": "HowToStep", position: 5, name: "Choose your path", text: "Decide whether to optimize savings rate or seek higher returns via Eligible-Investor strategies." },
      ],
    },
  ],
};

export default async function Page({ params }) {
  const { locale } = await params;
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <FIRECalculator locale={locale} />
      <StaticFaq
        faq={FAQ[locale] || FAQ.uk}
        heading={FAQ_HEADING[locale] || FAQ_HEADING.uk}
        jsonLdId={`https://sky-fort.ca/${locale}/calculators/financial-freedom#faq`}
      />
    </>
  );
}
