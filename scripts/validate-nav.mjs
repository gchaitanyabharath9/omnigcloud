import fs from 'fs';
import path from 'path';

// Simplified validation script for local use
const NAV_CONFIG_PATH = 'src/config/nav.ts';
const APP_DIR = 'src/app/[locale]';

async function validateLinks() {
    console.log('--- NAV LINK VALIDATION ---');

    const content = fs.readFileSync(NAV_CONFIG_PATH, 'utf-8');
    // Extract routes and hashes using regex (simplification)
    const items = [];
    const routeRegex = /route:\s*['"]([^'"]+)['"]/g;
    const hashRegex = /hash:\s*['"]([^'"]+)['"]/g;
    const idRegex = /id:\s*['"]([^'"]+)['"]/g;

    let match;
    const rawItems = content.split('{').slice(1);

    for (const raw of rawItems) {
        const idMatch = raw.match(/id:\s*['"]([^'"]+)['"]/);
        const routeMatch = raw.match(/route:\s*['"]([^'"]+)['"]/);
        const hashMatch = raw.match(/hash:\s*['"]([^'"]+)['"]/);

        if (idMatch && routeMatch) {
            items.push({
                id: idMatch[1],
                route: routeMatch[1],
                hash: hashMatch ? hashMatch[1] : null
            });
        }
    }

    console.log(`Found ${items.length} navigation targets.`);

    let errors = 0;
    for (const item of items) {
        // Confirm route exists
        // Route is like /dashboard or /industries/financial-services
        // Mapping to file system: [locale]/dashboard/page.tsx or [locale]/industries/[slug]/page.tsx

        const segments = item.route.split('/').filter(Boolean);
        let currentDir = APP_DIR;
        let found = true;

        for (const segment of segments) {
            const exactPath = path.join(currentDir, segment);
            const dynamicPath = path.join(currentDir, '[slug]');
            const dynamicMetricPath = path.join(currentDir, '[metric]');
            const dynamicLocalePath = path.join(currentDir, '[locale]');

            if (fs.existsSync(exactPath)) {
                currentDir = exactPath;
            } else if (fs.existsSync(dynamicPath)) {
                currentDir = dynamicPath;
            } else if (fs.existsSync(dynamicMetricPath)) {
                currentDir = dynamicMetricPath;
            } else if (fs.existsSync(dynamicLocalePath)) {
                currentDir = dynamicLocalePath;
            } else {
                // Check if it's a file page.tsx
                if (!fs.existsSync(path.join(currentDir, 'page.tsx')) && !fs.existsSync(path.join(currentDir, segment + '.tsx'))) {
                    found = false;
                    break;
                }
            }
        }

        if (found) {
            console.log(`[OK]   ${item.route}${item.hash ? '#' + item.hash : ''}`);
        } else {
            console.error(`[FAIL] ${item.route}${item.hash ? '#' + item.hash : ''} (Route not found)`);
            errors++;
        }
    }

    if (errors === 0) {
        console.log('--- ALL ROUTES VALIDATED SUCCESSFULLY ---');
    } else {
        console.error(`--- VALIDATION FAILED WITH ${errors} ERRORS ---`);
        process.exit(1);
    }
}

validateLinks();
