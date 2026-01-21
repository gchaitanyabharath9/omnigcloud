
import fs from 'fs';
import path from 'path';

const LOCALE_DIR = path.join(process.cwd(), 'src', 'messages');
const EN_PATH = path.join(LOCALE_DIR, 'en.json');
const TARGET_LOCALES = ['es', 'fr', 'de', 'zh', 'hi', 'ja', 'ko'];

// Minimal gate to ensure structure match
// returns 0 if all locales satisfy baseline, 1 otherwise.

function getKeys(obj: any, prefix = ''): string[] {
    let keys: string[] = [];
    for (const key in obj) {
        if (typeof obj[key] === 'object' && obj[key] !== null && !Array.isArray(obj[key])) {
            keys = keys.concat(getKeys(obj[key], prefix + key + '.'));
        } else {
            keys.push(prefix + key);
        }
    }
    return keys;
}

try {
    if (!fs.existsSync(EN_PATH)) {
        console.error('❌ EN source file missing!');
        process.exit(1);
    }

    const en = JSON.parse(fs.readFileSync(EN_PATH, 'utf-8'));
    const enKeys = new Set(getKeys(en));
    let hasError = false;

    TARGET_LOCALES.forEach(locale => {
        const p = path.join(LOCALE_DIR, `${locale}.json`);
        if (!fs.existsSync(p)) {
            console.error(`❌ Missing locale file: ${locale}.json`);
            hasError = true;
            return;
        }

        try {
            const loc = JSON.parse(fs.readFileSync(p, 'utf-8'));
            const locKeys = new Set(getKeys(loc));

            const missing = [...enKeys].filter(k => !locKeys.has(k));
            if (missing.length > 0) {
                console.error(`❌ ${locale} has ${missing.length} missing keys vs EN.`);
                // Optional: List top 5
                console.error(`   Example: ${missing.slice(0, 5).join(', ')}...`);
                hasError = true;
                // We might choose to NOT fail if we rely on runtime fallback, 
                // but robust gates usually require key presence to ensure at least English copy is there physically.
            } else {
                console.log(`✅ ${locale} matches EN key coverage.`);
            }

        } catch (e) {
            console.error(`❌ Invalid JSON in ${locale}.json`);
            hasError = true;
        }
    });

    if (hasError) {
        console.error('🚨 i18n Gate FAILED.');
        process.exit(1);
    } else {
        console.log('🟢 i18n Gate PASSED.');
        process.exit(0);
    }

} catch (e) {
    console.error('❌ Gate script crash:', e);
    process.exit(1);
}
