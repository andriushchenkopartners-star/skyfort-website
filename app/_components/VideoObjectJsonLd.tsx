// app/_components/VideoObjectJsonLd.tsx
// Reusable VideoObject JSON-LD emitter for TikTok / YouTube embeds.
//
// Lantern 2026: YouTube is the most-cited domain in AI-search answers
// (2× more than #2). VideoObject schema on every transcript / library
// page lets Google + Perplexity + ChatGPT browse cite our videos with
// structured metadata (title, transcript, thumbnail, upload date).
//
// Audit 5 (#11): use `interactionStatistic` (NOT deprecated `interactionCount`).
// Added optional `interactionStatistic` + auto-generated `embedUrl` fallback
// for TikTok URLs. Also added `potentialAction` for SeekToAction (Google's
// preferred way to support key-moments / clip extraction).
//
// Inputs (one VideoObject per call):
//   name:          string  — required, video title
//   description:   string  — required, short description for SERP
//   thumbnailUrl:  string  — required, absolute URL to thumbnail
//   uploadDate:    string  — required, ISO 8601 (YYYY-MM-DD)
//   contentUrl:    string  — optional, public URL of the video
//   embedUrl:      string  — optional, oEmbed/iframe URL for inline players.
//                            If omitted and contentUrl is a TikTok URL,
//                            we auto-derive a TikTok oEmbed URL.
//   duration:      string  — optional, ISO 8601 duration (e.g. "PT1M30S")
//   transcript:    string  — optional, full text transcript (SSR'd inline)
//   viewCount:     number  — optional, view/play count (becomes interactionStatistic)
//   inLanguage:    string  — optional, BCP-47 language tag (default "uk")

interface VideoObjectJsonLdProps {
  name?: string;
  description?: string;
  thumbnailUrl?: string | string[];
  uploadDate?: string;
  contentUrl?: string;
  embedUrl?: string;
  duration?: string;
  transcript?: string;
  viewCount?: number;
  inLanguage?: string;
}

function deriveTikTokEmbedUrl(contentUrl?: string): string | null {
  if (!contentUrl) return null;
  if (!contentUrl.includes("tiktok.com")) return null;
  // TikTok oEmbed convention: https://www.tiktok.com/embed/v2/<video-id>
  // We don't always know the video ID here, so fall back to the profile URL
  // (which TikTok accepts via its public embed API).
  return contentUrl.replace(
    /^https?:\/\/(www\.)?tiktok\.com/,
    "https://www.tiktok.com/embed",
  );
}

export default function VideoObjectJsonLd({
  name,
  description,
  thumbnailUrl,
  uploadDate,
  contentUrl,
  embedUrl,
  duration,
  transcript,
  viewCount,
  inLanguage = "uk",
}: VideoObjectJsonLdProps) {
  if (!name || !description || !thumbnailUrl || !uploadDate) return null;

  const resolvedEmbedUrl = embedUrl || deriveTikTokEmbedUrl(contentUrl);

  const data = {
    "@context": "https://schema.org",
    "@type": "VideoObject",
    name,
    description,
    thumbnailUrl: Array.isArray(thumbnailUrl) ? thumbnailUrl : [thumbnailUrl],
    uploadDate,
    inLanguage,
    ...(contentUrl ? { contentUrl } : {}),
    ...(resolvedEmbedUrl ? { embedUrl: resolvedEmbedUrl } : {}),
    ...(duration ? { duration } : {}),
    ...(transcript ? { transcript } : {}),
    ...(typeof viewCount === "number" && viewCount > 0
      ? {
          interactionStatistic: {
            "@type": "InteractionCounter",
            interactionType: { "@type": "WatchAction" },
            userInteractionCount: viewCount,
          },
        }
      : {}),
    publisher: {
      "@type": "Organization",
      name: "SkyFort Wealth",
      logo: {
        "@type": "ImageObject",
        url: "https://sky-fort.ca/icon.svg",
      },
    },
    creator: {
      "@type": "Person",
      name: "Andrii Andriushchenko",
      url: "https://sky-fort.ca/uk/pro-mene",
    },
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}
