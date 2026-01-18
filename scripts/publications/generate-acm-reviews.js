/**
 * scripts/publications/generate-acm-reviews.js
 * Generates Review PDFs for ACM only.
 */
const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

const FORMAT = 'acm';
const PAPERS = ['A1', 'A2', 'A3', 'A4', 'A5', 'A6', 'AECP', 'ARCH'];
const SUBMISSION_ROOT = path.join(process.cwd(), 'submission');
const OUTPUT_DIR = path.join(process.cwd(), 'review-pdfs');

if (!fs.existsSync(OUTPUT_DIR)) {
    fs.mkdirSync(OUTPUT_DIR, { recursive: true });
}

function compilePaper(paperId) {
    const bundleDir = path.join(SUBMISSION_ROOT, FORMAT, paperId);
    if (!fs.existsSync(bundleDir)) {
        console.log(`[SKIP] ${paperId} (Directory not found)`);
        return;
    }

    process.stdout.write(`Compiling ${paperId} (${FORMAT})... `);
    const pdfFile = path.join(bundleDir, 'main.pdf');
    if (fs.existsSync(pdfFile)) fs.unlinkSync(pdfFile);

    // Run pdflatex. We ignore the exit code because pdflatex often exits with 1 
    // even if it successfully generates a PDF (due to minor warnings/errors).
    const runPdfLatex = () => {
        try {
            execSync('pdflatex -interaction=nonstopmode main.tex', {
                cwd: bundleDir,
                stdio: 'ignore',
                timeout: 60000 // 1 minute timeout per run
            });
        } catch (e) {
            // Ignore exit code errors
        }
    };

    runPdfLatex();
    runPdfLatex();

    if (fs.existsSync(pdfFile)) {
        const destName = `${paperId}-ACM.pdf`;
        fs.copyFileSync(pdfFile, path.join(OUTPUT_DIR, destName));
        console.log(`✓ ${destName}`);

        // Cleanup auxiliary files
        ['.log', '.aux', '.out', '.toc', '.nav', '.snm', '.vrb', '.fls', '.fdb_latexmk'].forEach(ext => {
            const auxFile = path.join(bundleDir, `main${ext}`);
            if (fs.existsSync(auxFile)) fs.unlinkSync(auxFile);
        });
        return true;
    } else {
        console.log(`✗ FAIL (No PDF generated)`);
        // If it failed, let's keep the log for debugging
        return false;
    }
}

console.log('--- Generating ACM Review PDFs ---');
PAPERS.forEach(paperId => {
    compilePaper(paperId);
});
console.log('\nDone. ACM PDFs located in review-pdfs/');
