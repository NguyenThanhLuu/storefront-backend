import bcrypt from "bcrypt";

import Client from "../db-connecting";
import { User } from "../shares/interfaces/user";

export class UserQuery {
  async getAllUsers(): Promise<User[]> {
    try {
      const connection = await Client.connect();
      const sql = "SELECT * FROM users";
      const { rows } = await connection.query(sql);
      connection.release();
      return rows;
    } catch (err) {
      throw new Error(`Could not get all users: ${err}`);
    }
  }

  async getUsersWithQuery(userId: string | number): Promise<User> {
    try {
      const sql = "SELECT * FROM users WHERE id = $1";
      const connection = await Client.connect();
      const { rows } = await connection.query(sql, [userId]);
      connection.release();
      return rows;
    } catch (err) {
      throw new Error(`Could not get users from query: ${err}`);
    }
  }

  async createNewUser(user: User): Promise<User> {
    const { firstname, lastname, username, encode_pass } = user;
    const hashCode = bcrypt.hashSync(encode_pass + (process.env.BCRYPT_PASSWORD as string), parseInt(process.env.SALT_ROUNDS as string, 10));
    try {
      const sql = "INSERT INTO users (firstname, lastname, username, encode_pass) VALUES($1, $2, $3, $4) RETURNING *";
      const connection = await Client.connect();
      const { rows } = await connection.query(sql, [firstname, lastname, username, hashCode]);
      connection.release();
      return rows[0];
    } catch (err) {
      throw new Error(`Could not add a new user: ${err}`);
    }
  }
}