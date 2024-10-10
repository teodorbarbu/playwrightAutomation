const { test, expect, request } = require("@playwright/test");
const { APiutils } = require("./utils/APIUtils");
const loginPayLoad = {
  userEmail: "anshika@gmail.com",
  userPassword: "Iamking@000",
};
const orderPayload = {
  orders: [
    { country: "United States", productOrderedId: "6581ca399fd99c85e8ee7f45" },
  ],
};

let token;
let orderId;

test.beforeAll(async () => {
  //login API
  const apiContext = await request.newContext();
  const apiUtils = new APiutils(apiContext, loginPayLoad);
  apiUtils.createOrder(orderPayload);
});

/*const loginResponse = await apiContext.post(
    "https://rahulshettyacademy.com/client/auth/login",
    { data: loginPayLoad }
  );

  expect(loginResponse.ok()).toBeTruthy();
  const loginResponseJson = await loginResponse.json();
  token = loginResponseJson.token;
  console.login(token);*/
//

//test.beforeEach(() => {});

test("WebAPIpart1/Place the order", async ({ page }) => {
  const apiUtils = new APIUtils(apiContext, loginPayLoad);
  const orderId = createOrder(orderPayload);
  page.addInitScript((value) => {
    window.localStorage.setItem("token", value);
  }, token);
  //const email = "anshika@gmail.com";
  //   await page.locator("#userEmail").fill(email);
  //   await page.locator("#userPassword").fill("Iamking@000");
  //   await page.locator("[value='Login']").click();
  //   await page.waitForLoadState("networkidle");
  await page.goto("https://rahulshettyacademy.com/client");
  /*const email = "";
  const productName = "ZARA COAT 3";
  const products = page.locator(".card-body");
  const titles = await page.locator(".card-body b").allTextContents();
  console.log(titles);
  const count = await products.count();
  for (let i = 0; i < count; ++i) {
    if ((await products.nth(i).locator("b").textContent()) === productName) {
      //add to cart
      await products.nth(i).locator("text =  Add To Cart").click();
      break;
    }
  }*/
  /*await page.locator("[routerlink*='cart']").click();
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
      await dropdowm.locator("button").nth(i).click();
      break;
    }
  }
  await expect(page.locator(".user__name [type='text']").first()).toHaveText(
    email
  );
  await page.locator(".action__submit").click();
  await expect(page.locator(".hero-primary")).toHaveText(
    " Thankyou for the order. "
  );
  const orderId = await page
    .locator(".em-spacer-1 .ng-star-inserted")
    .textContent();
  console.log(orderId);*/
  await page.locator("button[routerlink*='myorders']").click();
  await page.locator("tbody").waitFor();
  const rows = await page.locator("tbody tr");
  for (let i = 0; i < (await rows.count()); ++i) {
    const rowOrderId = await rows.nth(i).locator("th").textContent();
    if (orderId.includes(rowOrderId)) {
      await rows.nth(i).locator("button").first().click();
      break;
    }
  }
  const orderIdDetails = await page.locator(".col-text").textContent();
  expect(orderId.includes(orderIdDetails)).toBeTruthy();
});