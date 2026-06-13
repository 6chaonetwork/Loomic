"use client";

import dynamic from "next/dynamic";
import type { ReactNode } from "react";

import { LoadingScreen } from "./loading-screen";

const AppShellClient = dynamic(() => import("./app-shell-client"), {
  ssr: false,
  loading: () => <LoadingScreen />,
});

export default function AppShellEntry({
  children,
}: {
  children: ReactNode;
}) {
  return <AppShellClient>{children}</AppShellClient>;
}
