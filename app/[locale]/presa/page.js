// app/[locale]/presa/page.js
// Press / Media page. Placeholder per audit recommendation 3.20:
// "Even an empty press page with 'Available for press inquiries on: exempt
// market, newcomer finance, Calgary commercial real estate' tells journalists
// you're available and tells Google you're an expected source."
//
// Editorial signal for Google's YMYL helpful-content algorithm + practical
// inbox for genuine press inquiries. Updates here over time as backlinks
// land (Advisor.ca, Investment Executive, Wealth Professional Canada, etc.).

import Link from "next/link";
import { Mail, Phone, Newspaper, MessageSquare, FileText, ExternalLink } from "lucide-react";
import Logo from "../../_components/Logo";
import Breadcrumbs from "../../_components/Breadcrumbs";
import LangSwitcher from "../../_components/LangSwitcher";
import { SUPPORTED_LOCALES } from "../../_i18n/dictionary";
import { CONFIG } from "../../_i18n/config";

const NRD_URL =
  "https://info.securities-administrators.ca/nrsmobile/nrssearch.aspx";

const COPY = {
  uk: {
    title: "Преса · Медіа",
    titleMeta: "Преса / Медіа — Andrii Andriushchenko",
    descriptionMeta:
      "Andrii Andriushchenko, Licensed Dealing Representative — доступний для коментарів медіа з тем exempt market, фінанси для українців у Канаді, real estate в Калгарі, CSA/CIRO регуляція.",
    intro:
      "Я доступний для коментарів, інтерв'ю та експертних виступів. Працюю з медіа українською, російською та англійською.",
    expertiseTitle: "Експертні теми",
    expertise: [
      { icon: Newspaper, title: "Exempt market у Канаді", desc: "MIC, REITs, private lending. Як працює CSA NI 45-106. Хто такі Eligible / Accredited Investors. Чому це окремий клас активів від публічного ринку." },
      { icon: MessageSquare, title: "Фінанси для українців-новоприбулих", desc: "CUAET, перші кроки в TFSA/RRSP/FHSA, типові помилки. Чому банки не пояснюють найкорисніше. Як рахувати compound interest у канадських реаліях." },
      { icon: FileText, title: "Real estate в Калгарі", desc: "Іпотечна математика, OSFI stress test, CMHC. Тренди commercial real estate у Альберті. Income property vs primary residence для новоприбулих." },
      { icon: Newspaper, title: "Регуляція + finfluencer compliance", desc: "Joint CSA/CIRO Staff Notice 31-369 (грудень 2025). Що дозволено / заборонено зареєстрованим Dealing Representatives у соцмережах. KYC + Suitability Assessment у NI 31-103." },
    ],
    contactTitle: "Контакт для преси",
    contactNote:
      "Я зазвичай відповідаю протягом 24 годин у робочі дні. Для термінових запитів — телефон.",
    boilerplateTitle: "Boilerplate (для довідки)",
    boilerplate: `Andrii Andriushchenko — Licensed Dealing Representative, зареєстрований з Axcess Capital Advisors Inc. (Exempt Market Dealer). Особисто ліцензований в Альберті, Британській Колумбії та Онтаріо. NRD #4575551. Сфера ліцензії — exempt market securities (приватні MICs, REITs, development LPs, private lending). Заснував SkyFort Wealth — освітній сайт для україно/російськомовних newcomers у Канаді (sky-fort.ca). Базується у Калгарі, AB.`,
    verifyLabel: "Перевірити реєстрацію (CSA NRD)",
    crumbHome: "Головна",
    crumbPress: "Преса",
  },
  ru: {
    title: "Пресса · Медиа",
    titleMeta: "Пресса / Медиа — Andrii Andriushchenko",
    descriptionMeta:
      "Andrii Andriushchenko, Licensed Dealing Representative — доступен для комментариев медиа по темам exempt market, финансы для русскоязычных в Канаде, real estate в Калгари, CSA/CIRO регуляция.",
    intro:
      "Я доступен для комментариев, интервью и экспертных выступлений. Работаю с медиа на украинском, русском и английском.",
    expertiseTitle: "Экспертные темы",
    expertise: [
      { icon: Newspaper, title: "Exempt market в Канаде", desc: "MIC, REITs, private lending. Как работает CSA NI 45-106. Кто такие Eligible / Accredited Investors. Почему это отдельный класс активов от публичного рынка." },
      { icon: MessageSquare, title: "Финансы для русскоязычных newcomers", desc: "CUAET, первые шаги в TFSA/RRSP/FHSA, типичные ошибки. Почему банки не объясняют самое полезное. Как считать compound interest в канадских реалиях." },
      { icon: FileText, title: "Real estate в Калгари", desc: "Ипотечная математика, OSFI stress test, CMHC. Тренды commercial real estate в Альберте. Income property vs primary residence для новоприбывших." },
      { icon: Newspaper, title: "Регуляция + finfluencer compliance", desc: "Joint CSA/CIRO Staff Notice 31-369 (декабрь 2025). Что разрешено / запрещено зарегистрированным Dealing Representatives в соцсетях. KYC + Suitability Assessment в NI 31-103." },
    ],
    contactTitle: "Контакт для прессы",
    contactNote:
      "Я обычно отвечаю в течение 24 часов в рабочие дни. Для срочных запросов — телефон.",
    boilerplateTitle: "Boilerplate (для справки)",
    boilerplate: `Andrii Andriushchenko — Licensed Dealing Representative, зарегистрирован с Axcess Capital Advisors Inc. (Exempt Market Dealer). Лично лицензирован в Альберте, Британской Колумбии и Онтарио. NRD #4575551. Сфера лицензии — exempt market securities (частные MICs, REITs, development LPs, private lending). Основал SkyFort Wealth — образовательный сайт для украино/русскоязычных newcomers в Канаде (sky-fort.ca). Базируется в Калгари, AB.`,
    verifyLabel: "Проверить регистрацию (CSA NRD)",
    crumbHome: "Главная",
    crumbPress: "Пресса",
  },
  en: {
    title: "Press · Media",
    titleMeta: "Press / Media — Andrii Andriushchenko",
    descriptionMeta:
      "Andrii Andriushchenko, Licensed Dealing Representative — available for media commentary on exempt market, newcomer finance in Canada, Calgary real estate, CSA/CIRO regulation.",
    intro:
      "Available for commentary, interviews, and expert appearances. I work with press in Ukrainian, Russian, and English.",
    expertiseTitle: "Areas of expertise",
    expertise: [
      { icon: Newspaper, title: "Exempt market in Canada", desc: "MICs, REITs, private lending. How CSA NI 45-106 works. Who Eligible / Accredited Investors are. Why this is a distinct asset class from public markets." },
      { icon: MessageSquare, title: "Finance for newcomer Canadians", desc: "CUAET, first steps in TFSA/RRSP/FHSA, common mistakes. Why banks don't explain the most useful parts. How compound interest actually plays out in the Canadian system." },
      { icon: FileText, title: "Real estate in Calgary", desc: "Mortgage math, OSFI stress test, CMHC. Calgary commercial real estate trends. Income property vs primary residence trade-offs for newcomers." },
      { icon: Newspaper, title: "Regulation + finfluencer compliance", desc: "Joint CSA/CIRO Staff Notice 31-369 (December 2025). What's allowed and not allowed for registered Dealing Representatives on social media. KYC + Suitability Assessment under NI 31-103." },
    ],
    contactTitle: "Press contact",
    contactNote:
      "I usually respond within 24 hours on business days. For urgent requests — phone.",
    boilerplateTitle: "Boilerplate (for reference)",
    boilerplate: `Andrii Andriushchenko is a Licensed Dealing Representative registered with Axcess Capital Advisors Inc. (Exempt Market Dealer). Personally licensed in Alberta, British Columbia, and Ontario. NRD #4575551. License scope: exempt market securities (private MICs, REITs, development LPs, private lending). Founder of SkyFort Wealth — an educational site for Ukrainian/Russian-speaking newcomers to Canada (sky-fort.ca). Based in Calgary, AB.`,
    verifyLabel: "Verify registration (CSA NRD)",
    crumbHome: "Home",
    crumbPress: "Press",
  },
};

