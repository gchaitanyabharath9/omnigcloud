const fs = require("fs");
const path = require("path");

const messagesDir = path.join(process.cwd(), "messages");
const files = fs.readdirSync(messagesDir).filter((f) => f.endsWith(".json"));

const translations = {
  "en.json": "Mobile Navigation Menu",
  "es.json": "Menú de navegación móvil",
  "fr.json": "Menu de navigation mobile",
  "de.json": "Mobiles Navigationsmenü",
  "zh.json": "移动导航菜单",
  "hi.json": "मोबाइल नेविगेशन मेनू",
  "ja.json": "モバイルナビゲーションメニュー",
  "ko.json": "모바일 내비게이션 메뉴",
};

files.forEach((file) => {
  const filePath = path.join(messagesDir, file);
  const content = JSON.parse(fs.readFileSync(filePath, "utf8"));

  if (!content.Header) content.Header = {};

  content.Header.title = "OmniGCloud";
  content.Header.menu_accessibility_label = translations[file] || "Mobile Navigation Menu";

  // Ensure the structure is somewhat consistent (move nav to the end of Header for cleanliness if it exists)
  if (content.Header.nav) {
    const nav = content.Header.nav;
    delete content.Header.nav;
    content.Header.nav = nav;
  }

  fs.writeFileSync(filePath, JSON.stringify(content, null, 2), "utf8");
  console.log(`Updated ${file}`);
});
