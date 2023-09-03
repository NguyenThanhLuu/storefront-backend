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
    const { body: userBody } = await request.post("/users/create").send(userData);
    token = userBody;
  });

  it("should create new order", async (done) => {
    const res = await request
      .post("/orders/create")
      .set("Authorization", "Bearer " + token)
      .send({
        id: 2,
        products: [
          {
            product_id: 6,
            quantity: 6,
          },
        ],
        user_id: 2,
        status: true,
      });

    expect(res.status).toBe(200);
    expect(res.body).toEqual({
      id: 2,
      products: [
        {
          product_id: 6,
          quantity: 6,
        },
      ],
      user_id: 2,
      status: true,
    });
    done();
  });

  it("gets orders", async (done) => {
    request
      .get("/orders")
      .set("Authorization", "bearer " + token)
      .then((res) => {
        expect(res.status).toBe(200);
        done();
      });
  });

  it("should gets the orders with id = 2", async (done) => {
    request
      .get(`/orders/2`)
      .set("Authorization", "bearer " + token)
      .then((res) => {
        expect(res.status).toBe(200);
        done();
      });
  });
});
