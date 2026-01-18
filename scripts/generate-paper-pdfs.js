/**
 * Generate PDF files from research paper markdown files
 * Features:
 * - Converts SVGs to PNGs using Puppeteer for PDF compatibility
 * - Uses Pandoc with XeLaTeX for high-quality PDF generation
 * - Generates variants for IEEE, ACM, and ArXiv formats
 * - Handles Unicode characters (Greek, etc.)
 */
const fs = require('fs');
const path = require('path');
const { exec } = require('child_process');
const { promisify } = require('util');

// Try to require puppeteer for SVG conversion
let puppeteer;
try {
    puppeteer = require('puppeteer');
} catch (e) {
    console.warn('Warning: puppeteer not found. SVG to PNG conversion will be skipped.');
}

const execAsync = promisify(exec);

const OUTPUT_DIR = path.join(process.cwd(), 'review-pdfs');
const PUBLIC_DIR = path.join(process.cwd(), 'public');

// Paper files to convert
const PAPERS = [
    {
        name: 'A1-Cloud-Native-Enterprise-Reference',
        path: 'src/app/[locale]/research/papers/a1-cloud-native-enterprise-reference/A1-PAPER-FULL.md'
    },
    {
        name: 'A2-High-Throughput-Distributed-Systems',
        path: 'src/app/[locale]/research/papers/a2-high-throughput-distributed-systems/A2-PAPER-FULL.md'
    },
    {
        name: 'A3-Enterprise-Observability-Operational-Intelligence',
        path: 'src/app/[locale]/research/papers/a3-enterprise-observability-operational-intelligence/A3-PAPER-FULL.md'
    },
    {
        name: 'A4-Platform-Governance-Multicloud-Hybrid',
        path: 'src/app/[locale]/research/papers/a4-platform-governance-multicloud-hybrid/A4-PAPER-FULL.md'
    },
    {
        name: 'A5-Monolith-to-Cloud-Native-Modernization',
        path: 'src/app/[locale]/research/papers/a5-monolith-to-cloud-native-modernization/A5-PAPER-FULL.md'
    },
    {
        name: 'A6-Adaptive-Policy-Enforcement',
        path: 'src/app/[locale]/research/papers/a6-adaptive-policy-enforcement/A6-PAPER-FULL.md'
    },
    {
        name: 'AECP-Framework',
        path: 'src/app/[locale]/research/papers/aecp/AECP-FULL.md'
    },
    {
        name: 'Scholarly-Article-Enterprise-Architecture',
        path: 'src/app/[locale]/research/papers/scholarly-article/SCHOLARLY-ARTICLE-ENTERPRISE-ARCHITECTURE.md'
    }
];

// Output Variants (Single column to ensure table compatibility across all environments)
const VARIANTS = {
    'IEEE': {
        // Modeled after IEEE styling (10pt, Narrow Margins)
        args: '--variable documentclass=article --variable fontsize=10pt --variable geometry:margin=0.75in',
        folder: 'IEEE'
    },
    'ACM': {
        // Modeled after ACM styling (9pt, Standard Margins)
        args: '--variable documentclass=article --variable fontsize=9pt --variable geometry:margin=1in',
        folder: 'ACM'
    },
    'ArXiv': {
        // Standard Preprint format (11pt)
        args: '--variable documentclass=article --variable fontsize=11pt --variable geometry:margin=1in',
        folder: 'ArXiv'
    }
};

// Helper to find all SVGs in a directory recursively
function getAllSvgs(dir) {
    let results = [];
    if (!fs.existsSync(dir)) return results;

    const list = fs.readdirSync(dir);
    list.forEach(file => {
        file = path.join(dir, file);
        const stat = fs.statSync(file);
        if (stat && stat.isDirectory()) {
            results = results.concat(getAllSvgs(file));
        } else {
            if (file.toLowerCase().endsWith('.svg')) {
                results.push(file);
            }
        }
    });
    return results;
}

// Convert all SVGs in the papers asset directory to PNGs
async function convertSvgsToPngs() {
    if (!puppeteer) return;

    const assetsDir = path.join(PUBLIC_DIR, 'assets', 'papers');
    console.log(`Scanning for SVGs in ${assetsDir}...`);

    const svgs = getAllSvgs(assetsDir);
    if (svgs.length === 0) {
        console.log('No SVGs found.');
        return;
    }

    console.log(`Found ${svgs.length} SVGs. Converting to PNGs for PDF compatibility...`);

    let browser;
    try {
        browser = await puppeteer.launch({ headless: true });
        const page = await browser.newPage();

        // Optimize for speed
        await page.setViewport({ width: 1200, height: 800, deviceScaleFactor: 2 });

        let converted = 0;
        let skipped = 0;
        let failed = 0;

        for (const svgPath of svgs) {
            const pngPath = svgPath.replace(/\.svg$/i, '.png');

            // Skip if PNG exists and is newer than SVG
            if (fs.existsSync(pngPath)) {
                skipped++;
                continue;
            }

            try {
                // Use file:// URL
                const fileUrl = 'file://' + svgPath.replace(/\\/g, '/');
                await page.goto(fileUrl, { waitUntil: 'domcontentloaded' });

                const svgElement = await page.$('svg');
                if (svgElement) {
                    await svgElement.screenshot({ path: pngPath, omitBackground: true });
                    converted++;
                    process.stdout.write('.');
                } else {
                    console.warn(`\nWarning: No <svg> element found in ${path.basename(svgPath)}`);
                    failed++;
                }
            } catch (err) {
                console.error(`\nError converting ${path.basename(svgPath)}: ${err.message}`);
                failed++;
            }
        }

        console.log(`\nConversion complete. Converted: ${converted}, Skipped: ${skipped}, Failed: ${failed}\n`);
    } catch (err) {
        console.error('Failed to launch puppeteer or convert images:', err);
    } finally {
        if (browser) await browser.close();
    }
}

