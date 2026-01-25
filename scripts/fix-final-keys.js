const fs = require("fs");
const path = require("path");

const MESSAGES_DIR = path.resolve(__dirname, "../src/messages");
const LOCALES = ["en", "es", "fr", "de", "zh", "hi", "ja", "ko"];

LOCALES.forEach((locale) => {
  const localePath = path.join(MESSAGES_DIR, `${locale}.json`);
  const localeData = JSON.parse(fs.readFileSync(localePath, "utf-8"));

  // Add Docs.sidebar.quickLinksHeading
  if (!localeData.Docs) localeData.Docs = {};
  if (!localeData.Docs.sidebar) localeData.Docs.sidebar = {};
  localeData.Docs.sidebar.quickLinksHeading = "Quick Links";

  // Fix Whitepaper.footer: make it a simple string and add footerText for the nested version
  if (localeData.Whitepaper) {
    // Set footer as a simple string
    localeData.Whitepaper.footer = "© 2026 OmniGCloud. All rights reserved.";

    // Add footerDetails for the nested version
    if (!localeData.Whitepaper.footerDetails) {
      localeData.Whitepaper.footerDetails = {
        lab: "OmniGCloud Research Lab",
        copyright: "© 2026 OmniGCloud. All rights reserved.",
      };
    }
  }

  fs.writeFileSync(localePath, JSON.stringify(localeData, null, 2) + "\n", "utf-8");
  console.log(`✅ Fixed ${locale}.json`);
});

console.log("🟢 All locales fixed");
