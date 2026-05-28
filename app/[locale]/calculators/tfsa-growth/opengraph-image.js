// app/[locale]/calculators/tfsa-growth/opengraph-image.js
// OG card for the TFSA growth calculator (per locale).

import { ImageResponse } from 'next/og';
import { brandCard, OG_SIZE, OG_CONTENT_TYPE } from '../../../_lib/og-card';

export const runtime = 'nodejs';
export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;
export const alt = 'TFSA Growth Calculator — SkyFort';

const COPY = {
  uk: {
    eyebrow: 'Калькулятор',
    badge: 'TFSA',
    title: 'Скільки буде у твоєму TFSA через 20 років?',
    description:
      'Реальна compound-interest математика. Порівняй банк, GIC і broad-market diversified ETF своїми очима.',
  },
  ru: {
    eyebrow: 'Калькулятор',
    badge: 'TFSA',
    title: 'Сколько будет в твоём TFSA через 20 лет?',
    description:
      'Реальная compound-interest математика. Сравни банк, GIC и broad-market diversified ETF своими глазами.',
  },
  en: {
    eyebrow: 'Calculator',
    badge: 'TFSA',
    title: 'How much will your TFSA have in 20 years?',
    description:
      'Real compound-interest math. Compare bank, GIC, and broad-market diversified ETF outcomes side by side.',
  },
};

export default async function Image({ params }) {
  const { locale } = await params;
  const c = COPY[locale] || COPY.uk;
  return new ImageResponse(brandCard({ ...c, locale }), { ...OG_SIZE });
}
