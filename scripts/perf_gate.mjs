#!/usr/bin/env node
import { spawn, execSync } from 'child_process';
import fs from 'fs';
import path from 'path';

// Parse CLI args
const args = process.argv.slice(2);
const mode = args.find(a => a.startsWith('--mode='))?.split('=')[1] || 'local';
const isLocal = mode === 'local';

// Configuration
const PORT = 3000;
const BASE_URL = `http://localhost:${PORT}`;
const CHROME_DEBUG_PORT = 9222;

// URLs to test - reduced for local mode
const LOCAL_URLS = [
    `${BASE_URL}/en`,
    `${BASE_URL}/en/resources`,
    `${BASE_URL}/en/architecture`,
];

const CI_URLS = [
    `${BASE_URL}/en`,
    `${BASE_URL}/en/resources`,
    `${BASE_URL}/en/architecture`,
    `${BASE_URL}/en/research`,
    `${BASE_URL}/en/research/papers/aecp`,
];

const URLS_TO_TEST = isLocal ? LOCAL_URLS : CI_URLS;

console.log(`
╔══════════════════════════════════════════════════════════════════════╗
║         PERFORMANCE GATE (LHCI) - ${mode.toUpperCase()} MODE                           ║
╚══════════════════════════════════════════════════════════════════════╝
`);

console.log(`Testing ${URLS_TO_TEST.length} URLs...`);

// Ensure artifacts directory
const artifactsDir = path.join(process.cwd(), 'artifacts', 'lhci');
if (!fs.existsSync(artifactsDir)) {
    fs.mkdirSync(artifactsDir, { recursive: true });
}

// Global server reference
let server;

// Start server
async function startServer() {
    console.log('Starting Next.js server...');
    server = spawn('npx', ['next', 'start', '-p', PORT.toString()], {
        stdio: 'pipe',
        shell: true,
        env: { ...process.env, NODE_ENV: 'production' }
    });

    let serverReady = false;
    server.stdout.on('data', (data) => {
        const output = data.toString();
        if (output.includes('Ready') || output.includes('started server')) {
            serverReady = true;
        }
    });

    // Wait for server
    let attempts = 0;
    while (!serverReady && attempts < 60) {
        await new Promise(resolve => setTimeout(resolve, 1000));
        attempts++;
        try {
            const res = await fetch(BASE_URL);
            if (res.ok) {
                serverReady = true;
                break;
            }
        } catch (e) { }
    }

    if (!serverReady) throw new Error('Server failed to start');
    console.log('Server ready!');
}

// Chrome management for Windows
let chromeProcess;
function startChrome() {
    if (process.platform !== 'win32') return;

    console.log('Starting external Chrome for Lighthouse (Windows workaround)...');
    const chromePath = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';

    // Kill any existing chrome on debug port
    try {
        execSync(`taskkill /F /IM chrome.exe /T`, { stdio: 'ignore' });
    } catch (e) { }

    chromeProcess = spawn(chromePath, [
        `--remote-debugging-port=${CHROME_DEBUG_PORT}`,
        '--headless=new',
        '--no-sandbox',
        '--disable-gpu',
        '--user-data-dir=' + path.join(process.cwd(), 'artifacts', 'chrome-profile')
    ], {
        detached: true,
        stdio: 'ignore'
    });
}

function stopChrome() {
    if (process.platform !== 'win32') return;
    console.log('Stopping Chrome...');
    try {
        execSync(`taskkill /F /IM chrome.exe /T`, { stdio: 'ignore' });
    } catch (e) { }
}

// Run LHCI
async function runLHCI() {
    return new Promise((resolve, reject) => {
        const lhci = spawn('npx', [
            '@lhci/cli',
            'autorun',
            '--config=lighthouserc.json'
        ], {
            stdio: 'inherit',
            shell: true,
            env: {
                ...process.env,
                TEMP: path.join(process.cwd(), 'artifacts', 'tmp'),
                TMP: path.join(process.cwd(), 'artifacts', 'tmp')
            }
        });

        lhci.on('close', resolve);
        lhci.on('error', reject);
    });
}

// Main
async function main() {
    try {
        const tmpDir = path.join(process.cwd(), 'artifacts', 'tmp');
        if (!fs.existsSync(tmpDir)) fs.mkdirSync(tmpDir, { recursive: true });

        await startServer();
        startChrome();

        // Wait for Chrome to be ready
        if (process.platform === 'win32') {
            await new Promise(resolve => setTimeout(resolve, 5000));
        }

        console.log('\nRunning Lighthouse CI...\n');
        const code = await runLHCI();

        // Cleanup
        stopChrome();
        if (server) {
            try { process.kill(server.pid); } catch (e) { }
            try { server.kill(); } catch (e) { }
        }

        if (code === 0) {
            console.log('\n✅ Performance gate PASSED');
            process.exit(0);
        } else {
            console.log('\n❌ Performance gate FAILED');
            process.exit(1);
        }
    } catch (err) {
        console.error('Fatal error:', err.message);
        stopChrome();
        if (server) {
            try { process.kill(server.pid); } catch (e) { }
            try { server.kill(); } catch (e) { }
        }
        process.exit(1);
    }
}

main();
