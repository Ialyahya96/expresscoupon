// Click sensor for expresscoupon: /go/<dest> logs the click and 302s onward.
//
// Why this site needs it MORE than racksontop did: expresscoupon is the only
// property with confirmed revenue. The Optimise (omgrefer) links below have
// produced actual sales, and until now not one click on them was measured —
// so the one thing in the estate known to earn was the one thing with no
// instrumentation.
//
// It is also the destination in @racks_deals' TikTok bio, which is deliberate:
// TikTok is the broad, multi-brand front door, and racksontop.me sits in the
// Instagram bio instead. That makes this page the fork in the funnel, and
// which way a visitor turns here is the single most useful thing to know.
//
// Logs go to the SAME D1 database as racksontop's sensor (hence the name
// "racksontop-clicks" on a binding in this repo) with site='expresscoupon',
// so one /go-stats call at racksontop.me reports the whole estate rather than
// two endpoints nobody remembers to check.
//
// Static assets are served BEFORE this script runs — no run_worker_first — so
// adding `main` cannot change how any existing page is served. That matters
// here: this Worker served "Hello world" for days after an earlier config
// mistake, and the static site must be byte-identical before and after.

interface Env {
  ASSETS: { fetch: (req: Request) => Promise<Response> };
  DB?: D1Database; // optional on purpose — the sensor must never block a sale
}

// Destination map. Keys are short and stable because they end up in bios,
// captions and the click log; the URLs behind them can change freely.
//
// The omgrefer.com links are Optimise Media deeplinks and each one is valid on
// exactly one country storefront — the code and the link have to travel
// together, which is why they are keyed by brand AND market.
const DESTINATIONS: Record<string, string> = {
  // Brand hub. These are the fork: which one does TikTok traffic actually want?
  racks: "https://racksontop.me/style",
  hawie: "https://hawie.shop",
  jrb: "https://jrb.codes",

  // Owned product (Gumroad). Full margin, not affiliate.
  journal: "https://jrbcodes.gumroad.com/l/shadow-work-printable/NEWUSER20",
  "journal-paperback": "https://www.amazon.com/dp/B0HDCWTHD2",

  // Optimise Media — the links that have actually produced sales.
  "huawei-sa": "https://omgrefer.com/oU0fq",
  "huawei-ae": "https://omgrefer.com/KfkUv",
  "huawei-qa": "https://omgrefer.com/HX4iC",
  "huawei-kw": "https://omgrefer.com/8W0tv",
  "huawei-eg": "https://omgrefer.com/FRbqj",
  "samsung-sa": "https://omgrefer.com/vQcuP",
};

const HOME = "https://expresscoupon.info/";

const KNOWN_SRC = new Set(["ig", "tt", "site", "coupon", "bio"]);

function redirect(env: Env, ctx: ExecutionContext, req: Request, dest: string): Response {
  const url = new URL(req.url);
  const target = DESTINATIONS[dest];

  const rawSrc = url.searchParams.get("src") ?? "";
  const row = {
    ts: new Date().toISOString(),
    slug: dest,
    src: KNOWN_SRC.has(rawSrc) ? rawSrc : rawSrc ? "unknown" : "direct",
    post: (url.searchParams.get("post") ?? "").slice(0, 64),
    country: (req.cf?.country as string) ?? "",
    ua: (req.headers.get("user-agent") ?? "").slice(0, 256),
    referer: (req.headers.get("referer") ?? "").slice(0, 256),
    found: target ? 1 : 0,
    site: "expresscoupon",
  };

  if (env.DB) {
    ctx.waitUntil(
      env.DB.prepare(
        "INSERT INTO clicks (ts, slug, src, post, country, ua, referer, found, site) VALUES (?,?,?,?,?,?,?,?,?)",
      )
        .bind(row.ts, row.slug, row.src, row.post, row.country, row.ua, row.referer, row.found, row.site)
        .run()
        .catch((err: unknown) => console.error("[go] d1 insert failed:", err)),
    );
  }

  // Unknown key -> the homepage, never a 404. Someone following a link from a
  // bio or a caption arrived with intent; a dead end throws it away.
  // `||` and not `??` so an empty mapping value falls back too — an empty
  // string would throw inside Response.redirect and 500 the click.
  return Response.redirect(target || HOME, 302);
}

export default {
  async fetch(req: Request, env: Env, ctx: ExecutionContext): Promise<Response> {
    const { pathname } = new URL(req.url);

    const go = pathname.match(/^\/go\/([a-z0-9-]+)\/?$/);
    if (go) return redirect(env, ctx, req, go[1]);

    // Everything else is the static site. There is no /go-stats here on
    // purpose: both sensors write to one database, so racksontop.me/go-stats
    // already reports this site's clicks too.
    return env.ASSETS.fetch(req);
  },
};
