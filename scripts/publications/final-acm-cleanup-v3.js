/**
 * scripts/publications/final-acm-cleanup-v3.js
 * 
 * FINAL ACM Compliance Pass strictly following the instructions in Step 1687.
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

function splitIntoSentences(text) {
    // Basic sentence splitter that avoids common abbreviations
    const sentences = text.match(/[^\.!\?]+[\.!\?]+(?=\s|$)|[^\.!\?]+$/g) || [text];
    return sentences.map(s => s.trim());
}

function cleanupTex(content, paperId) {
    let newContent = content;

    // --- Task 1: REMOVE TEMPLATE FOOTERS ---
    newContent = newContent.replace(/Conference'17/g, '');
    newContent = newContent.replace(/Conference’XX/g, '');
    newContent = newContent.replace(/July 2017, Washington, DC, USA/g, '');

    // --- Task 8: AUTHOR METADATA ---
    // Surgical replacement of author/affiliation block
    const titleRegex = /\\title\{(.*?)\}/;
    const titleMatch = newContent.match(titleRegex);
    if (titleMatch) {
        const titleLine = titleMatch[0];
        const blockRegex = /\\title\{.*?\}[\s\S]*?(?=\\begin\{abstract\})/g;
        newContent = newContent.replace(blockRegex, `${titleLine}\n\\author{${AUTHOR_NAME}}\n\\email{${AUTHOR_EMAIL}}\n\\affiliation{\n  \\institution{${AFFILIATION}}\n  \\city{San Francisco}\n  \\country{USA}\n}\n\n`);
    }

    // --- Task 6: ABSTRACT TONE ---
    newContent = newContent.replace(/\\begin\{abstract\}([\s\S]*?)\\end\{abstract\}/, (match, body) => {
        let b = body.trim();
        // Remove narrative/rhetorical phrases
        b = b.replace(/The contribution isn't.*?\./gi, '');
        b = b.replace(/The choice is false.*?\./gi, '');
        b = b.replace(/The solution isn't.*?\./gi, '');
        b = b.replace(/It's a quantified\b/g, 'This work provides a quantified');
        b = b.replace(/It's\b/g, 'This work demonstrates');
        b = b.replace(/we've\b/gi, 'we have');
        b = b.replace(/doesn't\b/gi, 'does not');

        // Replace first 1-2 sentences if not already neutral
        if (!b.startsWith(NEUTRAL_ABSTRACT_STARTS[paperId].substring(0, 30))) {
            const sentences = splitIntoSentences(b);
            if (sentences.length > 2) {
                b = NEUTRAL_ABSTRACT_STARTS[paperId] + " " + sentences.slice(2).join(' ');
            } else {
                b = NEUTRAL_ABSTRACT_STARTS[paperId];
            }
        }

        // Final cleanup for stuttering from previous passes
        b = b.replace(/This work demonstrates This work demonstrates/g, 'This work demonstrates');
        b = b.replace(/This paper presents This paper presents/g, 'This paper presents');

        return `\\begin{abstract}\n${b.trim()}\n\\end{abstract}`;
    });

    // --- Task 2: CCS CONCEPTS ---
    newContent = newContent.replace(/\\begin\{CCSXML\}[\s\S]*?\\end\{CCSXML\}/g, '');
    newContent = newContent.replace(/\\ccsdesc(\[.*?\])?\{.*?\}/g, '');
    const ccsBlock = `\\begin{CCSXML}\n<ccs2012>\n <concept>\n  <concept_id>10003033.10003058</concept_id>\n  <concept_desc>Computer systems organization~Distributed architectures</concept_desc>\n  <concept_significance>500</concept_significance>\n </concept>\n</ccs2012>\n\\end{CCSXML}\n\n\\ccsdesc[500]{Computer systems organization~Distributed architectures}`;
    newContent = newContent.replace(/\\end\{abstract\}/, `\\end{abstract}\n\n${ccsBlock}`);

    // --- Task 3: KEYWORDS ---
    // Extract keywords if they exist, otherwise use defaults
    const kwMatch = newContent.match(/\\keywords\{([\s\S]*?)\}/);
    let kws = kwMatch ? kwMatch[1].trim() : 'cloud-native, distributed systems, architecture';
    newContent = newContent.replace(/\\keywords\{[\s\S]*?\}/g, '');
    newContent = newContent.replace(/\\maketitle/, `\\keywords{${kws}}\n\\maketitle`);

    // --- Task 4 & 5: NOVELTY & SERIES ---
    // Capture content from "Original Contribution" sections before removing them
    const noveltyRegex = /\\(?:sub)*section\{(?:Original |Verified )?Contribution(?:s)?\}(?:\\label\{.*?\})?([\s\S]*?)(?=\\section|\\subsection|\\subsubsection|\\begin\{figure\}|\\begin\{table\}|\\begin\{itemize\}|\\end\{document\})/gi;
    const noveltyMatches = [...newContent.matchAll(noveltyRegex)];
    let noveltyContent = noveltyMatches.map(m => m[1].trim()).join('\n\n');

    // Remove the sections
    newContent = newContent.replace(noveltyRegex, '');

    // Scrub self-assertive words from novelty content
    noveltyContent = noveltyContent.replace(/\bfirst\b/gi, 'This paper');
    noveltyContent = noveltyContent.replace(/\bonly\b/gi, 'primary');
    noveltyContent = noveltyContent.replace(/\bgold standard\b/gi, 'reference');
    noveltyContent = noveltyContent.replace(/\bverified\b/gi, 'analyzed');

    // Series decoupling
    noveltyContent = noveltyContent.replace(/builds on A1/gi, 'references prior architectural work');
    noveltyContent = noveltyContent.replace(/A1.A6 series/gi, 'prior work in this domain');
    noveltyContent = noveltyContent.replace(/foundational paper/gi, 'previous study');
    noveltyContent = noveltyContent.replace(/AECP executes A1/gi, 'AECP implements the reference architecture');

    // Merge into Introduction's final paragraph
    if (noveltyContent) {
        // Find the end of the Introduction section
        const introEndRegex = /\\subsection\{Introduction\}[\s\S]*?(?=\\section|\\subsection|\\subsubsection)/i;
        newContent = newContent.replace(introEndRegex, (match) => {
            return match.trim() + '\n\n' + noveltyContent + '\n\n';
        });
    }

    // Global scrub for series dependency and novelty
    newContent = newContent.replace(/builds on A1/gi, 'references prior architectural work');
    newContent = newContent.replace(/A1.A6 series/gi, 'prior work');
    newContent = newContent.replace(/\bfirst empirical\b/gi, 'quantitative');
    newContent = newContent.replace(/\brepresents the first\b/gi, 'presents a');
    newContent = newContent.replace(/\bto (?:the best of )?our knowledge\b/gi, '');

    // --- Task 7: ENCODING & MATH CLEANUP ---
    newContent = newContent.replace(/¯/g, '');
    newContent = newContent.replace(/!\[.*?\]\(.*?\)/g, '');
    newContent = newContent.replace(/\*\*(.*?)\*\*/g, '\\textbf{$1}');

    // Fix over-dollared math
    newContent = newContent.replace(/\$\$+(p99|p50|O\(t\))\$\$+/g, '$$$1$$');
    // Ensure math mode for common metrics
    newContent = newContent.replace(/([^\$])\b(p99|p50|O\(t\))\b([^\$])/g, '$1$$$2$$$3');

    // Cleanup Preamble Garbage
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

    // Fix double dots that might have occurred in previous passes
    newContent = newContent.replace(/\.\./g, '.');

    return newContent;
}

console.log('--- Final ACM Cleanup (Version 3.0) ---');
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
