// @vitest-environment node
import { describe, expect, it } from "vitest";
import { renderToString } from "react-dom/server";

import LoadingPreviewPage from "@/app/loading-preview/page";

describe("LoadingPreviewPage SSR", () => {
  it("renders the non-blocking fallback on the server", () => {
    const html = renderToString(<LoadingPreviewPage />);

    expect(html).toContain("Loading preview...");
  });
});
