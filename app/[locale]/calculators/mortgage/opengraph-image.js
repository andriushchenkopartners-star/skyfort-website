// app/[locale]/calculators/mortgage/opengraph-image.js
// OG card for the Canadian mortgage calculator (per locale).

import { ImageResponse } from 'next/og';
import { brandCard, OG_SIZE, OG_CONTENT_TYPE } from '../../../_lib/og-card';

export const runtime = 'nodejs';
export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;
export const alt = 'Canadian Mortgage Calculator — SkyFort';

const COPY = {
  uk: {
    eyebrow: 'Калькулятор',
    badge: 'Іпотека',
    title: 'Канадська іпотека — 6 інструментів в одному.',
    description:
      'Stress test (OSFI), CMHC, дострокове погашення, розрив контракту, інвестиційна нерухомість, доступність — Калгарі-focused.',
  },
  ru: {
    eyebrow: 'Калькулятор',
    badge: 'Ипотека',
    title: 'Канадская ипотека — 6 инструментов в одном.',
    description:
      'Stress test (OSFI), CMHC, досрочное погашение, разрыв контракта, инвестиционная недвижимость, доступность — Калгари-focused.',
  },
  en: {
    eyebrow: 'Calculator',
    badge: 'Mortgage',
    title: 'Canadian mortgage — 6 tools in one calculator.',
    description:
      'OSFI stress test, CMHC, early payoff, break-penalty, investment property cash flow, affordability — Calgary-focused.',
  },
};

export default async function Image({ params }) {
  const { locale } = await params;
  const c = COPY[locale] || COPY.uk;
  return new ImageResponse(brandCard({ ...c, locale }), { ...OG_SIZE });
}
