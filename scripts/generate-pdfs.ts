import { execSync } from 'child_process';
import * as fs from 'fs';
import * as path from 'path';

/**
 * Script to generate PDFs from all research papers and frameworks
 * Uses md-to-pdf for conversion
 */

const OUTPUT_DIR = path.join(process.cwd(), 'publication-pdfs');
const RESEARCH_DIR = path.join(process.cwd(), 'src', 'app', '[locale]', 'research');

// Files to convert
const FILES_TO_CONVERT = [
    // A1-A6 Papers (FULL versions)
    {
        input: path.join(RESEARCH_DIR, 'papers', 'a1-cloud-native-enterprise-reference', 'A1-PAPER-FULL.md'),
        output: 'A1-Cloud-Native-Enterprise-Reference.pdf'
    },
    {
        input: path.join(RESEARCH_DIR, 'papers', 'a2-high-throughput-distributed-systems', 'A2-PAPER-FULL.md'),
        output: 'A2-High-Throughput-Distributed-Systems.pdf'
    },
    {
        input: path.join(RESEARCH_DIR, 'papers', 'a3-enterprise-observability-operational-intelligence', 'A3-PAPER-FULL.md'),
        output: 'A3-Enterprise-Observability-Operational-Intelligence.pdf'
    },
    {
        input: path.join(RESEARCH_DIR, 'papers', 'a4-platform-governance-multicloud-hybrid', 'A4-PAPER-FULL.md'),
        output: 'A4-Platform-Governance-Multicloud-Hybrid.pdf'
    },
    {
        input: path.join(RESEARCH_DIR, 'papers', 'a5-monolith-to-cloud-native-modernization', 'A5-PAPER-FULL.md'),
        output: 'A5-Monolith-to-Cloud-Native-Modernization.pdf'
    },
    {
        input: path.join(RESEARCH_DIR, 'papers', 'a6-adaptive-policy-enforcement', 'A6-PAPER-FULL.md'),
        output: 'A6-Adaptive-Policy-Enforcement.pdf'
    },
    // Scholarly Article
    {
        input: path.join(RESEARCH_DIR, 'SCHOLARLY-ARTICLE-ENTERPRISE-ARCHITECTURE.md'),
        output: 'SCHOLARLY-ARTICLE-Enterprise-Architecture.pdf'
    },
    // AECP Framework
    {
        input: path.join(RESEARCH_DIR, 'frameworks', 'aecp', 'AECP-FULL.md'),
        output: 'AECP-Framework-Full.pdf'
    }
];

async function ensureOutputDir() {
    if (!fs.existsSync(OUTPUT_DIR)) {
        fs.mkdirSync(OUTPUT_DIR, { recursive: true });
        console.log(`✓ Created output directory: ${OUTPUT_DIR}`);
    }
}

async function installDependencies() {
    console.log('Checking for md-to-pdf...');
    try {
        execSync('npm list md-to-pdf', { stdio: 'ignore' });
        console.log('✓ md-to-pdf is already installed');
    } catch {
        console.log('Installing md-to-pdf...');
        execSync('npm install --save-dev md-to-pdf', { stdio: 'inherit' });
        console.log('✓ md-to-pdf installed');
    }
}

async function generatePDF(inputFile: string, outputFile: string) {
    const outputPath = path.join(OUTPUT_DIR, outputFile);

    if (!fs.existsSync(inputFile)) {
        console.error(`✗ Input file not found: ${inputFile}`);
        return false;
    }

    try {
        console.log(`\nGenerating: ${outputFile}`);
        console.log(`  From: ${path.relative(process.cwd(), inputFile)}`);

        // Use md-to-pdf with custom options
        const command = `npx md-to-pdf "${inputFile}" --config-file "${path.join(__dirname, 'pdf-config.json')}" --pdf-options "{\\"format\\": \\"A4\\", \\"margin\\": {\\"top\\": \\"20mm\\", \\"right\\": \\"20mm\\", \\"bottom\\": \\"20mm\\", \\"left\\": \\"20mm\\"}}"`;

        execSync(command, { stdio: 'pipe' });

        // Move the generated PDF to the output directory
        const generatedPdf = inputFile.replace('.md', '.pdf');
        if (fs.existsSync(generatedPdf)) {
            fs.renameSync(generatedPdf, outputPath);
            console.log(`  ✓ Generated: ${outputFile}`);
            return true;
        } else {
            console.error(`  ✗ PDF generation failed for ${outputFile}`);
            return false;
        }
    } catch (error) {
        console.error(`  ✗ Error generating ${outputFile}:`, error);
        return false;
    }
}

async function main() {
    console.log('='.repeat(60));
    console.log('PDF Generation for Publication Review');
    console.log('='.repeat(60));

    await ensureOutputDir();
    await installDependencies();

    console.log('\n' + '='.repeat(60));
    console.log('Generating PDFs...');
    console.log('='.repeat(60));

    let successCount = 0;
    let failCount = 0;

    for (const file of FILES_TO_CONVERT) {
        const success = await generatePDF(file.input, file.output);
        if (success) {
            successCount++;
        } else {
            failCount++;
        }
    }

    console.log('\n' + '='.repeat(60));
    console.log('Summary');
    console.log('='.repeat(60));
    console.log(`Total files: ${FILES_TO_CONVERT.length}`);
    console.log(`✓ Successful: ${successCount}`);
    console.log(`✗ Failed: ${failCount}`);
    console.log(`\nOutput directory: ${OUTPUT_DIR}`);
    console.log('='.repeat(60));
}

main().catch(console.error);
