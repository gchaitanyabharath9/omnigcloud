import { spawn } from 'child_process';
import { JSDOM } from 'jsdom';
import fs from 'fs';
import path from 'path';

// Parse CLI args
const args = process.argv.slice(2);
const mode = args.find(a => a.startsWith('--mode='))?.split('=')[1] || 'local';
const isLocal = mode === 'local';

// Configuration
const PORT = 3001;
const BASE_URL = `http://localhost:${PORT}`;
const MAX_URLS = isLocal ? 50 : 200; // Reduced for local mode
const REQUIRED_PAPERS = [
    '/en/research/papers/a1-cloud-native-enterprise-reference',
    '/en/research/papers/a2-high-throughput-distributed-systems',
    '/en/research/papers/a3-enterprise-observability-operational-intelligence',
    '/en/research/papers/a4-platform-governance-multicloud-hybrid',
    '/en/research/papers/a5-monolith-to-cloud-native-modernization',
    '/en/research/papers/a6-adaptive-policy-enforcement',
    '/en/research/papers/aecp',
    '/en/research/papers/scholarly-article'
];

// Paths that are allowed to have noindex (secure areas)
const ALLOWED_NOINDEX_PATHS = [
    '/dashboard',
    '/account',
    '/settings',
    '/admin'
];

// State
const visited = new Set();
const queue = [];
const violations = [];
const sitemapUrls = new Set();
const canonicalMap = new Map(); // url -> canonical_url

// Colors
const red = (text) => `\x1b[31m${text}\x1b[0m`;
const green = (text) => `\x1b[32m${text}\x1b[0m`;
const yellow = (text) => `\x1b[33m${text}\x1b[0m`;

async function startServer() {
    console.log('Starting Next.js server for SEO validation...');
    const server = spawn('npx', ['next', 'start', '-p', PORT.toString()], {
        stdio: 'pipe',
        shell: true,
        env: { ...process.env, NODE_ENV: 'production' }
    });

    server.stdout.on('data', (data) => {
        console.log(`[Next.js]: ${data}`);
    });

    server.stderr.on('data', (data) => {
        console.error(`[Next.js Error]: ${data}`);
    });

    // Wait for server to be ready
    return new Promise((resolve, reject) => {
        let attempts = 0;
        const interval = setInterval(async () => {
            attempts++;
            try {
                const res = await fetch(BASE_URL);
                if (res.ok) {
                    clearInterval(interval);
                    console.log(`Server ready at ${BASE_URL}`);
                    resolve(server);
                }
            } catch (e) {
                if (attempts > 60) {
                    clearInterval(interval);
                    server.kill();
                    reject(new Error('Server failed to start in time'));
                }
            }
        }, 1000);
    });
}

async function fetchSitemap() {
    console.log('Fetching sitemap...');
    try {
        const res = await fetch(`${BASE_URL}/sitemap.xml`);
        if (!res.ok) {
            violations.push({ type: 'SITEMAP', url: '/sitemap.xml', message: `Sitemap returned ${res.status}` });
            return;
        }
        const text = await res.text();
        // Simple regex parse for <loc>
        const matches = text.matchAll(/<loc>(.*?)<\/loc>/g);
        for (const match of matches) {
            let url = match[1];
            try {
                const parsedUrl = new URL(url);
                if (
                    parsedUrl.hostname === 'omnigcloud.com' ||
                    parsedUrl.hostname === 'www.omnigcloud.com' ||
                    parsedUrl.hostname === 'localhost' ||
                    parsedUrl.hostname === '127.0.0.1'
                ) {
                    // Normalize to local for crawling
                    url = `${BASE_URL}${parsedUrl.pathname}${parsedUrl.search}`;
                }
            } catch (e) {
                // If not a valid absolute URL, assume it might be relative or ignore
            }
            sitemapUrls.add(url);
        }
        console.log(`Found ${sitemapUrls.size} URLs in sitemap.`);
    } catch (e) {
        violations.push({ type: 'SITEMAP', url: '/sitemap.xml', message: `Failed to fetch sitemap: ${e.message}` });
    }
}

