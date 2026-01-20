import fs from 'fs';
import path from 'path';

const SRC_DIR = path.join(process.cwd(), 'src');
const MESSAGES_DIR = path.join(process.cwd(), 'src/messages');
const EN_PATH = path.join(MESSAGES_DIR, 'en.json');

function getAllFiles(dir: string, extensions: string[]): string[] {
    let results: string[] = [];
    if (!fs.existsSync(dir)) return results;
    const list = fs.readdirSync(dir);
    list.forEach(file => {
        const fullPath = path.join(dir, file);
        const stat = fs.statSync(fullPath);
        if (stat && stat.isDirectory()) {
            results = results.concat(getAllFiles(fullPath, extensions));
        } else if (extensions.some(ext => file.endsWith(ext))) {
            results.push(fullPath);
        }
    });
    return results;
}

function isValidKey(k: string): boolean {
    // Filter out typical false positives
    if (k.length < 2) return false;
    if (k.includes(' ') || k.includes('/') || k.includes('@') || k.includes(':')) return false;
    if (k.includes('${')) return false;
    if (k.startsWith('http')) return false;
    if (['limit', 'offset', 'host', 'callbackUrl', 'next-intl/server'].includes(k)) return false;
    return true;
}

function audit() {
    console.log('🔍 Auditing codebase for translation keys...');
    const files = getAllFiles(SRC_DIR, ['.ts', '.tsx']);
    const usedKeys = new Set<string>();

    const assignmentRegex = /(?:const|let|var)\s+(\w+)\s*=\s*(?:await\s+)?(?:useTranslations|getTranslations)\s*\(\s*(?:{\s*(?:locale,\s*)?namespace:\s*)?['"](.*?)['"](?:\s*})?\s*\)/g;

    files.forEach(file => {
        const content = fs.readFileSync(file, 'utf-8');
        const fileNamespaces: Record<string, string> = {};

        let match;
        while ((match = assignmentRegex.exec(content)) !== null) {
            fileNamespaces[match[1]] = match[2];
        }

        const tVarNames = Object.keys(fileNamespaces).length > 0 ? Object.keys(fileNamespaces) : ['t'];

        tVarNames.forEach(varName => {
            const tRegex = new RegExp(`\\b${varName}\\s*\\(\\s*['"](.*?)['"]\\s*`, 'g');
            let tMatch;
            while ((tMatch = tRegex.exec(content)) !== null) {
                const key = tMatch[1];
                if (isValidKey(key)) {
                    const ns = fileNamespaces[varName];
                    usedKeys.add(ns ? `${ns}.${key}` : key);
                }
            }

            const tTemplateRegex = new RegExp(`${varName}\\s*\\(\\s*\`([^${'`'}]+)\\.\\\${`, 'g');
            let tTemplMatch;
            while ((tTemplMatch = tTemplateRegex.exec(content)) !== null) {
                const prefix = tTemplMatch[1];
                const ns = fileNamespaces[varName];
                usedKeys.add(ns ? `${ns}.${prefix}` : prefix);
            }
        });
    });

    console.log(`✅ Found ${usedKeys.size} potential unique keys in codebase.`);

    const enMessages = JSON.parse(fs.readFileSync(EN_PATH, 'utf-8'));
    const flatEnKeys = new Set<string>();
    const namespaces = new Set<string>();

    function flatten(obj: Record<string, any>, prefix = '') {
        for (const key in obj) {
            const fullKey = prefix ? `${prefix}.${key}` : key;
            if (typeof obj[key] === 'object' && obj[key] !== null && !Array.isArray(obj[key])) {
                namespaces.add(fullKey);
                flatten(obj[key], fullKey);
            } else {
                flatEnKeys.add(fullKey);
            }
        }
    }
    flatten(enMessages);

    const missingKeys = Array.from(usedKeys).filter(k => {
        if (flatEnKeys.has(k)) return false;
        if (namespaces.has(k)) return false;
        if (Array.from(flatEnKeys).some(enK => enK.startsWith(k + '.'))) return false;
        return true;
    });

    const realMissing = missingKeys.sort((a, b) => b.split('.').length - a.split('.').length);

    if (realMissing.length > 0) {
        console.log(`❌ Found ${realMissing.length} missing keys in en.json:`);

        realMissing.forEach(k => {
            const parts = k.split('.');
            let current = enMessages;
            for (let i = 0; i < parts.length - 1; i++) {
                const part = parts[i];
                if (!current[part]) {
                    current[part] = {};
                } else if (typeof current[part] === 'string') {
                    // Collision: promoted from string to object
                    current[part] = { _value: current[part] };
                }
                current = current[part];
            }
            const leaf = parts[parts.length - 1];
            if (current[leaf] === undefined) {
                current[leaf] = `[TODO] ${leaf}`;
            } else if (typeof current[leaf] === 'object') {
                // If we are trying to set a string value on a path that is already an object
                if (!current[leaf]._value) {
                    current[leaf]._value = `[TODO] ${leaf}`;
                }
            }
        });

        fs.writeFileSync(EN_PATH, JSON.stringify(enMessages, null, 2) + '\n');
        console.log('✅ Patched messages/en.json with missing keys.');
    } else {
        console.log('✨ No missing keys found in codebase audit.');
    }
}

audit();
