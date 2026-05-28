import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowRight, MapPin, Calculator, BookOpen, ShieldCheck } from "lucide-react";
import { SUPPORTED_LOCALES } from "../../../../_i18n/dictionary";
import { CONFIG } from "../../../../_i18n/config";
import {
  getService,
  getCity,
  getAllServiceCityPairs,
  getServiceKeys,
  getCityKeys,
} from "../../../../_lib/services-cities";
import { getPairContent } from "../../../../_lib/services-cities-unique";
import Breadcrumbs from "../../../../_components/Breadcrumbs";
import EmailCaptureForm from "../../../../_components/EmailCaptureForm";

// Локалізована copy для template
const COPY = {
  uk: {
    crumbHome: "Головна",
    crumbServices: "Послуги",
    // Root layout metadata.title.template appends " · SkyFort" automatically.
    // Including it here would double-stamp the brand ("X · SkyFort · SkyFort").
    titlePattern: (svc, city) => `${svc} ${city.locativeUk}`,
    h1Pattern: (svc, city) => `${svc.titleUk} ${city.locativeUk}`,
    h1Sub: (city) =>
      `Освітні консультації для українців та новоприбулих ${city.locativeUk}. Licensed Dealing Representative, NRD #4575551.`,
    localFactsTitle: (city) => `Контекст ${city.locativeUk}`,
    populationLabel: "Населення",
    incomeLabel: "Median household income",
    provinceLabel: "Провінція",
    whyHere: "Чому це актуально саме тут",
    faqTitle: "Часті питання",
    ctaTitle: "Готовий розібратись зі своєю ситуацією?",
    ctaSub:
      "30 хвилин · безкоштовно · Zoom або Google Meet. Без продажу на дзвінку — лише розбір твоїх цифр.",
    ctaBtn: "Записатись на discovery call",
    relatedTitle: "Більше про цю тему",
    calcLabel: "Інтерактивний калькулятор",
    pillarLabel: "Повний пілярний гайд",
    backToServices: "Усі послуги",
  },
  ru: {
    crumbHome: "Главная",
    crumbServices: "Услуги",
    titlePattern: (svc, city) => `${svc} ${city.locativeRu}`,
    h1Pattern: (svc, city) => `${svc.titleRu} ${city.locativeRu}`,
    h1Sub: (city) =>
      `Образовательные консультации для русскоязычных и новоприбывших ${city.locativeRu}. Licensed Dealing Representative, NRD #4575551.`,
    localFactsTitle: (city) => `Контекст ${city.locativeRu}`,
    populationLabel: "Население",
    incomeLabel: "Median household income",
    provinceLabel: "Провинция",
    whyHere: "Почему это актуально именно здесь",
    faqTitle: "Частые вопросы",
    ctaTitle: "Готов разобраться со своей ситуацией?",
    ctaSub:
      "30 минут · бесплатно · Zoom или Google Meet. Без продажи на звонке — только разбор твоих цифр.",
    ctaBtn: "Записаться на discovery call",
    relatedTitle: "Больше об этой теме",
    calcLabel: "Интерактивный калькулятор",
    pillarLabel: "Полный пилярный гайд",
    backToServices: "Все услуги",
  },
  en: {
    crumbHome: "Home",
    crumbServices: "Services",
    titlePattern: (svc, city) => `${svc} ${city.locativeEn}`,
    h1Pattern: (svc, city) => `${svc.titleEn} ${city.locativeEn}`,
    h1Sub: (city) =>
      `Educational consultations for newcomers ${city.locativeEn}. Licensed Dealing Representative, NRD #4575551.`,
    localFactsTitle: (city) => `${city.nameEn} context`,
    populationLabel: "Population",
    incomeLabel: "Median household income",
    provinceLabel: "Province",
    whyHere: "Why this matters here",
    faqTitle: "FAQ",
    ctaTitle: "Ready to figure out your situation?",
    ctaSub:
      "30 minutes · free · Zoom or Google Meet. No selling on the call — just walking through your numbers.",
    ctaBtn: "Book a discovery call",
    relatedTitle: "More on this topic",
    calcLabel: "Interactive calculator",
    pillarLabel: "Full pillar guide",
    backToServices: "All services",
  },
};

