// RSS 2.0 feed for the blog. Aggregates all Ukrainian posts (primary locale).
// Reachable at /blog/rss.xml.
// Cached for an hour to keep cost down.

import { getAllPosts } from "../../_lib/blog";

const SITE = "https://sky-fort.ca";
const FEED_TITLE = "SkyFort Blog";
const FEED_DESCRIPTION =
  "Educational content on TFSA, RRSP, FHSA, exempt market, and Canadian real estate for newcomers — by Andrii Andriushchenko, Licensed Dealing Representative.";
const FEED_LANGUAGE = "uk-UA";

function escapeXml(str = "") {
  return String(str)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");
}

export async function GET() {
  const posts = getAllPosts("uk");

  const items = posts
    .map((p) => {
      const link = `${SITE}/uk/blog/${p.slug}`;
      const pubDate = p.date ? new Date(p.date).toUTCString() : new Date().toUTCString();
      return `
    <item>
      <title>${escapeXml(p.title)}</title>
      <link>${link}</link>
      <guid isPermaLink="true">${link}</guid>
      <pubDate>${pubDate}</pubDate>
      <description>${escapeXml(p.description)}</description>
      <author>noreply@sky-fort.ca (${escapeXml(p.author)})</author>
      ${p.tags.map((t) => `<category>${escapeXml(t)}</category>`).join("")}
    </item>`;
    })
    .join("");

  const xml = `<?xml version="1.0" encoding="UTF-8" ?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>${escapeXml(FEED_TITLE)}</title>
    <link>${SITE}/uk/blog</link>
    <atom:link href="${SITE}/blog/rss.xml" rel="self" type="application/rss+xml" />
    <description>${escapeXml(FEED_DESCRIPTION)}</description>
    <language>${FEED_LANGUAGE}</language>
    <lastBuildDate>${new Date().toUTCString()}</lastBuildDate>
    ${items}
  </channel>
</rss>`;

  return new Response(xml, {
    headers: {
      "Content-Type": "application/rss+xml; charset=utf-8",
      "Cache-Control": "public, max-age=3600, s-maxage=3600",
    },
  });
}
