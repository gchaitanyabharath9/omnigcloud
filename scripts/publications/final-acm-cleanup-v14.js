/**
 * scripts/publications/final-acm-cleanup-v14.js
 */

const fs = require('fs');
const path = require('path');

const PAPERS = ['A1', 'A2', 'A3', 'A4', 'A5', 'A6', 'AECP', 'ARCH'];
const SUBMISSION_ROOT = path.join(process.cwd(), 'submission', 'acm');

function processPaper(paperId) {
    const acmPath = path.join(SUBMISSION_ROOT, paperId, 'main.tex');
    if (!fs.existsSync(acmPath)) return;
    let content = fs.readFileSync(acmPath, 'utf8');

    // Restore "mathematically safe"
    content = content.replace(/as\s+a\s+primary\s+method/g, 'as a primary mathematically safe method');

    // Fix any remaining "the first"
    content = content.replace(/\bthe\s+first\s+empirical\s+validation\b/gi, 'a quantitative validation');

    // Fix "The contribution isn't" remnants
    content = content.replace(/the\s+approach\s+itself:/g, 'The approach itself:');

    fs.writeFileSync(acmPath, content);
    console.log(`[FINAL] ${paperId}`);
}

PAPERS.forEach(processPaper);
