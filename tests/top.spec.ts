import { test, expect } from "@playwright/test";

const baseUrl = process.env.BASE_URL || "http://localhost:4173";

test("トップページにアクセスできる", async ({ page }) => {
  await page.goto(baseUrl);

  await expect(page).toHaveTitle(/vitest-sample/);
  await expect(page.getByRole("heading", { name: "Top" })).toBeVisible();
});
