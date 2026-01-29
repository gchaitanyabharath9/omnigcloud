const fs = require('fs');
const path = require('path');

const MESSAGES_FILE = path.resolve(__dirname, '../src/messages/en.json');
const content = JSON.parse(fs.readFileSync(MESSAGES_FILE, 'utf8'));

const paperIds = [
    'a1', 'a2', 'a3', 'a4', 'a5', 'a6',
    'aecp', 'arch', 'qa1'
];

const sectionKeys = ['overview', 'methodology', 'implementation', 'conclusion'];
const subKeys = ['title', 'content']; // minimalist check

let missingCount = 0;
let arrayCount = 0;

if (!content.Papers || !content.Papers.Items) {
    console.error("Critical: Papers.Items missing in en.json");
    process.exit(1);
}

paperIds.forEach(id => {
    const paper = content.Papers.Items[id];
    if (!paper) {
        console.error(`Missing paper block: ${id}`);
        missingCount++;
        return;
    }

    if (!paper.sections) {
        console.error(`Missing sections block for paper: ${id}`);
        missingCount++;
        return;
    }

    if (Array.isArray(paper.sections)) {
        console.error(`Sections is ARRAY for paper: ${id} (Must be Object)`);
        arrayCount++;
        return;
    }

    sectionKeys.forEach(sk => {
        if (!paper.sections[sk]) {
            console.error(`Missing section ${sk} in paper ${id}`);
            missingCount++;
        } else {
            subKeys.forEach(sub => {
                if (!paper.sections[sk][sub]) {
                    console.error(`Missing subkey ${sk}.${sub} in paper ${id}`);
                    missingCount++;
                }
            });
        }
    });
});

console.log(`Audit complete. Missing: ${missingCount}, Arrays: ${arrayCount}`);
