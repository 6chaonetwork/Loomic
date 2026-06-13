"use client";

import dynamic from "next/dynamic";

import { LoadingScreen } from "../components/loading-screen";

const LandingPageClient = dynamic(() => import("./landing-page-client"), {
  ssr: false,
  loading: () => <LoadingScreen />,
});

export default function LandingPageEntry() {
  return <LandingPageClient />;
}
