import fs from "fs";
import path from "path";

/**
 * Remediate & Fill i18n
 * 1. Reads scanned keys
 * 2. Reads product data for dynamic keys
 * 3. Checks en.json
 * 4. Fills missing keys
 * 5. Reports Literals for manual fixing
 */

const FOUND_KEYS_FILE = path.resolve(process.cwd(), "scripts/i18n_found_keys.json");
const EN_FILE = path.resolve(process.cwd(), "src/messages/en.json");

// Hardcoded dynamic families we know about (from src/data)
const PRODUCT_IDS = ["playground", "workflows", "guard", "knowledge", "deploy", "nexus"];
const DYNAMIC_KEYS = [
  // Products
  ...PRODUCT_IDS.map((id) => `Products.${id}.title`),
  ...PRODUCT_IDS.map((id) => `Products.${id}.shortDesc`),
  ...PRODUCT_IDS.map((id) => `Products.${id}.description`), // just in case

  // SEO Content - Known Sections
  "SEO_Content.Home.AboveTheFold",
  "SEO_Content.Home.HowItWorks.title",
  // Steps usually 0-2
  "SEO_Content.Home.HowItWorks.steps.0.title",
  "SEO_Content.Home.HowItWorks.steps.0.desc",
  "SEO_Content.Home.HowItWorks.steps.1.title",
  "SEO_Content.Home.HowItWorks.steps.1.desc",
  "SEO_Content.Home.HowItWorks.steps.2.title",
  "SEO_Content.Home.HowItWorks.steps.2.desc",

  "SEO_Content.Home.DeepDive.title",
  "SEO_Content.Home.DeepDive.content",
  "SEO_Content.Home.LeadCapture.title",
  "SEO_Content.Home.LeadCapture.subtitle",
  "SEO_Content.Home.LeadCapture.cta",
  "SEO_Content.Home.TechnicalApproach.title",
  "SEO_Content.Home.TechnicalApproach.content",
  "SEO_Content.Home.WhyItMatters.title",
  "SEO_Content.Home.WhyItMatters.content",

  // Cookie
  "CookieConsent.title",
  "CookieConsent.message",
  "CookieConsent.policyLink",
  "CookieConsent.accept",
  "CookieConsent.decline",
  "CookieConsent.sovereignNotice",
];

// Helper to set value in nested object
function setValue(obj: any, path: string, val: string) {
  const parts = path.split(".");
  let current = obj;
  for (let i = 0; i < parts.length - 1; i++) {
    const part = parts[i];
    if (!current[part] || typeof current[part] !== "object") {
      current[part] = {};
    }
    current = current[part];
  }
  const last = parts[parts.length - 1];

  // Only set if missing or if value is a placeholder key
  if (!current[last] || current[last] === last) {
    current[last] = val;
    return true;
  }
  return false;
}

// Helper to generate text
function generateText(key: string): string {
  const parts = key.split(".");
  const last = parts[parts.length - 1];
  const parent = parts.length > 1 ? parts[parts.length - 2] : "";

  if (last === "title") return `${humanize(parent)} Title`;
  if (last === "desc" || last === "description" || last === "content")
    return `Comprehensive content for ${humanize(parent)}.`;
  if (last === "subtitle") return `Subtitle for ${humanize(parent)}`;
  if (last === "cta") return "Learn More";
  if (last === "tag") return humanize(parent).toUpperCase();

  if (key.includes("Products") && key.includes("playground")) return "Sovereign Playground"; // fallback default

  return humanize(last);
}

function humanize(str: string): string {
  return str
    .replace(/([A-Z])/g, " $1")
    .replace(/^./, (s) => s.toUpperCase())
    .trim();
}

async function run() {
  if (!fs.existsSync(FOUND_KEYS_FILE)) {
    console.error("Scan file not found.");
    process.exit(1);
  }

  const scanData = JSON.parse(fs.readFileSync(FOUND_KEYS_FILE, "utf-8"));
  const uniqueKeys = new Set<string>(scanData.uniqueKeys);

  // Add dynamic keys
  DYNAMIC_KEYS.forEach((k) => uniqueKeys.add(k));

  // Load EN
  const en = JSON.parse(fs.readFileSync(EN_FILE, "utf-8"));

  let addedCount = 0;
  const literals: any[] = [];

  // Process Keys
  for (const key of uniqueKeys) {
    if (key.startsWith("__LITERAL__")) {
      // Find scanning instances
      const locs = scanData.locations.filter((l: any) => l.fullKey === key);
      literals.push({
        literal: key.replace("__LITERAL__", ""),
        locations: locs,
      });
      continue;
    }

    // Ensure exists
    const parts = key.split(".");
    let current = en;
    let exists = true;
    for (const p of parts) {
      if (current[p] === undefined) {
        exists = false;
        break;
      }
      current = current[p];
    }

    if (!exists) {
      // Add it
      const val = generateText(key);
      console.log(`➕ Adding missing key: ${key} = "${val}"`);
      setValue(en, key, val);
      addedCount++;
    }
  }

  // Save EN
  fs.writeFileSync(EN_FILE, JSON.stringify(en, null, 2));
  console.log(`✅ Patched en.json with ${addedCount} new keys.`);

  // Report Literals
  if (literals.length > 0) {
    console.log("\n🚨 LITERAL PROPS DETECTED (Task 4):");
    literals.forEach((l) => {
      console.log(`  "${l.literal}" found in:`);
      l.locations.forEach((loc: any) => console.log(`    - ${loc.file}:${loc.line}`));
    });

    // Generate a report for Task 4
    const todo = {
      literals,
    };
    fs.writeFileSync("scripts/literals_to_fix.json", JSON.stringify(todo, null, 2));
  } else {
    console.log("\n✅ No literal props found in scan.");
  }
}

run();
