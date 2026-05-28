// OG card for /case-studies — anonymized client case framework.

import { ImageResponse } from 'next/og';
import { brandCard, OG_SIZE, OG_CONTENT_TYPE } from '../../_lib/og-card';

export const runtime = 'nodejs';
export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;
export const alt = 'Анонімізовані кейси клієнтів';

const COPY = {
  uk: {
    eyebrow: 'CASE STUDIES',
    badge: 'Anonymized',
    title: 'Анонімізовані кейси клієнтів.',
    description:
      'Освітні framework-и: IT-фахівець з RSU, лікар з MPC, підприємець з CCPC. Без імен, без точних чисел, без return claims.',
  },
  ru: {
    eyebrow: 'CASE STUDIES',
    badge: 'Anonymized',
    title: 'Анонимизированные кейсы клиентов.',
    description:
      'Образовательные framework-и: IT-специалист с RSU, врач с MPC, предприниматель с CCPC. Без имён, без точных чисел.',
  },
  en: {
    eyebrow: 'CASE STUDIES',
    badge: 'Anonymized',
    title: 'Anonymized client case studies.',
    description:
      'Educational frameworks: tech worker with RSUs, physician with MPC, business owner with CCPC. No names, no exact numbers.',
  },
};

export default async function Image({ params }) {
  const { locale } = await params;
  const c = COPY[locale] || COPY.uk;
  return new ImageResponse(brandCard({ ...c, locale }), { ...OG_SIZE });
}
