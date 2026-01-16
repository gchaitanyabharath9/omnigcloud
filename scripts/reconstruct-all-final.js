const fs = require('fs');
const path = require('path');
const { mdToPdf } = require('md-to-pdf');

const RESEARCH_DIR = path.join(process.cwd(), 'src/app/[locale]/research/papers');
const OUTPUT_DIR = path.join(process.cwd(), 'publication-pdfs');

const papers = [
    { dir: 'a1-cloud-native-enterprise-reference', file: 'A1-PAPER-FULL.md', output: 'A1-Cloud-Native-Enterprise-Reference.pdf' },
    { dir: 'a2-high-throughput-distributed-systems', file: 'A2-PAPER-FULL.md', output: 'A2-High-Throughput-Distributed-Systems.pdf' },
    { dir: 'a3-enterprise-observability-operational-intelligence', file: 'A3-PAPER-FULL.md', output: 'A3-Enterprise-Observability-Operational-Intelligence.pdf' },
    { dir: 'a4-platform-governance-multicloud-hybrid', file: 'A4-PAPER-FULL.md', output: 'A4-Platform-Governance-Multicloud-Hybrid.pdf' },
    { dir: 'a5-monolith-to-cloud-native-modernization', file: 'A5-PAPER-FULL.md', output: 'A5-Monolith-Modernization.pdf' },
    { dir: 'a6-adaptive-policy-enforcement', file: 'A6-PAPER-FULL.md', output: 'A6-Adaptive-Policy-Enforcement.pdf' },
    { dir: 'scholarly-article', file: 'SCHOLARLY-ARTICLE-ENTERPRISE-ARCHITECTURE.md', output: 'SCHOLARLY-ARTICLE-Enterprise-Architecture.pdf' },
    { dir: 'aecp', file: 'AECP-FULL.md', output: 'AECP-Framework-Full.pdf' }
];

