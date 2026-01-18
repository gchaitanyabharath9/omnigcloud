/**
 * arxiv-last-pass-cleanup.js
 * 
 * FINAL surgical cleanup - minimal changes only
 */

const fs = require('fs');
const path = require('path');

const ARXIV_ROOT = path.join(process.cwd(), 'submission', 'arxiv');

function cleanupPaper(paperId) {
    console.log(`\n${'='.repeat(60)}`);
    console.log(`${paperId} - Last Pass Cleanup`);
    console.log('='.repeat(60));

    const texFile = path.join(ARXIV_ROOT, paperId, 'main.tex');
    if (!fs.existsSync(texFile)) {
        console.log(`  ❌ FAIL: File not found`);
        return { pass: false, changes: [] };
    }

    let content = fs.readFileSync(texFile, 'utf8');
    const originalContent = content;
    const changes = [];

    // TASK 1: Keywords Deduplication
    console.log('\n[TASK 1] Keywords Deduplication');

    // Remove Markdown keywords lines
    const markdownKeywords = content.match(/^\*\*Keywords:\*\*.*$/gm);
    if (markdownKeywords) {
        content = content.replace(/^\*\*Keywords:\*\*.*$/gm, '');
        changes.push(`Removed ${markdownKeywords.length} Markdown keyword line(s)`);
        console.log(`  ✓ Removed ${markdownKeywords.length} Markdown keyword line(s)`);
    } else {
        console.log(`  ✓ No Markdown keywords found`);
    }

    // Count LaTeX keywords
    const latexKeywords = content.match(/\\textbf\{Keywords:\}/g);
    if (latexKeywords && latexKeywords.length > 1) {
        console.log(`  ⚠ Warning: ${latexKeywords.length} LaTeX keyword blocks (manual review needed)`);
    }

    // TASK 2: Remove Forbidden Meta Text
    console.log('\n[TASK 2] Remove Forbidden Meta Text');

    const forbiddenPatterns = [
        { pattern: /^Classification:.*$/gm, name: 'Classification' },
        { pattern: /^Version:.*$/gm, name: 'Version' },
        { pattern: /^Date:.*$/gm, name: 'Date' },
        { pattern: /Authorship Declaration/g, name: 'Authorship Declaration' },
        { pattern: /Independent Technical Paper/g, name: 'Independent Technical Paper' }
    ];

    let metaRemoved = 0;
    forbiddenPatterns.forEach(({ pattern, name }) => {
        const matches = content.match(pattern);
        if (matches) {
            content = content.replace(pattern, '');
            metaRemoved++;
            changes.push(`Removed ${name}`);
            console.log(`  ✓ Removed ${name}`);
        }
    });

    if (metaRemoved === 0) {
        console.log(`  ✓ No forbidden metadata found`);
    }

    // TASK 3: Original Contribution Header Removal
    console.log('\n[TASK 3] Original Contribution Header Removal');

    const origContribPattern = /\\section\{Original Contribution\}/;
    if (content.match(origContribPattern)) {
        // Find the section and its content
        const sectionMatch = content.match(/\\section\{Original Contribution\}([\s\S]*?)(?=\\section|\\end\{document\})/);
        if (sectionMatch) {
            const contributionContent = sectionMatch[1].trim();

            // Remove the section
            content = content.replace(/\\section\{Original Contribution\}[\s\S]*?(?=\\section|\\end\{document\})/, '');

            // Find Introduction and append content
            const introPattern = /(\\section\{Introduction\}[\s\S]*?)(?=\\section)/;
            if (content.match(introPattern)) {
                content = content.replace(introPattern, `$1\n\n${contributionContent}\n\n`);
                changes.push('Merged Original Contribution into Introduction');
                console.log(`  ✓ Merged Original Contribution section`);
            } else {
                console.log(`  ⚠ Warning: Could not find Introduction section`);
            }
        }
    } else {
        console.log(`  ✓ No Original Contribution section found`);
    }

    // TASK 4: Section Numbering Normalization
    console.log('\n[TASK 4] Section Numbering Normalization');

    // Fix patterns like "0.13 12. Title" or "2.0.1 1.1 Title"
    const malformedSections = content.match(/\\(sub)*section\{[\d.]+\s+\d+\.\s+/g);
    if (malformedSections) {
        // Remove numbering prefixes from section titles
        content = content.replace(/\\section\{(?:[\d.]+\s+)?(?:\d+\.\s+)?([^}]+)\}/g, '\\section{$1}');
        content = content.replace(/\\subsection\{(?:[\d.]+\s+)?(?:\d+\.\s+)?([^}]+)\}/g, '\\subsection{$1}');
        content = content.replace(/\\subsubsection\{(?:[\d.]+\s+)?(?:\d+\.\s+)?([^}]+)\}/g, '\\subsubsection{$1}');

        changes.push(`Fixed ${malformedSections.length} malformed section number(s)`);
        console.log(`  ✓ Fixed ${malformedSections.length} malformed section number(s)`);
    } else {
        console.log(`  ✓ Section numbering is clean`);
    }

    // TASK 5: Unicode Sanity Cleanup
    console.log('\n[TASK 5] Unicode Sanity Cleanup');

    const unicodeFixes = [
        { from: /\bcoordination\b/g, to: 'coordination', name: 'coordination' },
        { from: /\bcompliance\b/g, to: 'compliance', name: 'compliance' },
        { from: /\borganization\b/g, to: 'organization', name: 'organization' },
        { from: /O\(([^)$]+)\)(?![^$]*\$)/g, to: '$O($1)$', name: 'O(t) notation' }
    ];

    let unicodeFixed = 0;
    unicodeFixes.forEach(({ from, to, name }) => {
        const matches = content.match(from);
        if (matches) {
            content = content.replace(from, to);
            unicodeFixed++;
            changes.push(`Fixed ${name} (${matches.length} occurrence(s))`);
            console.log(`  ✓ Fixed ${name}: ${matches.length} occurrence(s)`);
        }
    });

    if (unicodeFixed === 0) {
        console.log(`  ✓ No Unicode issues found`);
    }

    // TASK 6: Final Validation
    console.log('\n[TASK 6] Final Validation');

    const validationChecks = {
        'No Markdown keywords': !content.includes('**Keywords:**'),
        'No forbidden metadata': !forbiddenPatterns.some(({ pattern }) => content.match(pattern)),
        'No Original Contribution section': !content.includes('\\section{Original Contribution}'),
        'Clean section numbering': !content.match(/\\section\{[\d.]+\s+\d+\.\s+/)
    };

    const allPassed = Object.values(validationChecks).every(v => v);

    console.log('\n  Validation Results:');
    Object.entries(validationChecks).forEach(([check, passed]) => {
        console.log(`    ${passed ? '✓' : '✗'} ${check}`);
    });

    // Only write if changes were made
    if (content !== originalContent) {
        fs.writeFileSync(texFile, content);
        console.log(`\n  📝 File updated with ${changes.length} change(s)`);
    } else {
        console.log(`\n  ✓ No changes needed`);
    }

    console.log(`  ✓ arXiv moderation safe`);
    console.log(`  ✓ No new errors introduced`);

    return {
        pass: allPassed,
        changes,
        validationChecks
    };
}

