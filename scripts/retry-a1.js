const fs = require('fs');
const { mdToPdf } = require('md-to-pdf');
const path = require('path');

(async () => {
    const file = {
        input: path.resolve('src/app/[locale]/research/papers/a1-cloud-native-enterprise-reference/A1-PAPER-FULL.md'),
        outputName: 'A1-Cloud-Native-Enterprise-Reference.pdf',
        title: 'A1 - Cloud Native Enterprise Reference Architecture'
    };

    // Use a unique name to avoid lock issues
    const timestamp = new Date().getTime();
    const uniqueOutput = path.resolve(`publication-pdfs/A1_Final_Render_${timestamp}.pdf`);

    console.log(`Generating Unique PDF to: ${uniqueOutput}`);

    try {
        const content = fs.readFileSync(file.input, 'utf-8');
        const mermaidRegex = /```mermaid([\s\S]*?)```/g;

        // STRIP INDENTATION REMOVED - Trusting file content
        const processedContent = content.replace(mermaidRegex, (match, code) => {
            console.log('Mermaid Block Found:', code.substring(0, 50) + '...');
            return `<div class="mermaid">${code}</div>`;
        });

        // Use newer Mermaid version
        const finalContent = `
<script src="https://cdn.jsdelivr.net/npm/mermaid@10.6.1/dist/mermaid.min.js"></script>
<script>
    mermaid.initialize({ 
        startOnLoad: true, 
        theme: 'neutral',
        flowchart: { useMaxWidth: true, htmlLabels: true, curve: 'basis' },
        securityLevel: 'loose',
        maxTextSize: 1000000 
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
    @media print {
        .mermaid { break-inside: avoid; }
    }
</style>

${processedContent}
`;

        await mdToPdf({ content: finalContent }, {
            dest: uniqueOutput,
            pdf_options: {
                format: 'A4',
                margin: { top: '20mm', right: '20mm', bottom: '20mm', left: '20mm' },
                printBackground: true,
                displayHeaderFooter: true,
                headerTemplate: `<div style="font-size: 9px; margin-left: 20px; color: #666; font-family: sans-serif;">${file.title}</div>`,
                footerTemplate: '<div style="font-size: 9px; text-align: center; width: 100%; color: #666; font-family: sans-serif;">Page <span class="pageNumber"></span> of <span class="totalPages"></span></div>'
            },
            stylesheet_encoding: 'utf-8',
            launch_options: { timeout: 60000 }
        });

        console.log(`✓ SUCCESS! Generated PDF: ${uniqueOutput}`);

        // No renaming logic needed for unique file


    } catch (err) {
        console.error(`✗ Failed again:`, err);
    }

})();
