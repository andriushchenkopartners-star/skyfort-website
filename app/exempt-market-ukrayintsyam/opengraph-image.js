// OG card for legacy /exempt-market-ukrayintsyam landing (UA-only, keyword-targeted).
// Legacy landings live outside [locale] — they're always Ukrainian, so locale
// passed to brandCard() is fixed to 'uk'.

import { ImageResponse } from 'next/og';
import { brandCard, OG_SIZE, OG_CONTENT_TYPE } from '../_lib/og-card';

export const runtime = 'nodejs';
export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;
export const alt = 'Exempt market українцям у Канаді — освітній гайд';

export default async function Image() {
  return new ImageResponse(
    brandCard({
      eyebrow: 'EXEMPT MARKET',
      badge: 'NI 45-106',
      title: 'Exempt market українцям у Канаді.',
      description:
        'Що таке приватні securities, хто такий Eligible / Accredited Investor, чому Suitability Assessment обов\'язковий. Освітній гайд.',
      locale: 'uk',
    }),
    { ...OG_SIZE },
  );
}
