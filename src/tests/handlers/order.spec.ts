import supertest from "supertest";
import { OrderQuery } from "../../models/order";

import app from "../../server";
import { User } from "../../shares/interfaces/user";

const request = supertest(app);
const orderStore = new OrderQuery();

describe("Order Handler", () => {
  let token: string;

  beforeAll(async () => {
    const userData: User = {
      firstname: "Joo",
      lastname: "David",
      username: "DavidJoo",
      password: "DavidJoo123",
    };
    const { body: userBody } = await request.post("/users").send(userData);
    token = userBody;
  });

  it("should create order (adding products to order) endpoint", async () => {
    const res = await request
      .post("/orders")
      .set("Authorization", "Bearer " + token)
      .send({
        user_id: 2,
        status: "pending",
        products: [
          {
            product_id: 6,
            quantity: 6,
          },
        ],
      });
    expect(res.status).toBe(200);
  });

  it("gets index endpoint", async () => {
    request
      .get("/orders")
      .set("Authorization", "bearer " + token)
      .then((res) => {
        expect(res.status).toBe(200);
      });
  });

  it("should gets the read endpoint", async () => {
    request
      .get(`/orders/1`)
      .set("Authorization", "bearer " + token)
      .then((res) => {
        expect(res.status).toBe(200);
      });
  });

  it("should gets the delete endpoint", async () => {
    request
      .delete(`/orders/2`)
      .set("Authorization", "bearer " + token)
      .then((res) => {
        expect(res.status).toBe(200);
      });
  });
});
