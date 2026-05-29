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
//
// Batch 16 (Audit 7 #9): added GA4/Clarity funnel events via postMessage
// listener. Calendly posts these events to window from the iframe:
//   - calendly.profile_page_viewed (user landed on selector)
//   - calendly.event_type_viewed (user picked an event type)
//   - calendly.date_and_time_selected (user picked a slot)
//   - calendly.event_scheduled (booking confirmed!)
// We map them to our taxonomy: booking_started, booking_slot_selected,
// booking_confirmed.

import { useEffect } from 'react';
import Script from 'next/script';
import { track } from '../_lib/analytics';

const BASE_URL =
  'https://calendly.com/andriushchenko-partners/new-meeting';

function isCalendlyEvent(e) {
  return (
    e.origin === 'https://calendly.com' &&
    e.data &&
    typeof e.data.event === 'string' &&
    e.data.event.startsWith('calendly.')
  );
}

export default function CalendlyInline({
  source = 'contact-inline',
  height = 720,
}) {
  // GA4/Clarity funnel event hookup. Mount-once listener; no React state.
  useEffect(() => {
    if (typeof window === 'undefined') return;
    function onMsg(e) {
      if (!isCalendlyEvent(e)) return;
      const evt = e.data.event;
      // Map Calendly events → our taxonomy.
      if (evt === 'calendly.profile_page_viewed' || evt === 'calendly.event_type_viewed') {
        track('booking_started', { source, calendly_event: evt });
      } else if (evt === 'calendly.date_and_time_selected') {
        track('booking_slot_selected', { source });
      } else if (evt === 'calendly.event_scheduled') {
        track('booking_confirmed', { source });
      }
    }
    window.addEventListener('message', onMsg);
    return () => window.removeEventListener('message', onMsg);
  }, [source]);

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
