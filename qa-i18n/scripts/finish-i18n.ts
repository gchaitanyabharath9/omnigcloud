import fs from 'fs';
import path from 'path';

const MESSAGES_DIR = path.join(process.cwd(), 'messages');
const EN_PATH = path.join(MESSAGES_DIR, 'en.json');

function finish() {
    const en = JSON.parse(fs.readFileSync(EN_PATH, 'utf-8'));
    const locales = ['es', 'fr', 'de', 'zh', 'hi', 'ja', 'ko'];

    function getFlatKeys(obj: Record<string, any>, prefix = '') {
        let keys: string[] = [];
        for (const key in obj) {
            const fullKey = prefix ? `${prefix}.${key}` : key;
            if (typeof obj[key] === 'object' && obj[key] !== null && !Array.isArray(obj[key])) {
                keys = keys.concat(getFlatKeys(obj[key], fullKey));
            } else {
                keys.push(fullKey);
            }
        }
        return keys;
    }

    const enKeys = new Set(getFlatKeys(en));

    locales.forEach(locale => {
        const filePath = path.join(MESSAGES_DIR, `${locale}.json`);
        if (!fs.existsSync(filePath)) return;

        const data = JSON.parse(fs.readFileSync(filePath, 'utf-8'));

        // 1. Remove keys not in en.json
        function prune(obj: Record<string, any>, prefix = '') {
            for (const key in obj) {
                const fullKey = prefix ? `${prefix}.${key}` : key;
                if (typeof obj[key] === 'object' && obj[key] !== null && !Array.isArray(obj[key])) {
                    prune(obj[key], fullKey);
                    if (Object.keys(obj[key]).length === 0) {
                        delete obj[key];
                    }
                } else {
                    if (!enKeys.has(fullKey)) {
                        delete obj[key];
                    }
                }
            }
        }
        prune(data);

        // 2. Sync from en.json (add missing, replace TODOs)
        function sync(target: Record<string, any>, source: Record<string, any>) {
            for (const key in source) {
                if (typeof source[key] === 'object' && source[key] !== null && !Array.isArray(source[key])) {
                    if (!target[key]) {
                        target[key] = {};
                    }
                    sync(target[key], source[key]);
                } else {
                    if (target[key] === undefined || (typeof target[key] === 'string' && target[key].includes('[TODO'))) {
                        target[key] = source[key];
                    }
                }
            }
        }
        sync(data, en);

        fs.writeFileSync(filePath, JSON.stringify(data, null, 2) + '\n');
        console.log(`✅ ${locale}: Fully pruned, synced and cleaned.`);
    });
}

finish();
