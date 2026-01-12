const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

// Papers to convert
const papers = [
    {
        input: 'src/app/[locale]/research/papers/a1-cloud-native-enterprise-reference/A1-PAPER-FULL.md',
        output: 'publication-pdfs/A1-Cloud-Native-Enterprise-Reference.pdf',
        name: 'A1 Paper'
    },
    {
        input: 'src/app/[locale]/research/papers/a2-high-throughput-distributed-systems/A2-PAPER-FULL.md',
        output: 'publication-pdfs/A2-High-Throughput-Distributed-Systems.pdf',
        name: 'A2 Paper'
    },
    {
        input: 'src/app/[locale]/research/papers/a3-enterprise-observability-operational-intelligence/A3-PAPER-FULL.md',
        output: 'publication-pdfs/A3-Enterprise-Observability-Operational-Intelligence.pdf',
        name: 'A3 Paper'
    },
    {
        input: 'src/app/[locale]/research/papers/a4-platform-governance-multicloud-hybrid/A4-PAPER-FULL.md',
        output: 'publication-pdfs/A4-Platform-Governance-Multicloud-Hybrid.pdf',
        name: 'A4 Paper'
    },
    {
        input: 'src/app/[locale]/research/papers/a5-monolith-to-cloud-native-modernization/A5-PAPER-FULL.md',
        output: 'publication-pdfs/A5-Monolith-to-Cloud-Native-Modernization.pdf',
        name: 'A5 Paper'
    },
    {
        input: 'src/app/[locale]/research/papers/a6-adaptive-policy-enforcement/A6-PAPER-FULL.md',
        output: 'publication-pdfs/A6-Adaptive-Policy-Enforcement.pdf',
        name: 'A6 Paper'
    },
    {
        input: 'src/app/[locale]/research/SCHOLARLY-ARTICLE-ENTERPRISE-ARCHITECTURE.md',
        output: 'publication-pdfs/Scholarly-Article-Enterprise-Architecture.pdf',
        name: 'Scholarly Article'
    },
    {
        input: 'src/app/[locale]/research/frameworks/aecp/AECP-FULL.md',
        output: 'publication-pdfs/AECP-Framework.pdf',
        name: 'AECP Framework'
    }
];

async function convertMarkdownToPDF(inputPath, outputPath, name) {
    console.log(`\n📄 Converting ${name}...`);

    try {
        // Resolve full paths
        const fullInputPath = path.resolve(inputPath);
        const fullOutputPath = path.resolve(outputPath);
        const tempDir = path.resolve('publication-pdfs', 'temp');

        // Ensure temp directory exists
        fs.mkdirSync(tempDir, { recursive: true });

        // Read the markdown file
        const markdown = fs.readFileSync(fullInputPath, 'utf8');

        // Extract Mermaid diagrams and replace with placeholders
        const mermaidRegex = /```mermaid\n([\s\S]*?)```/g;
        let match;
        let diagramIndex = 0;
        const diagrams = [];

        let processedMarkdown = markdown;
        const matches = [];

        // Collect all matches first
        while ((match = mermaidRegex.exec(markdown)) !== null) {
            matches.push({ fullMatch: match[0], code: match[1], index: match.index });
        }

        // Process diagrams
        for (let i = 0; i < matches.length; i++) {
            const m = matches[i];
            const diagramCode = m.code;
            const baseName = path.basename(fullInputPath, '.md');
            const diagramFile = path.join(tempDir, `diagram-${baseName}-${i}.mmd`);
            const imageFile = path.join(tempDir, `diagram-${baseName}-${i}.png`);

            // Write diagram to file
            fs.writeFileSync(diagramFile, diagramCode);

            // Convert Mermaid to PNG using mmdc
            try {
                execSync(`mmdc -i "${diagramFile}" -o "${imageFile}" -b transparent -t neutral`, { stdio: 'pipe' });

                // Replace Mermaid code block with image reference
                processedMarkdown = processedMarkdown.replace(
                    m.fullMatch,
                    `\n![Diagram ${i}](${imageFile.replace(/\\/g, '/')})\n`
                );

                diagrams.push({ diagramFile, imageFile });
                diagramIndex++;
            } catch (err) {
                console.warn(`  ⚠️  Failed to render diagram ${i}: ${err.message}`);
            }
        }

        // Write processed markdown to temp file
        const tempMdFile = path.join(tempDir, `${path.basename(fullInputPath)}`);
        fs.writeFileSync(tempMdFile, processedMarkdown);

        // Convert to PDF using Pandoc (if available) or alternative
        try {
            // Try using Pandoc first (best quality)
            execSync(`pandoc "${tempMdFile}" -o "${fullOutputPath}" --pdf-engine=xelatex -V geometry:margin=1in`, { stdio: 'pipe' });
            console.log(`  ✅ Successfully converted ${name} with ${diagramIndex} diagrams`);
        } catch (pandocErr) {
            console.log(`  ℹ️  Pandoc not available, using alternative method...`);

            // Fallback: Use markdown-pdf with processed markdown
            try {
                execSync(`npx markdown-pdf "${tempMdFile}" -o "${fullOutputPath}"`, { stdio: 'pipe' });
                console.log(`  ✅ Successfully converted ${name} with ${diagramIndex} diagrams (fallback method)`);
            } catch (fallbackErr) {
                console.error(`  ❌ Both conversion methods failed: ${fallbackErr.message}`);
            }
        }

    } catch (error) {
        console.error(`  ❌ Error converting ${name}: ${error.message}`);
    }
}

async function main() {
    console.log('🚀 Starting PDF generation with Mermaid diagram support...\n');

    // Ensure output directory exists
    fs.mkdirSync('publication-pdfs', { recursive: true });

    for (const paper of papers) {
        await convertMarkdownToPDF(paper.input, paper.output, paper.name);
    }

    // Clean up temp files
    console.log('\n🧹 Cleaning up temporary files...');
    try {
        fs.rmSync(path.join('publication-pdfs', 'temp'), { recursive: true, force: true });
    } catch (err) {
        console.warn('  ⚠️  Could not clean temp directory');
    }

    console.log('\n✅ PDF generation complete!');
    console.log(`📁 PDFs saved to: ${path.resolve('publication-pdfs')}`);
}

main().catch(console.error);
