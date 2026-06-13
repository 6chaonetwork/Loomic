import { LoadingPreviewClient } from "./loading-preview-client";

// TODO: Keep this route out of static prerendering. It is only used as a
// transient browser loading tab and does not benefit from SSG on Zeabur.
export const dynamic = "force-dynamic";

export default function LoadingPreviewPage() {
  return <LoadingPreviewClient />;
}
