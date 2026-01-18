/**
 * scripts/publications/final-acm-cleanup.js
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

    // --- Task 1: FOOTERS ---
    newContent = newContent.replace(/Conference'17/g, '');
    newContent = newContent.replace(/Conference’XX/g, '');
    newContent = newContent.replace(/July 2017, Washington, DC, USA/g, '');

    // --- Task 8: AUTHOR & AFFILIATION ---
    const titleRegex = /\\title\{(.*?)\}/;
    const titleMatch = newContent.match(titleRegex);
    if (titleMatch) {
        const titleLine = titleMatch[0];
        const blockRegex = /\\title\{.*?\}[\s\S]*?(?=\\begin\{abstract\})/g;
        newContent = newContent.replace(blockRegex, `${titleLine}\n\\author{${AUTHOR_NAME}}\n\\email{${AUTHOR_EMAIL}}\n\\affiliation{\n  \\institution{${AFFILIATION}}\n  \\city{San Francisco}\n  \\country{USA}\n}\n\n`);
    }

    // --- Task 6: ABSTRACT ---
    newContent = newContent.replace(/\\begin\{abstract\}([\s\S]*?)\\end\{abstract\}/, (match, body) => {
        let b = body.trim();
        if (!b.startsWith(NEUTRAL_ABSTRACT_STARTS[paperId].substring(0, 30))) {
            let sentences = b.split(/([.!?]\s+)/);
            if (sentences.length >= 4) { sentences.splice(0, 4); b = NEUTRAL_ABSTRACT_STARTS[paperId] + " " + sentences.join('').trim(); }
            else { b = NEUTRAL_ABSTRACT_STARTS[paperId] + " " + b; }
        }
        b = b.replace(/The contribution isn't.*?\./gi, '');
        b = b.replace(/The choice is false.*?\./gi, '');
        b = b.replace(/The solution isn't.*?\./gi, '');
        b = b.replace(/\bIt's a quantified\b/g, 'This work provides a quantified');
        b = b.replace(/\bIt's\b/g, 'This work demonstrates');
        b = b.replace(/\bwe've\b/gi, 'we have');
        b = b.replace(/\bdoesn't\b/gi, 'does not');
        b = b.replace(/\. This work (demonstrates|provides)/g, '.');
        return `\\begin{abstract}\n${b.trim()}\n\\end{abstract}`;
    });

    // --- Task 2: CCS ---
    newContent = newContent.replace(/\\begin\{CCSXML\}[\s\S]*?\\end\{CCSXML\}/g, '');
    newContent = newContent.replace(/\\ccsdesc(\[.*?\])?\{.*?\}/g, '');
    const ccsBlock = `\\begin{CCSXML}\n<ccs2012>\n <concept>\n  <concept_id>10003033.10003058</concept_id>\n  <concept_desc>Computer systems organization~Distributed architectures</concept_desc>\n  <concept_significance>500</concept_significance>\n </concept>\n</ccs2012>\n\\end{CCSXML}\n\n\\ccsdesc[500]{Computer systems organization~Distributed architectures}`;
    newContent = newContent.replace(/\\end\{abstract\}/, `\\end{abstract}\n\n${ccsBlock}`);

    // --- Task 3: KEYWORDS ---
    const kwMatch = newContent.match(/\\keywords\{([\s\S]*?)\}/);
    const kws = kwMatch ? kwMatch[1].trim() : '';
    newContent = newContent.replace(/\\keywords\{[\s\S]*?\}/g, '');
    newContent = newContent.replace(/\\maketitle/, `\\keywords{${kws}}\n\\maketitle`);

    // --- Task 4 & 5: NOVELTY & SERIES ---
    newContent = newContent.replace(/\\(?:sub)*section\{Why This Innovation Was Needed Now\}/gi, '');
    newContent = newContent.replace(/\\(?:sub)?section\{(?:Original |Verified )?Contribution(?:s)?\}(?:\\label\{.*?\})?/g, '');
    newContent = newContent.replace(/gold standard/gi, 'reference');
    newContent = newContent.replace(/builds on A1/gi, 'references prior architectural work');

    // --- Task 7: ENCODING & MATH ---
    newContent = newContent.replace(/¯/g, '');
    newContent = newContent.replace(/!\[.*?\]\(.*?\)/g, '');
    newContent = newContent.replace(/\*\*(.*?)\*\*/g, '\\textbf{$1}');

    // Fix mangled words from previous pass
    newContent = newContent.replace(/\$(\w+)\$/g, '$1'); // Un-dollar words

    // Proper math replacement with word boundaries
    newContent = newContent.replace(/\bO\(N\^2\)\b/g, '$O(N^2)$');
    newContent = newContent.replace(/\bO\(N\)\b/g, '$O(N)$');
    newContent = newContent.replace(/\bO\(t\)\b/g, '$O(t)$');
    newContent = newContent.replace(/\b(p99|p50|alpha|beta|mu|sigma|tau|lambda)\b/g, '$$$1$$');

    // Preamble Cleanup
    newContent = newContent.replace(/\\DeclareUnicodeCharacter\{.*?\}.*?\n/g, '');
    newContent = newContent.replace(/^[ \t]*\}[ \t]*\n/gm, '');

    const unicodeBlock = `\\DeclareUnicodeCharacter{03B1}{\\ensuremath{\\alpha}}
\\DeclareUnicodeCharacter{03B2}{\\ensuremath{\\beta}}
\\DeclareUnicodeCharacter{03B3}{\\ensuremath{\\gamma}}
\\DeclareUnicodeCharacter{03B4}{\\ensuremath{\\delta}}
\\DeclareUnicodeCharacter{03BB}{\\ensuremath{\\lambda}}
\\DeclareUnicodeCharacter{03BC}{\\ensuremath{\\mu}}
\\DeclareUnicodeCharacter{03C3}{\\ensuremath{\\sigma}}
\\DeclareUnicodeCharacter{03C4}{\\ensuremath{\\tau}}
\\DeclareUnicodeCharacter{2192}{\\ensuremath{\\rightarrow}}
\\DeclareUnicodeCharacter{2264}{\\ensuremath{\\leq}}
\\DeclareUnicodeCharacter{2265}{\\ensuremath{\\geq}}
\\DeclareUnicodeCharacter{2248}{\\ensuremath{\\approx}}
\\DeclareUnicodeCharacter{00D7}{\\ensuremath{\\times}}
\\DeclareUnicodeCharacter{2260}{\\ensuremath{\\neq}}
\\DeclareUnicodeCharacter{00B1}{\\ensuremath{\\pm}}
\\DeclareUnicodeCharacter{221E}{\\ensuremath{\\infty}}
\\DeclareUnicodeCharacter{00A0}{\\ensuremath{~}}
\\DeclareUnicodeCharacter{2014}{\\ensuremath{\\textemdash}}
\\DeclareUnicodeCharacter{2013}{\\ensuremath{\\textendash}}
\\DeclareUnicodeCharacter{2022}{\\ensuremath{\\bullet}}\n`;

    if (newContent.includes('\\begin{document}')) {
        newContent = newContent.replace('\\begin{document}', unicodeBlock + '\n\\begin{document}');
    }

    newContent = newContent.replace(/\\country\{USA\}\s*\\begin\{abstract\}/, '\\country{USA}\n}\n\n\\begin{abstract}');
    newContent = newContent.replace(/\.\./g, '.');

    return newContent;
}

console.log('--- Final ACM Cleanup (Version 2.8 - Word Boundary Fix) ---');
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
