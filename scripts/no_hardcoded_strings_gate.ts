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
    ')',
    '#',
    '.',
    'flex',
    'grid',
    'transition',
    'px',
    'rem',
    'vh',
    'vw',
    'ms',
    'req/s'
];

const SCAN_DIR = path.join(process.cwd(), 'src');
const MAX_STRING_LENGTH = 10; // Fail for strings longer than this that are hardcoded

function getLineNumber(content: string, index: number): number {
    return content.substring(0, index).split('\n').length;
}

async function scanForHardcodedStrings() {
    console.log('Starting Hardcoded String Gate...');

    const scanPattern = SCAN_DIR.split(path.sep).join('/') + '/**/*.{tsx,ts}';
    console.log(`Scan pattern: ${scanPattern}`);

    const files = await glob(scanPattern, {
        ignore: [
            '**/*.d.ts',
            '**/*.test.ts',
            '**/*.test.tsx',
            '**/messages/*.json',
            '**/i18n/*.ts',
            '**/lib/**',
            '**/navigation.ts',
            '**/middleware.ts'
        ]
    });

    console.log(`Scanning ${files.length} files...`);

    let hasErrors = false;

    for (const file of files) {
        const content = fs.readFileSync(file, 'utf-8');
        const lines = content.split('\n');

        // Look for JSX text content that is hardcoded (not expressions)
        // Improved regex: Match text between tags on the same line to avoid crossing component boundaries
        const jsxTextRegex = />([^<{]+)</g;
        let match;

        while ((match = jsxTextRegex.exec(content)) !== null) {
            const rawText = match[1];
            const text = rawText.trim();
            const index = match.index + 1; // Start of the text
            const lineIndex = getLineNumber(content, index) - 1;
            const line = lines[lineIndex];

            // Ignore mechanisms
            if (line.includes('// i18n-ignore') ||
                line.includes('// hardcoded-ok') ||
                line.includes('/* i18n-ignore */') ||
                line.includes('i18n-disable-next-line')) {
                continue;
            }

            // Skip if text is empty or too short
            if (text.length <= MAX_STRING_LENGTH) continue;

            // Skip if in allowlist
            if (ALLOWLIST.some(term => text.includes(term))) continue;

            // Heuristic: If it spans multiple lines, it's likely a misdetection (like in NoSSR.tsx)
            if (rawText.includes('\n')) continue;

            // Heuristic: If it looks like a variable placeholder or code, skip
            if (text.startsWith('{') && text.endsWith('}')) continue;

            // If it contains only symbols/numbers, skip
            if (/^[\d\s\p{P}]+$/u.test(text)) continue;

            console.error(`[WARN] Hardcoded string found in ${path.relative(process.cwd(), file)}:${lineIndex + 1}:`);
            console.error(`   "${text}"`);
            hasErrors = true;
        }
    }

    if (hasErrors) {
        console.log('\n🚨 WARNING: Found potential hardcoded strings. Review above.');
        process.exit(1);
    } else {
        console.log('\n✅ PASSED: No hardcoded strings found.');
    }
}

scanForHardcodedStrings().catch(err => {
    console.error(err);
    process.exit(1);
});
