import "@testing-library/jest-dom/vitest";
import { describe, expect, it, vi } from "vitest";

const mockedNavigate = vi.fn();

vi.mock("react-router", async (importActual) => {
  const actual = await importActual<typeof import("react-router")>();
  return {
    ...actual,
    useNavigate: () => mockedNavigate,
  };
});

import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

describe("Top", () => {
  beforeEach(() => {
    vi.resetModules();
    vi.clearAllMocks();
    vi.resetAllMocks();
  });

  it("初期表示", async () => {
    const { default: Top } = await import("@/pages/Top");

    render(<Top />);

    expect(screen.getByRole("heading", { name: "Top" })).toBeInTheDocument();
  });

  it("Page1押下時", async () => {
    const mockedSample = vi.fn().mockResolvedValueOnce("test1");
    vi.doMock("@/myFunc", () => ({ sample: mockedSample }));
    const { default: Top } = await import("@/pages/Top");
    const user = userEvent.setup();

    render(<Top />);
    await user.click(screen.getByRole("button", { name: "Page1" }));

    await waitFor(() => {
      expect(mockedSample).toHaveBeenCalledTimes(1);
    });
    await waitFor(() => {
      expect(mockedNavigate).toHaveBeenCalledWith("/page1");
    });
  });

  it("Page2押下時", async () => {
    const mockedSample = vi.fn().mockResolvedValueOnce("test2");
    vi.doMock("@/myFunc", () => ({ sample: mockedSample }));
    const { default: Top } = await import("@/pages/Top");
    const user = userEvent.setup();

    render(<Top />);
    await user.click(screen.getByRole("button", { name: "Page2" }));

    await waitFor(() => {
      expect(mockedSample).toHaveBeenCalledTimes(1);
    });
    await waitFor(() => {
      expect(mockedNavigate).toHaveBeenCalledWith("/page2");
    });
  });
});
