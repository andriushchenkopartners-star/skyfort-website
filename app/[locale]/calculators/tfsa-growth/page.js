import TFSACalculator from "./calculator";
import StaticFaq from "../../../_components/StaticFaq";
import RelatedLinks from "../../../_components/RelatedLinks";
import { SUPPORTED_LOCALES } from "../../../_i18n/dictionary";

// ─── Internal linking — adjacent calculators + relevant pillar posts ────────
const RELATED = {
  uk: {
    heading: "Що далі",
    items: [
      { href: "/uk/blog/tfsa-dlya-ukrayintsiv-povny-gayd-2026", label: "TFSA для українців у Канаді — повний гайд 2026", description: "3000+ слів про ліміти, ETF, типові помилки новоприбулих." },
      { href: "/uk/blog/rrsp-vs-tfsa-pershi-5-rokiv-v-kanadi", label: "RRSP vs TFSA: що обрати в перші 5 років", description: "Коли TFSA б'є RRSP — і коли навпаки." },
      { href: "/uk/calculators/financial-freedom", label: "Калькулятор фінансової свободи", description: "Дізнайся точну дату FI на основі своїх цифр." },
      { href: "/uk/calculators/mortgage", label: "Іпотечний калькулятор Канада", description: "Stress test, CMHC, дострокове погашення — все в одному." },
    ],
  },
  ru: {
    heading: "Что дальше",
    items: [
      { href: "/ru/blog/tfsa-dlya-ukrayintsiv-povny-gayd-2026", label: "TFSA для украиноязычных в Канаде — полный гайд 2026", description: "3000+ слов о лимитах, ETF, типичных ошибках новоприбывших." },
      { href: "/ru/blog/rrsp-vs-tfsa-pershi-5-rokiv-v-kanadi", label: "RRSP vs TFSA: что выбрать в первые 5 лет", description: "Когда TFSA бьёт RRSP — и когда наоборот." },
      { href: "/ru/calculators/financial-freedom", label: "Калькулятор финансовой свободы", description: "Узнай точную дату FI на основе своих цифр." },
      { href: "/ru/calculators/mortgage", label: "Ипотечный калькулятор Канада", description: "Stress test, CMHC, досрочное погашение — всё в одном." },
    ],
  },
  en: {
    heading: "What's next",
    items: [
      { href: "/en/calculators/financial-freedom", label: "Financial Freedom (FIRE) calculator", description: "Get your exact FI date based on your real numbers." },
      { href: "/en/calculators/mortgage", label: "Canadian mortgage calculator", description: "Stress test, CMHC, early payoff, break-penalty — all in one." },
      { href: "/en/blog", label: "Browse the blog", description: "Pillar guides on TFSA, RRSP, FHSA, FIRE, and Canadian real estate." },
      { href: "/en/pro-mene", label: "About Andrii", description: "Licensed Dealing Representative, Calgary. Educational only — no commissions." },
    ],
  },
};

// ─── FAQ content (educational, NOT advice) ──────────────────────────────────
// Visible accordion + matching FAQPage JSON-LD for Google rich snippets.
// All answers are framed as concept/framework explanation — no specific
// product recommendation, no return promises, EMD-compliant. Limits and
// account mechanics are verifiable against CRA.