// Локалізовані generic FAQ для service+city комбінації (4 базових питання)
function buildFaq(locale, service, city) {
  if (locale === "ru") {
    return [
      {
        q: `Ты работаешь физически в ${city.nameRu}?`,
        a: `Личные встречи в Калгари (head office Axcess Capital Advisors Inc.). Для клиентов ${city.locativeRu} — Zoom/Google Meet. Эффект тот же, экономия времени на дорогу.`,
      },
      {
        q: `${service.titleRu} ${city.locativeRu} — это легально?`,
        a: `Да. Я зарегистрирован Dealing Representative в Alberta, BC и Ontario. ${city.province} включена. NRD #4575551 — публичная информация.`,
      },
      {
        q: "Сколько стоит первая консультация?",
        a: "Бесплатно. Discovery call (30 минут) — без обязательств. По правилам CSA, до KYC + Suitability Assessment я не рекомендую конкретные продукты.",
      },
      {
        q: "Можно ли на русском/украинском?",
        a: "Да. Дзвонки веду украинским, русским или английским — как удобнее. Документы (OM, Suitability) — английские по регуляции, но объясняю детально.",
      },
    ];
  }
  if (locale === "en") {
    return [
      {
        q: `Are you physically in ${city.nameEn}?`,
        a: `In-person in Calgary (Axcess Capital Advisors Inc. head office). For clients ${city.locativeEn} — Zoom/Google Meet. Same outcome, no commute.`,
      },
      {
        q: `${service.titleEn} ${city.locativeEn} — is this legal?`,
        a: `Yes. I'm registered as a Dealing Representative in Alberta, BC, and Ontario. ${city.province} is covered. NRD #4575551 is public.`,
      },
      {
        q: "What does the first consultation cost?",
        a: "Free. 30-minute discovery call, no obligation. Per CSA rules, I don't recommend specific products before a formal KYC + Suitability Assessment.",
      },
      {
        q: "Can we do it in Ukrainian or Russian?",
        a: "Yes. I run calls in Ukrainian, Russian, or English — whichever works. Documents (OM, Suitability) are in English per regulation, but I walk through them in detail.",
      },
    ];
  }
  // uk default
  return [
    {
      q: `Ти фізично у ${city.nameUk}?`,
      a: `Особисті зустрічі — у Калгарі (head office Axcess Capital Advisors Inc.). Для клієнтів ${city.locativeUk} — Zoom/Google Meet. Той же результат, економія часу на дорогу.`,
    },
    {
      q: `${service.titleUk} ${city.locativeUk} — це легально?`,
      a: `Так. Я зареєстрований Dealing Representative в Alberta, BC і Ontario. ${city.province} включена. NRD #4575551 — публічна інформація.`,
    },
    {
      q: "Скільки коштує перша консультація?",
      a: "Безкоштовно. Discovery call (30 хв) — без зобов'язань. За правилами CSA, до KYC + Suitability Assessment я не рекомендую конкретні продукти.",
    },
    {
      q: "Можна українською/російською?",
      a: "Так. Дзвінки веду українською, російською або англійською — як зручніше. Документи (OM, Suitability) — англійською за регуляцією, але пояснюю детально.",
    },
  ];
}

export async function generateStaticParams() {
  const params = [];
  for (const locale of SUPPORTED_LOCALES) {
    for (const { service, city } of getAllServiceCityPairs()) {
      params.push({ locale, service, city });
    }
  }
  return params;
}

export async function generateMetadata({ params }) {
  const { locale, service, city } = await params;
  const svc = getService(service);
  const ct = getCity(city);
  if (!svc || !ct) return {};

  const c = COPY[locale] || COPY.uk;
  const desc =
    locale === "ru" ? svc.descRu : locale === "en" ? svc.descEn : svc.descUk;
  const cityName =
    locale === "ru" ? ct.nameRu : locale === "en" ? ct.nameEn : ct.nameUk;
  const svcName =
    locale === "ru" ? svc.titleRu : locale === "en" ? svc.titleEn : svc.titleUk;
  const path = `/${locale}/services/${service}/${city}`;

  // hreflang
  const alternates = Object.fromEntries(
    SUPPORTED_LOCALES.map((l) => [
      { uk: "uk-UA", ru: "ru-RU", en: "en-CA" }[l],
      `/${l}/services/${service}/${city}`,
    ])
  );
  alternates["x-default"] = `/uk/services/${service}/${city}`;

  return {
    title: c.titlePattern(svcName, ct),
    description: `${desc} ${cityName}, ${ct.province}.`,
    keywords: [
      ...svc.keywords,
      `${svc.pillar} ${cityName}`,
      `${svcName} ${cityName}`,
      `Ukrainian financial advisor ${cityName}`,
      `Licensed DR ${ct.province}`,
    ],
    alternates: { canonical: path, languages: alternates },
    openGraph: {
      title: c.titlePattern(svcName, ct),
      description: desc,
      url: `https://sky-fort.ca${path}`,
      type: "website",
    },
  };
}

