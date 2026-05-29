/** @type {import('next').NextConfig} */
const nextConfig = {
  // Audit 6 #9 (CWV): tell next/image's optimizer to prefer AVIF then WebP
  // when the browser supports them. With AVIF enabled, andrii.jpg (304K)
  // gets served as 171K (.avif) — direct LCP win on /pro-mene and any
  // page using AuthorByline.
  //
  // The .webp/.avif sibling files in public/ are pre-generated via
  // `npm run convert:images --avif` and can be referenced directly when
  // we want to skip the optimizer (e.g. og-image meta tags). The
  // optimizer handles all <Image src="..." /> components automatically.
  images: {
    formats: ['image/avif', 'image/webp'],
  },
};

export default nextConfig;