const FAQ = {
  uk: [
    {
      q: "Який ліміт TFSA у 2026 році?",
      a: "Річний ліміт CRA — $7,000 на 2026 рік. Якщо ти повнолітній резидент Канади і ніколи не вносив, у тебе може накопичитися room з кожного року, починаючи з твого 18-річчя (або з 2009 — року запуску TFSA, якщо тобі вже було 18). Точний room перевір у своєму CRA My Account.",
    },
    {
      q: "Чи зменшує внесок у TFSA мій податок?",
      a: "Ні. На відміну від RRSP, внесок у TFSA робиться з після-податкового доходу — податкового відрахування немає. Зате весь майбутній ріст і виплати — без податку взагалі. Це робить TFSA особливо цінним для довгострокового compound росту.",
    },
    {
      q: "Чи можу тримати ETF у TFSA?",
      a: "Так. TFSA — це не продукт, а тип рахунку (tax wrapper). У ньому можна тримати готівку, GIC, ETF, акції, mutual funds, bonds. Багато новоприбулих помилково тримають у TFSA лише savings account з 1–2% — це втрачені compound роки.",
    },
    {
      q: "Що буде якщо я виведу гроші з TFSA?",
      a: "Сума виведення додається назад у твій contribution room наступного календарного року (1 січня). Це робить TFSA дуже гнучким — на відміну від RRSP, де виведення оподатковується і room назавжди втрачається.",
    },
    {
      q: "Який реальний дохід можна очікувати від ETF?",
      a: "Широкі ринкові ETF (приклади: XEQT, XGRO, VFV, VEQT) історично давали 7–11% річних за 30+ років з реінвестицією дивідендів. Минула дохідність не гарантує майбутньої — короткострокова волатильність може бути −20% або більше у поганий рік.",
    },
    {
      q: "Чи показує калькулятор реальні цифри?",
      a: "Калькулятор використовує формулу compound interest з усередненим річним приростом. Реальні ринки волатильні — фактичний результат буде варіюватися рік до року. Цифри тут — освітня оцінка для довгострокового планування, а не гарантія і не персональна порада.",
    },
  ],
  ru: [
    {
      q: "Какой лимит TFSA в 2026 году?",
      a: "Годовой лимит CRA — $7,000 на 2026 год. Если ты совершеннолетний резидент Канады и никогда не вносил, у тебя может накопиться room с каждого года, начиная с 18-летия (или с 2009 — года запуска TFSA, если тебе уже было 18). Точный room проверь в своём CRA My Account.",
    },
    {
      q: "Уменьшает ли взнос в TFSA мой налог?",
      a: "Нет. В отличие от RRSP, взнос в TFSA делается из после-налогового дохода — налогового вычета нет. Зато весь будущий рост и выплаты — без налога вообще. Это делает TFSA особенно ценным для долгосрочного compound роста.",
    },
    {
      q: "Могу ли я держать ETF в TFSA?",
      a: "Да. TFSA — это не продукт, а тип счёта (tax wrapper). В нём можно держать наличные, GIC, ETF, акции, mutual funds, bonds. Многие новоприбывшие ошибочно держат в TFSA только savings account с 1–2% — это потерянные compound годы.",
    },
    {
      q: "Что будет если я выведу деньги из TFSA?",
      a: "Сумма вывода добавляется обратно в твой contribution room в следующем календарном году (1 января). Это делает TFSA очень гибким — в отличие от RRSP, где вывод облагается налогом и room навсегда теряется.",
    },
    {
      q: "Какой реальный доход можно ожидать от ETF?",
      a: "Широкие рыночные ETF (примеры: XEQT, XGRO, VFV, VEQT) исторически давали 7–11% годовых за 30+ лет с реинвестицией дивидендов. Прошлая доходность не гарантирует будущей — краткосрочная волатильность может быть −20% или больше в плохой год.",
    },
    {
      q: "Показывает ли калькулятор реальные цифры?",
      a: "Калькулятор использует формулу compound interest со средним годовым приростом. Реальные рынки волатильны — фактический результат будет варьироваться год к году. Цифры здесь — образовательная оценка для долгосрочного планирования, а не гарантия и не персональная рекомендация.",
    },
  ],
  en: [
    {
      q: "What's the TFSA limit for 2026?",
      a: "The CRA annual limit for 2026 is $7,000. If you're a Canadian resident over 18 and have never contributed, you may have accumulated room from every year since you turned 18 (or since 2009 — when TFSA launched — if you were already 18 then). Check your exact room in your CRA My Account.",
    },
    {
      q: "Does a TFSA contribution reduce my taxes?",
      a: "No. Unlike RRSP, TFSA contributions come from after-tax income — there's no tax deduction. But all future growth and withdrawals are completely tax-free. This makes TFSA especially valuable for long-term compounding.",
    },
    {
      q: "Can I hold ETFs in a TFSA?",
      a: "Yes. TFSA isn't a product — it's an account type (tax wrapper). You can hold cash, GICs, ETFs, stocks, mutual funds, and bonds inside it. Many newcomers mistakenly keep only a savings account in TFSA at 1–2% — those are lost compound years.",
    },
    {
      q: "What happens if I withdraw from my TFSA?",
      a: "The withdrawal amount gets added back to your contribution room in the following calendar year (January 1). This makes TFSA very flexible — unlike RRSP, where withdrawals are taxed and room is permanently lost.",
    },
    {
      q: "What return can I realistically expect from ETFs?",
      a: "Broad-market ETFs (examples: XEQT, XGRO, VFV, VEQT) have historically returned 7–11% annually over 30+ years with dividend reinvestment. Past returns don't guarantee future ones — short-term volatility can be −20% or more in a bad year.",
    },
    {
      q: "Does the calculator show real numbers?",
      a: "The calculator uses a compound-interest formula with an averaged annual return. Real markets are volatile — your actual result will vary year to year. Numbers here are an educational estimate for long-term planning, not a guarantee or personalized advice.",
    },
  ],
};

const FAQ_HEADING = {
  uk: "Часті питання про TFSA",
  ru: "Частые вопросы про TFSA",
  en: "TFSA frequently asked questions",
};

