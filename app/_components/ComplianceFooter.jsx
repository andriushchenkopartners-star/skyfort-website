'use client';

// app/_components/ComplianceFooter.jsx
// Slim regulatory footer rendered on EVERY public page via the root layout.
// Why every page: per CSA/CIRO Joint Staff Notice 31-369 (December 11, 2025)
// "Registered firms are reminded that depending on the circumstances, they
// may be held responsible for statements made on their behalf." — disclosure
// has to be visible everywhere a registered DR's brand appears, not just on
// the homepage. The rich homepage Footer (_sections/Footer.jsx) keeps its
// contact + nav + tagline; this slim band sits beneath it with the
// regulatory floor.
//
// Locale resolved from pathname (no prop required → drop-in compatible with
// any page tree). Hidden on /portal and /admin — those have their own
// compliance UX inside the dashboard chrome.

import Link from 'next/link';
import { usePathname } from 'next/navigation';

const SUPPORTED = ['uk', 'ru', 'en'];
function localeFromPath(p) {
  const first = p?.split('/')[1];
  return SUPPORTED.includes(first) ? first : 'uk';
}

const NRD_URL =
  'https://info.securities-administrators.ca/nrsmobile/nrssearch.aspx';

const COPY = {
  uk: {
    line1: 'Andrii Andriushchenko · Licensed Dealing Representative · NRD #4575551',
    line2: 'Axcess Capital Advisors Inc. (Exempt Market Dealer) · Alberta · BC · Ontario',
    disclosure:
      'Освітній контент загального характеру — не персоналізована порада. Усі публічні матеріали (включно з TikTok / Instagram / YouTube) є освітніми. Персональні рекомендації — лише після формального KYC + Suitability Assessment згідно з NI 31-103. Відповідно до Joint CSA/CIRO Staff Notice 31-369 (грудень 2025).',
    verify: 'Перевірити в CSA NRD',
    verifyHint: '(введи 4575551)',
  },
  ru: {
    line1: 'Andrii Andriushchenko · Licensed Dealing Representative · NRD #4575551',
    line2: 'Axcess Capital Advisors Inc. (Exempt Market Dealer) · Alberta · BC · Ontario',
    disclosure:
      'Образовательный контент общего характера — не персонализированная рекомендация. Все публичные материалы (включая TikTok / Instagram / YouTube) являются образовательными. Персональные рекомендации — только после формального KYC + Suitability Assessment согласно NI 31-103. В соответствии с Joint CSA/CIRO Staff Notice 31-369 (декабрь 2025).',
    verify: 'Проверить в CSA NRD',
    verifyHint: '(введи 4575551)',
  },
  en: {
    line1: 'Andrii Andriushchenko · Licensed Dealing Representative · NRD #4575551',
    line2: 'Axcess Capital Advisors Inc. (Exempt Market Dealer) · Alberta · BC · Ontario',
    disclosure:
      'General educational content — not personalised advice. All public materials (including TikTok / Instagram / YouTube) are educational. Personal recommendations are made only after a formal KYC + Suitability Assessment under NI 31-103. Per Joint CSA/CIRO Staff Notice 31-369 (December 2025).',
    verify: 'Verify on CSA NRD',
    verifyHint: '(type 4575551)',
  },
};

export default function ComplianceFooter() {
  const pathname = usePathname() || '/';
  // Portal + admin have their own compliance UX; legacy landings keep
  // their own footers. Skip on these surfaces to avoid double disclosure.
  if (pathname.includes('/portal') || pathname.includes('/admin')) return null;

  const locale = localeFromPath(pathname);
  const c = COPY[locale] || COPY.uk;

  return (
    <footer
      role="contentinfo"
      aria-label="Regulatory disclosure"
      className="border-t border-[#1f1f1f] bg-[#0d0d0d] py-7"
    >
      <div className="mx-auto max-w-4xl px-6 text-center">
        <p className="text-[11px] font-semibold uppercase tracking-wider text-[#a3a3a3]">
          {c.line1}
        </p>
        <p className="mt-1 text-[11px] text-[#6b6b6b]">{c.line2}</p>
        <p className="mx-auto mt-4 max-w-3xl text-[10px] leading-relaxed text-[#6b6b6b]">
          {c.disclosure}
        </p>
        <div className="mt-4 flex flex-wrap items-center justify-center gap-2 text-[10px]">
          <a
            href={NRD_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="font-semibold text-[var(--color-brand)] hover:text-[var(--color-brand-hover)]"
          >
            {c.verify} →
          </a>
          <span className="text-[#6b6b6b]">{c.verifyHint}</span>
        </div>
      </div>
    </footer>
  );
}
