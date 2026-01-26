const fs = require('fs');
const path = require('path');

const messagesDir = path.join(__dirname, '../src/messages');
const enPath = path.join(messagesDir, 'en.json');
let en = JSON.parse(fs.readFileSync(enPath, 'utf8'));

// Struct to merge
const HEALTHCARE_FAQ = {
    "Industries": {
        "healthcare": {
            "faq": {
                "title": "Healthcare FAQ",
                "item0": {
                    "q": "How do you ensure HIPAA compliance?",
                    "a": "Our infrastructure is pre-hardened with HIPAA-compliant controls and continuous auditing."
                },
                "item1": {
                    "q": "Can we process PHI in the public cloud?",
                    "a": "Yes, using our Sovereign Nodes, PHI stays encrypted and local while compute can burst to the cloud."
                },
                "item2": {
                    "q": "Do you integrate with EHR systems?",
                    "a": "We support HL7 and FHIR standards for seamless integration with major EHR providers."
                },
                "item3": {
                    "q": "What about data residency for trials?",
                    "a": "We enforce strict geo-fencing to ensure clinical trial data never leaves the authorized jurisdiction."
                }
            }
        }
    }
};

function deepMerge(target, source) {
    for (const key of Object.keys(source)) {
        if (source[key] instanceof Object && key in target && target[key] instanceof Object) {
            deepMerge(target[key], source[key]);
        } else {
            target[key] = source[key];
        }
    }
}

// 1. Merge into EN
if (!en.Industries) en.Industries = {};
deepMerge(en, HEALTHCARE_FAQ);

fs.writeFileSync(enPath, JSON.stringify(en, null, 2));
console.log('Updated en.json with Healthcare FAQ keys');

// 2. Propagate to others
const files = fs.readdirSync(messagesDir).filter(f => f.endsWith('.json') && f !== 'en.json');

files.forEach(file => {
    const filePath = path.join(messagesDir, file);
    try {
        const localeJson = JSON.parse(fs.readFileSync(filePath, 'utf8'));
        if (!localeJson.Industries) localeJson.Industries = {};
        deepMerge(localeJson, HEALTHCARE_FAQ); // Use EN keys as placeholders
        fs.writeFileSync(filePath, JSON.stringify(localeJson, null, 2));
        console.log(`Synced ${file}`);
    } catch (e) {
        console.error(`Error syncing ${file}:`, e);
    }
});
