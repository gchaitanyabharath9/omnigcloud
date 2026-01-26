import fs from "fs";
import path from "path";

const ROOT_DIR = process.cwd();
const APP_DIR = path.join(ROOT_DIR, "src", "app", "[locale]");

// Load routes without requiring config initialization
async function loadManifest() {
  const routesPath = path.join(ROOT_DIR, "src", "config", "routes.ts");
  const content = fs.readFileSync(routesPath, "utf-8");

  const pathRegex = /path:\s*['"](.*?)['"]/g;
  const routes: Array<{ path: string }> = [];
  let match;
  while ((match = pathRegex.exec(content)) !== null) {
    routes.push({ path: match[1] });
  }
  return routes;
}

async function validateRoutes() {
  console.log("🔍 Validating Sitemap Routes...");

  let hasError = false;
  const missingRoutes: string[] = [];
  const validPaths: string[] = [];

  const PUBLIC_ROUTES_MANIFEST = await loadManifest();
  const locales = ["en", "es", "fr", "de", "zh", "hi", "ja", "ko"];

  console.log(`✅ Validating ${PUBLIC_ROUTES_MANIFEST.length} routes...`);

  // Validate Routes existence
  for (const route of PUBLIC_ROUTES_MANIFEST) {
    validPaths.push(route.path);

    // Check for physical page.tsx or dynamic handle [slug]/page.tsx
    const relativePath = route.path === "" ? "page.tsx" : path.join(route.path, "page.tsx");
    const absolutePath = path.join(APP_DIR, relativePath);

    let exists = fs.existsSync(absolutePath);

    // Fallback: check if it's a dynamic news route
    if (!exists && route.path.startsWith("/news/")) {
      const dynamicPath = path.join(APP_DIR, "news", "[slug]", "page.tsx");
      if (fs.existsSync(dynamicPath)) {
        exists = true;
      }
    }

    // Fallback: check if it's a dynamic research/papers route
    if (!exists && route.path.startsWith("/resources/papers/")) {
      const dynamicPath = path.join(APP_DIR, "resources", "papers", "[slug]", "page.tsx");
      if (fs.existsSync(dynamicPath)) {
        exists = true;
      }
    }

    if (!exists) {
      console.error(`❌ Missing page.tsx for route: "${route.path}"`);
      console.error(`   Expected: ${absolutePath}`);
      missingRoutes.push(route.path);
      hasError = true;
    }
  }

  // Duplicate check
  const duplicates = validPaths.filter((item, index) => validPaths.indexOf(item) !== index);
  if (duplicates.length > 0) {
    console.error(
      `❌ Duplicate routes found in manifest: ${Array.from(new Set(duplicates)).join(", ")}`
    );
    hasError = true;
  }

  // Summarize
  if (hasError) {
    console.error("\n🚨 Sitemap validation FAILED.");
    if (missingRoutes.length > 0) {
      console.error(`Missing routes (${missingRoutes.length}):\n- ${missingRoutes.join("\n- ")}`);
    }
    process.exit(1);
  }

  console.log(
    `\n✅ ${PUBLIC_ROUTES_MANIFEST.length} routes validated successfully across ${locales.length} locales.`
  );
  console.log(`📈 Total sitemap entries: ${PUBLIC_ROUTES_MANIFEST.length * locales.length}`);
  process.exit(0);
}

validateRoutes().catch((err) => {
  console.error("💥 Fatal error during validation:", err);
  process.exit(1);
});
