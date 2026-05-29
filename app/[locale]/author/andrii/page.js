// app/[locale]/author/andrii/page.js
// Dedicated author-entity page (Audit 7 Section 3 #11). Distinct from
// /pro-mene (which is "About" — first-person marketing) — this page is
// structured-data-first, primarily for AI/search entity resolution.
//
// Why both pages exist:
//   - /pro-mene = human-facing "About" with portrait + narrative
//   - /author/andrii = entity-graph anchor with Person schema, all
//     credentials, sameAs links, knowsAbout list, dateModified — the
//     URL pattern AI engines look for to resolve author identity for
//     Article schema's `author.url` references.
//
// Linked from every Article schema's author.url field.

import Link from "next/link";
import Image from "next/image";
import { ExternalLink, ShieldCheck, Award, MapPin, Languages } from "lucide-react";
import Logo from "../../../_components/Logo";
import Breadcrumbs from "../../../_components/Breadcrumbs";
import LangSwitcher from "../../../_components/LangSwitcher";
import UpdatedBadge from "../../../_components/UpdatedBadge";
import { SUPPORTED_LOCALES } from "../../../_i18n/dictionary";

const NRD_URL = "https://info.securities-administrators.ca/nrsmobile/nrssearch.aspx";

const META = {
  uk: {
    title: "Andrii Andriushchenko — Licensed Dealing Representative, NRD #4575551",
    description:
      "Author bio: Andrii Andriushchenko, Licensed Dealing Representative (Axcess Capital Advisors Inc., EMD), NRD #4575551, AB·BC·ON. Спеціалізація: TFSA, RRSP, FHSA, exempt market, CCPC, MPC.",
    crumbThis: "Author · Andrii",
  },
  ru: {
    title: "Andrii Andriushchenko — Licensed Dealing Representative, NRD #4575551",
    description:
      "Author bio: Andrii Andriushchenko, Licensed Dealing Representative (Axcess Capital Advisors Inc., EMD), NRD #4575551. Специализация: TFSA, RRSP, FHSA, exempt market, CCPC, MPC.",
    crumbThis: "Author · Andrii",
  },
  en: {
    title: "Andrii Andriushchenko — Licensed Dealing Representative, NRD #4575551",
    description:
      "Author bio: Andrii Andriushchenko, Licensed Dealing Representative (Axcess Capital Advisors Inc., EMD), NRD #4575551, AB·BC·ON. Specialization: TFSA, RRSP, FHSA, exempt market, CCPC, MPC.",
    crumbThis: "Author · Andrii",
  },
};

