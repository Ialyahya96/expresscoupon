import type { MetadataRoute } from "next";

// Static export needs the route pinned to static.
export const dynamic = "force-static";

/**
 * Sitemap for expresscoupon.info.
 *
 * The site returned 404 for /sitemap.xml, so Google had nothing to read and
 * was discovering pages by crawl luck alone. This is a single-page site today;
 * the file exists so that stays true deliberately rather than by omission, and
 * so new routes get indexed the moment they are added here.
 */
export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: "https://expresscoupon.info/",
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 1.0,
    },
  ];
}
