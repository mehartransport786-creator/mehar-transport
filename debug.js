const puppeteer = require('puppeteer');

(async () => {
  const browser = await puppeteer.launch({ headless: 'new' });
  const page = await browser.newPage();

  page.on('console', msg => console.log('BROWSER LOG:', msg.text()));
  page.on('pageerror', error => console.log('BROWSER ERROR:', error.message));

  console.log('Navigating to http://localhost:3000/en...');
  await page.goto('http://localhost:3000/en', { waitUntil: 'networkidle0' });
  
  const overlappingElementInfo = await page.evaluate(() => {
    const links = Array.from(document.querySelectorAll('a'));
    const bookNowLink = links.find(l => l.textContent.includes('Book Now'));
    if (!bookNowLink) return 'Could not find Book Now link';

    const rect = bookNowLink.getBoundingClientRect();
    const x = rect.left + rect.width / 2;
    const y = rect.top + rect.height / 2;
    
    const elementAtPoint = document.elementFromPoint(x, y);
    
    return {
      bookNowLinkHTML: bookNowLink.outerHTML,
      overlappingHTML: elementAtPoint ? elementAtPoint.outerHTML : 'null',
      x, y,
      sameNode: elementAtPoint === bookNowLink || bookNowLink.contains(elementAtPoint)
    };
  });

  console.log('Overlapping Element Info:', JSON.stringify(overlappingElementInfo, null, 2));

  await browser.close();
})();
