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
    // Applying the code via the URL means the discount is already in the cart
    // when they land, rather than relying on them copying it correctly.
    url: "https://jrbcodes.gumroad.com/l/shadow-work-printable/NEWUSER20",
    expires: "Limited time",
  },
];

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
      <header className="border-b border-ink-700">
        <div className="max-w-4xl mx-auto px-6 py-5 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="text-2xl">🏷️</span>
            <span className="text-xl font-bold">
              express<span className="text-gold-500">coupon</span>
            </span>
          </div>
          <a
            href="https://jrb.codes"
            className="text-sm text-zinc-400 hover:text-gold-500 transition-colors"
          >
            jrb.codes →
          </a>
        </div>
      </header>

      {/* Hero */}
      <section className="max-w-4xl mx-auto px-6 pt-16 pb-12 text-center">
        <h1 className="text-4xl md:text-5xl font-bold mb-4">
          Deals that <span className="text-gold-500">hit different</span>
        </h1>
        <p className="text-zinc-400 text-lg max-w-2xl mx-auto">
          Every working discount across hawie.shop, racksontop and jrb.codes — in one place. No expired codes, no dead links.
        </p>
      </section>

      {/* Coupons */}
      <section className="max-w-4xl mx-auto px-6 pb-16">
        <h2 className="text-sm font-semibold text-zinc-500 uppercase tracking-wider mb-6">
          Active Coupons
        </h2>
        <div className="grid md:grid-cols-2 gap-6">
          {coupons.map((c) => (
            <div
              key={c.id}
              className="rounded-2xl border border-ink-700 bg-ink-800 p-6 hover:border-gold-500/30 transition-all"
            >
              <div className="flex items-center gap-2 mb-3">
                <span className="text-xs font-bold px-2 py-1 rounded bg-gold-500/20 text-gold-500">
                  {c.badge}
                </span>
                <span className="text-xs text-zinc-500">{c.label}</span>
              </div>
              <h3 className="text-xl font-bold mb-2">{c.title}</h3>
              <p className="text-sm text-zinc-400 mb-4">{c.description}</p>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <code className="px-3 py-2 rounded-lg bg-ink-900 border border-ink-700 text-gold-500 font-mono font-bold">
                    {c.code}
                  </code>
                  <button
                    onClick={() => copyCode(c.code)}
                    className="text-xs text-zinc-500 hover:text-gold-500 transition-colors"
                  >
                    {copied === c.code ? "✓ Copied!" : "Copy"}
                  </button>
                </div>
                <span className="text-xs text-zinc-600">{c.expires}</span>
              </div>
              <div className="mt-4 pt-4 border-t border-ink-700">
                <a
                  href={c.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-gold-500 hover:underline"
                >
                  Claim it — code applies automatically →
                </a>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Freebies */}
      <section className="max-w-4xl mx-auto px-6 pb-16">
        <h2 className="text-sm font-semibold text-zinc-500 uppercase tracking-wider mb-6">
          Where the deals lead
        </h2>
        <div className="grid md:grid-cols-3 gap-6">
          {destinations.map((f, i) => (
            <div
              key={i}
              className="rounded-2xl border border-ink-700 bg-ink-800 p-6 hover:border-gold-500/30 transition-all"
            >
              <div className="text-3xl mb-3">{f.icon}</div>
              <h3 className="text-lg font-bold mb-2">{f.title}</h3>
              <p className="text-sm text-zinc-400 mb-4">{f.description}</p>
              <a
                href={f.link}
                className="inline-block text-sm text-gold-500 hover:underline"
              >
                {f.cta} →
              </a>
            </div>
          ))}
        </div>
      </section>

      {/* CTA Banner */}
      <section className="max-w-4xl mx-auto px-6 pb-20">
        <div className="rounded-2xl bg-gradient-to-r from-gold-500/20 to-gold-500/5 border border-gold-500/30 p-8 text-center">
          <h2 className="text-2xl font-bold mb-2">
            One discount at a time, and it works
          </h2>
          <p className="text-zinc-400 mb-6">
            Every code here is checked against the real checkout before it goes up. When there is nothing genuine to offer, this page stays empty rather than wasting your time.
          </p>
          <a
            href="https://jrb.codes"
            className="inline-block px-8 py-3 rounded-xl bg-gold-500 text-ink-900 font-bold hover:bg-gold-400 transition-colors"
          >
            Claim your freebie →
          </a>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-ink-700">
        <div className="max-w-4xl mx-auto px-6 py-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2 text-sm text-zinc-500">
            <span>🏷️ expresscoupon.io</span>
          </div>
          <div className="flex items-center gap-6 text-sm text-zinc-500">
            <a href="https://hawie.shop" className="hover:text-gold-500 transition-colors">hawie.shop</a>
            <a href="https://racksontop.me" className="hover:text-gold-500 transition-colors">racksontop.me</a>
            <a href="https://jrb.codes" className="hover:text-gold-500 transition-colors">jrb.codes</a>
          </div>
        </div>
      </footer>
    </main>
  );
}
