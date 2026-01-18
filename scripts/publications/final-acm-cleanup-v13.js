/**
 * scripts/publications/final-acm-cleanup-v13.js
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
    const acmPath = path.join(process.cwd(), 'submission', 'acm', paperId, 'main.tex');
    if (!fs.existsSync(acmPath)) return;
    let content = fs.readFileSync(acmPath, 'utf8');

    // SURGICAL SCRUB (Task 4 & 5)
    content = content.replace(/\bthe\s+only\s+mathematically\s+safe\b/gi, 'a primary');
    content = content.replace(/\bonly\s+mathematically\s+safe\b/gi, 'primary');
    content = content.replace(/\bthe\s+first\s+(quantitative|empirical|architectural|formal|demonstration)\b/gi, 'a $1');
    content = content.replace(/\brepresents\s+the\s+first\b/gi, 'presents a');
    content = content.replace(/\bgold\s+standard\b/gi, 'reference');
    content = content.replace(/\bverified\s+contribution\b/gi, 'analyzed result');
    content = content.replace(/\bVerified\s+Contribution\b/gi, 'Contribution');
    content = content.replace(/Earlier\s+work\s+in\s+this\s+domain\s+build\b/gi, 'Earlier work in this domain builds');

    // Final Footer Cleanup (just in case)
    content = content.replace(/Conference'17/g, '');
    content = content.replace(/Conference’XX/g, '');

    // Abstract Double sentences
    content = content.replace(/This\s+work\s+demonstrates\s+the\s+approach\s+itself/g, 'The approach itself');

    fs.writeFileSync(acmPath, content);
    console.log(`[POLISHED] ${paperId}`);
}

PAPERS.forEach(processPaper);
