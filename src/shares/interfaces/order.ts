import { OrderProduct } from "./orderProduct";

export interface Order {
  id?: number;
  user_id: number;
  status: string;
  products: OrderProduct[];
}
