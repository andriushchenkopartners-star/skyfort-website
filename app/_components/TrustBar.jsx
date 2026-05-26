"use client";

// TrustBar — compact band of compliance signals.
// Use under hero on every multilingual page. Locale-aware copy.

import { ShieldCheck, Building2, ExternalLink, Globe } from "lucide-react";

const NRD_URL =
  "https://info.securities-administrators.ca/nrsmobile/NRSIndivRegistrationRecord.aspx?from=search%7Cindiv&indivId=4575551";
const FIRM_URL =
  "https://info.securities-administrators.ca/nrsmobile/NRSFirmRegistrationRecord.aspx?from=search%7Cfirm&firmId=30948";

const COPY = {
  uk: {
    nrd: "Перевірити реєстрацію",
    firm: "Axcess Capital Advisors Inc.",
    nrdLabel: "Licensed DR · NRD",
    firmLabel: "EMD реєстрація",
    langsLabel: "Мови: UK · RU · EN",
  },
  ru: {
    nrd: "Проверить регистрацию",
    firm: "Axcess Capital Advisors Inc.",
    nrdLabel: "Licensed DR · NRD",
    firmLabel: "EMD регистрация",
    langsLabel: "Языки: UK · RU · EN",
  },
  en: {
    nrd: "Verify registration",
    firm: "Axcess Capital Advisors Inc.",
    nrdLabel: "Licensed DR · NRD",
    firmLabel: "EMD registration",
    langsLabel: "Languages: UK · RU · EN",
  },
};

export default function TrustBar({ locale = "uk", className = "" }) {
  const c = COPY[locale] || COPY.uk;
  return (
    <section
      aria-label="Regulatory trust signals"
      className={`border-y border-[#2a2a2a] bg-[#191919]/60 backdrop-blur-sm ${className}`}
    >
      <div className="mx-auto flex max-w-6xl flex-col items-center gap-4 px-6 py-5 text-sm md:flex-row md:justify-between md:gap-6">
        {/* NRD */}
        <a
          href={NRD_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="group inline-flex items-center gap-2 text-[var(--color-fg-muted)] transition-colors hover:text-[var(--color-brand)]"
        >
          <ShieldCheck className="h-4 w-4 text-[var(--color-brand)]" aria-hidden="true" />
          <span className="text-xs">
            {c.nrdLabel} <span className="font-mono font-semibold text-[var(--color-fg)]">#4575551</span>
          </span>
          <span className="hidden text-xs underline underline-offset-2 md:inline">
            {c.nrd}
          </span>
          <ExternalLink className="h-3 w-3 opacity-60 transition group-hover:opacity-100" aria-hidden="true" />
        </a>

        {/* Firm */}
        <a
          href={FIRM_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="group inline-flex items-center gap-2 text-[var(--color-fg-muted)] transition-colors hover:text-[var(--color-brand)]"
        >
          <Building2 className="h-4 w-4 text-[var(--color-brand)]" aria-hidden="true" />
          <span className="text-xs">
            {c.firmLabel}: <span className="font-semibold text-[var(--color-fg)]">{c.firm}</span>
          </span>
          <ExternalLink className="h-3 w-3 opacity-60 transition group-hover:opacity-100" aria-hidden="true" />
        </a>

        {/* Coverage */}
        <div className="inline-flex items-center gap-2 text-xs text-[var(--color-fg-muted)]">
          <Globe className="h-4 w-4 text-[var(--color-brand)]" aria-hidden="true" />
          <span>Alberta · BC · Ontario · {c.langsLabel}</span>
        </div>
      </div>
    </section>
  );
}
