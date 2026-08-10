import "./globals.css";
import type { Metadata } from "next";
import ThemeToggle from "@/components/ThemeToggle";

export const metadata: Metadata = {
  title: "Express Coupon — Deals, Discounts & Freebies",
  description: "Weekly deals, exclusive coupons, and free product offers. Get free trials and digital products with every purchase.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-ink-900 text-black">
        {children}
        <ThemeToggle />
      </body>
    </html>
  );
}
