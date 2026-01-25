import { test, expect } from "@playwright/test";
import fs from "fs";
import path from "path";

// Load budgets
const budgets = JSON.parse(
  fs.readFileSync(path.join(process.cwd(), "scripts/perf-budgets.json"), "utf-8")
);
const ARTIFACTS_DIR = path.join(process.cwd(), "artifacts/perf");

if (!fs.existsSync(ARTIFACTS_DIR)) {
  fs.mkdirSync(ARTIFACTS_DIR, { recursive: true });
}

test.describe("Performance Gate", () => {
  test("Homepage Performance Metrics", async ({ page }) => {
    // Enable performance metrics collection
    const client = await page.context().newCDPSession(page);
    await client.send("Performance.enable");

    await page.goto("/", { waitUntil: "networkidle" });

    // 1. LCP & Navigation Timings
    const performanceTiming = JSON.parse(
      await page.evaluate(() =>
        JSON.stringify(window.performance.getEntriesByType("navigation")[0])
      )
    );
    const lcp = await page.evaluate(() => {
      return new Promise((resolve) => {
        new PerformanceObserver((list) => {
          const entries = list.getEntries();
          const lastEntry = entries[entries.length - 1];
          resolve(lastEntry ? lastEntry.startTime : 0);
        }).observe({ type: "largest-contentful-paint", buffered: true });

        // Fallback
        setTimeout(() => resolve(0), 5000);
      });
    });

    console.log(`LCP: ${lcp}ms`);
    expect(lcp).toBeLessThanOrEqual(budgets.timings.lcp);

    // 2. Resource Size (JS)
    const resources = JSON.parse(
      await page.evaluate(() => JSON.stringify(window.performance.getEntriesByType("resource")))
    );
    const jsResources = resources.filter(
      (r: any) => r.name.endsWith(".js") || r.initiatorType === "script"
    );
    const totalJsSize = jsResources.reduce((acc: number, r: any) => acc + (r.transferSize || 0), 0);

    console.log(`Total JS Size: ${totalJsSize} bytes`);
    if (totalJsSize > budgets.resources.jsWarn) {
      console.warn(
        `WARNING: JS Size (${(totalJsSize / 1024).toFixed(2)}KB) exceeds warning threshold.`
      );
    }
    expect(totalJsSize).toBeLessThanOrEqual(budgets.resources.js);

    // 3. Request Count
    const reqCount = resources.length;
    console.log(`Request Count: ${reqCount}`);
    expect(reqCount).toBeLessThanOrEqual(budgets.resources.requestCount);

    // Save report
    const report = {
      url: "/",
      lcp,
      totalJsSize,
      reqCount,
      timestamp: new Date().toISOString(),
    };
    fs.writeFileSync(path.join(ARTIFACTS_DIR, "perf-report.json"), JSON.stringify(report, null, 2));
  });
});
