import { test, expect } from "@playwright/test";

test("トップページにアクセスできる", async ({ page }) => {
  await page.goto("http://localhost:5173/");

  await expect(page).toHaveTitle(/vitest-sample/);
  await expect(page.getByRole("heading", { name: "Top" })).toBeVisible();
});
