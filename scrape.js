const puppeteer = require('puppeteer-core');
const chromiumPath = '/usr/bin/chromium';  // Path to Chromium binary

(async () => {
    const browser = await puppeteer.launch({
        executablePath: chromiumPath,
        headless: true,
        args: ['--no-sandbox', '--disable-setuid-sandbox']
    });

    const page = await browser.newPage();
    await page.goto(process.env.SCRAPE_URL);

    // Scraping example data
    const data = await page.evaluate(() => {
        return {
            title: document.title,
            firstHeading: document.querySelector('h1')?.innerText || 'No heading found',
        };
    });

    // Save the data to a JSON file
    const fs = require('fs');
    fs.writeFileSync('scraped_data.json', JSON.stringify(data));

    // Optionally, take a screenshot
    await page.screenshot({ path: 'screenshot.png' });

    await browser.close();
})();