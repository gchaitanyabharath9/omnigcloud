import { test, expect, Page, ConsoleMessage } from '@playwright/test';
import fs from 'fs';
import path from 'path';

const urlsFile = path.join(process.cwd(), 'qa-i18n/urls.json');
const urls = fs.existsSync(urlsFile) ? JSON.parse(fs.readFileSync(urlsFile, 'utf-8')) as string[] : [];
// Unused LOCALES removed

interface SEOResult {
    url: string;
    lang: string;
    canonical: string;
    hreflangs: string[];
    title: string;
    description: string;
}

const seoResults: SEOResult[] = [];

test.describe('i18n Global Verification & Release Gate', () => {

    test.beforeAll(() => {
        if (urls.length === 0) {
            throw new Error('❌ urls.json not found or empty. Run qa:inventory first.');
        }
    });

    test.afterAll(() => {
        // TASK 7: Generate SEO Report
        const report = [
            '# SEO & i18n Head Validation Report',
            `Generated on: ${new Date().toISOString()}\n`,
            '| URL | Lang | Canonical | Hreflangs Count | Title |',
            '|-----|------|-----------|-----------------|-------|',
            ...seoResults.map(r => `| ${r.url} | ${r.lang} | ${r.canonical} | ${r.hreflangs.length} | ${r.title} |`)
        ].join('\n');
        fs.writeFileSync(path.join(process.cwd(), 'qa-i18n/seo-report.md'), report);
    });

    // TASK 3: Routing Sentinels
    test('Sentinel: Root Path "/" Redirects to Primary Locale', async ({ page }: { page: Page }) => {
        const response = await page.goto('/');
        expect(response?.status()).toBe(200);
        expect(page.url()).toMatch(/\/[a-z]{2}(\/|$)/);
        const htmlLang = await page.getAttribute('html', 'lang');
        expect(htmlLang).not.toBeNull();
    });

    test('Sentinel: Non-localized path "/pricing" auto-fixes', async ({ page }: { page: Page }) => {
        const response = await page.goto('/pricing');
        expect(response?.status()).toBe(200);
        expect(page.url()).toMatch(/\/[a-z]{2}\/pricing/);
        const title = await page.title();
        expect(title.toLowerCase()).not.toContain('404');
    });

    // TASK 4, 5, 6, 7: Comprehensive Loop
    for (const url of urls) {
        test(`Audit URL: ${url}`, async ({ page }: { page: Page }) => {
            const consoleErrors: string[] = [];
            page.on('console', (msg: ConsoleMessage) => {
                if (msg.type() === 'error' && !msg.text().includes('chrome-extension')) {
                    consoleErrors.push(`[CONSOLE_ERROR] ${msg.text()}`);
                }
            });

            const response = await page.goto(url, { waitUntil: 'networkidle' });

            // TASK 4: Hard 404 & Error Detection
            if (response?.status() !== 200) {
                throw new Error(`Invalid status ${response?.status()} for ${url}`);
            }

            const bodyText = await page.innerText('body');
            const pageTitle = await page.title();

            const isError =
                pageTitle.toLowerCase().includes('404') ||
                pageTitle.toLowerCase().includes('not found') ||
                bodyText.includes('Not Found') ||
                bodyText.includes('Application error') ||
                bodyText.includes('Hydration failed') ||
                bodyText.includes('Unhandled Runtime Error');

            if (isError) {
                await page.screenshot({ path: `qa-i18n/failures/error_${new URL(url).pathname.replace(/\//g, '_')}.png` });
                throw new Error(`Detected Error UI on valid route: ${url}`);
            }

            if (consoleErrors.length > 0) {
                await page.screenshot({ path: `qa-i18n/failures/console_${new URL(url).pathname.replace(/\//g, '_')}.png` });
                throw new Error(`Console Errors detected on ${url}:\n${consoleErrors.join('\n')}`);
            }

            // TASK 7: SEO & Head Validation
            const locale = url.split('/')[3];
            const htmlLang = await page.getAttribute('html', 'lang');
            expect(htmlLang).toBe(locale);

            const canonical = (await page.getAttribute('link[rel="canonical"]', 'href')) || 'MISSING';
            const hreflangs = await page.locator('link[rel="alternate"][hreflang]').evaluateAll((links: Array<Element>) =>
                links.map(l => l.getAttribute('hreflang') || '')
            );
            const description = (await page.getAttribute('meta[name="description"]', 'content')) || 'MISSING';

            seoResults.push({ url, lang: htmlLang || 'missing', canonical, hreflangs, title: pageTitle, description });

            // TASK 5: Link Graph Validation (Internal)
            const internalLinks = await page.locator('a[href^="/"]').evaluateAll((elements: Array<Element>) =>
                elements.map(el => (el as HTMLAnchorElement).getAttribute('href'))
            );

            // Verify a sample of internal links resolve
            for (const link of internalLinks.slice(0, 5)) {
                if (link && !link.startsWith('/api') && !link.includes('#')) {
                    const linkResponse = await page.request.get(link);
                    expect(linkResponse.status(), `Broken link: ${link} on ${url}`).toBe(200);
                }
            }

            // TASK 6: UI Regression Smoke
            const viewport = page.viewportSize();
            const criticalPaths = ['/', '/platform', '/services', '/pricing', '/contact'];
            const currentPath = new URL(url).pathname.replace(/\/[a-z]{2}/, '') || '/';

            // Desktop Screenshot for Critical Pages
            if (criticalPaths.includes(currentPath)) {
                await page.screenshot({ path: `qa-i18n/smoke/desktop_${locale}_${currentPath.replace(/\//g, '_')}.png` });
            }

            // Mobile menu visibility check
            if (viewport && viewport.width < 768) {
                const menuBtn = page.locator('button[aria-label*="menu"], button[class*="menu-toggle"]').first();
                if (await menuBtn.isVisible()) {
                    await menuBtn.click();
                    await page.waitForTimeout(500);
                    if (criticalPaths.includes(currentPath)) {
                        await page.screenshot({ path: `qa-i18n/smoke/mobile_menu_${locale}_${currentPath.replace(/\//g, '_')}.png` });
                    }
                    await menuBtn.click(); // Close it
                }
            }
        });
    }
});
