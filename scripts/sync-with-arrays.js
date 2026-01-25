const fs = require("fs");
const path = require("path");

const MESSAGES_DIR = path.resolve(__dirname, "../src/messages");
const LOCALES = ["en", "es", "fr", "de", "zh", "hi", "ja", "ko"];

// Read en.json
const enPath = path.join(MESSAGES_DIR, "en.json");
const en = JSON.parse(fs.readFileSync(enPath, "utf-8"));

// Add missing Docs.sidebar.quickLinksHeading
if (!en.Docs) en.Docs = {};
if (!en.Docs.sidebar) en.Docs.sidebar = {};
en.Docs.sidebar.quickLinksHeading = "Quick Links";

// Save en.json
fs.writeFileSync(enPath, JSON.stringify(en, null, 2) + "\n", "utf-8");
console.log("✅ Added Docs.sidebar.quickLinksHeading to en.json");

// Now sync all locales including arrays
LOCALES.forEach((locale) => {
  if (locale === "en") return;

  const localePath = path.join(MESSAGES_DIR, `${locale}.json`);
  const localeData = JSON.parse(fs.readFileSync(localePath, "utf-8"));

  // Deep merge function that handles arrays
  function deepMerge(target, source) {
    for (const key in source) {
      if (Array.isArray(source[key])) {
        // Copy arrays directly
        target[key] = JSON.parse(JSON.stringify(source[key]));
      } else if (typeof source[key] === "object" && source[key] !== null) {
        if (!target[key]) {
          target[key] = {};
        }
        deepMerge(target[key], source[key]);
      } else {
        // Only add if missing
        if (target[key] === undefined) {
          target[key] = source[key];
        }
      }
    }
  }

  deepMerge(localeData, en);

  fs.writeFileSync(localePath, JSON.stringify(localeData, null, 2) + "\n", "utf-8");
  console.log(`✅ Synced ${locale}.json with arrays`);
});

console.log("🟢 All locales synced with array support");
