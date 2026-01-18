/**
 * scripts/publications/acm-strict-footer-purge.js
 * 
 * Target: 100% clean footers for ACM submission.
 */
const fs = require('fs');
const path = require('path');

const PAPERS = ['A1', 'A2', 'A3', 'A4', 'A5', 'A6', 'AECP', 'ARCH'];
const SUBMISSION_ROOT = path.join(process.cwd(), 'submission', 'acm');

const MACROS_TO_REMOVE = [
    'acmConference',
    'acmYear',
    'copyrightyear',
    'setcopyright',
    'acmISBN',
    'acmDOI',
    'acmPrice'
];

function purgeFooter(paperId) {
    const texPath = path.join(SUBMISSION_ROOT, paperId, 'main.tex');
    if (!fs.existsSync(texPath)) {
        console.log(`[SKIP]   ${paperId} (Not found)`);
        return;
    }

    let content = fs.readFileSync(texPath, 'utf8');

    // 1. REMOVE specified macros (User asked for exactly: REMOVE or comment out)
    // We will comment them out to be "verifiable" but clean.
    MACROS_TO_REMOVE.forEach(macro => {
        // Regex to match \macro{...} including potential newlines inside braces
        const regex = new RegExp(`\\\\${macro}(?:\\[.*?\\])?\\{[\\s\\S]*?\\}`, 'g');
        content = content.replace(regex, (match) => `% Purged: ${match}`);
    });

    // 2. Ensure \settopmatter{printacmref=false} is present
    if (!content.includes('\\settopmatter{printacmref=false}')) {
        content = content.replace(/\\documentclass\[sigconf\]\{acmart\}/, '\\documentclass[sigconf]{acmart}\n\\settopmatter{printacmref=false}');
    }

    // 3. Ensure copyright permission suppression is also present (crucial for "no footer")
    if (!content.includes('\\renewcommand\\footnotetextcopyrightpermission')) {
        if (content.includes('\\settopmatter{printacmref=false}')) {
            content = content.replace('\\settopmatter{printacmref=false}', '\\settopmatter{printacmref=false}\n\\renewcommand\\footnotetextcopyrightpermission[1]{}');
        }
    }

    // 4. Final sweep for hardcoded placeholder text
    content = content.replace(/Conference'17/g, '');
    content = content.replace(/Conference’XX/g, '');
    content = content.replace(/July 2017, Washington, DC, USA/g, '');

    fs.writeFileSync(texPath, content);
    console.log(`[PURGED] ${paperId}`);
}

console.log('--- Executing ACM Strict Footer Purge ---');
PAPERS.forEach(purgeFooter);
console.log('--- Purge Complete ---');
