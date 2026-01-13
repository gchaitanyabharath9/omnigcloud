const puppeteer = require('puppeteer');
const fs = require('fs');
const path = require('path');
const { marked } = require('marked');

const files = [
    { srcPath: 'public-release/papers/A1-Cloud-Native-Enterprise-Reference-Architecture.md', destPath: 'public-release/papers/A1-Cloud-Native-Enterprise-Reference-Architecture.pdf' },
    { srcPath: 'public-release/papers/A2-Designing-High-Throughput-Distributed-Systems-at-Scale.md', destPath: 'public-release/papers/A2-Designing-High-Throughput-Distributed-Systems-at-Scale.pdf' },
    { srcPath: 'public-release/papers/A3-Enterprise-Observability-Operational-Intelligence-at-Scale.md', destPath: 'public-release/papers/A3-Enterprise-Observability-Operational-Intelligence-at-Scale.pdf' },
    { srcPath: 'public-release/papers/A4-Platform-Governance-Multi-Cloud-Hybrid-Strategy.md', destPath: 'public-release/papers/A4-Platform-Governance-Multi-Cloud-Hybrid-Strategy.pdf' },
    { srcPath: 'public-release/papers/A5-Monolith-to-Cloud-Native-Modernization.md', destPath: 'public-release/papers/A5-Monolith-to-Cloud-Native-Modernization.pdf' },
    { srcPath: 'public-release/papers/A6-Adaptive-Policy-Enforcement.md', destPath: 'public-release/papers/A6-Adaptive-Policy-Enforcement.pdf' },
    { srcPath: 'public-release/papers/Scholarly-Article-Enterprise-Architecture.md', destPath: 'public-release/papers/Scholarly-Article-Enterprise-Architecture.pdf' },
    { srcPath: 'public-release/framework/AECP-Framework.md', destPath: 'public-release/framework/AECP-Framework.pdf' }
];

async function generatePDFs() {
    const browser = await puppeteer.launch({ headless: 'new' });
    const page = await browser.newPage();

    for (const file of files) {
        console.log(`Generating PDF for: ${file.srcPath}`);
        const mdContent = fs.readFileSync(file.srcPath, 'utf8');
        const htmlContent = marked(mdContent);

        const fullHtml = `
            <!DOCTYPE html>
            <html>
            <head>
                <style>
                    body {
                        font-family: "Times New Roman", Times, serif;
                        line-height: 1.6;
                        color: #333;
                        max-width: 800px;
                        margin: 0 auto;
                        padding: 40px;
                        text-align: justify;
                    }
                    h1, h2, h3 {
                        color: #1a1a1a;
                        margin-top: 1.5em;
                        text-align: left;
                    }
                    h1 { border-bottom: 2px solid #333; padding-bottom: 10px; }
                    pre {
                        background: #f4f4f4;
                        padding: 15px;
                        border-left: 5px solid #ccc;
                        word-wrap: break-word;
                        white-space: pre-wrap;
                        font-family: "Courier New", Courier, monospace;
                    }
                    code {
                        background: #f4f4f4;
                        padding: 2px 5px;
                        font-family: inherit;
                    }
                    table {
                        width: 100%;
                        border-collapse: collapse;
                        margin: 20px 0;
                    }
                    th, td {
                        border: 1px solid #ddd;
                        padding: 12px;
                        text-align: left;
                    }
                    th {
                        background-color: #f8f8f8;
                    }
                    blockquote {
                        border-left: 5px solid #eee;
                        padding-left: 20px;
                        color: #666;
                        font-style: italic;
                    }
                    hr { border: none; border-top: 1px solid #eee; margin: 40px 0; }
                    .author-info { margin-bottom: 30px; }
                </style>
            </head>
            <body>
                ${htmlContent}
            </body>
            </html>
        `;

        await page.setContent(fullHtml, { waitUntil: 'load', timeout: 60000 });
        await page.pdf({
            path: file.destPath,
            format: 'A4',
            margin: { top: '20mm', right: '20mm', bottom: '20mm', left: '20mm' },
            displayHeaderFooter: true,
            headerTemplate: '<span></span>',
            footerTemplate: '<div style="font-size: 10px; text-align: center; width: 100%;"><span class="pageNumber"></span> / <span class="totalPages"></span></div>'
        });
    }

    await browser.close();
    console.log('PDF generation complete.');
}

generatePDFs().catch(err => {
    console.error('Error generating PDFs:', err);
    process.exit(1);
});
