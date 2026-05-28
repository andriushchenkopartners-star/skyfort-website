// app/[locale]/presa/opengraph-image.js
// OG card for the press/media page.

import { ImageResponse } from 'next/og';
import { brandCard, OG_SIZE, OG_CONTENT_TYPE } from '../../_lib/og-card';

export const runtime = 'nodejs';
export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;
export const alt = 'Press — SkyFort';

const COPY = {
  uk: {
    eyebrow: 'Преса',
    badge: 'Media',
    title: 'Доступний для коментарів і експертних виступів.',
    description:
      'Exempt market, фінанси для українців у Канаді, real estate в Калгарі, CSA/CIRO compliance. Українською, російською, англійською.',
  },
  ru: {
    eyebrow: 'Пресса',
    badge: 'Media',
    title: 'Доступен для комментариев и экспертных выступлений.',
    description:
      'Exempt market, финансы для русскоязычных в Канаде, real estate в Калгари, CSA/CIRO compliance. На украинском, русском, английском.',
  },
  en: {
    eyebrow: 'Press',
    badge: 'Media',
    title: 'Available for media commentary and expert appearances.',
    description:
      'Exempt market, newcomer finance in Canada, Calgary real estate, CSA/CIRO compliance. Ukrainian, Russian, English.',
  },
};

export default async function Image({ params }) {
  const { locale } = await params;
  const c = COPY[locale] || COPY.uk;
  return new ImageResponse(brandCard({ ...c, locale }), { ...OG_SIZE });
}
