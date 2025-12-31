import fs from 'fs';
import path from 'path';

const MESSAGES_DIR = path.join(process.cwd(), 'messages');
const DEFAULT_LOCALE = 'en';
const LOCALES = ['en', 'es', 'fr', 'de', 'zh', 'hi', 'ja', 'ko'];
const ALLOWLIST_PATH = path.join(process.cwd(), 'qa-i18n/i18n-allowlist.json');

// Tiers Definition
const TIERS = {
    TIER_1: ['en', 'es', 'fr', 'de'], // BLOCK RELEASE
    TIER_2: ['zh', 'hi', 'ja', 'ko'], // WARN ONLY (within threshold)
};

const TIER_2_THRESHOLD = 150;

interface KeyResult {
    all: string[];
    untranslated: string[];
}

function getKeysInfo(obj: any, prefix = ''): KeyResult {
    let all: string[] = [];
    let untranslated: string[] = [];

    for (const key in obj) {
        const fullKey = prefix ? `${prefix}.${key}` : key;
        const val = obj[key];

        if (typeof val === 'object' && val !== null && !Array.isArray(val)) {
            const nested = getKeysInfo(val, fullKey);
            all = [...all, ...nested.all];
            untranslated = [...untranslated, ...nested.untranslated];
        } else {
            all.push(fullKey);
            if (typeof val === 'string' && val.startsWith('[TODO_TRANSLATE] ')) {
                untranslated.push(fullKey);
            }
        }
    }
    return { all, untranslated };
}

function checkCoverage() {
    console.log('🧐 Auditing i18n coverage against gating policies...');

    let enMessages;
    try {
        enMessages = JSON.parse(fs.readFileSync(path.join(MESSAGES_DIR, `${DEFAULT_LOCALE}.json`), 'utf-8'));
    } catch (e) {
        console.error('❌ Failed to load base locale (en.json)');
        process.exit(1);
    }

    const { all: defaultKeys } = getKeysInfo(enMessages);
    const allowlist = fs.existsSync(ALLOWLIST_PATH) ? JSON.parse(fs.readFileSync(ALLOWLIST_PATH, 'utf-8')) : [];

    const report: string[] = [`# i18n Coverage Report\n\nGenerated on ${new Date().toISOString()}\n`];
    report.push(`**Base Locale:** ${DEFAULT_LOCALE} (${defaultKeys.length} keys)\n`);

    let globalFail = false;
    const failures: string[] = [];

    LOCALES.forEach(locale => {
        if (locale === DEFAULT_LOCALE) return;

        const filePath = path.join(MESSAGES_DIR, `${locale}.json`);
        if (!fs.existsSync(filePath)) {
            report.push(`## ❌ ${locale}: FILE MISSING`);
            if (TIERS.TIER_1.includes(locale)) {
                globalFail = true;
                failures.push(`${locale} (Tier 1 missing file)`);
            }
            return;
        }

        const messages = JSON.parse(fs.readFileSync(filePath, 'utf-8'));
        const { all: localeKeys, untranslated: localeUntranslated } = getKeysInfo(messages);

        // Filter out keys that are on the allowlist
        const filteredLocaleKeys = localeKeys.filter(k => !allowlist.includes(`${locale}:${k}`));
        const filteredUntranslated = localeUntranslated.filter(k => !allowlist.includes(`${locale}:${k}`));

        // "Missing" means either totally missing from JSON OR present but with TODO prefix
        const missingFromStructure = defaultKeys.filter(k => !filteredLocaleKeys.includes(k) && !allowlist.includes(`${locale}:${k}`));
        const totalMissing = [...new Set([...missingFromStructure, ...filteredUntranslated])];

        const isTier1 = TIERS.TIER_1.includes(locale);
        let status = '✅ PASS';
        let icon = '✅';

        if (isTier1 && totalMissing.length > 0) {
            status = '❌ FAIL (Tier 1 Blocked)';
            icon = '❌';
            globalFail = true;
            failures.push(`${locale} (${totalMissing.length} missing/untranslated keys in Tier 1)`);
        } else if (!isTier1 && totalMissing.length > TIER_2_THRESHOLD) {
            status = `❌ FAIL (Tier 2 Exceeded Threshold ${TIER_2_THRESHOLD})`;
            icon = '❌';
            globalFail = true;
            failures.push(`${locale} (${totalMissing.length} missing/untranslated keys in Tier 2)`);
        } else if (!isTier1 && totalMissing.length > 0) {
            status = '⚠️ WARN (Within Threshold)';
            icon = '⚠️';
        }

        report.push(`## ${icon} ${locale} - ${status}`);
        report.push(`- **Tier:** ${isTier1 ? '1 (Strict)' : '2 (Relaxed)'}`);
        report.push(`- **Total Keys:** ${localeKeys.length}`);
        report.push(`- **Missing/Untranslated Keys:** ${totalMissing.length}`);

        if (totalMissing.length > 0) {
            report.push(`\n<details><summary>View Missing/Untranslated Keys</summary>\n\n\`\`\`\n${totalMissing.join('\n')}\n\`\`\`\n</details>\n`);
        }
    });

    const reportPath = path.join(process.cwd(), 'qa-i18n/i18n-report.md');
    fs.writeFileSync(reportPath, report.join('\n'));

    console.log(`\n📄 Report generated: ${reportPath}`);

    if (globalFail) {
        console.error(`\n🔴 PRE-RELEASE GATE FAILED:`);
        failures.forEach(f => console.error(`   - ${f}`));
        process.exit(1);
    } else {
        console.log(`\n🟢 PRE-RELEASE GATE PASSED.`);
    }
}

checkCoverage();
