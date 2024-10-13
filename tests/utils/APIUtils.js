class APIUtils {
  constructor(apiContext, loginPayLoad) {
    this.apiContext = apiContext;
    this.loginPayLoad = loginPayLoad;
  }
  async getToken() {
    const loginResponse = await this.apiContext.post(
      "https://rahulshettyacademy.com/client/auth/login",
      { data: this.loginPayLoad }
    );

    //expect(loginResponse.ok()).toBeTruthy();
    const loginResponseJson = await loginResponse.json();
    const token = loginResponseJson.token;
    console.login(token);
    return token;
  }
  async createOrder(orderPayload) {
    let response = {};
    response.token = await this.getToken();
    const orderResponse = await this.apiContext.post(
      "https://rahulshettyacademy.com/api/ecom/order/create-order",
      {
        data: orderPayload,
        headers: {
          Authorization: response.token,
          "Content-Type": "aplication/json",
        },
      }
    );
    const orderResponseJson = await orderResponse.jason();
    const orderId = orderResponseJson.orders[0];
    response.orderId = orderId;
    return response;
  }
}
module.exports = { APIUtils };
