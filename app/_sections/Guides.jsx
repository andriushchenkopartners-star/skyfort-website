import { ArrowRight } from "lucide-react";
import { CONFIG } from "../_i18n/config";

export default function Guides({ content }) {
  return (
    <section id="guides" className="py-28 md:py-36">
      <div className="mx-auto max-w-6xl px-6">
        <div className="mb-16 max-w-2xl">
          <h2 className="font-display text-4xl leading-[0.95] text-white md:text-6xl">
            {content.guidesTitle}
          </h2>
          <p className="mt-6 text-lg text-[#a3a3a3]">{content.guidesSub}</p>
        </div>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {content.guides.map((g, i) => {
            const Icon = g.icon;
            return (
              <a
                key={i}
                href={`${CONFIG.pdfBaseUrl}/${g.file}`}
                target="_blank"
                rel="noopener"
                className="card-glow group relative flex flex-col rounded-2xl border border-[#2a2a2a] bg-[#1f1f1f] p-7"
                aria-label={`Download ${g.title} PDF`}
              >
                <div className="mb-6 flex h-11 w-11 items-center justify-center rounded-lg bg-[var(--color-brand)]/10 text-[var(--color-brand)]">
                  <Icon className="h-5 w-5" aria-hidden="true" />
                </div>
                <h3 className="font-display text-xl text-white">{g.title}</h3>
                <p className="mt-3 flex-1 text-sm leading-relaxed text-[#a3a3a3]">
                  {g.desc}
                </p>
                <div className="mt-6 inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-[var(--color-brand)]">
                  PDF
                  <ArrowRight
                    className="h-3 w-3 transition-transform group-hover:translate-x-0.5"
                    aria-hidden="true"
                  />
                </div>
              </a>
            );
          })}
        </div>
      </div>
    </section>
  );
}
