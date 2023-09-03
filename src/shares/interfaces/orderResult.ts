import { OrderProduct } from "./orderProduct";

export interface OrderResult {
  user_id: number;
  status: string;
  products: OrderProduct[];
}
