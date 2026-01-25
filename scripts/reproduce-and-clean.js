const fs = require("fs");
const path = require("path");
const { mdToPdf } = require("md-to-pdf");

const WORKSPACE = process.cwd();
const RESEARCH_DIR = path.join(WORKSPACE, "src/app/[locale]/research/papers");
const OUTPUT_DIR = path.join(WORKSPACE, "publication-pdfs");

const papers = [
  {
    dir: "a1-cloud-native-enterprise-reference",
    file: "A1-PAPER-FULL.md",
    output: "A1-Cloud-Native-Enterprise-Reference-GOLD.pdf",
  },
  {
    dir: "a2-high-throughput-distributed-systems",
    file: "A2-PAPER-FULL.md",
    output: "A2-High-Throughput-Distributed-Systems-GOLD.pdf",
  },
  {
    dir: "a3-enterprise-observability-operational-intelligence",
    file: "A3-PAPER-FULL.md",
    output: "A3-Enterprise-Observability-Operational-Intelligence-GOLD.pdf",
  },
  {
    dir: "a4-platform-governance-multicloud-hybrid",
    file: "A4-PAPER-FULL.md",
    output: "A4-Platform-Governance-Multicloud-Hybrid-GOLD.pdf",
  },
  {
    dir: "a5-monolith-to-cloud-native-modernization",
    file: "A5-PAPER-FULL.md",
    output: "A5-Monolith-Modernization-GOLD.pdf",
  },
  {
    dir: "a6-adaptive-policy-enforcement",
    file: "A6-PAPER-FULL.md",
    output: "A6-Adaptive-Policy-Enforcement-GOLD.pdf",
  },
  {
    dir: "scholarly-article",
    file: "SCHOLARLY-ARTICLE-ENTERPRISE-ARCHITECTURE.md",
    output: "SCHOLARLY-ARTICLE-Enterprise-Architecture-GOLD.pdf",
  },
  { dir: "aecp", file: "AECP-FULL.md", output: "AECP-Framework-Full-GOLD.pdf" },
];

(async () => {
  console.log("--- Starting Fresh PDF Generation ---");

  for (const paper of papers) {
    const inputPath = path.join(RESEARCH_DIR, paper.dir, paper.file);
    const outputPath = path.join(OUTPUT_DIR, paper.output);

    if (!fs.existsSync(inputPath)) continue;

    process.stdout.write(`Processing ${paper.file}... `);

    try {
      const markdown = fs.readFileSync(inputPath, "utf-8");

      // We inject the Mermaid script and Styling directly into the Markdown string.
      // This is the most reliable way for md-to-pdf to handle both the MD and the Diagram rendering.
      const injectedMarkdown = `
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Outfit:wght@400;600;700&display=swap" rel="stylesheet">
<script src="https://cdn.jsdelivr.net/npm/mermaid@10.6.1/dist/mermaid.min.js"></script>
<script>
    mermaid.initialize({ 
        startOnLoad: true, 
        theme: 'base',
        themeVariables: {
            primaryColor: '#f8fafc',
            primaryTextColor: '#1e293b',
            primaryBorderColor: '#cbd5e1',
            lineColor: '#64748b',
            secondaryColor: '#f1f5f9',
            tertiaryColor: '#ffffff',
            fontFamily: 'Inter, system-ui, sans-serif'
        },
        flowchart: { useMaxWidth: true, htmlLabels: false, curve: 'basis' },
        securityLevel: 'loose'
    });
</script>
<style>
    :root {
        --primary-blue: #1e3a8a;
        --accent-blue: #3b82f6;
        --text-main: #1e293b;
        --text-muted: #64748b;
        --bg-header: #f1f5f9;
        --bg-zebra: #f8fafc;
        --border-color: #cbd5e1;
    }

    body { 
        font-family: "Inter", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif; 
        font-size: 11pt; 
        line-height: 1.6; 
        color: var(--text-main); 
        padding: 0; 
        margin: 0; 
        background: white;
    }

    h1 { 
        font-family: "Outfit", sans-serif;
        color: var(--primary-blue); 
        border-bottom: 2px solid var(--accent-blue); 
        padding-bottom: 12px; 
        margin-top: 0; 
        font-size: 24pt;
        font-weight: 700;
        letter-spacing: -0.02em;
    }

    h2 { 
        font-family: "Outfit", sans-serif;
        color: var(--text-main); 
        margin-top: 2.5em; 
        border-left: 6px solid var(--accent-blue); 
        padding-left: 15px; 
        font-size: 18pt;
        font-weight: 600;
        letter-spacing: -0.01em;
    }

    h3 { 
        font-family: "Outfit", sans-serif;
        color: #334155; 
        margin-top: 1.8em; 
        font-size: 14pt;
        font-weight: 600;
    }

    p, li { 
        margin-bottom: 1em; 
        text-align: justify;
    }

    .mermaid { 
        display: flex; 
        justify-content: center; 
        margin: 35px 0; 
        break-inside: avoid; 
    }

    .mermaid svg { 
        max-width: 100%; 
        height: auto; 
        border: 1px solid var(--border-color); 
        border-radius: 10px; 
        padding: 20px; 
        background: #ffffff; 
        box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.05), 0 2px 4px -1px rgba(0, 0, 0, 0.03);
    }

    /* Professional Table Enhancements */
    table { 
        border-collapse: collapse; 
        width: 100%; 
        margin: 30px 0; 
        font-size: 10pt;
        break-inside: auto;
    }

    th { 
        background: var(--bg-header); 
        color: var(--text-main); 
        font-weight: 600; 
        border: 1px solid var(--border-color);
        border-bottom: 2px solid #94a3b8;
        padding: 12px 10px;
        text-transform: uppercase;
        font-size: 9pt;
        letter-spacing: 0.03em;
    }

    td { 
        border: 1px solid var(--border-color); 
        padding: 10px; 
        vertical-align: top;
    }

    tr:nth-child(even) { 
        background: var(--bg-zebra); 
    }

    /* Grayscale print safety */
    @media print {
        body { color: black; }
        .mermaid svg { box-shadow: none; border: 1px solid #ccc; }
        h1, h2, h3 { break-after: avoid; }
        tr { break-inside: avoid; }
    }
</style>

${markdown}
`;

      await mdToPdf(
        { content: injectedMarkdown },
        {
          dest: outputPath,
          pdf_options: {
            format: "A4",
            margin: { top: "25mm", right: "20mm", bottom: "25mm", left: "20mm" },
            printBackground: true,
            displayHeaderFooter: true,
            headerTemplate:
              '<div style="font-size: 8px; margin-left: 20px; color: #718096;">RESEARCH PAPER - Publication Copy</div>',
            footerTemplate:
              '<div style="font-size: 8px; text-align: center; width: 100%; color: #718096;">Page <span class="pageNumber"></span> of <span class="totalPages"></span></div>',
          },
          launch_options: {
            args: ["--no-sandbox", "--disable-setuid-sandbox"],
            waitUntil: "networkidle0",
          },
        }
      );

      console.log("✓");
    } catch (err) {
      console.log("✗");
      console.error(`  Error: ${err.message}`);
    }
  }
  console.log("\nGeneration Complete.");
})();
