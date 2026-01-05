import fs from 'fs';
import path from 'path';

/**
 * Navigation Quality Gate
 * Validates all routes and hashes defined in NAV_CONFIG
 */

const APP_DIR = path.join(process.cwd(), 'src/app/[locale]');
const NAV_CONFIG_PATH = path.join(process.cwd(), 'src/config/nav.ts');

function log(msg: string) { console.log(`[NAV-GATE] ${msg}`); }
function error(msg: string) { console.error(`[NAV-GATE-ERROR] ${msg}`); }

async function validate() {
    log('Starting navigation validation...');

    if (!fs.existsSync(NAV_CONFIG_PATH)) {
        error('nav.ts not found');
        process.exit(1);
    }

    const navContent = fs.readFileSync(NAV_CONFIG_PATH, 'utf-8');

    // Extract items using a robust regex for the current structure
    // We're looking for objects with route: '...' and optionally hash: '...'
    const itemRegex = /\{[\s\S]*?id:\s*['"]([^'"]+)['"][\s\S]*?route:\s*['"]([^'"]+)['"](?:[\s\S]*?hash:\s*['"]([^'"]+)['"])?[\s\S]*?\}/g;

    let match;
    const items: { id: string, route: string, hash?: string }[] = [];

    while ((match = itemRegex.exec(navContent)) !== null) {
        items.push({
            id: match[1],
            route: match[2],
            hash: match[3]
        });
    }

    log(`Found ${items.length} navigation items to validate.`);

    let failCount = 0;

    for (const item of items) {
        // 1. Validate Route
        const routeSegments = item.route.split('/').filter(Boolean);
        const currentDir = APP_DIR;
        let routeFound = false;

        // Special case for dashboard dynamic route
        if (item.route === '/dashboard' || item.route.startsWith('/dashboard/')) {
            const dashboardDir = path.join(APP_DIR, 'dashboard');
            if (fs.existsSync(dashboardDir)) {
                routeFound = true;
            }
        } else {
            // Traverse fs to find matching route
            let checkDir = APP_DIR;
            let possible = true;

            for (const segment of routeSegments) {
                const exact = path.join(checkDir, segment);
                const dynamicSlug = path.join(checkDir, '[slug]');
                const dynamicMetric = path.join(checkDir, '[metric]');

                if (fs.existsSync(exact)) {
                    checkDir = exact;
                } else if (fs.existsSync(dynamicSlug)) {
                    checkDir = dynamicSlug;
                } else if (fs.existsSync(dynamicMetric)) {
                    checkDir = dynamicMetric;
                } else {
                    possible = false;
                    break;
                }
            }

            if (possible && (fs.existsSync(path.join(checkDir, 'page.tsx')))) {
                routeFound = true;
            }
        }

        if (!routeFound) {
            error(`BROKEN ROUTE: ${item.id} -> ${item.route}`);
            failCount++;
            continue;
        }

        // 2. Validate Hash if present
        if (item.hash) {
            let pageFile = '';
            // Determine which page file to check for hashes
            if (item.route === '/dashboard') {
                pageFile = path.join(APP_DIR, 'dashboard/[metric]/page.tsx');
            } else if (item.route === '/products') {
                pageFile = path.join(APP_DIR, 'products/page.tsx');
            } else if (item.route === '/pricing') {
                pageFile = path.join(APP_DIR, 'pricing/page.tsx');
            } else if (item.route === '/company') {
                pageFile = path.join(APP_DIR, 'company/page.tsx');
            } else if (item.route === '/security') {
                pageFile = path.join(APP_DIR, 'security/page.tsx');
            } else if (item.route === '/contact') {
                pageFile = path.join(APP_DIR, 'contact/page.tsx');
            }

            if (pageFile && fs.existsSync(pageFile)) {
                const pageContent = fs.readFileSync(pageFile, 'utf-8');
                // Check if the hash exists in the SECTION_IDS array
                // e.g. export const DASHBOARD_SECTION_IDS = ['executive', ...];
                const sectionIdsRegex = /_SECTION_IDS\s*=\s*\[([\s\S]*?)\]/;
                const sectionMatch = pageContent.match(sectionIdsRegex);

                if (sectionMatch) {
                    const idsStr = sectionMatch[1];
                    const ids = idsStr.split(',').map(s => s.trim().replace(/['"]/g, ''));
                    if (!ids.includes(item.hash)) {
                        error(`MISSING HASH TARGET: ${item.id} -> ${item.route}#${item.hash} (ID not found in page SECTION_IDS)`);
                        failCount++;
                    }
                } else {
                    // Fallback to searching for id="item.hash" in the file
                    if (!pageContent.includes(`id="${item.hash}"`) && !pageContent.includes(`id={'${item.hash}'}`)) {
                        error(`MISSING HASH TARGET: ${item.id} -> ${item.route}#${item.hash} (No matching ID found in page content)`);
                        failCount++;
                    }
                }
            } else if (pageFile) {
                error(`PAGE FILE UNREADABLE: ${pageFile} for item ${item.id}`);
                failCount++;
            }
        }
    }

    if (failCount > 0) {
        error(`Validation failed with ${failCount} errors.`);
        process.exit(1);
    } else {
        log('All navigation items validated successfully.');
    }
}

validate().catch(err => {
    error(`Unexpected error: ${err.message}`);
    process.exit(1);
});
