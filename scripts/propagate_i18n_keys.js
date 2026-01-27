const fs = require('fs');
const path = require('path');

// Load the English locale (source of truth)
const enJsonPath = path.join(__dirname, '..', 'src', 'messages', 'en.json');
const enJson = JSON.parse(fs.readFileSync(enJsonPath, 'utf8'));

// Get all locale files
const messagesDir = path.join(__dirname, '..', 'src', 'messages');
const localeFiles = fs.readdirSync(messagesDir).filter(f => f.endsWith('.json') && f !== 'en.json');

console.log(`📝 Found ${localeFiles.length} non-English locale files to update`);

// Function to recursively copy keys from source to target
function copyKeys(source, target, path = '') {
    for (const key in source) {
        const currentPath = path ? `${path}.${key}` : key;

        if (typeof source[key] === 'object' && source[key] !== null && !Array.isArray(source[key])) {
            // It's a nested object
            if (!target[key]) {
                target[key] = {};
            }
            copyKeys(source[key], target[key], currentPath);
        } else {
            // It's a leaf value - copy from English if missing
            if (!(key in target)) {
                target[key] = source[key];
                console.log(`  ✅ Added missing key: ${currentPath}`);
            }
        }
    }
}

let totalKeysAdded = 0;

// Update each locale file
for (const localeFile of localeFiles) {
    const localePath = path.join(messagesDir, localeFile);
    const localeJson = JSON.parse(fs.readFileSync(localePath, 'utf8'));

    console.log(`\n🔄 Processing ${localeFile}...`);

    // Copy missing keys from English
    copyKeys(enJson, localeJson);

    // Write back to file
    fs.writeFileSync(localePath, JSON.stringify(localeJson, null, 2), 'utf8');
    console.log(`  ✅ Updated ${localeFile}`);
}

console.log('\n✅ Successfully propagated all missing keys to all locale files');
console.log('📊 All locale files now have the same structure as en.json');
