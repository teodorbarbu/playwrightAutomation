const { test, expect, request } = require("@playwright/test");
const { APIUtils } = require("../utils/APIUtils");

const loginPayLoad = {
  userEmail: "anshika@gmail.com",
  userPassword: "Iamking@000",
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
  await page.route(
    "https://rahulshettyacademy.com/api/ecom/order/get-orders-for-customer/620c7bf148767f1f1215d2ca",
    async (route) => {
      const response = await page.request.fetch(route.request());
      let body = fakePayLoadOrders;
      route.fulfill({
        response,
        body,
      });
    }
  );

  await page.locator("text='ORDERS'").click(); //("button[routerlink*='myorders']")
  //await page.pause();
  console.log(await page.locator(".mt-4").textContent());

  //await page.locator("tbody").waitFor();
  //const rows = await page.locator("tbody tr");
});
