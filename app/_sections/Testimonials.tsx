// app/_sections/Testimonials.tsx
// Homepage social proof. Conditionally renders:
//   - If TESTIMONIALS array has entries → full carousel/grid of reviews + Review schema
//   - If empty → trust-signals fallback (NRD verification, languages, jurisdictions)
//
// Compliance: see app/_data/testimonials.js for CSA NI 31-103 notes.

import { Quote, ShieldCheck, Languages, Star, MapPin, ExternalLink } from "lucide-react";
import { getTestimonials, getAggregateRating } from "../_data/testimonials";
import Reveal from "../_components/Reveal";

type Locale = "uk" | "ru" | "en";

interface TrustSignal {
  icon: string;
  label: string;
  value: string;
  sub: string;
  href?: string;
}

interface TestimonialsCopy {
  eyebrow: string;
  headlineWithData: string;
  headlineEmpty: string;
  emptyLead: string;
  trustSignals: TrustSignal[];
  leaveReviewLine: string;
  ratingLabel: string;
  reviewsLabel: string;
}

const COPY: Record<Locale, TestimonialsCopy> = {
  uk: {
    eyebrow: "Що кажуть клієнти",
    headlineWithData: "Реальні відгуки",
    headlineEmpty: "Перевір довіру — на цифрах, не словах",
    emptyLead:
      "Я ще збираю письмові відгуки від клієнтів. Поки що — ось як перевірити серйозність моєї практики за 3 хвилини:",
    trustSignals: [
      {
        icon: "shield",
        label: "Зареєстрований у CSA NRD",
        value: "NRD #4575551",
        sub: "Перевір на info.securities-administrators.ca",
        href: "https://info.securities-administrators.ca/nrsmobile/nrssearch.aspx",
      },
      {
        icon: "map",
        label: "Ліцензований у",
        value: "AB · BC · ON",
        sub: "Provincial registration окремо для кожної",
      },
      {
        icon: "lang",
        label: "Робочі мови",
        value: "UA · RU · EN",
        sub: "Discovery call твоєю мовою",
      },
    ],
    leaveReviewLine:
      "Працювали разом? Можеш залишити відгук на Google Business (link з'явиться скоро).",
    ratingLabel: "на основі",
    reviewsLabel: "відгуків",
  },
  ru: {
    eyebrow: "Что говорят клиенты",
    headlineWithData: "Реальные отзывы",
    headlineEmpty: "Проверь доверие — на цифрах, не словах",
    emptyLead:
      "Я ещё собираю письменные отзывы от клиентов. Пока — вот как проверить серьёзность моей практики за 3 минуты:",
    trustSignals: [
      {
        icon: "shield",
        label: "Зарегистрирован в CSA NRD",
        value: "NRD #4575551",
        sub: "Проверь на info.securities-administrators.ca",
        href: "https://info.securities-administrators.ca/nrsmobile/nrssearch.aspx",
      },
      {
        icon: "map",
        label: "Лицензирован в",
        value: "AB · BC · ON",
        sub: "Provincial registration отдельно для каждой",
      },
      {
        icon: "lang",
        label: "Рабочие языки",
        value: "UA · RU · EN",
        sub: "Discovery call на твоём языке",
      },
    ],
    leaveReviewLine:
      "Работали вместе? Можешь оставить отзыв на Google Business (link появится скоро).",
    ratingLabel: "на основе",
    reviewsLabel: "отзывов",
  },
  en: {
    eyebrow: "What clients say",
    headlineWithData: "Real reviews",
    headlineEmpty: "Verify trust — by the numbers, not words",
    emptyLead:
      "I'm still collecting written client reviews. In the meantime, here's how to verify the seriousness of my practice in 3 minutes:",
    trustSignals: [
      {
        icon: "shield",
        label: "Registered with CSA NRD",
        value: "NRD #4575551",
        sub: "Verify at info.securities-administrators.ca",
        href: "https://info.securities-administrators.ca/nrsmobile/nrssearch.aspx",
      },
      {
        icon: "map",
        label: "Licensed in",
        value: "AB · BC · ON",
        sub: "Provincial registration in each",
      },
      {
        icon: "lang",
        label: "Working languages",
        value: "UA · RU · EN",
        sub: "Discovery call in your language",
      },
    ],
    leaveReviewLine:
      "Worked together? You can leave a review on Google Business (link coming soon).",
    ratingLabel: "based on",
    reviewsLabel: "reviews",
  },
};

function pickIcon(name: string, className: string) {
  if (name === "shield") return <ShieldCheck className={className} aria-hidden="true" />;
  if (name === "map") return <MapPin className={className} aria-hidden="true" />;
  if (name === "lang") return <Languages className={className} aria-hidden="true" />;
  return null;
}

