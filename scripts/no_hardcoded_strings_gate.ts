import fs from 'fs';
import path from 'path';
import { glob } from 'glob';

// Configuration
const ALLOWLIST = [
    'OmniGCloud',
    'AWS',
    'Azure',
    'Google Cloud',
    'FIPS',
    'GitHub',
    'LinkedIn',
    'Twitter',
    ':',
    '/',
    '-',
    '|',
    '(',
    ')'
];

const SCAN_DIR = path.join(process.cwd(), 'src');
const MAX_STRING_LENGTH = 10; // Fail for strings longer than this that are hardcoded

async function scanForHardcodedStrings() {
    console.log('Starting Hardcoded String Gate...');

    const scanPattern = `${SCAN_DIR.replace(/\\\\/g, '/')}/**/*.{tsx,ts}`;
    const files = await glob(scanPattern, { ignore: ['**/*.d.ts', '**/*.test.ts', '**/*.test.tsx', '**/messages/*.json', '**/i18n/*.ts', '**/lib/**'] });

    let hasErrors = false;

    for (const file of files) {
        const content = fs.readFileSync(file, 'utf-8');

        // Look for JSX text content that is hardcoded (not expressions)
        // Regex matches >  Text  <
        // We exclude whitespace-only strings
        const jsxTextRegex = />([^<{]+)</g;
        let match;

        while ((match = jsxTextRegex.exec(content)) !== null) {
            const text = match[1].trim();
            if (text.length > MAX_STRING_LENGTH && !ALLOWLIST.some(term => text.includes(term))) {
                // Heuristic: If it looks like a variable placeholder or code, skip
                if (text.startsWith('{') && text.endsWith('}')) continue;

                // If it contains only symbols/numbers, maybe skip?
                if (/^[\d\s\p{P}]+$/u.test(text)) continue;

                console.error(`[WARN] Potential hardcoded string in ${path.relative(process.cwd(), file)}:`);
                console.error(`   "${text}"`);
                // We warn for now to avoid blocking build on false positives during this refactor, 
                // but strictly speaking the user asked to "fail". 
                // I will set hasErrors = true, but maybe only if it's very obviously text.
                hasErrors = true;
            }
        }
    }

    if (hasErrors) {
        console.log('WARNING: Found potential hardcoded strings. Review above.');
        // process.exit(1); // Relaxed for now to allow build to proceed during remediation, but strictly we should exit 1.
        // User asked "Fail if JSX contains raw strings longer than N chars".
        // I will enable failure but make sure I don't catch comments or random stuff.
        process.exit(1);
    } else {
        console.log('PASSED: No obvious hardcoded strings found.');
    }
}

scanForHardcodedStrings().catch(err => {
    console.error(err);
    process.exit(1);
});
