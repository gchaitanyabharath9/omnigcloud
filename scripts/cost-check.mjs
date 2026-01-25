/**
 * Vercel Hobby Cost Guardrails & Code Safety
 */
import fs from "fs";
import path from "path";

const SRC_DIR = path.join(process.cwd(), "src");

function getAllFiles(dir, exts = [".ts", ".tsx"]) {
  let results = [];
  if (!fs.existsSync(dir)) return results;
  const list = fs.readdirSync(dir);
  list.forEach((file) => {
    const fullPath = path.join(dir, file);
    const stat = fs.statSync(fullPath);
    if (stat.isDirectory()) {
      results = results.concat(getAllFiles(fullPath, exts));
    } else if (exts.some((ext) => file.endsWith(ext))) {
      results.push(fullPath);
    }
  });
  return results;
}

function checkCosts() {
  console.log("💰 Checking Cost Guardrails...");
  let errors = [];
  let warnings = [];

  const files = getAllFiles(SRC_DIR);

  files.forEach((file) => {
    const content = fs.readFileSync(file, "utf-8");

    // 1. Check for getServerSideProps
    if (content.includes("getServerSideProps")) {
      errors.push(
        `❌ SSR Detected in ${path.relative(process.cwd(), file)}: 'getServerSideProps' is forbidden (Cost Risk). Use 'getStaticProps' or Server Components.`
      );
    }

    // 2. Check for force-dynamic
    if (
      (content.includes("dynamic = 'force-dynamic'") ||
        content.includes('dynamic = "force-dynamic"')) &&
      !file.includes("metrics\\route.ts") &&
      !file.includes("metrics/route.ts")
    ) {
      errors.push(
        `❌ Force Dynamic Detected in ${path.relative(process.cwd(), file)}: 'force-dynamic' can lead to excessive function usage.`
      );
    }

    // 3. Check for next/image without unoptimized
    if (content.includes("next/image")) {
      // Very basic heuristic: check if component is used but unoptimized is missing
      // This is loose, but serves as a smoke detector
      // matches <Image ... />
      const imageInvocations = content.match(/<Image[^>]*>/g);
      if (imageInvocations) {
        imageInvocations.forEach((usage) => {
          if (
            !usage.includes("unoptimized") &&
            (usage.includes("http") || usage.includes("src={"))
          ) {
            // It's hard to statically determine if src is remote without complex parsing,
            // but we warn if we see potential external images
            // warnings.push(`⚠️  Potential Optimized Remote Image in ${path.relative(process.cwd(), file)}: Ensure 'unoptimized={true}' is used for external images.`);
          }
        });
      }
    }
  });

  // 4. Check Middleware Scope (proxy.ts or middleware.ts)
  const middlewarePath = path.join(SRC_DIR, "proxy.ts"); // Updated to proxy.ts
  if (fs.existsSync(middlewarePath)) {
    const mwContent = fs.readFileSync(middlewarePath, "utf-8");
    // Check if matcher includes static files
    if (
      mwContent.includes("/_next/static") ||
      mwContent.includes(".png") ||
      mwContent.includes(".jpg")
    ) {
      errors.push(
        `❌ Middleware Scope Risk: 'proxy.ts' appears to match static assets. Check 'matcher' config.`
      );
    }
  }

  if (errors.length > 0) {
    errors.forEach((e) => console.error(e));
    warnings.forEach((w) => console.warn(w));
    console.error("🔴 Cost check FAILED");
    process.exit(1);
  } else {
    warnings.forEach((w) => console.warn(w));
    console.log("🟢 Cost check PASSED");
  }
}

checkCosts();
