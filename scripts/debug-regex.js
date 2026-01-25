const fs = require("fs");
const path = require("path");
const { globSync } = require("glob");

const SCAN_DIR = path.join(process.cwd(), "src", "app");
const files = globSync(`${SCAN_DIR}/**/*.tsx`);
console.log(`Found ${files.length} files`);

for (const file of files) {
  const content = fs.readFileSync(file, "utf-8");
  if (file.includes("cloud-modernization")) {
    console.log(`Scanning ${file}`);
    const jsxTextRegex = />([^<{]+)</g;
    let match;
    while ((match = jsxTextRegex.exec(content)) !== null) {
      console.log(`Match: "${match[1]}"`);
    }
  }
}
