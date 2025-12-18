/** @type {import('@playwright/test').PlaywrightTestConfig} */
module.exports = {
  testDir: "./tests",
  timeout: 120000,
  use: {
    baseURL: "http://localhost:3000",
    headless: false,
    slowMo: 100,
    viewport: { width: 1280, height: 800 },
  },
  webServer: {
    command: "npx serve .",
    port: 3000,
    reuseExistingServer: !process.env.CI,
  },
};
