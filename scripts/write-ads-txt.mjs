#!/usr/bin/env node
/**
 * Emit public/ads.txt from NEXT_PUBLIC_ADSENSE_ID at build time.
 *
 * ads.txt is a plain static file that has to be byte-exact — AdSense parses it
 * strictly and a malformed publisher line is simply dropped. That is why this
 * is generated rather than committed with a placeholder: a committed
 * "pub-ADSENSE_PUBLISHER_ID" would look configured while authorising nobody,
 * which is worse than the 404 it replaces because it hides the problem.
 *
 * The ID defaults to the account's real publisher ID (recovered from the
 * Blogger property's ads.txt) so every Git-connected build emits a valid file
 * with no dashboard configuration. The env var still overrides, which is what
 * a second AdSense account would need.
 */
import { writeFileSync, mkdirSync, rmSync, existsSync } from "node:fs";
import { join } from "node:path";

const raw = process.env.NEXT_PUBLIC_ADSENSE_ID || "ca-pub-1930892453287793";
const out = join(process.cwd(), "public", "ads.txt");

if (!raw) {
  if (existsSync(out)) rmSync(out);
  console.log("[ads.txt] NEXT_PUBLIC_ADSENSE_ID not set — skipping.");
  process.exit(0);
}

// The script tag wants "ca-pub-…" but ads.txt wants the bare "pub-…". Getting
// this backwards is the single most common reason an ads.txt silently fails
// verification, so normalise rather than trust the input's shape.
const bare = raw.replace(/^ca-/, "");
if (!/^pub-\d{16}$/.test(bare)) {
  console.error(`[ads.txt] "${raw}" is not a publisher ID (expected ca-pub- or pub- then 16 digits).`);
  process.exit(1);
}

mkdirSync(join(process.cwd(), "public"), { recursive: true });
writeFileSync(out, `google.com, ${bare}, DIRECT, f08c47fec0942fa0\n`);
console.log(`[ads.txt] wrote ${bare}`);
