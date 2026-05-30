// app/[locale]/slovnyk/[term]/page.js
// Per-term glossary entity pages — one canonical URL + one DefinedTerm node
// per Canadian-finance concept (TFSA, CCPC, EMD, NI 45-106, …). This is the
// AEO/GEO play from the audit: AI Overviews, Perplexity and ChatGPT-search
// extract definitions from schema.org/DefinedTerm, and a dedicated indexable
// URL per term is a far stronger "we are the reference for X" signal than a
// single anchor on the glossary hub.
//
// Data + helpers come from app/_data/glossary.js (shared with the hub). UK is
// the source; every term exists in all 3 locales, so hreflang is complete.
// Compliance posture: factual, source-attributed, no recommendations.

import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowRight, ArrowLeft, ExternalLink } from "lucide-react";
import Logo from "../../../_components/Logo";
import Breadcrumbs from "../../../_components/Breadcrumbs";
import LangSwitcher from "../../../_components/LangSwitcher";
import AuthorByline from "../../../_components/AuthorByline";
import UpdatedBadge from "../../../_components/UpdatedBadge";
import { SUPPORTED_LOCALES } from "../../../_i18n/dictionary";
import {
  GLOSSARY_COPY,
  getTermIds,
  getGlossaryTerm,
  getRelatedGlossaryTerms,
} from "../../../_data/glossary";

const CALENDLY = "https://calendly.com/andriushchenko-partners/new-meeting";
const HREFLANG = { uk: "uk", ru: "ru", en: "en-CA" };

// Short label for breadcrumbs / cards — strips the "— full name" and
// "(citation)" tails, leaving just the acronym or short token (e.g. "TFSA").
function shortName(term) {
  return term.split(" — ")[0].split(" (")[0];
}

function clamp(text, max = 155) {
  return text.length > max ? `${text.slice(0, max - 1).trimEnd()}…` : text;
}

export async function generateStaticParams() {
  const out = [];
  for (const locale of SUPPORTED_LOCALES) {
    for (const term of getTermIds()) out.push({ locale, term });
  }
  return out;
}

export async function generateMetadata({ params }) {
  const { locale, term } = await params;
  const t = getGlossaryTerm(locale, term);
  if (!t) return {};
  const c = GLOSSARY_COPY[locale] || GLOSSARY_COPY.uk;
  const path = `/${locale}/slovnyk/${term}`;
  const title = `${t.term} — ${c.title}`;
  const description = clamp(t.definition);
  const alternates = Object.fromEntries(
    SUPPORTED_LOCALES.map((l) => [HREFLANG[l], `/${l}/slovnyk/${term}`])
  );
  alternates["x-default"] = `/uk/slovnyk/${term}`;
  return {
    title,
    description,
    alternates: { canonical: path, languages: alternates },
    openGraph: {
      title,
      description,
      url: `https://sky-fort.ca${path}`,
      type: "article",
    },
    twitter: { card: "summary_large_image", title, description },
  };
}

function buildJsonLd(locale, c, t, path) {
  const lang = HREFLANG[locale];
  const setUrl = `https://sky-fort.ca/${locale}/slovnyk`;
  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "DefinedTerm",
        "@id": `https://sky-fort.ca${path}`,
        name: t.term,
        description: t.definition,
        url: `https://sky-fort.ca${path}`,
        inLanguage: lang,
        inDefinedTermSet: {
          "@type": "DefinedTermSet",
          "@id": setUrl,
          name: c.title,
          url: setUrl,
        },
        ...(t.source ? { sameAs: t.source.url } : {}),
      },
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: c.crumbHome, item: `https://sky-fort.ca/${locale}` },
          { "@type": "ListItem", position: 2, name: c.crumbThis, item: setUrl },
          { "@type": "ListItem", position: 3, name: shortName(t.term), item: `https://sky-fort.ca${path}` },
        ],
      },
      {
        "@type": "WebPage",
        "@id": `https://sky-fort.ca${path}#webpage`,
        url: `https://sky-fort.ca${path}`,
        name: t.term,
        isPartOf: { "@id": setUrl },
        speakable: {
          "@type": "SpeakableSpecification",
          cssSelector: ["main h1", "main h1 ~ p:first-of-type"],
        },
      },
    ],
  };
}

