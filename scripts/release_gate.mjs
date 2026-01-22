#!/usr/bin/env node
import { spawn } from 'child_process';
import fs from 'fs';
import path from 'path';

// Parse CLI args
const args = process.argv.slice(2);
const mode = args.find(a => a.startsWith('--mode='))?.split('=')[1] || 'local';
const isLocal = mode === 'local';
const isCI = mode === 'ci';

// Configuration
const ARTIFACTS_DIR = path.join(process.cwd(), 'artifacts');
const RELEASE_GATE_DIR = path.join(ARTIFACTS_DIR, 'release-gate');

// Colors
const colors = {
    reset: '\x1b[0m',
    bright: '\x1b[1m',
    red: '\x1b[31m',
    green: '\x1b[32m',
    yellow: '\x1b[33m',
    blue: '\x1b[34m',
    cyan: '\x1b[36m',
};

const log = {
    info: (msg) => console.log(`${colors.cyan}${msg}${colors.reset}`),
    success: (msg) => console.log(`${colors.green}${msg}${colors.reset}`),
    error: (msg) => console.log(`${colors.red}${msg}${colors.reset}`),
    warn: (msg) => console.log(`${colors.yellow}${msg}${colors.reset}`),
    section: (msg) => console.log(`\n${colors.bright}${colors.blue}>>> ${msg}${colors.reset}`),
};

// Ensure artifacts directory exists
function ensureArtifactsDir() {
    if (!fs.existsSync(ARTIFACTS_DIR)) {
        fs.mkdirSync(ARTIFACTS_DIR, { recursive: true });
    }
    if (!fs.existsSync(RELEASE_GATE_DIR)) {
        fs.mkdirSync(RELEASE_GATE_DIR, { recursive: true });
    }
}

// Run a command and return exit code
function runCommand(command, args = [], options = {}) {
    return new Promise((resolve) => {
        const proc = spawn(command, args, {
            stdio: 'inherit',
            shell: true,
            ...options
        });

        proc.on('close', (code) => {
            resolve(code);
        });

        proc.on('error', (err) => {
            log.error(`Failed to execute ${command}: ${err.message}`);
            resolve(1);
        });
    });
}

// Gate results tracker
const gateResults = {
    gates: [],
    startTime: Date.now(),
    mode: mode,
};

function recordGate(name, passed, duration, details = {}) {
    gateResults.gates.push({
        name,
        passed,
        duration,
        ...details
    });
}

// Gate A: Lint + Typecheck + Build
async function runGateA() {
    log.section('Running Gate A: Lint...');
    const start = Date.now();
    const lintCode = await runCommand('npm', ['run', 'lint']);
    const lintDuration = ((Date.now() - start) / 1000).toFixed(2);

    if (lintCode !== 0) {
        recordGate('Lint', false, lintDuration);
        log.error(`XXX Gate A: Lint FAILED (${lintDuration}s)`);
        return false;
    }
    recordGate('Lint', true, lintDuration);
    log.success(`✔ Gate A: Lint PASSED (${lintDuration}s)`);

    log.section('Running Gate A: Typecheck...');
    const tcStart = Date.now();
    const tcCode = await runCommand('npm', ['run', 'typecheck']);
    const tcDuration = ((Date.now() - tcStart) / 1000).toFixed(2);

    if (tcCode !== 0) {
        recordGate('Typecheck', false, tcDuration);
        log.error(`XXX Gate A: Typecheck FAILED (${tcDuration}s)`);
        return false;
    }
    recordGate('Typecheck', true, tcDuration);
    log.success(`✔ Gate A: Typecheck PASSED (${tcDuration}s)`);

    log.section('Running Gate A: Build...');
    const buildStart = Date.now();
    const buildCode = await runCommand('npm', ['run', 'build']);
    const buildDuration = ((Date.now() - buildStart) / 1000).toFixed(2);

    if (buildCode !== 0) {
        recordGate('Build', false, buildDuration);
        log.error(`XXX Gate A: Build FAILED (${buildDuration}s)`);
        return false;
    }
    recordGate('Build', true, buildDuration);
    log.success(`✔ Gate A: Build PASSED (${buildDuration}s)`);

    return true;
}

// Gate B: SEO
async function runGateB() {
    log.section('Running Gate B: SEO...');
    const start = Date.now();
    const code = await runCommand('node', ['scripts/seo_gate.mjs', `--mode=${mode}`]);
    const duration = ((Date.now() - start) / 1000).toFixed(2);

    if (code !== 0) {
        recordGate('SEO', false, duration);
        log.error(`XXX Gate B: SEO FAILED (${duration}s)`);
        return false;
    }
    recordGate('SEO', true, duration);
    log.success(`✔ Gate B: SEO PASSED (${duration}s)`);
    return true;
}

