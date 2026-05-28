// OG card for /finfluencer-compliance — explainer on Joint CSA/CIRO
// Staff Notice 31-369. Card emphasizes the regulatory + transparency angle.

import { ImageResponse } from 'next/og';
import { brandCard, OG_SIZE, OG_CONTENT_TYPE } from '../../_lib/og-card';

export const runtime = 'nodejs';
export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;
export const alt = 'Joint CSA/CIRO Staff Notice 31-369 — finfluencer guidance';

const COPY = {
  uk: {
    eyebrow: 'CSA / CIRO',
    badge: 'Notice 31-369',
    title: 'Finfluencers під регулюванням CSA.',
    description:
      'Joint CSA/CIRO Staff Notice 31-369 (Dec 2025): що дозволено для licensed DR, що заборонено для unregistered creator-ів.',
  },
  ru: {
    eyebrow: 'CSA / CIRO',
    badge: 'Notice 31-369',
    title: 'Finfluencers под регулированием CSA.',
    description:
      'Joint CSA/CIRO Staff Notice 31-369 (Dec 2025): что разрешено для licensed DR, что запрещено для unregistered creator-ов.',
  },
  en: {
    eyebrow: 'CSA / CIRO',
    badge: 'Notice 31-369',
    title: 'Finfluencers under Canadian securities regulation.',
    description:
      'Joint CSA/CIRO Staff Notice 31-369 (Dec 2025): what licensed DRs may do, what unregistered creators may not.',
  },
};

export default async function Image({ params }) {
  const { locale } = await params;
  const c = COPY[locale] || COPY.uk;
  return new ImageResponse(brandCard({ ...c, locale }), { ...OG_SIZE });
}
