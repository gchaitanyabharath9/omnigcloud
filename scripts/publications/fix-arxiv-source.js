/**
 * fix-arxiv-source.js v5
 * 
 * applies structural fixes to arXiv tex sources.
 * - Injects \pandocbounded AND \tightlist shim
 * - Removes markdown artifacts
 * - Regex fixes
 */

const fs = require('fs');
const path = require('path');

const ARXIV_ROOT = path.join(process.cwd(), 'submission', 'arxiv');

function processPaper(paperId) {
    const dir = path.join(ARXIV_ROOT, paperId);
    const texFile = path.join(dir, 'main.tex');

    if (!fs.existsSync(texFile)) return;

    let content = fs.readFileSync(texFile, 'utf8');

    // 0. Safety Shims
    // - \pandocbounded
    // - \tightlist (Pandoc list formatting)
    // - Unicode character support

    if (!content.includes('\\providecommand{\\pandocbounded}')) {
        const shimsLines = [
            '\\usepackage[utf8]{inputenc}',
            '\\DeclareUnicodeCharacter{03B1}{$\\alpha$}',
            '\\DeclareUnicodeCharacter{03B2}{$\\beta$}',
            '\\DeclareUnicodeCharacter{03B3}{$\\gamma$}',
            '\\DeclareUnicodeCharacter{03B4}{$\\delta$}',
            '\\DeclareUnicodeCharacter{03BB}{$\\lambda$}',
            '\\DeclareUnicodeCharacter{03BC}{$\\mu$}',
            '\\DeclareUnicodeCharacter{03C3}{$\\sigma$}',
            '\\DeclareUnicodeCharacter{03C4}{$\\tau$}',
            '\\DeclareUnicodeCharacter{2192}{$\\rightarrow$}',
            '\\DeclareUnicodeCharacter{2264}{$\\leq$}',
            '\\DeclareUnicodeCharacter{2265}{$\\geq$}',
            '\\providecommand{\\pandocbounded}[1]{#1}',
            '\\providecommand{\\tightlist}{\\setlength{\\itemsep}{0pt}\\setlength{\\parskip}{0pt}}'
        ];

        content = content.replace(/\\documentclass(\[.*?\])?\{.*?\}/, (match) => {
            return match + '\n' + shimsLines.join('\n');
        });
    }

    // 1. Markdown Artifacts
    content = content.replace(/^---$/gm, '');
    content = content.replace(/^\*\*Keywords:\*\*.*$/gm, '% Artifact removed');
    content = content.replace(/!\[(.*?)\]\(.*?\)/g, '$1');

    // 2. Fix Pandocbounded (Try to remove purely)
    content = content.replace(/\\pandocbounded\s*\{\s*\\includegraphics(?:\[.*?\])?\s*\{(figures\/.*?)\}\s*\}/gs, (match, figPath) => {
        return `\\includegraphics[width=\\linewidth]{${figPath}}`;
    });

    content = content.replace(/\\pandocbounded\s*\{\s*\\includegraphics\[.*?alt=\{(figures\/.*?)\}.*?\]\s*\}/gs, (match, figPath) => {
        return `\\includegraphics[width=\\linewidth]{${figPath}}`;
    });

    // 3. Fix Options
    content = content.replace(/\\includegraphics\[(.*?)\]\{(.*?)\}/g, (match, args, path) => {
        if (args.includes('width=\\linewidth')) return match;
        return `\\includegraphics[width=\\linewidth]{${path}}`;
    });

    // 4. A5 Fixes
    if (paperId === 'A5') {
        const figsDir = path.join(dir, 'figures');
        const fig1 = path.join(figsDir, 'fig-1.png');
        const fig2 = path.join(figsDir, 'fig-2.png');
        if (!fs.existsSync(fig1) && fs.existsSync(fig2)) {
            try { fs.renameSync(fig2, fig1); } catch (e) { }
            content = content.replace(/figures\/fig-2\.png/g, 'figures/fig-1.png');
        }
    }

    // 5. Package Cleanup
    if (content.includes('\\usepackage{hyperref}')) {
        content = content.replace(/\\usepackage(\[.*?\])?\{hyperref\}\n?/g, '');
        const docStart = content.indexOf('\\begin{document}');
        if (docStart > -1) {
            content = content.slice(0, docStart) + '\\usepackage{hyperref}\n' + content.slice(docStart);
        }
    }

    fs.writeFileSync(texFile, content);
    console.log(`  Fixed ${paperId}`);
}

const papers = fs.readdirSync(ARXIV_ROOT).filter(f => fs.statSync(path.join(ARXIV_ROOT, f)).isDirectory());
console.log("Applying structural fixes v5...");
papers.forEach(processPaper);
console.log("Fixes v5 applied.");
