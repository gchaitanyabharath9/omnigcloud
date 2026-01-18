/**
 * Generate PDF files from research paper markdown files
 * Enhanced version with diagram support
 */
import { mdToPdf } from 'md-to-pdf';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const OUTPUT_DIR = path.join(process.cwd(), 'review-pdfs');

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

console.log('📄 Generating PDF files for research papers...\n');

// Ensure output directory exists
if (!fs.existsSync(OUTPUT_DIR)) {
    fs.mkdirSync(OUTPUT_DIR, { recursive: true });
    console.log(`✅ Created output directory: ${OUTPUT_DIR}\n`);
}

/**
 * Preprocess markdown to handle diagrams and images
 */
function preprocessMarkdown(content, basePath) {
    // Replace placeholder diagram references with text placeholders
    content = content.replace(/!\[Placeholder Diagram\]\([^)]+\)/g,
        '**[DIAGRAM PLACEHOLDER - See online version for interactive diagram]**');

    // Replace broken image references with text
    content = content.replace(/!\[([^\]]*)\]\(([^)]+)\)/g, (match, alt, src) => {
        // If it's a relative path, try to resolve it
        if (!src.startsWith('http') && !src.startsWith('data:')) {
            const imagePath = path.join(basePath, src);
            if (fs.existsSync(imagePath)) {
                // Convert to absolute path for PDF generation
                return `![${alt}](${imagePath})`;
            } else {
                // Image not found, replace with text
                return `**[Figure: ${alt || 'Diagram'}]**`;
            }
        }
        return match;
    });

    // Enhance Mermaid code blocks with text description
    content = content.replace(/```mermaid\n([\s\S]*?)```/g, (match, diagram) => {
        return `**[MERMAID DIAGRAM]**\n\n\`\`\`\n${diagram}\`\`\`\n\n*Note: Mermaid diagrams are best viewed in the online version.*`;
    });

    return content;
}

let successCount = 0;
let failCount = 0;

for (const paper of PAPERS) {
    const inputPath = path.join(process.cwd(), paper.path);
    const outputPath = path.join(OUTPUT_DIR, `${paper.name}.pdf`);

    try {
        console.log(`🔄 Processing: ${paper.name}...`);

        if (!fs.existsSync(inputPath)) {
            console.error(`   ❌ Source file not found: ${inputPath}`);
            failCount++;
            continue;
        }

        // Read and preprocess the markdown
        let content = fs.readFileSync(inputPath, 'utf8');
        const basePath = path.dirname(inputPath);
        content = preprocessMarkdown(content, basePath);

        // Create temporary processed file
        const tempPath = path.join(OUTPUT_DIR, `${paper.name}.temp.md`);
        fs.writeFileSync(tempPath, content);

        await mdToPdf(
            { path: tempPath },
            {
                dest: outputPath,
                pdf_options: {
                    format: 'A4',
                    margin: {
                        top: '20mm',
                        right: '20mm',
                        bottom: '20mm',
                        left: '20mm'
                    },
                    printBackground: true,
                    displayHeaderFooter: true,
                    headerTemplate: '<div></div>',
                    footerTemplate: `
                        <div style="font-size: 9px; text-align: center; width: 100%; padding: 5px;">
                            <span class="pageNumber"></span> / <span class="totalPages"></span>
                        </div>
                    `
                },
                stylesheet: `
                    body {
                        font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
                        line-height: 1.6;
                        color: #333;
                    }
                    h1 { color: #2c3e50; border-bottom: 2px solid #3498db; padding-bottom: 10px; }
                    h2 { color: #34495e; margin-top: 30px; }
                    h3 { color: #555; }
                    code { background: #f4f4f4; padding: 2px 6px; border-radius: 3px; }
                    pre { background: #f8f8f8; padding: 15px; border-left: 4px solid #3498db; overflow-x: auto; }
                    blockquote { border-left: 4px solid #ddd; padding-left: 15px; color: #666; }
                    table { border-collapse: collapse; width: 100%; margin: 20px 0; }
                    th, td { border: 1px solid #ddd; padding: 12px; text-align: left; }
                    th { background: #3498db; color: white; }
                `
            }
        );

        // Clean up temp file
        fs.unlinkSync(tempPath);

        const stats = fs.statSync(outputPath);
        const sizeKB = (stats.size / 1024).toFixed(2);
        console.log(`   ✅ Generated: ${path.basename(outputPath)} (${sizeKB} KB)`);
        successCount++;
    } catch (error) {
        console.error(`   ❌ Failed: ${error.message}`);
        failCount++;
    }
}

console.log('\n' + '='.repeat(60));
console.log(`📊 Summary:`);
console.log(`   ✅ Success: ${successCount} PDFs generated`);
console.log(`   ❌ Failed: ${failCount}`);
console.log(`   📁 Output directory: ${OUTPUT_DIR}`);
console.log('\n   ℹ️  Note: Placeholder diagrams are marked with [DIAGRAM PLACEHOLDER]`);
console.log(`   ℹ️  For full diagrams, view papers online at omnigcloud.com`);
console.log('='.repeat(60));

if (failCount > 0) {
    process.exit(1);
} else {
    console.log('\n✅ All PDFs generated successfully!');
    process.exit(0);
}
