const fs = require("fs");
const path = require("path");

const filePath = path.resolve(
  "src/app/[locale]/research/papers/a1-cloud-native-enterprise-reference/A1-PAPER-FULL.md"
);
let content = fs.readFileSync(filePath, "utf-8");

console.log(`Simplifying Mermaid syntax in ${filePath}...`);

const mermaidBlockRegex = /```mermaid([\s\S]*?)```/g;

content = content.replace(mermaidBlockRegex, (match, code) => {
  let lines = code.split("\n");
  let fixedLines = lines.map((line) => {
    let fixedLine = line;

    // Match Subgraph: subgraph ID ["Label"] or [Label]
    // Goal: subgraph ID [Label Cleaned]
    if (fixedLine.trim().startsWith("subgraph")) {
      const subRegex = /subgraph\s+(\w+)\s*(?:\[|\")(.+?)(?:\]|\")\s*$/;
      // Matches subgraph ID [Content] or subgraph ID "Content"
      // (Simple regex, assumes line ends with ] or ")

      // Wait, previous script put ["..."].
      const subComplexRegex = /subgraph\s+(\w+)\s*\["(.+)"\]/;
      const match = fixedLine.match(subComplexRegex);
      if (match) {
        const [full, id, inner] = match;
        // Remove quotes and parens from inner text to be super safe
        let clean = inner.replace(/['"()]/g, "");
        fixedLine = `    subgraph ${id} [${clean}]`;
        console.log(`Simplified subgraph: ${inner} -> ${clean}`);
        return fixedLine;
      }
    }

    // Also fix the nested quote in cellular diagram if my regex missed it
    // The file currently has: subgraph Cell ["Scale Unit('Cell')"]
    // My regex `\["(.+)"\]` matches `Scale Unit('Cell')`.
    // clean -> Scale UnitCell (removes parens/quotes).
    // Result: subgraph Cell [Scale UnitCell]
    // This is safe.

    return fixedLine;
  });

  return "```mermaid\n" + fixedLines.join("\n") + "\n```";
});

fs.writeFileSync(filePath, content, "utf-8");
console.log("Done simplifying Mermaid syntax.");
