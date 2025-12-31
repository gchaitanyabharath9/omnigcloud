#!/usr/bin/env node

/**
 * Secrets Hygiene Check
 * 
 * Validates that no sensitive values are exposed in NEXT_PUBLIC_* environment variables.
 * This script runs at build time to prevent accidental secret exposure in the client bundle.
 */

const fs = require('fs');
const path = require('path');

// Forbidden patterns in NEXT_PUBLIC_* variables
const FORBIDDEN_PATTERNS = [
    /secret/i,
    /key/i,
    /token/i,
    /password/i,
    /api[_-]?key/i,
    /private/i,
    /credential/i,
    /auth[_-]?secret/i,
    /session[_-]?secret/i,
    /jwt[_-]?secret/i,
    /csrf[_-]?secret/i,
    /encryption/i,
    /salt/i,
    /hash[_-]?key/i
];

// Allowed exceptions (legitimate public values)
const ALLOWED_EXCEPTIONS = [
    'NEXT_PUBLIC_RECAPTCHA_SITE_KEY',  // Public site key (not secret)
    'NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY', // Public publishable key
    'NEXT_PUBLIC_MAPBOX_TOKEN',        // Public access token
    'NEXT_PUBLIC_GIT_COMMIT',          // Build Metadata (Public)
    'NEXT_PUBLIC_VERCEL_GIT_COMMIT_SHA', // Vercel Build Metadata (Public)
];

// Sensitive value patterns (actual secret-like values)
const SENSITIVE_VALUE_PATTERNS = [
    /^sk_/,           // Stripe secret keys
    /^pk_test_/,      // Stripe test keys (still sensitive)
    /^rk_/,           // Resend API keys
    /^[A-Za-z0-9]{32,}$/, // Long random strings (likely secrets)
];

function checkSecretsHygiene() {
    console.log('🔒 Checking secrets hygiene...\n');

    const errors = [];
    const warnings = [];

    // Check all environment variables
    for (const [key, value] of Object.entries(process.env)) {
        // Only check NEXT_PUBLIC_* variables
        if (!key.startsWith('NEXT_PUBLIC_')) {
            continue;
        }

        // Skip allowed exceptions
        if (ALLOWED_EXCEPTIONS.includes(key)) {
            console.log(`✅ ${key} - Allowed exception`);
            continue;
        }

        // Check variable name for forbidden patterns
        const hasForbiddenName = FORBIDDEN_PATTERNS.some(pattern => pattern.test(key));
        if (hasForbiddenName) {
            errors.push({
                type: 'FORBIDDEN_NAME',
                key,
                message: `Environment variable name contains forbidden pattern: ${key}`
            });
        }

        // Check variable value for sensitive patterns
        if (value) {
            const hasSensitiveValue = SENSITIVE_VALUE_PATTERNS.some(pattern => pattern.test(value));
            if (hasSensitiveValue) {
                warnings.push({
                    type: 'SUSPICIOUS_VALUE',
                    key,
                    message: `Environment variable value looks like a secret: ${key}`
                });
            }
        }
    }

    // Check .env files for NEXT_PUBLIC_ secrets
    const envFiles = ['.env', '.env.local', '.env.production'];
    for (const envFile of envFiles) {
        const envPath = path.join(process.cwd(), envFile);
        if (fs.existsSync(envPath)) {
            const content = fs.readFileSync(envPath, 'utf-8');
            const lines = content.split('\n');

            lines.forEach((line, index) => {
                const trimmed = line.trim();
                if (!trimmed || trimmed.startsWith('#')) return;

                const match = trimmed.match(/^(NEXT_PUBLIC_[A-Z_]+)=/);
                if (match) {
                    const key = match[1];

                    // Skip allowed exceptions
                    if (ALLOWED_EXCEPTIONS.includes(key)) return;

                    const hasForbiddenName = FORBIDDEN_PATTERNS.some(pattern => pattern.test(key));
                    if (hasForbiddenName) {
                        errors.push({
                            type: 'FORBIDDEN_NAME_IN_FILE',
                            key,
                            file: envFile,
                            line: index + 1,
                            message: `Found forbidden NEXT_PUBLIC_ variable in ${envFile}:${index + 1}: ${key}`
                        });
                    }
                }
            });
        }
    }

    // Report results
    console.log('\n📊 Results:\n');

    if (errors.length === 0 && warnings.length === 0) {
        console.log('✅ No secrets hygiene issues found!\n');
        return 0;
    }

    if (errors.length > 0) {
        console.error('❌ ERRORS (Build will fail):\n');
        errors.forEach(error => {
            console.error(`  ❌ ${error.message}`);
            if (error.file) {
                console.error(`     File: ${error.file}:${error.line}`);
            }
        });
        console.error('');
    }

    if (warnings.length > 0) {
        console.warn('⚠️  WARNINGS (Review recommended):\n');
        warnings.forEach(warning => {
            console.warn(`  ⚠️  ${warning.message}`);
        });
        console.warn('');
    }

    if (errors.length > 0) {
        console.error('❌ Secrets hygiene check FAILED!\n');
        console.error('Fix the errors above before building.\n');
        console.error('Guidelines:');
        console.error('  - Never use NEXT_PUBLIC_ prefix for secrets');
        console.error('  - Server-only secrets should NOT have NEXT_PUBLIC_ prefix');
        console.error('  - See docs/secrets-hygiene.md for details\n');
        return 1;
    }

    console.log('✅ Secrets hygiene check PASSED (with warnings)\n');
    return 0;
}

// Run check
const exitCode = checkSecretsHygiene();
process.exit(exitCode);
