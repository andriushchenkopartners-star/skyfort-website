// app/[locale]/eligibility/opengraph-image.js
// OG card for the Eligible Investor self-check.

import { ImageResponse } from 'next/og';
import { brandCard, OG_SIZE, OG_CONTENT_TYPE } from '../../_lib/og-card';

export const runtime = 'nodejs';
export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;
export const alt = 'Eligible Investor self-check — SkyFort';

const COPY = {
  uk: {
    eyebrow: 'Self-check',
    badge: 'NI 45-106',
    title: 'Чи ти Eligible Investor?',
    description:
      '4 питання · 60 секунд · попередня класифікація за NI 45-106. Не legal opinion — освітня орієнтація.',
  },
  ru: {
    eyebrow: 'Self-check',
    badge: 'NI 45-106',
    title: 'Ты Eligible Investor?',
    description:
      '4 вопроса · 60 секунд · предварительная классификация по NI 45-106. Не legal opinion — образовательная ориентация.',
  },
  en: {
    eyebrow: 'Self-check',
    badge: 'NI 45-106',
    title: 'Are you an Eligible Investor?',
    description:
      '4 questions · 60 seconds · preliminary categorisation under NI 45-106. Not a legal opinion — educational orientation.',
  },
};

export default async function Image({ params }) {
  const { locale } = await params;
  const c = COPY[locale] || COPY.uk;
  return new ImageResponse(brandCard({ ...c, locale }), { ...OG_SIZE });
}
