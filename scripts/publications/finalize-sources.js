/**
 * scripts/publications/finalize-sources.js
 * Finalizing LaTeX sources for ACM, IEEE, and arXiv compatibility.
 * Strictly follows the Tasks 1-8 in the specified order.
 */
const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

const FORMATS = ['acm', 'ieee', 'arxiv'];
const PAPERS = ['A1', 'A2', 'A3', 'A4', 'A5', 'A6', 'AECP', 'ARCH'];
const SUBMISSION_ROOT = path.join(process.cwd(), 'submission');

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

function finalizeTex(content, paperId, format) {
    let newContent = content;

    // --- TASK 1: REMOVE SELF-DECLARED NOVELTY STRUCTURE ---
    // Remove exact "Original Contribution" headers but keep content
    const contribRegex = /\\(?:sub)?section\{(?:Original )?Contribution(?:s)?\}(?:\\label\{.*?\})?([\s\S]*?)(?=\\section|\\subsection|\\begin\{figure\}|\\begin\{table\}|\\begin\{itemize\}|\\begin\{enumerate\}|\n\n\n)/g;
    let contribContent = '';
    newContent = newContent.replace(contribRegex, (match, p1) => {
        contribContent = p1.trim();
        return '';
    });

    if (contribContent) {
        // Scrub phrasing
        contribContent = contribContent.replace(/to (the best of )?our knowledge/gi, '');
        contribContent = contribContent.replace(/(This is )?the first/gi, 'This work');
        contribContent = contribContent.replace(/only system/gi, 'system');
        contribContent = contribContent.replace(/gold standard/gi, 'reference');

        // Find Introduction to merge
        const introRegex = /\\((?:sub)?section)\{(?:\d+\.\s*)?Introduction\}(\\label\{.*?\})?([\s\S]*?)(?=\\(?:sub)?section|\n\n\n)/g;
        let foundIntro = false;
        newContent = newContent.replace(introRegex, (match, p1, p2, p3) => {
            foundIntro = true;
            return `\\${p1}{Introduction}${p2 || ''}\n\n${p3.trim()}\n\n${contribContent}\n\n`;
        });

        if (!foundIntro) {
            newContent = newContent.replace(/\\maketitle/, `\\maketitle\n\n\\section{Introduction}\n${contribContent}\n`);
        }
    }

    // Global scrub for Task 1 items across the document
    newContent = newContent.replace(/to (the best of )?our knowledge/gi, '');
    newContent = newContent.replace(/the first quantitative/gi, 'a quantitative');
    newContent = newContent.replace(/the first empirical/gi, 'an empirical');
    newContent = newContent.replace(/gold standard/gi, 'standard');

    // --- TASK 2: SERIES DECOUPLING ---
    newContent = newContent.replace(/This paper builds on A\d/gi, 'Prior architectural studies demonstrate');
    newContent = newContent.replace(/A\d synthesizes A1–A5/gi, 'Earlier work in this domain has shown');
    newContent = newContent.replace(/previous research in this series build/gi, 'earlier studies demonstrate');
    newContent = newContent.replace(/previous research in this series/gi, 'earlier work in this domain');
    newContent = newContent.replace(/A\d establishes the foundational architecture/gi, 'Prior work establishes a foundational architecture');
    newContent = newContent.replace(/A\d-REF-STD/g, 'the reference architecture');

    // --- TASK 3: ABSTRACT NORMALIZATION ---
    // Rewrite first 1-2 sentences
    const abstractRegex = /\\begin\{abstract\}([\s\S]*?)\\end\{abstract\}/;
    newContent = newContent.replace(abstractRegex, (match, p1) => {
        let body = p1.trim();
        // Skip narrative start (usually ends with . or ! or ?)
        body = body.replace(/^[^.!?]+[.!?]\s*([^.!?]+[.!?]\s*)?/, '');
        return `\\begin{abstract}\n${NEUTRAL_ABSTRACT_STARTS[paperId]} ${body.trim()}\n\\end{abstract}`;
    });

    // --- TASK 4: KEYWORDS NORMALIZATION ---
    let kws = '';
    const kwAcmMatch = newContent.match(/\\keywords\{([\s\S]*?)\}/);
    const kwIeeeMatch = newContent.match(/\\begin\{IEEEkeywords\}([\s\S]*?)\\end\{IEEEkeywords\}/);
    const kwArxivMatch = newContent.match(/\\textbf\{Keywords:\}\s*(.*?)\n/);

    kws = (kwAcmMatch ? kwAcmMatch[1] : (kwIeeeMatch ? kwIeeeMatch[1] : (kwArxivMatch ? kwArxivMatch[1] : ''))).trim();

    // Remove all existing keyword blocks
    newContent = newContent.replace(/\\keywords\{[\s\S]*?\}/g, '');
    newContent = newContent.replace(/\\begin\{IEEEkeywords\}[\s\S]*?\\end\{IEEEkeywords\}/g, '');
    newContent = newContent.replace(/\\textbf\{Keywords:\}.*?\n/g, '');
    newContent = newContent.replace(/\\begin\{abstract\}[\s\S]*?\\end\{abstract\}/, (match) => {
        return match.replace(/\\textbf\{Keywords:\}.*?\n/g, '').replace(/Keywords:.*?\n/g, '');
    });

    if (kws) {
        if (format === 'acm') {
            newContent = newContent.replace(/\\maketitle/, `\\keywords{${kws}}\n\\maketitle`);
        } else if (format === 'ieee') {
            newContent = newContent.replace(/\\end\{abstract\}/, `\\end{abstract}\n\n\\begin{IEEEkeywords}\n${kws}\n\\end{IEEEkeywords}`);
        } else {
            // arxiv
            newContent = newContent.replace(/\\end\{abstract\}/, `\\end{abstract}\n\n\\textbf{Keywords:} ${kws}`);
        }
    }

    // --- TASK 5: ACM CCS CONCEPTS ---
    if (format === 'acm') {
        newContent = newContent.replace(/\\ccsdesc(\[.*?\])?\{(.*?)\}/g, '\\ccsdesc[500]{$2}');
    }

    // --- TASK 6: REMOVE TEMPLATE FOOTERS / PLACEHOLDERS ---
    newContent = newContent.replace(/Conference’XX/g, '');
    newContent = newContent.replace(/\\acmConference\[.*?\]\{.*?\}.*?\{.*?\}/g, '');
    newContent = newContent.replace(/% Generated[\s\S]*?\n/g, '');
    newContent = newContent.replace(/% ACM SigConf submission/g, '% Camera-Ready');
    newContent = newContent.replace(/% IEEE submission/g, '% Camera-Ready');

    // --- TASK 7: AUTHOR & AFFILIATION NORMALIZATION ---
    if (format === 'acm') {
        newContent = newContent.replace(/\\author\{[\s\S]*?\}(?:\\email\{[\s\S]*?\})?(?:\\affiliation\{[\s\S]*?\})?/g, `\\author{${AUTHOR_NAME}}
\\email{${AUTHOR_EMAIL}}
\\affiliation{
  \\institution{${AFFILIATION}}
  \\city{San Francisco}
  \\country{USA}
}`);
    } else if (format === 'ieee') {
        newContent = newContent.replace(/\\author\{[\s\S]*?\}\s*\\maketitle/g, `\\author{\\IEEEauthorblockN{${AUTHOR_NAME}}
\\IEEEauthorblockA{\\textit{Enterprise Architecture Research} \\\\
${AFFILIATION} \\\\
${AUTHOR_EMAIL}}}
\\maketitle`);
    } else if (format === 'arxiv') {
        newContent = newContent.replace(/\\author\{[\s\S]*?\}/, `\\author{${AUTHOR_NAME} \\\\ ${AFFILIATION} \\\\ \\texttt{${AUTHOR_EMAIL}}}`);
        newContent = newContent.replace(/\\date\{\\today\}/, `\\date{January 2026}`);
    }

    // Cleanup artifacts
    newContent = newContent.replace(/\\sub\{Introduction\}/g, '\\subsection{Introduction}');
    newContent = newContent.replace(/cb@example\.com(?!\})/g, '');

    return newContent;
}

console.log('--- Finalizing Sources (Task-Oriented) ---');
let changedCount = 0;
FORMATS.forEach(format => {
    PAPERS.forEach(paperId => {
        const texFile = path.join(SUBMISSION_ROOT, format, paperId, 'main.tex');
        if (fs.existsSync(texFile)) {
            const content = fs.readFileSync(texFile, 'utf8');
            const finalized = finalizeTex(content, paperId, format);
            if (finalized !== content) {
                fs.writeFileSync(texFile, finalized);
                console.log(`[OK] ${format}/${paperId}`);
                changedCount++;
            } else {
                console.log(`[ - ] ${format}/${paperId}`);
            }
        }
    });
});

console.log(`\nFinalized ${changedCount} files.`);
