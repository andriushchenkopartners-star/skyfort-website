// app/[locale]/porivnyannia/opengraph-image.js
// OG card for the EMD vs CIRO vs Insurance comparison page.

import { ImageResponse } from 'next/og';
import { brandCard, OG_SIZE, OG_CONTENT_TYPE } from '../../_lib/og-card';

export const runtime = 'nodejs';
export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;
export const alt = 'EMD vs CIRO vs Insurance — comparison';

const COPY = {
  uk: {
    eyebrow: 'Порівняння',
    badge: 'EMD · CIRO · Insurance',
    title: 'Який канадський фінансовий радник тобі насправді потрібен?',
    description:
      'Прозоре порівняння 3 типів ліцензій у Канаді. Хто що продає, кому підходить, як перевірити. Жодних claims «ми кращі».',
  },
  ru: {
    eyebrow: 'Сравнение',
    badge: 'EMD · CIRO · Insurance',
    title: 'Какой канадский финансовый советник тебе действительно нужен?',
    description:
      'Прозрачное сравнение 3 типов лицензий в Канаде. Кто что продаёт, кому подходит, как проверить. Никаких claims «мы лучше».',
  },
  en: {
    eyebrow: 'Comparison',
    badge: 'EMD · CIRO · Insurance',
    title: 'Which Canadian financial advisor do you actually need?',
    description:
      'Honest comparison of the 3 license types in Canada. Who sells what, who fits which, how to verify. No "we are better" claims.',
  },
};

export default async function Image({ params }) {
  const { locale } = await params;
  const c = COPY[locale] || COPY.uk;
  return new ImageResponse(brandCard({ ...c, locale }), { ...OG_SIZE });
}
