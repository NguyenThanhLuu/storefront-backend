import Client from "../db-connecting";
import { Order } from "../shares/interfaces/order";
import { OrderResult } from "../shares/interfaces/orderResult";

export class OrderQuery {
  async getAllOrders(): Promise<OrderResult[]> {
    try {
      const connection = await Client.connect();
      const sqlForOrders = "SELECT * FROM orders";
      const sqlForOrderProducts = "SELECT product_id, quantity FROM order_products WHERE order_id=($1)";
      const { rows } = await connection.query(sqlForOrders);
      const orderResult: OrderResult[] = [];

      for (let order of rows) {
        const { rows } = await connection.query(sqlForOrderProducts, [order.id]);
        orderResult.push({
          ...order,
          products: rows,
        });
      }

      connection.release();
      return orderResult;
    } catch (err) {
      throw new Error(`Could not get all orders: ${err}`);
    }
  }

  async createNewOrder(order: Order): Promise<Order> {
    const { user_id, status, products } = order;
    try {
      const sqlForOrders = "INSERT INTO orders (user_id, status) VALUES($1, $2) RETURNING *";
      const sqlForOrderProducts = "INSERT INTO order_products (order_id, product_id, quantity) VALUES($1, $2, $3) RETURNING *";
      const connection = await Client.connect();
      const { rows } = await connection.query(sqlForOrders, [user_id, status]);
      const orderId = rows[0].id;
      const result = { ...rows[0], products: [] };

      for (let product of products) {
        const { rows } = await connection.query(sqlForOrderProducts, [orderId, product.product_id, product.quantity]);
        result.products.push(rows[0]);
      }

      connection.release();
      return result;
    } catch (err) {
      throw new Error(`Could not add a new order: ${err}`);
    }
  }

  async getOrdersWithQuery(orderId: number): Promise<Order> {
    try {
      const sql = "SELECT * FROM orders WHERE id=($1)";
      const connection = await Client.connect();
      const { rows } = await connection.query(sql, [orderId]);
      const order = rows[0];
      const orderProductsSql = "SELECT product_id, quantity FROM order_products WHERE order_id=($1)";
      const { rows: productsOrderRows } = await connection.query(orderProductsSql, [orderId]);
      connection.release();
      return {
        ...order,
        products: productsOrderRows,
      };
    } catch (err) {
      throw new Error(`Could not get orders from query: ${err}`);
    }
  }
}
