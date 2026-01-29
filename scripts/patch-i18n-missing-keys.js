const fs = require('fs');
const path = require('path');

const MESSAGES_DIR = path.resolve(__dirname, '../src/messages');
const MISSING_KEYS_FILE = path.resolve(__dirname, 'i18n_missing_keys.json');

function deepSet(obj, pathParts, value) {
    let current = obj;
    for (let i = 0; i < pathParts.length; i++) {
        const part = pathParts[i];
        const isLast = i === pathParts.length - 1;
        const isNumeric = /^\d+$/.test(part);

        if (isLast) {
            // Don't overwrite if exists
            if (current[part] === undefined) {
                current[part] = value;
            }
        } else {
            const nextPart = pathParts[i + 1];
            const nextIsNumeric = /^\d+$/.test(nextPart);

            if (current[part] === undefined || current[part] === null) {
                // Create array if next part is numeric, otherwise object
                // User requested array for numeric segments. 
                // NOTE: "sections.0" means 'sections' should be an array? 
                // Or 'sections' is the array and '0' is the index.
                // If 'sections' contains '0', then sections[0].

                // Actually, strictly speaking:
                // if 'part' is the key in 'current', we set current[part].
                // If 'nextPart' is numeric, we initialize current[part] as []. 
                // HOWEVER, sparse arrays in JSON can be messy with nulls.
                // Let's stick to Objects for everything to be safe UNLESS explicitly array-like behavior is needed.
                // User said: "If a segment is numeric ... treat as array index"

                // Let's look at the instruction again:
                // "If a segment is numeric (e.g., “0”, “1”), treat as array index; create arrays with null fill up to that index."

                if (nextIsNumeric) {
                    current[part] = [];
                } else {
                    current[part] = {};
                }
            }

            // If we encounter an object where we expect an array (or vice versa), 
            // we might have a conflict if the structure already exists but is different.
            // For now assume clean slate or compatible structure.

            current = current[part];
        }
    }
}

function generatePlaceholder(keyParts) {
    // keyParts example: ['Papers', 'Items', 'a1', 'sections', '0', 'title']
    const subkey = keyParts[keyParts.length - 1];
    const index = keyParts[keyParts.length - 2];
    const id = keyParts[keyParts.length - 4]; // a1

    // Capitalize
    const cap = (s) => s.charAt(0).toUpperCase() + s.slice(1);

    // e.g. "Title (Section 1)"
    // Indices are 0-based, so display index + 1
    const displayIndex = parseInt(index) + 1;

    if (subkey === 'title') return `Section ${displayIndex} Title`;
    if (subkey === 'content') return `Content for section ${displayIndex} of paper ${id}. Placeholder text.`;
    if (subkey === 'diagram') return `diagram_${id}_section${displayIndex}.png`;
    if (subkey === 'caption') return `Figure ${displayIndex}: Caption for ${id}`;
    if (subkey === 'diagram2') return `diagram_${id}_section${displayIndex}_b.png`;
    if (subkey === 'caption2') return `Figure ${displayIndex}b: Secondary Caption`;

    return `TODO: ${subkey}`;
}

async function run() {
    if (!fs.existsSync(MISSING_KEYS_FILE)) {
        console.error(`Missing keys file not found: ${MISSING_KEYS_FILE}`);
        process.exit(1);
    }

    const { keys } = JSON.parse(fs.readFileSync(MISSING_KEYS_FILE, 'utf8'));
    const localeFiles = fs.readdirSync(MESSAGES_DIR).filter(f => f.endsWith('.json'));

    console.log(`Found ${keys.length} keys to patch across ${localeFiles.length} locales.`);

    for (const file of localeFiles) {
        const filePath = path.join(MESSAGES_DIR, file);
        const locale = file.replace('.json', '');

        let content;
        try {
            content = JSON.parse(fs.readFileSync(filePath, 'utf8'));
        } catch (e) {
            console.error(`Failed to parse ${file}, skipping.`);
            continue;
        }

        let addedCount = 0;

        keys.forEach(key => {
            const parts = key.split('.');
            // Check if key exists
            let current = content;
            let exists = true;
            for (const p of parts) {
                if (current === undefined || current === null || current[p] === undefined) {
                    exists = false;
                    break;
                }
                current = current[p];
            }

            if (!exists) {
                const placeholder = generatePlaceholder(parts);
                deepSet(content, parts, placeholder);
                addedCount++;
            }
        });

        if (addedCount > 0) {
            fs.writeFileSync(filePath, JSON.stringify(content, null, 2) + '\n'); // Ensure trailing newline
            console.log(`Updated ${file}: added ${addedCount} keys.`);
        } else {
            console.log(`No changes needed for ${file}.`);
        }
    }
}

run();
