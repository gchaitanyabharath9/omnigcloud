
import { defineConfig } from '@playwright/test';

export default defineConfig({
    testDir: './scripts',
    timeout: 30000,
    retries: 0,
    use: {
        baseURL: 'http://localhost:3001',
        trace: 'on-first-retry',
    },
    webServer: {
        command: 'npm run start -- -p 3001',
        port: 3001,
        reuseExistingServer: !process.env.CI,
        timeout: 120 * 1000,
    },
    projects: [
        {
            name: 'responsive',
            testMatch: /responsive-check\.spec\.ts/,
        },
        {
            name: 'perf',
            testMatch: /perf-check\.spec\.ts/
        }
    ]
});