export async function generateStaticParams() {
  return SUPPORTED_LOCALES.map((locale) => ({ locale }));
}

export async function generateMetadata({ params }) {
  const { locale } = await params;
  const c = COPY[locale] || COPY.uk;
  const path = `/${locale}/presa`;
  const alternates = Object.fromEntries(
    SUPPORTED_LOCALES.map((l) => [
      { uk: "uk-UA", ru: "ru-RU", en: "en-CA" }[l],
      `/${l}/presa`,
    ])
  );
  alternates["x-default"] = "/uk/presa";
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
  };
}

export default async function PressPage({ params }) {
  const { locale } = await params;
  const c = COPY[locale] || COPY.uk;

  // Person + Organization JSON-LD here (in addition to root) — Google's
  // press-mention algorithms specifically look for press-page schema as a
  // weak ranking signal for "expected source" status.
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebPage",
        "@id": `https://sky-fort.ca${`/${locale}/presa`}`,
        url: `https://sky-fort.ca${`/${locale}/presa`}`,
        name: c.titleMeta,
        description: c.descriptionMeta,
        inLanguage: { uk: "uk-UA", ru: "ru-RU", en: "en-CA" }[locale],
      },
      {
        "@type": "Person",
        "@id": "https://sky-fort.ca/pro-mene#person",
        name: "Andrii Andriushchenko",
        jobTitle: "Licensed Dealing Representative",
        worksFor: { "@type": "Organization", name: "Axcess Capital Advisors Inc." },
        email: CONFIG.email,
        telephone: CONFIG.phone,
        identifier: "NRD 4575551",
        knowsLanguage: ["uk", "ru", "en"],
        knowsAbout: [
          "Exempt market investments",
          "MIC (Mortgage Investment Corporation)",
          "REIT",
          "Private lending",
          "TFSA",
          "RRSP",
          "FHSA",
          "Canadian newcomer finance",
          "CSA NI 31-103",
          "CSA NI 45-106",
          "CIRO regulation",
        ],
        url: `https://sky-fort.ca/${locale}/pro-mene`,
      },
    ],
  };

  return (
    <main id="main" className="min-h-screen bg-[var(--color-bg)] text-white">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* NAV */}
      <nav className="fixed inset-x-0 top-0 z-50 border-b border-[#2a2a2a] bg-[#191919]/80 backdrop-blur-xl">
        <div className="mx-auto flex max-w-5xl items-center justify-between px-6 py-4">
          <Link href={`/${locale}`}><Logo variant="full" /></Link>
          <LangSwitcher locale={locale} />
        </div>
      </nav>

      <div className="mx-auto max-w-5xl px-6 pt-28">
        <Breadcrumbs
          items={[
            { label: c.crumbHome, href: `/${locale}` },
            { label: c.crumbPress },
          ]}
        />

        {/* HERO */}
        <header className="mt-10 pb-10">
          <h1 className="font-display-tight text-5xl text-white md:text-7xl">{c.title}</h1>
          <p className="mt-6 max-w-2xl text-lg leading-relaxed text-[#a3a3a3]">{c.intro}</p>
        </header>

        {/* EXPERTISE */}
        <section className="mt-8 pb-16">
          <h2 className="font-display text-3xl text-white md:text-4xl">{c.expertiseTitle}</h2>
          <ul className="mt-8 grid gap-4 md:grid-cols-2">
            {c.expertise.map((item, i) => {
              const Icon = item.icon;
              return (
                <li key={i} className="rounded-2xl border border-[var(--color-border)] bg-[var(--color-bg-card)] p-6">
                  <div className="mb-3 flex items-center gap-3">
                    <Icon className="h-5 w-5 text-[var(--color-brand)]" aria-hidden="true" />
                    <h3 className="font-bold text-white">{item.title}</h3>
                  </div>
                  <p className="text-sm leading-relaxed text-[#a3a3a3]">{item.desc}</p>
                </li>
              );
            })}
          </ul>
        </section>

        {/* CONTACT */}
        <section className="mt-8 pb-16">
          <h2 className="font-display text-3xl text-white md:text-4xl">{c.contactTitle}</h2>
          <p className="mt-3 text-sm text-[#a3a3a3]">{c.contactNote}</p>
          <ul className="mt-8 grid gap-4 md:grid-cols-2">
            <li className="rounded-2xl border border-[var(--color-brand)]/30 bg-[var(--color-brand)]/5 p-6">
              <div className="mb-3 flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[var(--color-brand)]">
                <Mail className="h-3.5 w-3.5" aria-hidden="true" /> Email
              </div>
              <a
                href={`mailto:${CONFIG.email}?subject=Press%20inquiry`}
                className="break-all text-lg font-semibold text-white hover:text-[var(--color-brand)]"
              >
                {CONFIG.email}
              </a>
            </li>
            <li className="rounded-2xl border border-[var(--color-border)] bg-[var(--color-bg-card)] p-6">
              <div className="mb-3 flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#a3a3a3]">
                <Phone className="h-3.5 w-3.5" aria-hidden="true" /> Phone
              </div>
              <a
                href={`tel:${CONFIG.phone.replace(/\D/g, "")}`}
                className="text-lg font-semibold text-white hover:text-[var(--color-brand)]"
              >
                {CONFIG.phone}
              </a>
            </li>
          </ul>
        </section>

        {/* BOILERPLATE */}
        <section className="mt-8 pb-24">
          <h2 className="font-display text-3xl text-white md:text-4xl">{c.boilerplateTitle}</h2>
          <div className="mt-6 rounded-2xl border border-[var(--color-border)] bg-[var(--color-bg-card)] p-6 md:p-8">
            <p className="text-base leading-relaxed text-[#c4c4c4]">{c.boilerplate}</p>
            <a
              href={NRD_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-[var(--color-brand)] hover:text-[var(--color-brand-hover)]"
            >
              <ExternalLink className="h-4 w-4" aria-hidden="true" />
              {c.verifyLabel}
            </a>
          </div>
        </section>
      </div>
    </main>
  );
}
