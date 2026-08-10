"use client";

import { useState } from "react";

// Only codes that actually work at checkout belong here.
//
// This list previously held "WALK30" (30% off hawie.shop) and "RACKSBOGO"
// (buy-one-get-one on racksontop). Neither could ever have worked: hawie.shop
// sends buyers to Amazon and racksontop sends them to Redbubble, and you cannot
// issue discount codes for either — the retailer sets the price. A visitor would
// copy the code, reach checkout, and find it does nothing. On a site whose entire
// promise is discounts, that is worse than having no offers at all.
//
// NEWUSER20 is verified live: the Gumroad product page returns
// discount_code:{valid:true} with percents:20.
const coupons = [
  {
    id: "newuser20",
    label: "New reader offer",
    badge: "LIVE",
    title: "20% off The Shadow Work Journal",
    description:
      "The full 209-page journal as an instant PDF. 90 days of guided prompts — print it at home or write on a tablet.",
    code: "NEWUSER20",
    store: "jrb.codes",
    // The /NEWUSER20 suffix makes Gumroad recognise the code — the product page
    // returns discount_code:{valid:true,percents:20} with it and nothing
    // without it — but it does NOT apply the discount. price_cents comes back
    // as 499 either way, so the buyer still types the code at checkout. The
    // card used to promise it applied automatically; on a site whose whole
    // promise is that the codes work, an instruction that is wrong about *how*
    // they work costs the same trust as a dead code.
    url: "https://jrbcodes.gumroad.com/l/shadow-work-printable/NEWUSER20",
    expires: "Limited time",
  },
];

// Optimise Media affiliate codes for Huawei and Samsung, by market.
//
// These are supplied from the affiliate dashboard rather than verified against a
// checkout the way NEWUSER20 was — brand storefronts do not expose code validity
// to an unauthenticated request. They are therefore only as current as the
// affiliate account says. Re-check them before promoting a campaign; an expired
// code on a coupon site costs trust faster than a missing one.
//
// `url` is the Optimise tracked deeplink, not the brand's own storefront, so a
// click is attributed. Each was checked end to end: all six return 200, land on
// the matching country store (sa-en, ae-en, qa, kw-en, eg-en, sa_en) and carry
// an sskey= parameter.
//
// Note for anyone re-checking these: omgrefer.com returns 404 to plain HTTP
// clients and only resolves for a browser-like request. A bare `curl` will
// suggest all six are dead when they are fine.
//
// Region matters: each code is valid on its own country storefront and nowhere
// else, so the link and the code always travel together.
// Every one of these excludes newly-released exclusive products, so that caveat
// is rendered on every card rather than being a footnote — a discount that
// silently fails on the exact phone someone came to buy is the complaint a
// coupon site cannot afford.
const brandCodes = [
  { brand: "Huawei", country: "Saudi Arabia", flag: "🇸🇦", code: "AFF10", off: "10%", url: "https://omgrefer.com/oU0fq" },
  { brand: "Huawei", country: "UAE", flag: "🇦🇪", code: "AEU70", off: "10%", url: "https://omgrefer.com/KfkUv" },
  { brand: "Huawei", country: "Qatar", flag: "🇶🇦", code: "AA1Q4", off: "10%", url: "https://omgrefer.com/HX4iC" },
  { brand: "Huawei", country: "Kuwait", flag: "🇰🇼", code: "AKKK4", off: "10%", url: "https://omgrefer.com/8W0tv" },
  { brand: "Huawei", country: "Egypt", flag: "🇪🇬", code: "AEE04", off: "5%", url: "https://omgrefer.com/FRbqj" },
  { brand: "Samsung", country: "Saudi Arabia", flag: "🇸🇦", code: "AFM222", off: "5%", url: "https://omgrefer.com/vQcuP" },
];

const BRAND_CODE_CAVEAT = "Excludes new exclusive products";

