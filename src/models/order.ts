import Client from "../db-connecting";
import { Order } from "../shares/interfaces/order";

export class OrderQuery {
  async getAllOrders(): Promise<Order[]> {
    try {
      const connection = await Client.connect();
      const sql = "SELECT * FROM orders";
      const { rows } = await connection.query(sql);
      connection.release();
      return rows;
    } catch (err) {
      throw new Error(`Could not get all orders: ${err}`);
    }
  }

  async createNewOrder(order: Order): Promise<Order> {
    const { user_id, product_id, status, quantity } = order;
    try {
      const sql = "INSERT INTO orders (user_id, product_id, status, quantity) VALUES($1, $2, $3, $4) RETURNING *";
      const connection = await Client.connect();
      const { rows } = await connection.query(sql, [user_id, product_id, status, quantity]);
      connection.release();
      return rows[0];
    } catch (err) {
      throw new Error(`Could not add a new order: ${err}`);
    }
  }

  async getOrdersWithQuery(orderId: string | number): Promise<Order> {
    try {
      const sql = "SELECT * FROM orders WHERE id = $1";
      const connection = await Client.connect();
      const { rows } = await connection.query(sql, [orderId]);
      connection.release();
      return rows;
    } catch (err) {
      throw new Error(`Could not get orders from query: ${err}`);
    }
  }
}
