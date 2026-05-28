'use client';

// app/_components/CalendlyInline.jsx
// Inline Calendly booking widget. Removes one click from the funnel — visitors
// who already decided to book don't have to bounce to calendly.com.
//
// Why client-only: Calendly's widget script (assets.calendly.com/.../widget.js)
// scans the DOM for `.calendly-inline-widget` elements and mounts the iframe
// after the page hydrates. Loading via next/script with strategy="lazyOnload"
// keeps it out of the critical path — page renders without it, widget mounts
// once the rest of the page is idle.
//
// UTM tagging on the URL lets us segment bookings from this surface separately
// from the bio-link CTAs (which point straight at calendly.com).

import Script from 'next/script';

const BASE_URL =
  'https://calendly.com/andriushchenko-partners/new-meeting';

export default function CalendlyInline({
  source = 'contact-inline',
  height = 720,
}) {
  // Calendly accepts theme overrides on the embed URL. Dark theme matches the
  // site without forcing a hard-coded background colour on the embed.
  const params = new URLSearchParams({
    primary_color: '2d73e3',
    background_color: '191919',
    text_color: 'fafafa',
    hide_event_type_details: '0',
    hide_gdpr_banner: '0',
    utm_source: 'sky-fort',
    utm_medium: 'embed',
    utm_campaign: source,
  });
  const dataUrl = `${BASE_URL}?${params.toString()}`;

  return (
    <>
      <div
        className="calendly-inline-widget"
        data-url={dataUrl}
        style={{ minWidth: 320, height }}
      />
      <Script
        src="https://assets.calendly.com/assets/external/widget.js"
        strategy="lazyOnload"
      />
    </>
  );
}
