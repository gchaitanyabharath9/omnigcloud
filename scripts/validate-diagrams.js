#!/usr/bin/env node
/**
 * Diagrams Gate - Validates paper diagrams
 * 
 * Checks:
 * 1. No duplicate figure IDs across a paper
 * 2. Every figure has a caption
 * 3. Mermaid blocks are non-empty (basic validation)
 */

const fs = require('fs');
const path = require('path');

// Load en.json to get paper content
const enJsonPath = path.join(__dirname, '..', 'src', 'messages', 'en.json');
const enJson = JSON.parse(fs.readFileSync(enJsonPath, 'utf8'));

// Load papers manifest
const manifestPath = path.join(__dirname, '..', 'src', 'content', 'papers', 'papers.manifest.ts');
const manifestContent = fs.readFileSync(manifestPath, 'utf8');

// Extract paper IDs from manifest (simple regex approach)
const paperIdMatches = manifestContent.matchAll(/id:\s*"([^"]+)"/g);
const paperIds = Array.from(paperIdMatches).map(match => match[1]);

console.log('🔍 Running Diagrams Gate...');
console.log(`📄 Found ${paperIds.length} papers to validate\n`);

let totalErrors = 0;
let totalWarnings = 0;
let totalFigures = 0;

for (const paperId of paperIds) {
    const paperData = enJson.Papers?.Items?.[paperId];

    if (!paperData) {
        console.log(`⚠️  [${paperId.toUpperCase()}] No paper data found in en.json`);
        totalWarnings++;
        continue;
    }

    console.log(`📝 Validating paper: ${paperId.toUpperCase()}`);

    const figureIds = new Set();
    const sections = paperData.sections || {};
    let paperErrors = 0;
    let paperFigures = 0;

    // Check each section (0-3)
    for (let i = 0; i < 4; i++) {
        const section = sections[i];

        if (!section) {
            continue;
        }

        // Check primary diagram
        if (section.diagram) {
            const figId = `Fig-${paperId.toUpperCase()}-${i + 1}a`;
            paperFigures++;
            totalFigures++;

            // Check for duplicate figure ID
            if (figureIds.has(figId)) {
                console.log(`   ❌ ERROR: Duplicate figure ID: ${figId}`);
                paperErrors++;
                totalErrors++;
            } else {
                figureIds.add(figId);
            }

            // Check for caption
            if (!section.caption || section.caption.trim() === '') {
                console.log(`   ❌ ERROR: Figure ${figId} missing caption`);
                paperErrors++;
                totalErrors++;
            }

            // Basic Mermaid validation
            if (section.diagram.startsWith('graph') ||
                section.diagram.startsWith('sequenceDiagram') ||
                section.diagram.startsWith('flowchart') ||
                section.diagram.startsWith('C4')) {

                if (section.diagram.trim().length < 20) {
                    console.log(`   ⚠️  WARNING: Figure ${figId} has suspiciously short Mermaid code`);
                    totalWarnings++;
                }

                // Check for basic Mermaid syntax (handle both newlines and semicolon-separated)
                const normalizedDiagram = section.diagram.replace(/\\n/g, '\n');
                const lines = normalizedDiagram.split('\n').filter(l => l.trim());

                // Also check for semicolon-separated statements (valid Mermaid)
                const statements = section.diagram.split(';').filter(s => s.trim());

                if (lines.length < 2 && statements.length < 2) {
                    console.log(`   ❌ ERROR: Figure ${figId} Mermaid diagram appears empty or invalid (${lines.length} lines, ${statements.length} statements)`);
                    paperErrors++;
                    totalErrors++;
                }
            }
        }

        // Check secondary diagram (diagram2)
        if (section.diagram2) {
            const figId = `Fig-${paperId.toUpperCase()}-${i + 1}b`;
            paperFigures++;
            totalFigures++;

            // Check for duplicate figure ID
            if (figureIds.has(figId)) {
                console.log(`   ❌ ERROR: Duplicate figure ID: ${figId}`);
                paperErrors++;
                totalErrors++;
            } else {
                figureIds.add(figId);
            }

            // Check for caption
            if (!section.caption2 || section.caption2.trim() === '') {
                console.log(`   ❌ ERROR: Figure ${figId} missing caption`);
                paperErrors++;
                totalErrors++;
            }

            // Basic Mermaid validation
            if (section.diagram2.startsWith('graph') ||
                section.diagram2.startsWith('sequenceDiagram') ||
                section.diagram2.startsWith('flowchart') ||
                section.diagram2.startsWith('C4')) {

                if (section.diagram2.trim().length < 20) {
                    console.log(`   ⚠️  WARNING: Figure ${figId} has suspiciously short Mermaid code`);
                    totalWarnings++;
                }

                // Check for basic Mermaid syntax (handle both newlines and semicolon-separated)
                const normalizedDiagram = section.diagram2.replace(/\\n/g, '\n');
                const lines = normalizedDiagram.split('\n').filter(l => l.trim());

                // Also check for semicolon-separated statements (valid Mermaid)
                const statements = section.diagram2.split(';').filter(s => s.trim());

                if (lines.length < 2 && statements.length < 2) {
                    console.log(`   ❌ ERROR: Figure ${figId} Mermaid diagram appears empty or invalid (${lines.length} lines, ${statements.length} statements)`);
                    paperErrors++;
                    totalErrors++;
                }
            }
        }
    }

    if (paperErrors === 0) {
        console.log(`   ✅ ${paperFigures} figures validated successfully`);
    } else {
        console.log(`   ❌ ${paperErrors} errors found`);
    }
    console.log('');
}

// Summary
console.log('═'.repeat(60));
console.log('📊 SUMMARY');
console.log('═'.repeat(60));
console.log(`Total Papers:   ${paperIds.length}`);
console.log(`Total Figures:  ${totalFigures}`);
console.log(`Errors:         ${totalErrors}`);
console.log(`Warnings:       ${totalWarnings}`);
console.log('═'.repeat(60));

if (totalErrors > 0) {
    console.log('\n❌ Diagrams Gate FAILED');
    process.exit(1);
} else {
    console.log('\n✅ Diagrams Gate PASSED');
    process.exit(0);
}
