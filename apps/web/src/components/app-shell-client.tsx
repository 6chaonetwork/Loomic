"use client";

import Script from "next/script";
import type { ReactNode } from "react";

import { Providers } from "./providers";

export default function AppShellClient({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <>
      <Providers>{children}</Providers>
      <Script
        src="https://app.lemonsqueezy.com/js/lemon.js"
        strategy="lazyOnload"
      />
    </>
  );
}
