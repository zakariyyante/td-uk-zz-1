import type { Metadata } from "next";
import "./globals.css";
import { Analytics } from "@vercel/analytics/react";

export const metadata: Metadata = {
  title: "UK Betting Masters - Best Sports Betting Sites UK 2026",
  description: "Find the UK's top-rated sports betting sites. Expert-reviewed, UKGC licensed bookmakers with the best odds, biggest welcome bonuses, and fastest withdrawals.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased">
        {children}
        <Analytics />
      </body>
    </html>
  );
}
