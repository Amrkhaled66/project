import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  uploadImagesService,
  getUserUploadsService,
  deleteUploadService,
} from "src/services/upload.service";

export const useUploads = (page: number, limit: number) => {
  return useQuery({
    queryKey: ["uploads", page, limit],
    queryFn: () => getUserUploadsService(page, limit),
  });
};

export const useUploadImages = () => {
  const qc = useQueryClient();

  return useMutation({
    mutationFn: (files: File[]) => uploadImagesService(files),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["uploads"] });
    },
  });
};

export const useDeleteUpload = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteUploadService,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["uploads"] });
    },
  });
};
