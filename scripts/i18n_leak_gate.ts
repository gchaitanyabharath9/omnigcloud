
import fs from 'fs';
import path from 'path';

/**
 * i18n Leak Gate (Dependency-free version)
 * Scans build output for literal string keys that indicate missing translations.
 */

const BUILD_DIR = path.resolve(process.cwd(), '.next/server/app');
const ERROR_PATTERNS = [
    // Namespaced keys appearing literally (high confidence leak)
    /SEO_Content\.[A-Za-z0-9_.-]+/,
    /Products\.[A-Za-z0-9_.-]+/,
    /Header\.[A-Za-z0-9_.-]+/,
    /WhitePaper\.[A-Za-z0-9_.-]+/,
    /CookieConsent\.[A-Za-z0-9_.-]+/,
    /SOVEREIGNNOTICE/, // Specific to user request

    // Specific CamelCase keys that are definitely not English prose
    /\b(downloadTitle|downloadSubtitle|readOnline|designPatterns|policyLink)\b/,

    // Common placeholder literals (riskier, need context)
    // We look for these wrapped in specific HTML-like structures or standalone
    // e.g. ">title<", ">desc<", "placeholder="title""
    // We specifically look for them as distinct words or within quotes in JSON-like structures
    />\s*title\s*</,
    />\s*subtitle\s*</,
    />\s*desc\s*</,
    />\s*check\s*</,
    />\s*accept\s*</,
    />\s*decline\s*</,

    // JSON payload leakage (common in Flight data)
    /"title"\s*:\s*"title"/,
    /"subtitle"\s*:\s*"subtitle"/,
    /"desc"\s*:\s*"desc"/,
    /"cta"\s*:\s*"cta"/,
    /"content"\s*:\s*"content"/,
];

// Exemptions (files or patterns to ignore)
const IGNORE_FILES = [
    'en.json',
    '.map',
    '.css',
    '.js.map'
];

function getFiles(dir: string, fileList: string[] = []) {
    if (!fs.existsSync(dir)) return fileList;
    const files = fs.readdirSync(dir);
    for (const file of files) {
        const filePath = path.join(dir, file);
        if (fs.statSync(filePath).isDirectory()) {
            getFiles(filePath, fileList);
        } else {
            // Check HTML and RSC (flight) files
            if (file.endsWith('.html') || file.endsWith('.rsc') || (file.endsWith('.json') && file.includes('flight'))) {
                fileList.push(filePath);
            }
        }
    }
    return fileList;
}

async function run() {
    console.log('🔍 Starting i18n Leak Gate...');
    console.log(`   Scanning: ${BUILD_DIR}`);

    if (!fs.existsSync(BUILD_DIR)) {
        console.error(`❌ Build directory not found: ${BUILD_DIR}`);
        console.error('Run "npm run build" first.');
        process.exit(1);
    }

    // Find all HTML and RSC files
    const files = getFiles(BUILD_DIR);
    console.log(`   Found ${files.length} files to scan.`);

    let failures = 0;

    for (const file of files) {
        if (IGNORE_FILES.some(ignore => file.includes(ignore))) continue;

        const content = fs.readFileSync(file, 'utf-8');

        for (const pattern of ERROR_PATTERNS) {
            if (pattern.test(content)) {
                // print context
                const match = content.match(pattern);
                if (match) {
                    console.error(`\n🚨 LEAK DETECTED in: ${path.relative(process.cwd(), file)}`);
                    console.error(`   Pattern: ${pattern}`);
                    console.error(`   Match: "${match[0]}"`);

                    // Show snippet
                    const idx = match.index!;
                    const start = Math.max(0, idx - 100);
                    const end = Math.min(content.length, idx + 100);
                    console.error(`   Context: ...${content.slice(start, end).replace(/\n/g, ' ')}...`);

                    failures++;
                }
            }
        }
    }

    if (failures > 0) {
        console.error(`\n❌ i18n Leak Gate FAILED with ${failures} leaks.`);
        process.exit(1);
    } else {
        console.log('\n✅ i18n Leak Gate PASSED. No leaked keys found.');
        process.exit(0);
    }
}

run().catch(err => {
    console.error(err);
    process.exit(1);
});
