import fs from "fs";
import path from "path";

const MESSAGES_DIR = path.resolve(process.cwd(), "src/messages");
const EN_FILE = path.join(MESSAGES_DIR, "en.json");
const LOCALES = ["es", "fr", "de", "zh", "hi", "ja", "ko"];

async function run() {
  console.log("🔄 Force Syncing locales from en.json...");

  if (!fs.existsSync(EN_FILE)) {
    console.error("❌ en.json not found!");
    process.exit(1);
  }

  const enContent = fs.readFileSync(EN_FILE, "utf-8"); // Read raw string

  for (const loc of LOCALES) {
    const filePath = path.join(MESSAGES_DIR, `${loc}.json`);
    console.log(`Overwriting ${loc}.json with EN data...`);
    fs.writeFileSync(filePath, enContent); // Exact copy
  }

  console.log(`✅ Reset ${LOCALES.length} locale files to match EN.`);
}

run();
