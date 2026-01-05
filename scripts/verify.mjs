
/**
 * Master Quality Gate Runner
 * Usage: node scripts/verify.mjs [quick|all]
 */
import { spawn, execSync, spawnSync } from 'child_process';
import fs from 'fs';
import path from 'path';

// Parse Args
const ARGS = process.argv.slice(2);
const MODE = ARGS[0] || 'all'; // 'quick' or 'all'

const RED = '\x1b[31m';
const GREEN = '\x1b[32m';
const YELLOW = '\x1b[33m';
const CYAN = '\x1b[36m';
const RESET = '\x1b[0m';

function log(msg, color = RESET) {
    console.log(`${color}${msg}${RESET}`);
}

function runStepSync(name, cmd, extraEnv = {}) {
    log(`\n🔹 [${name}] Running...`, YELLOW);
    const start = Date.now();
    try {
        execSync(cmd, {
            stdio: 'inherit',
            env: { ...process.env, ...extraEnv }
        });
        const duration = ((Date.now() - start) / 1000).toFixed(2);
        log(`✅ [${name}] PASSED (${duration}s)`, GREEN);
        return true;
    } catch (e) {
        const duration = ((Date.now() - start) / 1000).toFixed(2);
        log(`❌ [${name}] FAILED (${duration}s)`, RED);
        return false;
    }
}

async function startServer() {
    log(`\n🔹 [Server] Starting Production Server on 3001...`, YELLOW);
    const server = spawn('npm', ['run', 'start', '--', '-p', '3001'], {
        shell: true,
        stdio: ['ignore', 'pipe', 'pipe'],
        detached: false,
        env: { ...process.env, QUALITY_GATE: 'true' }
    });

    let output = '';
    server.stdout.on('data', d => { output += d.toString(); });
    server.stderr.on('data', d => { output += d.toString(); });

    // Poll for readiness
    for (let i = 0; i < 60; i++) { // 60s timeout
        if (output.includes('Listening on') || output.includes('Ready in') || output.includes('started server on') || output.includes('localhost:3001')) {
            log('✅ Server Ready', GREEN);
            return server;
        }
        await new Promise(r => setTimeout(r, 1000));
    }

    log('❌ Server failed to start within 60s', RED);
    console.log(output);
    try { process.kill(server.pid); } catch (e) { }
    return null;
}

async function main() {
    log(`🚀 Starting Local Quality Gates [Mode: ${MODE}]`, CYAN);

    // 1. Environment Gate
    if (MODE !== 'skip-env') {
        const isCI = process.env.VERCEL || process.env.CI;
        const nodeVer = process.version;
        if (!nodeVer.startsWith('v20') && !nodeVer.startsWith('v22') && !nodeVer.startsWith('v23')) {
            log(`⚠️  Node version ${nodeVer} may not match Vercel (v20/v22).`, YELLOW);
        }
        if (!isCI && !fs.existsSync('.env.local') && !fs.existsSync('.env')) {
            log('❌ Missing .env file', RED);
            process.exit(1);
        }
        log('✅ Environment Check', GREEN);
    }

    let success = true;

    // 2. Static Quality Gate
    if (['all', 'quick'].includes(MODE)) {
        if (!runStepSync('Secret Scan', 'npm run check:secrets')) success = false;
        if (!runStepSync('ESLint', 'npm run lint')) success = false;
        if (!runStepSync('Typecheck', 'npm run typecheck')) success = false;
        if (!runStepSync('Cost Guardrails', 'node scripts/cost-check.mjs')) success = false;
    }

    if (!success && MODE === 'quick') process.exit(1);

    // 3. i18n Gate
    if (['all', 'i18n'].includes(MODE)) {
        if (!runStepSync('i18n Coverage', 'npm run qa:i18n')) success = false;
    }

    // 5. Build Gate
    if (['all', 'build'].includes(MODE)) {
        if (!runStepSync('Next Build', 'npx next build', { QUALITY_GATE: 'true' })) {
            log('🛑 Build Failed - Stopping further tests', RED);
            process.exit(1);
        }
    }

    // 6. Runtime Gates (Smoke, Responsive, SEO, Perf)
    if (['all', 'smoke', 'responsive', 'seo', 'perf'].includes(MODE)) {
        if (process.env.VERCEL || process.env.CI) {
            log('\n⏭️ Skipping runtime quality gates in Vercel/CI environment.', YELLOW);
        } else {
            const server = await startServer();
            if (!server) process.exit(1);

            try {
                // Smoke Tests
                if (['all', 'smoke'].includes(MODE)) {
                    if (!runStepSync('Smoke Tests', 'node scripts/smoke-check.mjs', { QUALITY_GATE: 'true' })) success = false;
                }

                // SEO Sanity Check (Runtime)
                if (['all', 'seo'].includes(MODE)) {
                    if (!runStepSync('SEO Head Tags Check', 'node scripts/seo-sanity.mjs', { QUALITY_GATE: 'true' })) success = false;
                }

                // Playwright Tests (E2E, Responsive & Multi-browser)
                if (['all', 'responsive', 'perf'].includes(MODE)) {
                    // Using the gate config which covers multiple viewports/browsers
                    if (!runStepSync('E2E Quality Gate (Multi-browser/Viewport)', 'npx playwright test -c playwright.gate.config.ts', { QUALITY_GATE: 'true' })) success = false;
                }

            } finally {
                log('🔻 Stopping Server...', YELLOW);
                // Tree kill for windows
                try { execSync(`taskkill /pid ${server.pid} /T /F`, { stdio: 'ignore' }); } catch (e) { }
                server.kill();
            }
        }
    }

    // Final Summary
    console.log('\n──────────────────────────────────────────────────');
    if (success) {
        log('🎉 LOCAL QUALITY GATE PASSED - READY FOR PRE-RELEASE', GREEN);
        process.exit(0);
    } else {
        log('💥 LOCAL QUALITY GATE FAILED - CHECK LOGS ABOVE', RED);
        process.exit(1);
    }
}

main().catch(e => {
    console.error(e);
    process.exit(1);
});
