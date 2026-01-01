import { test, expect, Page } from '@playwright/test';
import fs from 'fs';
import path from 'path';

const VIEWPORTS = [
    { width: 360, height: 640, name: 'mobile-small' },
    { width: 390, height: 844, name: 'mobile-large' },
    { width: 768, height: 1024, name: 'tablet' },
    { width: 1440, height: 900, name: 'desktop' }
];

// Load routes
const routesPath = path.join(process.cwd(), 'qa-i18n', 'routes.json');
let routes: string[] = [];
if (fs.existsSync(routesPath)) {
    routes = JSON.parse(fs.readFileSync(routesPath, 'utf-8'));
    // Filter out dynamic routes for now to avoid 404s
    routes = routes.filter(r => !r.includes('['));
} else {
    routes = ['/'];
}

type Offender = {
    selector: string;
    scrollWidth: number;
    clientWidth: number;
    rect: any;
    html: string;
};

type PageResult = {
    url: string;
    viewport: string;
    overflow: number; // pixels of overflow
    offenders: Offender[];
};

const results: PageResult[] = [];
const REPORT_DIR = path.join(process.cwd(), 'qa-responsive');

test.describe('Responsive Audit', () => {

    test.afterAll(async () => {
        // Generate Report
        const reportJsonPath = path.join(REPORT_DIR, 'report.json');
        const reportMdPath = path.join(REPORT_DIR, 'report.md');

        fs.writeFileSync(reportJsonPath, JSON.stringify(results, null, 2));

        // Aggregate top offenders
        const offenderCounts: Record<string, number> = {};
        results.forEach(r => {
            r.offenders.forEach(o => {
                const key = o.selector;
                offenderCounts[key] = (offenderCounts[key] || 0) + 1;
            });
        });

        const topOffenders = Object.entries(offenderCounts)
            .sort((a, b) => b[1] - a[1])
            .slice(0, 10);

        let md = '# Responsive Audit Report\n\n';
        md += `**Total URLs checked:** ${routes.length}\n`;
        md += `**Viewports:** ${VIEWPORTS.map(v => v.name).join(', ')}\n\n`;

        md += '## Top 10 Offending Selectors\n';
        if (topOffenders.length === 0) {
            md += 'No offenders found! 🎉\n';
        } else {
            topOffenders.forEach(([selector, count]) => {
                md += `- \`${selector}\`: found in ${count} failed views\n`;
            });
        }

        md += '\n## Detailed Failures\n';
        const failedResults = results.filter(r => r.overflow > 0);

        if (failedResults.length === 0) {
            md += 'No pages with horizontal overflow detected.\n';
        }

        failedResults.forEach(r => {
            md += `### ${r.url} (${r.viewport})\n`;
            md += `Overflow: ${r.overflow}px\n`;
            md += 'Offenders:\n';
            r.offenders.forEach(o => {
                md += `- \`${o.selector}\` (Scroll: ${o.scrollWidth}px, Client: ${o.clientWidth}px)\n`;
            });
            md += '\n';
        });

        fs.writeFileSync(reportMdPath, md);
        console.log(`Report saved to ${reportMdPath}`);
    });

    for (const viewport of VIEWPORTS) {
        for (const route of routes) {
            test(`Check ${route} on ${viewport.name}`, async ({ page }) => {
                await page.setViewportSize({ width: viewport.width, height: viewport.height });
                await page.goto(route, { waitUntil: 'domcontentloaded' });

                // Wait a bit for layout to settle (charts etc)
                await page.waitForTimeout(1000);

                const checkResult = await page.evaluate(() => {
                    const docEl = document.documentElement;
                    // Use Math.ceil to handle subpixel rendering issues
                    const overflow = Math.ceil(docEl.scrollWidth) - Math.ceil(docEl.clientWidth);

                    if (overflow <= 1) return { overflow: 0, offenders: [] }; // Tolerance of 1px

                    // Find offenders
                    const all = document.querySelectorAll('*');
                    const offenders = [];
                    const viewportWidth = docEl.clientWidth;

                    for (const el of Array.from(all)) {
                        // Skip hidden elements
                        if (getComputedStyle(el).display === 'none') continue;

                        const rect = el.getBoundingClientRect();
                        // Check if element extends physically beyond viewport
                        // OR if it has internal scrollWidth > clientWidth (and isn't just a scrollable container implemented correctly)
                        // Focus on elements EXTENDING beyond viewport right edge

                        if (rect.right > viewportWidth + 1) {
                            // Generate a simple selector
                            let selector = el.tagName.toLowerCase();
                            if (el.id) selector += `#${el.id}`;
                            else if (el.className && typeof el.className === 'string') {
                                selector += `.${el.className.split(' ').filter(c => c && !c.includes(':')).join('.')}`;
                            }

                            offenders.push({
                                selector: selector.substring(0, 100), // truncate
                                scrollWidth: el.scrollWidth,
                                clientWidth: el.clientWidth,
                                rect: { right: rect.right, width: rect.width },
                                html: el.outerHTML.substring(0, 100)
                            });
                        }
                    }
                    // Sort by how far they stick out
                    offenders.sort((a, b) => b.rect.right - a.rect.right);

                    // Return top 5 offenders per page to keep it clean
                    return { overflow, offenders: offenders.slice(0, 5) };
                });

                if (checkResult.overflow > 0) {
                    results.push({
                        url: route,
                        viewport: viewport.name,
                        overflow: checkResult.overflow,
                        offenders: checkResult.offenders
                    });

                    // Screenshot failure
                    const cleanRoute = route.replace(/\//g, '_');
                    const screenshotsDir = path.join(process.cwd(), 'qa-responsive', 'failure-screenshots');
                    if (!fs.existsSync(screenshotsDir)) fs.mkdirSync(screenshotsDir, { recursive: true });
                    await page.screenshot({ path: path.join(screenshotsDir, `${cleanRoute}-${viewport.name}.png`) });
                }
            });
        }
    }
});
