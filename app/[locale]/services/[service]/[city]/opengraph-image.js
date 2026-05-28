// app/[locale]/services/[service]/[city]/opengraph-image.js
// OG card for service × city programmatic landings. 72 URLs total
// (4 services × 6 cities × 3 locales) → 72 unique cards, each titled with
// the localised service name and the city's locative form
// ("TFSA-планування у Калгарі", "RRSP planning in Toronto", etc).

import { ImageResponse } from 'next/og';
import { brandCard, OG_SIZE, OG_CONTENT_TYPE } from '../../../../_lib/og-card';
import { getService, getCity } from '../../../../_lib/services-cities';

export const runtime = 'nodejs';
export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;
export const alt = 'SkyFort — service landing';

export default async function Image({ params }) {
  const { locale, service, city } = await params;
  const svc = getService(service);
  const cty = getCity(city);

  // Fallback for unknown combos (shouldn't happen — generateStaticParams
  // emits only real pairs, but Satori needs renderable content either way).
  if (!svc || !cty) {
    return new ImageResponse(
      brandCard({
        eyebrow: 'SkyFort',
        title: 'Canadian finance for newcomers.',
        locale,
      }),
      { ...OG_SIZE },
    );
  }

  const titleKey = locale === 'en' ? 'titleEn' : locale === 'ru' ? 'titleRu' : 'titleUk';
  const descKey = locale === 'en' ? 'descEn' : locale === 'ru' ? 'descRu' : 'descUk';
  const locativeKey =
    locale === 'en' ? 'locativeEn' : locale === 'ru' ? 'locativeRu' : 'locativeUk';
  const cityNameKey = locale === 'en' ? 'nameEn' : locale === 'ru' ? 'nameRu' : 'nameUk';

  return new ImageResponse(
    brandCard({
      eyebrow: cty[cityNameKey],
      badge: svc.pillar,
      title: `${svc[titleKey]} ${cty[locativeKey]}`,
      description: svc[descKey],
      locale,
    }),
    { ...OG_SIZE },
  );
}
