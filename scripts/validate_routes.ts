
import fs from 'fs';
import path from 'path';
// We use a dynamic import or relative import to avoid path alias issues in raw tsx
// But for simplicity in this script, we'll just read the file and regex it or use a simplified check
// Actually, let's try to just use a simplified version since we areGemini and can see the files.

const ROOT_DIR = process.cwd();
const APP_DIR = path.join(ROOT_DIR, 'src', 'app', '[locale]');
const ROUTES_FILE = path.join(ROOT_DIR, 'src', 'config', 'routes.ts');

async function validateRoutes() {
    console.log('🔍 Validating Sitemap Routes...');

    if (!fs.existsSync(ROUTES_FILE)) {
        console.error('❌ Routes manifest file not found!');
        process.exit(1);
    }

    const content = fs.readFileSync(ROUTES_FILE, 'utf-8');

    // Extract paths using regex from the manifest
    const pathRegex = /path:\s*['"](.*?)['"]/g;
    const paths: string[] = [];
    let match;
    while ((match = pathRegex.exec(content)) !== null) {
        paths.push(match[1]);
    }

    if (paths.length === 0) {
        console.error('❌ No routes found in manifest!');
        process.exit(1);
    }

    let hasError = false;
    const missingRoutes: string[] = [];

    for (const route of paths) {
        // Handle root path
        const pagePath = route === ''
            ? path.join(APP_DIR, 'page.tsx')
            : path.join(APP_DIR, route, 'page.tsx');

        if (!fs.existsSync(pagePath)) {
            // Check if it's a dynamic route (folder exists but contains [slug] or similar)
            // For now, let's assume all listed routes in sitemap should be literal matches to folders with page.tsx
            // unless they are explicitly known dynamic routes handled elsewhere.

            // Try to see if there's a parent folder with a page.tsx that handles it (not common in sitemap)
            // or if the path matches a known dynamic structure.

            console.error(`❌ Route not found in filesystem: ${route} (Expected: ${pagePath})`);
            missingRoutes.push(route);
            hasError = true;
        }
    }

    // Duplicate check
    const duplicates = paths.filter((item, index) => paths.indexOf(item) !== index);
    if (duplicates.length > 0) {
        console.error(`❌ Duplicate routes found: ${duplicates.join(', ')}`);
        hasError = true;
    }

    if (hasError) {
        console.error(`🚨 Validation FAILED. ${missingRoutes.length} missing routes.`);
        process.exit(1);
    }

    console.log(`✅ ${paths.length} routes validated successfully.`);
    process.exit(0);
}

validateRoutes();
