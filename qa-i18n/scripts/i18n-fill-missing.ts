import fs from 'fs';
import path from 'path';

const MESSAGES_DIR = path.join(process.cwd(), 'src/messages');

const DEFAULT_LOCALE = 'en';
const LOCALES = ['es', 'fr', 'de', 'zh', 'hi', 'ja', 'ko'];
const PREFIX = '[TODO_TRANSLATE] ';

interface MessageNode {
    [key: string]: any;
}

function deepMergeAndFill(target: MessageNode, source: MessageNode, enSource: MessageNode): { merged: MessageNode, addedCount: number } {
    const merged: MessageNode = {};
    let addedCount = 0;

    // Deterministic ordering: Use keys from enSource (source of truth) and sort them
    const sortedKeys = Object.keys(enSource).sort();

    for (const key of sortedKeys) {
        if (typeof enSource[key] === 'object' && enSource[key] !== null && !Array.isArray(enSource[key])) {
            const result = deepMergeAndFill(target[key] || {}, source[key] || {}, enSource[key]);
            merged[key] = result.merged;
            addedCount += result.addedCount;
        } else {
            if (source[key] === undefined || source[key] === null) {
                merged[key] = `${PREFIX}${enSource[key]}`;
                addedCount++;
            } else {
                merged[key] = source[key];
            }
        }
    }
    return { merged, addedCount };
}

function fillMissing() {
    console.log('🚀 Starting i18n Auto-Fill...');
    const enPath = path.join(MESSAGES_DIR, `${DEFAULT_LOCALE}.json`);
    const enMessages = JSON.parse(fs.readFileSync(enPath, 'utf-8'));

    LOCALES.forEach(locale => {
        const filePath = path.join(MESSAGES_DIR, `${locale}.json`);
        const currentMessages = fs.existsSync(filePath)
            ? JSON.parse(fs.readFileSync(filePath, 'utf-8'))
            : {};

        const { merged, addedCount } = deepMergeAndFill({}, currentMessages, enMessages);

        if (addedCount > 0) {
            fs.writeFileSync(filePath, JSON.stringify(merged, null, 2) + '\n');
            console.log(`✅ ${locale}: Added ${addedCount} missing keys with TODO prefix.`);
        } else {
            console.log(`✨ ${locale}: Already up to date.`);
        }
    });

    console.log('\n🏁 Auto-fill complete. Please review marked items in your JSON files.');
}

fillMissing();
