import { Application, Request, Response } from "express";

import { OrderQuery } from "../models/order";
import { Order } from "../shares/interfaces/order";
import { verifyUserToken } from "../token-handlers/verify";

const orderQuery = new OrderQuery();

const getAllOrders = async (req: Request, res: Response) => {
  try {
    const orders: Order[] = await orderQuery.getAllOrders();
    res.json(orders);
  } catch (err) {
    res.status(400);
    res.json(err);
  }
};

const createNewOrder = async (req: Request, res: Response) => {
  try {
    const product_id = req.body.product_id;
    const user_id = req.body.user_id;
    const quantity = req.body.quantity;
    const status = req.body.status;
    if (!product_id || !user_id || !quantity || !status) {
      res.status(400).send("Your request body lack of product_id or user_id or quantity or status");
      return;
    }
    const order: Order = await orderQuery.createNewOrder({
      product_id,
      user_id,
      quantity,
      status,
    });
    res.json(order);
  } catch (err) {
    res.status(400).json(err);
  }
};

const getOrdersWithQuery = async (req: Request, res: Response) => {
  try {
    const id = req.params.id;
    if (!id) {
      res.status(400).send("Your request body lack of id");
      return;
    }
    const order: Order = await orderQuery.getOrdersWithQuery(id);
    res.json(order);
  } catch (err) {
    res.status(400).json(err);
  }
};

export default function orderRoutes(app: Application) {
  app.get("/orders", verifyUserToken, getAllOrders);
  app.get("/orders/:id", verifyUserToken, getOrdersWithQuery);
  app.post("/orders/create", verifyUserToken, createNewOrder);
}
