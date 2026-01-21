
import fs from 'fs';
import path from 'path';

/**
 * Syncs keys from en.json to all other locale files.
 * Aggressively overwrites placeholders and [TODO] items with English values.
 */

const MESSAGES_DIR = path.resolve(process.cwd(), 'src/messages');
const EN_FILE = path.join(MESSAGES_DIR, 'en.json');

// Helper to sort keys
function sortKeys(obj: any): any {
    if (typeof obj !== 'object' || obj === null) return obj;
    if (Array.isArray(obj)) return obj.map(sortKeys);

    return Object.keys(obj).sort().reduce((acc: any, key) => {
        acc[key] = sortKeys(obj[key]);
        return acc;
    }, {});
}

function isPlaceholder(val: string, key?: string): boolean {
    if (typeof val !== 'string') return false;
    val = val.trim();
    return (
        val === '' ||
        val.includes('[TODO]') ||
        val.includes('TBD') ||
        val.includes('[MISSING]') ||
        val.startsWith('[TODO_TRANSLATE]') ||
        val === key // strict literal match
    );
}

async function run() {
    console.log('🔄 Syncing locales from en.json (Aggressive)...');

    if (!fs.existsSync(EN_FILE)) {
        console.error('❌ en.json not found!');
        process.exit(1);
    }

    const enContent = JSON.parse(fs.readFileSync(EN_FILE, 'utf-8'));
    const files = fs.readdirSync(MESSAGES_DIR).filter(f => f.endsWith('.json') && f !== 'en.json');

    for (const file of files) {
        const filePath = path.join(MESSAGES_DIR, file);
        console.log(`Processing ${file}...`);

        let content = {};
        try {
            content = JSON.parse(fs.readFileSync(filePath, 'utf-8'));
        } catch (e) {
            console.warn(`Could not parse ${file}, starting with empty object.`);
        }

        function sync(enObj: any, targetObj: any) {
            for (const key in enObj) {
                // Case 1: Key missing in target -> Copy
                if (targetObj[key] === undefined) {
                    targetObj[key] = enObj[key];
                }
                // Case 2: Both are objects -> Recurse
                else if (typeof enObj[key] === 'object' && enObj[key] !== null && !Array.isArray(enObj[key])) {
                    if (typeof targetObj[key] !== 'object' || targetObj[key] === null) {
                        targetObj[key] = enObj[key];
                    } else {
                        sync(enObj[key], targetObj[key]);
                    }
                }
                // Case 3: Target is string, but might be placeholder -> Overwrite
                else if (typeof targetObj[key] === 'string') {
                    if (isPlaceholder(targetObj[key], key)) {
                        targetObj[key] = enObj[key];
                    }
                }
            }
        }

        sync(enContent, content);

        // Sort keys
        const sorted = sortKeys(content);

        fs.writeFileSync(filePath, JSON.stringify(sorted, null, 2));
    }

    console.log(`✅ Synced ${files.length} locale files.`);
}

run();
