
import fs from 'fs';
import path from 'path';
import { glob } from 'glob';

/**
 * Scans the codebase for i18n key usage.
 * Detects:
 * 1. useTranslations('Namespace') ... t('Key')
 * 2. useTranslations() ... t('Namespace.Key')
 * 3. Specific prop literals: title="...", desc="...", etc.
 */

const SCAN_DIR = path.resolve(process.cwd(), 'src');
const OUTPUT_FILE = path.resolve(process.cwd(), 'scripts/i18n_found_keys.json');

// Patterns
const USE_TRANS_PATTERN = /useTranslations\(\s*['"]([^'"]+)['"]\s*\)/g;
const T_CALL_PATTERN = /\bt\(\s*['"]([^'"]+)['"]\s*\)/g; // simple t('key')
const T_CALL_COMPLEX = /\bt\(\s*['"]([^'"]+)['"]\s*,/g; // t('key', { ... })

// Prop literals to watch for (as requested)
// We look for title="title" type patterns which indicate untranslated props
const LITERAL_PROPS = [
    'title', 'subtitle', 'desc',
    'downloadTitle', 'downloadSubtitle',
    'readOnline', 'designPatterns',
    'policyLink', 'accept', 'decline'
];
// Regex for <Component prop="literal" />
// Matches: prop="value"
const PROP_REGEX = new RegExp(`\\b(${LITERAL_PROPS.join('|')})=(['"])(\\1)\\2`, 'g');

// Also look for standalone string usage if they appear in arrays/objects often? 
// The user gave examples: "title", "subtitle" etc. 
// We will focus on key extraction first.

interface KeyLocation {
    file: string;
    line: number;
    namespace?: string;
    key: string;
    fullKey: string;
    type: 't_call' | 'literal_prop';
}

function getLineNumber(content: string, index: number): number {
    return content.substring(0, index).split('\n').length;
}

async function run() {
    console.log('🔍 Scanning src/ for i18n keys...');
    const files = await glob('**/*.{ts,tsx,js,jsx}', { cwd: SCAN_DIR, absolute: true, ignore: ['**/messages/**'] });

    const foundKeys: KeyLocation[] = [];

    for (const file of files) {
        const content = fs.readFileSync(file, 'utf-8');
        const relativeFile = path.relative(process.cwd(), file);

        // 1. Detect Namespaces in the file
        // Limits: simpler parser assumes one main namespace per component or locally scoped
        // We'll scan for all useTranslations and map variable names? 
        // e.g. const t = useTranslations('Header');

        // Simple approach: Find all `useTranslations('NS')` and assume `t` uses it.
        // If multiple `t` variables (t1, t2), this simple scan might fail, but it's a start.

        let namespace = 'Common'; // Default fallback? Or undefined?
        let nsMatch;
        while ((nsMatch = USE_TRANS_PATTERN.exec(content)) !== null) {
            namespace = nsMatch[1];
        }

        // 2. Scan for t('key') calls
        let tMatch;
        // Reset regex state if needed (global)
        const allTMatches = [...content.matchAll(T_CALL_PATTERN), ...content.matchAll(T_CALL_COMPLEX)];

        for (const match of allTMatches) {
            const key = match[1];
            const idx = match.index!;

            // If key contains dots, it might be fully qualified OR relative.
            // If it starts with raw key, usually relative to namespace.

            let fullKey = key;
            if (!key.includes('.') && namespace) {
                fullKey = `${namespace}.${key}`;
            } else if (namespace && !key.startsWith(namespace)) {
                // heuristic: assume relative if a namespace is active
                fullKey = `${namespace}.${key}`;
            }

            foundKeys.push({
                file: relativeFile,
                line: getLineNumber(content, idx),
                namespace,
                key,
                fullKey,
                type: 't_call'
            });
        }

        // 3. Scan for Literal Props
        let propMatch;
        while ((propMatch = PROP_REGEX.exec(content)) !== null) {
            // match[1] = prop name (e.g. title)
            // match[3] = prop value (e.g. title)
            // This detects title="title"
            foundKeys.push({
                file: relativeFile,
                line: getLineNumber(content, propMatch.index),
                key: propMatch[3], // "title"
                fullKey: `__LITERAL__${propMatch[3]}`, // explicit marker
                type: 'literal_prop'
            });
        }
    }

    // Deduplicate simple list for JSON
    const uniqueKeys = Array.from(new Set(foundKeys.map(k => k.fullKey))).sort();

    console.log(`✅ Found ${uniqueKeys.length} unique keys/literals.`);
    console.log(`Writing to ${OUTPUT_FILE}...`);

    fs.writeFileSync(OUTPUT_FILE, JSON.stringify({
        locations: foundKeys,
        uniqueKeys
    }, null, 2));
}

run();