const META = {
  uk: {
    title: "TFSA калькулятор — скільки буде через 20 років",
    description:
      "Безкоштовний TFSA калькулятор для Канади. Порахуй ріст compound interest, порівняй банк, GIC та ETF. Від Licensed Dealing Representative у Калгарі.",
    ogTitle: "TFSA калькулятор — скільки буде у твоєму TFSA через 20 років?",
    ogDesc:
      "Реальна математика compound interest. Порівняй банк, GIC і ETF — побач різницю своїми очима.",
    twDesc: "Порахуй ріст TFSA. Порівняй банк, GIC, ETF.",
  },
  ru: {
    title: "TFSA калькулятор — сколько будет через 20 лет",
    description:
      "Бесплатный TFSA калькулятор для Канады. Посчитай рост compound interest, сравни банк, GIC и ETF. От Licensed Dealing Representative в Калгари.",
    ogTitle: "TFSA калькулятор — сколько будет в твоём TFSA через 20 лет?",
    ogDesc:
      "Реальная математика compound interest. Сравни банк, GIC и ETF — увидь разницу своими глазами.",
    twDesc: "Посчитай рост TFSA. Сравни банк, GIC, ETF.",
  },
  en: {
    title: "TFSA calculator — how much in 20 years",
    description:
      "Free Canadian TFSA calculator. Run compound interest math, compare bank, GIC, and ETF. From a Licensed Dealing Representative in Calgary.",
    ogTitle: "TFSA calculator — how much will your TFSA have in 20 years?",
    ogDesc:
      "Real compound-interest math. Compare bank, GIC and ETF — see the gap with your own eyes.",
    twDesc: "Calculate TFSA growth. Compare bank, GIC, ETF.",
  },
};

export async function generateMetadata({ params }) {
  const { locale } = await params;
  const m = META[locale] || META.uk;
  const path = `/${locale}/calculators/tfsa-growth`;
  const alternates = Object.fromEntries(
    SUPPORTED_LOCALES.map((l) => [
      { uk: "uk", ru: "ru", en: "en-CA" }[l],
      `/${l}/calculators/tfsa-growth`,
    ])
  );
  alternates["x-default"] = "/uk/calculators/tfsa-growth";
  return {
    title: m.title,
    description: m.description,
    keywords: [
      "TFSA калькулятор", "TFSA калькулятор Канада", "TFSA growth calculator",
      "compound interest калькулятор", "TFSA vs GIC", "TFSA ETF Канада",
      "інвестиційний калькулятор українцям", "TFSA Calgary",
    ],
    alternates: { canonical: path, languages: alternates },
    openGraph: {
      title: m.ogTitle,
      description: m.ogDesc,
      url: `https://sky-fort.ca${path}`,
      type: "website",
      // images: omitted — opengraph-image.js in this folder generates a
      // branded per-locale card via Satori (next/og) and auto-overrides.
    },
    twitter: {
      card: "summary_large_image",
      title: m.ogTitle,
      description: m.twDesc,
      // Twitter falls back to the OG image when no twitter-image.js exists.
    },
  };
}

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebApplication",
      name: "TFSA Growth Calculator",
      applicationCategory: "FinanceApplication",
      operatingSystem: "Web",
      url: "https://sky-fort.ca/uk/calculators/tfsa-growth",
      description:
        "Free TFSA growth calculator with compound interest math. Compare bank savings, GIC, and ETF strategies. Trilingual (Ukrainian/Russian/English).",
      inLanguage: ["uk", "ru", "en"],
      offers: { "@type": "Offer", price: "0", priceCurrency: "CAD" },
      provider: { "@type": "FinancialService", name: "SkyFort Wealth", url: "https://sky-fort.ca" },
    },
    {
      "@type": "HowTo",
      name: "How to calculate TFSA growth over 20 years",
      description:
        "Calculate compound interest in a TFSA and compare bank savings, GIC, and ETF outcomes side-by-side.",
      totalTime: "PT2M",
      estimatedCost: { "@type": "MonetaryAmount", currency: "CAD", value: "0" },
      tool: [{ "@type": "HowToTool", name: "SkyFort TFSA Growth Calculator" }],
      step: [
        { "@type": "HowToStep", position: 1, name: "Enter your starting balance", text: "Type in what you already have in your TFSA (or 0 if you're starting fresh)." },
        { "@type": "HowToStep", position: 2, name: "Add monthly contribution", text: "How much do you plan to contribute each month? Default $500." },
        { "@type": "HowToStep", position: 3, name: "Pick a time horizon", text: "Set the number of years — 10, 20, or 30 — to see compound interest in action." },
        { "@type": "HowToStep", position: 4, name: "Compare scenarios", text: "Compare bank savings (1-2%), GIC (4-5%), and broad-market ETF (7-12% historical) outcomes." },
        { "@type": "HowToStep", position: 5, name: "Book a discovery call", text: "If the gap surprises you, book a free 30-minute call to discuss your real situation." },
      ],
    },
  ],
};

export default async function Page({ params }) {
  const { locale } = await params;
  const faq = FAQ[locale] || FAQ.uk;
  const heading = FAQ_HEADING[locale] || FAQ_HEADING.uk;

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <TFSACalculator locale={locale} />
      <StaticFaq
        faq={faq}
        heading={heading}
        jsonLdId={`https://sky-fort.ca/${locale}/calculators/tfsa-growth#faq`}
      />
      <RelatedLinks
        heading={(RELATED[locale] || RELATED.uk).heading}
        items={(RELATED[locale] || RELATED.uk).items}
      />
    </>
  );
}
