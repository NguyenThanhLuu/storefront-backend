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

  let token: string,
    userId = 2;

  it("should create new user", async (done) => {
    const res = await request.post("/users/create").send(userData);
    const { body, status } = res;
    token = body;
    const { user } = jwt.verify(token, SECRET) as JwtPayload;
    userId = user.id;
    expect(status).toBe(200);
    done();
  });

  it("should get all users", async (done) => {
    const res = await request.get("/users").set("Authorization", "bearer " + token);
    expect(res.status).toBe(200);
    done();
  });

  it("should get user with id = 2", async (done) => {
    const res = await request.get(`/users/${userId}`).set("Authorization", "bearer " + token);
    expect(res.status).toBe(200);
    done();
  });
});
