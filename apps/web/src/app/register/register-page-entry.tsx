"use client";

import dynamic from "next/dynamic";

import { LoadingScreen } from "../../components/loading-screen";

const RegisterPageClient = dynamic(() => import("./register-page-client"), {
  ssr: false,
  loading: () => <LoadingScreen />,
});

export default function RegisterPageEntry() {
  return <RegisterPageClient />;
}
