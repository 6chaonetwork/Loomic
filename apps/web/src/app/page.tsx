"use client";

import dynamic from "next/dynamic";
import { FloatingNav } from "@/components/landing/floating-nav";
import { HeroSection } from "@/components/landing/hero-section";
import { TrustBar } from "@/components/landing/trust-bar";

const FeatureShowcase = dynamic(
  () =>
    import("@/components/landing/feature-showcase").then(
      (m) => m.FeatureShowcase,
    ),
  { ssr: false },
);

const ShowcaseGallery = dynamic(
  () =>
    import("@/components/landing/showcase-gallery").then(
      (m) => m.ShowcaseGallery,
    ),
  { ssr: false },
);

const HowItWorks = dynamic(
  () =>
    import("@/components/landing/how-it-works").then((m) => m.HowItWorks),
  { ssr: false },
);

const PricingPreview = dynamic(
  () =>
    import("@/components/landing/pricing-preview").then(
      (m) => m.PricingPreview,
    ),
  { ssr: false },
);

const FinalCTA = dynamic(
  () => import("@/components/landing/final-cta").then((m) => m.FinalCTA),
  { ssr: false },
);

const LandingFooter = dynamic(
  () =>
    import("@/components/landing/landing-footer").then(
      (m) => m.LandingFooter,
    ),
  { ssr: false },
);

export default function LandingPage() {
  return (
    <div className="relative">
      <FloatingNav />
      <main>
        <HeroSection />
        <TrustBar />
        <FeatureShowcase />
        <ShowcaseGallery />
        <HowItWorks />
        <PricingPreview />
        <FinalCTA />
      </main>
      <LandingFooter />
    </div>
  );
}
