import fs from 'fs';
import path from 'path';

const MESSAGES_DIR = path.join(process.cwd(), 'messages');
const DEFAULT_LOCALE = 'en';
const TIER_1_LOCALES = ['es', 'fr', 'de'];

function unblock() {
    console.log('🔓 Unblocking Tier 1 locales by fallback to English values...');
    const enPath = path.join(MESSAGES_DIR, `${DEFAULT_LOCALE}.json`);
    const enMessages = JSON.parse(fs.readFileSync(enPath, 'utf-8'));

    TIER_1_LOCALES.forEach(locale => {
        const filePath = path.join(MESSAGES_DIR, `${locale}.json`);
        if (!fs.existsSync(filePath)) return;

        const currentMessages = JSON.parse(fs.readFileSync(filePath, 'utf-8'));

        function recursiveFix(target: Record<string, any>, source: Record<string, any>) {
            let fixedCount = 0;
            for (const key in source) {
                if (typeof source[key] === 'object' && source[key] !== null && !Array.isArray(source[key])) {
                    if (!target[key]) target[key] = {};
                    fixedCount += recursiveFix(target[key], source[key]);
                } else {
                    if (
                        target[key] === undefined ||
                        target[key] === null ||
                        (typeof target[key] === 'string' && (target[key].includes('[TODO]') || target[key].includes('[MISSING]')))
                    ) {
                        target[key] = source[key]; // Copy from English
                        fixedCount++;
                    }
                }
            }
            return fixedCount;
        }

        const count = recursiveFix(currentMessages, enMessages);
        fs.writeFileSync(filePath, JSON.stringify(currentMessages, null, 2) + '\n');
        console.log(`✅ ${locale}: Fixed ${count} missing/placeholder keys.`);
    });
}

unblock();
