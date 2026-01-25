import fs from "fs";
import path from "path";
import { glob } from "glob";

// Configuration
const SUSPICIOUS_PATTERNS = [
  "SEO_Content.",
  "Newsroom.",
  ".title",
  ".desc",
  // Add other namespace-like patterns that shouldn't appear in UI
];

const SCAN_DIR = path.join(process.cwd(), "src");

async function scanForKeyLeaks() {
  console.log("Starting i18n Key Leak Gate...");

  const files = await glob(`${SCAN_DIR}/**/*.{tsx,ts}`, {
    ignore: ["**/*.d.ts", "**/*.test.ts", "**/*.test.tsx"],
  });

  let hasErrors = false;

  for (const file of files) {
    const content = fs.readFileSync(file, "utf-8");

    // Simple check: do these patterns appear in the file?
    // We strictly want to avoid them appearing in what looks like UI strings.
    // However, they MUST appear in t() calls.
    // So we need to distinguise between t('SEO_Content.foo') and <p>SEO_Content.foo</p>
    // This is hard with regex.
    // Heuristic: If we find the pattern, check if it's surrounded by quotes which are arguments to t/tSafe.

    // For this gate, we will be strict:
    // We fail if we find the pattern, UNLESS it is inside t('...') or t("...") or tSafe(..., "...")
    // This is a simplification.

    for (const pattern of SUSPICIOUS_PATTERNS) {
      // Regex to find pattern NOT preceded by quote-t-paren/comma
      // This is getting complicated.
      // Let's simplified: Detect if the pattern exists.
      // If it exists, we manual review or assume it's a t() call?
      // NO, the prompt says "fails if any of these appear in UI strings".
      // This implies renders search (which we can't do easily) or checking JSX children.

      // Let's look for pattern in JSX text context: >.*Pattern.*<
      // Refined regex: Match literal patterns that look like keys, but ignore common dynamic patterns (e.g. {var.Pattern} or ${Pattern})
      // We want to find: >SEO_Content.Title<
      // We want to IGNORE: >{t('SEO_Content.Title')}< or >{props.title}<

      // This is a naive heuristic: if the matched text contains { or } or $, it's likely code, not a literal string patterns.
      const jsxTextRegex = new RegExp(`>([^<{}$]*${pattern.replace(".", "\\.")}[^<{}$]*)<`, "g");
      const matches = content.match(jsxTextRegex);

      if (matches) {
        console.error(
          `[FAIL] Potential leaked key found in ${path.relative(process.cwd(), file)}:`
        );
        matches.forEach((m) => console.error(`   ${m.trim()}`));
        hasErrors = true;
      }

      // Also check for "title=" attributes that might contain keys
      const titleAttrRegex = new RegExp(
        `title=["'][^"']*${pattern.replace(".", "\\.")}[^"']*["']`,
        "g"
      );
      const titleMatches = content.match(titleAttrRegex);
      if (titleMatches) {
        // Need to filter out valid t() calls inside attributes if they were interpolated?
        // Usually attributes are title={t('...')} which is safe.
        // title="SEO_Content..." is bad.
        console.error(
          `[FAIL] Potential leaked key in attribute in ${path.relative(process.cwd(), file)}:`
        );
        titleMatches.forEach((m) => console.error(`   ${m.trim()}`));
        hasErrors = true;
      }
    }
  }

  if (hasErrors) {
    console.error("FAILED: Found potential key leaks in UI strings.");
    process.exit(1);
  } else {
    console.log("PASSED: No obvious key leaks found in JSX text.");
  }
}

scanForKeyLeaks().catch((err) => {
  console.error(err);
  process.exit(1);
});
