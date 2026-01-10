import { useQuery, useQueryClient, useMutation } from "@tanstack/react-query";
import {
  getAdminOrders,
  getAdminOrderById,
  AdminOrderListParams,
  updateOrder,
} from "src/services/admin/orders.service";
import Toast from "src/components/ui/Toast";

export const useAdminOrders = (params: AdminOrderListParams) => {
  return useQuery({
    queryKey: ["admin-orders", params],
    queryFn: () => getAdminOrders(params),
    staleTime: 1000 * 30, 
  });
};

export const useAdminOrderDetails = (orderId?: string) => {
  return useQuery({
    queryKey: ["admin-order-details", orderId],
    queryFn: () => {
      if (!orderId) throw new Error("Order ID is required");
      return getAdminOrderById(orderId);
    },
    enabled: !!orderId,
    staleTime: 1000 * 60 * 5,
  });
};

export const useUpdateOrder = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ orderId, payload }: { orderId: string; payload: any }) =>
      updateOrder(orderId, payload),

    onSuccess: (_, { orderId }) => {
      Toast("Order updated successfully", "success");

      queryClient.invalidateQueries({ queryKey: ["order", orderId] });
      queryClient.invalidateQueries({ queryKey: ["latest-order"] });
    },

    onError: (error: any) => {
      const message =
        error?.response?.data?.message || "Failed to update order";

      Toast(message, "error");
    },
  });
};
