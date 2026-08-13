/**
 * Google AdSense loader.
 *
 * Approval alone earns nothing — the tag has to be on the page. An audit of all
 * six domains found the script on none of them and ads.txt on one, which means
 * the account could be fully approved and still bill zero.
 *
 * Two separate things are required and they are often confused:
 *
 *   1. THE SCRIPT, below. It is what actually renders ads.
 *   2. /ads.txt, a static file naming the publisher. Without it AdSense marks
 *      inventory as unauthorised and demand drops sharply — programmatic
 *      buyers filter on it. See public/ads.txt.
 *
 * The publisher ID is read from NEXT_PUBLIC_ADSENSE_ID at build time. When it
 * is absent the component renders nothing at all, so an unconfigured build
 * ships a clean page rather than a broken script tag — which matters because
 * a malformed AdSense snippet is itself a review failure.
 */
// Recovered from technewsarabia24.site/ads.txt, which Blogger serves
// automatically once AdSense is linked — the same account covers every property.
//
// Hardcoded as the default rather than required from the environment. A
// publisher ID is public by construction: it appears in the page source of
// every AdSense site on the web. Gating it behind a dashboard-only build
// variable would mean each Git-connected Worker needed manual configuration
// before it earned anything, which is the exact failure being fixed here.
const PUBLISHER_ID = process.env.NEXT_PUBLIC_ADSENSE_ID || "ca-pub-1930892453287793";

export default function AdSense() {
  if (!PUBLISHER_ID) return null;

  return (
    <script
      async
      src={`https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${PUBLISHER_ID}`}
      crossOrigin="anonymous"
    />
  );
}

/**
 * A single display unit.
 *
 * `data-full-width-responsive` is on because the storefront is overwhelmingly
 * mobile traffic from Instagram and TikTok, where a fixed-width unit either
 * overflows the viewport or leaves dead margin.
 *
 * The push call is inline rather than in an effect on purpose: with
 * `output: "export"` the page is static HTML, and the ad slot has to be
 * registered as the parser reaches it rather than after hydration.
 */
export function AdUnit({ slot, className = "" }: { slot: string; className?: string }) {
  if (!PUBLISHER_ID) return null;

  return (
    <div className={className}>
      <ins
        className="adsbygoogle"
        style={{ display: "block" }}
        data-ad-client={PUBLISHER_ID}
        data-ad-slot={slot}
        data-ad-format="auto"
        data-full-width-responsive="true"
      />
      <script
        dangerouslySetInnerHTML={{
          __html: "(adsbygoogle = window.adsbygoogle || []).push({});",
        }}
      />
    </div>
  );
}
