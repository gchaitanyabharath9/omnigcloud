/**
 * i18n Key Health Check
 * Ensures all locale files have the same keys as the primary locale (en).
 */
import fs from 'fs';
import path from 'path';

const MESSAGES_DIR = path.join(process.cwd(), 'messages');
const PRIMARY_LOCALE = 'en';

function getFlattenedKeys(obj: any, prefix = ''): string[] {
    return Object.keys(obj).reduce((res: string[], el) => {
        if (typeof obj[el] === 'object' && obj[el] !== null && !Array.isArray(obj[el])) {
            return [...res, ...getFlattenedKeys(obj[el], prefix + el + '.')];
        }
        return [...res, prefix + el];
    }, []);
}

function checkLocaleParity() {
    console.log('--- i18n Key Health Check ---');

    const enPath = path.join(MESSAGES_DIR, `${PRIMARY_LOCALE}.json`);
    if (!fs.existsSync(enPath)) {
        console.error(`Primary locale file missing: ${enPath}`);
        process.exit(1);
    }

    const enContent = JSON.parse(fs.readFileSync(enPath, 'utf8'));
    const enKeys = getFlattenedKeys(enContent);
    const enKeySet = new Set(enKeys);

    let totalMissing = 0;
    const files = fs.readdirSync(MESSAGES_DIR).filter(f => f.endsWith('.json') && f !== 'en.json');

    files.forEach(file => {
        const locale = file.replace('.json', '');
        const content = JSON.parse(fs.readFileSync(path.join(MESSAGES_DIR, file), 'utf8'));
        const keys = new Set(getFlattenedKeys(content));

        const missing = enKeys.filter(k => !keys.has(k));

        if (missing.length > 0) {
            console.error(`\x1b[31m[MISSING KEYS] ${locale}: ${missing.length} keys missing\x1b[0m`);
            // List first 5 missing keys
            missing.slice(0, 5).forEach(k => console.error(`  - ${k}`));
            if (missing.length > 5) console.error(`  ... and ${missing.length - 5} more`);
            totalMissing += missing.length;
        } else {
            console.log(`\x1b[32m[OK] ${locale}: 100% key parity\x1b[0m`);
        }
    });

    if (totalMissing > 0) {
        console.error(`\n❌ Found ${totalMissing} total missing i18n keys.`);
        process.exit(1);
    } else {
        console.log('\n✅ All locales are synchronized.');
        process.exit(0);
    }
}

checkLocaleParity();