/**
 * Preprocess markdown to handle diagrams and images
 */
function preprocessMarkdown(content) {
    // Replace broken image references or resolve to absolute paths
    content = content.replace(/!\[([^\]]*)\]\(([^)]+)\)/g, (match, alt, src) => {
        // Handle local paths starting with / (relative to public dir in Next.js)
        if (src.startsWith('/')) {
            const absSvg = path.join(PUBLIC_DIR, src);
            const absPng = absSvg.replace(/\.svg$/i, '.png');

            // Prefer PNG if it exists (for PDF compatibility)
            if (fs.existsSync(absPng)) {
                return `![${alt}](${absPng.replace(/\\/g, '/')})`;
            }
            if (fs.existsSync(absSvg)) {
                return `![${alt}](${absSvg.replace(/\\/g, '/')})`;
            }
        }

        if (!src.startsWith('http') && !src.startsWith('data:')) {
            let localPath = src;
            if (!path.isAbsolute(src)) {
                localPath = path.resolve(src);
            }
            if (fs.existsSync(localPath)) {
                return `![${alt}](${localPath.replace(/\\/g, '/')})`;
            }
            return `\n\n**[Figure: ${alt || 'Diagram'} - Image not found locally]**\n\n`;
        }
        return match;
    });

    content = content.replace(/```mermaid\n([\s\S]*?)```/g, (match, diagram) => {
        return `\n\n**[MERMAID DIAGRAM - View online version]**\n\n\`\`\`\n${diagram}\`\`\`\n\n`;
    });

    return content;
}

async function generatePDFsForPaper(paper) {
    const inputPath = path.join(process.cwd(), paper.path);
    const tempMdPath = path.join(OUTPUT_DIR, `${paper.name}.md`);
    let summary = { name: paper.name, results: [] };

    try {
        console.log(`Processing: ${paper.name}...`);
        if (!fs.existsSync(inputPath)) {
            console.error(`   ERROR: Source file not found: ${inputPath}`);
            return false;
        }

        let content = fs.readFileSync(inputPath, 'utf8');
        content = preprocessMarkdown(content);
        fs.writeFileSync(tempMdPath, content);

        for (const [variantName, config] of Object.entries(VARIANTS)) {
            const variantDir = path.join(OUTPUT_DIR, config.folder);
            if (!fs.existsSync(variantDir)) fs.mkdirSync(variantDir, { recursive: true });

            const outputPath = path.join(variantDir, `${paper.name}.pdf`);
            const command = `pandoc "${tempMdPath}" -o "${outputPath}" --pdf-engine=xelatex --standalone --toc --toc-depth=3 ${config.args}`;

            try {
                // process.stdout.write(`   [${variantName}] Generating... `);
                const result = await execAsync(command);
                if (result.stderr && result.stderr.includes('Error')) {
                    console.log(`\n   [${variantName}] Error: ${result.stderr}`);
                    summary.results.push({ variant: variantName, success: false });
                } else {
                    const sizeKB = (fs.statSync(outputPath).size / 1024).toFixed(2);
                    console.log(`   - ${variantName}: SUCCESS (${sizeKB} KB)`);
                    summary.results.push({ variant: variantName, success: true, size: sizeKB });
                }
            } catch (e) {
                console.log(`\n   [${variantName}] Failed: ${e.message}`);
                summary.results.push({ variant: variantName, success: false });
            }
        }

        if (fs.existsSync(tempMdPath)) fs.unlinkSync(tempMdPath);
        return summary;

    } catch (error) {
        console.error(`   ERROR: ${error.message}`);
        if (fs.existsSync(tempMdPath)) fs.unlinkSync(tempMdPath);
        return false;
    }
}

async function main() {
    console.log('Starting Multi-Format PDF Generation Workflow...\n');

    if (!fs.existsSync(OUTPUT_DIR)) fs.mkdirSync(OUTPUT_DIR, { recursive: true });

    // Step 1: Convert SVGs (Colorized versions should be ready)
    await convertSvgsToPngs();
    console.log('-'.repeat(60));

    // Step 2: Generate PDFs
    let totalSuccess = 0;
    let totalFiles = 0;

    for (const paper of PAPERS) {
        const result = await generatePDFsForPaper(paper);
        if (result) {
            console.log(`Completed ${result.name}`);
            result.results.forEach(r => {
                if (r.success) totalSuccess++;
                totalFiles++;
            });
        }
    }

    console.log('\n' + '='.repeat(60));
    console.log(`Generation Complete.`);
    console.log(`Total Files Generated: ${totalSuccess} / ${totalFiles}`);
    console.log(`Location: ${OUTPUT_DIR}/{IEEE,ACM,ArXiv}`);
    console.log('='.repeat(60));
}

main().catch(err => {
    console.error('Fatal error:', err);
    process.exit(1);
});
