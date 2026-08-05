import type { Metadata } from "next";

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
      <body>{children}</body>
    </html>
  );
}
