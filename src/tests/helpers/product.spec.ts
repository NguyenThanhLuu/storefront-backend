import supertest from "supertest";
import jwt, { JwtPayload, Secret } from "jsonwebtoken";
import app from "../../server";
import { Product } from "../../shares/interfaces/product";
import { User } from "../../shares/interfaces/user";

const request = supertest(app);
const SECRET = process.env.TOKEN_KEY as Secret;

describe("Product Handler", () => {
  const product: Product = {
    name: "Basil Barramunda",
    price: 29,
  };

  let token: string, userId: number;

  beforeAll(async () => {
    const userData: User = {
      firstname: "Joo",
      lastname: "David",
      username: "DavidJoo",
      encode_pass: "DavidJoo123",
    };

    const { body } = await request.post("/users/create").send(userData);
    token = body;
    const { user } = jwt.verify(body, SECRET) as JwtPayload;
    userId = user.id;
  });

  afterAll(async () => {
    await request.delete(`/users/${userId}`).set("Authorization", "bearer " + token);
  });

  it("should create new product", async (done) => {
    const res = await request
      .post("/products/create")
      .send(product)
      .set("Authorization", "bearer " + token);
    expect(res.status).toBe(200);
    done();
  });

  it("should get all products", async (done) => {
    const res = await request.get("/products");
    expect(res.status).toBe(200);
    done();
  });

  it("should get product with id = 3", async (done) => {
    const res = await request.get(`/products/3`);
    expect(res.status).toBe(200);
    done();
  });

  it("gets the update endpoint", async (done) => {
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
    done();
  });

  it("gets the delete endpoint", async (done) => {
    const res = await request.delete(`/products/4`).set("Authorization", "bearer " + token);
    expect(res.status).toBe(200);
    done();
  });
});
