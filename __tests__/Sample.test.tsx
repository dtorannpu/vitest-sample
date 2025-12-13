import "@testing-library/jest-dom/vitest";
import { describe, it } from "vitest";
import { render, screen } from "@testing-library/react";
import Sample from "@/Sample";

describe("Sample", () => {
  it("レンダリング", () => {
    render(<Sample />);

    expect(screen.getByText("Sample")).toBeInTheDocument();
  });
});
