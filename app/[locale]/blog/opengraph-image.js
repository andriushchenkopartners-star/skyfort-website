// app/[locale]/blog/opengraph-image.js
// OG card for the blog hub. Individual posts have their own
// opengraph-image.js in [slug]/ — this one fires when someone shares
// the /blog index URL.

import { ImageResponse } from 'next/og';
import { brandCard, OG_SIZE, OG_CONTENT_TYPE } from '../../_lib/og-card';

export const runtime = 'nodejs';
export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;
export const alt = 'SkyFort Blog';

const COPY = {
  uk: {
    eyebrow: 'Блог',
    title: 'Канадські фінанси, пояснені рідною мовою.',
    description:
      'Пілярні гайди про TFSA, RRSP, FHSA, FIRE, exempt market та канадську нерухомість. Освітньо, без обіцянок.',
  },
  ru: {
    eyebrow: 'Блог',
    title: 'Канадские финансы, объяснённые на родном языке.',
    description:
      'Пилларные гайды о TFSA, RRSP, FHSA, FIRE, exempt market и канадской недвижимости. Образовательно, без обещаний.',
  },
  en: {
    eyebrow: 'Blog',
    title: 'Canadian finance explained in your own language.',
    description:
      'Pillar guides on TFSA, RRSP, FHSA, FIRE, exempt market, and Canadian real estate. Educational, no promises.',
  },
};

export default async function Image({ params }) {
  const { locale } = await params;
  const c = COPY[locale] || COPY.uk;
  return new ImageResponse(brandCard({ ...c, locale }), { ...OG_SIZE });
}
