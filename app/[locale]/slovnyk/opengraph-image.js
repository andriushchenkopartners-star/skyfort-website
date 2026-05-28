// OG card for /slovnyk — Canadian finance glossary.

import { ImageResponse } from 'next/og';
import { brandCard, OG_SIZE, OG_CONTENT_TYPE } from '../../_lib/og-card';

export const runtime = 'nodejs';
export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;
export const alt = 'Словник канадських фінансів';

const COPY = {
  uk: {
    eyebrow: 'GLOSSARY',
    badge: '30+ terms',
    title: 'Словник канадських фінансів.',
    description:
      'TFSA, RRSP, FHSA, CCPC, MPC, MIC, REIT, NI 45-106, Eligible Investor, EMD — source-attributed definitions від canada.ca та CSA.',
  },
  ru: {
    eyebrow: 'GLOSSARY',
    badge: '30+ терминов',
    title: 'Словарь канадских финансов.',
    description:
      'TFSA, RRSP, FHSA, CCPC, MPC, MIC, REIT, NI 45-106, Eligible Investor, EMD — source-attributed definitions от canada.ca и CSA.',
  },
  en: {
    eyebrow: 'GLOSSARY',
    badge: '30+ terms',
    title: 'Canadian finance glossary.',
    description:
      'TFSA, RRSP, FHSA, CCPC, MPC, MIC, REIT, NI 45-106, Eligible Investor, EMD — source-attributed definitions from canada.ca and CSA.',
  },
};

export default async function Image({ params }) {
  const { locale } = await params;
  const c = COPY[locale] || COPY.uk;
  return new ImageResponse(brandCard({ ...c, locale }), { ...OG_SIZE });
}
