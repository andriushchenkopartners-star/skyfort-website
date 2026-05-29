// app/[locale]/calculators/mer-impact/page.js
// MER impact calculator — Larry-Bates-T-REX-inspired link magnet.
// Shows exactly how much of compound return gets eaten by mutual fund
// management expense ratios over a multi-decade horizon.
//
// Why this exists (Audit 6 #3.1): the strongest single AI-citation and
// shareable asset for a Canadian DR. Wealth-management content rarely
// quantifies fee drag concretely — making it visceral with real numbers
// is what got Larry Bates' T-REX score embedded across third-party sites
// (Passiv etc.).

import MerCalculator from "./calculator";
import StaticFaq from "../../../_components/StaticFaq";
import RelatedLinks from "../../../_components/RelatedLinks";
import AuthorByline from "../../../_components/AuthorByline";
import { SUPPORTED_LOCALES } from "../../../_i18n/dictionary";

const META = {
  uk: {
    title: "MER калькулятор: скільки комісії з'їдають за 30 років",
    description:
      "Banking mutual fund з MER 2% vs self-directed ETF 0.20% на 30-річному горизонті — побач реальну різницю у $. Інспіровано Larry Bates T-REX Score.",
  },
  ru: {
    title: "MER калькулятор: сколько комиссии съедают за 30 лет",
    description:
      "Banking mutual fund с MER 2% vs self-directed ETF 0.20% на 30-летнем горизонте — увидь реальную разницу в $. Inspired by Larry Bates T-REX Score.",
  },
  en: {
    title: "MER impact calculator: how much fees eat over 30 years",
    description:
      "Banking mutual fund at 2% MER vs self-directed ETF at 0.20% over 30 years — see the real dollar difference. Inspired by Larry Bates T-REX Score.",
  },
};

