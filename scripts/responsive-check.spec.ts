import { test, expect } from "@playwright/test";
import fs from "fs";
import path from "path";

const ARTIFACTS_DIR = path.join(process.cwd(), "artifacts/responsive");
const ERRORS_DIR = path.join(ARTIFACTS_DIR, "errors");

if (!fs.existsSync(ARTIFACTS_DIR)) {
  fs.mkdirSync(ARTIFACTS_DIR, { recursive: true });
}
if (!fs.existsSync(ERRORS_DIR)) {
  fs.mkdirSync(ERRORS_DIR, { recursive: true });
}

const VIEWPORTS = [
  { width: 360, height: 800, name: "mobile-small" },
  { width: 390, height: 844, name: "mobile-medium" },
  { width: 768, height: 1024, name: "tablet" },
  { width: 1366, height: 768, name: "laptop" },
  { width: 1920, height: 1080, name: "desktop" },
];

const PAGES = ["/", "/en/pricing", "/en/visual-library"];

test.describe("Responsiveness Gate", () => {
  for (const url of PAGES) {
    for (const viewport of VIEWPORTS) {
      test(`${url} on ${viewport.name} (${viewport.width}x${viewport.height})`, async ({
        page,
      }) => {
        const consoleErrors: string[] = [];

        // Monitor for Recharts sizing errors
        page.on("console", (msg) => {
          const text = msg.text();
          if (msg.type() === "error" || msg.type() === "warning") {
            if (
              text.includes("width(-1)") ||
              text.includes("height(-1)") ||
              text.includes("greater than 0")
            ) {
              consoleErrors.push(text);
            }
          }
        });

        page.on("pageerror", (err) => {
          const text = err.message;
          if (
            text.includes("width(-1)") ||
            text.includes("height(-1)") ||
            text.includes("greater than 0")
          ) {
            consoleErrors.push(text);
          }
        });

        await page.setViewportSize({ width: viewport.width, height: viewport.height });
        await page.goto(url, { waitUntil: "networkidle" });

        // Stabilize
        await page.waitForTimeout(1000);

        // Check for console errors
        if (consoleErrors.length > 0) {
          const safeUrl = url === "/" ? "home" : url.replace(/\//g, "-").replace(/^-+/, "");
          const screenshotPath = path.join(ERRORS_DIR, `${safeUrl}-${viewport.name}-error.png`);
          await page.screenshot({ path: screenshotPath });

          console.error(
            `Recharts sizing errors detected on ${url} @ ${viewport.name}:`,
            consoleErrors
          );
          throw new Error(`Recharts sizing errors detected: ${consoleErrors.join(", ")}`);
        }

        // check horizontal overflow
        const overflow = await page.evaluate(() => {
          return document.body.scrollWidth > window.innerWidth + 1;
        });

        expect(overflow, `Horizontal overflow detected on ${url} @ ${viewport.name}`).toBe(false);

        // Check for major layout shift (basic check: header visibility)
        const headerVisible = await page.isVisible("header");
        expect(headerVisible, "Header should be visible").toBe(true);

        // Take screenshot
        const safeUrl = url === "/" ? "home" : url.replace(/\//g, "-").replace(/^-+/, "");
        await page.screenshot({
          path: path.join(ARTIFACTS_DIR, `${safeUrl}-${viewport.name}.png`),
        });
      });
    }
  }
});
