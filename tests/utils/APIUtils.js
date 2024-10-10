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
    token = loginResponseJson.token;
    console.login(token);
    return token;
  }
  async createOreder(orderPayload) {
    const orderResponse = await this.apiContrxt.post(
      "https://rahulshettyacademy.com/api/ecom/order/create-order",
      {
        data: orderPayload,
        headers: {
          Autorizarion: this.getToken(),
          "Content-Type": "aplication/json",
        },
      }
    );
    const orderResponseJson = await orderResponse.jason();
    orderId = orderResponseJson.orders[0];
    return orderId;
  }
}
module.exports = { APIUtils };
