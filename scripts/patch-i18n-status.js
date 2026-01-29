const fs = require('fs');
const path = require('path');

const MESSAGES_DIR = path.resolve(__dirname, '../src/messages');

const STATUS_KEYS = {
    "DRAFT": "Draft",
    "SUBMITTED": "Submitted",
    "PUBLISHED": "Published"
};

function deepSet(obj, pathParts, value) {
    let current = obj;
    for (let i = 0; i < pathParts.length; i++) {
        const part = pathParts[i];
        const isLast = i === pathParts.length - 1;

        if (!current[part]) {
            if (isLast) current[part] = value;
            else current[part] = {};
        }

        current = current[part];
    }
}

async function run() {
    const localeFiles = fs.readdirSync(MESSAGES_DIR).filter(f => f.endsWith('.json'));

    for (const file of localeFiles) {
        const filePath = path.join(MESSAGES_DIR, file);
        let content;
        try {
            content = JSON.parse(fs.readFileSync(filePath, 'utf8'));
        } catch (e) {
            console.error(`Failed to parse ${file}`);
            continue;
        }

        let modified = false;

        // Ensure Papers.Status exists
        if (!content.Papers) content.Papers = {};
        if (!content.Papers.Status) {
            content.Papers.Status = {};
            modified = true;
        }

        Object.entries(STATUS_KEYS).forEach(([key, val]) => {
            if (!content.Papers.Status[key]) {
                content.Papers.Status[key] = val; // Use English value for all as a safe fallback/placeholder
                modified = true;
            }
        });

        if (modified) {
            fs.writeFileSync(filePath, JSON.stringify(content, null, 2) + '\n');
            console.log(`Added Status keys to ${file}`);
        } else {
            console.log(`Status keys present in ${file}`);
        }
    }
}

run();
