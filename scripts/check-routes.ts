/**
 * Route Existence Check
 * Validates that all routes defined in NAV_CONFIG correspond to actual page files.
 */
import fs from "fs";
import path from "path";
import { NAV_CONFIG } from "../src/config/nav";

const APP_DIR = path.join(process.cwd(), "src/app/[locale]");

function checkRoute(route: string): boolean {
  if (!route) return true;

  // Normalize route (remove leading slash)
  const normalized = route.startsWith("/") ? route.slice(1) : route;

  // Check for page.tsx in the directory
  const pagePath = path.join(APP_DIR, normalized, "page.tsx");
  const layoutPath = path.join(APP_DIR, normalized, "layout.tsx");

  if (fs.existsSync(pagePath) || fs.existsSync(layoutPath)) {
    return true;
  }

  // Also check for index.tsx if any
  const indexTsx = path.join(APP_DIR, normalized, "index.tsx");
  if (fs.existsSync(indexTsx)) return true;

  return false;
}

console.log("--- Checking Route Integrity ---");
let brokenCount = 0;

NAV_CONFIG.forEach((group) => {
  // Check group main route
  if (!checkRoute(group.mainRoute)) {
    console.error(`[BROKEN GROUP] ${group.id}: ${group.mainRoute}`);
    brokenCount++;
  }

  group.items.forEach((item) => {
    if (item.type === "page" && item.route) {
      if (!checkRoute(item.route)) {
        console.error(`[BROKEN ITEM] ${item.id}: ${item.route}`);
        brokenCount++;
      }
    }
  });
});

if (brokenCount > 0) {
  console.error(`\n❌ Found ${brokenCount} broken internal routes.`);
  process.exit(1);
} else {
  console.log("\n✅ All internal routes verified.");
  process.exit(0);
}
