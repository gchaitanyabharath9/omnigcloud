import { test, expect } from '@playwright/test';
import fs from 'fs';
import path from 'path';

// Load routes and URLs
const routesPath = path.join(process.cwd(), 'qa-i18n/routes.json');
const ROUTES = JSON.parse(fs.readFileSync(routesPath, 'utf-8'));

const LOCALES = ['en', 'es', 'fr', 'de', 'zh', 'hi', 'ja', 'ko'];
const VIEWPORTS = [
    { name: 'mobile', width: 390, height: 844 },
    { name: 'tablet', width: 768, height: 1024 },
    { name: 'desktop', width: 1440, height: 900 }
];

// Skip dynamic routes for basic crawl unless mocked
const TESTABLE_ROUTES = ROUTES.filter((r: string) => !r.includes('['));

test.describe('i18n Regression Suite', () => {

    for (const locale of LOCALES) {
        test.describe(`Locale: ${locale}`, () => {

            for (const route of TESTABLE_ROUTES) {
                const urlPath = `/${locale}${route === '/' ? '' : route}`;

                for (const viewport of VIEWPORTS) {
                    test(`${urlPath} on ${viewport.name}`, async ({ page }) => {
                        const consoleErrors: string[] = [];
                        page.on('console', msg => {
                            if (msg.type() === 'error') consoleErrors.push(msg.text());
                        });
                        page.on('pageerror', err => {
                            consoleErrors.push(err.message);
                        });

                        await page.setViewportSize({ width: viewport.width, height: viewport.height });

                        // Increase timeout for slow CI environments
                        const response = await page.goto(urlPath, {
                            waitUntil: 'networkidle',
                            timeout: 60000
                        });

                        // 1. Basic Status Check
                        expect(response?.status(), `Page ${urlPath} returned ${response?.status()}`).toBe(200);

                        // 2. HTML Lang attribute
                        const lang = await page.getAttribute('html', 'lang');
                        expect(lang?.startsWith(locale), `Expected lang to start with ${locale}, got ${lang}`).toBe(true);

                        // 3. No generic "Not Found" text survival
                        const bodyText = await page.textContent('body');
                        expect(bodyText).not.toContain('404');
                        expect(bodyText).not.toContain('Not Found');

                        // 4. No SSR/next-intl crash markings
                        expect(bodyText).not.toContain('MISSING_MESSAGE');

                        // 5. Horizontal Scroll Detection (Overflow)
                        const isOverflowing = await page.evaluate(() => {
                            return document.documentElement.scrollWidth > document.documentElement.clientWidth + 2;
                        });
                        expect(isOverflowing, `Horizontal overflow detected on ${urlPath} (${viewport.name})`).toBe(false);

                        // 6. Console Error Check (Filtering out known external noise)
                        const criticalErrors = consoleErrors.filter(err =>
                            !err.includes('chrome-extension') &&
                            !err.includes('favicon.ico')
                        );
                        expect(criticalErrors, `Console errors found on ${urlPath}:\n${criticalErrors.join('\n')}`).toHaveLength(0);
                    });
                }
            }
        });
    }
});