export default async function GlossaryTermPage({ params }) {
  const { locale, term } = await params;
  const t = getGlossaryTerm(locale, term);
  if (!t) notFound();

  const c = GLOSSARY_COPY[locale] || GLOSSARY_COPY.uk;
  const path = `/${locale}/slovnyk/${term}`;
  const jsonLd = buildJsonLd(locale, c, t, path);
  const related = getRelatedGlossaryTerms(locale, term, 6);

  return (
    <main id="main" className="min-h-screen bg-[var(--color-bg)] text-white">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <header className="pt-8 pb-4 px-6">
        <div className="mx-auto max-w-3xl flex items-center justify-between">
          <Link href={`/${locale}`} aria-label="SkyFort home">
            <Logo variant="full" size="md" />
          </Link>
          <LangSwitcher />
        </div>
      </header>

      <section className="px-6 pt-4 pb-8">
        <div className="mx-auto max-w-3xl">
          <Breadcrumbs
            items={[
              { label: c.crumbHome, href: `/${locale}` },
              { label: c.crumbThis, href: `/${locale}/slovnyk` },
              { label: shortName(t.term) },
            ]}
          />
          <div className="mt-6 space-y-3">
            <UpdatedBadge date="2026-05-29" locale={locale} />
            <p className="text-xs font-bold uppercase tracking-[0.18em] text-[var(--color-brand)]">
              {c.termEyebrow}
            </p>
            <h1 className="text-3xl sm:text-4xl font-extrabold leading-tight">
              {t.term}
            </h1>
            <p className="text-lg leading-relaxed text-white/80">
              {t.definition}
            </p>
          </div>

          <div className="mt-5 flex flex-wrap items-center gap-4 text-sm">
            {t.source && (
              <a
                href={t.source.url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 font-semibold text-white/65 hover:text-[var(--color-brand)]"
              >
                <ExternalLink size={13} aria-hidden="true" />
                {c.sourceLabel}: {t.source.label}
              </a>
            )}
            {t.related && (
              <Link
                href={`/${locale}${t.related.href}`}
                className="font-semibold text-[var(--color-brand)] hover:text-[var(--color-brand-hover)]"
              >
                {c.relatedLabel}: {t.related.label} →
              </Link>
            )}
          </div>

          <div className="mt-8">
            <AuthorByline locale={locale} />
          </div>
        </div>
      </section>

      {/* Related terms — internal linking across the whole entity set */}
      {related.length > 0 && (
        <section className="px-6 pb-12">
          <div className="mx-auto max-w-3xl">
            <h2 className="mb-4 text-sm font-bold uppercase tracking-wider text-[var(--color-brand)]">
              {c.relatedTermsTitle}
            </h2>
            <div className="grid gap-3 sm:grid-cols-2">
              {related.map((r) => (
                <Link
                  key={r.id}
                  href={`/${locale}/slovnyk/${r.id}`}
                  className="block rounded-xl border border-white/10 bg-white/[0.03] p-4 transition-colors hover:border-[var(--color-brand)]/40"
                >
                  <div className="font-semibold text-white">{shortName(r.term)}</div>
                  <div className="mt-1 text-xs leading-relaxed text-white/65">
                    {clamp(r.definition, 110)}
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* CTA — educational discovery call */}
      <section className="px-6 pb-12">
        <div className="mx-auto max-w-3xl rounded-2xl border border-[var(--color-brand)]/30 bg-[var(--color-brand)]/[0.06] p-7 text-center sm:p-8">
          <h2 className="text-xl sm:text-2xl font-bold">{c.ctaTitle}</h2>
          <p className="mx-auto mt-3 max-w-xl text-white/75">{c.ctaText}</p>
          <a
            href={CALENDLY}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-6 inline-flex items-center gap-2 rounded-xl bg-[var(--color-brand)] px-7 py-3.5 text-base font-bold text-white transition-colors hover:bg-[var(--color-brand-hover)]"
          >
            {c.ctaButton}
            <ArrowRight size={16} aria-hidden="true" />
          </a>
        </div>
      </section>

      <section className="px-6 pb-20">
        <div className="mx-auto max-w-3xl">
          <Link
            href={`/${locale}/slovnyk`}
            className="inline-flex items-center gap-2 text-sm font-semibold text-white/60 transition-colors hover:text-[var(--color-brand)]"
          >
            <ArrowLeft size={14} aria-hidden="true" />
            {c.backToGlossary}
          </Link>
        </div>
      </section>
    </main>
  );
}
