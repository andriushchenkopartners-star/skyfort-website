// app/[locale]/pro-mene/opengraph-image.js
// OG card for the About page (per locale).

import { ImageResponse } from 'next/og';
import { brandCard, OG_SIZE, OG_CONTENT_TYPE } from '../../_lib/og-card';

export const runtime = 'nodejs';
export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;
export const alt = 'Andrii Andriushchenko — Licensed Dealing Representative';

const COPY = {
  uk: {
    eyebrow: 'Про мене',
    badge: 'Licensed DR',
    title: 'Андрій Андрющенко — фінанси для українців у Канаді.',
    description:
      'Licensed Dealing Representative · Axcess Capital Advisors Inc. · AB · BC · ON. Освіта, не реклама — без банківських продавців і TikTok-обіцянок.',
  },
  ru: {
    eyebrow: 'Обо мне',
    badge: 'Licensed DR',
    title: 'Андрей Андрющенко — финансы для русскоязычных в Канаде.',
    description:
      'Licensed Dealing Representative · Axcess Capital Advisors Inc. · AB · BC · ON. Образование, не реклама — без банковских продавцов и TikTok-обещаний.',
  },
  en: {
    eyebrow: 'About',
    badge: 'Licensed DR',
    title: 'Andrii Andriushchenko — finance for newcomers in Canada.',
    description:
      'Licensed Dealing Representative · Axcess Capital Advisors Inc. · AB · BC · ON. Education, not pitch — no bank salespeople, no TikTok promises.',
  },
};

export default async function Image({ params }) {
  const { locale } = await params;
  const c = COPY[locale] || COPY.uk;
  return new ImageResponse(brandCard({ ...c, locale }), { ...OG_SIZE });
}