const COPY = {
  uk: {
    name: "Andrii Andriushchenko",
    role: "Licensed Dealing Representative",
    firm: "Axcess Capital Advisors Inc.",
    firmType: "Exempt Market Dealer (EMD)",
    nrd: "NRD #4575551",
    location: "Calgary, Alberta, Canada",
    provinces: "Альберта · British Columbia · Ontario",
    languages: "Українська · Російська · Англійська",
    h1: "Andrii Andriushchenko",
    sub: "Licensed Dealing Representative · NRD #4575551 · Axcess Capital Advisors Inc. (EMD)",
    bioTitle: "Біо",
    bio:
      "Licensed Dealing Representative (Dealing Representative категорія, EMD scope) у Калгарі, Альберта. Зареєстрований CSA через National Registration Database під номером 4575551, працюю через Axcess Capital Advisors Inc. — registered Exempt Market Dealer з permissions у Альберті, Британській Колумбії, Онтаріо. Освітній фокус — українські та російськомовні newcomers у Канаді з 2-річним+ horizon: TFSA / RRSP / FHSA / RESP planning, exempt market eligibility (NI 45-106 §1.1), CCPC / MPC структури для лікарів та підприємців, RSU/ESPP оптимізація для IT-фахівців.",
    credsTitle: "Регуляторна реєстрація + кваліфікація",
    creds: [
      "Licensed Dealing Representative (CSA-registered) — підтверджується через NRD search",
      "Axcess Capital Advisors Inc. — registered Exempt Market Dealer (firm-level CSA registration)",
      "IFSE Institute Exempt Market Proficiency Course (EMP) — required qualification для DR category",
      "Provincial registrations: Alberta Securities Commission, BCSC, OSC",
      "Compliance reviews — Joint CSA/CIRO Staff Notice 31-369 (December 11, 2025) на social media контент",
    ],
    expertiseTitle: "Topical expertise (knowsAbout)",
    expertise: [
      "TFSA — contribution room, placement strategy, US dividend withholding",
      "RRSP — timing strategy, RSU vesting, HBP for first home",
      "FHSA — $40K lifetime, combo з RRSP HBP для down payment",
      "RESP — CESG strategy, A-CESG для low-income newcomers, catch-up до 17",
      "Exempt Market (NI 45-106) — Eligible / Accredited Investor categorization",
      "CCPC структури — SBD, salary/dividend split, TOSI, LCGE на QSBS",
      "MPC для лікарів — incorporation timeline, IPP, holdco asset protection",
      "RSU vesting tax optimization у Канаді (AB/BC/ON brackets)",
      "ESPP arbitrage strategy",
      "Cross-border US/CA tax (W-8BEN, treaty residency, FBAR)",
      "T1135 foreign property reporting для newcomers",
      "Finfluencer compliance per CSA/CIRO Notice 31-369",
    ],
    contactTitle: "Зв'язатись",
    proMeneCta: "Повний About → /pro-mene",
    verifyCta: "Перевірити мою NRD реєстрацію →",
  },
  ru: {
    name: "Andrii Andriushchenko",
    role: "Licensed Dealing Representative",
    firm: "Axcess Capital Advisors Inc.",
    firmType: "Exempt Market Dealer (EMD)",
    nrd: "NRD #4575551",
    location: "Calgary, Alberta, Canada",
    provinces: "Альберта · British Columbia · Ontario",
    languages: "Украинский · Русский · Английский",
    h1: "Andrii Andriushchenko",
    sub: "Licensed Dealing Representative · NRD #4575551 · Axcess Capital Advisors Inc. (EMD)",
    bioTitle: "Био",
    bio:
      "Licensed Dealing Representative (DR категория, EMD scope) в Калгари, Альберта. Зарегистрирован CSA через National Registration Database под номером 4575551, работаю через Axcess Capital Advisors Inc. — registered Exempt Market Dealer с permissions в Альберте, BC, Ontario. Образовательный фокус — украинские и русскоязычные newcomers в Канаде с 2+ годами горизонта.",
    credsTitle: "Регуляторная регистрация + квалификация",
    creds: [
      "Licensed Dealing Representative (CSA-registered) — verify через NRD search",
      "Axcess Capital Advisors Inc. — registered Exempt Market Dealer",
      "IFSE Institute Exempt Market Proficiency Course (EMP)",
      "Provincial registrations: ASC, BCSC, OSC",
      "Compliance reviews — Joint CSA/CIRO Staff Notice 31-369 (Dec 2025)",
    ],
    expertiseTitle: "Topical expertise",
    expertise: [
      "TFSA — contribution room, placement strategy",
      "RRSP — timing, RSU vesting, HBP",
      "FHSA — $40K lifetime, combo с RRSP HBP",
      "RESP — CESG strategy",
      "Exempt Market (NI 45-106) — Eligible / Accredited categorization",
      "CCPC — SBD, salary/dividend, TOSI, LCGE",
      "MPC для врачей — incorporation timeline, IPP, holdco",
      "RSU vesting tax (AB/BC/ON)",
      "ESPP arbitrage",
      "Cross-border US/CA tax",
      "T1135 foreign property",
      "Finfluencer compliance (Notice 31-369)",
    ],
    contactTitle: "Связаться",
    proMeneCta: "Полный About → /pro-mene",
    verifyCta: "Проверить NRD регистрацию →",
  },
  en: {
    name: "Andrii Andriushchenko",
    role: "Licensed Dealing Representative",
    firm: "Axcess Capital Advisors Inc.",
    firmType: "Exempt Market Dealer (EMD)",
    nrd: "NRD #4575551",
    location: "Calgary, Alberta, Canada",
    provinces: "Alberta · British Columbia · Ontario",
    languages: "Ukrainian · Russian · English",
    h1: "Andrii Andriushchenko",
    sub: "Licensed Dealing Representative · NRD #4575551 · Axcess Capital Advisors Inc. (EMD)",
    bioTitle: "Bio",
    bio:
      "Licensed Dealing Representative (Dealing Representative category, EMD scope) based in Calgary, Alberta. Registered with the Canadian Securities Administrators via the National Registration Database under NRD #4575551, operating through Axcess Capital Advisors Inc. — a registered Exempt Market Dealer with permissions in Alberta, British Columbia, and Ontario. Educational focus on Ukrainian and Russian-speaking newcomers in Canada with a 2+ year horizon: TFSA/RRSP/FHSA/RESP planning, exempt market eligibility (NI 45-106 §1.1), CCPC / MPC structures for physicians and entrepreneurs, RSU/ESPP optimization for tech workers.",
    credsTitle: "Regulatory registration + qualifications",
    creds: [
      "Licensed Dealing Representative (CSA-registered) — verifiable via NRD search",
      "Axcess Capital Advisors Inc. — registered Exempt Market Dealer (firm-level CSA registration)",
      "IFSE Institute Exempt Market Proficiency Course (EMP) — required qualification for the DR category",
      "Provincial registrations: Alberta Securities Commission, BCSC, OSC",
      "Content reviewed for compliance under Joint CSA/CIRO Staff Notice 31-369 (December 11, 2025)",
    ],
    expertiseTitle: "Topical expertise (knowsAbout)",
    expertise: [
      "TFSA — contribution room, placement strategy, US dividend withholding",
      "RRSP — timing strategy, RSU vesting, HBP for first home",
      "FHSA — $40K lifetime, combo with RRSP HBP for down payment",
      "RESP — CESG strategy, A-CESG for low-income newcomers, catch-up to 17",
      "Exempt Market (NI 45-106) — Eligible / Accredited Investor categorization",
      "CCPC structures — SBD, salary/dividend split, TOSI, LCGE on QSBS",
      "MPC for physicians — incorporation timeline, IPP, holdco asset protection",
      "RSU vesting tax optimization in Canada (AB/BC/ON brackets)",
      "ESPP arbitrage strategy",
      "Cross-border US/CA tax (W-8BEN, treaty residency, FBAR)",
      "T1135 foreign property reporting for newcomers",
      "Finfluencer compliance per CSA/CIRO Notice 31-369",
    ],
    contactTitle: "Contact",
    proMeneCta: "Full About → /pro-mene",
    verifyCta: "Verify my NRD registration →",
  },
};

