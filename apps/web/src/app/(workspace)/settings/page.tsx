import { Suspense } from "react";

import { SettingsSkeleton } from "@/components/skeletons/settings-skeleton";

import { SettingsClient } from "./settings-client";

export const dynamic = "force-dynamic";

export default function SettingsPage() {
  return (
    <Suspense fallback={<SettingsSkeleton />}>
      <SettingsClient />
    </Suspense>
  );
}
