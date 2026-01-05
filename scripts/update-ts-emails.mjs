// Quick script to update email addresses in TypeScript files
import { readFileSync, writeFileSync } from 'fs';

const files = [
    'src/app/[locale]/security/page.tsx',
    'src/app/[locale]/terms/page.tsx',
    'src/app/[locale]/privacy/page.tsx',
    'src/app/[locale]/founder/page.tsx',
    'src/app/[locale]/company/page.tsx',
];

const replacements = [
    { from: /security@omnigcloud\.com/g, to: 'omnigcloud@gmail.com' },
    { from: /legal@omnigcloud\.com/g, to: 'omnigcloud@gmail.com' },
    { from: /architects@omnigcloud\.com/g, to: 'omnigcloud@gmail.com' },
    { from: /office-of-ceo@omnigcloud\.com/g, to: 'omnigcloud@gmail.com' },
];

files.forEach(file => {
    try {
        let content = readFileSync(file, 'utf-8');
        let modified = false;

        replacements.forEach(({ from, to }) => {
            if (from.test(content)) {
                content = content.replace(from, to);
                modified = true;
            }
        });

        if (modified) {
            writeFileSync(file, content, 'utf-8');
            console.log(`✓ Updated ${file}`);
        } else {
            console.log(`- No changes needed for ${file}`);
        }
    } catch (err) {
        console.error(`✗ Error updating ${file}:`, err.message);
    }
});

console.log('\nAll TypeScript files processed!');
