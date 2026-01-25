const fs = require("fs");
const path = require("path");

const WORKSPACE = process.cwd();
const PAPERS_DIR = path.join(WORKSPACE, "papers");
const ids = ["A1", "A2", "A3", "A4", "A5", "A6", "AECP", "SCHOLARLY"];

ids.forEach((id) => {
  const p = path.join(PAPERS_DIR, id, "manuscript", "canonical.md");
  if (!fs.existsSync(p)) return;

  let content = fs.readFileSync(p, "utf-8");

  // Fix nested quotes in Mermaid labels: ["... ("...") ..."] -> ["... (...") ..."]
  // Or simpler: remove the inner quotes if they cause issues.
  // e.g. ["Sovereign Cell ("EU")"] -> ["Sovereign Cell (EU)"]
  content = content.replace(/(\[[^\]]*?)\("([^"]*?)"\)([^\]]*?\])/g, "$1($2)$3");

  fs.writeFileSync(p, content);
});
