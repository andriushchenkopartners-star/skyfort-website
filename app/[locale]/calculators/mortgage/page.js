import MortgageCalculator from "./calculator";
import StaticFaq from "../../../_components/StaticFaq";
import { SUPPORTED_LOCALES } from "../../../_i18n/dictionary";

// ─── FAQ (educational only; no advice; CMHC/OSFI rules verifiable) ──────────
const FAQ = {
  uk: [
    {
      q: "Який мінімальний downpayment в Канаді у 2026 році?",
      a: "5% від ціни до $500K + 10% від частини $500K–$1.5M. Понад $1.5M — мінімум 20%. Приклад: дім за $700K = $25K (5% від перших $500K) + $20K (10% від наступних $200K) = $45K мінімум. Якщо менше 20% — обов'язкова CMHC mortgage insurance.",
    },
    {
      q: "Що таке GDS і TDS і чому це важливо?",
      a: "GDS (Gross Debt Service) — частка валового доходу на житлові витрати (mortgage + property tax + heating + 50% condo fee). OSFI ліміт зазвичай 39%. TDS (Total Debt Service) додає всі інші борги (кредитки, авто, лінії кредиту). Ліміт 44%. Якщо перевищуєш — банк відмовить навіть якщо доходу формально вистачає.",
    },
    {
      q: "Що таке stress test і чому він знижує мою максимальну іпотеку?",
      a: "З 2018 OSFI вимагає кваліфікації за більшою з двох ставок: контрактна + 2% або 5.25% (мінімум). Тобто якщо твоя ставка 5.5%, банк перевіряє чи витягнеш платежі за 7.5%. Це зменшує максимальну суму іпотеки приблизно на 20%. Stress test застосовується і до insured, і до uninsured іпотек.",
    },
    {
      q: "CMHC mortgage insurance — скільки коштує і коли потрібна?",
      a: "Обов'язкова коли downpayment <20%. Премія додається до балансу іпотеки і розтягується на весь термін. Ставки 2026: 2.80% (5–9.99% down), 3.10% (10–14.99%), 4.00% (15–19.99%). У Калгарі ще додається 7% provincial tax на премію (одноразово готівкою при закритті).",
    },
    {
      q: "Bi-weekly accelerated дійсно економить?",
      a: "Так — це 26 платежів на рік замість 24 (semi-monthly) або 12 (monthly), тобто фактично один зайвий місячний платіж щороку. На іпотеці $500K під 5.5% на 25 років економія ~$50K відсотків і ~4 роки терміну. Це безкоштовний прийом — змінюєш тільки графік.",
    },
    {
      q: "Чи варто доплачувати кожен місяць або зробити lump sum?",
      a: "Більшість канадських іпотек дозволяють prepayment privilege 10–20% на рік (перевір у своєму контракті). Lump sum один раз на рік + щомісячна доплата — найшвидший шлях. На графіку калькулятора видно як кожен сценарій впливає на кінцеву економію відсотків і термін.",
    },
  ],
  ru: [
    {
      q: "Какой минимальный downpayment в Канаде в 2026 году?",
      a: "5% от цены до $500K + 10% от части $500K–$1.5M. Свыше $1.5M — минимум 20%. Пример: дом за $700K = $25K (5% от первых $500K) + $20K (10% от следующих $200K) = $45K минимум. Если меньше 20% — обязательная CMHC mortgage insurance.",
    },
    {
      q: "Что такое GDS и TDS и почему это важно?",
      a: "GDS (Gross Debt Service) — доля валового дохода на жилищные расходы (mortgage + property tax + heating + 50% condo fee). OSFI лимит обычно 39%. TDS (Total Debt Service) добавляет все другие долги (кредитки, авто, кредитные линии). Лимит 44%. Если превышаешь — банк откажет даже если дохода формально хватает.",
    },
    {
      q: "Что такое stress test и почему он снижает мою максимальную ипотеку?",
      a: "С 2018 OSFI требует квалификации по большей из двух ставок: контрактная + 2% или 5.25% (минимум). Если твоя ставка 5.5%, банк проверяет потянешь ли платежи по 7.5%. Это уменьшает максимальную сумму ипотеки примерно на 20%. Stress test применяется и к insured, и к uninsured ипотекам.",
    },
    {
      q: "CMHC mortgage insurance — сколько стоит и когда нужна?",
      a: "Обязательна когда downpayment <20%. Премия добавляется к балансу ипотеки и растягивается на весь срок. Ставки 2026: 2.80% (5–9.99% down), 3.10% (10–14.99%), 4.00% (15–19.99%). В Калгари ещё добавляется 7% provincial tax на премию (разово наличными при закрытии).",
    },
    {
      q: "Bi-weekly accelerated действительно экономит?",
      a: "Да — это 26 платежей в год вместо 24 (semi-monthly) или 12 (monthly), то есть фактически один лишний месячный платёж каждый год. На ипотеке $500K под 5.5% на 25 лет экономия ~$50K процентов и ~4 года срока. Это бесплатный приём — меняешь только график.",
    },
    {
      q: "Стоит ли доплачивать каждый месяц или сделать lump sum?",
      a: "Большинство канадских ипотек разрешают prepayment privilege 10–20% в год (проверь в своём контракте). Lump sum раз в год + ежемесячная доплата — самый быстрый путь. На графике калькулятора видно как каждый сценарий влияет на конечную экономию процентов и срок.",
    },
  ],
  en: [
    {
      q: "What's the minimum down payment in Canada for 2026?",
      a: "5% on the portion up to $500K + 10% on the portion from $500K–$1.5M. Above $1.5M requires 20% minimum. Example: a $700K home = $25K (5% of first $500K) + $20K (10% of next $200K) = $45K minimum. Anything under 20% triggers mandatory CMHC mortgage insurance.",
    },
    {
      q: "What are GDS and TDS and why do they matter?",
      a: "GDS (Gross Debt Service) is the share of gross income going to housing costs (mortgage + property tax + heating + 50% of condo fees). OSFI limit is usually 39%. TDS (Total Debt Service) adds all other debts (credit cards, car loans, lines of credit). Limit 44%. Exceed either and the bank says no — even if your income is technically enough.",
    },
    {
      q: "What's the stress test and why does it shrink my max mortgage?",
      a: "Since 2018 OSFI requires qualifying at the greater of contract rate + 2% or 5.25% (minimum). So if your rate is 5.5%, the bank checks whether you'd handle payments at 7.5%. This cuts your maximum mortgage by roughly 20%. The stress test applies to both insured and uninsured mortgages.",
    },
    {
      q: "How much does CMHC mortgage insurance cost and when is it required?",
      a: "Mandatory whenever your down payment is <20%. The premium is added to the mortgage balance and amortised over the full term. 2026 rates: 2.80% (5–9.99% down), 3.10% (10–14.99%), 4.00% (15–19.99%). In Alberta there's also a 7% provincial tax on the premium (paid in cash at closing).",
    },
    {
      q: "Does bi-weekly accelerated really save money?",
      a: "Yes — it's 26 payments a year instead of 24 (semi-monthly) or 12 (monthly), so you're effectively making one extra monthly payment each year. On a $500K mortgage at 5.5% over 25 years that's roughly $50K in interest saved and ~4 years off the term. Free trick — you only change the payment schedule.",
    },
    {
      q: "Should I pay extra monthly or make a lump sum?",
      a: "Most Canadian mortgages allow a prepayment privilege of 10–20% per year (check your contract). A yearly lump sum + a small monthly top-up is the fastest payoff. The chart on the calculator shows how each strategy changes total interest paid and remaining term.",
    },
  ],
};
const FAQ_HEADING = {
  uk: "Часті питання про канадську іпотеку",
  ru: "Частые вопросы про канадскую ипотеку",
  en: "Canadian mortgage FAQ",
};

