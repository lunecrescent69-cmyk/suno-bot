const http = require('http');
const { chromium } = require('playwright');

const server = http.createServer(async (req, res) => {

  const url = new URL(req.url, `http://${req.headers.host}`);
  const lyrics = url.searchParams.get('lyrics') || 'test lyrics';

  console.log('Received lyrics');

  const browser = await chromium.launch({
    headless: true
  });

  const page = await browser.newPage();

  console.log('Opening Suno...');

  await page.goto('https://suno.com/create');

  await page.waitForTimeout(8000);

  const textarea = await page.locator('textarea').first();

  await textarea.fill(lyrics);

  console.log('Lyrics inserted');

  await page.waitForTimeout(3000);

  const buttons = await page.locator('button').all();

  for (const button of buttons) {
    const text = await button.textContent();

    if (text && text.toLowerCase().includes('create')) {
      console.log('Create button found');

      await button.click();

      console.log('Generate clicked');

      break;
    }
  }

  await page.screenshot({
    path: 'proof.png'
  });

  console.log('Screenshot saved');

  await browser.close();

  res.end('DONE');

});

server.listen(3000, () => {
  console.log('Bot server running on port 3000');
});
