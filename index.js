const { chromium } = require('playwright');

(async () => {
  const browser = await chromium.launch({
    headless: true
  });

  const page = await browser.newPage();

  await page.goto('https://suno.com');

  console.log('Suno opened');

  await browser.close();
})();
