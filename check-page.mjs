import puppeteer from 'puppeteer';

(async () => {
  const browser = await puppeteer.launch({ headless: true });
  const page = await browser.newPage();
  
  // Capture console messages
  const consoleMessages = [];
  page.on('console', msg => {
    consoleMessages.push({
      type: msg.type(),
      text: msg.text()
    });
  });
  
  // Capture errors
  const errors = [];
  page.on('pageerror', error => {
    errors.push(error.toString());
  });
  
  try {
    await page.goto('http://localhost:5173/', { waitUntil: 'networkidle0', timeout: 10000 });
    
    // Wait a bit for React to render
    await page.waitForTimeout(2000);
    
    // Take screenshot
    await page.screenshot({ path: 'screenshot.png', fullPage: true });
    
    // Get page content
    const content = await page.evaluate(() => {
      const menu = document.querySelector('.menu');
      const title = document.querySelector('.menu__title');
      const button = document.querySelector('.btn--primary');
      const logo = document.querySelector('.menu__logo');
      
      return {
        hasMenu: !!menu,
        title: title?.textContent,
        buttonText: button?.textContent,
        hasLogo: !!logo,
        logoSrc: logo?.src,
        bodyHTML: document.body.innerHTML.substring(0, 500)
      };
    });
    
    console.log('=== PAGE CONTENT ===');
    console.log(JSON.stringify(content, null, 2));
    
    console.log('\n=== CONSOLE MESSAGES ===');
    consoleMessages.forEach(msg => {
      console.log(`[${msg.type}] ${msg.text}`);
    });
    
    console.log('\n=== ERRORS ===');
    if (errors.length === 0) {
      console.log('No errors detected');
    } else {
      errors.forEach(err => console.log(err));
    }
    
  } catch (error) {
    console.error('Error loading page:', error.message);
  } finally {
    await browser.close();
  }
})();
