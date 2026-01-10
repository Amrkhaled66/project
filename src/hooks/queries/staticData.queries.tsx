import { useQuery } from "@tanstack/react-query";
import { getOrderStatuses, getStates } from "src/services/staticData.services";

export const useOrderStatuses = () =>
  useQuery({
    queryKey: ["order-statuses"],
    queryFn: getOrderStatuses,
    staleTime: Infinity,     
  });

export const useStates = () =>
  useQuery({
    queryKey: ["us-states"],
    queryFn: getStates,
    staleTime: Infinity,
  });
