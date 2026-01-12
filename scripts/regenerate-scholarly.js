const puppeteer = require('puppeteer');
const fs = require('fs');
const path = require('path');

// Load the main script
const mainScript = fs.readFileSync('scripts/generate-pdfs-puppeteer.js', 'utf8');

// Extract the functions
eval(mainScript.replace(/const papers = \[[\s\S]*?\];/, 'const papers = [];').replace('main().catch(console.error);', ''));

// Run only for Scholarly Article
(async () => {
    console.log('🚀 Regenerating Scholarly Article with colorful styling...\n');

    const browser = await puppeteer.launch({
        headless: true,
        args: ['--no-sandbox', '--disable-setuid-sandbox']
    });

    try {
        await convertMarkdownToPDF(
            'src/app/[locale]/research/SCHOLARLY-ARTICLE-ENTERPRISE-ARCHITECTURE.md',
            'publication-pdfs/Scholarly-Article-Enterprise-Architecture.pdf',
            'Scholarly Article',
            browser
        );
    } finally {
        await browser.close();
    }

    console.log('\n✅ Scholarly Article regeneration complete!');

    // Show file size
    const stats = fs.statSync('publication-pdfs/Scholarly-Article-Enterprise-Architecture.pdf');
    const sizeMB = (stats.size / (1024 * 1024)).toFixed(2);
    console.log(`📄 File size: ${sizeMB} MB`);
})().catch(console.error);
