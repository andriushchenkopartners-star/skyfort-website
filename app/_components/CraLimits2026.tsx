// app/_components/CraLimits2026.tsx
// Reusable 2026 CRA tax-shelter limits table — single source of truth for
// blog posts, calculators, service pages. The 4th re-audit (2.13) flagged
// the absence of a structured, source-attributed table as a citation gap
// against TD / Wealthsimple / Questrade in AI Overviews.
//
// Numbers verified Q1 2026 from canada.ca / CRA / Finance Canada:
// - TFSA: $7,000 annual (3rd consecutive year); cumulative $109,000 if
//   eligible since 2009
// - RRSP: $33,810 annual (up from $32,490 in 2025; 18% of earned income cap)
// - FHSA: $8,000 annual / $40,000 lifetime
// - RESP CESG: up to $7,200 lifetime per beneficiary
// - HBP: $60,000 (raised from $35,000 effective April 16, 2024)
//
// Schema-friendly: numbers are inline so Google + AI extractors pull them.
// Per Wellows AI Overview analysis 2026, structured tables with 15+ named
// entities + verifiable claims have 4.8× higher citation rate.

type Locale = "uk" | "ru" | "en";

interface CraRow {
  account: string;
  annual: string;
  lifetime: string;
  source: string;
  sourceUrl: string;
}

interface CraCopy {
  title: string;
  sub: string;
  headers: {
    account: string;
    annual: string;
    lifetime: string;
    source: string;
  };
  rows: CraRow[];
  note: string;
}

const COPY: Record<Locale, CraCopy> = {
  uk: {
    title: "Ліміти CRA на 2026 рік",
    sub: "Усі цифри з canada.ca. Перевір актуальність на CRA My Account.",
    headers: {
      account: "Рахунок",
      annual: "Річний ліміт 2026",
      lifetime: "Накопичений / lifetime",
      source: "Джерело",
    },
    rows: [
      {
        account: "TFSA",
        annual: "$7,000",
        lifetime: "$109,000 (резидент з 2009)",
        source: "canada.ca/tfsa-limits",
        sourceUrl: "https://www.canada.ca/en/revenue-agency/services/tax/individuals/topics/tax-free-savings-account/contributions.html",
      },
      {
        account: "RRSP",
        annual: "$33,810",
        lifetime: "18% від earned income (за прошлий рік)",
        source: "canada.ca/rrsp-deduction-limit",
        sourceUrl: "https://www.canada.ca/en/revenue-agency/services/tax/individuals/topics/rrsps-related-plans/contributing-a-rrsp-prpp/rrsp-deduction-limit.html",
      },
      {
        account: "FHSA",
        annual: "$8,000",
        lifetime: "$40,000",
        source: "canada.ca/fhsa",
        sourceUrl: "https://www.canada.ca/en/revenue-agency/services/tax/individuals/topics/first-home-savings-account.html",
      },
      {
        account: "RESP / CESG",
        annual: "до $2,500 (для max CESG)",
        lifetime: "$7,200 CESG · $50,000 RESP",
        source: "canada.ca/cesg",
        sourceUrl: "https://www.canada.ca/en/employment-social-development/services/student-financial-aid/education-savings/resp/grants.html",
      },
      {
        account: "RRSP HBP withdrawal",
        annual: "—",
        lifetime: "$60,000 (підвищено з 2024)",
        source: "canada.ca/hbp",
        sourceUrl: "https://www.canada.ca/en/revenue-agency/services/tax/individuals/topics/rrsps-related-plans/home-buyers-plan.html",
      },
    ],
    note: "Освітньо. Перевір особисті ліміти в CRA My Account — це твій єдиний authoritative джерело.",
  },
  ru: {
    title: "Лимиты CRA на 2026 год",
    sub: "Все цифры из canada.ca. Проверь актуальность в CRA My Account.",
    headers: {
      account: "Счёт",
      annual: "Годовой лимит 2026",
      lifetime: "Накопленный / lifetime",
      source: "Источник",
    },
    rows: [
      {
        account: "TFSA",
        annual: "$7,000",
        lifetime: "$109,000 (резидент с 2009)",
        source: "canada.ca/tfsa-limits",
        sourceUrl: "https://www.canada.ca/en/revenue-agency/services/tax/individuals/topics/tax-free-savings-account/contributions.html",
      },
      {
        account: "RRSP",
        annual: "$33,810",
        lifetime: "18% от earned income (за прошлый год)",
        source: "canada.ca/rrsp-deduction-limit",
        sourceUrl: "https://www.canada.ca/en/revenue-agency/services/tax/individuals/topics/rrsps-related-plans/contributing-a-rrsp-prpp/rrsp-deduction-limit.html",
      },
      {
        account: "FHSA",
        annual: "$8,000",
        lifetime: "$40,000",
        source: "canada.ca/fhsa",
        sourceUrl: "https://www.canada.ca/en/revenue-agency/services/tax/individuals/topics/first-home-savings-account.html",
      },
      {
        account: "RESP / CESG",
        annual: "до $2,500 (для max CESG)",
        lifetime: "$7,200 CESG · $50,000 RESP",
        source: "canada.ca/cesg",
        sourceUrl: "https://www.canada.ca/en/employment-social-development/services/student-financial-aid/education-savings/resp/grants.html",
      },
      {
        account: "RRSP HBP withdrawal",
        annual: "—",
        lifetime: "$60,000 (повышено с 2024)",
        source: "canada.ca/hbp",
        sourceUrl: "https://www.canada.ca/en/revenue-agency/services/tax/individuals/topics/rrsps-related-plans/home-buyers-plan.html",
      },
    ],
    note: "Образовательно. Проверь личные лимиты в CRA My Account — это твой единственный authoritative источник.",
  },
  en: {
    title: "Canadian 2026 tax-shelter limits",
    sub: "Numbers sourced from canada.ca. Always confirm in your CRA My Account.",
    headers: {
      account: "Account",
      annual: "Annual limit 2026",
      lifetime: "Cumulative / lifetime",
      source: "Source",
    },
    rows: [
      {
        account: "TFSA",
        annual: "$7,000",
        lifetime: "$109,000 (resident since 2009)",
        source: "canada.ca/tfsa-limits",
        sourceUrl: "https://www.canada.ca/en/revenue-agency/services/tax/individuals/topics/tax-free-savings-account/contributions.html",
      },
      {
        account: "RRSP",
        annual: "$33,810",
        lifetime: "18% of prior-year earned income",
        source: "canada.ca/rrsp-deduction-limit",
        sourceUrl: "https://www.canada.ca/en/revenue-agency/services/tax/individuals/topics/rrsps-related-plans/contributing-a-rrsp-prpp/rrsp-deduction-limit.html",
      },
      {
        account: "FHSA",
        annual: "$8,000",
        lifetime: "$40,000",
        source: "canada.ca/fhsa",
        sourceUrl: "https://www.canada.ca/en/revenue-agency/services/tax/individuals/topics/first-home-savings-account.html",
      },
      {
        account: "RESP / CESG",
        annual: "up to $2,500 (for max CESG)",
        lifetime: "$7,200 CESG · $50,000 RESP",
        source: "canada.ca/cesg",
        sourceUrl: "https://www.canada.ca/en/employment-social-development/services/student-financial-aid/education-savings/resp/grants.html",
      },
      {
        account: "RRSP HBP withdrawal",
        annual: "—",
        lifetime: "$60,000 (raised in 2024)",
        source: "canada.ca/hbp",
        sourceUrl: "https://www.canada.ca/en/revenue-agency/services/tax/individuals/topics/rrsps-related-plans/home-buyers-plan.html",
      },
    ],
    note: "Educational. Always confirm your personal limits in CRA My Account — that's the only authoritative source.",
  },
};

