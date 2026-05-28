// app/[locale]/perevirka/page.js
// "Verify me in 3 minutes" trust page (audit recommendation 3.5).
// Step-by-step verification guide for every claim Andrii makes about his
// license. YMYL E-E-A-T signal: nothing earns trust faster than walking
// the visitor through public registry checks themselves.

import Link from "next/link";
import { ExternalLink, ShieldCheck, FileText, Search, AlertTriangle, Building2, Award } from "lucide-react";
import Logo from "../../_components/Logo";
import Breadcrumbs from "../../_components/Breadcrumbs";
import LangSwitcher from "../../_components/LangSwitcher";
import { SUPPORTED_LOCALES } from "../../_i18n/dictionary";

const NRD_URL = "https://info.securities-administrators.ca/nrsmobile/nrssearch.aspx";
const NRD_DIRECT = "https://info.securities-administrators.ca/nrsmobile/nrssearch.aspx?lang=EN";
const ASC_URL = "https://www.asc.ca/Public-Registrants/Registered-Firms-and-Individuals";
const OBSI_URL = "https://www.obsi.ca/en/index.aspx";
const IFSE_URL = "https://www.ifse.ca/courses/exempt-market-products-emp/";
const AXCESS_URL = "https://axcesscapital.ca/";
const CIRO_URL = "https://www.ciro.ca/";

