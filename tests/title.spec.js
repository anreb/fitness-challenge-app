const { test, expect } = require("@playwright/test");

test("Hello World title is visible", async ({ page }) => {
  await page.goto("/");

  const title = page.locator("#fitness-app-title");

  await expect(title).toBeVisible();
  await expect(title).toHaveText("Hello World");
});
