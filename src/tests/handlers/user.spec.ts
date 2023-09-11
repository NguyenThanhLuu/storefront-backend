import supertest from "supertest";
import jwt, { JwtPayload, Secret } from "jsonwebtoken";

import app from "../../server";
import { User } from "../../shares/interfaces/user";

const request = supertest(app);
const SECRET = process.env.TOKEN_KEY as Secret;

describe("User Handler", () => {
  const userData: User = {
    firstname: "Joo",
    lastname: "David",
    username: "DavidJoo",
    password: "DavidJoo123",
  };
  let token: string;
  let userId = 2;

  it("should return correct value with create user endpoint", async () => {
    const res = await request.post("/users").send(userData);
    const { body, status } = res;
    token = body;
    const user = jwt.verify(token, SECRET) as JwtPayload;
    userId = user.id;
    expect(status).toBe(200);
  });

  it("should return correct value with get all user endpoint", async () => {
    const res = await request.get("/users").set("Authorization", "bearer " + token);
    expect(res.status).toBe(200);
  });

  it("should get the read endpoint", async () => {
    const res = await request.get(`/users/${userId}`).set("Authorization", "bearer " + token);
    expect(res.status).toBe(200);
  });

  it("should get the delete endpoint", async () => {
    const res = await request.delete(`/users/${userId}`).set("Authorization", "bearer " + token);
    expect(res.status).toBe(200);
  });
});
