/**
 * scripts/publications/final-acm-cleanup-v10.js
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

    // --- Task 8: AUTHOR BLOCK (FINAL FIX) ---
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

    // --- INTRODUCTION HEADER RESTORATION ---
    if (!newContent.match(/\\(?:sub)*section\{Introduction\}/i)) {
        newContent = newContent.replace(/\\maketitle/, `\\maketitle\n\n\\section{Introduction}\\label{introduction}`);
    } else {
        // Fix labels if attached weirdly
        newContent = newContent.replace(/\\section\{Introduction\}label\{introduction\}/g, '\\section{Introduction}\\label{introduction}');
    }

    // --- DEDUPLICATION (SURGICAL) ---
    const seenParagraphs = new Set();
    const blocks = newContent.split('\n\n');
    const filteredBlocks = [];
    for (const block of blocks) {
        const norm = block.trim().replace(/\s+/g, ' ');
        // If it's a long paragraph that we've seen, skip it
        if (norm.length > 100 && seenParagraphs.has(norm)) {
            continue;
        }
        if (norm.length > 100) seenParagraphs.add(norm);
        filteredBlocks.push(block);
    }
    newContent = filteredBlocks.join('\n\n');

    // --- Task 4 & 5: FINAL SCRUB ---
    newContent = newContent.replace(/\bonly mathematically safe\b/gi, 'primary');
    newContent = newContent.replace(/\bthe only mathematically safe\b/gi, 'a primary');
    newContent = newContent.replace(/\bfirst\b/gi, 'This paper');
    newContent = newContent.replace(/\bonly\b/gi, 'primary');
    newContent = newContent.replace(/\bverified\b/gi, 'analyzed');
    newContent = newContent.replace(/\bgold standard\b/gi, 'reference');
    newContent = newContent.replace(/builds on A1/gi, 'references prior architectural work');
    newContent = newContent.replace(/A1.A6 series/gi, 'prior work');

    // --- Task 1: FOOTERS ---
    newContent = newContent.replace(/Conference'17/g, '');
    newContent = newContent.replace(/Conference’XX/g, '');
    newContent = newContent.replace(/July 2017, Washington, DC, USA/g, '');

    // Cleanup double dots
    newContent = newContent.replace(/\.\./g, '.');
    // Ensure labels have backslashes
    newContent = newContent.replace(/([^\\])label\{/g, '$1\\label{');

    return newContent;
}

console.log('--- Final ACM Cleanup (Version 10.0) ---');
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
