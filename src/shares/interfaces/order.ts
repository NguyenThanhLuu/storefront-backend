import { OrderProduct } from "./orderProduct";

export interface Order {
  user_id: number;
  status: string;
  products: OrderProduct[];
}
