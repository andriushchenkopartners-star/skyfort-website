"use client";

import { useState } from "react";
import FaqJsonLd from "../_components/FaqJsonLd";

export default function Faq({ content }) {
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
              className="overflow-hidden rounded-xl border border-[#2a2a2a] bg-[#1f1f1f]"
            >
              <dt>
                <button
                  onClick={() => setOpen(open === i ? -1 : i)}
                  aria-expanded={open === i}
                  className="flex w-full items-start justify-between gap-4 px-6 py-5 text-left transition-colors hover:bg-[#222]"
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
              {open === i && (
                <dd className="border-t border-[#2a2a2a] px-6 py-5 leading-relaxed text-[#a3a3a3]">
                  {item.a}
                </dd>
              )}
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}