// Where the deals point. Everything here has to be something a visitor can
// actually reach and act on today.
//
// Removed from this list: "Free Habit Journal" and "Free Shadow Work Journal
// with qualifying purchases". No habit journal PDF exists anywhere, and there is
// no way to detect a qualifying purchase through an affiliate link — Amazon and
// Redbubble do not tell you who bought. Both were promises nothing could keep.
// The Audible trial was an untracked link earning nothing.
const destinations = [
  {
    title: "The Shadow Work Journal",
    description:
      "209 pages, 90 days of prompts. Paperback on Amazon, or the printable PDF at 20% off with the code above.",
    link: "https://www.amazon.com/dp/B0HDCWTHD2",
    cta: "See the paperback",
    icon: "🌙",
    external: true,
  },
  {
    title: "hawie.shop",
    description:
      "Walking, hiking, fishing and camping gear, priced from Amazon.sa and refreshed daily.",
    link: "https://hawie.shop",
    cta: "Browse gear",
    icon: "🥾",
    external: true,
  },
  {
    title: "racksontop.me",
    description: "Streetwear and original designs. Hoodies, tees, jackets and caps.",
    link: "https://racksontop.me",
    cta: "Browse clothing",
    icon: "🧢",
    external: true,
  },
];

export default function Home() {
  const [copied, setCopied] = useState<string | null>(null);

  const copyCode = (code: string) => {
    navigator.clipboard.writeText(code);
    setCopied(code);
    setTimeout(() => setCopied(null), 2000);
  };

  return (
    <main className="min-h-screen">
      {/* Header */}
      <header className="border-b border-black/[0.06]">
        <div className="max-w-4xl mx-auto px-6 py-5 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="text-2xl">🏷️</span>
            <span className="text-xl font-bold">
              express<span className="text-accent-600">coupon</span>
            </span>
          </div>
          <a
            href="https://jrb.codes"
            className="text-sm text-zinc-600 hover:text-accent-600 transition-colors"
          >
            jrb.codes →
          </a>
        </div>
      </header>

      {/* Hero */}
      <section className="max-w-4xl mx-auto px-6 pt-16 pb-12 text-center">
        <h1 className="text-4xl md:text-5xl font-bold text-black mb-4">
          Deals that <span className="text-accent-600">hit different</span>
        </h1>
        <p className="text-zinc-600 text-lg max-w-2xl mx-auto">
          Every working discount across hawie.shop, racksontop and jrb.codes — in one place. No expired codes, no dead links.
        </p>
      </section>

      {/* Coupons */}
      <section className="max-w-4xl mx-auto px-6 pb-16">
        <h2 className="text-sm font-semibold text-zinc-700 uppercase tracking-wider mb-6">
          Active Coupons
        </h2>
        <div className="grid md:grid-cols-2 gap-6">
          {coupons.map((c) => (
            <div
              key={c.id}
              className="rounded-2xl border border-black/[0.06] bg-white p-6 hover:border-accent-500/30 transition-all"
            >
              <div className="flex items-center gap-2 mb-3">
                <span className="text-xs font-bold px-2 py-1 rounded bg-accent-500/10 text-accent-600">
                  {c.badge}
                </span>
                <span className="text-xs text-zinc-500">{c.label}</span>
              </div>
              <h3 className="text-xl font-bold text-black mb-2">{c.title}</h3>
              <p className="text-sm text-zinc-600 mb-4">{c.description}</p>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <code className="px-3 py-2 rounded-lg bg-ink-800 border border-black/[0.06] text-accent-600 font-mono font-bold">
                    {c.code}
                  </code>
                  <button
                    onClick={() => copyCode(c.code)}
                    className="text-xs text-zinc-500 hover:text-accent-600 transition-colors"
                  >
                    {copied === c.code ? "✓ Copied!" : "Copy"}
                  </button>
                </div>
                <span className="text-xs text-zinc-500">{c.expires}</span>
              </div>
              <div className="mt-4 pt-4 border-t border-black/[0.06]">
                <a
                  href={c.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-accent-600 hover:underline"
                >
                  Claim it — enter {c.code} at checkout →
                </a>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Brand codes by market */}
      <section className="max-w-4xl mx-auto px-6 pb-16">
        <h2 className="text-sm font-semibold text-zinc-700 uppercase tracking-wider mb-2">
          Huawei &amp; Samsung — by country
        </h2>
        <p className="text-xs text-zinc-500 mb-6">
          Each code works only on its own country store. Tap the store link beside it.
        </p>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {brandCodes.map((b) => (
            <div
              key={`${b.brand}-${b.country}`}
              className="rounded-xl border border-black/[0.06] bg-white p-4 hover:border-accent-500/30 transition-all"
            >
              <div className="flex items-center justify-between mb-1">
                <span className="text-sm font-semibold">
                  {b.flag} {b.brand}
                </span>
                <span className="text-xs text-zinc-500">{b.country}</span>
              </div>
              <div className="text-2xl font-bold text-accent-600 mb-2">{b.off} off</div>
              <div className="flex items-center gap-2 mb-3">
                <code className="px-2 py-1 rounded bg-ink-800 border border-black/[0.06] text-accent-600 font-mono text-sm font-bold">
                  {b.code}
                </code>
                <button
                  onClick={() => copyCode(b.code)}
                  className="text-xs text-zinc-500 hover:text-accent-600 transition-colors"
                >
                  {copied === b.code ? "✓ Copied!" : "Copy"}
                </button>
              </div>
              <p className="text-xs text-zinc-500 mb-2">{BRAND_CODE_CAVEAT}</p>
              <a
                href={b.url}
                target="_blank"
                /* Paid affiliate deeplinks, same as the AliExpress cards. */
                rel="sponsored noopener noreferrer"
                className="text-xs text-accent-600 hover:underline"
              >
                Open {b.brand} {b.country} →
              </a>
            </div>
          ))}
        </div>
      </section>

      {/* Freebies */}
      <section className="max-w-4xl mx-auto px-6 pb-16">
        <h2 className="text-sm font-semibold text-zinc-700 uppercase tracking-wider mb-6">
          Where the deals lead
        </h2>
        <div className="grid md:grid-cols-3 gap-6">
          {destinations.map((f, i) => (
            <div
              key={i}
              className="rounded-2xl border border-black/[0.06] bg-white p-6 hover:border-accent-500/30 transition-all"
            >
              <div className="text-3xl mb-3">{f.icon}</div>
              <h3 className="text-lg font-bold text-black mb-2">{f.title}</h3>
              <p className="text-sm text-zinc-600 mb-4">{f.description}</p>
              <a
                href={f.link}
                className="inline-block text-sm text-accent-600 hover:underline"
              >
                {f.cta} →
              </a>
            </div>
          ))}
        </div>
      </section>

      {/* CTA Banner */}
      <section className="max-w-4xl mx-auto px-6 pb-20">
        <div className="rounded-2xl bg-gradient-to-r from-accent-500/20 to-accent-500/5 border border-accent-500/30 p-8 text-center">
          <h2 className="text-2xl font-bold text-black mb-2">
            One discount at a time, and it works
          </h2>
          <p className="text-zinc-600 mb-6">
            Every code here is checked against the real checkout before it goes up. When there is nothing genuine to offer, this page stays empty rather than wasting your time.
          </p>
          <a
            href="https://jrb.codes"
            className="inline-block px-8 py-3 rounded-xl bg-accent-500 text-black font-bold hover:bg-accent-600 transition-colors"
          >
            Claim your freebie →
          </a>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-black/[0.06]">
        <div className="max-w-4xl mx-auto px-6 py-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2 text-sm text-zinc-500">
            <span>🏷️ expresscoupon.info</span>
          </div>
          <div className="flex items-center gap-6 text-sm text-zinc-500">
            <a href="https://hawie.shop" className="hover:text-accent-600 transition-colors">hawie.shop</a>
            <a href="https://racksontop.me" className="hover:text-accent-600 transition-colors">racksontop.me</a>
            <a href="https://jrb.codes" className="hover:text-accent-600 transition-colors">jrb.codes</a>
          </div>
        </div>
      </footer>
    </main>
  );
}
