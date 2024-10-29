const { test, expect, request } = require("@playwright/test");
const { APIUtils } = require("../utils/APIUtils");

const loginPayLoad = {
  userEmail: "testtmail95@gmail.com",
  userPassword: "HiRahul@123",
};
const orderPayLoad = {
  orders: [{ country: "Cuba", productOrderedId: "6581cade9fd99c85e8ee7ff5" }],
};
const fakePayLoadOrders = { data: [], message: "No Orders" };

let response = {};
test.beforeAll(async () => {
  //login API
  const apiContext = await request.newContext();
  const apiUtils = new APIUtils(apiContext, loginPayLoad);
  response = await apiUtils.createOrder(orderPayLoad);
});

test("Network Test", async ({ page }) => {
  page.addInitScript((value) => {
    window.localStorage.setItem("token", value);
  }, response.token);
  await page.goto("https://rahulshettyacademy.com/client");

  await page.locator("button[routerlink*='myorders']").click();
  await page.route(
    "https://rahulshettyacademy.com/api/ecom/order/get-orders-details?id=670e8d2fae2afd4c0b9be999",
    (route) =>
      route.continue({
        url: "https://rahulshettyacademy.com/api/ecom/order/get-orders-details?id=671a8696ae2afd4c0ba79fbe",
      })
  );

  await page.locator("button:has-text('View')").nth(1).click();
  await page.pause();
  console.log(await page.locator(".blink_me").textContent());
});
