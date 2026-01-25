import { defineConfig, devices } from "@playwright/test";

export default defineConfig({
  testDir: "./tests",
  timeout: 60000,
  retries: 0,
  workers: 1, // Serial for accurate perf measurement
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
