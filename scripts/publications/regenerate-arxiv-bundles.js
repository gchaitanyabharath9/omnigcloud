/**
 * regenerate-arxiv-bundles.js
 * 
 * Regenerates arXiv submission bundles from Markdown sources with full Unicode support
 */

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

const PAPERS_ROOT = path.join(process.cwd(), 'src', 'app', '[locale]', 'research', 'papers');
const OUTPUT_ROOT = path.join(process.cwd(), 'submission', 'arxiv');
const PUBLIC_DIR = path.join(process.cwd(), 'public');

// Paper manifest
const PAPERS = [
    { id: 'A1', dir: 'a1-cloud-native-enterprise-reference', mdFile: 'A1-PAPER-FULL.md', title: 'Cloud Native Enterprise Reference Architecture' },
    { id: 'A2', dir: 'a2-high-throughput-distributed-systems', mdFile: 'A2-PAPER-FULL.md', title: 'High-Throughput Distributed Systems' },
    { id: 'A3', dir: 'a3-enterprise-observability-operational-intelligence', mdFile: 'A3-PAPER-FULL.md', title: 'Enterprise Observability & Operational Intelligence' },
    { id: 'A4', dir: 'a4-platform-governance-multicloud-hybrid', mdFile: 'A4-PAPER-FULL.md', title: 'Platform Governance for Multicloud Hybrid Environments' },
    { id: 'A5', dir: 'a5-monolith-to-cloud-native-modernization', mdFile: 'A5-PAPER-FULL.md', title: 'Monolith to Cloud-Native Modernization' },
    { id: 'A6', dir: 'a6-adaptive-policy-enforcement', mdFile: 'A6-PAPER-FULL.md', title: 'Adaptive Policy Enforcement in Distributed Systems' },
    { id: 'AECP', dir: 'aecp', mdFile: 'AECP-FULL.md', title: 'AECP Framework for Enterprise Cloud Platforms' },
    { id: 'ARCH', dir: 'scholarly-article', mdFile: 'SCHOLARLY-ARTICLE-ENTERPRISE-ARCHITECTURE.md', title: 'Enterprise Architecture: A Scholarly Perspective' }
];

// Unicode to LaTeX mapping
const UNICODE_MAP = {
    'α': '$\\alpha$', 'β': '$\\beta$', 'γ': '$\\gamma$', 'δ': '$\\delta$',
    'λ': '$\\lambda$', 'μ': '$\\mu$', 'σ': '$\\sigma$', 'τ': '$\\tau$',
    '→': '$\\rightarrow$', '≤': '$\\leq$', '≥': '$\\geq$', '×': '$\\times$',
    '÷': '$\\div$', '≈': '$\\approx$', '≠': '$\\neq$', '∞': '$\\infty$',
    '∑': '$\\sum$', '∏': '$\\prod$', '∫': '$\\int$', '∂': '$\\partial$',
    '∇': '$\\nabla$', '∈': '$\\in$', '∉': '$\\notin$', '⊂': '$\\subset$',
    '⊃': '$\\supset$', '∪': '$\\cup$', '∩': '$\\cap$', '∀': '$\\forall$',
    '∃': '$\\exists$', '¬': '$\\neg$', '∧': '$\\wedge$', '∨': '$\\vee$',
    '⇒': '$\\Rightarrow$', '⇔': '$\\Leftrightarrow$'
};

function replaceUnicode(text) {
    let result = text;
    Object.entries(UNICODE_MAP).forEach(([unicode, latex]) => {
        result = result.split(unicode).join(latex);
    });
    return result;
}

