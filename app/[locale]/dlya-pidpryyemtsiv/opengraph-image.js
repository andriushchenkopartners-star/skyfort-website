// OG card for /dlya-pidpryyemtsiv — entrepreneurs pillar.

import { ImageResponse } from 'next/og';
import { brandCard, OG_SIZE, OG_CONTENT_TYPE } from '../../_lib/og-card';

export const runtime = 'nodejs';
export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;
export const alt = 'Фінанси для підприємців у Канаді';

const COPY = {
  uk: {
    eyebrow: 'PILLAR · FOUNDERS',
    badge: 'Business',
    title: 'Фінанси для підприємців у Канаді.',
    description:
      'CCPC, TOSI, family trust, LCGE на QSBS, exempt market через holdco — 10-річний roadmap від sole prop до exit.',
  },
  ru: {
    eyebrow: 'PILLAR · FOUNDERS',
    badge: 'Business',
    title: 'Финансы для предпринимателей в Канаде.',
    description:
      'CCPC, TOSI, family trust, LCGE на QSBS, exempt market через holdco — 10-летний roadmap от sole prop до exit.',
  },
  en: {
    eyebrow: 'PILLAR · FOUNDERS',
    badge: 'Business',
    title: 'Financial planning for business owners in Canada.',
    description:
      'CCPC, TOSI, family trust, LCGE on QSBS, exempt market via holdco — 10-year roadmap from sole prop to exit.',
  },
};

export default async function Image({ params }) {
  const { locale } = await params;
  const c = COPY[locale] || COPY.uk;
  return new ImageResponse(brandCard({ ...c, locale }), { ...OG_SIZE });
}