const FAQ = {
  uk: [
    {
      q: "Що таке MER і чому 2% це «багато»?",
      a: "MER (Management Expense Ratio) — щорічна комісія управляючого фонду, що автоматично віднімається з вартості твоїх unit-ів. Канадські банківські mutual funds типово мають MER 1.8-2.5%; self-directed ETF на Toronto Stock Exchange — 0.05-0.30%. На 30-річному горизонті 2% MER з'їдає **40-50% потенційного фінального капіталу** через compound effect (Larry Bates називає це T-REX = Total Return Efficiency Index).",
    },
    {
      q: "Якщо market return 8%, чому з MER 2% я не отримую 6%?",
      a: "Ти отримуєш ~6% net return — це правильно. Але compound math робить різницю набагато більшою за просту різницю rates. $500/міс × 30 років × 6% = $502K. $500/міс × 30 років × 8% = $745K. Різниця $243K — лише через 2% MER. У термінах годин праці: працював 30 років, віддав ~12 років роботи фонду-управителю.",
    },
    {
      q: "Що дає self-directed брокер замість банківського mutual fund?",
      a: "Self-directed account (Wealthsimple Trade $0 commissions, Questrade $0 ETF buy / $4.95-9.95 sell, Interactive Brokers institutional pricing) дозволяє купувати broad-market ETF з MER 0.05-0.30%: VFV (S&P 500, 0.09%), XEQT (all-equity diversified, 0.20%), VEQT (similar, 0.24%). Setup time ~30 хв. Save потенційно $200-400K за кар'єру.",
    },
    {
      q: "Чи я можу тримати ETF у TFSA / RRSP?",
      a: "Так — TFSA, RRSP, FHSA, RESP усі підтримують broad-market ETF без додаткових обмежень. Self-directed broker дозволяє відкрити будь-який з цих account types безкоштовно і купувати ETF з MER 0.05-0.30%. Це найшвидший шлях вийти з high-MER банківських mutual funds.",
    },
    {
      q: "Що робити з existing mutual funds у банку?",
      a: "Кроки: 1) Відкрий self-directed account у Wealthsimple/Questrade. 2) Запроси transfer-in form у новому broker — вони обробляють transfer з банку (можуть бути fees $50-150, broker часто rebate-ить їх). 3) Transfer in-kind (зберігає cost base) або all-in-cash (triggers tax if non-registered). 4) Продай mutual funds у новому account, купи broad-market ETF. Час: 2-4 тижні total.",
    },
  ],
  ru: [
    {
      q: "Что такое MER и почему 2% это «много»?",
      a: "MER (Management Expense Ratio) — ежегодная комиссия, автоматически вычитаемая. Канадские банковские mutual funds типично 1.8-2.5%; self-directed ETF — 0.05-0.30%. За 30 лет 2% MER съедает **40-50% потенциального финального капитала** через compound effect.",
    },
    {
      q: "Если market return 8%, почему с MER 2% не получаю 6%?",
      a: "Получаешь ~6% net — правильно. Но compound math делает разницу больше: $500/мес × 30 лет × 6% = $502K. × 8% = $745K. Разница $243K только из-за 2% MER.",
    },
    {
      q: "Что даёт self-directed broker?",
      a: "Wealthsimple Trade ($0 commissions), Questrade ($0 ETF buy), IB. Broad-market ETF с MER 0.05-0.30%: VFV (0.09%), XEQT (0.20%), VEQT (0.24%). Setup 30 мин.",
    },
    {
      q: "Можно ETF в TFSA/RRSP?",
      a: "Да — TFSA, RRSP, FHSA, RESP все поддерживают broad-market ETF.",
    },
    {
      q: "Что делать с existing mutual funds в банке?",
      a: "1) Открой self-directed. 2) Transfer-in form. 3) Transfer in-kind. 4) Продай mutual funds, купи ETF. Время 2-4 недели.",
    },
  ],
  en: [
    {
      q: "What is MER and why is 2% 'a lot'?",
      a: "MER (Management Expense Ratio) is the annual fee deducted automatically from fund units. Canadian bank mutual funds typically run 1.8-2.5%; self-directed ETFs on TSX run 0.05-0.30%. Over a 30-year horizon, 2% MER eats **40-50% of your potential final capital** via compound effect — Larry Bates calls this T-REX (Total Return Efficiency Index).",
    },
    {
      q: "If market returns 8%, why don't I get 6% with 2% MER?",
      a: "You DO get ~6% net return — that's correct. But compound math makes the gap much bigger: $500/mo × 30 yrs × 6% = $502K. Same × 8% = $745K. The $243K gap is purely the 2% MER. In hours-worked terms: ~12 years of your savings effort handed to the fund manager.",
    },
    {
      q: "What does a self-directed broker give me instead?",
      a: "Self-directed accounts (Wealthsimple Trade $0 commissions, Questrade $0 ETF buy / $4.95-9.95 sell, IB institutional pricing) let you buy broad-market ETFs at 0.05-0.30% MER: VFV (S&P 500, 0.09%), XEQT (all-equity diversified, 0.20%), VEQT (similar, 0.24%). 30-minute setup. Save potentially $200-400K over a career.",
    },
    {
      q: "Can I hold ETFs in TFSA / RRSP?",
      a: "Yes — TFSA, RRSP, FHSA, RESP all support broad-market ETFs with no extra restrictions. Self-directed broker lets you open any of these account types for free and buy ETFs at 0.05-0.30% MER.",
    },
    {
      q: "What about my existing bank mutual funds?",
      a: "Steps: 1) Open self-directed account at Wealthsimple/Questrade. 2) Request transfer-in form. 3) Transfer in-kind (preserves cost base) or all-in-cash (triggers tax if non-registered). 4) Sell mutual funds, buy broad-market ETF. Total time: 2-4 weeks.",
    },
  ],
};