export async function generateStaticParams() {
  return SUPPORTED_LOCALES.map((locale) => ({ locale }));
}

export async function generateMetadata({ params }) {
  const { locale } = await params;
  const m = META[locale] || META.uk;
  const path = `/${locale}/author/andrii`;
  const alternates = Object.fromEntries(
    SUPPORTED_LOCALES.map((l) => [{ uk: "uk", ru: "ru", en: "en-CA" }[l], `/${l}/author/andrii`]),
  );
  alternates["x-default"] = "/uk/author/andrii";
  return {
    title: m.title,
    description: m.description,
    alternates: { canonical: path, languages: alternates },
    openGraph: { title: m.title, description: m.description, url: `https://sky-fort.ca${path}`, type: "profile" },
    twitter: { card: "summary_large_image", title: m.title, description: m.description },
  };
}

function buildJsonLd(locale, c, path) {
  // Mirror of Person schema from /pro-mene but anchored at the author URL
  // for Article schema author.url cross-referencing. This is the URL AI
  // engines will most often hit when resolving the author entity.
  return {
    "@context": "https://schema.org",
    "@type": "Person",
    "@id": `https://sky-fort.ca${path}#person`,
    name: "Andrii Andriushchenko",
    alternateName: ["Андрій Андрющенко", "Андрей Андрющенко"],
    jobTitle: c.role,
    honorificPrefix: c.role,
    image: "https://sky-fort.ca/andrii.jpg",
    url: `https://sky-fort.ca${path}`,
    worksFor: {
      "@type": "Organization",
      name: c.firm,
      description: c.firmType,
    },
    memberOf: [
      { "@type": "Organization", name: "Axcess Capital Advisors Inc." },
      { "@type": "Organization", name: "Canadian Securities Administrators (CSA)" },
    ],
    nationality: [{ "@type": "Country", name: "Ukraine" }, { "@type": "Country", name: "Canada" }],
    address: {
      "@type": "PostalAddress",
      addressLocality: "Calgary",
      addressRegion: "AB",
      addressCountry: "CA",
    },
    knowsLanguage: ["uk", "ru", "en"],
    knowsAbout: c.expertise,
    areaServed: [
      { "@type": "AdministrativeArea", name: "Alberta" },
      { "@type": "AdministrativeArea", name: "British Columbia" },
      { "@type": "AdministrativeArea", name: "Ontario" },
    ],
    hasCredential: [
      {
        "@type": "EducationalOccupationalCredential",
        credentialCategory: "Professional Registration",
        name: "Dealing Representative (Exempt Market Dealer) — Alberta, British Columbia, Ontario",
        recognizedBy: { "@type": "Organization", name: "Canadian Securities Administrators (CSA)" },
        identifier: "NRD 4575551",
        url: NRD_URL,
      },
      {
        "@type": "EducationalOccupationalCredential",
        credentialCategory: "Professional Qualification",
        name: "Exempt Market Proficiency Course (EMP)",
        recognizedBy: { "@type": "Organization", name: "IFSE Institute (IFIC)" },
        url: "https://www.ifse.ca/courses/exempt-market-products-emp/",
      },
    ],
    sameAs: [
      NRD_URL,
      "https://www.tiktok.com/@andrii.wealthcanada",
      "https://instagram.com/andrii.wealthcanada",
      "https://t.me/skyfortwealth",
      "https://calendly.com/andriushchenko-partners/new-meeting",
      "https://axcesscapital.ca/",
      `https://sky-fort.ca/${locale}/pro-mene`,
      `https://sky-fort.ca/${locale}/perevirka`,
      `https://sky-fort.ca/${locale}/presa`,
    ],
  };
}

