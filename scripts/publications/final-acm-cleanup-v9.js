/**
 * scripts/publications/final-acm-cleanup-v9.js
 */

const fs = require('fs');
const path = require('path');

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

    // --- Task 8: AUTHOR METADATA ---
    const titleRegex = /\\title\{(.*?)\}/;
    const titleMatch = newContent.match(titleRegex);
    if (titleMatch) {
        const titleLine = titleMatch[0];
        const authorBlock = `\\author{${AUTHOR_NAME}}\n\\email{${AUTHOR_EMAIL}}\n\\affiliation{\n  \\institution{${AFFILIATION}}\n  \\city{San Francisco}\n  \\country{USA}\n}\n`;
        const abstractStart = newContent.indexOf('\\begin{abstract}');
        if (abstractStart !== -1) {
            const beforeAbstract = newContent.substring(0, abstractStart);
            const afterAbstract = newContent.substring(abstractStart);
            const newBefore = beforeAbstract.replace(/\\title\{.*?\}[\s\S]*/, titleLine + "\n" + authorBlock + "\n");
            newContent = newBefore + afterAbstract;
        }
    }

    // --- Task 6: ABSTRACT ---
    newContent = newContent.replace(/\\begin\{abstract\}([\s\S]*?)\\end\{abstract\}/, (match, body) => {
        let b = body.trim();
        Object.values(NEUTRAL_ABSTRACT_STARTS).forEach(s => {
            b = b.replace(new RegExp(s.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), 'g'), '');
        });
        b = b.replace(/The contribution isn't.*?\./gi, '');
        b = b.replace(/The choice is false.*?\./gi, '');
        b = b.replace(/The solution isn't.*?\./gi, '');
        b = b.replace(/^This (paper presents|work demonstrates|formalizes).*?\./i, '');
        return `\\begin{abstract}\n${NEUTRAL_ABSTRACT_STARTS[paperId]} ${b.trim()}\n\\end{abstract}`;
    });

    // --- Task 2: CCS ---
    newContent = newContent.replace(/\\begin\{CCSXML\}[\s\S]*?\\end\{CCSXML\}/g, '');
    newContent = newContent.replace(/\\ccsdesc(\[.*?\])?\{.*?\}/g, '');
    const ccsBlock = `\\begin{CCSXML}\n<ccs2012>\n <concept>\n  <concept_id>10003033.10003058</concept_id>\n  <concept_desc>Computer systems organization~Distributed architectures</concept_desc>\n  <concept_significance>500</concept_significance>\n </concept>\n</ccs2012>\n\\end{CCSXML}\n\n\\ccsdesc[500]{Computer systems organization~Distributed architectures}`;
    newContent = newContent.replace(/\\end\{abstract\}/, `\\end{abstract}\n\n${ccsBlock}`);

    // --- Task 3: KEYWORDS ---
    const kwMatch = newContent.match(/\\keywords\{([\s\S]*?)\}/);
    let kws = kwMatch ? kwMatch[1].trim() : '';
    newContent = newContent.replace(/\\keywords\{[\s\S]*?\}/g, '');
    newContent = newContent.replace(/\\maketitle/, `\\keywords{${kws}}\n\\maketitle`);

    // --- Task 4 & 5: NOVELTY & SERIES & DEDUPLICATION ---
    // Remove headers
    newContent = newContent.replace(/\\(?:sub)*section\{[\s\S]*?(?:Contribution|Innovation|Relationship to A1-A6|Relationship to series)[\s\S]*?\}(?:\\label\{.*?\})?/gi, '');

    // Fix Introduction Header
    newContent = newContent.replace(/\\section\{Introduction\}label\{introduction\}/g, '\\section{Introduction}\\label{introduction}');
    newContent = newContent.replace(/\\section\{Introduction\}label\{relationship-to-a1-a6-series\}/g, '\\section{Introduction}\\label{introduction}');

    // Deduplicate paragraphs
    const paragraphs = newContent.split('\n\n');
    const seen = new Set();
    const uniqueParagraphs = [];
    paragraphs.forEach(p => {
        const normalized = p.trim().replace(/\s+/g, ' ');
        // Keep paragraphs that are not seen, or are short (like headers or lists)
        if (normalized.length < 50 || !seen.has(normalized)) {
            uniqueParagraphs.push(p);
            if (normalized.length >= 50) seen.add(normalized);
        }
    });
    newContent = uniqueParagraphs.join('\n\n');

    // Global scrub
    newContent = newContent.replace(/\bonly mathematically safe\b/gi, 'primary');
    newContent = newContent.replace(/\bfirst empirical\b/gi, 'quantitative');
    newContent = newContent.replace(/\bgold standard\b/gi, 'reference');
    newContent = newContent.replace(/builds on A1/gi, 'references prior architectural work');
    newContent = newContent.replace(/A1.A6 series/gi, 'prior work');

    // --- Task 7: MATH ---
    newContent = newContent.replace(/\$\$+(p99|p50|O\(t\))\$\$+/g, '$$$1$$');
    newContent = newContent.replace(/([^\$])\b(p99|p50|O\(t\))\b([^\$])/g, (m, p1, p2, p3) => `${p1}$${p2}$${p3}`);

    // --- Task 1: FOOTERS ---
    newContent = newContent.replace(/Conference'17/g, '');
    newContent = newContent.replace(/Conference’XX/g, '');
    newContent = newContent.replace(/July 2017, Washington, DC, USA/g, '');

    newContent = newContent.replace(/\.\./g, '.');
    return newContent;
}

console.log('--- Final ACM Cleanup (Version 9.0) ---');
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