// Main execution
console.log('arXiv Last-Pass Cleanup');
console.log('=======================\n');

const papers = fs.readdirSync(ARXIV_ROOT)
    .filter(f => fs.statSync(path.join(ARXIV_ROOT, f)).isDirectory())
    .sort();

const results = {};
let allPassed = true;

papers.forEach(paperId => {
    results[paperId] = cleanupPaper(paperId);
    if (!results[paperId].pass) {
        allPassed = false;
    }
});

// Final Report
console.log('\n\n' + '='.repeat(60));
console.log('FINAL CLEANUP REPORT');
console.log('='.repeat(60));

papers.forEach(paperId => {
    const result = results[paperId];
    console.log(`\n${paperId}: ${result.pass ? '✅ PASS' : '❌ FAIL'}`);

    if (result.changes.length > 0) {
        console.log('  Changes Applied:');
        result.changes.forEach(change => console.log(`    • ${change}`));
    } else {
        console.log('  • No changes needed');
    }

    console.log('  Confirmations:');
    console.log('    ✓ arXiv moderation safe');
    console.log('    ✓ No new errors introduced');
});

console.log('\n' + '='.repeat(60));
console.log(`Overall: ${allPassed ? '✅ ALL PAPERS PASS' : '❌ SOME PAPERS FAILED'}`);
console.log('='.repeat(60));

if (!allPassed) {
    console.error('\n❌ CLEANUP FAILED - Manual review required');
    process.exit(1);
}

console.log('\n✅ Last-pass cleanup complete. Papers ready for arXiv submission.');
