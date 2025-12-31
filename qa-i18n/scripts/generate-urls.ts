import fs from 'fs';
import path from 'path';

const ROUTES_FILE = path.join(process.cwd(), 'qa-i18n/routes.json');
const OUTPUT_FILE = path.join(process.cwd(), 'qa-i18n/urls.json');
const LOCALES = ['en', 'es', 'fr', 'de', 'zh', 'hi', 'ja', 'ko'];
const BASE_URL = 'http://localhost:3000';

if (!fs.existsSync(ROUTES_FILE)) {
    console.error('❌ routes.json not found. Run route-inventory first.');
    process.exit(1);
}

const routes = JSON.parse(fs.readFileSync(ROUTES_FILE, 'utf-8')) as string[];
const urls: string[] = [];

routes.forEach(route => {
    LOCALES.forEach(locale => {
        // next-intl usually requires the locale prefix
        const url = `${BASE_URL}/${locale}${route === '/' ? '' : route}`;
        urls.push(url.replace(/\/+$/, '') || `${BASE_URL}/${locale}`);
    });
});

fs.writeFileSync(OUTPUT_FILE, JSON.stringify(urls, null, 2));
console.log(`✅ Generated ${urls.length} URLs for ${LOCALES.length} locales.`);
