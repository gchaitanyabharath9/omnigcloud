/**
 * scripts/publications/ultimate-acm-fix.js
 * 
 * THE ULTIMATE ACM FIX SCRIPT (v6.0).
 * Regenerates ACM from IEEE sources to ensure 100% integrity.
 */

const fs = require('fs');
const path = require('path');

const PAPERS = ['A1', 'A2', 'A3', 'A4', 'A5', 'A6', 'AECP', 'ARCH'];
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

function processPaper(paperId) {
    const ieeePath = path.join(process.cwd(), 'submission', 'ieee', paperId, 'main.tex');
    const acmPath = path.join(process.cwd(), 'submission', 'acm', paperId, 'main.tex');

    if (!fs.existsSync(ieeePath)) return;
    let content = fs.readFileSync(ieeePath, 'utf8');

    console.log(`Processing ${paperId}...`);

    // Split into [Front, Abstract, Body]
    const parts = content.split(/\\begin\{abstract\}|\\end\{abstract\}/);
    if (parts.length < 3) return;

    let preamble = parts[0];
    let abstract = parts[1];
    let body = parts[2];

    // 1. Preamble/Title/Author
    preamble = preamble.replace(/\\documentclass\[.*?\]\{IEEEtran\}/,
        '\\documentclass[sigconf]{acmart}\n\\settopmatter{printacmref=false}\n\\renewcommand\\footnotetextcopyrightpermission[1]{}');
    preamble = preamble.replace(/\\IEEEauthorblock[NA]\{[\s\S]*?\}/g, '');

    const titleMatch = preamble.match(/\\title\{([\s\S]*?)\}/);
    const title = titleMatch ? titleMatch[1].trim() : paperId;
    preamble = preamble.replace(/\\title\{[\s\S]*/, `\\title{${title}}\n\n\\author{${AUTHOR_NAME}}\n\\email{${AUTHOR_EMAIL}}\n\\affiliation{\n  \\institution{${AFFILIATION}}\n  \\city{San Francisco}\n  \\country{USA}\n}\n`);

    // 2. Abstract
    let ab = abstract.trim();
    ab = ab.replace(/\\textbf\{Keywords:\}[\s\S]*?(?=\n\n|$)/gi, '');
    ab = ab.replace(/Keywords:[\s\S]*?(?=\n\n|$)/gi, '');
    ab = ab.replace(/!\[[\s\S]*?\][\s\S]*?(?=\\end\{abstract\}|$)/g, '');
    ab = ab.replace(/\*\*(.*?)\*\*/g, '\\textbf{$1}');

    const sentences = ab.split(/([.!?]\s+)/);
    let newAbstract = NEUTRAL_ABSTRACT_STARTS[paperId];
    if (sentences.length >= 4) {
        newAbstract += " " + sentences.slice(4).join('').trim();
    } else {
        newAbstract += " " + ab;
    }
    newAbstract = newAbstract.replace(/\,\s*$/g, '.');

    // 3. Body: Novelty headers & Merging
    // Extract Novelty contentSURGICALLY
    let extracted = "";
    const noveltyMatch = body.match(/\\(?:sub)?section\{[\s\S]*?(?:Original |Verified |Paper |Key )?(?:Contribution|Innovation)[\s\S]*?\}(?:\\label\{.*?\})?([\s\S]*?)(?=\\section|\\subsection)/gi);
    if (noveltyMatch) {
        noveltyMatch.forEach(m => {
            const text = m.replace(/\\(?:sub)?section\{[\s\S]*?\}(?:\\label\{.*?\})?/, '');
            extracted += text.trim() + "\n\n";
        });
    }
    // Remove novelty blocks
    body = body.replace(/\\(?:sub)?section\{[\s\S]*?(?:Original |Verified |Paper |Key )?(?:Contribution|Innovation)[\s\S]*?\}(?:\\label\{.*?\})?([\s\S]*?)(?=\\section|\\subsection)/gi, '');

    // Merge into introduction if found
    const introHeaderRegex = /(\\section\{Introduction\}(?:\\label\{.*?\})?)/i;
    if (introHeaderRegex.test(body)) {
        if (extracted.trim()) {
            body = body.replace(introHeaderRegex, `$1\n\n${extracted.trim()}\n\n`);
        }
    } else if (extracted.trim()) {
        // Fallback: prepend to body
        body = "\\section{Introduction}\\label{introduction}\n\n" + extracted.trim() + "\n\n" + body;
    }

    // 4. Decoupling & Neutrality
    body = body.replace(/\bA1[–-]A6 series\b/gi, 'prior architectural studies');
    body = body.replace(/\bbuilds on A1\b/gi, 'references prior work');
    body = body.replace(/\bAECP executes A1\b/gi, 'AECP implements the reference architecture');
    body = body.replace(/the first/gi, 'we present');
    body = body.replace(/the only/gi, 'a');
    body = body.replace(/the only mathematically safe/gi, 'a mathematically evaluated');
    body = body.replace(/verified result/gi, 'demonstrated result');

    // 5. Artifact cleanup
    body = body.replace(/Conference'17/g, '');
    body = body.replace(/July 2017, Washington, DC, USA/g, '');
    body = body.replace(/\\(?:sub)?section\{Why This (?:Framework|Innovation) Was Needed Now\}(?:\\label\{.*?\})?/gi, '');
    body = body.replace(/\\begin\{IEEEkeywords\}[\s\S]*?\\end\{IEEEkeywords\}/g, '');
    body = body.replace(/¯/g, '');
    body = body.replace(/!\[[\s\S]*?\]\([\s\S]*?\)/g, '');
    body = body.replace(/!\[[\s\S]*?\]/g, '');
    body = body.replace(/\*\*(.*?)\*\*/g, '\\textbf{$1}');
    body = body.replace(/\.\./g, '.');
    body = body.replace(/([^\\])label\{/g, '$1\\label{');

    // Join
    const ccsBlock = `\\begin{CCSXML}\n<ccs2012>\n <concept>\n  <concept_id>10003033.10003058</concept_id>\n  <concept_desc>Computer systems organization~Distributed architectures</concept_desc>\n  <concept_significance>500</concept_significance>\n </concept>\n</ccs2012>\n\\end{CCSXML}\n\n\\ccsdesc[500]{Computer systems organization~Distributed architectures}`;
    const keywordsBlock = `\\keywords{distributed systems, cloud-native, architecture}`;

    let finalContent = preamble +
        "\\begin{abstract}\n" + newAbstract.trim() + "\n\\end{abstract}\n\n" +
        ccsBlock + "\n\n" +
        keywordsBlock + "\n\n" +
        "\\maketitle\n\n" +
        body;

    fs.writeFileSync(acmPath, finalContent);
    console.log(`  [ULTIMATE-FIX] ${paperId}`);
}

PAPERS.forEach(processPaper);
