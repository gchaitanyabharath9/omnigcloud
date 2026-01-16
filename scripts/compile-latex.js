const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

const WORKSPACE = 'c:/Users/SOHAN/.gemini/antigravity/playground/nascent-zodiac';
const PAPERS_DIR = path.join(WORKSPACE, 'papers');
const OUTPUT_DIR = path.join(WORKSPACE, 'latex-outputs');

const papers = ['A1', 'A2', 'A3', 'A4', 'A5', 'A6', 'AECP', 'SCHOLARLY'];
const venues = ['ieee', 'acm', 'arxiv'];

if (!fs.existsSync(OUTPUT_DIR)) {
    fs.mkdirSync(OUTPUT_DIR, { recursive: true });
}

papers.forEach(id => {
    const paperOutDir = path.join(OUTPUT_DIR, id);
    if (!fs.existsSync(paperOutDir)) fs.mkdirSync(paperOutDir);

    venues.forEach(venue => {
        const buildDir = path.join(PAPERS_DIR, id, 'build', venue);
        if (!fs.existsSync(buildDir)) {
            console.log(`Skipping ${id}-${venue}: build directory not found`);
            return;
        }

        console.log(`\n--- Compiling ${id} for ${venue} ---`);

        try {
            // First pass
            console.log(`  Pass 1 (pdflatex)...`);
            execSync('pdflatex -interaction=nonstopmode main.tex', { cwd: buildDir, stdio: 'inherit' });

            // BibTeX
            console.log(`  BibTeX...`);
            try {
                execSync('bibtex main', { cwd: buildDir, stdio: 'inherit' });
            } catch (e) {
                console.warn(`  BibTeX Warning (expected if no citations): ${e.message}`);
            }

            // Second pass
            console.log(`  Pass 2 (pdflatex)...`);
            execSync('pdflatex -interaction=nonstopmode main.tex', { cwd: buildDir, stdio: 'inherit' });

            // Third pass
            console.log(`  Pass 3 (pdflatex)...`);
            execSync('pdflatex -interaction=nonstopmode main.tex', { cwd: buildDir, stdio: 'inherit' });

            // Copy to output
            const pdfPath = path.join(buildDir, 'main.pdf');
            if (fs.existsSync(pdfPath)) {
                const finalPdfName = `${id}-${venue.toUpperCase()}.pdf`;
                fs.copyFileSync(pdfPath, path.join(paperOutDir, finalPdfName));
                console.log(`  SUCCESS: Generated ${finalPdfName}`);
            } else {
                console.error(`  ERROR: main.pdf not found for ${id}-${venue}`);
            }

        } catch (err) {
            console.error(`  FAILED to compile ${id}-${venue}:`, err.message);
        }
    });
});

console.log('\nLatex Compilation Process Finished.');