const RELATED = {
  uk: {
    heading: "Пов'язані матеріали",
    items: [
      { href: "/uk/blog/tfsa-dlya-ukrayintsiv-povny-gayd-2026", label: "TFSA повний гайд", description: "Куди вкладати після виходу з high-MER funds." },
      { href: "/uk/calculators/tfsa-growth", label: "TFSA калькулятор", description: "Comparison банк vs GIC vs ETF на 20 років." },
      { href: "/uk/perevirka", label: "Перевір мою реєстрацію", description: "Якщо хочеш discovery call про exit з банківських funds." },
      { href: "/uk/slovnyk", label: "Словник: MER, ETF, mutual fund", description: "30+ термінів з джерелами." },
    ],
  },
  ru: {
    heading: "Связанные материалы",
    items: [
      { href: "/ru/blog/tfsa-dlya-ukrayintsiv-povny-gayd-2026", label: "TFSA полный гайд", description: "Куда вкладывать после выхода из high-MER funds." },
      { href: "/ru/calculators/tfsa-growth", label: "TFSA калькулятор", description: "Comparison банк vs GIC vs ETF на 20 лет." },
      { href: "/ru/perevirka", label: "Проверь регистрацию", description: "Discovery call про exit из банковских funds." },
      { href: "/ru/slovnyk", label: "Словарь: MER, ETF, mutual fund", description: "30+ терминов с источниками." },
    ],
  },
  en: {
    heading: "Related",
    items: [
      { href: "/en/blog/tfsa-dlya-ukrayintsiv-povny-gayd-2026", label: "TFSA complete guide", description: "Where to invest after exiting high-MER funds." },
      { href: "/en/calculators/tfsa-growth", label: "TFSA calculator", description: "Bank vs GIC vs ETF comparison over 20 years." },
      { href: "/en/perevirka", label: "Verify my registration", description: "Discovery call about exiting bank mutual funds." },
      { href: "/en/slovnyk", label: "Glossary: MER, ETF, mutual fund", description: "30+ source-attributed terms." },
    ],
  },
};

export async function generateStaticParams() {
  return SUPPORTED_LOCALES.map((locale) => ({ locale }));
}

export async function generateMetadata({ params }) {
  const { locale } = await params;
  const m = META[locale] || META.uk;
  const path = `/${locale}/calculators/mer-impact`;
  const alternates = Object.fromEntries(
    SUPPORTED_LOCALES.map((l) => [{ uk: "uk", ru: "ru", en: "en-CA" }[l], `/${l}/calculators/mer-impact`]),
  );
  alternates["x-default"] = "/uk/calculators/mer-impact";
  return {
    title: m.title,
    description: m.description,
    alternates: { canonical: path, languages: alternates },
    openGraph: { title: m.title, description: m.description, url: `https://sky-fort.ca${path}`, type: "website" },
    twitter: { card: "summary_large_image", title: m.title, description: m.description },
  };
}

export default async function MerImpactPage({ params }) {
  const { locale } = await params;
  const faq = FAQ[locale] || FAQ.uk;
  const rel = RELATED[locale] || RELATED.uk;
  const path = `/${locale}/calculators/mer-impact`;

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    name: META[locale]?.title || META.uk.title,
    description: META[locale]?.description || META.uk.description,
    url: `https://sky-fort.ca${path}`,
    applicationCategory: "FinanceApplication",
    operatingSystem: "Any",
    offers: { "@type": "Offer", price: "0", priceCurrency: "CAD" },
    datePublished: "2026-05-28",
    dateModified: "2026-05-28",
    author: {
      "@type": "Person",
      name: "Andrii Andriushchenko",
      jobTitle: "Licensed Dealing Representative",
      identifier: "NRD 4575551",
      url: `https://sky-fort.ca/${locale}/pro-mene`,
    },
  };

  return (
    <main id="main" className="min-h-screen bg-[var(--color-bg)] text-white">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <div className="mx-auto max-w-5xl px-6 pt-10 pb-8">
        <AuthorByline locale={locale} className="mb-6" />
      </div>
      <MerCalculator locale={locale} />
      <RelatedLinks heading={rel.heading} items={rel.items} />
      <StaticFaq faq={faq} heading={locale === "ru" ? "Частые вопросы" : locale === "en" ? "FAQ" : "Часті питання"} jsonLdId={`https://sky-fort.ca${path}#faq`} />
    </main>
  );
}