export default async function AuthorAndriiPage({ params }) {
  const { locale } = await params;
  const c = COPY[locale] || COPY.uk;
  const path = `/${locale}/author/andrii`;
  const jsonLd = buildJsonLd(locale, c, path);

  return (
    <main id="main" className="min-h-screen bg-[var(--color-bg)] text-white">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <header className="pt-8 pb-4 px-6">
        <div className="mx-auto max-w-5xl flex items-center justify-between">
          <Link href={`/${locale}`} aria-label="SkyFort home">
            <Logo variant="full" size="md" />
          </Link>
          <LangSwitcher />
        </div>
      </header>

      <section className="px-6 pt-4 pb-10">
        <div className="mx-auto max-w-3xl">
          <Breadcrumbs
            items={[
              { label: locale === "ru" ? "Главная" : locale === "en" ? "Home" : "Головна", href: `/${locale}` },
              { label: c.crumbThis },
            ]}
          />
          <div className="mt-6">
            <UpdatedBadge date="2026-05-29" locale={locale} />
          </div>
          <div className="mt-4 flex items-start gap-5">
            <Image
              src="/andrii.jpg"
              alt={c.name}
              width={120}
              height={160}
              className="rounded-2xl border border-white/10"
              priority
            />
            <div className="flex-1">
              <h1 className="text-3xl sm:text-4xl font-extrabold leading-tight">{c.h1}</h1>
              <p className="mt-2 text-sm sm:text-base text-white/75">{c.sub}</p>
              <div className="mt-4 space-y-1 text-xs text-white/55">
                <p className="inline-flex items-center gap-1.5">
                  <MapPin size={12} aria-hidden="true" /> {c.location}
                </p>
                <p className="inline-flex items-center gap-1.5">
                  <ShieldCheck size={12} className="text-[var(--color-brand)]" aria-hidden="true" /> {c.provinces}
                </p>
                <p className="inline-flex items-center gap-1.5">
                  <Languages size={12} aria-hidden="true" /> {c.languages}
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="px-6 pb-10">
        <div className="mx-auto max-w-3xl">
          <h2 className="mb-3 text-xl sm:text-2xl font-bold">{c.bioTitle}</h2>
          <p className="text-base text-white/80 leading-relaxed">{c.bio}</p>
        </div>
      </section>

      <section className="px-6 pb-10">
        <div className="mx-auto max-w-3xl">
          <h2 className="mb-4 text-xl sm:text-2xl font-bold flex items-center gap-2">
            <Award size={20} className="text-[var(--color-brand)]" aria-hidden="true" />
            {c.credsTitle}
          </h2>
          <ul className="space-y-2">
            {c.creds.map((cred, i) => (
              <li key={i} className="flex gap-3 text-sm text-white/85">
                <span className="text-[var(--color-brand)] font-mono">{i + 1}.</span>
                <span>{cred}</span>
              </li>
            ))}
          </ul>
          <a
            href={NRD_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-5 inline-flex items-center gap-2 rounded-lg border border-[var(--color-brand)]/40 bg-[var(--color-brand)]/[0.08] px-4 py-2 text-sm font-bold text-[var(--color-brand)] hover:bg-[var(--color-brand)]/[0.12]"
          >
            <ExternalLink size={14} aria-hidden="true" /> {c.verifyCta}
          </a>
        </div>
      </section>

      <section className="px-6 pb-10">
        <div className="mx-auto max-w-3xl">
          <h2 className="mb-4 text-xl sm:text-2xl font-bold">{c.expertiseTitle}</h2>
          <ul className="grid gap-2 sm:grid-cols-2">
            {c.expertise.map((topic, i) => (
              <li
                key={i}
                className="rounded-lg border border-white/10 bg-white/[0.03] px-3 py-2 text-sm text-white/80"
              >
                {topic}
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="px-6 pb-20">
        <div className="mx-auto max-w-3xl text-center">
          <Link
            href={`/${locale}/pro-mene`}
            className="inline-block rounded-xl bg-[var(--color-brand)] px-7 py-4 text-base font-bold text-white transition-colors hover:bg-[var(--color-brand-hover)]"
          >
            {c.proMeneCta}
          </Link>
        </div>
      </section>
    </main>
  );
}
