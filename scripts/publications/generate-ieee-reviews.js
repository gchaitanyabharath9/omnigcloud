/**
 * scripts/publications/generate-ieee-reviews.js
 * Generates Review PDFs for IEEE only.
 */
const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

const FORMAT = 'ieee';
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

    const runPdfLatex = () => {
        try {
            execSync('pdflatex -interaction=nonstopmode main.tex', {
                cwd: bundleDir,
                stdio: 'ignore',
                timeout: 120000 // 2 minutes
            });
        } catch (e) {
            // pdflatex returns non-zero for warnings
        }
    };

    runPdfLatex();
    runPdfLatex();

    if (fs.existsSync(pdfFile)) {
        const destName = `${paperId}-IEEE.pdf`;
        fs.copyFileSync(pdfFile, path.join(OUTPUT_DIR, destName));
        console.log(`✓ ${destName}`);

        // Cleanup aux files
        ['.log', '.aux', '.out', '.toc', '.nav', '.snm', '.vrb', '.fls', '.fdb_latexmk'].forEach(ext => {
            const auxFile = path.join(bundleDir, `main${ext}`);
            if (fs.existsSync(auxFile)) fs.unlinkSync(auxFile);
        });
        return true;
    } else {
        console.log(`✗ FAIL`);
        return false;
    }
}

console.log('--- Generating IEEE Review PDFs ---');
PAPERS.forEach(compilePaper);
console.log('\nDone. IEEE PDFs located in review-pdfs/');
