import { UserQuery } from "../../models/user";
import { User } from "../../shares/interfaces/user";

const userStore = new UserQuery();

describe("User Model", () => {
  const user: User = {
    firstname: "Joo",
    lastname: "David",
    username: "DavidJoo",
    password: "DavidJoo123",
  };

  async function createUser(user: User) {
    return userStore.createNewUser(user);
  }

  it("should have getAllUsers method", () => {
    expect(userStore.getAllUsers).toBeDefined();
  });

  it("should have getUsersWithQuery method", () => {
    expect(userStore.getUsersWithQuery).toBeDefined();
  });

  it("should have createNewUser method", () => {
    expect(userStore.createNewUser).toBeDefined();
  });

  it("should create a new user", async () => {
    const createdUser = await createUser(user);
    if (createdUser) {
      expect(createdUser.username).toBe(user.username);
      expect(createdUser.firstname).toBe(user.firstname);
      expect(createdUser.lastname).toBe(user.lastname);
    }
  });

  it("should return all users", async () => {
    const result: any = await userStore.getAllUsers();
    expect(result[0].username).toEqual("DavidJoo");
    expect(result[0].id).toEqual(1);
    expect(result[0].firstname).toEqual("Joo");
    expect(result[0].lastname).toEqual("David");
  });
});
