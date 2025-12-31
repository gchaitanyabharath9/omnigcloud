import fs from 'fs';
import path from 'path';

const APP_DIR = path.join(process.cwd(), 'src/app/[locale]');
const OUTPUT_FILE = path.join(process.cwd(), 'qa-i18n/routes.json');

function getRoutes(dir: string, baseRoute = ''): string[] {
    const entries = fs.readdirSync(dir, { withFileTypes: true });
    let routes: string[] = [];

    for (const entry of entries) {
        if (entry.isDirectory()) {
            const fullPath = path.join(dir, entry.name);
            const routePart = entry.name;

            // Skip group routes (route)
            if (routePart.startsWith('(') && routePart.endsWith(')')) {
                routes = [...routes, ...getRoutes(fullPath, baseRoute)];
                continue;
            }

            // Detect if this directory contains a page.tsx
            if (fs.existsSync(path.join(fullPath, 'page.tsx'))) {
                routes.push(`${baseRoute}/${routePart}`);
            }

            // Recurse
            routes = [...routes, ...getRoutes(fullPath, `${baseRoute}/${routePart}`)];
        }
    }

    return routes;
}

// Add the root route
const routes = ['/', ...getRoutes(APP_DIR)];

// Remove duplicates and clean up
const uniqueRoutes = Array.from(new Set(routes)).map(r => r.replace(/\/+/g, '/'));

if (!fs.existsSync(path.dirname(OUTPUT_FILE))) {
    fs.mkdirSync(path.dirname(OUTPUT_FILE), { recursive: true });
}

fs.writeFileSync(OUTPUT_FILE, JSON.stringify(uniqueRoutes, null, 2));
console.log(`✅ Detected ${uniqueRoutes.length} routes. Saved to routes.json`);
