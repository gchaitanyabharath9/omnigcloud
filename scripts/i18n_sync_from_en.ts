
import fs from 'fs';
import path from 'path';

const LOCALE_DIR = path.join(process.cwd(), 'src', 'messages');
const EN_PATH = path.join(LOCALE_DIR, 'en.json');
const TARGET_LOCALES = ['es', 'fr', 'de', 'zh', 'hi', 'ja', 'ko'];

function isObject(item: any) {
    return (item && typeof item === 'object' && !Array.isArray(item));
}

// Deep merge that only fills MISSING keys in target from source
// source is EN (truth), target is LOCALE
function mergeMissing(target: any, source: any): any {
    if (!target) return source;

    const output = Object.assign({}, target);

    if (isObject(target) && isObject(source)) {
        Object.keys(source).forEach(key => {
            if (isObject(source[key])) {
                if (!(key in target)) {
                    // Key missing in target, take whole object from source
                    Object.assign(output, { [key]: source[key] });
                } else {
                    // Key exists, recurse
                    output[key] = mergeMissing(target[key], source[key]);
                }
            } else {
                // Primitive
                if (!(key in target)) {
                    Object.assign(output, { [key]: source[key] });
                }
            }
        });
    }
    return output;
}

try {
    if (!fs.existsSync(EN_PATH)) {
        console.error('❌ EN source file not found:', EN_PATH);
        process.exit(1);
    }

    const enContent = JSON.parse(fs.readFileSync(EN_PATH, 'utf-8'));
    console.log('✅ Loaded EN source of truth');

    TARGET_LOCALES.forEach(locale => {
        const localePath = path.join(LOCALE_DIR, `${locale}.json`);
        let localeContent = {};

        if (fs.existsSync(localePath)) {
            try {
                localeContent = JSON.parse(fs.readFileSync(localePath, 'utf-8'));
            } catch (_e) {
                console.warn(`⚠️ Could not parse ${locale}.json, starting fresh.`);
            }
        } else {
            console.log(`ℹ️ Creating new ${locale}.json`);
        }

        const merged = mergeMissing(localeContent, enContent);

        // Check if we actually added anything (optional, but good for logging)
        // For now just write it.

        fs.writeFileSync(localePath, JSON.stringify(merged, null, 2) + '\n');
        console.log(`✨ Synced ${locale}`);
    });

    console.log('🎉 All locales synced with EN structure.');

} catch (error) {
    console.error('❌ Sync failed:', error);
    process.exit(1);
}
