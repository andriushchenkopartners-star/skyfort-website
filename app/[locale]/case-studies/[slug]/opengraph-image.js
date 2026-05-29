// Dynamic OG card for each /case-studies/[slug] page. Reads the case from
// the same data module the page uses; per-slug eyebrow + title.

import { ImageResponse } from 'next/og';
import { brandCard, OG_SIZE, OG_CONTENT_TYPE } from '../../../_lib/og-card';
import { getCase } from '../../../_data/case-studies';

export const runtime = 'nodejs';
export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;

const EYEBROW_BY_PILLAR = {
  Tech: 'CASE STUDY · TECH',
  Medical: 'CASE STUDY · MEDICAL',
  Founders: 'CASE STUDY · FOUNDERS',
};

const FALLBACK_TITLE = {
  uk: 'Анонімізований кейс клієнта',
  ru: 'Анонимизированный кейс клиента',
  en: 'Anonymized client case',
};

export const alt = 'SkyFort case study';

export default async function Image({ params }) {
  const { locale, slug } = await params;
  const c = getCase(slug, locale);
  const title = c?.title || FALLBACK_TITLE[locale] || FALLBACK_TITLE.uk;
  const description = c?.subtitle || c?.descriptionMeta || '';
  const eyebrow = EYEBROW_BY_PILLAR[c?.pillar] || 'CASE STUDY';
  return new ImageResponse(
    brandCard({
      eyebrow,
      badge: 'Composite',
      title,
      description,
      locale,
    }),
    { ...OG_SIZE },
  );
}
