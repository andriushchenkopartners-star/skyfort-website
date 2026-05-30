// app/[locale]/slovnyk/[term]/opengraph-image.js
// Per-term OG card. Without this, all 150 glossary entity pages fall back to
// the slovnyk hub's generic "30+ terms" card. A card that names the actual
// term (mirroring the page H1) is a far stronger share/AI-citation signal —
// every other major route on the site already has a tailored card.
//
// Uses the shared brandCard() template (same as the hub card) so the visual
// identity stays consistent; only eyebrow/title/description change per term.

import { ImageResponse } from 'next/og';
import { brandCard, OG_SIZE, OG_CONTENT_TYPE } from '../../../_lib/og-card';
import { GLOSSARY_COPY, getGlossaryTerm } from '../../../_data/glossary';

export const runtime = 'nodejs';
export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;
export const alt = 'SkyFort — Canadian finance glossary';

export default async function Image({ params }) {
  const { locale, term } = await params;
  const c = GLOSSARY_COPY[locale] || GLOSSARY_COPY.uk;
  const t = getGlossaryTerm(locale, term);

  return new ImageResponse(
    brandCard({
      eyebrow: c.termEyebrow,
      title: t?.term || c.title,
      description: t?.definition,
      locale,
    }),
    { ...OG_SIZE },
  );
}
