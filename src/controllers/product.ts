import { Application, Request, Response } from "express";
import { ProductQuery } from "../models/product";
import { Product } from "../shares/interfaces/product";
import { verifyUserToken } from "../token-handlers/verify";

const productQuery = new ProductQuery();

const getAllProducts = async (req: Request, res: Response) => {
  try {
    const products: Product[] = await productQuery.getAllProducts();
    res.json(products);
  } catch (err) {
    res.status(500).json(err);
  }
};

const getProductsWithQuery = async (req: Request, res: Response) => {
  try {
    const id = req.params.id;
    if (!id) {
      res.status(400).send("Your request body lack of id");
      return;
    }
    const product: Product = await productQuery.getProductsWithQuery(id);
    res.json(product);
  } catch (err) {
    res.status(500).json(err);
  }
};

const createNewAProduct = async (req: Request, res: Response) => {
  try {
    const name = req.body.name;
    const price = req.body.price;
    if (!name || !price) {
      res.status(400).send("Your request body lack of name or price");
      return;
    }
    const product: Product = await productQuery.createNewAProduct({ name, price });
    res.json(product);
  } catch (err) {
    res.status(500).json(err);
  }
};

const updateForAProduct = async (req: Request, res: Response) => {
  try {
    const name = req.body.name;
    const price = req.body.price;
    const id = +req.params.id;
    if (!name || !price || !id) {
      res.status(400).send("Your request body lack of name or price or id");
      return;
    }
    const product: Product = await productQuery.updateForAProduct({ id, name, price });
    res.json(product);
  } catch (err) {
    res.status(500).json(err);
  }
};

const deleteAProduct = async (req: Request, res: Response) => {
  try {
    const id = req.params.id;
    if (!id) {
      res.status(400).send("Your request body lack of id");
      return;
    }
    const product: Product = await productQuery.deleteAProduct(id);
    res.json(product);
  } catch (err) {
    res.status(500).json(err);
  }
};

export default function handlerRouteForProduct(app: Application) {
  app.get("/products", getAllProducts);
  app.get("/products/:id", getProductsWithQuery);
  app.post("/products", verifyUserToken, createNewAProduct);
  app.put("/products/:id", verifyUserToken, updateForAProduct);
  app.delete("/products/:id", verifyUserToken, deleteAProduct);
}
