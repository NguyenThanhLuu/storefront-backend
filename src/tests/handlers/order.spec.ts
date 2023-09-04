import supertest from "supertest";

import app from "../../server";
import { User } from "../../shares/interfaces/user";

const request = supertest(app);

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
    expect(res.body).toEqual({
      user_id: 2,
      status: "pending",
      products: [
        {
          product_id: 6,
          quantity: 6,
        },
      ],
    });
  });

  it("gets index endpoint", async (done) => {
    request
      .get("/orders")
      .set("Authorization", "bearer " + token)
      .then((res) => {
        expect(res.status).toBe(200);
        done();
      });
  });

  it("should gets the read endpoint", async (done) => {
    request
      .get(`/orders/1`)
      .set("Authorization", "bearer " + token)
      .then((res) => {
        expect(res.status).toBe(200);
        done();
      });
  });
});
