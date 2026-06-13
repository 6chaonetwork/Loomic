"use client";

import dynamic from "next/dynamic";

import { LoadingScreen } from "../../components/loading-screen";

const LoginPageClient = dynamic(() => import("./login-page-client"), {
  ssr: false,
  loading: () => <LoadingScreen />,
});

export default function LoginPageEntry() {
  return <LoginPageClient />;
}
