/**
 * scripts/publications/generate-ieee-acm-reviews.js
 * Generates Review PDFs for IEEE and ACM only.
 */
const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

const FORMATS = ['ieee', 'acm'];
const PAPERS = ['A1', 'A2', 'A3', 'A4', 'A5', 'A6', 'AECP', 'ARCH'];
const SUBMISSION_ROOT = path.join(process.cwd(), 'submission');
const OUTPUT_DIR = path.join(process.cwd(), 'review-pdfs');

if (!fs.existsSync(OUTPUT_DIR)) {
    fs.mkdirSync(OUTPUT_DIR, { recursive: true });
}

function compilePaper(format, paperId) {
    const bundleDir = path.join(SUBMISSION_ROOT, format, paperId);
    if (!fs.existsSync(bundleDir)) return;

    process.stdout.write(`Compiling ${paperId} (${format})... `);
    const pdfFile = path.join(bundleDir, 'main.pdf');
    if (fs.existsSync(pdfFile)) fs.unlinkSync(pdfFile);

    try {
        // Run twice for refs. Ignore exit code as pdflatex is noisy.
        try { execSync('pdflatex -interaction=nonstopmode main.tex', { cwd: bundleDir, stdio: 'ignore' }); } catch (e) { }
        try { execSync('pdflatex -interaction=nonstopmode main.tex', { cwd: bundleDir, stdio: 'ignore' }); } catch (e) { }

        if (fs.existsSync(pdfFile)) {
            const destName = `${paperId}-${format.toUpperCase()}.pdf`;
            fs.copyFileSync(pdfFile, path.join(OUTPUT_DIR, destName));
            console.log(`✓ ${destName}`);
            return true;
        } else {
            console.log(`✗ fail (no PDF)`);
            return false;
        }
    } catch (error) {
        console.log(`✗ error`);
        return false;
    }
}

console.log('--- Generating IEEE and ACM Review PDFs ---');
FORMATS.forEach(format => {
    PAPERS.forEach(paperId => {
        compilePaper(format, paperId);
    });
});
console.log('\nDone. PDFs located in review-pdfs/');
