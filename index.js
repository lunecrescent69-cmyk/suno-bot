const { chromium } = require('playwright');

(async () => {
  const browser = await chromium.launch({
    headless: false
  });

  const context = await browser.newContext({
    storageState: 'auth.json'
  });

  const page = await context.newPage();

  console.log('Opening Suno...');

  await page.goto('https://suno.com');

  console.log('Waiting for login...');

  await page.waitForTimeout(60000);

  await context.storageState({
    path: 'auth.json'
  });

  console.log('Session saved');

  await browser.close();
})();
