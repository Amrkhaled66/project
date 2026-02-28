import { useMutation, useQuery } from "@tanstack/react-query";
import { BlanketSizeId } from "src/data/blanketSizes";
import {
  adminCreateDesignService,
  getAdminDesigns,
  AdminDesignListParams,
  AdminCreateDesignByEmailInput as AdminCreateDesignPayload,
} from "src/services/admin/design.service";

export type AdminCreateDesignByEmailInput = {
  email: string;
  name: string;
  startingSize: BlanketSizeId;
};

export const useAdminCreateDesignMutation = () => {
  return useMutation({
    mutationFn: async ({
      email,
      name,
      startingSize,
    }: AdminCreateDesignByEmailInput) => {
      return adminCreateDesignService({
        email,
        name,
        startingSize,
      } as AdminCreateDesignPayload);
    },
  });
};

export const useAdminDesigns = (params: AdminDesignListParams) => {
  return useQuery({
    queryKey: ["admin-designs", params],
    queryFn: () => getAdminDesigns(params),
    staleTime: 1000 * 30,
  });
};
