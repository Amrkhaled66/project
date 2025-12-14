import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { DesignService } from "src/services/design.service";
import { Design, DesignData } from "src/types/design.types";

// ------------------------------
// Get all designs
// ------------------------------
export const useDesigns = () => {
  return useQuery<Design[]>({
    queryKey: ["designs"],
    queryFn: () => DesignService.getAll(),
  });
};

// ------------------------------
// Get one design
// ------------------------------
export const useDesign = (id?: string) => {
  return useQuery<Design>({
    queryKey: ["design", id],
    queryFn: () => DesignService.getById(id!),
    enabled: !!id,
  });
};

// ------------------------------
// Create new design
// ------------------------------
export const useCreateDesign = () => {
  return useMutation<{ id: string }, Error, string>({
    mutationFn: (name: string) => DesignService.create(name),
  });
};

// ------------------------------
// Update (auto-save)
// ------------------------------
export const useUpdateDesign = () => {
  return useMutation<
    { message: string },
    Error,
    { id: string; payload: Partial<DesignData> }
  >({
    mutationFn: ({ id, payload }) =>
      DesignService.update(id, { designData: payload as DesignData }),
  });
};

// ------------------------------
// Delete design
// ------------------------------
export const useDeleteDesign = () => {
  const queryClient = useQueryClient();

  return useMutation<{ message: string }, Error, string>({
    mutationFn: (id: string) => DesignService.delete(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["designs"] });
    },
  });
};


// ------------------------------
// Get latest design
// ------------------------------
export const useLatestDesign = () => {
  return useQuery({
    queryKey: ["latestDesign"],
    queryFn: () => DesignService.getLatest(),
  });
};