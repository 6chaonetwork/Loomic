import type { Metadata } from "next";
import type { ReactNode } from "react";
import Script from "next/script";
import { BRAND_DESCRIPTION, BRAND_ICON_SRC, BRAND_NAME } from "@/components/brand/constants";
import { cn } from "@/lib/utils";

import { Providers } from "../components/providers";

import "./globals.css";

// Loomic web is an authenticated browser application. Zeabur builds the Docker
// image with `next build`, so keep route rendering dynamic instead of letting
// Next statically prerender client/session-heavy pages during image creation.
export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: BRAND_NAME,
  description: BRAND_DESCRIPTION,
  icons: {
    icon: BRAND_ICON_SRC,
    apple: BRAND_ICON_SRC,
  },
  openGraph: {
    title: BRAND_NAME,
    description: BRAND_DESCRIPTION,
    images: [{ url: "/og-image.png", width: 1200, height: 630 }],
  },
  twitter: {
    card: "summary_large_image",
    title: BRAND_NAME,
    description: BRAND_DESCRIPTION,
    images: ["/og-image.png"],
  },
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" className={cn("scroll-smooth")} suppressHydrationWarning>
      <body className="min-h-screen bg-background font-sans antialiased">
        <Providers>{children}</Providers>
        <Script
          src="https://app.lemonsqueezy.com/js/lemon.js"
          strategy="lazyOnload"
        />
      </body>
    </html>
  );
}
