/**
 * SEO Validation Script
 * Validates canonical URLs, sitemap integrity, and route health
 */
import fs from "fs";
import path from "path";

const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://omnigcloud.com";
const LOCALES = ["en", "es", "fr", "de", "zh", "hi", "ja", "ko"];

console.log("🔍 SEO Validation Starting...\n");

let errors = 0;

// 1. Validate sitemap.xml exists and is valid
console.log("📄 Checking sitemap generation...");
const sitemapPath = path.join(process.cwd(), "public", "sitemap.xml");
const nextSitemapPath = path.join(
  process.cwd(),
  ".next",
  "server",
  "app",
  "sitemap.xml",
  "route.js"
);

if (!fs.existsSync(sitemapPath) && !fs.existsSync(nextSitemapPath)) {
  console.warn("⚠️  sitemap.xml will be generated dynamically by Next.js");
} else {
  let sitemapContent = "";
  if (fs.existsSync(sitemapPath)) {
    sitemapContent = fs.readFileSync(sitemapPath, "utf8");
  }

  // Check for common issues if static sitemap exists
  if (sitemapContent) {
    if (sitemapContent.includes("localhost")) {
      console.error("❌ Sitemap contains localhost URLs");
      errors++;
    }

    const baseHost = new URL(BASE_URL).hostname;
    const hasWwwInSitemap = sitemapContent.includes("www.omnigcloud.com");
    const hasWwwInBase = baseHost.startsWith("www.");

    if (hasWwwInSitemap !== hasWwwInBase) {
      console.error(
        `❌ Sitemap/BaseURL mismatch: Sitemap has www: ${hasWwwInSitemap}, BaseURL has www: ${hasWwwInBase}`
      );
      errors++;
    }

    // Check for trailing slashes (should be consistent) - Removed as per instruction, but keeping the original comment for context if needed.
    // const urlMatches = sitemapContent.match(/<loc>(.*?)<\/loc>/g) || [];
    // const urlsWithTrailingSlash = urlMatches.filter(u => u.includes('</loc>') && u.match(/\/</));

    // if (urlsWithTrailingSlash.length > 0 && urlsWithTrailingSlash.length < urlMatches.length) {
    //     console.warn('⚠️  Inconsistent trailing slash usage in sitemap');
    // }

    const urlMatches = sitemapContent.match(/<loc>(.*?)<\/loc>/g) || [];
    console.log(`✅ Sitemap found with ${urlMatches.length} URLs`);
  } else {
    console.log("✅ Sitemap will be generated at runtime");
  }
}

// 2. Check robots.txt
console.log("\n🤖 Checking robots.txt...");
const robotsPath = path.join(process.cwd(), "public", "robots.txt");
if (!fs.existsSync(robotsPath)) {
  console.warn("⚠️  robots.txt not found (will be generated dynamically)");
} else {
  const robotsContent = fs.readFileSync(robotsPath, "utf8");
  if (!robotsContent.includes("Sitemap:")) {
    console.error("❌ robots.txt missing Sitemap directive");
    errors++;
  } else {
    console.log("✅ robots.txt valid");
  }
}

// 3. Validate canonical URL format
console.log("\n🔗 Validating canonical URL format...");
if (!BASE_URL.startsWith("https://")) {
  console.error("❌ BASE_URL must use https://");
  errors++;
}

if (BASE_URL.endsWith("/")) {
  console.error("❌ BASE_URL should not end with trailing slash");
  errors++;
}

console.log(`✅ BASE_URL format valid: ${BASE_URL}`);

// 4. Summary
console.log("\n" + "=".repeat(50));
if (errors === 0) {
  console.log("✅ SEO validation PASSED");
  process.exit(0);
} else {
  console.log(`❌ SEO validation FAILED with ${errors} error(s)`);
  process.exit(1);
}
