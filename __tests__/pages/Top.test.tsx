import "@testing-library/jest-dom/vitest";
import { describe, expect, it, vi } from "vitest";
import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Top from "@/pages/Top";

const { mockedUsedNavigate } = vi.hoisted(() => ({
  mockedUsedNavigate: vi.fn(),
}));
vi.mock("react-router", async (importActual) => {
  const actual = await importActual<typeof import("react-router")>();
  return {
    ...actual,
    useNavigate: () => mockedUsedNavigate,
  };
});

const { mockedSample } = vi.hoisted(() => ({
  mockedSample: vi.fn(),
}));
vi.mock("@/myFunc", async () => {
  return {
    sample: mockedSample,
  };
});

describe("Top", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("初期表示", async () => {
    render(<Top />);

    expect(screen.getByRole("heading", { name: "Top" })).toBeInTheDocument();
  });

  it("Page1押下時", async () => {
    mockedSample.mockResolvedValueOnce("test1");
    const user = userEvent.setup();

    render(<Top />);
    await user.click(screen.getByRole("button", { name: "Page1" }));

    await waitFor(() => {
      expect(mockedSample).toHaveBeenCalledTimes(1);
    });
    await waitFor(() => {
      expect(mockedUsedNavigate).toHaveBeenCalledWith("/page1");
    });
  });

  it("Page2押下時", async () => {
    mockedSample.mockResolvedValueOnce("test2");
    const user = userEvent.setup();

    render(<Top />);
    await user.click(screen.getByRole("button", { name: "Page2" }));

    await waitFor(() => {
      expect(mockedSample).toHaveBeenCalledTimes(1);
    });
    await waitFor(() => {
      expect(mockedUsedNavigate).toHaveBeenCalledWith("/page2");
    });
  });
});
