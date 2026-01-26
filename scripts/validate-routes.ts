import { NAV_CONFIG } from '../src/config/nav';
import { PUBLIC_ROUTES_MANIFEST } from '../src/config/routes';
import { APP_LOCALES } from '../src/config/app-config';

const BASE_URL = process.argv[2] || 'http://localhost:3000';
const LOCALES_TO_TEST = ['en', 'es']; // Test default + one other

async function checkUrl(url: string) {
    try {
        const res = await fetch(url, { redirect: 'manual' });
        return {
            url,
            status: res.status,
            redirect: res.status >= 300 && res.status < 400 ? res.headers.get('location') : null
        };
    } catch (e) {
        return { url, status: 0, error: (e as Error).message };
    }
}

async function run() {
    console.log(`🔍 Validating routes against ${BASE_URL}...`);

    const urls = new Set<string>();

    // 1. Routes from Config
    PUBLIC_ROUTES_MANIFEST.forEach(route => {
        LOCALES_TO_TEST.forEach(locale => {
            urls.add(`${BASE_URL}/${locale}${route.path}`);
        });
    });

    // 2. Nav Items
    function extractNavUrls(items: any[]) {
        items.forEach(item => {
            if (item.mainRoute) urls.add(`${BASE_URL}/en${item.mainRoute}`);
            if (item.items) extractNavUrls(item.items);
            if (item.route) urls.add(`${BASE_URL}/en${item.route}`);
        });
    }
    extractNavUrls(NAV_CONFIG);

    console.log(`Found ${urls.size} unique URLs to test.`);

    let failures = 0;
    const results = [];

    for (const url of urls) {
        // Skip anchor links hash
        const cleanUrl = url.split('#')[0];
        const res = await checkUrl(cleanUrl);
        results.push(res);

        if (res.status >= 400 || res.status === 0) {
            console.error(`❌ FAILURE: ${res.status} at ${url} ${res.error ? `(${res.error})` : ''}`);
            failures++;
        } else if (res.status >= 300) {
            // Warn on redirects
            // console.warn(`⚠️  REDIRECT: ${res.status} at ${url} -> ${res.redirect}`);
        } else {
            // console.log(`✅ ${res.status} ${url}`);
        }
    }

    console.log(`\nResults: ${urls.size} tested, ${failures} failed.`);

    if (failures > 0) process.exit(1);
}

run();
