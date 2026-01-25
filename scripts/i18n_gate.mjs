import fs from "fs";
import path from "path";

console.log("\n╔══════════════════════════════════════════════════════════════════════╗");
console.log("║         i18n INTEGRITY GATE                                         ║");
console.log("╚══════════════════════════════════════════════════════════════════════╝\n");

const MESSAGES_DIR = "./src/messages";
const REQUIRED_LOCALES = ["en", "es", "fr", "de", "zh", "hi", "ja", "ko"];
const CRITICAL_KEYS = [
  "Header.nav.solutions",
  "Header.nav.research",
  "Header.nav.pricing",
  "Footer.company",
];

let failures = 0;

// 1. Check Locale Files
const files = fs.readdirSync(MESSAGES_DIR);
REQUIRED_LOCALES.forEach((locale) => {
  if (!files.includes(`${locale}.json`)) {
    console.log(`\x1b[31mFAIL: Missing locale file for ${locale}\x1b[0m`);
    failures++;
  }
});

// 2. Check Key Parity (vs en)
try {
  const enContent = JSON.parse(fs.readFileSync(path.join(MESSAGES_DIR, "en.json"), "utf8"));

  // Helper to get nested keys
  function getKeys(obj, prefix = "") {
    return Object.keys(obj).reduce((res, el) => {
      if (Array.isArray(obj[el])) return res;
      if (typeof obj[el] === "object" && obj[el] !== null) {
        return [...res, ...getKeys(obj[el], prefix + el + ".")];
      }
      return [...res, prefix + el];
    }, []);
  }
  const enKeys = new Set(getKeys(enContent));

  REQUIRED_LOCALES.filter((l) => l !== "en").forEach((locale) => {
    try {
      const locContent = JSON.parse(
        fs.readFileSync(path.join(MESSAGES_DIR, `${locale}.json`), "utf8")
      );
      const locKeys = new Set(getKeys(locContent));

      // Check Critical Keys first
      CRITICAL_KEYS.forEach((key) => {
        // Approximate check - simply verify the key prefix exists or full key
        // For nested keys, we need to check if they exist in flattened set.
        // Assuming CRITICAL_KEYS are leaf nodes or branches
        // Actually, let's just check strict existence in the set.
        if (!locKeys.has(key)) {
          // Check if it's a parent key (prefix)
          const isParent = Array.from(locKeys).some((k) => k.startsWith(key + "."));
          if (!isParent && !locKeys.has(key)) {
            console.log(`\x1b[31mFAIL: ${locale} missing critical key: ${key}\x1b[0m`);
            failures++;
          }
        }
      });

      // Warn on huge disparity
      const diff = Math.abs(enKeys.size - locKeys.size);
      if (diff > enKeys.size * 0.2) {
        console.log(
          `\x1b[33mWARN: ${locale} key count differs by >20% (${locKeys.size} vs ${enKeys.size})\x1b[0m`
        );
      }
    } catch (e) {
      console.log(`\x1b[31mFAIL: Error parsing ${locale}.json: ${e.message}\x1b[0m`);
      failures++;
    }
  });
} catch (e) {
  console.log(`\x1b[31mFAIL: Error reading en.json: ${e.message}\x1b[0m`);
  failures++;
}

// 3. Output
if (failures === 0) {
  console.log("\x1b[32mPASS: i18n Gate passed.\x1b[0m");
  process.exit(0);
} else {
  console.log(`\x1b[31mFAIL: ${failures} i18n issues found.\x1b[0m`);
  process.exit(1);
}
