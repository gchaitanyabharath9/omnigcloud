import { test } from "@playwright/test";
import fs from "fs";
import path from "path";

const ROUTES = ["/", "/solutions", "/pricing", "/research", "/contact"];
const VIEWPORTS = [
  { name: "mobile", width: 390, height: 844 },
  { name: "desktop", width: 1440, height: 900 },
];

const results: any[] = [];

test.describe("Performance Baseline", () => {
  test.afterAll(() => {
    const outDir = path.join(process.cwd(), "qa-perf");
    if (!fs.existsSync(outDir)) fs.mkdirSync(outDir, { recursive: true });

    fs.writeFileSync(path.join(outDir, "baseline.json"), JSON.stringify(results, null, 2));

    // Generate MD
    let md =
      "# Performance Baseline\n\n| Route | Viewport | TTFB (ms) | LCP (ms) | CLS | JS Size (KB) | Req Count |\n|---|---|---|---|---|---|---|\n";
    results.forEach((r) => {
      md += `| ${r.route} | ${r.viewport} | ${r.ttfb} | ${r.lcp} | ${r.cls} | ${r.jsSize} | ${r.reqCount} |\n`;
    });
    fs.writeFileSync(path.join(outDir, "baseline.md"), md);
    console.log("Performance report saved to qa-perf/baseline.md");
  });

  for (const vp of VIEWPORTS) {
    for (const route of ROUTES) {
      test(`${route} - ${vp.name}`, async ({ page }) => {
        await page.setViewportSize({ width: vp.width, height: vp.height });

        let jsSize = 0;
        let reqCount = 0;

        page.on("response", async (r) => {
          reqCount++;
          const url = r.url();
          // Basic JS size estimation
          if (url.endsWith(".js") || r.headers()["content-type"]?.includes("javascript")) {
            try {
              // Only count internal JS or major libs to avoid noise/hangs on streaming
              if (url.includes("localhost") || url.includes("_next")) {
                const buf = await r.body().catch(() => Buffer.from([]));
                jsSize += buf.length;
              }
            } catch (e) {}
          }
        });

        const response = await page.goto(route, { waitUntil: "domcontentloaded" });

        // Wait for network idle manually to be safer or just wait specific time
        await page.waitForTimeout(2000);

        let ttfb = 0;
        if (response) {
          const timing = response.request().timing();
          // Playwright timing gives -1 if not available
          if (timing.responseStart !== -1 && timing.requestStart !== -1) {
            ttfb = timing.responseStart - timing.requestStart;
          }
        }

        // Get Vitals
        const metrics = await page.evaluate(async () => {
          return new Promise<any>((resolve) => {
            let lcp = 0;
            let cls = 0;

            // Polyfill-ish or standard API usage
            // We need to wait for sufficient time for LCP to candidate
            const observer = new PerformanceObserver((list) => {
              for (const entry of list.getEntries()) {
                if (entry.entryType === "largest-contentful-paint") {
                  lcp = Math.max(lcp, entry.startTime);
                }
                if (entry.entryType === "layout-shift" && !(entry as any).hadRecentInput) {
                  cls += (entry as any).value;
                }
              }
            });

            try {
              observer.observe({ type: "largest-contentful-paint", buffered: true });
              observer.observe({ type: "layout-shift", buffered: true });
            } catch (e) {}

            // Resolve after a fixed observation window
            setTimeout(() => {
              const recs = observer.takeRecords();
              for (const entry of recs) {
                if (entry.entryType === "largest-contentful-paint")
                  lcp = Math.max(lcp, entry.startTime);
                if (entry.entryType === "layout-shift" && !(entry as any).hadRecentInput)
                  cls += (entry as any).value;
              }
              resolve({ lcp, cls });
            }, 1000);
          });
        });

        results.push({
          route,
          viewport: vp.name,
          ttfb: Math.round(ttfb),
          lcp: Math.round(metrics.lcp),
          cls: parseFloat(metrics.cls.toFixed(4)),
          jsSize: Math.round(jsSize / 1024),
          reqCount,
        });
      });
    }
  }
});
