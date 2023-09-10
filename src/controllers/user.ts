import { Application, Request, Response } from "express";
import { UserQuery } from "../models/user";
import { User } from "../shares/interfaces/user";
import { getTokenByUser } from "../token-handlers/create";
import { verifyUserToken } from "../token-handlers/verify";

const userQuery = new UserQuery();

const getAllUsers = async (req: Request, res: Response) => {
  try {
    const users: User[] = await userQuery.getAllUsers();
    res.json(users);
  } catch (err) {
    res.status(500).json(err);
  }
};

const getUsersWithQuery = async (req: Request, res: Response) => {
  try {
    const id = req.params.id;
    if (!id) {
      res.status(400).send("Your request body lack of id");
      return;
    }
    const user: User = await userQuery.getUsersWithQuery(id);
    res.json(user);
  } catch (err) {
    res.status(500).json(err);
  }
};

const createNewUser = async (req: Request, res: Response) => {
  try {
    const firstname = req.body.firstname;
    const lastname = req.body.lastname;
    const username = req.body.username;
    const password = req.body.password;
    if (!firstname || !lastname || !username || !password) {
      res.status(400).send("Your request body lack of firstname or lastname or username or password");
      return;
    }
    const user: User = await userQuery.createNewUser({ firstname, lastname, username, password });
    res.json(getTokenByUser(user));
  } catch (err) {
    res.status(500).json(err);
  }
};

const deleteUser = async (req: Request, res: Response) => {
  try {
    const id = req.params.id as unknown as number;
    if (!id) {
      res.status(400).send("Missing required parameter :id.");
      return false;
    }
    await userQuery.deleteAnUser(id);
    res.send(`User with id ${id} successfully deleted.`);
  } catch (err) {
    res.status(400).json(err);
  }
};

export default function handlerRouteForUser(app: Application) {
  app.post("/users", createNewUser);
  app.get("/users", verifyUserToken, getAllUsers);
  app.get("/users/:id", verifyUserToken, getUsersWithQuery);
  app.delete("/users/:id", verifyUserToken, deleteUser);
}
