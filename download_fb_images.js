const { chromium } = require('playwright');
const fs = require('fs');
const path = require('path');

const BASE = '/Users/shivacharanmandhapuram/Downloads/my-village-my-dream-foundation/images/gallery';
const jobs = JSON.parse(fs.readFileSync('/Users/shivacharanmandhapuram/Downloads/my-village-my-dream-foundation/download_jobs.json', 'utf8'));

(async () => {
  const browser = await chromium.connectOverCDP('http://localhost:9222');
  const context = browser.contexts()[0];
  const page = await context.newPage();

  let downloaded = 0;
  for (const job of jobs) {
    const dir = path.join(BASE, job.dir);
    fs.mkdirSync(dir, { recursive: true });
    const outPath = path.join(dir, job.file);

    try {
      await page.goto(job.url, { waitUntil: 'load', timeout: 15000 });
      const img = page.locator('img');
      if (await img.count() > 0) {
        await img.first().screenshot({ path: outPath, type: 'jpeg', quality: 90 });
        const size = fs.statSync(outPath).size;
        downloaded++;
        console.log(`${downloaded}/${jobs.length} ${job.dir}/${job.file} (${Math.round(size/1024)}KB)`);
      }
    } catch (e) {
      console.log(`SKIP ${job.dir}/${job.file}: ${e.message.substring(0, 50)}`);
    }
  }

  await page.close();
  console.log(`\nDone: ${downloaded}/${jobs.length} images downloaded`);
})();