const META = {
  uk: {
    title: "Канадський іпотечний калькулятор — 6 інструментів",
    description:
      "Іпотечний калькулятор для Канади: stress test (OSFI), CMHC, дострокове погашення, розрив контракту, інвестиційна нерухомість, доступність. Калгарі. Безкоштовно.",
    ogTitle: "Канадська іпотека — 6 інструментів в одному калькуляторі",
    ogDesc: "Stress test, CMHC, дострокове погашення, розрив контракту, інвестиція, доступність. Без сюрпризів.",
    twDesc: "6 інструментів: stress test, CMHC, дострокове погашення, і більше.",
  },
  ru: {
    title: "Канадский ипотечный калькулятор — 6 инструментов",
    description:
      "Ипотечный калькулятор для Канады: stress test (OSFI), CMHC, досрочное погашение, разрыв контракта, инвестиционная недвижимость, доступность. Калгари. Бесплатно.",
    ogTitle: "Канадская ипотека — 6 инструментов в одном калькуляторе",
    ogDesc: "Stress test, CMHC, досрочное погашение, разрыв контракта, инвестиция, доступность. Без сюрпризов.",
    twDesc: "6 инструментов: stress test, CMHC, досрочное погашение и больше.",
  },
  en: {
    title: "Canadian mortgage calculator — 6 tools",
    description:
      "Canadian mortgage calculator: OSFI stress test, CMHC, early payoff, break penalty, investment property cash flow, affordability. Calgary-focused. Free.",
    ogTitle: "Canadian mortgage — 6 tools in one calculator",
    ogDesc: "Stress test, CMHC, early payoff, break penalty, investment, affordability — no surprises.",
    twDesc: "6 tools: stress test, CMHC, early payoff, and more.",
  },
};

