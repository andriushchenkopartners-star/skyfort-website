// app/_components/StaticFaq.jsx
// Server-rendered FAQ accordion. Uses native <details>/<summary> so the
// accordion works without JavaScript — works for SSR, no-JS users, and
// crawlers. Pair with <FaqJsonLd> for matching FAQPage schema.
//
// Inputs:
//   faq:     Array<{ q: string; a: string | ReactNode }>
//   heading: string (the H2 above the list)
//   id:      optional id for the wrapping <section> (default "faq")

import FaqJsonLd from './FaqJsonLd';

export default function StaticFaq({ faq, heading, id = 'faq', jsonLdId }) {
  if (!Array.isArray(faq) || faq.length === 0) return null;

  return (
    <>
      <FaqJsonLd faq={faq} id={jsonLdId} />
      <section
        id={id}
        className="border-t border-[var(--color-border)] bg-[var(--color-bg)] py-20 md:py-28"
      >
        <div className="mx-auto max-w-3xl px-6">
          {heading && (
            <h2 className="mb-10 font-display text-3xl text-white md:text-5xl">
              {heading}
            </h2>
          )}
          <div className="space-y-3">
            {faq.map((item, i) => (
              <details
                key={i}
                className="group overflow-hidden rounded-xl border border-[var(--color-border)] bg-[var(--color-bg-card)] open:border-[var(--color-brand)]/40"
              >
                <summary className="flex cursor-pointer list-none items-start justify-between gap-4 px-6 py-5 text-left transition-colors hover:bg-[var(--color-bg-elevated)]">
                  <span className="font-bold uppercase tracking-wide text-white">
                    {item.q}
                  </span>
                  <span
                    aria-hidden="true"
                    className="mt-0.5 text-2xl leading-none text-[var(--color-brand)] transition-transform group-open:rotate-45"
                  >
                    +
                  </span>
                </summary>
                <div className="border-t border-[var(--color-border)] px-6 py-5 leading-relaxed text-[var(--color-fg-muted)]">
                  {item.a}
                </div>
              </details>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
