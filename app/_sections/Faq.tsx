"use client";

import { useState } from "react";
import type { ReactNode } from "react";
import FaqJsonLd from "../_components/FaqJsonLd";

interface FaqItem {
  q: string;
  a: ReactNode;
}

interface FaqContent {
  faqTitle: string;
  faq: FaqItem[];
}

export default function Faq({ content }: { content: FaqContent }) {
  const [open, setOpen] = useState(0);
  return (
    <section className="py-28 md:py-36" id="faq">
      <FaqJsonLd faq={content.faq} id="https://sky-fort.ca/#faq" />
      <div className="mx-auto max-w-3xl px-6">
        <h2 className="mb-16 font-display text-4xl leading-[0.95] text-white md:text-6xl">
          {content.faqTitle}
        </h2>
        <dl className="space-y-4">
          {content.faq.map((item, i) => (
            <div
              key={i}
              className="overflow-hidden rounded-xl border border-[var(--color-border)] bg-[var(--color-bg-card)]"
            >
              <dt>
                <button
                  onClick={() => setOpen(open === i ? -1 : i)}
                  aria-expanded={open === i}
                  className="flex w-full items-start justify-between gap-4 px-6 py-5 text-left transition-colors hover:bg-[var(--color-bg-elevated)]"
                >
                  <span className="font-bold uppercase tracking-wide text-white">
                    {item.q}
                  </span>
                  <span
                    className={`mt-1 text-2xl leading-none text-[var(--color-brand)] transition-transform ${
                      open === i ? "rotate-45" : ""
                    }`}
                    aria-hidden="true"
                  >
                    +
                  </span>
                </button>
              </dt>
              {/* Always render <dd> in the DOM so Googlebot, AI crawlers,
                  and screen readers can extract the answer text even when
                  the accordion is collapsed. Visibility is controlled via
                  CSS (hidden when not open). Before this fix only the
                  currently-open answer was in the DOM — 11 of 12 answers
                  were invisible to crawlers, contradicting the FAQPage
                  schema we emit. 3rd re-audit (1.13). */}
              <dd
                className={`border-t border-[var(--color-border)] px-6 py-5 leading-relaxed text-[var(--color-fg-muted)] ${
                  open === i ? "" : "hidden"
                }`}
              >
                {item.a}
              </dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}
