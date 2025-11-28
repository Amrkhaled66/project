import { useMutation, useQuery } from "@tanstack/react-query";
import {
  createOrderService,
  getLatestThreeOrdersService,
  getLatestOrderService,
  getShippingOrderService,
} from "src/services/orderServices";

export const useCreateOrder = () => {
  return useMutation({
    mutationFn: (orderData: {
      totalPrice: number;
      cartSnapshot: any;
      designImage?: string | null;
    }) => createOrderService(orderData),
  });
};

export const useLatestThreeOrders = () => {
  return useQuery({
    queryKey: ["orders", "latest3"],
    queryFn: async () => {
      const data = await getLatestThreeOrdersService();

      return data.map((order: any) => ({
        ...order,
        cartSnapshot:
          typeof order.cartSnapshot === "string"
            ? JSON.parse(order.cartSnapshot)
            : order.cartSnapshot,
      }));
    },
  });
};

export const useLatestOrder = () => {
  return useQuery({
    queryKey: ["orders", "latest"],
    queryFn: getLatestOrderService,
  });
};

export const useShippingOrder = () => {
  return useQuery({
    queryKey: ["orders", "shipping"],
    queryFn: getShippingOrderService,
  });
};