async function checkUrl(url) {
    if (visited.has(url)) return;
    visited.add(url);

    // Check for "medium" in URL
    if (url.toLowerCase().includes('medium')) {
        violations.push({ type: 'MEDIUM', url, message: 'URL contains "medium" artifact' });
    }

    try {
        const res = await fetch(url, { redirect: 'manual' });

        // 1. Status Check
        if (res.status >= 400) {
            violations.push({ type: 'STATUS', url, message: `Status ${res.status}` });
            return; // Don't parse body if error
        }

        // Redirect check
        if (res.status >= 300 && res.status < 400) {
            // If it's in sitemap, it shouldn't redirect
            if (sitemapUrls.has(url)) {
                violations.push({ type: 'SITEMAP_REDIRECT', url, message: `Sitemap URL redirects to ${res.headers.get('location')}` });
            }
            return;
        }

        const html = await res.text();
        const dom = new JSDOM(html);
        const doc = dom.window.document;

        // 2. Canonical Check
        const canonical = doc.querySelector('link[rel="canonical"]')?.getAttribute('href');
        if (!canonical) {
            violations.push({ type: 'CANONICAL', url, message: 'Missing canonical tag' });
        } else {
            // Validate canonical format
            if (!canonical.startsWith('http')) {
                violations.push({ type: 'CANONICAL', url, message: `Invalid canonical format: ${canonical}` });
            } else {
                try {
                    const parsedCanonical = new URL(canonical, BASE_URL);
                    if (parsedCanonical.hostname === 'omnigcloud.com' || parsedCanonical.hostname === 'www.omnigcloud.com' || parsedCanonical.origin === new URL(BASE_URL).origin) {
                        canonicalMap.set(canonical, url);
                    }
                } catch (e) {
                    violations.push({ type: 'CANONICAL', url, message: `Invalid canonical URL: ${canonical}` });
                }
            }
        }

        // 3. Noindex Check
        const metaRobots = doc.querySelector('meta[name="robots"]')?.getAttribute('content');
        if (metaRobots && metaRobots.includes('noindex')) {
            // Check if this path is allowed to have noindex
            const urlPath = new URL(url).pathname;
            const isAllowed = ALLOWED_NOINDEX_PATHS.some(allowed => urlPath.includes(allowed));

            if (!isAllowed) {
                violations.push({ type: 'NOINDEX', url, message: 'Public page has noindex' });
            }
        }

        // 4. Hreflang Check
        const hreflangs = Array.from(doc.querySelectorAll('link[rel="alternate"][hreflang]'));
        for (const link of hreflangs) {
            const href = link.getAttribute('href');
            if (!href) continue;
            // We could validte these exist, but that doubles crawl time. For now, check format.
            if (!href.startsWith('http')) {
                violations.push({ type: 'HREFLANG', url, message: `Invalid hreflang href: ${href}` });
            }
        }

        // 5. Internal Links (collect for crawl)
        const links = Array.from(doc.querySelectorAll('a[href]'));
        for (const link of links) {
            try {
                const href = link.getAttribute('href');
                if (!href) continue;
                const parsedHref = new URL(href, url); // Use current page as base for relative links
                const baseOrigin = new URL(BASE_URL).origin;

                if (parsedHref.origin === baseOrigin && !visited.has(parsedHref.href)) {
                    // Avoid crawling infinite query params
                    if (!parsedHref.search && !parsedHref.hash) {
                        if (queue.length < MAX_URLS * 2) {
                            queue.push(parsedHref.href);
                        }
                    }
                }
            } catch (e) {
                // Ignore invalid links
            }
        }

    } catch (e) {
        violations.push({ type: 'FETCH', url, message: `Fetch failed: ${e.message}` });
    }
}

async function run() {
    let server;
    try {
        server = await startServer();
        await fetchSitemap();

        // Seed Queue with Sitemap + Required Papers + Home
        if (sitemapUrls.size > 0) {
            sitemapUrls.forEach(u => queue.push(u));
        } else {
            queue.push(BASE_URL);
        }

        // Ensure Required Papers are visited even if not in sitemap (to catch validity)
        REQUIRED_PAPERS.forEach(p => {
            queue.push(`${BASE_URL}${p}`);
            // Also check if they were in sitemap
            let found = false;
            for (const sUrl of sitemapUrls) {
                if (sUrl.includes(p)) found = true;
            }
            if (!found && sitemapUrls.size > 0) { // Only fail if sitemap exists
                violations.push({ type: 'MISSING_PAPER', url: p, message: 'Paper not found in sitemap' });
            }
        });

        // Crawl
        let processed = 0;
        while (queue.length > 0 && processed < MAX_URLS) {
            const url = queue.shift();
            // dedupe again just in case
            if (!visited.has(url)) {
                await checkUrl(url);
                processed++;
                process.stdout.write(`\rCrawled: ${processed}/${MAX_URLS} | Violations: ${violations.length}`);
            }
        }
        console.log('\nCrawl complete.');

    } catch (e) {
        console.error('Fatal error:', e);
        violations.push({ type: 'FATAL', url: 'system', message: e.message });
    } finally {
        if (server) {
            console.log('Stopping server...');
            if (process.platform === 'win32') {
                spawn('taskkill', ['/F', '/T', '/PID', server.pid.toString()], { shell: true });
            } else {
                try {
                    process.kill(server.pid);
                } catch (e) {
                    // Ignore ESRCH
                }
                try {
                    server.kill();
                } catch (e) { }
            }
        }
    }

    // Write artifacts
    const artifactsDir = path.join(process.cwd(), 'artifacts', 'seo-gate');
    if (!fs.existsSync(artifactsDir)) {
        fs.mkdirSync(artifactsDir, { recursive: true });
    }

    const report = {
        timestamp: new Date().toISOString(),
        mode,
        urlsCrawled: visited.size,
        violations: violations.length,
        details: violations,
        passed: violations.length === 0
    };

    fs.writeFileSync(
        path.join(artifactsDir, 'report.json'),
        JSON.stringify(report, null, 2)
    );

    // Report
    console.log('\n--- SEO GATE REPORT ---');
    if (violations.length === 0) {
        console.log(green('PASSED: No violations found.'));
        process.exit(0);
    } else {
        console.log(red(`FAILED: ${violations.length} violations found.`));
        console.table(violations.map(v => ({
            Type: v.type,
            URL: v.url.replace(BASE_URL, ''),
            Message: v.message
        })));
        process.exit(1);
    }
}

run();