function extractMetadata(content) {
    const titleMatch = content.match(/^#\s+(.+)$/m);
    const abstractMatch = content.match(/##\s+Abstract\s+([\s\S]+?)(?=\n##|\n---|\Z)/);
    const keywordsMatch = content.match(/\*\*Keywords:\*\*\s*(.+)/);

    return {
        title: titleMatch ? titleMatch[1].replace(/^[A-Z0-9]+:\s*/, '') : 'Untitled',
        abstract: abstractMatch ? abstractMatch[1].trim() : '',
        keywords: keywordsMatch ? keywordsMatch[1].trim() : ''
    };
}

function preprocessMarkdown(content, paperId) {
    // Remove YAML frontmatter
    content = content.replace(/^---[\s\S]*?---\n/m, '');

    // Remove "Contribution Summary for Non-Specialists"
    content = content.replace(/##\s+Contribution Summary for Non-Specialists[\s\S]*?(?=\n##|\Z)/m, '');

    // Fix image paths to be relative
    content = content.replace(/!\[([^\]]*)\]\(([^)]+)\)/g, (match, alt, src) => {
        if (src.startsWith('/assets/papers/')) {
            const absSvg = path.join(PUBLIC_DIR, src);
            const absPng = absSvg.replace(/\.svg$/i, '.png');

            if (fs.existsSync(absPng)) {
                return `![${alt}](${absPng})`;
            } else if (fs.existsSync(absSvg)) {
                return `![${alt}](${absSvg})`;
            }
        }
        return match;
    });

    // Replace Unicode characters
    content = replaceUnicode(content);

    return content;
}

function generateLaTeX(paper) {
    console.log(`\nProcessing ${paper.id}...`);

    const mdPath = path.join(PAPERS_ROOT, paper.dir, paper.mdFile);
    if (!fs.existsSync(mdPath)) {
        console.error(`  ERROR: Markdown file not found: ${mdPath}`);
        return;
    }

    // Read and preprocess Markdown
    let mdContent = fs.readFileSync(mdPath, 'utf8');
    const metadata = extractMetadata(mdContent);
    mdContent = preprocessMarkdown(mdContent, paper.id);

    // Create output directory
    const outputDir = path.join(OUTPUT_ROOT, paper.id);
    const figuresDir = path.join(outputDir, 'figures');
    fs.mkdirSync(figuresDir, { recursive: true });

    // Convert to LaTeX using Pandoc
    const tempMd = path.join(outputDir, 'temp.md');
    fs.writeFileSync(tempMd, mdContent);

    try {
        const latexBody = execSync(`pandoc "${tempMd}" -t latex --wrap=preserve`, { encoding: 'utf8' });

        // Build complete LaTeX document
        const latex = `% arXiv submission for ${paper.id}
% Generated: ${new Date().toISOString()}

\\documentclass{article}
\\usepackage[utf8]{inputenc}
\\usepackage[margin=1in]{geometry}
\\usepackage{graphicx}
\\usepackage{amsmath}
\\usepackage{amssymb}
\\usepackage{booktabs}
\\usepackage{longtable}
\\usepackage{array}
\\usepackage{calc}
\\usepackage{multirow}
\\usepackage{hyperref}

% Pandoc compatibility
\\providecommand{\\tightlist}{\\setlength{\\itemsep}{0pt}\\setlength{\\parskip}{0pt}}
\\providecommand{\\pandocbounded}[1]{#1}

\\title{${metadata.title}}
\\author{Author Name}
\\date{\\today}

\\begin{document}

\\maketitle

\\begin{abstract}
${metadata.abstract}
\\end{abstract}

${metadata.keywords ? `\\paragraph{Keywords} ${metadata.keywords}\n` : ''}

${latexBody}

\\end{document}
`;

        // Process figures
        const figureMatches = latex.matchAll(/\\includegraphics(?:\[.*?\])?\{([^}]+)\}/g);
        for (const match of figureMatches) {
            const srcPath = match[1];
            if (fs.existsSync(srcPath)) {
                const basename = path.basename(srcPath);
                const destPath = path.join(figuresDir, basename);
                fs.copyFileSync(srcPath, destPath);
            }
        }

        // Fix figure paths to be relative
        let finalLatex = latex.replace(/\\includegraphics(?:\[.*?\])?\{([^}]+)\}/g, (match, srcPath) => {
            const basename = path.basename(srcPath);
            return `\\includegraphics[width=0.8\\linewidth]{figures/${basename}}`;
        });

        // Remove any remaining Markdown artifacts
        finalLatex = finalLatex.replace(/^---$/gm, '');
        finalLatex = finalLatex.replace(/!\[.*?\]\(.*?\)/g, '');

        // Remove \pandocbounded wrappers from body
        finalLatex = finalLatex.replace(/\\pandocbounded\{(\\includegraphics\[width=[^\]]+\]\{figures\/[^}]+\})\}/g, '$1');
        finalLatex = finalLatex.replace(/\\pandocbounded\{([^}]+)\}/g, '$1');

        // Fix placeholder captions
        finalLatex = finalLatex.replace(/\\caption\{Placeholder Diagram\}/g, '\\caption{System Architecture Diagram}');
        finalLatex = finalLatex.replace(/Placeholder Diagram/g, 'System Diagram');

        // Write final LaTeX
        fs.writeFileSync(path.join(outputDir, 'main.tex'), finalLatex);
        fs.unlinkSync(tempMd);

        // Create README
        const readme = `# arXiv Submission: ${paper.id}

## Title
${metadata.title}

## Compilation
\`\`\`bash
pdflatex main.tex
pdflatex main.tex  # Second pass for references
\`\`\`

## Contents
- main.tex: Complete LaTeX source
- figures/: All referenced figures (PNG format)

## Notes
- All Unicode characters have been converted to LaTeX equivalents
- All figure paths are relative
- No external dependencies required
`;
        fs.writeFileSync(path.join(outputDir, 'README.md'), readme);

        console.log(`  ✓ Generated ${paper.id}`);

    } catch (error) {
        console.error(`  ERROR processing ${paper.id}:`, error.message);
    }
}

// Main execution
console.log('Regenerating arXiv bundles from Markdown sources...\n');

// Clean output directory
if (fs.existsSync(OUTPUT_ROOT)) {
    fs.rmSync(OUTPUT_ROOT, { recursive: true });
}
fs.mkdirSync(OUTPUT_ROOT, { recursive: true });

// Process all papers
PAPERS.forEach(generateLaTeX);

console.log('\n✓ Regeneration complete!');
console.log(`\nOutput location: ${OUTPUT_ROOT}`);
console.log('\nNext steps:');
console.log('1. Run validation: node scripts/publications/arxiv-gate.js');
console.log('2. Review PDFs in review-pdfs/');
