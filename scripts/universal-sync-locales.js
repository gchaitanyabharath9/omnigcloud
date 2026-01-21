const fs = require('fs');
const path = require('path');

const MESSAGES_DIR = path.join('src', 'messages');
const EN_PATH = path.join(MESSAGES_DIR, 'en.json');
const TARGET_LOCALES = ['es', 'fr', 'de', 'zh', 'hi', 'ja', 'ko'];

console.log('🔄 Starting Universal i18n Sync (STRICT MODE)...');

if (!fs.existsSync(EN_PATH)) {
    console.error('❌ FATAL: en.json not found.');
    process.exit(1);
}

const enData = JSON.parse(fs.readFileSync(EN_PATH, 'utf8'));

// Deep Sync Function
function syncObjects(source, target, keysAdded) {
    // If source is null/undefined, nothing to sync
    if (source === null || source === undefined) return target;

    // Handle primitives/arrays (Leaf nodes in structure check)
    if (typeof source !== 'object' || Array.isArray(source)) {
        if (target === undefined) {
            keysAdded.count++;
            return JSON.parse(JSON.stringify(source)); // Deep copy value
        }
        return target; // Preserve existing
    }

    // Source is an Object
    // If target is missing or not an object, initialize it
    if (target === undefined || typeof target !== 'object' || Array.isArray(target)) {
        target = {};
    }

    for (const key of Object.keys(source)) {
        target[key] = syncObjects(source[key], target[key], keysAdded);
    }

    return target;
}

const summary = {};

TARGET_LOCALES.forEach(locale => {
    const localePath = path.join(MESSAGES_DIR, `${locale}.json`);
    let localeData = {};
    if (fs.existsSync(localePath)) {
        try {
            localeData = JSON.parse(fs.readFileSync(localePath, 'utf8'));
        } catch (e) {
            console.error(`❌ Error parsing ${locale}.json: ${e.message}. resetting.`);
            localeData = {};
        }
    }

    const keysAdded = { count: 0 };
    localeData = syncObjects(enData, localeData, keysAdded);

    fs.writeFileSync(localePath, JSON.stringify(localeData, null, 2));
    summary[locale] = keysAdded.count;
    console.log(`✅ Synced ${locale}.json (+${keysAdded.count} keys)`);
});

console.log('--- SYNC COMPLETE ---');
console.log('Summary:', JSON.stringify(summary, null, 2));
console.log('🟢 i18n gate should now pass.');
