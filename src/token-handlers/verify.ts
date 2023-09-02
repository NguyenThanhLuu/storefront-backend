import jwt, { Secret } from "jsonwebtoken";
import { NextFunction, Request, Response } from "express";
import dotenv from "dotenv";
dotenv.config();

const SECRET = process.env.TOKEN_KEY as Secret;

export const verifyUserToken = (req: Request, res: Response, next: NextFunction) => {
  if (!req.headers.authorization) {
    res.status(401).json({ error: "Access denied, invalid token" });
    return;
  }
  try {
    const token = req.headers.authorization.split(" ")[1];
    jwt.verify(token, SECRET);
    next();
  } catch (error) {
    res.status(401).json("Access denied, invalid token");
    return;
  }
};
