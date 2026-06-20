const puppeteer = require('puppeteer');

(async () => {
  const browser = await puppeteer.launch({ headless: 'new' });
  const page = await browser.newPage();

  page.on('console', msg => console.log('BROWSER LOG:', msg.text()));
  page.on('pageerror', error => console.log('BROWSER ERROR:', error.message));

  console.log('Navigating to http://192.168.8.53:3000/en/booking...');
  await page.goto('http://192.168.8.53:3000/en/booking', { waitUntil: 'networkidle0' });
  
  console.log('Clicking explicit Continue button instead of the card...');
  const continueBtn = await page.$('::-p-text(Continue)');
  if (continueBtn) {
    await continueBtn.click();
    console.log('Clicked Continue button.');
  } else {
    console.log('Could not find Continue button.');
  }

  await new Promise(resolve => setTimeout(resolve, 2000));
  
  const bodyText = await page.evaluate(() => document.body.innerText);
  if (bodyText.includes('Build Your Route')) {
    console.log('SUCCESS: Navigated to Route Builder!');
  } else {
    console.log('FAILED: Still not on Route Builder.');
    console.log('Step 1 text found?', bodyText.includes('Select Trip Type'));
  }

  await browser.close();
})();
