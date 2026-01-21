import fs from 'fs';
import path from 'path';
import { PUBLIC_ROUTES_MANIFEST } from '../src/config/routes';
import { locales } from '../src/navigation';
import { config } from '../src/config';

const ROOT_DIR = process.cwd();
const APP_DIR = path.join(ROOT_DIR, 'src', 'app', '[locale]');

async function validateRoutes() {
    console.log('🔍 Validating Sitemap Routes...');

    let hasError = false;
    const missingRoutes: string[] = [];
    const validPaths: string[] = [];

    // 1. Validate Base URL
    const baseUrl = config.site.url;
    if (!baseUrl || !baseUrl.startsWith('http')) {
        console.error(`❌ Invalid base URL in config: ${baseUrl}`);
        hasError = true;
    } else {
        console.log(`✅ Base URL: ${baseUrl}`);
    }

    // 2. Validate Routes existence
    for (const route of PUBLIC_ROUTES_MANIFEST) {
        validPaths.push(route.path);

        // We only check one locale (en) as parity is handled by another gate
        // but the sitemap generator uses all locales.
        const relativePath = route.path === '' ? 'page.tsx' : path.join(route.path, 'page.tsx');
        const absolutePath = path.join(APP_DIR, relativePath);

        if (!fs.existsSync(absolutePath)) {
            // Check if it's a dynamic route that might exist as [slug]
            // For now, we expect absolute paths in the manifest to match literal folders
            console.error(`❌ Missing page.tsx for route: "${route.path}"`);
            console.error(`   Expected: ${absolutePath}`);
            missingRoutes.push(route.path);
            hasError = true;
        }
    }

    // 3. Duplicate check
    const duplicates = validPaths.filter((item, index) => validPaths.indexOf(item) !== index);
    if (duplicates.length > 0) {
        console.error(`❌ Duplicate routes found in manifest: ${Array.from(new Set(duplicates)).join(', ')}`);
        hasError = true;
    }

    // 4. Summarize
    if (hasError) {
        console.error('\n🚨 Sitemap validation FAILED.');
        if (missingRoutes.length > 0) {
            console.error(`Missing routes (${missingRoutes.length}):\n- ${missingRoutes.join('\n- ')}`);
        }
        process.exit(1);
    }

    console.log(`\n✅ ${PUBLIC_ROUTES_MANIFEST.length} routes validated successfully across ${locales.length} locales.`);
    console.log(`📈 Total sitemap entries: ${PUBLIC_ROUTES_MANIFEST.length * locales.length}`);
    process.exit(0);
}

validateRoutes().catch(err => {
    console.error('💥 Fatal error during validation:', err);
    process.exit(1);
});
