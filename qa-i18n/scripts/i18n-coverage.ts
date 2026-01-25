import fs from "fs";
import path from "path";

const MESSAGES_DIR = path.join(process.cwd(), "src/messages");

const SRC_DIR = path.join(process.cwd(), "src");
const DEFAULT_LOCALE = "en";
const LOCALES = ["en", "es", "fr", "de", "zh", "hi", "ja", "ko"];
const REPORT_PATH = path.join(process.cwd(), "qa-i18n/i18n-report.md");

// Tiers Definition
const TIERS = {
  TIER_1: ["en", "es", "fr", "de", "zh", "hi", "ja", "ko"], // BLOCK RELEASE ALL
  TIER_2: [], // EMPTY
};

const TIER_2_THRESHOLD = 0; // Strict across all 8 locales

interface KeyResult {
  all: string[];
  untranslated: string[];
}

function getKeysInfo(obj: Record<string, any>, prefix = ""): KeyResult {
  let all: string[] = [];
  let untranslated: string[] = [];

  for (const key in obj) {
    const fullKey = prefix ? `${prefix}.${key}` : key;
    const val = obj[key];

    if (typeof val === "object" && val !== null && !Array.isArray(val)) {
      const nested = getKeysInfo(val, fullKey);
      all = [...all, ...nested.all];
      untranslated = [...untranslated, ...nested.untranslated];
    } else {
      all.push(fullKey);
      if (typeof val === "string") {
        const v = val.trim();
        if (
          v === "" ||
          v.includes("[TODO]") ||
          v.includes("TBD") ||
          v.includes("[MISSING]") ||
          v.startsWith("[TODO_TRANSLATE] ")
        ) {
          untranslated.push(fullKey);
        }
      }
    }
  }
  return { all, untranslated };
}

function getAllFiles(dir: string, extensions: string[]): string[] {
  let results: string[] = [];
  if (!fs.existsSync(dir)) return results;
  const list = fs.readdirSync(dir);
  list.forEach((file) => {
    const fullPath = path.join(dir, file);
    const stat = fs.statSync(fullPath);
    if (stat && stat.isDirectory()) {
      results = results.concat(getAllFiles(fullPath, extensions));
    } else if (extensions.some((ext) => file.endsWith(ext))) {
      results.push(fullPath);
    }
  });
  return results;
}

