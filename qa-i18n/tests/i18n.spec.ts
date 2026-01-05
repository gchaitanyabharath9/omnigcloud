import { test, expect, type Page, type ConsoleMessage } from '@playwright/test';
import fs from 'fs';
import path from 'path';

// 1. Setup & Inventory
const urlsPath = path.join(process.cwd(), 'qa-i18n/urls.json');
const allUrls = JSON.parse(fs.readFileSync(urlsPath, 'utf-8')) as string[];

// Filter out dynamic routes (which generate 404s with literal [slug])
const urls = allUrls.filter(u => !u.includes('[') && !u.includes(']'));

const CRITICAL_PATHS = ['/', '/pricing', '/docs', '/platform', '/services', '/contact', '/company', '/onboarding'];

interface SEOResult {
    url: string;
    lang: string;
    canonical: string;
    hreflangs: string[];
    title: string;
    description: string;
}

const seoResults: SEOResult[] = [];

test.describe('i18n & Release Gate', () => {

    test.afterAll(() => {
        if (seoResults.length === 0) return;
        const report = [
            '# SEO & i18n Head Validation Report',
            `Generated on: ${new Date().toISOString()}\n`,
            '| URL | Lang | Canonical | Hreflangs Count | Title |',
            '|-----|------|-----------|-----------------|-------|',
            ...seoResults.map(r => `| ${r.url} | ${r.lang} | ${r.canonical} | ${r.hreflangs.length} | ${r.title} |`)
        ].join('\n');
        fs.writeFileSync(path.join(process.cwd(), 'qa-i18n/seo-report.md'), report);
    });

    test('Sentinel: Root Path "/" Redirects to Primary Locale', async ({ page }) => {
        const response = await page.goto('/');
        expect(response?.status()).toBe(200);
        expect(page.url()).toMatch(/\/[a-z]{2}(\/|$)/);
        const htmlLang = await page.getAttribute('html', 'lang');
        expect(htmlLang).not.toBeNull();
    });

    test('Sentinel: Non-localized path "/pricing" auto-fixes', async ({ page }) => {
        const response = await page.goto('/pricing');
        expect(response?.status()).toBe(200);
        expect(page.url()).toMatch(/\/[a-z]{2}\/pricing/);
        const title = await page.title();
        expect(title.toLowerCase()).not.toContain('404');
    });

    // Strategy: 
    // - Every URL gets a status check (fast).
    // - CRITICAL_PATHS get full audit (goto, console, SEO, links, smoke).

    for (const url of urls) {
        const parsedUrl = new URL(url);
        const pathSuffix = parsedUrl.pathname.replace(/^\/[a-z]{2}/, '') || '/';
        const isCritical = CRITICAL_PATHS.includes(pathSuffix);

        if (isCritical) {
            test(`Audit CRITICAL URL: ${url}`, async ({ page }) => {
                const consoleErrors: string[] = [];
                page.on('console', (msg: ConsoleMessage) => {
                    const text = msg.text();
                    const isIgnored =
                        text.includes('chrome-extension') ||
                        text.includes('_vercel/insights') ||
                        text.includes('_vercel/speed-insights') ||
                        text.includes('favicon.ico') ||
                        text.includes('net::ERR_SSL_PROTOCOL_ERROR') ||
                        (text.includes('Failed to load resource') && text.includes('404'));

                    if (msg.type() === 'error' && !isIgnored) {
                        consoleErrors.push(`[CONSOLE_ERROR] ${text}`);
                    }
                });
                // Pre-accept cookies if possible
                await page.addInitScript(() => {
                    try {
                        if (typeof window !== 'undefined' && window.localStorage) {
                            window.localStorage.setItem('omnigcloud_cookie_consent', 'accepted');
                        }
                    } catch (e) {
                        console.warn('Storage access denied in init script');
                    }
                });

                page.on('pageerror', (err) => {
                    if (err.message.includes('localStorage') || err.message.includes('Access is denied')) {
                        return;
                    }
                    consoleErrors.push(`[RUNTIME_ERROR] ${err.message}`);
                });

                const response = await page.goto(url, { waitUntil: 'networkidle' });
                expect(response?.status()).toBe(200);

                const bodyText = await page.innerText('body');
                const pageTitle = await page.title();

                const isError =
                    pageTitle.toLowerCase().includes('404') ||
                    pageTitle.toLowerCase().includes('not found') ||
                    bodyText.includes('Not Found') ||
                    bodyText.includes('Application error') ||
                    bodyText.includes('Hydration failed') ||
                    bodyText.includes('Unhandled Runtime Error') ||
                    bodyText.includes('MISSING_MESSAGE');

                if (isError) {
                    await page.screenshot({ path: `qa-i18n/failures/error_${parsedUrl.pathname.replace(/\//g, '_')}.png` });
                    throw new Error(`Detected Error UI on valid route: ${url}`);
                }

                if (consoleErrors.length > 0) {
                    await page.screenshot({ path: `qa-i18n/failures/console_${parsedUrl.pathname.replace(/\//g, '_')}.png` });
                    throw new Error(`Console Errors detected on ${url}:\n${consoleErrors.join('\n')}`);
                }

                // SEO Check
                const locale = url.split('/')[3];
                const htmlLang = await page.getAttribute('html', 'lang');
                expect(htmlLang).toBe(locale);

                const canonical = (await page.getAttribute('link[rel="canonical"]', 'href')) || 'MISSING';
                const hreflangs = await page.locator('link[rel="alternate"][hreflang]').evaluateAll((links: Array<Element>) =>
                    links.map(l => l.getAttribute('hreflang') || '')
                );
                const description = (await page.getAttribute('meta[name="description"]', 'content')) || 'MISSING';

                seoResults.push({ url, lang: htmlLang || 'missing', canonical, hreflangs, title: pageTitle, description });

                // Link Sample Check
                const internalLinks = await page.locator('a[href^="/"]').evaluateAll((elements: Array<Element>) =>
                    elements.map(el => (el as HTMLAnchorElement).getAttribute('href'))
                );

                for (const link of internalLinks.slice(0, 3)) { // Reduced to 3 for speed
                    if (link && !link.startsWith('/api') && !link.includes('#')) {
                        const linkResponse = await page.request.get(link);
                        expect(linkResponse.status(), `Broken link: ${link} on ${url}`).toBe(200);
                    }
                }

                // Visual Smoke
                const viewport = page.viewportSize();
                await page.screenshot({ path: `qa-i18n/smoke/desktop_${locale}_${pathSuffix.replace(/\//g, '_')}.png` });

                if (viewport && viewport.width < 768) {
                    const menuBtn = page.locator('button[aria-label*="menu"], button[class*="menu-toggle"]').first();
                    if (await menuBtn.isVisible()) {
                        await menuBtn.click();
                        await page.waitForTimeout(300);
                        await page.screenshot({ path: `qa-i18n/smoke/mobile_menu_${locale}_${pathSuffix.replace(/\//g, '_')}.png` });
                    }
                }
            });
        } else {
            // Non-critical: Just a status check for baseline health
            test(`Status Check: ${url}`, async ({ page }) => {
                let response;
                let attempt = 0;
                const maxAttempts = 3;

                while (attempt < maxAttempts) {
                    response = await page.request.get(url);
                    if (response.status() !== 429) break;
                    attempt++;
                    await new Promise(resolve => setTimeout(resolve, 1000 * attempt));
                }

                expect(response?.status(), `Page ${url} is down!`).toBe(200);

                // Quick check for 404 text in body if status is 200 (Next.js sometimes does this)
                const text = await response?.text() || '';
                expect(text.toLowerCase()).not.toContain('>404<');
                expect(text).not.toContain('MISSING_MESSAGE');
            });
        }
    }
});
