const fs = require('fs');
const path = require('path');

const locales = ['es', 'fr', 'de', 'zh', 'hi', 'ja', 'ko'];
const enPath = path.join(process.cwd(), 'src/messages/en.json');
const enContent = JSON.parse(fs.readFileSync(enPath, 'utf8'));

// Keys to sync
const keysToSync = [
    ['Docs', 'sidebar'],
    ['Enrichment'],
    ['SEO_Content', 'Products', 'HowItWorks']
];

function getNested(obj, pathArr) {
    return pathArr.reduce((acc, key) => (acc && acc[key] !== 'undefined') ? acc[key] : undefined, obj);
}

function setNested(obj, pathArr, value) {
    let current = obj;
    for (let i = 0; i < pathArr.length - 1; i++) {
        const key = pathArr[i];
        if (!current[key]) current[key] = {};
        current = current[key];
    }
    current[pathArr[pathArr.length - 1]] = value;
}

locales.forEach(locale => {
    const filePath = path.join(process.cwd(), 'src/messages', `${locale}.json`);
    if (fs.existsSync(filePath)) {
        let content = JSON.parse(fs.readFileSync(filePath, 'utf8'));

        keysToSync.forEach(keyPath => {
            const enValue = getNested(enContent, keyPath);
            if (enValue) {
                // Determine if we should deep merge or replace
                // For 'Docs.sidebar' and 'Enrichment', replacing entire block is safe as they are new/structural.
                // For 'SEO_Content.Products.HowItWorks', replacing block is also safe as we want to ensure structure parity.
                setNested(content, keyPath, enValue);
            }
        });

        fs.writeFileSync(filePath, JSON.stringify(content, null, 2));
        console.log(`Synced keys to ${locale}.json`);
    }
});