function auditCodebaseKeys(): Set<string> {
  const files = getAllFiles(SRC_DIR, [".ts", ".tsx"]);
  const usedKeys = new Set<string>();
  const assignmentRegex =
    /(?:const|let|var)\s+(\w+)\s*=\s*(?:await\s+)?(?:useTranslations|getTranslations)\s*\(\s*(?:{\s*(?:locale,\s*)?namespace:\s*)?['"](.*?)['"](?:\s*})?\s*\)/g;

  files.forEach((file) => {
    const content = fs.readFileSync(file, "utf-8");
    const fileNamespaces: Record<string, string> = {};
    let match;
    while ((match = assignmentRegex.exec(content)) !== null) {
      fileNamespaces[match[1]] = match[2];
    }

    const tVarNames = Object.keys(fileNamespaces).length > 0 ? Object.keys(fileNamespaces) : ["t"];
    tVarNames.forEach((varName) => {
      const tRegex = new RegExp(`\\b${varName}\\s*\\(\\s*['"](.*?)['"]\\s*`, "g");
      let tMatch;
      while ((tMatch = tRegex.exec(content)) !== null) {
        const key = tMatch[1];
        if (
          key.length > 1 &&
          !key.includes(" ") &&
          !key.includes("/") &&
          !key.startsWith("http") &&
          !["limit", "offset", "host", "callbackUrl"].includes(key)
        ) {
          const ns = fileNamespaces[varName];
          usedKeys.add(ns ? `${ns}.${key}` : key);
        }
      }
    });
  });
  return usedKeys;
}

function checkCoverage() {
  console.log("🧐 Starting Comprehensive i18n Audit...");

  // 1. Audit Codebase for used keys
  const usedInCode = auditCodebaseKeys();

  const enMessages = (() => {
    try {
      return JSON.parse(
        fs.readFileSync(path.join(MESSAGES_DIR, `${DEFAULT_LOCALE}.json`), "utf-8")
      );
    } catch (_e) {
      console.error("❌ Failed to load en.json");
      process.exit(1);
    }
  })();

  const { all: enKeys, untranslated: enUntranslated } = getKeysInfo(enMessages);
  const enKeySet = new Set(enKeys);

  // 3. Find missing keys in en.json (Step B.3)
  const missingFromEn = Array.from(usedInCode).filter((k) => !enKeySet.has(k));

  const report: string[] = [`# i18n Coverage Report\n\nGenerated on ${new Date().toISOString()}\n`];

  // 4. Report Base Locale Health
  report.push(`## 🇬🇧 Base Locale (en.json) Health`);
  report.push(`- **Total Keys:** ${enKeys.length}`);

  if (missingFromEn.length > 0) {
    report.push(`- **❌ Missing Keys (used in code but not in JSON):** ${missingFromEn.length}`);
    report.push(
      `\n<details><summary>List of Codebase Keys Missing in en.json</summary>\n\n\`\`\`\n${missingFromEn.join("\n")}\n\`\`\`\n</details>\n`
    );
  } else {
    report.push(`- ✅ All codebase keys found in en.json`);
  }

  if (enUntranslated.length > 0) {
    report.push(`- **⚠️ Placeholders in en.json:** ${enUntranslated.length}`);
  }

  let globalFail = missingFromEn.length > 0;
  const failures: string[] = [];
  if (missingFromEn.length > 0)
    failures.push(`en.json (Missing ${missingFromEn.length} keys used in code)`);

  // 5. Compare other locales
  LOCALES.forEach((locale) => {
    if (locale === DEFAULT_LOCALE) return;

    const filePath = path.join(MESSAGES_DIR, `${locale}.json`);
    if (!fs.existsSync(filePath)) {
      report.push(`## ❌ ${locale}: FILE MISSING`);
      if (TIERS.TIER_1.includes(locale)) {
        globalFail = true;
        failures.push(`${locale} (Tier 1 missing file)`);
      }
      return;
    }

    const messages = JSON.parse(fs.readFileSync(filePath, "utf-8"));
    const { all: localeKeys, untranslated: localeUntranslated } = getKeysInfo(messages);
    const localeKeySet = new Set(localeKeys);

    // Missing means defined in en.json but not in this locale
    const missingFromStructure = enKeys.filter((k) => !localeKeySet.has(k));
    const totalMissing = [...new Set([...missingFromStructure, ...localeUntranslated])];

    const isTier1 = TIERS.TIER_1.includes(locale);
    let status = "✅ PASS";
    let icon = "✅";

    if (isTier1 && totalMissing.length > 0) {
      status = "❌ FAIL (Tier 1 Strict)";
      icon = "❌";
      globalFail = true;
      failures.push(`${locale} (${totalMissing.length} missing/untranslated keys in Tier 1)`);
    } else if (!isTier1 && totalMissing.length > TIER_2_THRESHOLD) {
      status = `❌ FAIL (Tier 2 > ${TIER_2_THRESHOLD})`;
      icon = "❌";
      globalFail = true;
      failures.push(`${locale} (${totalMissing.length} keys missing)`);
    } else if (!isTier1 && totalMissing.length > 0) {
      status = "⚠️ WARN";
      icon = "⚠️";
    }

    report.push(`\n### ${icon} ${locale} - ${status}`);
    report.push(`- **Tier:** ${isTier1 ? "1" : "2"}`);
    report.push(`- **Total Keys:** ${localeKeys.length}`);
    report.push(`- **Missing/Untranslated relative to en.json:** ${totalMissing.length}`);

    if (totalMissing.length > 0) {
      report.push(
        `\n<details><summary>View Missing Keys</summary>\n\n\`\`\`\n${totalMissing.join("\n")}\n\`\`\`\n</details>\n`
      );
    }
  });

  fs.writeFileSync(REPORT_PATH, report.join("\n"));
  console.log(`\n📄 Report generated: ${REPORT_PATH}`);

  if (globalFail) {
    console.error(`\n🔴 PRE-RELEASE GATE FAILED:`);
    failures.forEach((f) => console.error(`   - ${f}`));
    process.exit(1);
  } else {
    console.log(`\n🟢 PRE-RELEASE GATE PASSED.`);
  }
}

checkCoverage();
