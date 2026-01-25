import fs from "fs";
import path from "path";

// --------------------------------------------------------------------------
// SEO Linter Strategy
// --------------------------------------------------------------------------
// 1. Validate Sitemap existence and content
// 2. Validate Robots.txt existence and content
// 3. (Optional) Crawl local build to check for meta tags (basic regex check)
// --------------------------------------------------------------------------

const SITEMAP_PATH = path.join(process.cwd(), "src/app/sitemap.ts");
const ROBOTS_PATH = path.join(process.cwd(), "src/app/robots.ts");

console.log("🔍 Starting SEO Quality Gate...");

let hasErrors = false;

// CHECK 1: Sitemap Config
if (!fs.existsSync(SITEMAP_PATH)) {
  console.error("❌ FAIL: Sitemap source file missing at src/app/sitemap.ts");
  hasErrors = true;
} else {
  const content = fs.readFileSync(SITEMAP_PATH, "utf-8");
  // Basic heuristics to check if we are using config
  if (!content.includes("config.site.url")) {
    console.warn("⚠️  WARN: Sitemap might not be using config.site.url. Check hardcoded domains.");
  }
  // Check for Ko locale
  if (!content.includes("'ko'")) {
    console.error("❌ FAIL: Sitemap missing Korean (ko) locale.");
    hasErrors = true;
  }
  console.log("✅ Sitemap source check passed.");
}

// CHECK 2: Robots Config
if (!fs.existsSync(ROBOTS_PATH)) {
  console.error("❌ FAIL: Robots source file missing at src/app/robots.ts");
  hasErrors = true;
} else {
  const content = fs.readFileSync(ROBOTS_PATH, "utf-8");
  if (!content.includes("/sitemap.xml")) {
    console.error("❌ FAIL: Robots.txt does not link to Sitemap.");
    hasErrors = true;
  }
  console.log("✅ Robots source check passed.");
}

// CHECK 3: Hreflang Logic (Heuristic check on Layout)
const LAYOUT_PATH = path.join(process.cwd(), "src/app/[locale]/layout.tsx");
if (fs.existsSync(LAYOUT_PATH)) {
  const content = fs.readFileSync(LAYOUT_PATH, "utf-8");
  if (!content.includes("alternates") || !content.includes("canonical")) {
    console.warn("⚠️  WARN: Root Layout might be missing canonical/hreflang metadata.");
  } else {
    console.log("✅ Root Layout appears to have SEO metadata.");
  }
}

if (hasErrors) {
  console.error("🛑 SEO Checks Failed.");
  process.exit(1);
} else {
  console.log("✨ All SEO Checks Passed.");
  process.exit(0);
}
