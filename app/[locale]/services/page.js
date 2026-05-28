import Link from "next/link";
import { ArrowRight, MapPin } from "lucide-react";
import { SUPPORTED_LOCALES } from "../../_i18n/dictionary";
import {
  SERVICES,
  CITIES,
  getServiceKeys,
  getCityKeys,
} from "../../_lib/services-cities";
import Breadcrumbs from "../../_components/Breadcrumbs";

const META = {
  uk: {
    title: "Послуги — TFSA, RRSP, FHSA, exempt market для міст AB · BC · ON",
    description:
      "Освітні консультації для українців: TFSA, RRSP, FHSA, exempt market. Калгарі, Едмонтон, Ванкувер, Торонто і інші міста. Licensed Dealing Representative.",
    h1: "Послуги",
    sub: "Освітні консультації по канадських фінансах для українців у Alberta, British Columbia та Ontario. Обери послугу та місто.",
    crumbHome: "Головна",
    crumbThis: "Послуги",
    servicesLabel: "Послуги",
    citiesLabel: "Міста",
  },
  ru: {
    title: "Услуги — TFSA, RRSP, FHSA, exempt market для городов AB · BC · ON",
    description:
      "Образовательные консультации для русскоязычных: TFSA, RRSP, FHSA, exempt market. Калгари, Эдмонтон, Ванкувер, Торонто и другие.",
    h1: "Услуги",
    sub: "Образовательные консультации по канадским финансам для русскоязычных в Alberta, BC и Ontario. Выбери услугу и город.",
    crumbHome: "Главная",
    crumbThis: "Услуги",
    servicesLabel: "Услуги",
    citiesLabel: "Города",
  },
  en: {
    title: "Services — TFSA, RRSP, FHSA, exempt market for AB · BC · ON cities",
    description:
      "Educational consultations for newcomers: TFSA, RRSP, FHSA, exempt market. Calgary, Edmonton, Vancouver, Toronto and more.",
    h1: "Services",
    sub: "Educational consultations on Canadian finance for newcomers in Alberta, BC, and Ontario. Pick a service and city.",
    crumbHome: "Home",
    crumbThis: "Services",
    servicesLabel: "Services",
    citiesLabel: "Cities",
  },
};

export async function generateMetadata({ params }) {
  const { locale } = await params;
  const m = META[locale] || META.uk;
  const path = `/${locale}/services`;
  const alternates = Object.fromEntries(
    SUPPORTED_LOCALES.map((l) => [
      { uk: "uk", ru: "ru", en: "en-CA" }[l],
      `/${l}/services`,
    ])
  );
  alternates["x-default"] = "/uk/services";
  return {
    title: m.title,
    description: m.description,
    alternates: { canonical: path, languages: alternates },
    openGraph: {
      title: m.title,
      description: m.description,
      url: `https://sky-fort.ca${path}`,
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: m.title,
      description: m.description,
    },
  };
}

export default async function ServicesHub({ params }) {
  const { locale } = await params;
  const m = META[locale] || META.uk;
  const services = getServiceKeys();
  const cities = getCityKeys();

  // Pick best service-city pair for each service for "highlight" cards
  // Strategy: pair with Calgary (primary market)
  const defaultCity = "calgary";

  return (
    <main id="main" className="min-h-screen bg-[var(--color-bg)] text-[var(--color-fg)]">
      <div className="mx-auto max-w-6xl px-6 pt-28 md:pt-32">
        <Breadcrumbs
          items={[
            { label: m.crumbHome, href: `/${locale}` },
            { label: m.crumbThis },
          ]}
        />

        <header className="mt-10 max-w-3xl">
          <h1 className="font-display text-5xl text-white md:text-6xl">{m.h1}</h1>
          <p className="mt-6 text-lg text-[var(--color-fg-muted)] md:text-xl">{m.sub}</p>
        </header>

        {/* Services grid */}
        <section className="mt-12">
          <h2 className="mb-6 text-xs font-bold uppercase tracking-[0.2em] text-[var(--color-fg-subtle)]">
            {m.servicesLabel}
          </h2>
          <div className="grid gap-5 md:grid-cols-2">
            {services.map((svcKey) => {
              const svc = SERVICES[svcKey];
              const svcName =
                locale === "ru" ? svc.titleRu : locale === "en" ? svc.titleEn : svc.titleUk;
              const svcDesc =
                locale === "ru" ? svc.descRu : locale === "en" ? svc.descEn : svc.descUk;
              return (
                <Link
                  key={svcKey}
                  href={`/${locale}/services/${svcKey}/${defaultCity}`}
                  className="card-glow group block rounded-2xl border border-[var(--color-border)] bg-[var(--color-bg-card)] p-7"
                >
                  <div className="mb-3 inline-flex items-center rounded-full bg-[var(--color-brand-soft)] px-3 py-1 text-xs font-semibold uppercase tracking-wider text-[var(--color-brand)]">
                    {svc.pillar}
                  </div>
                  <h3 className="font-display text-2xl text-white">{svcName}</h3>
                  <p className="mt-3 text-[var(--color-fg-muted)]">{svcDesc}</p>
                  <span className="mt-5 inline-flex items-center gap-1 text-sm font-semibold text-[var(--color-brand)]">
                    {locale === "ru" ? "Подробнее" : locale === "en" ? "Learn more" : "Детальніше"}
                    <ArrowRight
                      className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5"
                      aria-hidden="true"
                    />
                  </span>
                </Link>
              );
            })}
          </div>
        </section>

        {/* Cities × Services matrix */}
        <section className="mt-16 mb-24">
          <h2 className="mb-6 text-xs font-bold uppercase tracking-[0.2em] text-[var(--color-fg-subtle)]">
            {m.citiesLabel}
          </h2>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {cities.map((cityKey) => {
              const ct = CITIES[cityKey];
              const cityName =
                locale === "ru" ? ct.nameRu : locale === "en" ? ct.nameEn : ct.nameUk;
              return (
                <div
                  key={cityKey}
                  className="rounded-xl border border-[var(--color-border)] bg-[var(--color-bg-card)] p-5"
                >
                  <div className="mb-3 flex items-center gap-2">
                    <MapPin size={14} className="text-[var(--color-brand)]" aria-hidden="true" />
                    <h3 className="font-semibold text-white">{cityName}</h3>
                    <span className="text-xs text-[var(--color-fg-subtle)]">
                      · {ct.province}
                    </span>
                  </div>
                  <ul className="space-y-1.5">
                    {services.map((svcKey) => {
                      const svc = SERVICES[svcKey];
                      const svcName =
                        locale === "ru"
                          ? svc.titleRu
                          : locale === "en"
                            ? svc.titleEn
                            : svc.titleUk;
                      return (
                        <li key={svcKey}>
                          <Link
                            href={`/${locale}/services/${svcKey}/${cityKey}`}
                            className="inline-flex items-center gap-1 text-sm text-[var(--color-fg-muted)] hover:text-[var(--color-brand)] transition-colors"
                          >
                            <ArrowRight size={11} className="opacity-50" aria-hidden="true" />
                            {svcName}
                          </Link>
                        </li>
                      );
                    })}
                  </ul>
                </div>
              );
            })}
          </div>
        </section>
      </div>
    </main>
  );
}
