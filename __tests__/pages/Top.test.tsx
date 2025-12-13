import "@testing-library/jest-dom/vitest";
import { describe, expect, it, vi } from "vitest";

vi.mock("@/myFunc");

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
import Top from "@/pages/Top.tsx";
import { sample } from "@/myFunc";

describe("Top", () => {
  beforeEach(() => {
    vi.resetAllMocks();
  });

  it("初期表示", () => {
    render(<Top />);

    expect(screen.getByRole("heading", { name: "Top" })).toBeInTheDocument();
  });

  it("Page1押下時", async () => {
    vi.mocked(sample).mockResolvedValueOnce("test1");
    const user = userEvent.setup();

    render(<Top />);
    await user.click(screen.getByRole("button", { name: "Page1" }));

    await waitFor(() => {
      expect(sample).toHaveBeenCalledTimes(1);
    });
    await waitFor(() => {
      expect(mockedNavigate).toHaveBeenCalledWith("/page1");
    });
  });

  it("Page2押下時", async () => {
    vi.mocked(sample).mockResolvedValueOnce("test2");
    const user = userEvent.setup();

    render(<Top />);
    await user.click(screen.getByRole("button", { name: "Page2" }));

    await waitFor(() => {
      expect(sample).toHaveBeenCalledTimes(1);
    });
    await waitFor(() => {
      expect(mockedNavigate).toHaveBeenCalledWith("/page2");
    });
  });
});