const COPY = {
  uk: {
    titleMeta: "Перевір мою реєстрацію за 3 хвилини — Andrii Andriushchenko · SkyFort",
    descriptionMeta:
      "Покрокова перевірка: NRD #4575551, Axcess Capital реєстрація, IFSE EMP сертифікат, OBSI історія скарг. Освітня сторінка від Licensed DR.",
    kicker: "Прозорість",
    title: "Перевір мене за 3 хвилини",
    intro:
      "У фінансах довіра не повинна базуватись на словах. Усе про мене публічно — і ось як це знайти за 3 хвилини без додатків і реєстрацій.",
    whyTitle: "Чому це важливо",
    whyText:
      "У Канаді працюють тисячі «фінансових консультантів» — від банківських продавців до повністю нерегульованих TikTok-гуру. Регулятор (CSA — Canadian Securities Administrators) веде єдиний реєстр усіх ліцензованих professionals. Якщо ти не можеш знайти когось у NRD search — це червоний прапор, без винятків.",
    stepsTitle: "Як перевірити мене",
    steps: [
      {
        icon: Search,
        n: "01",
        title: "Перевір особисту реєстрацію (NRD)",
        body: "NRD (National Registration Database) — центральний реєстр CSA. Введи мій номер: 4575551. Побачиш моє ім'я, фірму (Axcess Capital Advisors Inc.), категорію (Dealing Representative — Exempt Market Dealer), провінції реєстрації (AB · BC · ON), дату ліцензії і будь-які minor offences (їх немає).",
        cta: "Відкрити NRD search",
        ctaUrl: NRD_DIRECT,
        ctaNote: "Запам'ятай: 4575551",
      },
      {
        icon: Building2,
        n: "02",
        title: "Перевір фірму (Axcess Capital)",
        body: "Я працюю через Axcess Capital Advisors Inc. — зареєстровану як Exempt Market Dealer у Альберті. На сайті ASC (Alberta Securities Commission) можеш знайти firm-level реєстрацію: ліцензія, статус (active), будь-які регуляторні дії (none).",
        cta: "ASC Registered Firms",
        ctaUrl: ASC_URL,
        ctaNote: "Шукай: «Axcess Capital Advisors Inc.»",
      },
      {
        icon: Award,
        n: "03",
        title: "Перевір кваліфікацію (IFSE EMP)",
        body: "Для роботи Dealing Representative потрібно пройти Exempt Market Proficiency Course від IFSE Institute (підрозділ IFIC). Я завершив його у 2024 році. На сайті IFSE — опис курсу, програма, акредитація CSA. Без цього сертифіката NRD реєстрація неможлива.",
        cta: "IFSE EMP course",
        ctaUrl: IFSE_URL,
      },
      {
        icon: AlertTriangle,
        n: "04",
        title: "Перевір історію скарг (OBSI)",
        body: "OBSI — Ombudsman for Banking Services and Investments — незалежний публічний канал розгляду скарг на канадських фінансових professionals. Якщо проти когось є офіційна скарга, вона зафіксована публічно. У моєму випадку — записів немає.",
        cta: "OBSI public records",
        ctaUrl: OBSI_URL,
      },
    ],
    bonusTitle: "Бонус: зрозумій ким я НЕ є",
    bonusItems: [
      { label: "Я НЕ CIRO advisor", desc: "Public market securities (ETF, mutual funds, окремі акції) — це CIRO (раніше IIROC + MFDA) територія. Для них тобі потрібен CIRO-registered advisor. Я можу освітньо обговорити, але не рекомендувати." },
      { label: "Я НЕ insurance agent", desc: "Life insurance, annuities, segregated funds — це окрема Insurance Licence через AIC (Alberta Insurance Council). Я її не маю." },
      { label: "Я НЕ tax accountant / lawyer", desc: "Податкові декларації — CPA. Юридичні питання — lawyer. Я можу пояснити concept (TFSA tax treatment, наприклад) але формально податковий профешн — інша ліцензія." },
      { label: "Я НЕ незареєстрований TikTok-гуру", desc: "Будь-який «фінансовий радник» що не з'являється в NRD search — поза регулюванням. Освітній контент від них може бути нормальний; конкретні рекомендації купити-продати — небезпечні і нелегальні без ліцензії." },
    ],
    ciroLinkLabel: "Перевірити CIRO advisor",
    bottomCtaTitle: "Готовий поговорити?",
    bottomCtaText: "Тепер коли впевнений що я — це справді я, можемо рухатись далі.",
    bottomCtaBtn: "Записатись на discovery call",
    moreTitle: "Хочеш зрозуміти різницю ліцензій?",
    moreLinkLabel: "EMD vs CIRO vs MFDA vs Insurance — порівняльна таблиця",
    crumbHome: "Головна",
    crumbThis: "Перевірка",
  },
  ru: {
    titleMeta: "Проверь мою регистрацию за 3 минуты — Andrii Andriushchenko · SkyFort",
    descriptionMeta:
      "Пошаговая проверка: NRD #4575551, Axcess Capital регистрация, IFSE EMP сертификат, OBSI история жалоб. Образовательная страница от Licensed DR.",
    kicker: "Прозрачность",
    title: "Проверь меня за 3 минуты",
    intro:
      "В финансах доверие не должно базироваться на словах. Всё обо мне публично — и вот как это найти за 3 минуты без приложений и регистраций.",
    whyTitle: "Почему это важно",
    whyText:
      "В Канаде работают тысячи «финансовых консультантов» — от банковских продавцов до полностью нерегулируемых TikTok-гуру. Регулятор (CSA — Canadian Securities Administrators) ведёт единый реестр всех лицензированных professionals. Если ты не можешь найти кого-то в NRD search — это красный флаг, без исключений.",
    stepsTitle: "Как проверить меня",
    steps: [
      {
        icon: Search,
        n: "01",
        title: "Проверь личную регистрацию (NRD)",
        body: "NRD (National Registration Database) — центральный реестр CSA. Введи мой номер: 4575551. Увидишь моё имя, фирму (Axcess Capital Advisors Inc.), категорию (Dealing Representative — Exempt Market Dealer), провинции регистрации (AB · BC · ON), дату лицензии и любые minor offences (их нет).",
        cta: "Открыть NRD search",
        ctaUrl: NRD_DIRECT,
        ctaNote: "Запомни: 4575551",
      },
      {
        icon: Building2,
        n: "02",
        title: "Проверь фирму (Axcess Capital)",
        body: "Я работаю через Axcess Capital Advisors Inc. — зарегистрированную как Exempt Market Dealer в Альберте. На сайте ASC (Alberta Securities Commission) можешь найти firm-level регистрацию: лицензия, статус (active), любые регуляторные действия (none).",
        cta: "ASC Registered Firms",
        ctaUrl: ASC_URL,
        ctaNote: "Ищи: «Axcess Capital Advisors Inc.»",
      },
      {
        icon: Award,
        n: "03",
        title: "Проверь квалификацию (IFSE EMP)",
        body: "Для работы Dealing Representative нужно пройти Exempt Market Proficiency Course от IFSE Institute (подразделение IFIC). Я завершил его в 2024 году. На сайте IFSE — описание курса, программа, аккредитация CSA. Без этого сертификата NRD регистрация невозможна.",
        cta: "IFSE EMP course",
        ctaUrl: IFSE_URL,
      },
      {
        icon: AlertTriangle,
        n: "04",
        title: "Проверь историю жалоб (OBSI)",
        body: "OBSI — Ombudsman for Banking Services and Investments — независимый публичный канал рассмотрения жалоб на канадских финансовых professionals. Если против кого-то есть официальная жалоба, она зафиксирована публично. В моём случае — записей нет.",
        cta: "OBSI public records",
        ctaUrl: OBSI_URL,
      },
    ],
    bonusTitle: "Бонус: пойми кем я НЕ являюсь",
    bonusItems: [
      { label: "Я НЕ CIRO advisor", desc: "Public market securities (ETF, mutual funds, отдельные акции) — это CIRO (раньше IIROC + MFDA) территория. Для них тебе нужен CIRO-registered advisor. Я могу образовательно обсудить, но не рекомендовать." },
      { label: "Я НЕ insurance agent", desc: "Life insurance, annuities, segregated funds — это отдельная Insurance Licence через AIC (Alberta Insurance Council). Я её не имею." },
      { label: "Я НЕ tax accountant / lawyer", desc: "Налоговые декларации — CPA. Юридические вопросы — lawyer. Я могу объяснить concept (TFSA tax treatment, например), но формально налоговая профессия — отдельная лицензия." },
      { label: "Я НЕ незарегистрированный TikTok-гуру", desc: "Любой «финансовый советник» что не появляется в NRD search — вне регулирования. Образовательный контент от них может быть нормальный; конкретные рекомендации купить-продать — опасны и нелегальны без лицензии." },
    ],
    ciroLinkLabel: "Проверить CIRO advisor",
    bottomCtaTitle: "Готов поговорить?",
    bottomCtaText: "Теперь когда уверен что я — это действительно я, можем двигаться дальше.",
    bottomCtaBtn: "Записаться на discovery call",
    moreTitle: "Хочешь понять разницу лицензий?",
    moreLinkLabel: "EMD vs CIRO vs MFDA vs Insurance — сравнительная таблица",
    crumbHome: "Главная",
    crumbThis: "Проверка",
  },
  en: {
    titleMeta: "Verify me in 3 minutes — Andrii Andriushchenko · SkyFort",
    descriptionMeta:
      "Step-by-step verification: NRD #4575551, Axcess Capital firm registration, IFSE EMP qualification, OBSI complaint history. Educational page by Licensed DR.",
    kicker: "Transparency",
    title: "Verify me in 3 minutes",
    intro:
      "In finance, trust shouldn't be taken on someone's word. Everything about me is public — here's how to find it yourself in 3 minutes, no apps, no signups.",
    whyTitle: "Why this matters",
    whyText:
      "Thousands of people in Canada call themselves financial advisors — from bank salespeople to entirely unregulated TikTok personalities. The regulator (CSA — Canadian Securities Administrators) keeps a single registry of every licensed professional. If you can't find someone in the NRD search, that's a red flag, no exceptions.",
    stepsTitle: "How to verify me",
    steps: [
      {
        icon: Search,
        n: "01",
        title: "Check the individual registration (NRD)",
        body: "NRD (National Registration Database) is the CSA's central registry. Enter my number: 4575551. You'll see my name, firm (Axcess Capital Advisors Inc.), category (Dealing Representative — Exempt Market Dealer), provinces of registration (AB · BC · ON), license date, and any minor offences (none).",
        cta: "Open NRD search",
        ctaUrl: NRD_DIRECT,
        ctaNote: "Remember: 4575551",
      },
      {
        icon: Building2,
        n: "02",
        title: "Check the firm (Axcess Capital)",
        body: "I work through Axcess Capital Advisors Inc. — registered as an Exempt Market Dealer in Alberta. On the ASC (Alberta Securities Commission) site you can pull up the firm-level registration: license, status (active), any regulatory actions (none).",
        cta: "ASC Registered Firms",
        ctaUrl: ASC_URL,
        ctaNote: "Search for: «Axcess Capital Advisors Inc.»",
      },
      {
        icon: Award,
        n: "03",
        title: "Check the qualification (IFSE EMP)",
        body: "To register as a Dealing Representative you must complete the Exempt Market Proficiency Course at IFSE Institute (the education arm of IFIC). I finished it in 2024. The IFSE page lists the course description, curriculum, and CSA accreditation. Without this certificate, NRD registration is impossible.",
        cta: "IFSE EMP course",
        ctaUrl: IFSE_URL,
      },
      {
        icon: AlertTriangle,
        n: "04",
        title: "Check complaint history (OBSI)",
        body: "OBSI — the Ombudsman for Banking Services and Investments — is the independent public channel for complaints against Canadian financial professionals. If someone has a formal complaint on record, it's logged publicly. In my case, no records.",
        cta: "OBSI public records",
        ctaUrl: OBSI_URL,
      },
    ],
    bonusTitle: "Bonus: understand who I am NOT",
    bonusItems: [
      { label: "I am NOT a CIRO advisor", desc: "Public market securities (ETFs, mutual funds, individual stocks) are CIRO (formerly IIROC + MFDA) territory. For those you need a CIRO-registered advisor. I can discuss them educationally, not recommend them." },
      { label: "I am NOT an insurance agent", desc: "Life insurance, annuities, segregated funds — those need a separate Insurance License via AIC (Alberta Insurance Council). I don't hold one." },
      { label: "I am NOT a tax accountant / lawyer", desc: "Tax filings — CPA. Legal questions — lawyer. I can explain a concept (like TFSA tax treatment) but formally tax practice is a different profession with its own license." },
      { label: "I am NOT an unregistered TikTok guru", desc: "Anyone calling themselves a 'financial advisor' who doesn't appear in NRD search is operating outside regulation. Their educational content can be fine; their specific buy/sell recommendations are dangerous and illegal without a license." },
    ],
    ciroLinkLabel: "Verify a CIRO advisor",
    bottomCtaTitle: "Ready to talk?",
    bottomCtaText: "Now that you're sure I'm me, we can move forward.",
    bottomCtaBtn: "Book a discovery call",
    moreTitle: "Want to understand the license differences?",
    moreLinkLabel: "EMD vs CIRO vs MFDA vs Insurance — comparison table",
    crumbHome: "Home",
    crumbThis: "Verification",
  },
};

