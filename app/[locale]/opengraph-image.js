// app/[locale]/opengraph-image.js
// OG card for the homepage in each locale (uk/ru/en).

import { ImageResponse } from 'next/og';
import { brandCard, OG_SIZE, OG_CONTENT_TYPE } from '../_lib/og-card';

export const runtime = 'nodejs';
export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;
export const alt = 'SkyFort — Canadian finance for newcomers';

const COPY = {
  uk: {
    eyebrow: 'SkyFort',
    title: 'Канадські фінанси для українців. Без банківських казок.',
    description:
      'TFSA, RRSP, FHSA, exempt market — реальна математика, регуляторна точність, без впарювання.',
  },
  ru: {
    eyebrow: 'SkyFort',
    title: 'Канадские финансы для русскоязычных. Без банковских сказок.',
    description:
      'TFSA, RRSP, FHSA, exempt market — реальная математика, регуляторная точность, без впаривания.',
  },
  en: {
    eyebrow: 'SkyFort',
    title: 'Canadian finance for newcomers. No bank fairy tales.',
    description:
      'TFSA, RRSP, FHSA, exempt market — real numbers, regulatory precision, no pushy sales.',
  },
};

export default async function Image({ params }) {
  const { locale } = await params;
  const c = COPY[locale] || COPY.uk;
  return new ImageResponse(brandCard({ ...c, locale }), { ...OG_SIZE });
}
