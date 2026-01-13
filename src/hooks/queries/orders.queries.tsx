import { useMutation, useQuery } from "@tanstack/react-query";
import {
  createOrderService,
  getLatestThreeOrdersService,
  getLatestOrderService,
  getShippingOrderService,
} from "src/services/orderServices";

import { CreateOrderPayload } from "src/types/Order";

export const useCreateOrder = () => {
  return useMutation({
    mutationFn: (payload: CreateOrderPayload) =>
      createOrderService(payload),
  });
};


export const useLatestThreeOrders = () => {
  return useQuery({
    queryKey: ["latest3"],
    queryFn: async () => {
      const data = await getLatestThreeOrdersService();

      return data.data;
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
