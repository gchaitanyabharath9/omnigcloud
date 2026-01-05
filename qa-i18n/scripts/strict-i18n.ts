import fs from 'fs';
import path from 'path';

const MESSAGES_DIR = path.join(process.cwd(), 'messages');
const TIER1_KEYS_PATH = path.join(process.cwd(), 'qa-i18n/scripts/tier1-keys.json');
const REPORT_PATH = path.join(process.cwd(), 'qa-i18n/i18n-report.md');
const LOCALES = ['de', 'en', 'es', 'fr', 'hi', 'ja', 'ko', 'zh'];
const DEFAULT_LOCALE = 'en';

const BLOCKLIST_PLACEHOLDERS = ["TODO", "TBD", "TRANSLATE", "__MISSING__", "MISSING"];
const BLOCKLIST_REGEX = /\[TODO\]|TODO:|\[MISSING\]/i;

interface ValidationError {
    locale: string;
    key: string;
    value: string;
    reason: string;
}

function getFlattenedMessages(obj: any, prefix = ''): Record<string, string> {
    const flattened: Record<string, string> = {};
    for (const key in obj) {
        const fullKey = prefix ? `${prefix}.${key}` : key;
        const val = obj[key];
        if (typeof val === 'object' && val !== null && !Array.isArray(val)) {
            Object.assign(flattened, getFlattenedMessages(val, fullKey));
        } else if (typeof val === 'string') {
            flattened[fullKey] = val;
        }
    }
    return flattened;
}

function validate() {
    console.log('🚀 Starting STRICT i18n Quality Gate...');

    if (!fs.existsSync(TIER1_KEYS_PATH)) {
        console.error('❌ Tier-1 keys list not found. Run generate-tier1.ts first.');
        process.exit(1);
    }

    const tier1Keys: string[] = JSON.parse(fs.readFileSync(TIER1_KEYS_PATH, 'utf-8'));
    const allErrors: ValidationError[] = [];

    // Load English as reference
    const enFilePath = path.join(MESSAGES_DIR, `${DEFAULT_LOCALE}.json`);
    const enMessages = getFlattenedMessages(JSON.parse(fs.readFileSync(enFilePath, 'utf-8')));

    LOCALES.forEach(locale => {
        if (locale === DEFAULT_LOCALE) return;

        const filePath = path.join(MESSAGES_DIR, `${locale}.json`);
        if (!fs.existsSync(filePath)) {
            allErrors.push({ locale, key: 'FILE', value: 'MISSING', reason: 'Translation file is missing' });
            return;
        }

        const messages = getFlattenedMessages(JSON.parse(fs.readFileSync(filePath, 'utf-8')));

        tier1Keys.forEach(key => {
            const val = messages[key];
            const enVal = enMessages[key];

            // 1. Existence Check
            if (val === undefined) {
                allErrors.push({ locale, key, value: 'UNDEFINED', reason: 'Key is missing' });
                return;
            }

            // 2. Non-empty Check
            const trimmed = val.trim();
            if (trimmed === '') {
                allErrors.push({ locale, key, value: 'EMPTY', reason: 'Value is empty' });
                return;
            }

            // 3. Not equal to key name
            if (trimmed === key) {
                allErrors.push({ locale, key, value: val, reason: 'Value is same as key name' });
                return;
            }

            // 4. Placeholder Checks
            const hasPlaceholder = BLOCKLIST_PLACEHOLDERS.some(p => trimmed.toUpperCase().includes(p)) || BLOCKLIST_REGEX.test(trimmed);
            if (hasPlaceholder) {
                allErrors.push({ locale, key, value: val, reason: 'Value contains placeholder/TODO string' });
                return;
            }

            // 5. English Fallback Check
            const BRAND_KEYS = ['Header.title'];
            if (enVal && trimmed === enVal.trim() && !BRAND_KEYS.includes(key)) {
                allErrors.push({ locale, key, value: val, reason: 'Value is identical to English (no fallback allowed)' });
                return;
            }
        });
    });

    // Generate Report
    const report: string[] = [
        '# STRICT i18n Quality Gate Report',
        '',
        `Generated on: ${new Date().toISOString()}`,
        '',
        allErrors.length === 0 ? '✅ **STATUS: PASS** - All Tier-1 keys are strictly translated.' : `❌ **STATUS: FAIL** - Found ${allErrors.length} validation errors.`,
        ''
    ];

    if (allErrors.length > 0) {
        const grouped = allErrors.reduce((acc, err) => {
            if (!acc[err.locale]) acc[err.locale] = [];
            acc[err.locale].push(err);
            return acc;
        }, {} as Record<string, ValidationError[]>);

        Object.entries(grouped).forEach(([locale, errors]) => {
            report.push(`## Locale: ${locale.toUpperCase()} (${errors.length} errors)`);
            report.push('| Key | Value | Reason |');
            report.push('| :--- | :--- | :--- |');
            errors.forEach(err => {
                report.push(`| \`${err.key}\` | \`${err.value}\` | ${err.reason} |`);
            });
            report.push('');
        });

        report.push('### How to fix:');
        report.push('1. Open `messages/{locale}.json`.');
        report.push('2. Provide a real, unique translation for the failing keys (no TODOs, no English copy).');
        report.push('3. Re-run `npm run qa:i18n`.');
    }

    fs.writeFileSync(REPORT_PATH, report.join('\n'));
    console.log(`\n📄 Report generated: ${REPORT_PATH}`);

    if (allErrors.length > 0) {
        console.error(`\n🔴 STRICT i18n GATE FAILED: Found ${allErrors.length} errors.`);
        process.exit(1);
    } else {
        console.log(`\n🟢 STRICT i18n GATE PASSED.`);
    }
}

validate();
