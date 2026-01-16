/**
 * fix-unicode.js
 * 
 * Replaces Unicode characters with LaTeX equivalents in arXiv submissions
 */

const fs = require('fs');
const path = require('path');

const ARXIV_ROOT = path.join(process.cwd(), 'submission', 'arxiv');

// Unicode to LaTeX mapping
const unicodeReplacements = [
    { unicode: 'α', latex: '$\\alpha$' },
    { unicode: 'β', latex: '$\\beta$' },
    { unicode: 'γ', latex: '$\\gamma$' },
    { unicode: 'δ', latex: '$\\delta$' },
    { unicode: 'λ', latex: '$\\lambda$' },
    { unicode: 'μ', latex: '$\\mu$' },
    { unicode: 'σ', latex: '$\\sigma$' },
    { unicode: 'τ', latex: '$\\tau$' },
    { unicode: '→', latex: '$\\rightarrow$' },
    { unicode: '≤', latex: '$\\leq$' },
    { unicode: '≥', latex: '$\\geq$' },
    { unicode: '×', latex: '$\\times$' },
    { unicode: '÷', latex: '$\\div$' },
    { unicode: '≈', latex: '$\\approx$' },
    { unicode: '≠', latex: '$\\neq$' },
    { unicode: '∞', latex: '$\\infty$' },
    { unicode: '∑', latex: '$\\sum$' },
    { unicode: '∏', latex: '$\\prod$' },
    { unicode: '∫', latex: '$\\int$' },
    { unicode: '√', latex: '$\\sqrt{}$' },
    { unicode: '∂', latex: '$\\partial$' },
    { unicode: '∇', latex: '$\\nabla$' },
    { unicode: '∈', latex: '$\\in$' },
    { unicode: '∉', latex: '$\\notin$' },
    { unicode: '⊂', latex: '$\\subset$' },
    { unicode: '⊃', latex: '$\\supset$' },
    { unicode: '∪', latex: '$\\cup$' },
    { unicode: '∩', latex: '$\\cap$' },
    { unicode: '∀', latex: '$\\forall$' },
    { unicode: '∃', latex: '$\\exists$' },
    { unicode: '¬', latex: '$\\neg$' },
    { unicode: '∧', latex: '$\\wedge$' },
    { unicode: '∨', latex: '$\\vee$' },
    { unicode: '⇒', latex: '$\\Rightarrow$' },
    { unicode: '⇔', latex: '$\\Leftrightarrow$' },
];

function processPaper(paperId) {
    const dir = path.join(ARXIV_ROOT, paperId);
    const texFile = path.join(dir, 'main.tex');

    if (!fs.existsSync(texFile)) {
        console.log(`  Skipping ${paperId} - no main.tex`);
        return;
    }

    let content = fs.readFileSync(texFile, 'utf8');
    let replacements = 0;

    // Replace each Unicode character
    unicodeReplacements.forEach(({ unicode, latex }) => {
        const count = (content.match(new RegExp(unicode.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), 'g')) || []).length;
        if (count > 0) {
            content = content.split(unicode).join(latex);
            replacements += count;
        }
    });

    if (replacements > 0) {
        fs.writeFileSync(texFile, content);
        console.log(`  Fixed ${paperId} - replaced ${replacements} Unicode characters`);
    } else {
        console.log(`  ${paperId} - no Unicode characters found`);
    }
}

const papers = fs.readdirSync(ARXIV_ROOT).filter(f => fs.statSync(path.join(ARXIV_ROOT, f)).isDirectory());
console.log("Replacing Unicode characters with LaTeX equivalents...");
papers.forEach(processPaper);
console.log("Unicode replacement complete.");
