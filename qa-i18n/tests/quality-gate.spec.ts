import { test, expect, type Page } from "@playwright/test";

const LOCALES = ["en", "es", "fr", "de", "zh", "hi", "ja", "ko"];
const HOST = process.env.TEST_URL || "http://localhost:3000";

// Helper for stable hydration and hash navigation
async function waitForStableHydration(page: Page) {
  await Promise.race([
    page.waitForSelector("#playground", { state: "attached", timeout: 15000 }),
    page.waitForSelector("text=How It Works", { state: "attached", timeout: 15000 }),
  ]).catch(() => {}); // Ignore race timeout if one fails but other succeeds

  const target = page.locator("#playground");
  if ((await target.count()) > 0) {
    await target.scrollIntoViewIfNeeded();
    await page.waitForTimeout(250);
  }
}

test.describe("Quality Gate - Core Navigation & UI", () => {
  for (const locale of LOCALES) {
    test.describe(`Locale: ${locale}`, () => {
      const consoleErrors: string[] = [];

      test.beforeEach(async ({ page }) => {
        // Pre-accept cookies to avoid overlays and locator noise
        await page.addInitScript(() => {
          try {
            if (typeof window !== "undefined" && window.localStorage) {
              window.localStorage.setItem("omnigcloud_cookie_consent", "accepted");
            }
          } catch (e) {
            // Storage access may be denied in some CI environments or cross-origin scenarios
            console.warn("Storage access denied:", e);
          }
        });

        page.on("pageerror", (err) => {
          // Ignore localStorage access errors as they are non-fatal for UI tests
          if (err.message.includes("localStorage") || err.message.includes("Access is denied")) {
            console.warn("[CI-WARN] Ignored Storage Error:", err.message);
            return;
          }
          throw new Error(`Unhandled Exception: ${err.message}`);
        });

        // Capture console errors
        page.on("console", (msg) => {
          const text = msg.text();
          if (msg.type() === "error") {
            // Ignore common non-breaking errors or expected transient errors
            if (
              text.includes("chrome-extension") ||
              text.includes("Vercel") ||
              text.includes("insights") ||
              text.includes("404") ||
              text.includes("429") ||
              text.includes("favicon")
            )
              return;
            consoleErrors.push(text);
          }
        });
      });

      test.afterEach(() => {
        if (consoleErrors.length > 0) {
          const errorMsg = `Console Errors found: ${consoleErrors.join(", ")}`;
          consoleErrors.length = 0;
          throw new Error(errorMsg);
        }
      });

      test.setTimeout(90000); // Increased for image optimization on first load

      test("initial block load & layout integrity", async ({ page, baseURL }) => {
        const HOST = baseURL || "http://localhost:3000";
        await page.goto(`${HOST}/${locale}`);

        // Check for core elements
        await expect(page.locator("header")).toBeVisible();
        await expect(page.locator("footer")).toBeVisible();

        // Check for horizontal overflow (UI quality)
        const hasOverflow = await page.evaluate(() => {
          return document.documentElement.scrollWidth > window.innerWidth;
        });
        expect(hasOverflow, `Locale ${locale} has horizontal overflow`).toBe(false);

        // Check for React Hydration errors in content
        const content = await page.content();
        expect(content).not.toContain("Hydration failed");
      });

      test("section navigation via hash", async ({ page, baseURL }) => {
        const HOST = baseURL || "http://localhost:3000";
        // Test a known section like products#playground
        const url = `${HOST}/${locale}/products#playground`;
        await page.goto(url, { waitUntil: "domcontentloaded", timeout: 30000 });
        await waitForStableHydration(page);

        // Ensure section is visible after hydration
        await page.waitForSelector("#playground", { state: "visible", timeout: 15000 });

        // Wait for any scroll to settle (Check top position stability)
        await page.waitForFunction(
          () => {
            const el = document.getElementById("playground");
            if (!el) return false;
            const top = el.getBoundingClientRect().top;
            return top < 1000; // Just ensure it's within a reasonable viewport range
          },
          { timeout: 10000 }
        );

        // Verify hash in URL
        expect(page.url()).toContain("#playground");

        const scrollInfo = await page.evaluate(() => {
          const el = document.getElementById("playground");
          if (!el) return { found: false, top: 0 };
          const rect = el.getBoundingClientRect();
          return { found: true, top: rect.top };
        });

        console.log(`[DEBUG] ${locale} #playground rect.top: ${scrollInfo.top}`);
        expect(scrollInfo.found, `Element #playground not found in ${locale}`).toBe(true);
        expect(scrollInfo.top).toBeGreaterThanOrEqual(-150);
        expect(scrollInfo.top).toBeLessThanOrEqual(1200);
      });

      test("language switch should preserve route and hash", async ({ page, baseURL }) => {
        if (locale === "en") return; // Skip en-to-en switch test as it's redundant
        const HOST = baseURL || "http://localhost:3000";

        await page.goto(`${HOST}/en/products#playground`, {
          waitUntil: "domcontentloaded",
          timeout: 30000,
        });
        await waitForStableHydration(page);
        await page.waitForSelector("#playground", { state: "visible", timeout: 15000 });
        await page.waitForTimeout(1000); // Stabilization wait
        console.log(`[DEBUG] ${locale} current URL before switch: ${page.url()}`);

        // Open language switcher
        const switcher = page.locator("#language-switcher-btn");
        await switcher.waitFor({ state: "visible", timeout: 10000 });
        await switcher.click({ force: true });
        await page.waitForTimeout(500); // Wait for dropdown animation

        // Select target locale by ID which is unique
        const langBtn = page.locator(`#lang-switch-${locale}`);
        await langBtn.waitFor({ state: "attached", timeout: 5000 });
        console.log(`[DEBUG] Triggering click for ${locale}`);
        // Using dispatchEvent for maximum reliability regardless of viewport/overlays
        await langBtn.dispatchEvent("click");

        // Wait for URL to update
        const expectedUrlPart = `/${locale}/products#playground`;
        await expect(page).toHaveURL(new RegExp(expectedUrlPart), { timeout: 15000 });
        console.log(`[DEBUG] ${locale} switch successful. New URL: ${page.url()}`);

        // Wait for the section to be present after language switch
        await waitForStableHydration(page);

        // Wait for scroll to settle
        await page.waitForFunction(
          () => {
            const el = document.getElementById("playground");
            if (!el) return false;
            const top = el.getBoundingClientRect().top;
            return top < 1000;
          },
          { timeout: 10000 }
        );

        const scrollInfo = await page.evaluate(() => {
          const el = document.getElementById("playground");
          if (!el) return { found: false, top: 0 };
          const rect = el.getBoundingClientRect();
          return { found: true, top: rect.top };
        });

        console.log(`[DEBUG] ${locale} language switch #playground rect.top: ${scrollInfo.top}`);
        expect(scrollInfo.found, `Element #playground not found after switch to ${locale}`).toBe(
          true
        );
        expect(scrollInfo.top).toBeGreaterThanOrEqual(-150);
        expect(scrollInfo.top).toBeLessThanOrEqual(1200);
      });
    });
  }
});
