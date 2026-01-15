const fs = require('fs');
const { mdToPdf } = require('md-to-pdf');
const path = require('path');

const OUTPUT_DIR = path.resolve('publication-pdfs');
const RESEARCH_DIR = path.resolve('src/app/[locale]/research/papers');

// Ensure output directory exists
if (!fs.existsSync(OUTPUT_DIR)) {
    fs.mkdirSync(OUTPUT_DIR);
}

const filesToConvert = [
    {
        input: path.join(RESEARCH_DIR, 'a1-cloud-native-enterprise-reference/A1-PAPER-FULL.md'),
        outputName: 'A1-Cloud-Native-Enterprise-Reference.pdf',
        title: 'A1 - Cloud Native Enterprise Reference Architecture'
    },
    {
        input: path.join(RESEARCH_DIR, 'a2-high-throughput-distributed-systems/A2-PAPER-FULL.md'),
        outputName: 'A2-High-Throughput-Distributed-Systems.pdf',
        title: 'A2 - High Throughput Distributed Systems'
    },
    {
        input: path.join(RESEARCH_DIR, 'a3-enterprise-observability-operational-intelligence/A3-PAPER-FULL.md'),
        outputName: 'A3-Enterprise-Observability-Operational-Intelligence.pdf',
        title: 'A3 - Enterprise Observability'
    },
    {
        input: path.join(RESEARCH_DIR, 'a4-platform-governance-multicloud-hybrid/A4-PAPER-FULL.md'),
        outputName: 'A4-Platform-Governance-Multicloud-Hybrid.pdf',
        title: 'A4 - Platform Governance'
    },
    {
        input: path.join(RESEARCH_DIR, 'a5-monolith-to-cloud-native-modernization/A5-PAPER-FULL.md'),
        outputName: 'A5-Monolith-Modernization.pdf',
        title: 'A5 - Monolith Modernization'
    },
    {
        input: path.join(RESEARCH_DIR, 'a6-adaptive-policy-enforcement/A6-PAPER-FULL.md'),
        outputName: 'A6-Adaptive-Policy-Enforcement.pdf',
        title: 'A6 - Adaptive Policy'
    },
    {
        input: path.join(RESEARCH_DIR, 'scholarly-article/SCHOLARLY-ARTICLE-ENTERPRISE-ARCHITECTURE.md'),
        outputName: 'SCHOLARLY-ARTICLE-Enterprise-Architecture.pdf',
        title: 'Scholarly Article - Enterprise Architecture'
    },
    {
        input: path.join(RESEARCH_DIR, 'aecp/AECP-FULL.md'),
        outputName: 'AECP-Framework-Full.pdf',
        title: 'AECP Framework'
    }
];

(async () => {
    console.log(`Starting PDF Generation for ${filesToConvert.length} papers...`);

    for (const file of filesToConvert) {
        const outputPath = path.join(OUTPUT_DIR, file.outputName);

        if (!fs.existsSync(file.input)) {
            console.error(`Skipping ${file.outputName}: Input not found at ${file.input}`);
            continue;
        }

        console.log(`Processing ${file.outputName}...`);

        try {
            const content = fs.readFileSync(file.input, 'utf-8');

            // REGEX: Convert ```mermaid ... ``` to <div class="mermaid">...</div>
            // Capture content between markers, handling newlines
            const mermaidRegex = /```mermaid([\s\S]*?)```/g;

            const processedContent = content.replace(mermaidRegex, (match, code) => {
                // Ensure code is clean of markdown fences if regex caught extras
                return `<div class="mermaid">${code.trim()}</div>`;
            });

            // Wrap in HTML with Mermaid injection
            // IMPORTANT: No indentation for the HTML tags, otherwise Markdown treats it as a code block.
            const finalContent = `
<script src="https://cdn.jsdelivr.net/npm/mermaid@10.2.3/dist/mermaid.min.js"></script>
<script>
    mermaid.initialize({ 
        startOnLoad: true, 
        theme: 'neutral',
        flowchart: { useMaxWidth: true, htmlLabels: true, curve: 'basis' },
        securityLevel: 'loose'
    });
</script>
<style>
    .mermaid { 
        display: flex; 
        justify-content: center; 
        margin: 20px 0; 
        page-break-inside: avoid;
    }
    .mermaid svg { 
        max-width: 100%; 
        height: auto; 
    }
    /* Print Styles */
    @media print {
        .mermaid { break-inside: avoid; }
    }
</style>

${processedContent}
`;

            await mdToPdf({ content: finalContent }, {
                dest: outputPath,
                pdf_options: {
                    format: 'A4',
                    margin: { top: '20mm', right: '20mm', bottom: '20mm', left: '20mm' },
                    printBackground: true,
                    displayHeaderFooter: true,
                    headerTemplate: `<div style="font-size: 9px; margin-left: 20px; color: #666; font-family: sans-serif;">${file.title}</div>`,
                    footerTemplate: '<div style="font-size: 9px; text-align: center; width: 100%; color: #666; font-family: sans-serif;">Page <span class="pageNumber"></span> of <span class="totalPages"></span></div>'
                },
                stylesheet_encoding: 'utf-8',
                launch_options: { timeout: 60000 } // 60s timeout for rendering
            });

            console.log(`✓ Generated: ${file.outputName}`);

        } catch (err) {
            console.error(`✗ Failed to generate ${file.outputName}:`, err);
        }
    }

    console.log('PDF Generation Complete.');
})();
