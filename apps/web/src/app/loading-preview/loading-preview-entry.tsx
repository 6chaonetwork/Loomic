"use client";

import dynamic from "next/dynamic";

import { LoadingScreen } from "../../components/loading-screen";

const LoadingPreviewClient = dynamic(() => import("./loading-preview-client"), {
  ssr: false,
  loading: () => <LoadingScreen />,
});

export default function LoadingPreviewEntry() {
  return <LoadingPreviewClient />;
}
