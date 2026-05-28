// app/[locale]/perevirka/opengraph-image.js
// OG card for the verify-me-in-3-minutes trust page.

import { ImageResponse } from 'next/og';
import { brandCard, OG_SIZE, OG_CONTENT_TYPE } from '../../_lib/og-card';

export const runtime = 'nodejs';
export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;
export const alt = 'Verify me in 3 minutes — SkyFort';

const COPY = {
  uk: {
    eyebrow: 'Прозорість',
    badge: 'Перевірка',
    title: 'Перевір мене за 3 хвилини.',
    description:
      'NRD #4575551, Axcess Capital реєстрація, IFSE EMP сертифікат, OBSI історія. Покрокова інструкція — без додатків.',
  },
  ru: {
    eyebrow: 'Прозрачность',
    badge: 'Проверка',
    title: 'Проверь меня за 3 минуты.',
    description:
      'NRD #4575551, Axcess Capital регистрация, IFSE EMP сертификат, OBSI история. Пошаговая инструкция — без приложений.',
  },
  en: {
    eyebrow: 'Transparency',
    badge: 'Verification',
    title: 'Verify me in 3 minutes.',
    description:
      'NRD #4575551, Axcess Capital firm registration, IFSE EMP qualification, OBSI complaint history. Step-by-step — no apps required.',
  },
};

export default async function Image({ params }) {
  const { locale } = await params;
  const c = COPY[locale] || COPY.uk;
  return new ImageResponse(brandCard({ ...c, locale }), { ...OG_SIZE });
}
