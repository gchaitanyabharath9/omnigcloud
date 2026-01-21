const fs = require('fs');
const foundKeys = JSON.parse(fs.readFileSync('scripts/i18n_found_keys.json', 'utf8'));
const en = JSON.parse(fs.readFileSync('src/messages/en.json', 'utf8'));

// Manually list the keys that were still missing after the first run.
const remainingMissingHelper = [
    "Common.footer.authorshipDisclaimer",
    "Common.footer.authorshipRequest",
    "Common.footer.copyright",
    "Common.footer.lab",
    "Common.footer.links.finops",
    "Common.footer.links.modernization",
    "Common.footer.ready",
    "Common.footer.subtitle",
    "Common.footer.title",
    "Common.intro.quote"
];

function setDeep(obj, path, value) {
    const parts = path.split('.');
    let current = obj;
    for (let i = 0; i < parts.length - 1; i++) {
        const part = parts[i];
        if (current[part] === undefined) {
            current[part] = {};
        } else if (typeof current[part] !== 'object' || current[part] === null) {
            // If we encounter a primitive where we need an object (e.g. Common.footer="Footer Details" but we need Common.footer.title)
            // We must convert it to an object, but maybe preserve the original value in a special key?
            // Or just overwrite it because the structure implies it IS an object now.
            console.warn(`Converting primitive at ${path.split('.').slice(0, i + 1).join('.')} to object to support deeper key.`);
            current[part] = { "_value": current[part] };
        }
        current = current[part];
    }
    current[parts[parts.length - 1]] = value;
}

remainingMissingHelper.forEach(key => {
    const parts = key.split('.');
    const value = parts[parts.length - 1] + " Details";
    setDeep(en, key, value);
});

fs.writeFileSync('src/messages/en.json', JSON.stringify(en, null, 2));
console.log(`✅ Added ${remainingMissingHelper.length} remaining missing keys to en.json`);
