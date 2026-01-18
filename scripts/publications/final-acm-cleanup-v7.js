/**
 * scripts/publications/final-acm-cleanup-v7.js
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

    // --- Task 1: FOOTERS & METADATA ---
    newContent = newContent.replace(/Conference'17/g, '');
    newContent = newContent.replace(/Conference’XX/g, '');
    newContent = newContent.replace(/July 2017, Washington, DC, USA/g, '');
    newContent = newContent.replace(/\\acmConference\[.*?\]\{.*?\}.*?\{.*?\}/g, '');
    newContent = newContent.replace(/\\acmBooktitle\{.*?\}/g, '');
    newContent = newContent.replace(/\\acmPrice\{.*?\}/g, '');
    newContent = newContent.replace(/\\acmISBN\{.*?\}/g, '');
    newContent = newContent.replace(/\\acmDOI\{.*?\}/g, '');
    newContent = newContent.replace(/\\setcopyright\{.*?\}/g, '');
    newContent = newContent.replace(/\\settopmatter\{printacmref=false\}/g, '');
    newContent = newContent.replace(/\\renewcommand\\footnotetextcopyrightpermission\[1\]\{\}/g, '');

    // Re-inject canonical top matter
    newContent = newContent.replace(/\\documentclass\[sigconf\]\{acmart\}/,
        `\\documentclass[sigconf]{acmart}\n\\settopmatter{printacmref=false}\n\\renewcommand\\footnotetextcopyrightpermission[1]{}`);

    // --- Task 8: AUTHOR METADATA ---
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
        // Remove narrative spikes
        b = b.replace(/The contribution isn't.*?\./gi, '');
        b = b.replace(/The choice is false.*?\./gi, '');
        b = b.replace(/The solution isn't.*?\./gi, '');

        // Remove existing first 1-2 sentences of the original if they were replaced before
        const starts = Object.values(NEUTRAL_ABSTRACT_STARTS);
        for (const s of starts) {
            if (b.includes(s)) {
                b = b.split(s)[1].trim();
            }
        }

        const neutralStart = NEUTRAL_ABSTRACT_STARTS[paperId];
        // Remove any other "This paper presents" at the start
        b = b.replace(/^This (paper presents|work demonstrates|formalizes).*?\./i, '');

        return `\\begin{abstract}\n${neutralStart} ${b.trim()}\n\\end{abstract}`;
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

    // --- Task 4 & 5: NOVELTY & SERIES ---
    // Remove headers and duplication
    newContent = newContent.replace(/\\(?:sub)*section\{[\s\S]*?(?:Contribution|Innovation|Relationship to A1-A6|Relationship to series)[\s\S]*?\}(?:\\label\{.*?\})?/gi, '');

    // Ensure Introduction Header exists
    if (!newContent.match(/\\section\{Introduction\}|\\subsection\{Introduction\}/i)) {
        newContent = newContent.replace(/\\maketitle/, `\\maketitle\n\n\\section{Introduction}\\label{introduction}`);
    }

    // Deduplicate the specific merged paragraphs
    const paragraphs = [
        "This work establishes the foundational architecture",
        "This paper formalizes the ``Dual-Write/Shadow-Read'' pattern",
        "This work provides a quantified demonstration",
        "Earlier work in this domain has shown"
    ];
    paragraphs.forEach(p => {
        const regex = new RegExp(p + "[\\s\\S]*?\\.", "g");
        const matches = newContent.match(regex);
        if (matches && matches.length > 1) {
            // Keep only the last one (usually the one in Introduction)
            let count = 0;
            newContent = newContent.replace(regex, (m) => {
                count++;
                return count === matches.length ? m : '';
            });
        }
    });

    // Global scrub for forbidden words
    newContent = newContent.replace(/\bfirst empirical\b/gi, 'quantitative');
    newContent = newContent.replace(/\bonly mathematically safe\b/gi, 'primary');
    newContent = newContent.replace(/\brepresents the first\b/gi, 'presents a');
    newContent = newContent.replace(/\bthe first quantitative\b/gi, 'a quantitative');
    newContent = newContent.replace(/\bgold standard\b/gi, 'reference');
    newContent = newContent.replace(/\bverified contribution\b/gi, 'analyzed result');
    newContent = newContent.replace(/builds on A1/gi, 'references prior architectural work');
    newContent = newContent.replace(/A1.A6 series/gi, 'prior work');
    newContent = newContent.replace(/foundational paper/gi, 'previous study');

    // --- Task 7: ENCODING & MATH ---
    newContent = newContent.replace(/¯/g, '');
    newContent = newContent.replace(/\*\*(.*?)\*\*/g, '\\textbf{$1}');

    // Fix over-dollared math
    newContent = newContent.replace(/\$\$+(p99|p50|O\(t\))\$\$+/g, '$$$1$$');
    newContent = newContent.replace(/([^\$])\b(p99|p50|O\(t\))\b([^\$])/g, (m, p1, p2, p3) => `${p1}$${p2}$${p3}`);

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

    newContent = newContent.replace(/\.\./g, '.');
    return newContent;
}

console.log('--- Final ACM Cleanup (Version 7.0) ---');
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
