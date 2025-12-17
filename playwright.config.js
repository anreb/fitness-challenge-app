/** @type {import('@playwright/test').PlaywrightTestConfig} */
module.exports = {
  testDir: "./tests",
  use: {
    baseURL: "http://localhost:3000",
    headless: true,
    slowMo: 500,
  },
  webServer: {
    command: "npx serve .",
    port: 3000,
    reuseExistingServer: !process.env.CI,
  },
};
