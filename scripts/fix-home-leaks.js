const fs = require("fs");
const path = require("path");

const locales = ["en", "es", "fr", "de", "zh", "hi", "ja", "ko"];
const baseDir = path.resolve("src/messages");

locales.forEach((locale) => {
  const filePath = path.join(baseDir, `${locale}.json`);
  const content = JSON.parse(fs.readFileSync(filePath, "utf-8"));

  if (content.SEO_Content && content.SEO_Content.Home) {
    content.SEO_Content.Home.VisualSection = {
      description:
        "Our architecture integrates multi-cloud nodes into a single, cohesive sovereign fabric, ensuring that governance intent is enforced at the physical edge regardless of the provider.",
    };
    content.SEO_Content.Home.DeepDive = {
      ...content.SEO_Content.Home.DeepDive,
      links: {
        finance: "Financial Sovereignty",
        healthcare: "Healthcare Data Fabrics",
        modernization: "Modernization Blueprint",
      },
    };
  }

  fs.writeFileSync(filePath, JSON.stringify(content, null, 2), "utf-8");
  console.log(`Updated ${locale}.json`);
});
