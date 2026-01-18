/**
 * prepare-acm.js
 * 
 * Prepares standalone ACM submission bundles.
 * - Source: papers/acm/<ID>-acm.tex
 * - Output: submission/acm/<ID>/
 * - Features: Relativized paths, Self-contained context, Tone polish
 */

const fs = require('fs');
const path = require('path');

// Configuration
const MANIFEST_PATH = path.join(process.cwd(), 'submission', 'papers_manifest.json');
const SOURCE_ROOT = path.join(process.cwd(), 'papers', 'acm');
const OUTPUT_ROOT = path.join(process.cwd(), 'submission', 'acm');

const SELF_CONTAINED_NOTE = `
\\par
\\emph{Note: This paper is a self-contained contribution to the Enterprise Cloud Architecture research program. While it aligns with the broader framework, all necessary system models and assumptions are defined herein. Cross-references to other works in this series are provided for context but are not required to interpret the findings.}
`;

const TONE_CHECKS = [
    { r: /definitively solves/gi, s: 'we demonstrate' },
    { r: /eliminates/gi, s: 'reduces' },
    { r: /gold standard/gi, s: '' },
    { r: /proprietar(y|ied)/gi, s: 'internal' },
    // Fix Absolute Paths 
    { r: /[C-c]:\/Users\/[^\s"\}\]]+/g, s: '' },
    { r: /\/Users\/[^\s"\}\]]+/g, s: '' },
    { r: /alt=\{\}/g, s: '' }
];

if (!fs.existsSync(MANIFEST_PATH)) {
    console.error("Manifest missing.");
    process.exit(1);
}

const manifestRaw = fs.readFileSync(MANIFEST_PATH, 'utf8').replace(/^\uFEFF/, '');
const manifest = JSON.parse(manifestRaw);

if (!fs.existsSync(OUTPUT_ROOT)) fs.mkdirSync(OUTPUT_ROOT, { recursive: true });

console.log(`Processing ${manifest.length} papers for ACM submission...`);

manifest.forEach(paper => {
    console.log(`[${paper.id}] Bundling ACM...`);

    // 1. Setup Dir
    const bundleDir = path.join(OUTPUT_ROOT, paper.id);
    const figuresDir = path.join(bundleDir, 'figures');
    fs.mkdirSync(figuresDir, { recursive: true });

    // 2. Read Source TeX (ACM Variant)
    const sourceFilename = `${paper.id}-acm.tex`;
    const sourcePath = path.join(SOURCE_ROOT, sourceFilename);

    if (!fs.existsSync(sourcePath)) {
        console.error(`  ERROR: Source missing ${sourcePath}`);
        return;
    }

    let content = fs.readFileSync(sourcePath, 'utf8');

    // 3. Fix Figures (Absolute -> Relative & Copy)
    content = content.replace(/\\includegraphics(?:\[.*?\])?\{(.*?)\}/g, (match, srcPath) => {
        let absPath = srcPath;
        if (!path.isAbsolute(srcPath)) {
            absPath = path.resolve(process.cwd(), srcPath);
        }

        if (!fs.existsSync(absPath)) {
            if (absPath.endsWith('.svg')) {
                const png = absPath.replace(/\.svg$/, '.png');
                if (fs.existsSync(png)) absPath = png;
            }
        }

        if (fs.existsSync(absPath)) {
            const basename = path.basename(absPath);
            const targetPath = path.join(figuresDir, basename);

            try {
                fs.copyFileSync(absPath, targetPath);
            } catch (e) {
                console.error(`  Error copying ${basename}: ${e.message}`);
            }

            const prefix = match.substring(0, match.indexOf('{') + 1);
            return `${prefix}figures/${basename}}`;
        } else {
            console.error(`  WARNING: Missing figure ${srcPath}`);
            return match;
        }
    });

    // 4. Inject Self-Contained Note
    if (content.match(/\\section\{Introduction\}/)) {
        content = content.replace(/\\section\{Introduction\}/, `\\section{Introduction}\n${SELF_CONTAINED_NOTE}`);
    } else {
        const firstSection = content.search(/\\section\{/);
        if (firstSection > -1) {
            content = content.slice(0, firstSection) + `${SELF_CONTAINED_NOTE}\n` + content.slice(firstSection);
        }
    }

    // 5. Tone Normalization
    TONE_CHECKS.forEach(check => {
        content = content.replace(check.r, check.s);
    });

    // 6. Comments & Metadata
    const header = `% ACM SigConf submission source for ${paper.id}
% Generated/Normalized at ${new Date().toISOString()}
% 
`;
    content = header + content;

    // 7. Write main.tex
    fs.writeFileSync(path.join(bundleDir, 'main.tex'), content);

    // 8. README
    const readme = `# ACM Submission: ${paper.id}

## Metadata
- **Title**: ${paper.title}
- **Format**: ACM SigConf (Double Column)
- **Compilation**: \`pdflatex main.tex\`

## Contents
- \`main.tex\`: Source code (normalized)
- \`figures/\`: All assets (local paths)
`;
    fs.writeFileSync(path.join(bundleDir, 'README.md'), readme);
});

console.log("ACM Bundling complete.");