const CALENDLY = "https://calendly.com/andriushchenko-partners/new-meeting";

export async function generateStaticParams() {
  return SUPPORTED_LOCALES.map((locale) => ({ locale }));
}

export async function generateMetadata({ params }) {
  const { locale } = await params;
  const c = COPY[locale] || COPY.uk;
  const path = `/${locale}/perevirka`;
  const alternates = Object.fromEntries(
    SUPPORTED_LOCALES.map((l) => [
      { uk: "uk-UA", ru: "ru-RU", en: "en-CA" }[l],
      `/${l}/perevirka`,
    ])
  );
  alternates["x-default"] = "/uk/perevirka";
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

export default async function PerevirkaPage({ params }) {
  const { locale } = await params;
  const c = COPY[locale] || COPY.uk;

  return (
    <main id="main" className="min-h-screen bg-[var(--color-bg)] text-white">
      {/* NAV */}
      <nav className="fixed inset-x-0 top-0 z-50 border-b border-[#2a2a2a] bg-[#191919]/80 backdrop-blur-xl">
        <div className="mx-auto flex max-w-5xl items-center justify-between px-6 py-4">
          <Link href={`/${locale}`}><Logo variant="full" /></Link>
          <LangSwitcher locale={locale} />
        </div>
      </nav>

      <div className="mx-auto max-w-4xl px-6 pt-28">
        <Breadcrumbs
          items={[
            { label: c.crumbHome, href: `/${locale}` },
            { label: c.crumbThis },
          ]}
        />

        {/* HERO */}
        <header className="mt-10 pb-12">
          <p className="mb-4 text-[10px] font-bold uppercase tracking-[0.3em] text-[var(--color-brand)]">{c.kicker}</p>
          <h1 className="font-display-tight text-5xl text-white md:text-7xl">{c.title}</h1>
          <p className="mt-6 max-w-2xl text-lg leading-relaxed text-[#a3a3a3]">{c.intro}</p>
        </header>

        {/* WHY */}
        <section className="rounded-3xl border border-[var(--color-border)] bg-[var(--color-bg-card)] p-7 md:p-10">
          <div className="flex items-start gap-4">
            <ShieldCheck className="mt-1 h-6 w-6 flex-shrink-0 text-[var(--color-brand)]" aria-hidden="true" />
            <div>
              <h2 className="font-display text-2xl text-white md:text-3xl">{c.whyTitle}</h2>
              <p className="mt-4 text-base leading-relaxed text-[#c4c4c4]">{c.whyText}</p>
            </div>
          </div>
        </section>

        {/* STEPS */}
        <section className="mt-16 pb-12">
          <h2 className="mb-10 font-display text-3xl text-white md:text-5xl">{c.stepsTitle}</h2>
          <ol className="space-y-5">
            {c.steps.map((step, i) => {
              const Icon = step.icon;
              return (
                <li
                  key={i}
                  className="rounded-2xl border border-[var(--color-border)] bg-[var(--color-bg-card)] p-7 md:p-8"
                >
                  <div className="flex items-start gap-5">
                    <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-xl border border-[var(--color-brand)]/30 bg-[var(--color-brand)]/10">
                      <Icon className="h-5 w-5 text-[var(--color-brand)]" aria-hidden="true" />
                    </div>
                    <div className="min-w-0 flex-1">
                      <div className="flex items-baseline gap-3">
                        <span className="font-display text-3xl text-[var(--color-brand)]">{step.n}</span>
                        <h3 className="font-display text-xl text-white md:text-2xl">{step.title}</h3>
                      </div>
                      <p className="mt-3 text-base leading-relaxed text-[#c4c4c4]">{step.body}</p>
                      <div className="mt-5 flex flex-wrap items-center gap-3">
                        <a
                          href={step.ctaUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-2 rounded-full bg-[var(--color-brand)] px-5 py-2.5 text-sm font-bold uppercase tracking-wider text-white transition-colors hover:bg-[var(--color-brand-hover)]"
                        >
                          <ExternalLink className="h-3.5 w-3.5" aria-hidden="true" />
                          {step.cta}
                        </a>
                        {step.ctaNote && (
                          <span className="text-xs text-[var(--color-fg-subtle)]">{step.ctaNote}</span>
                        )}
                      </div>
                    </div>
                  </div>
                </li>
              );
            })}
          </ol>
        </section>

        {/* BONUS — what I am NOT */}
        <section className="mt-12 pb-12">
          <h2 className="font-display text-3xl text-white md:text-4xl">{c.bonusTitle}</h2>
          <ul className="mt-8 grid gap-4 md:grid-cols-2">
            {c.bonusItems.map((item, i) => (
              <li
                key={i}
                className="rounded-2xl border border-[var(--color-border)] bg-[var(--color-bg-card)] p-6"
              >
                <h3 className="flex items-start gap-2 font-bold text-white">
                  <FileText className="mt-1 h-4 w-4 flex-shrink-0 text-[var(--color-fg-subtle)]" aria-hidden="true" />
                  {item.label}
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-[#a3a3a3]">{item.desc}</p>
              </li>
            ))}
          </ul>
          <div className="mt-6 text-sm">
            <a
              href={CIRO_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 font-semibold text-[var(--color-brand)] hover:text-[var(--color-brand-hover)]"
            >
              <ExternalLink className="h-3.5 w-3.5" aria-hidden="true" />
              {c.ciroLinkLabel}
            </a>
          </div>
        </section>

        {/* MORE — link to comparison page */}
        <section className="mt-8 pb-12">
          <div className="rounded-2xl border border-[var(--color-brand)]/30 bg-[var(--color-brand)]/5 p-6 md:p-8">
            <h3 className="font-display text-xl text-white md:text-2xl">{c.moreTitle}</h3>
            <Link
              href={`/${locale}/porivnyannia`}
              className="mt-4 inline-flex items-center gap-2 font-semibold text-[var(--color-brand)] hover:text-[var(--color-brand-hover)]"
            >
              {c.moreLinkLabel}
              <ExternalLink className="h-3.5 w-3.5" aria-hidden="true" />
            </Link>
          </div>
        </section>

        {/* CTA */}
        <section className="mt-12 pb-24 text-center">
          <h2 className="font-display-tight text-3xl text-white md:text-5xl">{c.bottomCtaTitle}</h2>
          <p className="mx-auto mt-5 max-w-xl text-lg text-[#a3a3a3]">{c.bottomCtaText}</p>
          <a
            href={CALENDLY}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-10 inline-flex items-center gap-2 rounded-full bg-[var(--color-brand)] px-8 py-4 text-sm font-bold uppercase tracking-wider text-white transition-all hover:bg-[var(--color-brand-hover)]"
          >
            {c.bottomCtaBtn}
          </a>
          <p className="mt-6 text-xs text-[var(--color-fg-subtle)]">
            <a
              href={AXCESS_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-[var(--color-brand)]"
            >
              Axcess Capital Advisors Inc.
            </a>
            {" · "}
            <a
              href={NRD_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-[var(--color-brand)]"
            >
              NRD #4575551
            </a>
            {" · AB · BC · ON"}
          </p>
        </section>
      </div>
    </main>
  );
}
