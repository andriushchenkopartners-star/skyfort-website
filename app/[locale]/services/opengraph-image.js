// app/[locale]/services/opengraph-image.js
// OG card for the services hub (/[locale]/services). Service×city leaf
// pages have their own programmatic OG; this one fires when the hub
// index URL is shared.

import { ImageResponse } from 'next/og';
import { brandCard, OG_SIZE, OG_CONTENT_TYPE } from '../../_lib/og-card';

export const runtime = 'nodejs';
export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;
export const alt = 'SkyFort Services';

const COPY = {
  uk: {
    eyebrow: 'Послуги',
    title: 'TFSA, RRSP, FHSA, exempt market — в твоєму місті.',
    description:
      'Локальні landing pages для Калгарі, Едмонтону, Торонто, Ванкувера та інших міст. Освітньо, з регуляторним контекстом.',
  },
  ru: {
    eyebrow: 'Услуги',
    title: 'TFSA, RRSP, FHSA, exempt market — в твоём городе.',
    description:
      'Локальные landing pages для Калгари, Эдмонтона, Торонто, Ванкувера и других городов. Образовательно, с регуляторным контекстом.',
  },
  en: {
    eyebrow: 'Services',
    title: 'TFSA, RRSP, FHSA, exempt market — in your city.',
    description:
      'Local landings for Calgary, Edmonton, Toronto, Vancouver and other cities. Educational, with the regulatory context.',
  },
};

export default async function Image({ params }) {
  const { locale } = await params;
  const c = COPY[locale] || COPY.uk;
  return new ImageResponse(brandCard({ ...c, locale }), { ...OG_SIZE });
}
