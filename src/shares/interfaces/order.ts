export interface Order {
  id?: number | string;
  product_id: number | string;
  user_id: number | string;
  quantity: number;
  status: string;
}