export default async function ServiceCityPage({ params }) {
  const { locale, service, city } = await params;
  const svc = getService(service);
  const ct = getCity(city);
  if (!svc || !ct) notFound();

  const c = COPY[locale] || COPY.uk;
  const cityName =
    locale === "ru" ? ct.nameRu : locale === "en" ? ct.nameEn : ct.nameUk;
  const svcName =
    locale === "ru" ? svc.titleRu : locale === "en" ? svc.titleEn : svc.titleUk;
  const svcDesc =
    locale === "ru" ? svc.descRu : locale === "en" ? svc.descEn : svc.descUk;
  const cityNotes =
    locale === "ru" ? ct.notesRu : locale === "en" ? ct.notesEn : ct.notesUk;
  const uniqueInsight = getPairContent(service, city, locale);
  const insightLabel =
    locale === "ru"
      ? `Что особенного для ${ct.locativeRu}`
      : locale === "en"
      ? `What's specific ${ct.locativeEn}`
      : `Що особливого ${ct.locativeUk}`;
  const faq = buildFaq(locale, svc, ct);

  // JSON-LD: Service + FAQPage + LocalBusiness (with areaServed = city)
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Service",
        name: `${svcName} ${cityName}`,
        description: svcDesc,
        provider: {
          "@type": "FinancialService",
          name: "SkyFort Wealth",
          url: "https://sky-fort.ca",
        },
        areaServed: {
          "@type": "City",
          name: cityName,
          containedInPlace: {
            "@type": "AdministrativeArea",
            name: ct.province,
          },
        },
        serviceType: svc.pillar,
      },
      {
        "@type": "FAQPage",
        mainEntity: faq.map((it) => ({
          "@type": "Question",
          name: it.q,
          acceptedAnswer: { "@type": "Answer", text: it.a },
        })),
      },
    ],
  };

  return (
    <main id="main" className="min-h-screen bg-[var(--color-bg)] text-[var(--color-fg)]">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <div className="mx-auto max-w-5xl px-6 pt-28 md:pt-32">
        <Breadcrumbs
          items={[
            { label: c.crumbHome, href: `/${locale}` },
            { label: c.crumbServices, href: `/${locale}/services` },
            { label: `${svcName} · ${cityName}` },
          ]}
        />

        {/* HERO */}
        <header className="mt-10 max-w-3xl">
          <div className="mb-3 inline-flex items-center gap-2 rounded-full bg-[var(--color-brand-soft)] px-3 py-1 text-xs font-semibold uppercase tracking-wider text-[var(--color-brand)]">
            <MapPin size={12} aria-hidden="true" />
            {cityName} · {ct.province}
          </div>
          <h1 className="font-display text-4xl text-white md:text-6xl">
            {c.h1Pattern(svc, ct)}
          </h1>
          <p className="mt-6 text-xl text-[var(--color-fg-muted)]">{c.h1Sub(ct)}</p>
        </header>

        {/* LOCAL FACTS */}
        <section className="mt-12 rounded-2xl border border-[var(--color-border)] bg-[var(--color-bg-card)] p-7 md:p-9">
          <h2 className="mb-6 font-display text-2xl text-white md:text-3xl">
            {c.localFactsTitle(ct)}
          </h2>

          <div className="mb-6 grid grid-cols-1 gap-4 md:grid-cols-3">
            <div className="rounded-lg border border-[var(--color-border)] bg-[var(--color-bg)] p-4">
              <div className="text-xs uppercase tracking-wider text-[var(--color-fg-subtle)]">
                {c.populationLabel}
              </div>
              <div className="mt-1 font-display text-xl text-white">{ct.population}</div>
            </div>
            <div className="rounded-lg border border-[var(--color-border)] bg-[var(--color-bg)] p-4">
              <div className="text-xs uppercase tracking-wider text-[var(--color-fg-subtle)]">
                {c.incomeLabel}
              </div>
              <div className="mt-1 font-display text-xl text-white">
                ${ct.medianHHIncome.toLocaleString("en-CA")}
              </div>
            </div>
            <div className="rounded-lg border border-[var(--color-border)] bg-[var(--color-bg)] p-4">
              <div className="text-xs uppercase tracking-wider text-[var(--color-fg-subtle)]">
                {c.provinceLabel}
              </div>
              <div className="mt-1 font-display text-xl text-white">{ct.province}</div>
            </div>
          </div>

          <h3 className="mb-3 text-sm font-bold uppercase tracking-wider text-[var(--color-brand)]">
            {c.whyHere}
          </h3>
          <ul className="space-y-2">
            {cityNotes.map((note, i) => (
              <li key={i} className="flex items-start gap-2 text-[var(--color-fg-muted)]">
                <span className="mt-1.5 inline-block h-1.5 w-1.5 flex-shrink-0 rounded-full bg-[var(--color-brand)]" />
                <span>{note}</span>
              </li>
            ))}
          </ul>
        </section>

        {/* SERVICE DETAIL */}
        <section className="mt-10 max-w-3xl">
          <h2 className="mb-4 font-display text-2xl text-white md:text-3xl">
            {svcName}
          </h2>
          <p className="text-lg leading-relaxed text-[var(--color-fg-muted)]">
            {svcDesc}
          </p>
        </section>

        {/* CITY-SPECIFIC INSIGHT (per-pair unique content, when available) */}
        {uniqueInsight && (
          <section className="mt-8 max-w-3xl">
            <div className="rounded-2xl border border-[var(--color-brand)]/25 bg-gradient-to-br from-[var(--color-brand-soft)] to-transparent p-6 md:p-8">
              <div className="mb-3 flex items-center gap-2">
                <MapPin
                  className="h-4 w-4 text-[var(--color-brand)]"
                  aria-hidden="true"
                />
                <span className="text-xs font-bold uppercase tracking-[0.12em] text-[var(--color-brand)]">
                  {insightLabel}
                </span>
              </div>
              <div
                className="text-base leading-relaxed text-[var(--color-fg)] md:text-lg"
                dangerouslySetInnerHTML={{
                  __html: uniqueInsight.replace(
                    /\*\*(.+?)\*\*/g,
                    '<strong class="font-semibold text-white">$1</strong>'
                  ),
                }}
              />
            </div>
          </section>
        )}

        {/* FAQ */}
        <section className="mt-12">
          <h2 className="mb-6 font-display text-2xl text-white md:text-3xl">
            {c.faqTitle}
          </h2>
          <dl className="space-y-4">
            {faq.map((item, i) => (
              <div
                key={i}
                className="rounded-xl border border-[var(--color-border)] bg-[var(--color-bg-card)] p-6"
              >
                <dt className="mb-2 font-semibold text-white">{item.q}</dt>
                <dd className="text-[var(--color-fg-muted)]">{item.a}</dd>
              </div>
            ))}
          </dl>
        </section>

        {/* RELATED LINKS */}
        <section className="mt-12 grid gap-4 md:grid-cols-2">
          <Link
            href={`/${locale}${svc.relatedCalculator}`}
            className="card-glow flex items-center gap-4 rounded-xl border border-[var(--color-border)] bg-[var(--color-bg-card)] p-5"
          >
            <Calculator
              className="h-8 w-8 flex-shrink-0 text-[var(--color-brand)]"
              aria-hidden="true"
            />
            <div className="flex-1">
              <div className="text-xs uppercase tracking-wider text-[var(--color-fg-subtle)]">
                {c.calcLabel}
              </div>
              <div className="font-semibold text-white">{svcName}</div>
            </div>
            <ArrowRight className="h-4 w-4 text-[var(--color-fg-muted)]" aria-hidden="true" />
          </Link>
          {svc.relatedPillarSlug && (
            <Link
              href={`/${locale}/blog/${svc.relatedPillarSlug}`}
              className="card-glow flex items-center gap-4 rounded-xl border border-[var(--color-border)] bg-[var(--color-bg-card)] p-5"
            >
              <BookOpen
                className="h-8 w-8 flex-shrink-0 text-[var(--color-brand)]"
                aria-hidden="true"
              />
              <div className="flex-1">
                <div className="text-xs uppercase tracking-wider text-[var(--color-fg-subtle)]">
                  {c.pillarLabel}
                </div>
                <div className="font-semibold text-white">{svcName}</div>
              </div>
              <ArrowRight className="h-4 w-4 text-[var(--color-fg-muted)]" aria-hidden="true" />
            </Link>
          )}
        </section>

        {/* CTA */}
        <section className="mt-12 rounded-2xl border border-[var(--color-brand)]/30 bg-gradient-to-br from-[var(--color-bg-card)] to-[#1a2d4a] p-8 text-center md:p-10">
          <ShieldCheck
            className="mx-auto mb-3 h-10 w-10 text-[var(--color-brand)]"
            aria-hidden="true"
          />
          <h2 className="font-display text-2xl text-white md:text-3xl">
            {c.ctaTitle}
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-[var(--color-fg-muted)]">{c.ctaSub}</p>
          <a
            href={CONFIG.calendlyUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-6 inline-flex items-center gap-2 rounded-full bg-[var(--color-brand)] px-7 py-3 text-sm font-bold uppercase tracking-wider text-white transition-colors hover:bg-[var(--color-brand-hover)]"
          >
            {c.ctaBtn}
            <ArrowRight className="h-4 w-4" aria-hidden="true" />
          </a>
        </section>

        {/* Email capture */}
        <section className="mt-12">
          <EmailCaptureForm
            locale={locale}
            variant="card"
            source={`service_${service}_${city}`}
            leadMagnet="TFSA_GUIDE"
          />
        </section>

        <div className="mt-12 mb-24 text-center">
          <Link
            href={`/${locale}/services`}
            className="inline-flex items-center gap-2 text-sm font-semibold text-[var(--color-fg-muted)] transition-colors hover:text-[var(--color-brand)]"
          >
            ← {c.backToServices}
          </Link>
        </div>
      </div>
    </main>
  );
}
