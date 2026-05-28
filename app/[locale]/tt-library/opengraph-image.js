// OG card for /tt-library — TikTok transcript library.

import { ImageResponse } from 'next/og';
import { brandCard, OG_SIZE, OG_CONTENT_TYPE } from '../../_lib/og-card';

export const runtime = 'nodejs';
export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;
export const alt = 'TikTok library — транскрипти всіх відео';

const COPY = {
  uk: {
    eyebrow: 'TIKTOK LIBRARY',
    badge: 'Transcripts',
    title: 'TikTok бібліотека з транскриптами.',
    description:
      'Повний текст кожного відео — TFSA, exempt market, RSU, real estate. VideoObject schema для AI-search citations.',
  },
  ru: {
    eyebrow: 'TIKTOK LIBRARY',
    badge: 'Transcripts',
    title: 'TikTok библиотека с транскриптами.',
    description:
      'Полный текст каждого видео — TFSA, exempt market, RSU, real estate. VideoObject schema для AI-search citations.',
  },
  en: {
    eyebrow: 'TIKTOK LIBRARY',
    badge: 'Transcripts',
    title: 'TikTok library with full video transcripts.',
    description:
      'Full text of every video — TFSA, exempt market, RSUs, real estate. VideoObject schema for AI-search citations.',
  },
};

export default async function Image({ params }) {
  const { locale } = await params;
  const c = COPY[locale] || COPY.uk;
  return new ImageResponse(brandCard({ ...c, locale }), { ...OG_SIZE });
}
