// OG card for legacy /ipoteka-kalhari landing (UA-only, keyword-targeted).

import { ImageResponse } from 'next/og';
import { brandCard, OG_SIZE, OG_CONTENT_TYPE } from '../_lib/og-card';

export const runtime = 'nodejs';
export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;
export const alt = 'Іпотека Калгарі для українців — SkyFort';

export default async function Image() {
  return new ImageResponse(
    brandCard({
      eyebrow: 'CALGARY MORTGAGE',
      badge: 'AB · BC · ON',
      title: 'Іпотека Калгарі для українців.',
      description:
        'Перший дім у Канаді: down payment, GDS/TDS, stress test, CMHC. Покроковий гайд для CUAET-newcomers та PR-resident.',
      locale: 'uk',
    }),
    { ...OG_SIZE },
  );
}
