// app/[locale]/slovnyk/page.js
// Canadian personal-finance glossary hub — 50+ key terms (CRA, CSA,
// NI 45-106, MPC, CCPC, exempt market). Schema: DefinedTermSet with one
// DefinedTerm per row. Schema.org DefinedTermSet is exactly what AI Overviews
// and Perplexity/Claude/ChatGPT search use to extract canonical definitions
// — a strong signal that this site is a referenceable knowledge base.
//
// Term data + lookup helpers live in app/_data/glossary.js so each term also
// gets its own dedicated entity page at /[locale]/slovnyk/[term] (one
// DefinedTerm per URL) without duplicating content.
//
// Compliance posture: definitions are factual + source-attributed
// (canada.ca, ASC, CSA, IFSE). No recommendations, no return claims.

import Link from "next/link";
import { BookOpen, ExternalLink } from "lucide-react";
import Logo from "../../_components/Logo";
import Breadcrumbs from "../../_components/Breadcrumbs";
import LangSwitcher from "../../_components/LangSwitcher";
import UpdatedBadge from "../../_components/UpdatedBadge";
import { SUPPORTED_LOCALES } from "../../_i18n/dictionary";
import { GLOSSARY_COPY } from "../../_data/glossary";

export async function generateStaticParams() {
  return SUPPORTED_LOCALES.map((locale) => ({ locale }));
}

export async function generateMetadata({ params }) {
  const { locale } = await params;
  const c = GLOSSARY_COPY[locale] || GLOSSARY_COPY.uk;
  const path = `/${locale}/slovnyk`;
  const alternates = Object.fromEntries(
    SUPPORTED_LOCALES.map((l) => [
      { uk: "uk", ru: "ru", en: "en-CA" }[l],
      `/${l}/slovnyk`,
    ])
  );
  alternates["x-default"] = "/uk/slovnyk";
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
    twitter: {
      card: "summary_large_image",
      title: c.titleMeta,
      description: c.descriptionMeta,
    },
  };
}

// DefinedTermSet JSON-LD — schema.org's official glossary structure.
// AI Overviews and Perplexity treat DefinedTerm nodes as canonical
// definitions; this is the structured-data equivalent of "we are the
// reference for these terms". Each DefinedTerm @id points at the term's own
// entity page so the set and the per-term pages reinforce each other.
function buildDefinedTermSetJsonLd(locale, c, path) {
  return {
    "@context": "https://schema.org",
    "@type": "DefinedTermSet",
    name: c.title,
    description: c.subtitle,
    inLanguage: { uk: "uk", ru: "ru", en: "en-CA" }[locale],
    url: `https://sky-fort.ca${path}`,
    hasDefinedTerm: c.terms.map((t) => ({
      "@type": "DefinedTerm",
      "@id": `https://sky-fort.ca${path}/${t.id}`,
      name: t.term,
      description: t.definition,
      inDefinedTermSet: `https://sky-fort.ca${path}`,
      url: `https://sky-fort.ca${path}/${t.id}`,
      ...(t.source ? { sameAs: t.source.url } : {}),
    })),
  };
}

export default async function GlossaryPage({ params }) {
  const { locale } = await params;
  const c = GLOSSARY_COPY[locale] || GLOSSARY_COPY.uk;
  const path = `/${locale}/slovnyk`;
  const jsonLd = buildDefinedTermSetJsonLd(locale, c, path);

  // Speakable: voice-search readers (Google Assistant, AI-Overview audio)
  // get pointed at the H1 + subtitle + intro paragraph — the first
  // 2-3 sentences that summarize what the glossary covers.
  const speakableJsonLd = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "@id": `https://sky-fort.ca${path}#webpage`,
    url: `https://sky-fort.ca${path}`,
    name: c.title,
    speakable: {
      "@type": "SpeakableSpecification",
      cssSelector: ["main h1", "main h1 + p", "main h1 ~ p:first-of-type"],
    },
  };

  return (
    <main id="main" className="min-h-screen bg-[var(--color-bg)] text-white">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(speakableJsonLd) }}
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
        <div className="mx-auto max-w-5xl">
          <Breadcrumbs
            items={[
              { label: c.crumbHome, href: `/${locale}` },
              { label: c.crumbThis },
            ]}
          />
          <div className="mt-6 max-w-3xl">
            <UpdatedBadge date="2026-05-29" locale={locale} className="mb-3" />
            <p className="text-xs font-bold uppercase tracking-[0.18em] text-[var(--color-brand)]">
              {c.eyebrow}
            </p>
            <h1 className="mt-3 text-4xl sm:text-5xl font-extrabold leading-tight">
              {c.title}
            </h1>
            <p className="mt-4 text-lg text-white/75">{c.subtitle}</p>
            <p className="mt-3 text-sm text-white/65">{c.intro}</p>
          </div>
        </div>
      </section>

      <section className="px-6 pb-12">
        <div className="mx-auto max-w-5xl">
          <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-5">
            <p className="mb-3 flex items-center gap-2 text-xs font-bold uppercase tracking-[0.16em] text-white/60">
              <BookOpen size={14} aria-hidden="true" />
              {c.terms.length} terms
            </p>
            <div className="flex flex-wrap gap-2">
              {c.terms.map((t) => (
                <a
                  key={t.id}
                  href={`#${t.id}`}
                  className="rounded-md border border-white/10 bg-black/30 px-3 py-1.5 text-xs font-semibold text-white/80 transition-colors hover:border-[var(--color-brand)]/40 hover:text-white"
                >
                  {t.term.split(" — ")[0].split(" (")[0]}
                </a>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="px-6 pb-20">
        <div className="mx-auto max-w-3xl">
          <dl className="space-y-5">
            {c.terms.map((t) => (
              <div
                key={t.id}
                id={t.id}
                className="scroll-mt-24 rounded-2xl border border-white/10 bg-white/[0.03] p-6"
              >
                <dt className="text-lg sm:text-xl font-bold text-white">
                  <Link
                    href={`/${locale}/slovnyk/${t.id}`}
                    className="transition-colors hover:text-[var(--color-brand)]"
                  >
                    {t.term}
                  </Link>
                </dt>
                <dd className="mt-3 text-sm leading-relaxed text-white/80">
                  {t.definition}
                </dd>
                <div className="mt-4 flex flex-wrap items-center gap-4 text-xs">
                  <Link
                    href={`/${locale}/slovnyk/${t.id}`}
                    className="inline-flex items-center gap-1.5 font-semibold text-[var(--color-brand)] hover:text-[var(--color-brand-hover)]"
                  >
                    {t.term.split(" — ")[0].split(" (")[0]} →
                  </Link>
                  {t.source && (
                    <a
                      href={t.source.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 font-semibold text-white/60 hover:text-[var(--color-brand)]"
                    >
                      <ExternalLink size={12} aria-hidden="true" />
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
              </div>
            ))}
          </dl>
        </div>
      </section>
    </main>
  );
}
