/**
 * scripts/publications/final-acm-cleanup-v12.js
 * 
 * Context-aware cleanup from IEEE -> ACM
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

    // 1. Class & Topmatter
    content = content.replace(/\\documentclass\[.*?\]\{IEEEtran\}/g, '\\documentclass[sigconf]{acmart}');
    content = content.replace(/\\documentclass\{IEEEtran\}/g, '\\documentclass[sigconf]{acmart}');
    content = content.replace(/\\documentclass\[sigconf\]\{acmart\}/,
        '\\documentclass[sigconf]{acmart}\n\\settopmatter{printacmref=false}\n\\renewcommand\\footnotetextcopyrightpermission[1]{}');

    // 2. IEEE Removal
    content = content.replace(/\\IEEEtitleabstractindextext\{([\s\S]*?)\}/g, '$1');
    content = content.replace(/\\IEEEdisplaynontitleabstractindextext/g, '');
    content = content.replace(/\\IEEEpeerreviewmaketitle/g, '');
    content = content.replace(/\\IEEEPARstart\{(.*?)\}\{(.*?)\}/g, '$1$2');

    // 3. Author Block
    const titleRegex = /\\title\{(.*?)\}/;
    const titleMatch = content.match(titleRegex);
    if (titleMatch) {
        const titleLine = titleMatch[0];
        const authorBlock = `\\author{${AUTHOR_NAME}}\n\\email{${AUTHOR_EMAIL}}\n\\affiliation{\n  \\institution{${AFFILIATION}}\n  \\city{San Francisco}\n  \\country{USA}\n}\n`;
        const absStart = content.indexOf('\\begin{abstract}');
        if (absStart !== -1) {
            content = content.substring(0, absStart).replace(/\\title\{.*?\}[\s\S]*/, titleLine + "\n" + authorBlock + "\n") + content.substring(absStart);
        }
    }

    // 4. Abstract (Task 6)
    content = content.replace(/\\begin\{abstract\}([\s\S]*?)\\end\{abstract\}/, (match, body) => {
        let b = body.trim();
        b = b.replace(/The (contribution|innovation) is not.*?\./gi, '');
        b = b.replace(/The choice is false.*?\./gi, '');
        const sentences = b.split(/([.!?]\s+)/);
        if (sentences.length >= 4) {
            b = NEUTRAL_ABSTRACT_STARTS[paperId] + " " + sentences.slice(4).join('').trim();
        } else {
            b = NEUTRAL_ABSTRACT_STARTS[paperId];
        }
        b = b.replace(/\bIt's\b/g, 'This work demonstrates');
        b = b.replace(/\bwe've\b/gi, 'we have');
        b = b.replace(/\bdoesn't\b/gi, 'does not');
        return `\\begin{abstract}\n${b.trim()}\n\\end{abstract}`;
    });

    // 5. Keywords (Task 3)
    const kwMatch = content.match(/\\begin\{IEEEkeywords\}([\s\S]*?)\\end\{IEEEkeywords\}/);
    let kws = kwMatch ? kwMatch[1].trim() : 'distributed systems, cloud-native, architecture';
    content = content.replace(/\\begin\{IEEEkeywords\}[\s\S]*?\\end\{IEEEkeywords\}/g, '');
    content = content.replace(/\\maketitle/, `\\keywords{${kws}}\n\\maketitle`);

    // 6. CCS (Task 2)
    const ccsBlock = `\\begin{CCSXML}\n<ccs2012>\n <concept>\n  <concept_id>10003033.10003058</concept_id>\n  <concept_desc>Computer systems organization~Distributed architectures</concept_desc>\n  <concept_significance>500</concept_significance>\n </concept>\n</ccs2012>\n\\end{CCSXML}\n\n\\ccsdesc[500]{Computer systems organization~Distributed architectures}`;
    content = content.replace(/\\end\{abstract\}/, `\\end{abstract}\n\n${ccsBlock}`);

    // 7. Novelty Header Removal & Merge (Task 4)
    content = content.replace(/\\subsection\{Introduction\}/g, '\\section{Introduction}');
    const sections = content.split(/\\(?:sub)*section\{/);
    let extracted = "";
    let newContent = sections[0];
    for (let i = 1; i < sections.length; i++) {
        const s = sections[i];
        if (s.match(/^(?:Original |Verified )?Contribution|Innovation|Relationship to A1-A6|Relationship to series/i)) {
            const body = s.substring(s.indexOf('}') + 1).split(/\\(?:sub)*section\{|\\begin\{figure\}|\\begin\{table\}/)[0];
            extracted += body.trim() + "\n\n";
        } else {
            newContent += "\\section{" + s;
        }
    }
    content = newContent;
    if (extracted.trim()) {
        content = content.replace(/(\\section\{Introduction\}[\s\S]*?)(?=\\section)/i, (m, p1) => p1.trim() + "\n\n" + extracted.trim() + "\n\n");
    }

    // 8. SURGICAL SCRUB (Task 4 & 5)
    content = content.replace(/\bthe first (quantitative|empirical|architectural|formal)\b/gi, 'a $1');
    content = content.replace(/\brepresents the first\b/gi, 'presents a');
    content = content.replace(/\bthe only mathematically safe\b/gi, 'a primary');
    content = content.replace(/\bonly mathematically safe\b/gi, 'primary');
    content = content.replace(/\bgold standard\b/gi, 'reference');
    content = content.replace(/\bverified contribution\b/gi, 'analyzed result');
    content = content.replace(/builds on A1/gi, 'references prior architectural work');
    content = content.replace(/A1.A6 series/gi, 'prior work');
    content = content.replace(/\bto (?:the best of )?our knowledge\b/gi, '');

    // 9. Math & Encoding (Task 7)
    content = content.replace(/¯/g, '');
    content = content.replace(/\*\*(.*?)\*\*/g, '\\textbf{$1}');
    content = content.replace(/([^\$])\b(p99|p50|O\(t\))\b([^\$])/g, '$1$$$2$$$3');

    // 10. Footer Sweep (Task 1)
    content = content.replace(/Conference'17/g, '');
    content = content.replace(/Conference’XX/g, '');
    content = content.replace(/July 2017, Washington, DC, USA/g, '');

    // 11. Final Polish
    content = content.replace(/\.\./g, '.');
    content = content.replace(/([^\\])label\{/g, '$1\\label{');

    fs.writeFileSync(acmPath, content);
    console.log(`[CLEANED] ${paperId}`);
}

PAPERS.forEach(processPaper);
