const fs = require('fs');
const path = require('path');

const paperIds = [
    'a1', 'a2', 'a3', 'a4', 'a5', 'a6',
    'aecp', 'arch', 'qa1'
];

const indices = [0, 1, 2, 3];
const subkeys = ['title', 'content', 'diagram', 'caption', 'diagram2', 'caption2'];

const missingKeys = [];

paperIds.forEach(id => {
    indices.forEach(index => {
        subkeys.forEach(subkey => {
            // The key format expected by useTranslations("Papers") with getLocalKey 
            // depends on how it is called.
            // In PaperLanding: const sectionKey = `Items.${paper.id}.sections.${index}`;
            // tPapers(`${sectionKey}.title`) -> "Papers.Items.{id}.sections.{index}.title"

            const key = `Papers.Items.${id}.sections.${index}.${subkey}`;
            missingKeys.push(key);
        });
    });
});

const outputPath = path.resolve(__dirname, 'i18n_missing_keys.json');
fs.writeFileSync(outputPath, JSON.stringify({ keys: missingKeys }, null, 2));

console.log(`Generated ${missingKeys.length} missing keys to ${outputPath}`);
