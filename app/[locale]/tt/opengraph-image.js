// app/[locale]/tt/opengraph-image.js
// OG card for the TikTok bio-link landing. This URL gets shared OUT of
// TikTok (people see the bio, copy the link, send to friends in DMs).
// A branded card with the "FROM TIKTOK" badge tells viewers exactly
// where the link comes from and why they should trust it.

import { ImageResponse } from 'next/og';
import { brandCard, OG_SIZE, OG_CONTENT_TYPE } from '../../_lib/og-card';

export const runtime = 'nodejs';
export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;
export const alt = 'SkyFort — from TikTok';

const COPY = {
  uk: {
    eyebrow: 'З TikTok',
    badge: '@andrii.wealthcanada',
    title: 'Усі мої калькулятори, гайди і запис на дзвінок.',
    description:
      'Безкоштовно. Без email-форм. Без spam. TFSA, RRSP, FHSA, exempt market — реальна математика для українців у Канаді.',
  },
  ru: {
    eyebrow: 'Из TikTok',
    badge: '@andrii.wealthcanada',
    title: 'Все мои калькуляторы, гайды и запись на звонок.',
    description:
      'Бесплатно. Без email-форм. Без spam. TFSA, RRSP, FHSA, exempt market — реальная математика для русскоязычных в Канаде.',
  },
  en: {
    eyebrow: 'From TikTok',
    badge: '@andrii.wealthcanada',
    title: 'Every calculator, guide, and the booking link in one place.',
    description:
      'Free. No email forms. No spam. TFSA, RRSP, FHSA, exempt market — real math for newcomers in Canada.',
  },
};

export default async function Image({ params }) {
  const { locale } = await params;
  const c = COPY[locale] || COPY.uk;
  return new ImageResponse(brandCard({ ...c, locale }), { ...OG_SIZE });
}
