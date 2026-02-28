import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { DesignService } from "src/services/design.service";
import { Design, DesignData } from "src/types/design.types";

/* -------------------------------------------------------------------------- */
/* GET ALL DESIGNS                                                             */
/* -------------------------------------------------------------------------- */
export const useDesigns = () => {
  return useQuery<Design[]>({
    queryKey: ["designs"],
    queryFn: () => DesignService.getAll(),
  });
};

/* -------------------------------------------------------------------------- */
/* GET ONE DESIGN (EDITOR PAGE)                                                */
/* -------------------------------------------------------------------------- */
export const useDesign = (id?: string) => {
  return useQuery<Design>({
    queryKey: ["design", id],
    queryFn: () => DesignService.getById(id!),
    enabled: !!id,

    staleTime: 0, // always stale → always refetch
    refetchOnMount: true, // refetch every time component mounts
    refetchOnWindowFocus: true,
  });
};

/* -------------------------------------------------------------------------- */
/* UPDATE DESIGN (AUTO-SAVE JSON ONLY)                                         */
/* -------------------------------------------------------------------------- */
export const useUpdateDesign = () => {
  const queryClient = useQueryClient();

  return useMutation<
    { success: boolean; price: number },
    Error,
    {
      id: string;
      payload: {
        name?: string;
        designData?: Partial<DesignData>;
      };
      preview?: Blob | null;
    }
  >({
    mutationFn: ({ id, payload, preview }) =>
      DesignService.update(id, payload, preview ?? null),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({
        queryKey: ["design", variables.id],
      });
    },
  });
};

/* -------------------------------------------------------------------------- */
/* DELETE DESIGN                                                              */
/* -------------------------------------------------------------------------- */
export const useDeleteDesign = () => {
  const queryClient = useQueryClient();

  return useMutation<{ success: boolean }, Error, string>({
    mutationFn: (id: string) => DesignService.delete(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["designs"] });
    },
  });
};

/* -------------------------------------------------------------------------- */
/* GET LATEST DESIGN                                                           */
/* -------------------------------------------------------------------------- */
export const useLatestDesign = () => {
  return useQuery({
    queryKey: ["latestDesign"],
    queryFn: () => DesignService.getLatest(),
  });
};
