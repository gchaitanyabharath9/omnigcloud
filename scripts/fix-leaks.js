const fs = require("fs");
const path = require("path");

const locales = ["en", "es", "fr", "de", "zh", "hi", "ja", "ko"];
const baseDir = path.resolve("src/messages");

locales.forEach((locale) => {
  const filePath = path.join(baseDir, `${locale}.json`);
  const content = JSON.parse(fs.readFileSync(filePath, "utf-8"));

  // Update Docs
  if (!content.Docs) content.Docs = {};
  content.Docs.documentation_label = "Documentation";

  // Update Dashboard.Executive
  if (content.Dashboard && content.Dashboard.Executive) {
    if (!content.Dashboard.Executive.metrics) content.Dashboard.Executive.metrics = {};
    content.Dashboard.Executive.metrics.activeAssetsValue = "142";
    content.Dashboard.Executive.metrics.revenueImpactValue = "+18%";
    content.Dashboard.Executive.metrics.cloudSpendValue = "-40%";
  }

  fs.writeFileSync(filePath, JSON.stringify(content, null, 2), "utf-8");
  console.log(`Updated ${locale}.json`);
});
