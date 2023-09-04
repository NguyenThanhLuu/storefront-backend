import { OrderQuery } from "../../models/order";
import { ProductQuery } from "../../models/product";
import { UserQuery } from "../../models/user";
import { Order } from "../../shares/interfaces/order";
import { Product } from "../../shares/interfaces/product";
import { User } from "../../shares/interfaces/user";

const orderStore = new OrderQuery();

describe("Order Model", () => {
  const userStore = new UserQuery();
  const productStore = new ProductQuery();

  let order: Order;
  let user_id: number | string;
  let product_id: number | string;

  function createOrder(order: Order) {
    return orderStore.createNewOrder(order);
  }

  beforeAll(async () => {
    const user: User = await userStore.createNewUser({
      firstname: "Joo",
      lastname: "David",
      username: "DavidJoo",
      password: "DavidJoo123",
    });
    if (user.id) {
      user_id = user.id;
    }
    const product: Product = await productStore.createNewAProduct({
      name: "product new 1",
      price: 20,
    });
    if (product.id) {
      product_id = product.id;
    }
  });

  it("should have getAllOrders method", () => {
    expect(orderStore.getAllOrders).toBeDefined();
  });

  it("should have getOrdersWithQuery method", () => {
    expect(orderStore.getOrdersWithQuery).toBeDefined();
  });

  it("should have createNewOrder method", () => {
    expect(orderStore.createNewOrder).toBeDefined();
  });
});
