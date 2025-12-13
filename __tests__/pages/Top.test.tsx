import "@testing-library/jest-dom/vitest";
import { describe, expect, it, vi } from "vitest";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import Top from "@/pages/Top.tsx";
import { sample } from "@/myFunc";

vi.mock("@/myFunc");

const mockedNavigate = vi.fn();

vi.mock("react-router", async (importActual) => {
  const actual = await importActual<typeof import("react-router")>();
  return {
    ...actual,
    useNavigate: () => mockedNavigate,
  };
});

describe("Top", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("初期表示", async () => {
    render(<Top />);

    expect(screen.getByText("Top")).toBeInTheDocument();
  });

  it("Page1押下時", async () => {
    vi.mocked(sample).mockReturnValue(Promise.resolve("test1"));

    render(<Top />);
    fireEvent.click(screen.getByText("Page1"));

    waitFor(() => {
      expect(sample).toHaveBeenCalled();
      expect(mockedNavigate).toHaveBeenCalledWith("/page1");
    });
  });

  it("Page2押下時", async () => {
    vi.mocked(sample).mockReturnValue(Promise.resolve("test2"));
    render(<Top />);
    fireEvent.click(screen.getByText("Page2"));

    waitFor(() => {
      expect(sample).toHaveBeenCalled();
      expect(mockedNavigate).toHaveBeenCalledWith("/page2");
    });
  });
});
