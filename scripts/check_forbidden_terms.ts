#!/usr/bin/env tsx
import { readFileSync, readdirSync } from 'fs';
import { join } from 'path';

const FORBIDDEN_TERMS = ['USCIS', 'EB-1A', 'EB1A', 'exhibit', 'petition'];
const PAPERS = ['a1', 'a2', 'a3', 'a4', 'a5', 'a6'];

interface TermMatch {
    paperId: string;
    term: string;
    line: number;
    content: string;
}

function checkPaper(paperId: string): TermMatch[] {
    const papersDir = join(process.cwd(), 'src', 'app', '[locale]', 'research', 'papers');
    const dirs = readdirSync(papersDir);
    const matchingDir = dirs.find((d: string) => d.startsWith(paperId + '-'));

    if (!matchingDir) return [];

    const fullPath = join(papersDir, matchingDir, `${paperId.toUpperCase()}-PAPER-FULL.md`);

    try {
        const content = readFileSync(fullPath, 'utf-8');
        const lines = content.split('\n');
        const matches: TermMatch[] = [];

        lines.forEach((line, idx) => {
            FORBIDDEN_TERMS.forEach(term => {
                const regex = new RegExp(`\\b${term}\\b`, 'i');
                if (regex.test(line)) {
                    matches.push({
                        paperId,
                        term,
                        line: idx + 1,
                        content: line.trim()
                    });
                }
            });
        });

        return matches;
    } catch (error) {
        return [];
    }
}

function main() {
    const allMatches = PAPERS.flatMap(checkPaper);

    console.log('\n=== FORBIDDEN TERMS CHECK ===\n');

    if (allMatches.length === 0) {
        console.log('✓ No forbidden terms found\n');
        process.exit(0);
    }

    console.log('✗ Found forbidden terms:\n');
    allMatches.forEach(m => {
        console.log(`  ${m.paperId.toUpperCase()} line ${m.line}: "${m.term}"`);
        console.log(`    ${m.content.substring(0, 80)}...\n`);
    });

    process.exit(1);
}

main();
