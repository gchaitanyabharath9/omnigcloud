/**
 * scripts/publications/final-acm-cleanup-v11.js
 * 
 * CLEAN RECOVERY FROM IEEE -> ACM
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

    if (!fs.existsSync(ieeePath)) {
        console.log(`[ERR]  IEEE source missing for ${paperId}`);
        return;
    }

    let content = fs.readFileSync(ieeePath, 'utf8');

    // 1. Transform Document Class
    content = content.replace(/\\documentclass\[.*?\]\{IEEEtran\}/g, '\\documentclass[sigconf]{acmart}');
    content = content.replace(/\\documentclass\{IEEEtran\}/g, '\\documentclass[sigconf]{acmart}');

    // 2. Add ACM suppressors
    if (!content.includes('settopmatter')) {
        content = content.replace(/\\documentclass\[sigconf\]\{acmart\}/,
            '\\documentclass[sigconf]{acmart}\n\\settopmatter{printacmref=false}\n\\renewcommand\\footnotetextcopyrightpermission[1]{}');
    }

    // 3. Remove IEEE Specifics
    content = content.replace(/\\IEEEtitleabstractindextext\{([\s\S]*?)\}/g, '$1');
    content = content.replace(/\\IEEEdisplaynontitleabstractindextext/g, '');
    content = content.replace(/\\IEEEpeerreviewmaketitle/g, '');
    content = content.replace(/\\IEEEPARstart\{.*?\}\{.*?\}/g, (match) => {
        const parts = match.match(/\\IEEEPARstart\{(.*?)\}\{(.*?)\}/);
        return parts ? parts[1] + parts[2] : '';
    });

    // 4. Author Block
    const titleRegex = /\\title\{(.*?)\}/;
    const titleMatch = content.match(titleRegex);
    if (titleMatch) {
        const titleLine = titleMatch[0];
        const authorBlock = `\\author{${AUTHOR_NAME}}\n\\email{${AUTHOR_EMAIL}}\n\\affiliation{\n  \\institution{${AFFILIATION}}\n  \\city{San Francisco}\n  \\country{USA}\n}\n`;
        const abstractStart = content.indexOf('\\begin{abstract}');
        if (abstractStart !== -1) {
            const beforeAbstract = content.substring(0, abstractStart);
            const afterAbstract = content.substring(abstractStart);
            const newBefore = beforeAbstract.replace(/\\title\{.*?\}[\s\S]*/, titleLine + "\n" + authorBlock + "\n");
            content = newBefore + afterAbstract;
        }
    }

    // 5. Abstract Tone
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

    // 6. Keywords
    const kwMatch = content.match(/\\begin\{IEEEkeywords\}([\s\S]*?)\\end\{IEEEkeywords\}/);
    let kws = kwMatch ? kwMatch[1].trim() : '';
    content = content.replace(/\\begin\{IEEEkeywords\}[\s\S]*?\\end\{IEEEkeywords\}/g, '');
    content = content.replace(/\\maketitle/, `\\keywords{${kws}}\n\\maketitle`);

    // 7. CCS
    const ccsBlock = `\\begin{CCSXML}\n<ccs2012>\n <concept>\n  <concept_id>10003033.10003058</concept_id>\n  <concept_desc>Computer systems organization~Distributed architectures</concept_desc>\n  <concept_significance>500</concept_significance>\n </concept>\n</ccs2012>\n\\end{CCSXML}\n\n\\ccsdesc[500]{Computer systems organization~Distributed architectures}`;
    content = content.replace(/\\end\{abstract\}/, `\\end{abstract}\n\n${ccsBlock}`);

    // 8. Novelty headers removal and merge
    // First, convert all Introduction headers to \section
    content = content.replace(/\\subsection\{Introduction\}/g, '\\section{Introduction}');

    // Find "Original Contribution" etc.
    const sections = content.split(/\\(?:sub)*section\{/);
    let extractedContent = "";
    let newFullContent = sections[0];
    for (let i = 1; i < sections.length; i++) {
        const s = sections[i];
        if (s.match(/^(?:Original |Verified )?Contribution|Innovation|Relationship to A1-A6|Relationship to series/i)) {
            const body = s.substring(s.indexOf('}') + 1).split(/\\(?:sub)*section\{|\\begin\{figure\}|\\begin\{table\}/)[0];
            extractedContent += body.trim() + "\n\n";
        } else {
            newFullContent += "\\section{" + s;
        }
    }
    content = newFullContent;

    // Merge into introduction
    if (extractedContent.trim()) {
        content = content.replace(/(\\section\{Introduction\}[\s\S]*?)(?=\\section)/i, (m, p1) => {
            return p1.trim() + "\n\n" + extractedContent.trim() + "\n\n";
        });
    }

    // 9. Scrub self-assertive language
    content = content.replace(/\bonly mathematically safe\b/gi, 'primary');
    content = content.replace(/\bonly\b/gi, 'primary');
    content = content.replace(/\bfirst\b/gi, 'This paper');
    content = content.replace(/\bgold standard\b/gi, 'reference');
    content = content.replace(/\bverified\b/gi, 'analyzed');
    content = content.replace(/builds on A1/gi, 'references prior architectural work');
    content = content.replace(/A1.A6 series/gi, 'prior work');
    content = content.replace(/\bto (?:the best of )?our knowledge\b/gi, '');

    // 10. Math & Encoding
    content = content.replace(/¯/g, '');
    content = content.replace(/\*\*(.*?)\*\*/g, '\\textbf{$1}');
    content = content.replace(/([^\$])\b(p99|p50|O\(t\))\b([^\$])/g, (m, p1, p2, p3) => `${p1}$${p2}$${p3}`);

    // 11. Footer Sweep
    content = content.replace(/Conference'17/g, '');
    content = content.replace(/Conference’XX/g, '');
    content = content.replace(/July 2017, Washington, DC, USA/g, '');

    // 12. Final Cleanup
    content = content.replace(/\.\./g, '.');

    fs.writeFileSync(acmPath, content);
    console.log(`[CLEANED] ${paperId} (Recovered from IEEE)`);
}

PAPERS.forEach(processPaper);
