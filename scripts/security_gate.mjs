import { spawnSync } from 'child_process';
import fs from 'fs';

console.log('\n╔══════════════════════════════════════════════════════════════════════╗');
console.log('║         SECURITY GATE (npm audit)                                   ║');
console.log('╚══════════════════════════════════════════════════════════════════════╝\n');

// Ensure artifacts dir exists
const dir = './artifacts/security';
if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
}

// Check Lockfile
if (!fs.existsSync('package-lock.json')) {
    console.log('\x1b[31mFAIL: package-lock.json missing.\x1b[0m');
    process.exit(1);
}

// Run Audit
console.log('Running npm audit --audit-level=high...');
const audit = spawnSync('npm', ['audit', '--json', '--audit-level=high'], {
    shell: true,
    encoding: 'utf-8'
});

fs.writeFileSync(`${dir}/audit.json`, audit.stdout || '{}');

if (audit.status !== 0) {
    console.log('\x1b[31mFAIL: High/Critical vulnerabilities found.\x1b[0m');
    try {
        const report = JSON.parse(audit.stdout);
        const vulns = report.metadata?.vulnerabilities || {};
        console.log('Vulnerability Summary:', vulns);
    } catch (e) {
        console.log('Could not parse audit report JSON.');
    }
    process.exit(1);
}

console.log('\x1b[32mPASS: No high/critical vulnerabilities.\x1b[0m');
process.exit(0);
