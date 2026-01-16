#!/usr/bin/env node
import { spawn } from 'child_process';
import fs from 'fs';
import path from 'path';

// Parse CLI args
const args = process.argv.slice(2);
const mode = args.find(a => a.startsWith('--mode='))?.split('=')[1] || 'local';
const isLocal = mode === 'local';

// Configuration
const PORT = 3000;
const BASE_URL = `http://localhost:${PORT}`;

// URLs to test - reduced for local mode
const LOCAL_URLS = [
    `${BASE_URL}/en`,
    `${BASE_URL}/en/resources`,
    `${BASE_URL}/en/architecture`,
    `${BASE_URL}/en/research`,
    `${BASE_URL}/en/research/papers/a1-cloud-native-enterprise-reference`,
    `${BASE_URL}/en/research/papers/a3-enterprise-observability-operational-intelligence`,
];

const CI_URLS = [
    `${BASE_URL}/en`,
    `${BASE_URL}/en/resources`,
    `${BASE_URL}/en/architecture`,
    `${BASE_URL}/en/research`,
    `${BASE_URL}/en/research/papers/a1-cloud-native-enterprise-reference`,
    `${BASE_URL}/en/research/papers/a2-high-throughput-distributed-systems`,
    `${BASE_URL}/en/research/papers/a3-enterprise-observability-operational-intelligence`,
    `${BASE_URL}/en/research/papers/a4-platform-governance-multicloud-hybrid`,
    `${BASE_URL}/en/research/papers/a5-monolith-to-cloud-native-modernization`,
    `${BASE_URL}/en/research/papers/a6-adaptive-policy-enforcement`,
    `${BASE_URL}/en/research/papers/aecp`,
    `${BASE_URL}/en/research/papers/scholarly-article`,
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

// Start server
console.log('Starting Next.js server...');
const server = spawn('npx', ['next', 'start', '-p', PORT.toString()], {
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

server.stderr.on('data', (data) => {
    // Suppress stderr unless it's an error
});

// Wait for server to be ready
async function waitForServer() {
    let attempts = 0;
    while (!serverReady && attempts < 60) {
        await new Promise(resolve => setTimeout(resolve, 1000));
        attempts++;

        // Try to fetch
        try {
            const res = await fetch(BASE_URL);
            if (res.ok) {
                serverReady = true;
                break;
            }
        } catch (e) {
            // Keep waiting
        }
    }

    if (!serverReady) {
        throw new Error('Server failed to start in time');
    }

    console.log('Server ready!');
}

// Run LHCI
async function runLHCI() {
    return new Promise((resolve, reject) => {
        const lhciArgs = [
            'autorun',
            '--config=lighthouserc.json',
            `--collect.numberOfRuns=1`,
            `--upload.outputDir=${artifactsDir}`
        ];

        // Add each URL as a separate flag
        URLS_TO_TEST.forEach(url => {
            lhciArgs.push('--collect.url', url);
        });

        const lhci = spawn('npx', ['@lhci/cli', ...lhciArgs], {
            stdio: 'inherit',
            shell: true
        });

        lhci.on('close', (code) => {
            resolve(code);
        });

        lhci.on('error', (err) => {
            reject(err);
        });
    });
}

// Main
async function main() {
    try {
        await waitForServer();

        // Additional healthcheck with wait-on
        console.log('\nVerifying server health with wait-on...');
        const waitOn = spawn('npx', [
            'wait-on',
            '-t', '120000',
            'http-get://localhost:3000/en'
        ], {
            stdio: 'inherit',
            shell: true
        });

        await new Promise((resolve, reject) => {
            waitOn.on('close', (code) => {
                if (code === 0) {
                    console.log('✅ Server health check passed!');
                    resolve();
                } else {
                    reject(new Error('Server health check failed'));
                }
            });
            waitOn.on('error', reject);
        });

        console.log('\nRunning Lighthouse CI...\n');
        const code = await runLHCI();

        // Kill server
        try {
            process.kill(server.pid);
        } catch (e) {
            // Ignore
        }
        try {
            server.kill();
        } catch (e) {
            // Ignore
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

        // Kill server
        try {
            process.kill(server.pid);
        } catch (e) {
            // Ignore
        }
        try {
            server.kill();
        } catch (e) {
            // Ignore
        }

        process.exit(1);
    }
}

main();
