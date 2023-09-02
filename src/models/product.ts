import Client from "../db-connecting";
import { Product } from "../shares/interfaces/product";

export class ProductQuery {
  async getAllProducts(): Promise<Product[]> {
    try {
      const connection = await Client.connect();
      const sql = "SELECT * FROM products";
      const { rows } = await connection.query(sql);
      connection.release();
      return rows;
    } catch (err) {
      throw new Error(`Could not get all products: ${err}`);
    }
  }

  async getProductsWithQuery(productId: string | number): Promise<Product> {
    try {
      const sql = "SELECT * FROM products WHERE id = $1";
      const connection = await Client.connect();
      const { rows } = await connection.query(sql, [productId]);
      connection.release();
      return rows;
    } catch (err) {
      throw new Error(`Could not get products from query: ${err}`);
    }
  }

  async createNewAProduct(product: Product): Promise<Product> {
    const { name, price } = product;
    try {
      const sql = "INSERT INTO products (name, price) VALUES($1, $2) RETURNING *";
      const connection = await Client.connect();
      const { rows } = await connection.query(sql, [name, price]);
      connection.release();
      return rows[0];
    } catch (err) {
      throw new Error(`Could not add a new product: ${err}`);
    }
  }

  async updateForAProduct(product: Product): Promise<Product> {
    const { id, name, price } = product;

    try {
      const sql = "UPDATE products SET name = $1, price = $2 WHERE id = $3 RETURNING *";
      const connection = await Client.connect();
      const { rows } = await connection.query(sql, [name, price, id]);
      connection.release();
      return rows[0];
    } catch (err) {
      throw new Error(`Could not update product: ${err}`);
    }
  }

  async deleteAProduct(id: string | number): Promise<Product> {
    try {
      const sql = "DELETE FROM products WHERE id=($1)";
      const connection = await Client.connect();
      const { rows } = await connection.query(sql, [id]);
      connection.release();
      return rows[0];
    } catch (err) {
      throw new Error(`Could not delete product: ${err}`);
    }
  }
}
