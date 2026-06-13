// @vitest-environment node
import { describe, expect, it } from "vitest";
import { renderToString } from "react-dom/server";

import LandingPage from "@/app/page";

describe("LandingPage SSR", () => {
  it("renders the landing page on the server", () => {
    const html = renderToString(<LandingPage />);

    expect(html).toContain("让创意，自由生长");
    expect(html).toContain("开始创作");
  });
});
