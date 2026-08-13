import type { MetadataRoute } from "next";

export const dynamic = "force-static";

/**
 * robots.txt carrying the Sitemap directive.
 *
 * With no robots.txt of its own the origin fell through to Cloudflare's
 * *managed* robots.txt, which sets crawl signals but names no sitemap. Serving
 * our own puts the Sitemap line in front of every crawler without waiting on a
 * Search Console submission.
 */
export default function robots(): MetadataRoute.Robots {
  return {
    rules: [{ userAgent: "*", allow: "/" }],
    sitemap: "https://expresscoupon.info/sitemap.xml",
    host: "https://expresscoupon.info",
  };
}
