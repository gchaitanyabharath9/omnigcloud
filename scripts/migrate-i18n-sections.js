const fs = require('fs');
const path = require('path');

const MESSAGES_DIR = path.resolve(__dirname, '../src/messages');

const paperIds = [
    'a1', 'a2', 'a3', 'a4', 'a5', 'a6',
    'aecp', 'arch', 'qa1'
];

// Mapping index to stable ID
const KEY_MAP = {
    '0': 'overview',
    '1': 'methodology',
    '2': 'implementation',
    '3': 'conclusion'
};

async function run() {
    const localeFiles = fs.readdirSync(MESSAGES_DIR).filter(f => f.endsWith('.json'));

    for (const file of localeFiles) {
        const filePath = path.join(MESSAGES_DIR, file);
        let content;
        try {
            content = JSON.parse(fs.readFileSync(filePath, 'utf8'));
        } catch (e) {
            console.error(`Failed to parse ${file}, skipping.`);
            continue;
        }

        let modified = false;

        // Iterate papers
        if (content.Papers && content.Papers.Items) {
            paperIds.forEach(id => {
                if (content.Papers.Items[id]) {
                    const item = content.Papers.Items[id];
                    // Check if sections exists and maps roughly to what we expect
                    if (item.sections) {
                        const newSections = {};
                        let hasChanges = false;

                        // We handle both array and object "0", "1"...
                        // Object.entries handles both array (key="0") and object
                        Object.entries(item.sections).forEach(([key, value]) => {
                            const newKey = KEY_MAP[key];
                            if (newKey) {
                                newSections[newKey] = value;
                                hasChanges = true;
                            } else {
                                // Keep unknown keys as is? Or drop? 
                                // If index > 3, we drop it based on our Map limit.
                                // But usually it's just 0-3.
                                // Let's keep existing unknown keys to be safe?
                                // But we are converting to object. 
                                newSections[key] = value;
                            }
                        });

                        if (hasChanges) {
                            item.sections = newSections;
                            modified = true;
                        }
                    }
                }
            });
        }

        if (modified) {
            fs.writeFileSync(filePath, JSON.stringify(content, null, 2) + '\n');
            console.log(`Migrated sections in ${file}.`);
        } else {
            console.log(`No changes needed for ${file}.`);
        }
    }
}

run();