function cleanMermaid(code) {
    let lines = code.trim().split('\n');
    let typePart = lines[0].trim();

    // Improved cleaning logic
    let cleanedLines = lines.map((line, idx) => {
        let l = line.trim();
        if (!l) return '';
        if (idx === 0) return l; // Keep diagram type line as-is

        // Remove all existing quotes to start fresh
        l = l.replace(/["']/g, '');

        // Flowchart / Graph
        if (typePart.startsWith('graph') || typePart.startsWith('flowchart')) {
            // Replace [ ] with [" "]
            l = l.replace(/\[(.*?)\]/g, '["$1"]');
            // Replace ( ) with (" ")
            l = l.replace(/\((.*?)\)/g, '("$1")');
            // Replace { } with {" "}
            l = l.replace(/\{(.*?)\}/g, '{"$1"}');
            // Handle subgraph: subgraph ID [Label] -> subgraph ID ["Label"]
            if (l.startsWith('subgraph')) {
                const parts = l.split(/\s+/);
                if (parts.length > 2) {
                    const id = parts[1];
                    const label = parts.slice(2).join(' ').replace(/[^\w\s\:]/g, ''); // strip complex chars
                    l = `subgraph ${id} ["${label}"]`;
                }
            }
        }

        // Sequence Diagram
        if (typePart.startsWith('sequenceDiagram')) {
            if (l.startsWith('participant ')) {
                const parts = l.split(/\s+as\s+/);
                if (parts.length > 1) {
                    const alias = parts[0].replace('participant ', '').trim();
                    const label = parts[1].trim();
                    l = `participant ${alias} as "${label}"`;
                }
            } else if (l.includes(':')) {
                const parts = l.split(':');
                const head = parts[0];
                const msg = parts.slice(1).join(':').trim();
                l = `${head}: "${msg}"`;
            } else if (l.startsWith('Note')) {
                const parts = l.split(':');
                if (parts.length > 1) {
                    const head = parts[0];
                    const msg = parts.slice(1).join(':').trim();
                    l = `${head}: "${msg}"`;
                }
            }
        }

        // State Diagram
        if (typePart.startsWith('stateDiagram')) {
            if (l.includes(':')) {
                const parts = l.split(':');
                const head = parts[0];
                const msg = parts.slice(1).join(':').trim();
                l = `${head}: "${msg}"`;
            }
        }

        return '    ' + l;
    });

    return cleanedLines.join('\n');
}

(async () => {
    console.log(`Starting Ultimate PDF Generation for ${papers.length} papers...`);

    for (const paper of papers) {
        const inputPath = path.join(RESEARCH_DIR, paper.dir, paper.file);
        const outputPath = path.join(OUTPUT_DIR, paper.output);
        const relativeShort = path.join(paper.dir, paper.file);

        if (!fs.existsSync(inputPath)) {
            console.error(`Skipping ${paper.file}: Not found at ${inputPath}`);
            continue;
        }

        console.log(`Processing ${relativeShort} -> ${paper.output}`);

        try {
            let originalMd = fs.readFileSync(inputPath, 'utf-8');

            // Sanitize in memory
            const sanitizedMd = originalMd.replace(/```mermaid([\s\S]*?)```/g, (match, code) => {
                const cleaned = cleanMermaid(code);
                return '```mermaid\n' + cleaned + '\n```';
            });

            // HTML Template with Mermaid 10.6.1 and hard wait
            const template = `
<!DOCTYPE html>
<html>
<head>
    <script src="https://cdn.jsdelivr.net/npm/mermaid@10.6.1/dist/mermaid.min.js"></script>
    <script>
        mermaid.initialize({ 
            startOnLoad: true, 
            theme: 'neutral',
            flowchart: { useMaxWidth: true, htmlLabels: false, curve: 'basis' },
            sequence: { useMaxWidth: false },
            securityLevel: 'loose',
            maxTextSize: 1000000 
        });
    </script>
    <style>
        body { font-family: sans-serif; line-height: 1.6; }
        h1, h2, h3 { color: #2d3748; }
        .mermaid { display: flex; justify-content: center; margin: 30px 0; break-inside: avoid; }
        .mermaid svg { max-width: 100%; height: auto; }
        pre { background: #f7fafc; padding: 10px; border-radius: 4px; overflow-x: auto; }
        code { font-family: monospace; }
        table { border-collapse: collapse; width: 100%; margin: 20px 0; }
        th, td { border: 1px solid #e2e8f0; padding: 8px; text-align: left; }
        th { background: #f7fafc; }
        @media print {
            .mermaid { break-inside: avoid; }
            h2, h3 { break-after: avoid; }
        }
    </style>
</head>
<body>
    ${sanitizedMd}
    <div id="render-complete" style="display:none">READY</div>
    <script>
        window.addEventListener('load', () => {
            // Give mermaid time to finish
            setTimeout(() => {
                document.getElementById('render-complete').innerText = 'COMPLETE';
            }, 3000);
        });
    </script>
</body>
</html>
            `;

            await mdToPdf({ content: template }, {
                dest: outputPath,
                pdf_options: {
                    format: 'A4',
                    margin: { top: '20mm', right: '20mm', bottom: '20mm', left: '20mm' },
                    printBackground: true,
                    displayHeaderFooter: true,
                    headerTemplate: `<div style="font-size: 8px; margin-left: 20px; color: #999;">${paper.output} - Gold Standard Reference</div>`,
                    footerTemplate: '<div style="font-size: 8px; text-align: center; width: 100%; color: #999;">Page <span class="pageNumber"></span> of <span class="totalPages"></span></div>'
                },
                launch_options: {
                    args: ['--no-sandbox', '--disable-setuid-sandbox'],
                    waitUntil: 'networkidle0'
                }
            });

            console.log(`✓ SUCCESS: ${paper.output}`);

        } catch (err) {
            console.error(`✗ FAILED: ${paper.output}:`, err);
        }
    }

    console.log('All papers processed.');
})();
