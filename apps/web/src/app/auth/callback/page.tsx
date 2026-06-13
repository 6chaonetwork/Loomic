import { AuthCallbackClient } from "./auth-callback-client";

// OAuth callbacks depend on query params and browser-side Supabase session
// exchange, so this route must not be statically prerendered during deploy.
export const dynamic = "force-dynamic";

export default function AuthCallbackPage() {
  return <AuthCallbackClient />;
}
