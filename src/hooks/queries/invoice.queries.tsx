import { axiosPrivate } from "src/api/axios";
import { useMutation } from "@tanstack/react-query";
import { CreateOrderPayload } from "src/types/Order";

export const useCreateInvoice = () => {
  return useMutation({
    mutationFn: (payload: CreateOrderPayload) =>
      axiosPrivate.post("/invoices", payload).then((res) => res.data),
  });
};
