const { chromium } = require('playwright');
const fs = require('fs');
const path = require('path');

async function testMobileNavigation() {
  console.log('🚀 Starting mobile navigation test for lighthouse.ked.dev');
  
  // Launch browser in mobile view
  const browser = await chromium.launch({ 
    headless: false,
    slowMo: 1000 // Slow down for better visibility
  });
  
  const context = await browser.newContext({
    viewport: { width: 375, height: 667 }, // iPhone SE dimensions
    userAgent: 'Mozilla/5.0 (iPhone; CPU iPhone OS 14_6 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/14.0 Mobile/15E148 Safari/604.1'
  });
  
  const page = await context.newPage();
  
  try {
    console.log('📱 Navigating to https://lighthouse.ked.dev');
    await page.goto('https://lighthouse.ked.dev', { waitUntil: 'networkidle' });
    
    // Take initial screenshot
    console.log('📸 Taking initial mobile screenshot');
    await page.screenshot({ 
      path: 'mobile-initial.png', 
      fullPage: true 
    });
    
    // Look for hamburger menu button
    console.log('🔍 Looking for hamburger menu button');
    const hamburgerSelectors = [
      'button[aria-label="Toggle navigation"]',
      '.navbar__toggle',
      '[class*="toggle"]',
      '[class*="hamburger"]',
      'button[class*="navbar"]',
      '.menu-toggle',
      '[aria-expanded]'
    ];
    
    let hamburgerButton = null;
    let usedSelector = '';
    
    for (const selector of hamburgerSelectors) {
      try {
        hamburgerButton = await page.locator(selector).first();
        if (await hamburgerButton.isVisible()) {
          usedSelector = selector;
          console.log(`✅ Found hamburger menu using selector: ${selector}`);
          break;
        }
      } catch (e) {
        // Continue to next selector
      }
    }
    
    if (!hamburgerButton || !(await hamburgerButton.isVisible())) {
      console.log('❌ No visible hamburger menu found, checking if menu is always visible');
      await page.screenshot({ path: 'mobile-no-hamburger.png' });
      
      // Check if navigation items are visible without hamburger
      const navItems = await page.locator('nav a, .navbar a, [class*="nav"] a').all();
      console.log(`📋 Found ${navItems.length} navigation items visible`);
      
      for (let i = 0; i < navItems.length && i < 5; i++) {
        try {
          const text = await navItems[i].textContent();
          const isVisible = await navItems[i].isVisible();
          console.log(`   - "${text}" (visible: ${isVisible})`);
        } catch (e) {
          console.log(`   - Item ${i}: Error reading text`);
        }
      }
    } else {
      console.log('🖱️  Clicking hamburger menu');
      await hamburgerButton.click();
      
      // Wait a moment for animation
      await page.waitForTimeout(500);
      
      // Take screenshot with menu opened
      console.log('📸 Taking screenshot with menu opened');
      await page.screenshot({ 
        path: 'mobile-menu-opened.png', 
        fullPage: true 
      });
      
      // Check for visible menu items
      console.log('🔍 Checking for visible menu items');
      const menuItems = await page.locator('nav a:visible, .navbar a:visible, [class*="nav"] a:visible').all();
      
      console.log(`📋 Found ${menuItems.length} visible menu items:`);
      
      for (let i = 0; i < menuItems.length && i < 10; i++) {
        try {
          const text = await menuItems[i].textContent();
          const href = await menuItems[i].getAttribute('href');
          console.log(`   - "${text?.trim()}" → ${href}`);
        } catch (e) {
          console.log(`   - Item ${i}: Error reading details`);
        }
      }
      
      // Test clicking a menu item if available
      if (menuItems.length > 0) {
        try {
          console.log('🖱️  Testing menu item click');
          const firstItem = menuItems[0];
          const itemText = await firstItem.textContent();
          console.log(`   Clicking on: "${itemText?.trim()}"`);
          
          await firstItem.click();
          await page.waitForTimeout(1000);
          
          console.log('📸 Taking screenshot after menu item click');
          await page.screenshot({ 
            path: 'mobile-after-click.png', 
            fullPage: true 
          });
          
          console.log(`📍 Current URL: ${page.url()}`);
        } catch (e) {
          console.log(`❌ Error testing menu item click: ${e.message}`);
        }
      }
    }
    
    // Check for any JavaScript errors
    const logs = [];
    page.on('console', msg => logs.push(`${msg.type()}: ${msg.text()}`));
    page.on('pageerror', err => logs.push(`ERROR: ${err.message}`));
    
    if (logs.length > 0) {
      console.log('🔍 Console logs and errors:');
      logs.forEach(log => console.log(`   ${log}`));
    }
    
    console.log('✅ Mobile navigation test completed');
    
  } catch (error) {
    console.error('❌ Error during mobile navigation test:', error.message);
    await page.screenshot({ path: 'mobile-error.png' });
  } finally {
    await browser.close();
  }
}

// Run the test
testMobileNavigation().catch(console.error);