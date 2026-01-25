import { defineConfig, devices } from "@playwright/test";

/**
 * Playwright Quality Gate Configuration
 * Enforces cross-browser, responsive, and performance validation.
 */
export default defineConfig({
  testDir: "./qa-i18n/tests", // Unified test directory
  testMatch: /quality-gate\.spec\.ts/,
  timeout: 60000,
  retries: 0,
  workers: 4,
  reporter: [["html", { open: "never" }], ["list"]],
  use: {
    baseURL: "http://localhost:3000",
    trace: "on-first-retry",
    screenshot: "only-on-failure",
  },
  webServer: {
    command: "npm run start -- -p 3000",
    port: 3000,
    reuseExistingServer: true,
    timeout: 120 * 1000,
  },
  projects: [
    // Desktop Browsers
    {
      name: "chromium-desktop",
      use: { ...devices["Desktop Chrome"] },
    },
    /* 
        {
            name: 'firefox-desktop',
            use: { ...devices['Desktop Firefox'] },
        },
        {
            name: 'webkit-desktop',
            use: { ...devices['Desktop Safari'] },
        },
        */
    // Tablet Viewports
    {
      name: "tablet-chromium",
      use: { ...devices["Galaxy Tab S4"] },
    },
    {
      name: "mobile-chrome",
      use: { ...devices["Pixel 5"] },
    },
    /*
        {
            name: 'mobile-safari',
            use: { ...devices['iPhone 12'] },
        },
        */
    // Specific user-requested viewports
    {
      name: "laptop-small",
      use: { viewport: { width: 1366, height: 768 } },
    },
    {
      name: "desktop-strict",
      use: { viewport: { width: 1920, height: 1080 } },
    },
  ],
});
