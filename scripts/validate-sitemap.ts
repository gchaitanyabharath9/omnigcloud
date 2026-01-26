const BASE_URL = process.argv[2] || 'http://localhost:3000';

async function run() {
    const sitemapUrl = `${BASE_URL}/sitemap.xml`;
    console.log(`🔍 Validating sitemap at ${sitemapUrl}...`);

    try {
        const res = await fetch(sitemapUrl);
        if (res.status !== 200) {
            console.error(`❌ Failed to fetch sitemap: ${res.status}`);
            process.exit(1);
        }
        const text = await res.text();
        const locRegex = /<loc>(.*?)<\/loc>/g;
        const urls = [];
        let match;
        while ((match = locRegex.exec(text)) !== null) {
            urls.push(match[1]);
        }

        console.log(`Found ${urls.length} URLs in sitemap.`);
        let failures = 0;

        for (const url of urls) {
            const checkRes = await fetch(url, { method: 'HEAD' });
            if (checkRes.status >= 400) {
                console.error(`❌ DEAD LINK: ${checkRes.status} ${url}`);
                failures++;
            }
        }

        if (failures > 0) {
            console.error(`\n❌ Sitemap validation FAILED with ${failures} dead links.`);
            process.exit(1);
        } else {
            console.log(`\n✅ Sitemap validation PASSED.`);
        }

    } catch (e) {
        console.error(e);
        process.exit(1);
    }
}

run();
