import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  uploadImagesService,
  getUserUploadsService,
  deleteUploadService,
} from "src/services/upload.service";

export const useUploads = () => {
  return useQuery({
    queryKey: ["uploads"],
    queryFn: getUserUploadsService,
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
