const fs = require("fs");
const path = require("path");

const MESSAGES_DIR = path.resolve(__dirname, "../src/messages");
const LOCALES = ["es", "fr", "de", "zh", "hi", "ja", "ko"];

LOCALES.forEach((locale) => {
  const localePath = path.join(MESSAGES_DIR, `${locale}.json`);
  const localeData = JSON.parse(fs.readFileSync(localePath, "utf-8"));

  // Convert Whitepaper.footer from string to object
  if (localeData.Whitepaper && typeof localeData.Whitepaper.footer === "string") {
    localeData.Whitepaper.footer = {
      lab: "OmniGCloud Research Lab",
      copyright: "© 2026 OmniGCloud. All rights reserved.",
    };
  } else if (localeData.Whitepaper && !localeData.Whitepaper.footer) {
    localeData.Whitepaper.footer = {
      lab: "OmniGCloud Research Lab",
      copyright: "© 2026 OmniGCloud. All rights reserved.",
    };
  }

  // Add Docs.sidebar.quickLinksHeading if missing
  if (localeData.Docs && localeData.Docs.sidebar && !localeData.Docs.sidebar.quickLinksHeading) {
    localeData.Docs.sidebar.quickLinksHeading = "Quick Links";
  }

  fs.writeFileSync(localePath, JSON.stringify(localeData, null, 2) + "\n", "utf-8");
  console.log(`✅ Fixed ${locale}.json`);
});

console.log("🟢 All locales fixed");
