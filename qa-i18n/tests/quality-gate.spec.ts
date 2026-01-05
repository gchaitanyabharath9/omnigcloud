import { test, expect } from '@playwright/test';

const LOCALES = ['en', 'es', 'fr', 'de', 'zh', 'hi', 'ja', 'ko'];
const HOST = process.env.TEST_URL || 'http://localhost:3001';

test.describe('Quality Gate - Core Navigation & UI', () => {

    for (const locale of LOCALES) {
        test.describe(`Locale: ${locale}`, () => {
            const consoleErrors: string[] = [];

            test.beforeEach(async ({ page }) => {
                // Pre-accept cookies to avoid overlays and locator noise
                await page.addInitScript(() => {
                    window.localStorage.setItem('omnigcloud_cookie_consent', 'accepted');
                });

                page.on('pageerror', err => {
                    throw new Error(`Unhandled Exception: ${err.message}`);
                });

                // Capture console errors
                page.on('console', msg => {
                    const text = msg.text();
                    if (msg.type() === 'error') {
                        // Ignore common non-breaking errors or expected transient errors
                        if (text.includes('chrome-extension') ||
                            text.includes('Vercel') ||
                            text.includes('insights') ||
                            text.includes('404') ||
                            text.includes('429') ||
                            text.includes('favicon')) return;
                        consoleErrors.push(text);
                    }
                });
            });

            test.afterEach(() => {
                if (consoleErrors.length > 0) {
                    const errorMsg = `Console Errors found: ${consoleErrors.join(', ')}`;
                    consoleErrors.length = 0;
                    throw new Error(errorMsg);
                }
            });

            test.setTimeout(60000);

            test('initial block load & layout integrity', async ({ page }) => {
                await page.goto(`${HOST}/${locale}`);

                // Check for core elements
                await expect(page.locator('header')).toBeVisible();
                await expect(page.locator('footer')).toBeVisible();

                // Check for horizontal overflow (UI quality)
                const hasOverflow = await page.evaluate(() => {
                    return document.documentElement.scrollWidth > window.innerWidth;
                });
                expect(hasOverflow, `Locale ${locale} has horizontal overflow`).toBe(false);

                // Check for React Hydration errors in content
                const content = await page.content();
                expect(content).not.toContain('Hydration failed');
            });

            test('section navigation via hash', async ({ page }) => {
                // Test a known section like products#playground
                const url = `${HOST}/${locale}/products#playground`;
                await page.goto(url);
                await page.waitForTimeout(5000); // Wait for scroll animation to settle

                // Verify hash in URL
                expect(page.url()).toContain('#playground');

                // Bounding rect check for #playground
                const scrollInfo = await page.evaluate(() => {
                    const el = document.getElementById('playground');
                    if (!el) return { found: false, top: 0 };
                    const rect = el.getBoundingClientRect();
                    return { found: true, top: rect.top };
                });

                console.log(`[DEBUG] ${locale} #playground rect.top: ${scrollInfo.top}`);
                expect(scrollInfo.found, `Element #playground not found in ${locale}`).toBe(true);
                // Wider range to accommodate various viewport/header combinations and scroll-margin
                expect(scrollInfo.top).toBeGreaterThanOrEqual(-100);
                expect(scrollInfo.top).toBeLessThanOrEqual(1000);
            });

            test('language switch should preserve route and hash', async ({ page }) => {
                if (locale === 'en') return; // Skip en-to-en switch test as it's redundant

                await page.goto(`${HOST}/en/products#playground`);
                await page.waitForTimeout(2000);
                console.log(`[DEBUG] ${locale} current URL before switch: ${page.url()}`);

                // Open language switcher
                const switcher = page.locator('#language-switcher-btn');
                await switcher.waitFor({ state: 'visible', timeout: 10000 });
                await switcher.click({ force: true });
                await page.waitForTimeout(500); // Wait for dropdown animation

                // Select target locale by ID which is unique
                const langBtn = page.locator(`#lang-switch-${locale}`);
                await langBtn.waitFor({ state: 'attached', timeout: 5000 });
                console.log(`[DEBUG] Triggering click for ${locale}`);
                // Using dispatchEvent for maximum reliability regardless of viewport/overlays
                await langBtn.dispatchEvent('click');

                // Wait for URL to update
                const expectedUrlPart = `/${locale}/products#playground`;
                await expect(page).toHaveURL(new RegExp(expectedUrlPart), { timeout: 15000 });
                console.log(`[DEBUG] ${locale} switch successful. New URL: ${page.url()}`);

                await page.waitForTimeout(2000); // Wait for possible client-side scroll

                const scrollInfo = await page.evaluate(() => {
                    const el = document.getElementById('playground');
                    if (!el) return { found: false, top: 0 };
                    const rect = el.getBoundingClientRect();
                    return { found: true, top: rect.top };
                });

                console.log(`[DEBUG] ${locale} language switch #playground rect.top: ${scrollInfo.top}`);
                expect(scrollInfo.found, `Element #playground not found after switch to ${locale}`).toBe(true);
                // Allow a reasonable range for scroll position
                expect(scrollInfo.top).toBeGreaterThanOrEqual(-100);
                expect(scrollInfo.top).toBeLessThanOrEqual(1000);
            });
        });
    }
});
