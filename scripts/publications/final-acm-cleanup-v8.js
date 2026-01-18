/**
 * scripts/publications/final-acm-cleanup-v8.js
 */

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

const PAPERS = ['A1', 'A2', 'A3', 'A4', 'A5', 'A6', 'AECP', 'ARCH'];
const SUBMISSION_ROOT = path.join(process.cwd(), 'submission', 'acm');

const AUTHOR_NAME = 'Chaitanya Bharath Gopu';
const AUTHOR_EMAIL = 'cb@example.com';
const AFFILIATION = 'Independent Researcher';

const NEUTRAL_ABSTRACT_STARTS = {
    'A1': 'This paper presents a formal reference architecture for cloud-native enterprise systems, focusing on the strict isolation of control and data planes to prevent cascading failures.',
    'A2': 'This paper formalizes the phenomenon of retrograde scaling in high-throughput distributed systems and introduces an asynchronous buffering architecture to maintain linear scalability.',
    'A3': 'This paper introduces a multi-layered observability framework that decouples telemetry collection from data processing to ensure operational intelligence at enterprise scale.',
    'A4': 'This paper presents a platform governance framework based on policy-as-code and WebAssembly-based local enforcement to maintain compliance across hybrid cloud environments.',
    'A5': 'This paper formalizes modernization patterns for transitioning legacy monolithic systems to cloud-native architectures without compromising availability or data integrity.',
    'A6': 'This paper presents an adaptive policy enforcement model that uses real-time feedback loops to dynamically adjust system governance based on observed threat patterns.',
    'AECP': 'This paper defines the Adaptive Enterprise Control Plane (AECP), a framework for sovereign cloud governance that treats policy as a first-class architectural primitive.',
    'ARCH': 'This paper analyzes the intrinsic tensions between sovereignty, scale, and complexity in enterprise architecture, proposing a unified framework for digital resilience.'
};

function cleanupTex(content, paperId) {
    let newContent = content;

    // --- Task 8: AUTHOR METADATA (FIXED) ---
    const titleRegex = /\\title\{(.*?)\}/;
    const titleMatch = newContent.match(titleRegex);
    if (titleMatch) {
        const titleLine = titleMatch[0];
        const authorBlock = `\\author{${AUTHOR_NAME}}\n\\email{${AUTHOR_EMAIL}}\n\\affiliation{\n  \\institution{${AFFILIATION}}\n  \\city{San Francisco}\n  \\country{USA}\n}\n`;
        // Replace from title to abstract start
        const blockRegex = /\\title\{.*?\}[\s\S]*?(?=\\begin\{abstract\})/g;
        newContent = newContent.replace(blockRegex, titleLine + "\n" + authorBlock + "\n");
    }

    // --- Task 6: ABSTRACT (DEDUPLICATED) ---
    newContent = newContent.replace(/\\begin\{abstract\}([\s\S]*?)\\end\{abstract\}/, (match, body) => {
        let b = body.trim();
        // Remove known neutral starts if repeated
        Object.values(NEUTRAL_ABSTRACT_STARTS).forEach(s => {
            while (b.includes(s)) {
                b = b.replace(s, '').trim();
            }
        });
        // Remove phrases
        b = b.replace(/The contribution isn't.*?\./gi, '');
        b = b.replace(/The choice is false.*?\./gi, '');
        b = b.replace(/The solution isn't.*?\./gi, '');
        b = b.replace(/^This (paper presents|work demonstrates|formalizes).*?\./i, '');

        return `\\begin{abstract}\n${NEUTRAL_ABSTRACT_STARTS[paperId]} ${b.trim()}\n\\end{abstract}`;
    });

    // --- Task 4 & 5: DEDUPLICATION & MERGE ---
    const noveltyPhrases = [
        "This paper formalizes the ``Dual-Write/Shadow-Read'' pattern",
        "This work provides a quantified demonstration",
        "This work establishes the foundational architecture",
        "Earlier work in this domain has shown",
        "Unlike previous work which focuses",
        "Relationship to A1-A6 series",
        "\\begin{itemize}\\tightlist\\item\\textbf{Legacy State:}"
    ];

    // Remove all existing instances of these phrases and their containing blocks
    noveltyPhrases.forEach(p => {
        const regex = new RegExp("\\\\label\\{.*?\\}?[\\s\\S]*?" + p.replace(/[.*+?^${}()|[\]\\]/g, '\\$&') + "[\\s\\S]*?(?=\\section|\\subsection|\\subsubsection|\\\\maketitle|\\label\\{|$)", "g");
        newContent = newContent.replace(regex, '');
    });

    // Global scrub
    newContent = newContent.replace(/\bonly mathematically safe\b/gi, 'primary');
    newContent = newContent.replace(/\bfirst empirical\b/gi, 'quantitative');
    newContent = newContent.replace(/\bgold standard\b/gi, 'reference');
    newContent = newContent.replace(/\bverified contribution\b/gi, 'analyzed result');
    newContent = newContent.replace(/builds on A1/gi, 'references prior architectural work');
    newContent = newContent.replace(/A1.A6 series/gi, 'prior work');

    // Restore Intro Header if missing
    if (!newContent.match(/\\(?:sub)*section\{Introduction\}/i)) {
        newContent = newContent.replace(/\\maketitle/, `\\maketitle\n\n\\section{Introduction}\\label{introduction}`);
    }

    // --- Task 7: MATH MODE ---
    newContent = newContent.replace(/\$\$+(p99|p50|O\(t\))\$\$+/g, '$$$1$$');
    newContent = newContent.replace(/([^\$])\b(p99|p50|O\(t\))\b([^\$])/g, (m, p1, p2, p3) => `${p1}$${p2}$${p3}`);

    // --- Task 1: FINAL FOOTER SWEEP ---
    newContent = newContent.replace(/Conference'17/g, '');
    newContent = newContent.replace(/Conference’XX/g, '');
    newContent = newContent.replace(/July 2017, Washington, DC, USA/g, '');

    newContent = newContent.replace(/\.\./g, '.');
    return newContent;
}

console.log('--- Final ACM Cleanup (Version 8.0) ---');
let changedCount = 0;
PAPERS.forEach(paperId => {
    const texFile = path.join(SUBMISSION_ROOT, paperId, 'main.tex');
    if (fs.existsSync(texFile)) {
        const content = fs.readFileSync(texFile, 'utf8');
        const finalized = cleanupTex(content, paperId);
        if (finalized !== content) {
            fs.writeFileSync(texFile, finalized);
            console.log(`[CLEANUP] ${paperId}`);
            changedCount++;
        } else {
            console.log(`[SKIP]    ${paperId}`);
        }
    }
});
console.log(`\nCleaned ${changedCount} ACM files.`);
