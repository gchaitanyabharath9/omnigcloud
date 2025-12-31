const puppeteer = require('puppeteer');

(async () => {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    // Set viewport to ensure charts render well
    await page.setViewport({ width: 1200, height: 1600, deviceScaleFactor: 2 });

    console.log('Navigating to whitepaper...');
    await page.goto('http://localhost:3001/en/docs/whitepaper', { waitUntil: 'networkidle0' });

    // Wait a bit for animations
    await new Promise(r => setTimeout(r, 2000));

    console.log('Generating PDF...');
    await page.pdf({
        path: 'public/AECP-Whitepaper-v7.pdf',
        format: 'A4',
        printBackground: true,
        margin: { top: '1cm', bottom: '1cm', left: '1cm', right: '1cm' }
    });

    await browser.close();
    console.log('PDF generated at public/AECP-Whitepaper-v7.pdf');
})();
