import { defineConfig, devices } from "@playwright/test";

export default defineConfig({
  testDir: "./tests",
  timeout: 30000,
  forbidOnly: !!process.env.CI,
  retries: 0,
  workers: 4,
  reporter: "list",
  use: {
    baseURL: "http://localhost:3000",
    trace: "off",
    video: "off",
    screenshot: "off",
  },
  webServer: {
    command: "npm run start",
    url: "http://localhost:3000",
    reuseExistingServer: true,
    stdout: "ignore",
    stderr: "pipe",
  },
});
