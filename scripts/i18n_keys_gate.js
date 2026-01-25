const fs = require("fs");
const path = require("path");

/**
 * Gate A: Keys Gate
 * Verifies that all statically discovered keys exist in en.json.
 */

const FOUND_KEYS_FILE = path.resolve(process.cwd(), "scripts/i18n_found_keys.json");
const EN_FILE = path.resolve(process.cwd(), "src/messages/en.json");

function run() {
  console.log("🔍 Running i18n Keys Gate...");

  if (!fs.existsSync(FOUND_KEYS_FILE)) {
    console.error("❌ i18n_found_keys.json not found. Run npm run i18n:scan first.");
    process.exit(1);
  }

  const scanData = JSON.parse(fs.readFileSync(FOUND_KEYS_FILE, "utf-8"));
  const en = JSON.parse(fs.readFileSync(EN_FILE, "utf-8"));

  let missing = 0;

  scanData.uniqueKeys.forEach((key) => {
    if (key.startsWith("__LITERAL__")) return; // handled by manual review

    // Dynamic key heurinstic check?
    // We can't verify dynamic keys easily here unless we resolved them in scan.
    // We'll trust exact matches.

    const parts = key.split(".");
    let current = en;
    let exists = true;

    for (const p of parts) {
      if (current === undefined || current[p] === undefined) {
        exists = false;
        break;
      }
      current = current[p];
    }

    if (!exists) {
      console.error(`❌ Key missing in en.json: ${key}`);
      missing++;
    }
  });

  if (missing > 0) {
    console.error(`\n❌ i18n Keys Gate FAILED. ${missing} missing keys.`);
    process.exit(1);
  }

  console.log("✅ i18n Keys Gate PASSED.");
}

run();
