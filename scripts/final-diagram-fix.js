const fs = require("fs");
const path = require("path");
const { mdToPdf } = require("md-to-pdf");

const inputPath =
  "/home/user\\Documents\\gemini\\antigravity\\playground\\nascent-zodiac\\src\\app\\[locale]\\research\\papers\\a1-cloud-native-enterprise-reference\\A1-PAPER-FULL.md";
// Note: If the path above is slightly different in your env, let's use the one from tool output
const workspaceRoot = ".";
const relativePath =
  "src/app/[locale]/research/papers/a1-cloud-native-enterprise-reference/A1-PAPER-FULL.md";
const absoluteInput = path.join(workspaceRoot, relativePath);

const timestamp = Date.now();
const absoluteOutput = path.join(
  workspaceRoot,
  `publication-pdfs/A1_Strict_Sanitized_${timestamp}.pdf`
);
const sanitizedMdPath = path.join(
  workspaceRoot,
  `publication-pdfs/A1_Sanitized_TEST_${timestamp}.md`
);

(async () => {
  console.log("Reading:", absoluteInput);
  let originalContent = fs.readFileSync(absoluteInput, "utf-8");

  // SCORCHED EARTH SANITIZATION
  const sanitizedContent = originalContent.replace(/```mermaid([\s\S]*?)```/g, (match, code) => {
    let clean = code
      .replace(/"/g, "") // Remove all double quotes
      .replace(/'/g, "") // Remove all single quotes
      .replace(/&/g, "and") // Replace & with and
      .replace(/\//g, "-") // Replace / with -
      .replace(/[()]/g, "") // Remove all parentheses
      .replace(/>/g, " higher ") // Replace > with higher (careful with arrows later)
      .replace(/</g, " lower ") // Replace < with lower
      .replace(/#/g, " "); // Remove hashes
    // Restore arrows
    clean = clean
      .replace(/--- higher /g, "--->")
      .replace(/-- higher /g, "-->")
      .replace(/- higher /g, "->")
      .replace(/--- lower /g, "<---")
      .replace(/-- lower /g, "<--")
      .replace(/- lower /g, "<-")
      .replace(/-- higher /g, "-->>") // Sequence arrows
      .replace(/- higher /g, "->>");

    // Final filter: allow only Alphanumeric, spaces, newlines, and basic mermaid structure
    clean = clean.replace(/[^\w\s\-\.\:\|\>\<\n\=]/g, " ");

    // Ensure flowcharts don't use maxTextSize issues by stripping superfluous comments or large text
    return "```mermaid\n" + clean.trim() + "\n```";
  });

  console.log("Writing sanitized MD for verification:", sanitizedMdPath);
  fs.writeFileSync(sanitizedMdPath, sanitizedContent);

  // HTML Template with Mermaid 10.6.1 and loose security
  const template = `
<script src="https://cdn.jsdelivr.net/npm/mermaid@10.6.1/dist/mermaid.min.js"></script>
<script>
    mermaid.initialize({ 
        startOnLoad: true, 
        theme: 'neutral',
        flowchart: { useMaxWidth: true, htmlLabels: false, curve: 'basis' },
        securityLevel: 'loose',
        maxTextSize: 1000000 
    });
</script>
<style>
    .mermaid { display: flex; justify-content: center; margin: 20px 0; break-inside: avoid; }
    .mermaid svg { max-width: 100%; height: auto; }
</style>

${sanitizedContent}
`;

  console.log("Generating PDF to:", absoluteOutput);
  try {
    await mdToPdf(
      { content: template },
      {
        dest: absoluteOutput,
        pdf_options: {
          format: "A4",
          margin: { top: "20mm", right: "20mm", bottom: "20mm", left: "20mm" },
          printBackground: true,
          displayHeaderFooter: true,
          headerTemplate:
            '<div style="font-size: 8px; margin-left: 20px;">A1 Reference Architecture - Final Render</div>',
          footerTemplate:
            '<div style="font-size: 8px; text-align: center; width: 100%;">Page <span class="pageNumber"></span> of <span class="totalPages"></span></div>',
        },
        launch_options: {
          args: ["--no-sandbox", "--disable-setuid-sandbox"],
        },
      }
    );
    console.log("✓ SUCCESS! PDF generated.");
  } catch (err) {
    console.error("✗ Failed:", err);
  }
})();
