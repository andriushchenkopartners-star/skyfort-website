// app/[locale]/calculators/financial-freedom/opengraph-image.js
// OG card for the Financial Freedom (FIRE) calculator (per locale).

import { ImageResponse } from 'next/og';
import { brandCard, OG_SIZE, OG_CONTENT_TYPE } from '../../../_lib/og-card';

export const runtime = 'nodejs';
export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;
export const alt = 'Financial Freedom Calculator — SkyFort';

const COPY = {
  uk: {
    eyebrow: 'Калькулятор',
    badge: 'FIRE',
    title: 'Коли ти станеш фінансово вільним?',
    description:
      'Точна дата freedom на основі твоїх цифр. Канадський контекст: 4% rule, CPP/OAS, exempt market accelerator.',
  },
  ru: {
    eyebrow: 'Калькулятор',
    badge: 'FIRE',
    title: 'Когда ты станешь финансово свободным?',
    description:
      'Точная дата freedom на основе твоих цифр. Канадский контекст: 4% rule, CPP/OAS, exempt market accelerator.',
  },
  en: {
    eyebrow: 'Calculator',
    badge: 'FIRE',
    title: 'When will you be financially free?',
    description:
      'Exact freedom date from your real numbers. Canadian context: 4% rule, CPP/OAS, exempt-market accelerator.',
  },
};

export default async function Image({ params }) {
  const { locale } = await params;
  const c = COPY[locale] || COPY.uk;
  return new ImageResponse(brandCard({ ...c, locale }), { ...OG_SIZE });
}
