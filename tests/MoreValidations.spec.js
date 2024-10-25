const { test, expect } = require("@playwright/test");

test("Popup validations", async ({ page }) => {
  await page.goto("https://rahulshettyacademy.com/AutomationPractice/");
  //await page.goto("http://google.com");
  //await page.goBack();
  //await page.goForward();
  await expect(page.locator("#displayed-text")).toBeVisible();
  await page.locator("#hide-textbox").click();
  await expect(page.locator("#displayed-text")).toBeHidden();
  page.on("dialog", (dialog) => dialog, aceept());
  //page.on("dialog", (dialog) => dialog.dismiss());
  //await page.pause();
  await page.locator("#confirmbtn").click();
  await page.locator("#mousehover").hover();
  const framesPage = page.frameLocator("#courses-iframe");
  await framesPage.locator("li a[href*='lifetime-access']:visible").click();
  const textCheck = await framesPage.locator(".text h2").textContent();
  console.log(textCheck.split(" ")[1]);
});

test("Screenshot & Visual Comparison", async ({ page }) => {
  await page.goto("https://rahulshettyacademy.com/AutomationPractice/");
  await expect(page.locator("#displayed-text")).toBeVisible();
  await page
    .locator("#displayed-text")
    .screenshot({ path: "partialScreenshot.png" });
  await page.locator("#hide-textbox").click();
  await page.screenshot({ path: "screenshot.png" });
  await expect(page.locator("#displayed-text")).toBeHidden();
});

test.only("Visual Test", async ({ page }) => {
  await page.goto("https://www.flightaware.com/");
  expect(await page.screenshot()).toMatchSnapshot("landing.png");
});

/*test.only("Visual", async ({ page }) => {
  await page.goto("https://www.google.com/");
  expect(await page.screenshot()).toMatchSnapshot("homeGoogle.png");
});*/
