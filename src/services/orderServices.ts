import { axiosPrivate } from "src/api/axios";
import { CreateOrderPayload } from "src/types/Order";

// ------------------------
// Create New Order
// ------------------------
export const createOrderService = async (orderData: CreateOrderPayload) => {
  const { data } = await axiosPrivate.post("/orders", orderData);
  return data;
};

// ------------------------
// Get Latest 3 Orders
// ------------------------
export const getLatestThreeOrdersService = async () => {
  const { data } = await axiosPrivate.get("/orders/latest3");
  return data;
};

// ------------------------
// Get Latest Order (most recent)
// ------------------------
export const getLatestOrderService = async () => {
  const { data } = await axiosPrivate.get("/orders/latest");
  return data;
};

// ------------------------
// Get Active Shipping Order
// (status === "processing" or "shipped")
// ------------------------
export const getShippingOrderService = async () => {
  const { data } = await axiosPrivate.get("/orders/shipping");
  return data;
};