export async function generateMetadata({ params }) {
  const { locale } = await params;
  const m = META[locale] || META.uk;
  const path = `/${locale}/calculators/mortgage`;
  const alternates = Object.fromEntries(
    SUPPORTED_LOCALES.map((l) => [
      { uk: "uk-UA", ru: "ru-RU", en: "en-CA" }[l],
      `/${l}/calculators/mortgage`,
    ])
  );
  alternates["x-default"] = "/uk/calculators/mortgage";
  return {
    title: m.title,
    description: m.description,
    keywords: [
      "іпотечний калькулятор", "іпотека Калгарі", "mortgage calculator Calgary",
      "stress test калькулятор", "CMHC калькулятор", "mortgage stress test Canada",
      "дострокове погашення іпотеки", "канадська іпотека калькулятор",
      "affordability calculator Canada",
    ],
    alternates: { canonical: path, languages: alternates },
    openGraph: {
      title: m.ogTitle,
      description: m.ogDesc,
      url: `https://sky-fort.ca${path}`,
      type: "website",
      images: [{ url: "/og-image.png", width: 1200, height: 630, alt: "SkyFort Mortgage Calculator" }],
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
      name: "Canadian Mortgage Calculator",
      applicationCategory: "FinanceApplication",
      operatingSystem: "Web",
      url: "https://sky-fort.ca/uk/calculators/mortgage",
      description:
        "Free Canadian mortgage calculator with 6 tools: OSFI stress test, CMHC insurance, early payoff, lender switch penalty (IRD), investment property cash flow, and affordability. Trilingual.",
      inLanguage: ["uk", "ru", "en"],
      offers: { "@type": "Offer", price: "0", priceCurrency: "CAD" },
      provider: { "@type": "FinancialService", name: "SkyFort Wealth", url: "https://sky-fort.ca" },
    },
    {
      "@type": "HowTo",
      name: "How to check if you qualify for a Canadian mortgage (OSFI stress test)",
      description:
        "Use the qualifying rate (greater of contract rate + 2% or 5.25%) to check Gross Debt Service (GDS) and Total Debt Service (TDS) ratios against OSFI limits.",
      totalTime: "PT3M",
      estimatedCost: { "@type": "MonetaryAmount", currency: "CAD", value: "0" },
      tool: [{ "@type": "HowToTool", name: "SkyFort Mortgage Calculator" }],
      step: [
        { "@type": "HowToStep", position: 1, name: "Enter home price and down payment", text: "Type the property price and what you can put down (minimum 5% under $500K, 10% on the portion $500K-$1M)." },
        { "@type": "HowToStep", position: 2, name: "Pick rate and amortization", text: "Use today's posted contract rate and an amortization (25 years for insured, up to 30 for uninsured)." },
        { "@type": "HowToStep", position: 3, name: "Review stress-test result", text: "The calculator applies the qualifying rate and tells you the required household income to pass GDS (39%) and TDS (44%)." },
        { "@type": "HowToStep", position: 4, name: "Try CMHC premium", text: "Down payment under 20% triggers CMHC insurance — see the premium added to your mortgage balance." },
        { "@type": "HowToStep", position: 5, name: "Test scenarios", text: "Switch to bi-weekly accelerated, lump-sum prepayments, or break-penalty calculations to see how they change interest paid." },
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
      <MortgageCalculator locale={locale} />
      <StaticFaq
        faq={FAQ[locale] || FAQ.uk}
        heading={FAQ_HEADING[locale] || FAQ_HEADING.uk}
        jsonLdId={`https://sky-fort.ca/${locale}/calculators/mortgage#faq`}
      />
    </>
  );
}
