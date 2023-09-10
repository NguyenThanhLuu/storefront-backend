import { Application, Request, Response } from "express";

import { OrderQuery } from "../models/order";
import { Order } from "../shares/interfaces/order";
import { OrderResult } from "../shares/interfaces/orderResult";
import { verifyUserToken } from "../token-handlers/verify";

const orderQuery = new OrderQuery();

const getAllOrders = async (req: Request, res: Response) => {
  try {
    const orders: OrderResult[] = await orderQuery.getAllOrders();
    res.json(orders);
  } catch (err) {
    res.status(500).json(err);
  }
};

const createNewOrder = async (req: Request, res: Response) => {
  try {
    const user_id = req.body.user_id;
    const status = req.body.status;
    const products = req.body.products;
    console.log("products me:", products);
    if (!user_id || !status || !products) {
      res.status(400).send("Your request body lack of product_id or user_id or quantity or status");
      return;
    }
    const order: Order = await orderQuery.createNewOrder({
      user_id,
      status,
      products,
    });
    res.json(order);
  } catch (err) {
    res.status(500).json(err);
  }
};

const getOrdersWithQuery = async (req: Request, res: Response) => {
  try {
    const id = +req.params.id;
    if (!id) {
      res.status(400).send("Your request body lack of id");
      return;
    }
    const order: Order = await orderQuery.getOrdersWithQuery(id);
    res.json(order);
  } catch (err) {
    res.status(500).json(err);
  }
};

const deleteOrder = async (req: Request, res: Response) => {
  try {
    const id = req.params.id as unknown as number;
    if (!id) {
      res.status(400);
      res.send("Missing required parameter :id.");
      return false;
    }
    await orderQuery.deleteAnOrder(id);
    res.send(`Order with id ${id} successfully deleted.`);
  } catch (e) {
    res.status(400);
    res.json(e);
  }
};

export default function orderRoutes(app: Application) {
  app.get("/orders", verifyUserToken, getAllOrders);
  app.get("/orders/:id", verifyUserToken, getOrdersWithQuery);
  app.post("/orders", verifyUserToken, createNewOrder);
  app.delete("/orders/:id", verifyUserToken, deleteOrder);
}
