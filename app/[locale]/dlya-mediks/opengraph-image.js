// OG card for /dlya-mediks — medical professionals pillar.

import { ImageResponse } from 'next/og';
import { brandCard, OG_SIZE, OG_CONTENT_TYPE } from '../../_lib/og-card';

export const runtime = 'nodejs';
export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;
export const alt = 'Фінанси для лікарів у Канаді';

const COPY = {
  uk: {
    eyebrow: 'PILLAR · MEDICAL',
    badge: 'Doctors',
    title: 'Фінанси для лікарів у Канаді.',
    description:
      'MPC, salary vs dividend, IPP, holdco — 10-річна стратегія для family physicians, specialists, residents.',
  },
  ru: {
    eyebrow: 'PILLAR · MEDICAL',
    badge: 'Doctors',
    title: 'Финансы для врачей в Канаде.',
    description:
      'MPC, salary vs dividend, IPP, holdco — 10-летняя стратегия для family physicians, specialists, residents.',
  },
  en: {
    eyebrow: 'PILLAR · MEDICAL',
    badge: 'Doctors',
    title: 'Financial planning for physicians in Canada.',
    description:
      'MPC, salary vs dividend, IPP, holdco — 10-year strategy for family physicians, specialists, residents.',
  },
};

export default async function Image({ params }) {
  const { locale } = await params;
  const c = COPY[locale] || COPY.uk;
  return new ImageResponse(brandCard({ ...c, locale }), { ...OG_SIZE });
}
