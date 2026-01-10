export type OrderStatus =
  | "PENDING"
  | "PAID"
  | "SHIPPED"
  | "DELIVERED"
  | "CANCELLED";

export interface AdminOrder {
  id: string;
  userEmail: string;
  status: OrderStatus;
}
