// OG card for /dlya-it-fakhivtsiv — IT specialists pillar.

import { ImageResponse } from 'next/og';
import { brandCard, OG_SIZE, OG_CONTENT_TYPE } from '../../_lib/og-card';

export const runtime = 'nodejs';
export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;
export const alt = 'Фінанси для IT-фахівців у Канаді';

const COPY = {
  uk: {
    eyebrow: 'PILLAR · IT',
    badge: 'Tech',
    title: 'Фінанси для IT-фахівців у Канаді.',
    description:
      'TFSA, RRSP, FHSA, RSU vesting, ESPP, US-employer crossборд, exempt market — 12-місячний фреймворк для $130-300K доходу.',
  },
  ru: {
    eyebrow: 'PILLAR · IT',
    badge: 'Tech',
    title: 'Финансы для IT-специалистов в Канаде.',
    description:
      'TFSA, RRSP, FHSA, RSU vesting, ESPP, US-employer crossborder, exempt market — 12-месячный фреймворк для $130-300K дохода.',
  },
  en: {
    eyebrow: 'PILLAR · TECH',
    badge: 'Tech',
    title: 'Financial planning for tech workers in Canada.',
    description:
      'TFSA, RRSP, FHSA, RSU vesting, ESPP, US-employer cross-border, exempt market — 12-month framework for $130-300K income.',
  },
};

export default async function Image({ params }) {
  const { locale } = await params;
  const c = COPY[locale] || COPY.uk;
  return new ImageResponse(brandCard({ ...c, locale }), { ...OG_SIZE });
}
