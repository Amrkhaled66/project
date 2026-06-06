import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

import { useAuth } from "src/context/auth.context";
import type { DirtySection } from "src/types/desgin/editor.types";
import { DesignService } from "src/services/design.service";
import type { Design, DesignData } from "src/types/design.types";

export const useDesigns = () => {
  const {
    authData: { user },
  } = useAuth();

  return useQuery<Design[]>({
    queryKey: ["designs", user?.email],
    queryFn: () => DesignService.getAll(),
  });
};

export const useDesign = (id?: string) => {
  return useQuery<Design>({
    queryKey: ["design", id],
    queryFn: () => DesignService.getById(id!),
    enabled: !!id,
    staleTime: 5 * 60 * 1000,
    refetchOnMount: false,
    refetchOnWindowFocus: false,
  });
};

export const useUpdateDesign = () => {
  return useMutation<
    { success: boolean; price: number },
    Error,
    {
      id: string;
      payload: {
        name?: string;
        designData?: Partial<DesignData>;
      };
      dirtySections?: DirtySection[];
      preview?: Blob | null;
    }
  >({
    mutationFn: ({ id, payload, preview }) =>
      DesignService.update(id, payload, preview ?? null),
  });
};

export const useDeleteDesign = () => {
  const queryClient = useQueryClient();

  return useMutation<{ success: boolean }, Error, string>({
    mutationFn: (id: string) => DesignService.delete(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["designs"] });
    },
  });
};

export const useLatestDesign = () => {
  return useQuery({
    queryKey: ["latestDesign"],
    queryFn: () => DesignService.getLatest(),
  });
};
