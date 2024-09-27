const { test } = require("@playwright/test");

test("Browser Context Playwright test", async ({ browser }) => {
  const context = await browser.newContext();
  const page = await context.newPage();
  await page.goto("https://rahulshettyacademy.com/loginpagePractise/");
});

test.only("Page Playwrite test", async ({ page }) => {
  await page.goto("https://google.com");
});
