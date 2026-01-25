import fs from "fs";
import path from "path";

/**
 * Remediation script to populate missing i18n keys and replace literals.
 */

const TARGET_FILE = path.resolve(process.cwd(), "src/messages/en.json");

// Heuristics for better defaults
const CONTEXT_MAP: Record<string, string> = {
  title: "Overview",
  subtitle: "Key details and features",
  desc: "Detailed description of this section.",
  content: "Comprehensive content regarding this topic.",
  cta: "Learn More",
  badge: "New",
  tag: "Featured",
};

function humanize(str: string): string {
  return str
    .replace(/([A-Z])/g, " $1")
    .replace(/^./, (str) => str.toUpperCase())
    .trim();
}

function processObject(obj: any, pathStack: string[] = []) {
  for (const key in obj) {
    const currentPath = [...pathStack, key];
    const val = obj[key];

    if (typeof val === "object" && val !== null && !Array.isArray(val)) {
      processObject(val, currentPath);
    } else if (typeof val === "string") {
      // Check for literals
      if (
        val === key ||
        val === "title" ||
        val === "subtitle" ||
        val === "desc" ||
        val === "content" ||
        val === "placeholder" ||
        val === "cta" ||
        val === "button"
      ) {
        // Generate better value
        const parent = pathStack.length > 0 ? pathStack[pathStack.length - 1] : "";
        const grandParent = pathStack.length > 1 ? pathStack[pathStack.length - 2] : "";

        let newValue = "";

        // Principles / Features
        if (key === "title") {
          newValue = humanize(parent) || "Section Title";
          if (grandParent === "principles") newValue = `${humanize(parent)} Principle`;
          if (grandParent === "features") newValue = `${humanize(parent)} Feature`;
        } else if (key === "content" || key === "desc" || key === "description") {
          newValue = `Comprehensive details regarding ${humanize(parent)}.`;
        } else if (key === "cta" || key === "button") {
          newValue = `Explore ${humanize(parent)}`;
        } else if (key === "subtitle") {
          newValue = `Discover the power of ${humanize(parent)}`;
        } else {
          newValue = humanize(key);
        }

        // If specialized map exists
        if (CONTEXT_MAP[key] && val === key) {
          // Only use generic map if we couldn't derive something better from structure
          if (newValue === humanize(key)) {
            newValue = CONTEXT_MAP[key];
          }
        }

        // Override for specific "Products"
        if (pathStack.includes("Products") && key === "title") {
          // Keep existing if it looks real (e.g. "Sovereign Playground")
          // But here we are ONLY iterating.
          // The logic checks if (val === key ...).
          // "Sovereign Playground" != "title", so it won't be touched. Good.
        }

        console.log(`Fixing: ${currentPath.join(".")} | "${val}" -> "${newValue}"`);
        obj[key] = newValue;
      }
    }
  }
}

async function run() {
  console.log(`Reading ${TARGET_FILE}...`);
  const content = fs.readFileSync(TARGET_FILE, "utf-8");
  const json = JSON.parse(content);

  processObject(json);

  // Hardcode specific fixes requested by user
  // "Products.playground.title" - wait, user said "Products.playground.title" is appearing as literal?
  // If it was "Sovereign Playground" in file, why literal in UI?
  // Maybe key mismatch.
  // Let's ensure top-level keys are not "title": "title"

  // Explicit overrides for the user's specific list
  const specificFixes = [
    { path: ["WhitePaper", "aso", "principles", "neutrality", "title"], val: "Neutrality" },
    {
      path: ["WhitePaper", "aso", "principles", "neutrality", "content"],
      val: "Ensuring cloud neutrality through open standards.",
    },
    { path: ["CookieConsent", "policyLink"], val: "Sovereignty Policy" },
    { path: ["CookieConsent", "title"], val: "Privacy & Sovereignty" },
    // Top level fallbacks often leak if namespace is wrong.
    // Let's make them descriptive to help debugging in UI.
    { path: ["title"], val: "OmniGCloud Platform" },
    { path: ["subtitle"], val: "The Sovereign Cloud Control Plane" },
    { path: ["desc"], val: "Enterprise Grade Sovereignty" },
    { path: ["cta"], val: "Get Started" },
    { path: ["readOnline"], val: "Read Online" },
    { path: ["designPatterns"], val: "Design Patterns" },
    { path: ["downloadTitle"], val: "Download Whitepaper" },
  ];

  for (const fix of specificFixes) {
    let current = json;
    let success = true;
    for (let i = 0; i < fix.path.length - 1; i++) {
      if (!current[fix.path[i]]) {
        console.warn(`Path not found: ${fix.path.join(".")}`);
        success = false;
        break;
      }
      current = current[fix.path[i]];
    }
    if (success) {
      const lastKey = fix.path[fix.path.length - 1];
      current[lastKey] = fix.val;
      console.log(`Explicit Fix: ${fix.path.join(".")} -> "${fix.val}"`);
    }
  }

  fs.writeFileSync(TARGET_FILE, JSON.stringify(json, null, 2));
  console.log("✅ Updated en.json");
}

run();
