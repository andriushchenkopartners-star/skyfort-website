// OG card for legacy /tfsa-kalkulyator landing (UA-only, keyword-targeted).

import { ImageResponse } from 'next/og';
import { brandCard, OG_SIZE, OG_CONTENT_TYPE } from '../_lib/og-card';

export const runtime = 'nodejs';
export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;
export const alt = 'TFSA калькулятор 2026 — SkyFort';

export default async function Image() {
  return new ImageResponse(
    brandCard({
      eyebrow: 'TFSA CALCULATOR',
      badge: '2026',
      title: 'TFSA калькулятор онлайн.',
      description:
        'Розрахуй ріст TFSA на 20 років. Compound interest, contribution room, неоподаткований прибуток. Українською, для Канади.',
      locale: 'uk',
    }),
    { ...OG_SIZE },
  );
}
