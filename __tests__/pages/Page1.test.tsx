import "@testing-library/jest-dom/vitest";
import { render, screen } from "@testing-library/react";
import { describe, it } from "vitest";
import Page1 from "@/pages/Page1";

describe("Page1", () => {
  it("レンダリング", () => {
    render(<Page1 />);

    expect(screen.getByText("Page1")).toBeInTheDocument();
  });
});
