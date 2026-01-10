import { OrderStatus } from "src/types/adminOrder.types";

export const ORDER_STATUS_OPTIONS: {
  label: string;
  value: OrderStatus;
}[] = [
  { label: "Pending", value: "PENDING" },
  { label: "Paid", value: "PAID" },
  { label: "Shipped", value: "SHIPPED" },
  { label: "Delivered", value: "DELIVERED" },
  { label: "Cancelled", value: "CANCELLED" },
];