export default function CraLimits2026({ locale = "uk" }: { locale?: Locale }) {
  const c = COPY[locale] || COPY.uk;
  return (
    <section className="my-10 rounded-2xl border border-[var(--color-border)] bg-[var(--color-bg-card)] p-6 md:p-8">
      <header className="mb-5">
        <h3 className="font-display text-xl text-white md:text-2xl">{c.title}</h3>
        <p className="mt-2 text-sm text-[var(--color-fg-muted)]">{c.sub}</p>
      </header>
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-[var(--color-border)] text-left text-xs uppercase tracking-wider text-[var(--color-fg-subtle)]">
              <th className="px-2 py-3 font-semibold">{c.headers.account}</th>
              <th className="px-2 py-3 font-semibold">{c.headers.annual}</th>
              <th className="px-2 py-3 font-semibold">{c.headers.lifetime}</th>
              <th className="px-2 py-3 font-semibold">{c.headers.source}</th>
            </tr>
          </thead>
          <tbody>
            {c.rows.map((row, i) => (
              <tr
                key={i}
                className="border-b border-[var(--color-border)] last:border-b-0"
              >
                <td className="px-2 py-3 font-semibold text-white">{row.account}</td>
                <td className="px-2 py-3 text-[var(--color-fg)]">{row.annual}</td>
                <td className="px-2 py-3 text-[var(--color-fg-muted)]">{row.lifetime}</td>
                <td className="px-2 py-3 text-xs">
                  <a
                    href={row.sourceUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[var(--color-brand)] transition-colors duration-150 ease-[var(--ease-out)] hover:text-[var(--color-brand-hover)]"
                  >
                    {row.source} ↗
                  </a>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <p className="mt-5 text-xs italic text-[var(--color-fg-subtle)]">{c.note}</p>
    </section>
  );
}
