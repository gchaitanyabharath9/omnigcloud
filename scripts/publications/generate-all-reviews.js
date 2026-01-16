/**
 * generate-all-reviews.js
 * 
 * Compiles arXiv, IEEE, and ACM submission bundles from 'submission/' 
 * and collects the PDFs in 'review-pdfs/'.
 */

const fs = require('fs');
const path = require('path');
const { exec } = require('child_process');
const { promisify } = require('util');

const execAsync = promisify(exec);

const SUBMISSION_ROOT = path.join(process.cwd(), 'submission');
const REVIEW_DIR = path.join(process.cwd(), 'review-pdfs');
const VARIANTS = ['arxiv', 'ieee', 'acm'];

async function run() {
    console.log("Generating All Review PDFs...");

    if (!fs.existsSync(REVIEW_DIR)) fs.mkdirSync(REVIEW_DIR, { recursive: true });

    // We do NOT clear REVIEW_DIR as requested ("Keep these recently generated pdfs")
    // But this script regenerates them. If run, it overwrites.

    for (const variant of VARIANTS) {
        const variantDir = path.join(SUBMISSION_ROOT, variant);
        if (!fs.existsSync(variantDir)) continue;

        const bundles = fs.readdirSync(variantDir).filter(d => fs.statSync(path.join(variantDir, d)).isDirectory());

        console.log(`\n--- Processing ${variant.toUpperCase()} ---`);

        for (const paperId of bundles) {
            process.stdout.write(`Compiling ${paperId}... `);
            const dir = path.join(variantDir, paperId);
            const srcPdf = path.join(dir, 'main.pdf');

            // Suffix: -arXiv, -IEEE, -ACM
            let suffix = '-' + variant.toUpperCase();
            if (variant === 'arxiv') suffix = '-arXiv'; // Match naming convention

            const destPdf = path.join(REVIEW_DIR, `${paperId}${suffix}.pdf`);

            try {
                await execAsync(`pdflatex -interaction=nonstopmode main.tex`, { cwd: dir });
            } catch (e) { /* Ignore warnings */ }

            if (fs.existsSync(srcPdf)) {
                fs.copyFileSync(srcPdf, destPdf);
                fs.unlinkSync(srcPdf);

                ['.log', '.aux', '.out'].forEach(ext => {
                    if (fs.existsSync(path.join(dir, `main${ext}`))) fs.unlinkSync(path.join(dir, `main${ext}`));
                });
                console.log('DONE');
            } else {
                console.log('FAIL (No PDF generated)');
            }
        }
    }

    console.log(`\nAll PDFs collected in: ${REVIEW_DIR}`);
}

run();
