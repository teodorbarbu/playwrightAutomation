const { test, expect } = require("@playwright/test");

test("Browser Context Playwright test", async ({ page }) => {
  const email = "anshika@gmail.com";
  const productName = "ZARA COAT 3";
  const products = page.locator(".card-body");
  await page.goto("https://rahulshettyacademy.com/client");
  await page.locator("#userEmail").fill(email);
  await page.locator("#userPassword").fill("Iamking@000");
  await page.locator("[value='Login']").click();
  await page.waitForLoadState("networkidle");
  const titles = await page.locator(".card-body b").allTextContents();
  console.log(titles);
  const count = await products.count();
  for (let i = 0; i < count; ++i) {
    if ((await products.nth(i).locator("b").textContent()) === productName) {
      //add to cart
      await products.nth(i).locator("text =  Add To Cart").click();
      break;
    }
  }
  await page.locator("[routerlink*='cart']").click();
  await page.locator("div li").first().waitFor(); //wait for the the element to be visible

  const bool = await page.locator("h3:has-text('Zara Coat 3')").isVisible();
  expect(bool).toBeTruthy();
  await page.locator("text=Checkout").click();
  await page.locator("[placeholder*='Country']").type("uni", { delay: 100 });
  const dropdowm = page.locator(".ta-results");
  await dropdowm.waitFor();
  let optionsCount = await dropdowm.locator("button").count();
  for (let i = 0; i < optionsCount; ++i) {
    let text = await dropdowm.locator("button").nth(i).textContent();
    if (text === " United States") {
      dropdowm.locator("button").nth(i).click();
      break;
    }
  }
  await expect(page.locator("ng-touched")).toHaveText(email);
  await page.locator(".action__submit").click();
  await expect(page.locator(".hero-primary type='text")).toHaveText(
    " Thankyou for the order. "
  );
  const orderId = await page.locator(".em-spacer-1 ").textContent();
  console.log(orderId);
});
