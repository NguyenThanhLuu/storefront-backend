import dotenv from "dotenv";
import jwt, { Secret } from "jsonwebtoken";

import { User } from "../shares/interfaces/user";
dotenv.config();

const SECRET = process.env.TOKEN_KEY as Secret;

export const getTokenByUser = (user: User) => {
  return jwt.sign(user, SECRET);
};
