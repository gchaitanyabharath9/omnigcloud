import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

// ESM path handling
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const ROOT_DIR = path.resolve(__dirname, '..');

const MESSAGES_DIR = path.join(ROOT_DIR, 'src/messages');
const EN_PATH = path.join(MESSAGES_DIR, 'en.json');

const BAD_PLACEHOLDERS = new Set([
    'title', 'subtitle', 'message', 'policyLink', 'accept', 'decline',
    'description', 'content', 'label', 'tag', 'placeholder', 'button'
]);

// Namespaces that MUST be correct now
const STRICT_NAMESPACES = ['Hero', 'CookieConsent', 'SEO_Content', 'Header', 'Footer', 'HomeSections', 'Products', 'WhitePaper', 'Capabilities', 'UseCases'];

function getBadKeys(obj: any, prefix = ''): string[] {
    const bad: string[] = [];
    for (const key in obj) {
        const fullKey = prefix ? `${prefix}.${key}` : key;
        const val = obj[key];

        if (typeof val === 'object' && val !== null) {
            bad.push(...getBadKeys(val, fullKey));
        } else if (typeof val === 'string') {
            const trimmed = val.trim();
            // 1. Value equals Key (e.g. "title": "title")
            // We only check this for non-leaf nodes typically, but here everything is leaf.
            // Exception: Some keys naturally equal their value? e.g. "OK": "OK". But "title": "title" is definitely wrong.
            if (trimmed === key && trimmed.length > 2) {
                bad.push(`${fullKey} (Value equals key)`);
            }
            // 2. Value is a known placeholder
            else if (BAD_PLACEHOLDERS.has(trimmed)) {
                bad.push(`${fullKey} (Value is forbidden placeholder "${trimmed}")`);
            }
            // 3. Known TODOs
            else if (trimmed.includes('[TODO]') || trimmed === '') {
                bad.push(`${fullKey} (Empty or TODO)`);
            }
        }
    }
    return bad;
}

function main() {
    console.log("🔍 i18n Quality Gate: Scanning en.json...");

    if (!fs.existsSync(EN_PATH)) {
        console.error("❌ en.json not found!");
        process.exit(1);
    }

    const json = JSON.parse(fs.readFileSync(EN_PATH, 'utf-8'));
    const badKeys = getBadKeys(json);

    const errors = badKeys.filter(k => STRICT_NAMESPACES.some(ns => k.startsWith(ns + '.') || k === ns));
    const warnings = badKeys.filter(k => !STRICT_NAMESPACES.some(ns => k.startsWith(ns + '.') || k === ns));

    if (warnings.length > 0) {
        console.warn(`⚠️ Found ${warnings.length} placeholder translations in non-strict namespaces (Technical Debt).`);
    }

    if (errors.length > 0) {
        console.error(`❌ Found ${errors.length} invalid translations in STRICT namespaces (${STRICT_NAMESPACES.join(', ')}):`);
        errors.forEach(e => console.error(`   - ${e}`));
        console.error("\nRun 'npm run qa:i18n:fill' or manually edit src/messages/en.json to fix.");
        process.exit(1);
    }

    console.log("✅ i18n Quality Gate Passed in Strict Namespaces.");
}

main();