// Gate C: Performance (LHCI)
async function runGateC() {
    // Skip on Windows due to known Lighthouse temp file cleanup issues
    if (process.platform === 'win32') {
        log.warn('⚠️  Skipping Performance Gate on Windows (known Lighthouse temp file issues)');
        log.warn('    Performance gate will run in CI (Linux environment)');
        recordGate('Performance', true, 0, { skipped: true, reason: 'Windows platform' });
        return true;
    }

    log.section('Running Gate C: Performance (LHCI)...');
    const start = Date.now();
    const code = await runCommand('node', ['scripts/perf_gate.mjs', `--mode=${mode}`]);
    const duration = ((Date.now() - start) / 1000).toFixed(2);

    if (code !== 0) {
        recordGate('Performance', false, duration);
        log.error(`XXX Gate C: Performance FAILED (${duration}s)`);
        return false;
    }
    recordGate('Performance', true, duration);
    log.success(`✔ Gate C: Performance PASSED (${duration}s)`);
    return true;
}

// Gate D: Security
async function runGateD() {
    log.section('Running Gate D: Security...');
    const start = Date.now();
    const code = await runCommand('node', ['scripts/security_gate.mjs']);
    const duration = ((Date.now() - start) / 1000).toFixed(2);

    if (code !== 0) {
        recordGate('Security', false, duration);
        log.error(`XXX Gate D: Security FAILED (${duration}s)`);
        return false;
    }
    recordGate('Security', true, duration);
    log.success(`✔ Gate D: Security PASSED (${duration}s)`);
    return true;
}

// Gate E: i18n
async function runGateE() {
    log.section('Running Gate E: i18n...');
    const start = Date.now();
    const code = await runCommand('npx', ['tsx', 'scripts/i18n_gate.ts']);
    const duration = ((Date.now() - start) / 1000).toFixed(2);

    if (code !== 0) {
        recordGate('i18n', false, duration);
        log.error(`XXX Gate E: i18n FAILED (${duration}s)`);
        return false;
    }
    recordGate('i18n', true, duration);
    log.success(`✔ Gate E: i18n PASSED (${duration}s)`);
    return true;
}

// Main orchestrator
async function main() {
    console.log(`
╔══════════════════════════════════════════════════════════════════════╗
║  UNIFIED RELEASE GATE (${mode.toUpperCase()} MODE)                                    ║
╚══════════════════════════════════════════════════════════════════════╝
`);

    ensureArtifactsDir();

    const gates = [
        { name: 'Gate A (Lint/Typecheck/Build)', fn: runGateA },
        { name: 'Gate B (SEO)', fn: runGateB },
        { name: 'Gate C (Performance)', fn: runGateC },
        { name: 'Gate D (Security)', fn: runGateD },
        { name: 'Gate E (i18n)', fn: runGateE },
    ];

    let allPassed = true;

    for (const gate of gates) {
        const passed = await gate.fn();
        if (!passed) {
            allPassed = false;
            break; // Fail fast
        }
    }

    // Calculate total duration
    const totalDuration = ((Date.now() - gateResults.startTime) / 1000).toFixed(2);
    gateResults.totalDuration = totalDuration;
    gateResults.passed = allPassed;

    // Write summary.json
    const summaryPath = path.join(RELEASE_GATE_DIR, 'summary.json');
    fs.writeFileSync(summaryPath, JSON.stringify(gateResults, null, 2));

    // Write summary.md
    const summaryMd = generateSummaryMarkdown(gateResults);
    const summaryMdPath = path.join(RELEASE_GATE_DIR, 'summary.md');
    fs.writeFileSync(summaryMdPath, summaryMd);

    // Final report
    console.log(`
╔══════════════════════════════════════════════════════════════════════╗
║  RESULT: ${allPassed ? log.success('PASS (Ready for Release)') : log.error('FAIL (Release Blocked)')}                                      ║
╚══════════════════════════════════════════════════════════════════════╝
`);

    if (!allPassed) {
        log.error(`\n❌ Release gate FAILED. Check artifacts/release-gate/summary.json for details.\n`);
        process.exit(1);
    } else {
        log.success(`\n✅ All gates PASSED in ${totalDuration}s. Artifacts saved to artifacts/release-gate/\n`);
        process.exit(0);
    }
}

function generateSummaryMarkdown(results) {
    let md = `# Release Gate Summary\n\n`;
    md += `**Mode:** ${results.mode}\n`;
    md += `**Status:** ${results.passed ? '✅ PASSED' : '❌ FAILED'}\n`;
    md += `**Total Duration:** ${results.totalDuration}s\n`;
    md += `**Timestamp:** ${new Date().toISOString()}\n\n`;
    md += `## Gate Results\n\n`;
    md += `| Gate | Status | Duration |\n`;
    md += `|------|--------|----------|\n`;

    for (const gate of results.gates) {
        const status = gate.passed ? '✅ PASS' : '❌ FAIL';
        md += `| ${gate.name} | ${status} | ${gate.duration}s |\n`;
    }

    md += `\n## Artifacts\n\n`;
    md += `- SEO Report: \`artifacts/seo-gate/report.json\`\n`;
    md += `- Performance Report: \`artifacts/lhci/\`\n`;
    md += `- Security Report: \`artifacts/security/audit.json\`\n`;
    md += `- i18n Report: \`artifacts/i18n-gate/report.json\`\n`;

    return md;
}

main().catch(err => {
    log.error(`Fatal error: ${err.message}`);
    process.exit(1);
});
