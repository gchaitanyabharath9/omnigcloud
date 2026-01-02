
import { test, expect } from '@playwright/test';

test.describe('Responsive Layout & Overflow Regression', () => {
    const ROUTES = [
        '/en',
        '/en/products#playground',
        '/en/security#compliance-maps'
    ];

    const VIEWPORTS = [
        { width: 390, height: 844 },   // Mobile
        { width: 768, height: 1024 },  // Tablet
        { width: 1366, height: 768 },  // Desktop
        { width: 1920, height: 1080 }  // Large Desktop
    ];

    for (const route of ROUTES) {
        for (const viewport of VIEWPORTS) {
            test(`should have no horizontal overflow on ${route} at ${viewport.width}x${viewport.height}`, async ({ page }) => {
                // Monitor for Recharts sizing errors or other console errors
                const consoleErrors: string[] = [];
                page.on('console', msg => {
                    if (msg.type() === 'error' || msg.type() === 'warning') {
                        const text = msg.text();
                        if (
                            text.includes('width(-1)') ||
                            text.includes('height(-1)') ||
                            text.includes('greater than 0')
                        ) {
                            consoleErrors.push(text);
                        }
                    }
                });

                await page.setViewportSize(viewport);
                await page.goto(route);
                await page.waitForLoadState('networkidle');

                // Wait a bit for animations/charts
                await page.waitForTimeout(1000);

                // Check overflow
                const overflow = await page.evaluate(() => {
                    const doc = document.documentElement;
                    return {
                        scrollWidth: doc.scrollWidth,
                        clientWidth: doc.clientWidth,
                        diff: doc.scrollWidth - doc.clientWidth
                    };
                });

                console.log(`Route: ${route}, Viewport: ${viewport.width}, Overflow: ${overflow.diff}`);

                // Assert no overflow (tolerance of 1px for sub-pixel rendering)
                expect(overflow.scrollWidth).toBeLessThanOrEqual(overflow.clientWidth + 1);

                // Assert no Recharts errors
                if (consoleErrors.length > 0) {
                    console.error('Console errors detected:', consoleErrors);
                    throw new Error(`Console errors detected: ${consoleErrors.join(', ')}`);
                }

                // Screenshot for artifacts
                const safeRoute = route.replace(/[^a-z0-9]/gi, '_');
                await page.screenshot({
                    path: `artifacts/responsive/${safeRoute}/${viewport.width}x${viewport.height}.png`,
                    fullPage: false
                });
            });
        }
    }
});
