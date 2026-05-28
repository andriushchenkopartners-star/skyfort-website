// app/_components/VideoObjectJsonLd.jsx
// Reusable VideoObject JSON-LD emitter for TikTok / YouTube embeds.
//
// Lantern 2026: YouTube is the most-cited domain in AI-search answers
// (2× more than #2). VideoObject schema on every transcript / library
// page lets Google + Perplexity + ChatGPT browse cite our videos with
// structured metadata (title, transcript, thumbnail, upload date).
//
// Inputs (one VideoObject per call):
//   name:          string  — required, video title
//   description:   string  — required, short description for SERP
//   thumbnailUrl:  string  — required, absolute URL to thumbnail
//   uploadDate:    string  — required, ISO 8601 (YYYY-MM-DD)
//   contentUrl:    string  — optional, public URL of the video file/embed
//                            (TikTok URL works; YouTube URL works)
//   embedUrl:      string  — optional, oEmbed URL for inline players
//   duration:      string  — optional, ISO 8601 duration (e.g. "PT1M30S")
//   transcript:    string  — optional, full text transcript
//   inLanguage:    string  — optional, BCP-47 language tag (default "uk")

export default function VideoObjectJsonLd({
  name,
  description,
  thumbnailUrl,
  uploadDate,
  contentUrl,
  embedUrl,
  duration,
  transcript,
  inLanguage = "uk",
}) {
  if (!name || !description || !thumbnailUrl || !uploadDate) return null;

  const data = {
    "@context": "https://schema.org",
    "@type": "VideoObject",
    name,
    description,
    thumbnailUrl: Array.isArray(thumbnailUrl) ? thumbnailUrl : [thumbnailUrl],
    uploadDate,
    inLanguage,
    ...(contentUrl ? { contentUrl } : {}),
    ...(embedUrl ? { embedUrl } : {}),
    ...(duration ? { duration } : {}),
    ...(transcript ? { transcript } : {}),
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
