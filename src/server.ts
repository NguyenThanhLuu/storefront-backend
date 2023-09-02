import express, { Application, Request, Response } from "express";
import bodyParser from "body-parser";
import path from "path";

import handlerRouteForProduct from "./controllers/product";
import handlerRouteForUser from "./controllers/user";
import handlerRouteForOrder from "./controllers/order";

const app: Application = express();

let port = 3000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", (req: Request, res: Response) => {
  res.sendFile(path.join(__dirname, "../index.html"));
});

handlerRouteForProduct(app);
handlerRouteForUser(app);
handlerRouteForOrder(app);

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});

export default app;