export default function Testimonials({ locale = "uk" }: { locale?: Locale }) {
  const c = COPY[locale] || COPY.uk;
  const items = getTestimonials(locale, 6);
  const hasData = items.length > 0;
  const aggregate = hasData ? getAggregateRating() : null;

  // Review JSON-LD when data exists
  const jsonLd = hasData
    ? {
        "@context": "https://schema.org",
        "@type": "FinancialService",
        "@id": "https://sky-fort.ca/#business",
        ...(aggregate
          ? {
              aggregateRating: {
                "@type": "AggregateRating",
                ratingValue: aggregate.ratingValue,
                reviewCount: aggregate.reviewCount,
                bestRating: 5,
                worstRating: 1,
              },
            }
          : {}),
        review: items.map((t) => ({
          "@type": "Review",
          author: { "@type": "Person", name: t.authorName },
          datePublished: t.datePublished,
          reviewBody: t.text,
          reviewRating: {
            "@type": "Rating",
            ratingValue: t.rating,
            bestRating: 5,
            worstRating: 1,
          },
        })),
      }
    : null;

  return (
    <section
      className="border-y border-[var(--color-border)] bg-[var(--color-bg-elevated)] py-20 md:py-28"
      aria-label={c.eyebrow}
    >
      {jsonLd && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      )}

      <div className="mx-auto max-w-6xl px-6">
        <div className="mb-10">
          <div className="mb-3 text-xs font-bold uppercase tracking-[0.16em] text-[var(--color-brand)]">
            {c.eyebrow}
          </div>
          <h2 className="font-display text-3xl text-[var(--color-fg)] md:text-5xl">
            {hasData ? c.headlineWithData : c.headlineEmpty}
          </h2>
          {hasData && aggregate && (
            <p className="mt-4 text-sm text-[var(--color-fg-muted)]">
              <span className="inline-flex items-center gap-1 align-middle">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star
                    key={i}
                    className={
                      i < Math.round(aggregate.ratingValue)
                        ? "h-4 w-4 fill-[var(--color-accent)] text-[var(--color-accent)]"
                        : "h-4 w-4 text-[var(--color-fg-subtle)]"
                    }
                    aria-hidden="true"
                  />
                ))}
              </span>{" "}
              <span className="ml-2 font-semibold text-[var(--color-fg)]">
                {aggregate.ratingValue.toFixed(1)}/5
              </span>{" "}
              <span>
                {c.ratingLabel} {aggregate.reviewCount} {c.reviewsLabel}
              </span>
            </p>
          )}
        </div>

        {hasData ? (
          // Real testimonials grid
          <Reveal as="div" stagger className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {items.map((t) => (
              <article
                key={t.id}
                className="flex flex-col rounded-2xl border border-[var(--color-border)] bg-[var(--color-bg-card)] p-6"
              >
                <Quote
                  className="mb-3 h-5 w-5 text-[var(--color-brand)]"
                  aria-hidden="true"
                />
                <p className="flex-1 text-[var(--color-fg)] leading-relaxed">{t.text}</p>
                <div className="mt-5 flex items-center justify-between text-sm">
                  <div>
                    <div className="font-semibold text-[var(--color-fg)]">{t.authorName}</div>
                    {(t.authorCity || t.authorContext) && (
                      <div className="text-xs text-[var(--color-fg-subtle)]">
                        {[t.authorCity, t.authorContext].filter(Boolean).join(" · ")}
                      </div>
                    )}
                  </div>
                  <div className="flex items-center gap-0.5" aria-label={`${t.rating} of 5`}>
                    {Array.from({ length: 5 }).map((_, i) => (
                      <Star
                        key={i}
                        className={
                          i < t.rating
                            ? "h-3.5 w-3.5 fill-[var(--color-accent)] text-[var(--color-accent)]"
                            : "h-3.5 w-3.5 text-[var(--color-fg-subtle)]"
                        }
                        aria-hidden="true"
                      />
                    ))}
                  </div>
                </div>
              </article>
            ))}
          </Reveal>
        ) : (
          // Empty state — trust signals fallback
          <>
            <p className="mb-8 max-w-2xl text-base text-[var(--color-fg-muted)] md:text-lg">
              {c.emptyLead}
            </p>

            <Reveal as="div" stagger className="grid gap-4 md:grid-cols-3">
              {c.trustSignals.map((sig, i) => {
                const Inner = (
                  <div className="flex h-full flex-col rounded-2xl border border-[var(--color-border)] bg-[var(--color-bg-card)] p-6 transition-colors hover:border-[var(--color-brand)]/40">
                    <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-xl bg-[var(--color-brand-soft)]">
                      {pickIcon(sig.icon, "h-5 w-5 text-[var(--color-brand)]")}
                    </div>
                    <div className="text-xs uppercase tracking-wider text-[var(--color-fg-subtle)]">
                      {sig.label}
                    </div>
                    <div className="mt-2 font-display text-2xl text-[var(--color-fg)]">
                      {sig.value}
                    </div>
                    <div className="mt-2 flex items-center gap-1 text-xs text-[var(--color-fg-muted)]">
                      <span>{sig.sub}</span>
                      {sig.href && (
                        <ExternalLink
                          className="h-3 w-3 flex-shrink-0"
                          aria-hidden="true"
                        />
                      )}
                    </div>
                  </div>
                );
                return sig.href ? (
                  <a
                    key={i}
                    href={sig.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block"
                  >
                    {Inner}
                  </a>
                ) : (
                  <div key={i}>{Inner}</div>
                );
              })}
            </Reveal>

            <p className="mt-10 text-sm text-[var(--color-fg-subtle)]">
              {c.leaveReviewLine}
            </p>
          </>
        )}
      </div>
    </section>
  );
}
