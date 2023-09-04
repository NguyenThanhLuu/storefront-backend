import supertest from "supertest";
import jwt, { JwtPayload, Secret } from "jsonwebtoken";

import app from "../../server";
import { Product } from "../../shares/interfaces/product";
import { User } from "../../shares/interfaces/user";

const request = supertest(app);
const SECRET = process.env.TOKEN_KEY as Secret;

describe("Product Handler", () => {
  const product: Product = {
    name: "Banana",
    price: 4000,
  };
  let token: string, userId: number;
  beforeAll(async () => {
    const userData: User = {
      firstname: "Joo",
      lastname: "David",
      username: "DavidJoo",
      password: "DavidJoo123",
    };
    const { body } = await request.post("/users").send(userData);
    token = body;
    const { user } = jwt.verify(body, SECRET) as JwtPayload;
    userId = user.id;
  });

  it("should return correct value with create product endpoint", async () => {
    const res = await request
      .post("/products")
      .send(product)
      .set("Authorization", "bearer " + token);
    expect(res.status).toBe(200);
  });

  it("should return correct value with get all product endpoint", async () => {
    const res = await request.get("/products");
    expect(res.status).toBe(200);
  });

  it("should return correct value with get products/3 endpoint", async () => {
    const res = await request.get(`/products/3`);
    expect(res.status).toBe(200);
  });

  it("should update endpoint", async () => {
    const newProductData: Product = {
      ...product,
      name: "Cap",
      price: 345,
    };
    const res = await request
      .put(`/products/2`)
      .send(newProductData)
      .set("Authorization", "bearer " + token);
    expect(res.status).toBe(200);
  });

  it("gets the delete endpoint", async () => {
    const res = await request.delete(`/products/4`).set("Authorization", "bearer " + token);
    expect(res.status).toBe(200);
  });
});
