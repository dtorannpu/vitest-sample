import "@testing-library/jest-dom/vitest";
import { render, screen } from "@testing-library/react";
import { describe, it } from "vitest";
import Page2 from "@/pages/Page2";

describe("Page2", () => {
  it("レンダリング", () => {
    render(<Page2 />);

    expect(screen.getByText("Page2")).toBeInTheDocument();
  });
});
