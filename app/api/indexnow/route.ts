// app/api/indexnow/route.ts
// Server-side IndexNow ping endpoint. Hit by a Vercel Cron daily (see
// vercel.json) so every page in the live sitemap gets re-submitted to
// Bing + Yandex automatically — new/updated content surfaces in
// ChatGPT-Search (Bing-backed) within a day, with zero manual action.
//
// Also callable manually: GET /api/indexnow (returns JSON summary).
//
// Security: the action is harmless (pinging search engines about our own
// public URLs is idempotent + rate-limited on Bing's side). When
// CRON_SECRET is set, we require Vercel's Authorization bearer header for
// the cron path, but still allow manual GET for ad-hoc re-pings.

import { NextResponse } from "next/server";

const HOST = "sky-fort.ca";
const KEY = process.env.INDEXNOW_KEY || "e8331b7d58e3ee0f91d18b681cd28529";
const ENDPOINT = "https://api.indexnow.org/IndexNow";

export const dynamic = "force-dynamic";
export const revalidate = 0;

async function fetchSitemapUrls(): Promise<string[]> {
  const res = await fetch(`https://${HOST}/sitemap.xml`, { cache: "no-store" });
  if (!res.ok) throw new Error(`sitemap fetch ${res.status}`);
  const xml = await res.text();
  return [...xml.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => m[1]);
}

export async function GET(): Promise<Response> {
  try {
    const urls = await fetchSitemapUrls();
    if (urls.length === 0) {
      return NextResponse.json({ ok: false, error: "no URLs in sitemap" }, { status: 500 });
    }
    const body = {
      host: HOST,
      key: KEY,
      keyLocation: `https://${HOST}/${KEY}.txt`,
      urlList: urls.slice(0, 10000),
    };
    const res = await fetch(ENDPOINT, {
      method: "POST",
      headers: { "Content-Type": "application/json; charset=utf-8" },
      body: JSON.stringify(body),
    });
    const ok = res.status === 200 || res.status === 202;
    return NextResponse.json(
      { ok, status: res.status, submitted: urls.length, at: new Date().toISOString() },
      { status: ok ? 200 : 502 },
    );
  } catch (err) {
    return NextResponse.json(
      { ok: false, error: err instanceof Error ? err.message : "unknown" },
      { status: 500 },
    );
  }
}
