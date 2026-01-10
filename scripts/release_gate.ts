#!/usr/bin/env tsx
/**
 * Publication Readiness Gate - Complete Validation
 * Checks all requirements for arXiv/SSRN submission
 */

import { readFileSync, readdirSync, existsSync } from 'fs';
import { join } from 'path';

const PAPERS = ['a1', 'a2', 'a3', 'a4', 'a5', 'a6'];
const MIN_WORDS = 5000;
const MIN_DIAGRAMS = 4;
const MIN_TABLES = 2;
const MIN_KEYWORDS = 8;
const MAX_KEYWORDS = 12;
const MIN_ABSTRACT_WORDS = 150;
const MAX_ABSTRACT_WORDS = 250;

interface PaperAnalysis {
    id: string;
    wordCount: number;
    diagramCount: number;
    tableCount: number;
    keywordCount: number;
    abstractWordCount: number;
    hasForbiddenTerms: boolean;
    checks: {
        wordCount: boolean;
        diagrams: boolean;
        tables: boolean;
        keywords: boolean;
        abstract: boolean;
        noForbiddenTerms: boolean;
    };
    pass: boolean;
}

function countWords(text: string): number {
    const cleaned = text
        .replace(/```[\s\S]*?```/g, '')
        .replace(/\$\$[\s\S]*?\$\$/g, '')
        .replace(/\$[^\$]+\$/g, '')
        .replace(/\|[^\n]+\|/g, '')
        .replace(/^---$/gm, '')
        .replace(/^\s*\*\*[^:]+:\*\*.*$/gm, '')
        .replace(/^#+\s+/gm, '');

    const words = cleaned.match(/\b\w+\b/g);
    return words ? words.length : 0;
}

function countDiagrams(text: string): number {
    const mermaidMatches = text.match(/```mermaid/g);
    return mermaidMatches ? mermaidMatches.length : 0;
}

function countTables(text: string): number {
    const tableMatches = text.match(/^\|[^\n]+\|$/gm);
    if (!tableMatches) return 0;

    // Count unique tables (consecutive table lines = 1 table)
    let tableCount = 0;
    let inTable = false;

    text.split('\n').forEach(line => {
        if (/^\|[^\n]+\|$/.test(line)) {
            if (!inTable) {
                tableCount++;
                inTable = true;
            }
        } else {
            inTable = false;
        }
    });

    return tableCount;
}

function extractKeywords(text: string): number {
    const keywordMatch = text.match(/\*\*Keywords:\*\*\s*([^\n]+)/);
    if (!keywordMatch) return 0;

    const keywords = keywordMatch[1].split(',').map(k => k.trim()).filter(k => k.length > 0);
    return keywords.length;
}

function extractAbstractWordCount(text: string): number {
    const abstractMatch = text.match(/##\s+Abstract\s+([\s\S]*?)(?=\n##|\n\*\*Keywords)/);
    if (!abstractMatch) return 0;

    return countWords(abstractMatch[1]);
}

function hasForbiddenTerms(text: string): boolean {
    const forbidden = ['USCIS', 'EB-1A', 'EB1A', 'exhibit', 'petition'];
    const regex = new RegExp(`\\b(${forbidden.join('|')})\\b`, 'i');
    return regex.test(text);
}

function analyzePaper(paperId: string): PaperAnalysis {
    const papersDir = join(process.cwd(), 'src', 'app', '[locale]', 'research', 'papers');
    const dirs = readdirSync(papersDir);
    const matchingDir = dirs.find((d: string) => d.startsWith(paperId + '-'));

    if (!matchingDir) {
        return {
            id: paperId,
            wordCount: 0,
            diagramCount: 0,
            tableCount: 0,
            keywordCount: 0,
            abstractWordCount: 0,
            hasForbiddenTerms: false,
            checks: {
                wordCount: false,
                diagrams: false,
                tables: false,
                keywords: false,
                abstract: false,
                noForbiddenTerms: false
            },
            pass: false
        };
    }

    const fullPath = join(papersDir, matchingDir, `${paperId.toUpperCase()}-PAPER-FULL.md`);

    try {
        const content = readFileSync(fullPath, 'utf-8');
        const wordCount = countWords(content);
        const diagramCount = countDiagrams(content);
        const tableCount = countTables(content);
        const keywordCount = extractKeywords(content);
        const abstractWordCount = extractAbstractWordCount(content);
        const forbidden = hasForbiddenTerms(content);

        const checks = {
            wordCount: wordCount >= MIN_WORDS,
            diagrams: diagramCount >= MIN_DIAGRAMS,
            tables: tableCount >= MIN_TABLES,
            keywords: keywordCount >= MIN_KEYWORDS && keywordCount <= MAX_KEYWORDS,
            abstract: abstractWordCount >= MIN_ABSTRACT_WORDS && abstractWordCount <= MAX_ABSTRACT_WORDS,
            noForbiddenTerms: !forbidden
        };

        const pass = Object.values(checks).every(v => v);

        return {
            id: paperId,
            wordCount,
            diagramCount,
            tableCount,
            keywordCount,
            abstractWordCount,
            hasForbiddenTerms: forbidden,
            checks,
            pass
        };
    } catch (error) {
        console.error(`Error analyzing ${paperId}:`, error);
        return {
            id: paperId,
            wordCount: 0,
            diagramCount: 0,
            tableCount: 0,
            keywordCount: 0,
            abstractWordCount: 0,
            hasForbiddenTerms: false,
            checks: {
                wordCount: false,
                diagrams: false,
                tables: false,
                keywords: false,
                abstract: false,
                noForbiddenTerms: false
            },
            pass: false
        };
    }
}

function printResults(results: PaperAnalysis[]) {
    console.log('\n╔══════════════════════════════════════════════════════════════════════╗');
    console.log('║         PUBLICATION READINESS GATE - arXiv/SSRN                     ║');
    console.log('╚══════════════════════════════════════════════════════════════════════╝\n');

    results.forEach(r => {
        const status = r.pass ? '✓ PASS' : '✗ FAIL';
        const color = r.pass ? '\x1b[32m' : '\x1b[31m';
        const reset = '\x1b[0m';

        console.log(`${color}${status}${reset} ${r.id.toUpperCase()}`);
        console.log(`  Word Count: ${r.wordCount} / ${MIN_WORDS} ${r.checks.wordCount ? '✓' : '✗'}`);
        console.log(`  Diagrams: ${r.diagramCount} / ${MIN_DIAGRAMS} ${r.checks.diagrams ? '✓' : '✗'}`);
        console.log(`  Tables: ${r.tableCount} / ${MIN_TABLES} ${r.checks.tables ? '✓' : '✗'}`);
        console.log(`  Keywords: ${r.keywordCount} (${MIN_KEYWORDS}-${MAX_KEYWORDS}) ${r.checks.keywords ? '✓' : '✗'}`);
        console.log(`  Abstract: ${r.abstractWordCount} words (${MIN_ABSTRACT_WORDS}-${MAX_ABSTRACT_WORDS}) ${r.checks.abstract ? '✓' : '✗'}`);
        console.log(`  No Forbidden Terms: ${r.checks.noForbiddenTerms ? '✓' : '✗'}`);
        console.log('');
    });

    const allPass = results.every(r => r.pass);

    console.log('╔══════════════════════════════════════════════════════════════════════╗');
    console.log(`║  OVERALL STATUS: ${allPass ? '✓ READY FOR SUBMISSION' : '✗ NOT READY'}                         ║`);
    console.log('╚══════════════════════════════════════════════════════════════════════╝\n');

    if (!allPass) {
        console.log('FAILING PAPERS:');
        results.filter(r => !r.pass).forEach(r => {
            console.log(`  - ${r.id.toUpperCase()}`);
            if (!r.checks.wordCount) console.log(`    • Needs ${MIN_WORDS - r.wordCount} more words`);
            if (!r.checks.diagrams) console.log(`    • Needs ${MIN_DIAGRAMS - r.diagramCount} more diagrams`);
            if (!r.checks.tables) console.log(`    • Needs ${MIN_TABLES - r.tableCount} more tables`);
            if (!r.checks.keywords) console.log(`    • Fix keyword count (current: ${r.keywordCount})`);
            if (!r.checks.abstract) console.log(`    • Fix abstract length (current: ${r.abstractWordCount} words)`);
            if (!r.checks.noForbiddenTerms) console.log(`    • Remove forbidden terms (USCIS/EB-1A/exhibit/petition)`);
        });
        console.log('');
    }
}

function main() {
    const results = PAPERS.map(analyzePaper);
    printResults(results);

    const allPass = results.every(r => r.pass);
    process.exit(allPass ? 0 : 1);
}

main();
