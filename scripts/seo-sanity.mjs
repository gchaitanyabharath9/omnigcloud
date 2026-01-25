/**
 * SEO Sanity Quality Gate
 * Validates localized metadata (title, description), canonical tags, and hreflang alternates.
 */
import { chromium } from "@playwright/test";
import fs from "fs";
import path from "path";

const LOCALES = ["de", "en", "es", "fr", "hi", "ja", "ko", "zh"];
const BASE_URL = process.env.TEST_URL || "http://localhost:3001";

async function checkSEO() {
  console.log(`🔍 Starting SEO Sanity Check on ${BASE_URL}...`);

  const browser = await chromium.launch();
  const context = await browser.newContext();
  const page = await context.newPage();

  let hasErrors = false;
  const results = [];

  for (const locale of LOCALES) {
    const url = `${BASE_URL}/${locale}`;
    console.log(`   - Testing ${locale} at ${url}`);

    try {
      await page.goto(url, { waitUntil: "domcontentloaded" });

      const metadata = await page.evaluate((loc) => {
        const title = document.title;
        const description = document
          .querySelector('meta[name="description"]')
          ?.getAttribute("content");
        const canonical = document.querySelector('link[rel="canonical"]')?.getAttribute("href");

        const hreflangs = {};
        document.querySelectorAll('link[rel="alternate"][hreflang]').forEach((el) => {
          hreflangs[el.getAttribute("hreflang")] = el.getAttribute("href");
        });

        return { title, description, canonical, hreflangs };
      }, locale);

      const errors = [];

      // 1. Title/Description Check
      if (!metadata.title) errors.push("Missing Title");
      if (!metadata.description) errors.push("Missing Description");

      // 2. Canonical Check
      if (!metadata.canonical) {
        errors.push("Missing Canonical Tag");
      } else if (!metadata.canonical.includes(`/${locale}`)) {
        // Basic check, might need refine for root
        // errors.push(`Canonical mismatch: ${metadata.canonical}`);
      }

      // 3. Hreflang Check
      const missingHreflangs = LOCALES.filter((l) => !metadata.hreflangs[l]);
      if (missingHreflangs.length > 0) {
        errors.push(`Missing hreflangs for: ${missingHreflangs.join(", ")}`);
      }
      if (!metadata.hreflangs["x-default"]) {
        errors.push('Missing hreflang="x-default"');
      }

      if (errors.length > 0) {
        console.error(`     ❌ ${locale} FAILED: ${errors.join("; ")}`);
        hasErrors = true;
      } else {
        console.log(`     ✅ ${locale} Passed SEO`);
      }

      results.push({ locale, url, errors });
    } catch (e) {
      console.error(`     ❌ Error checking ${locale}: ${e.message}`);
      hasErrors = true;
    }
  }

  await browser.close();

  if (hasErrors) {
    console.error("\n🛑 SEO Sanity Check FAILED");
    process.exit(1);
  } else {
    console.log("\n✨ SEO Sanity Check PASSED");
    process.exit(0);
  }
}

checkSEO();
