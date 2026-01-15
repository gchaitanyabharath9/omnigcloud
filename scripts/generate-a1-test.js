const fs = require('fs');
const { mdToPdf } = require('md-to-pdf');
const path = require('path');

(async () => {
    const inputPath = path.resolve('src/app/[locale]/research/papers/a1-cloud-native-enterprise-reference/A1-PAPER-FULL.md');
    const outputPath = path.resolve('publication-pdfs/A1-Test-With-Diagrams.pdf');

    console.log(`Reading ${inputPath}...`);
    let content = fs.readFileSync(inputPath, 'utf-8');

    // REGEX: Convert ```mermaid ... ``` to <div class="mermaid">...</div>
    // Note: We need to capture the content and handle newlines correctly.
    const mermaidRegex = /```mermaid([\s\S]*?)```/g;

    // We also need to escape HTML entities inside the mermaid block if any? 
    // Usually mermaid handles plain text.

    const processedContent = content.replace(mermaidRegex, (match, code) => {
        return `<div class="mermaid">${code}</div>`;
    });

    // Add a wrapper for PDF styling
    const finalContent = `
    <script src="https://cdn.jsdelivr.net/npm/mermaid@10.2.3/dist/mermaid.min.js"></script>
    <script>mermaid.initialize({ startOnLoad: true, theme: 'neutral' });</script>
    <style>
        .mermaid { display: flex; justify-content: center; margin: 20px 0; }
        /* Fix for PDF page breaks breaking diagrams */
        .mermaid svg { max-height: 900px; page-break-inside: avoid; }
    </style>
    
    ${processedContent}
    `;

    console.log('Generating PDF with Mermaid injection...');

    try {
        const pdf = await mdToPdf({ content: finalContent }, {
            dest: outputPath,
            pdf_options: {
                format: 'A4',
                margin: '20mm',
                printBackground: true,
                displayHeaderFooter: true,
                headerTemplate: '<div style="font-size: 10px; margin-left: 20px;">A1 - Cloud Native Reference Architecture</div>',
                footerTemplate: '<div style="font-size: 10px; text-align: center; width: 100%;">Page <span class="pageNumber"></span> of <span class="totalPages"></span></div>'
            },
            stylesheet_encoding: 'utf-8',
            // Increase timeout for rendering diagrams
            launch_options: { timeout: 30000 }
        });

        console.log(`Success! PDF saved to ${outputPath}`);

    } catch (err) {
        console.error('PDF Generation Failed:', err);
    }

})();
