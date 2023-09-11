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
  let user_id: number;
  let product_id: number;

  function createAnOrder(order: Order) {
    return orderStore.createNewOrder(order);
  }

  beforeAll(async () => {
    const user: User = await userStore.createNewUser({
      firstname: "Joo",
      lastname: "David",
      username: "DavidJoo",
      password: "DavidJoo123",
    });
    user_id = user.id ? user.id : 1;
    const product: Product = await productStore.createNewAProduct({
      name: "Product 1",
      price: 1000,
    });
    product_id = product.id ? product.id : 1;
    order = {
      products: [
        {
          product_id,
          quantity: 5,
        },
      ],
      user_id,
      status: "pending",
    };
  });

  afterAll(async () => {
    await userStore.deleteAnUser(user_id);
    await productStore.deleteAProduct(product_id);
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

  it("should return correct new order after run createAnOrder() in model", async () => {
    const createdOrder: Order = await createAnOrder(order);
    expect(createdOrder.user_id).toEqual(order.user_id);
    await orderStore.deleteAnOrder(createdOrder.id);
  });

  it("should return a list of orders after get all", async () => {
    const createdOrder: Order = await createAnOrder(order);
    const orderList = await orderStore.getAllOrders();
    expect(orderList).toBeTruthy();
    await orderStore.deleteAnOrder(createdOrder.id);
  });

  it("show return correct order follow an id", async () => {
    const createdOrder: Order = await createAnOrder(order);
    if (createdOrder.id) {
      const orderData = await orderStore.getOrdersWithQuery(createdOrder.id);
      expect(orderData.user_id).toEqual(createdOrder.user_id);
    }
    await orderStore.deleteAnOrder(createdOrder.id);
  });

  it("should remove the order item", async () => {
    const createdOrder: Order = await createAnOrder(order);
    await orderStore.deleteAnOrder(createdOrder.id);
    const orderList = await orderStore.getAllOrders();
    expect(orderList).toBeDefined();
  });
});
