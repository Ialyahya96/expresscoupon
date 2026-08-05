"use client";

import { useState } from "react";

const coupons = [
  {
    id: "week",
    label: "Coupon of the Week",
    badge: "HOT",
    title: "30% Off Outdoor Gear",
    description: "Walking shoes, hiking boots, camping tents — all at 30% off this week only.",
    code: "WALK30",
    store: "hawie.shop",
    expires: "Ends Sunday",
  },
  {
    id: "month",
    label: "Coupon of the Month",
    badge: "BEST",
    title: "Buy 1 Get 1 Free — All Tees",
    description: "Original design t-shirts from racksontop.me. Buy one, get one free all month.",
    code: "RACKSBOGO",
    store: "racksontop.me",
    expires: "Ends Aug 31",
  },
];

const freebies = [
  {
    title: "Free Habit Journal",
    description: "Get a free digital habit journal with any purchase. Track your wellness journey.",
    link: "https://jrb.codes",
    cta: "Claim on jrb.codes",
    icon: "📓",
  },
  {
    title: "Free Audible Trial",
    description: "Buy any product and get a free Audible trial — listen to self-improvement audiobooks on the go.",
    link: "https://www.audible.com/ep/free-trial",
    cta: "Start Audible Trial",
    icon: "🎧",
  },
  {
    title: "Free Shadow Work Journal",
    description: "Unlock your inner potential with a free Shadow Work Journal PDF with qualifying purchases.",
    link: "https://jrb.codes",
    cta: "Get it on jrb.codes",
    icon: "🔮",
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
          Weekly coupons, exclusive discounts, and free digital products with every purchase.
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
                  href={`https://${c.store}`}
                  className="text-sm text-gold-500 hover:underline"
                >
                  Shop at {c.store} →
                </a>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Freebies */}
      <section className="max-w-4xl mx-auto px-6 pb-16">
        <h2 className="text-sm font-semibold text-zinc-500 uppercase tracking-wider mb-6">
          Free With Any Purchase
        </h2>
        <div className="grid md:grid-cols-3 gap-6">
          {freebies.map((f, i) => (
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
            Get a free product with every coupon
          </h2>
          <p className="text-zinc-400 mb-6">
            Use any coupon above and get free access to a habit journal, lifting book, or Audible trial.
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
