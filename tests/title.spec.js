const { test, expect } = require("@playwright/test");

test("Hello World title is visible", async ({ page }) => {
  await page.goto("/");

  const title = page.locator("#fitness-app-title");

  await title.evaluate((el) => {
    el.style.outline = "3px solid lime";
    el.style.background = "rgba(0,255,0,0.15)";
  });

  await expect(title).toBeVisible();
  await expect(title).toHaveText("Hello World");
  await page.pause();
});
