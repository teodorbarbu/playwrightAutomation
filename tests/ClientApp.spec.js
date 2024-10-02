const { test, expect } = require("@playwright/test");

test("Browser Context Playwright test", async ({ page }) => {
  const productName = "Zara Coat 3";
  const products = page.locator(".card-body");
  await page.goto("https://rahulshettyacademy.com/client");
  await page.locator("#userEmail").fill("anshika@gmail.com");
  await page.locator("#userPassword").fill("Iamking@000");
  await page.locator("[value='Login']").click();
  await page.waitForLoadState("networkidle");
  const titles = await page.locator(".card-body b").allTextContents();
  console.log(titles);
  const count = await products.count();
  for (let i = 0; i < count; ++i) {
    if ((await products.nth[i].locator("b").textContent()) === productName) {
      await products.nth(i).locator("text =  Add To Cart").click();
      break;
    }
  }
});
