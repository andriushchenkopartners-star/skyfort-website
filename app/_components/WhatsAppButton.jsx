"use client";

// Floating WhatsApp button — bottom-right, on every page.
// Mobile-first: large tap target, low-noise styling.
// Tracks click via analytics; does not block any content.

import { usePathname } from "next/navigation";
import { track } from "../_lib/analytics";
import { useIsMounted } from "../_lib/hooks";

const WHATSAPP_URL = "https://wa.me/14033972553";

// SVG glyph stays inline so we don't need yet another icon dep.
function WhatsAppGlyph({ size = 28 }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden="true"
      focusable="false"
    >
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.198-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.71.306 1.263.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347zM12 22a10 10 0 1 1 10-10 10 10 0 0 1-10 10zm0-18a8 8 0 1 0 8 8 8 8 0 0 0-8-8z" />
    </svg>
  );
}

export default function WhatsAppButton() {
  const pathname = usePathname() || "";
  // useIsMounted() returns false during SSR + initial paint, true after
  // hydration. Avoids the previous mount-flag + useEffect(setState) anti-pattern.
  const mounted = useIsMounted();

  if (!mounted) return null;

  // Portal has its own contact UX — don't show floating WhatsApp on /portal pages.
  if (pathname.includes("/portal")) return null;

  return (
    <a
      href={WHATSAPP_URL}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="WhatsApp"
      onClick={() => track("whatsapp_click", { source: "floating_button" })}
      className="fixed bottom-5 right-5 z-[1003] flex h-14 w-14 items-center justify-center rounded-full bg-[#25D366] text-white shadow-lg shadow-black/30 transition-transform hover:scale-105 hover:bg-[#1ebd5b] focus-visible:scale-105 md:bottom-6 md:right-6 md:h-16 md:w-16"
    >
      <WhatsAppGlyph size={28} />
    </a>
  );
}
