const http = require('http');
const { chromium } = require('playwright');

const server = http.createServer(async (req, res) => {

  try {

    const url = new URL(req.url, `http://${req.headers.host}`);
    const lyrics = url.searchParams.get('lyrics') || 'test lyrics';

    console.log('Received lyrics:', lyrics);

    const browser = await chromium.launch({
      headless: true,
      args: [
        '--no-sandbox',
        '--disable-setuid-sandbox',
        '--disable-dev-shm-usage',
        '--disable-gpu'
      ]
    });

    const page = await browser.newPage();

    console.log('Opening Suno...');

    await page.goto('https://suno.com/create', {
      waitUntil: 'domcontentloaded',
      timeout: 30000
    });

    console.log('Suno opened');
    const textarea = await page.locator('textarea').first();

await textarea.fill(lyrics);

console.log('Lyrics inserted');

    await page.waitForTimeout(5000);

    await browser.close();

    res.end('DONE');

  } catch (err) {

    console.error(err);

    res.statusCode = 500;
    res.end('ERROR');

  }

});

server.listen(3000, () => {
  console.log('Bot server running on port 3000');
});
