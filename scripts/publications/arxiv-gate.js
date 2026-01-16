/**
 * arxiv-gate.js
 * Validates arXiv bundles:
 * - Compiles LaTeX
 * - Strict artifact checks (ignoring safety shims)
 */

const fs = require('fs');
const path = require('path');
const { exec } = require('child_process');
const { promisify } = require('util');

const execAsync = promisify(exec);
const BUNDLE_ROOT = path.join(process.cwd(), 'submission', 'arxiv');
const REPORT_FILE = path.join(process.cwd(), 'reports', 'arxiv_gate_report.md');

async function run() {
    console.log("Starting arXiv Strict Gateway...");

    if (!fs.existsSync(path.dirname(REPORT_FILE))) fs.mkdirSync(path.dirname(REPORT_FILE), { recursive: true });

    const bundles = fs.readdirSync(BUNDLE_ROOT).filter(d => fs.statSync(path.join(BUNDLE_ROOT, d)).isDirectory());

    let report = `# arXiv Gate Report\nGenerated: ${new Date().toISOString()}\n\n| Paper | Status | Checks | Issues |\n|---|---|---|---|\n`;
    let allPass = true;

    for (const paperId of bundles) {
        process.stdout.write(`Validating ${paperId}... `);
        const dir = path.join(BUNDLE_ROOT, paperId);
        const texFile = path.join(dir, 'main.tex');

        let issues = [];
        let checks = [];

        // 1. Content Checks
        const content = fs.readFileSync(texFile, 'utf8');

        // Remove Preamble Shims from check
        const bodyContent = content.replace(/\\providecommand.*/g, '% shim');

        if (bodyContent.match(/[A-Z]:\\/)) issues.push('Absolute Windows Path');
        if (bodyContent.match(/\/Users\//)) issues.push('Absolute Users Path');
        if (bodyContent.match(/Placeholder Diagram/i)) issues.push('Placeholder Text');

        if (bodyContent.includes('\\pandocbounded')) issues.push('\\pandocbounded detected in body');
        if (bodyContent.match(/^!\[/m)) issues.push('Markdown Image Syntax (![) detected');
        if (bodyContent.match(/^---$/m)) issues.push('YAML/Markdown separator (---) detected');
        if (bodyContent.match(/\\includegraphics\[(.*?)\]\s*$/m)) issues.push('Includegraphics missing filename');

        checks.push(issues.length === 0 ? 'Content OK' : 'Content FAIL');

        // 2. Compilation
        let compiled = false;
        try {
            const cmd = `pdflatex -interaction=nonstopmode main.tex`;
            await execAsync(cmd, { cwd: dir });

            if (fs.existsSync(path.join(dir, 'main.pdf'))) {
                compiled = true;
            } else {
                issues.push('PDF not generated');
            }
        } catch (e) {
            if (fs.existsSync(path.join(dir, 'main.pdf'))) {
                compiled = true;
            } else {
                issues.push('Compilation Failed');
            }
        }
        checks.push(compiled ? 'Compile OK' : 'Compile FAIL');

        // 3. Asset Check
        const figs = path.join(dir, 'figures');
        const figCount = fs.existsSync(figs) ? fs.readdirSync(figs).length : 0;
        checks.push(`Figs: ${figCount}`);

        const status = (issues.length === 0 && compiled) ? 'PASS' : 'FAIL';
        if (status === 'FAIL') allPass = false;

        console.log(status);

        report += `| ${paperId} | **${status}** | ${checks.join(', ')} | ${issues.join('<br>')} |\n`;

        // Cleanup PDF
        if (fs.existsSync(path.join(dir, 'main.pdf'))) fs.unlinkSync(path.join(dir, 'main.pdf'));
        ['.log', '.aux', '.out'].forEach(ext => {
            if (fs.existsSync(path.join(dir, `main${ext}`))) fs.unlinkSync(path.join(dir, `main${ext}`));
        });
    }

    fs.writeFileSync(REPORT_FILE, report);
    console.log(`Report written to ${REPORT_FILE}`);

    if (!allPass) {
        console.error("GATE FAILED. See report.");
        process.exit(1);
    }
}

run().catch(e => {
    console.error(e);
    process.exit(1);
});
