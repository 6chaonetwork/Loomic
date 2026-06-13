"use client";

import nextDynamic from "next/dynamic";

function LoadingPreviewFallback() {
  return (
    <main className="fixed inset-0 z-50 flex items-center justify-center bg-background">
      <div className="flex flex-col items-center gap-5">
        <div className="size-14 animate-pulse rounded-full bg-foreground/10" />
        <p className="text-sm text-muted-foreground">Loading preview...</p>
      </div>
    </main>
  );
}

const LoadingPreviewContent = nextDynamic(
  () =>
    import("../../components/loading-screen").then((m) => m.LoadingScreen),
  { ssr: false, loading: LoadingPreviewFallback },
);

export function LoadingPreviewClient() {
  return <LoadingPreviewContent />;
}
