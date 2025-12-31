
import { test, expect } from '@playwright/test';
import fs from 'fs';
import path from 'path';

// Load routes
const routesPath = path.join(process.cwd(), 'qa-i18n/routes.json');
const ROUTES = JSON.parse(fs.readFileSync(routesPath, 'utf-8'));

const LOCALES = ['en', 'es', 'fr', 'de', 'zh', 'hi', 'ja', 'ko'];
const VIEWPORTS = [
    { name: 'mobile', width: 390, height: 844 },
    { name: 'tablet', width: 768, height: 1024 },
    { name: 'desktop', width: 1440, height: 900 }
];

// Skip complex dynamic routes for basic crawl unless we mock params
// This filter removes routes with [param] brackets
const TESTABLE_ROUTES = ROUTES.filter((r: string) => !r.includes('['));

for (const locale of LOCALES) {
    test.describe(`Locale: ${locale}`, () => {

        for (const route of TESTABLE_ROUTES) {
            const urlPath = `/${locale}${route === '/' ? '' : route}`;

            test.describe(`Route: ${urlPath}`, () => {

                for (const viewport of VIEWPORTS) {
                    test(`should render correctly on ${viewport.name}`, async ({ page }) => {
                        // 1. Set Viewport
                        await page.setViewportSize({ width: viewport.width, height: viewport.height });

                        // 2. Navigation
                        const response = await page.goto(urlPath, { waitUntil: 'domcontentloaded' });
                        expect(response?.status()).toBe(200);

                        // 3. Check HTML Lang Attribute
                        // Note: Some apps use 'en-US' vs 'en'. We check startsWith to be safe.
                        const langHandle = await page.$('html');
                        const lang = await langHandle?.getAttribute('lang');
                        expect(lang).toBeTruthy();
                        expect(lang?.startsWith(locale)).toBe(true);

                        // 4. Check for Horizontal Overflow (Layout Shift/Broken CSS)
                        const scrollWidth = await page.evaluate(() => document.documentElement.scrollWidth);
                        const clientWidth = await page.evaluate(() => document.documentElement.clientWidth);

                        // Allow small sub-pixel differences
                        expect(scrollWidth).toBeLessThanOrEqual(clientWidth + 2);

                        // 5. Check for Soft 404 / Error Boundaries
                        const bodyText = await page.textContent('body');
                        expect(bodyText).not.toContain('404 Not Found');
                        expect(bodyText).not.toContain('Application Error');
                        // Prevent hardcoded placeholders surviving in UI
                        // expect(bodyText).not.toContain('[TODO]'); // Too strict if covered by unit test? strict is good.

                        // 6. Screenshot on failure (Implicit via playwright.config 'only-on-failure')
                    });
                }
            });
        }
    });
}
