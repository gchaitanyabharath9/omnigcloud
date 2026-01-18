/**
 * copy-figures-to-arxiv.js
 * 
 * Copies all figures from public/assets/papers to submission/arxiv bundles
 */

const fs = require('fs');
const path = require('path');

const PUBLIC_DIR = path.join(process.cwd(), 'public', 'assets', 'papers');
const ARXIV_ROOT = path.join(process.cwd(), 'submission', 'arxiv');

const PAPER_DIRS = {
    'A1': 'a1',
    'A2': 'a2',
    'A3': 'a3',
    'A4': 'a4',
    'A5': 'a5',
    'A6': 'a6',
    'AECP': 'aecp',
    'ARCH': 'scholarly-article'
};

console.log('Copying figures to arXiv submission bundles...\n');

Object.entries(PAPER_DIRS).forEach(([paperId, publicDir]) => {
    const sourceFiguresDir = path.join(PUBLIC_DIR, publicDir, 'figures');
    const destFiguresDir = path.join(ARXIV_ROOT, paperId, 'figures');

    if (!fs.existsSync(sourceFiguresDir)) {
        console.log(`  ⚠ ${paperId}: No figures directory found at ${publicDir}/figures`);
        return;
    }

    // Ensure destination exists
    fs.mkdirSync(destFiguresDir, { recursive: true });

    // Copy all PNG files
    const files = fs.readdirSync(sourceFiguresDir).filter(f => f.endsWith('.png'));

    files.forEach(file => {
        const src = path.join(sourceFiguresDir, file);
        const dest = path.join(destFiguresDir, file);
        fs.copyFileSync(src, dest);
    });

    console.log(`  ✓ ${paperId}: Copied ${files.length} figures`);
});

console.log('\n✓ Figure copying complete!');
