import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { BlanketSizeId } from "src/data/blanketSizes";
import {
  adminCreateDesignService,
  adminDeleteDesignService,
  getAdminDesigns,
  AdminDesignListParams,
  AdminCreateDesignByEmailInput as AdminCreateDesignPayload,
} from "src/services/admin/design.service";
import Toast from "src/components/ui/Toast";

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

export const useAdminDeleteDesignMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ designId, note }: { designId: string; note: string }) =>
      adminDeleteDesignService(designId, note),

    onSuccess: () => {
      Toast("Design deleted successfully", "success", "#ecfdf5", "top");
      queryClient.invalidateQueries({ queryKey: ["admin-designs"] });
    },

    onError: (error: any) => {
      Toast(
        error?.response?.data?.message || "Failed to delete design",
        "error",
        "#fee2e2",
        "top",
      );
    },
  });
};
