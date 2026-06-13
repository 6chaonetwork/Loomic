"use client";

import dynamic from "next/dynamic";
import { LandingPrerenderFallback } from "@/components/landing/landing-prerender-fallback";

const LandingPageContent = dynamic(
  () =>
    import("@/components/landing/landing-page-content").then(
      (m) => m.LandingPageContent,
    ),
  // TODO: Re-enable SSR for the marketing landing after auditing
  // Framer Motion and theme-dependent sections against Linux builds.
  // The client-only boundary keeps `next build` from failing on `/`.
  { ssr: false, loading: LandingPrerenderFallback },
);

export default function LandingPage() {
  return <LandingPageContent />;
}
