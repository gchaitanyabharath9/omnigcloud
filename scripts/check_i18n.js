const fs = require("fs");
const path = require("path");

const messagesDir = path.join(process.cwd(), "messages");
const locales = ["en", "es", "fr", "de", "zh", "hi", "ja", "ko"];

const enParams = JSON.parse(fs.readFileSync(path.join(messagesDir, "en.json"), "utf8"));

function getKeys(obj, prefix = "") {
  let keys = [];
  for (const key in obj) {
    if (typeof obj[key] === "object" && obj[key] !== null) {
      keys = keys.concat(getKeys(obj[key], prefix + key + "."));
    } else {
      keys.push(prefix + key);
    }
  }
  return keys;
}

const enKeys = getKeys(enParams);
const report = {};

locales.forEach((locale) => {
  if (locale === "en") return;
  const localePath = path.join(messagesDir, `${locale}.json`);
  if (!fs.existsSync(localePath)) {
    report[locale] = { status: "MISSING_FILE" };
    return;
  }

  const localeParams = JSON.parse(fs.readFileSync(localePath, "utf8"));
  const localeKeys = getKeys(localeParams);

  const missing = enKeys.filter((k) => !localeKeys.includes(k));
  report[locale] = {
    status: missing.length > 0 ? "MISSING_KEYS" : "OK",
    missingCount: missing.length,
    missingKeys: missing.slice(0, 10), // Show first 10
  };
});

console.log(JSON.stringify(report, null, 2));
