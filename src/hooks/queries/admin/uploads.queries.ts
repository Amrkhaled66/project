

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  uploadImagesService,
  getUserUploadsService,
  deleteUploadService
} from "src/services/admin/uploads.service";

 

export const useAdminUploads = (
  page: number,
  limit: number,
  userId: string
) => {
  return useQuery({
    queryKey: ["uploads", "admin", userId, page, limit],
    queryFn: () => getUserUploadsService(page, limit, userId),
    enabled: !!userId,
  });
};

export const useAdminUploadImages = (userId: string) => {
  const qc = useQueryClient();

  return useMutation({
    mutationFn: (files: File[]) =>
      uploadImagesService(files, userId),
    onSuccess: () => {
      qc.invalidateQueries({
        queryKey: ["uploads", "admin", userId],
      });
    },
  });
};

export const useAdminDeleteUpload = (userId: string) => {
  const qc = useQueryClient();

  return useMutation({
    mutationFn: (uploadId: string) =>
      deleteUploadService(uploadId, userId),
    onSuccess: () => {
      qc.invalidateQueries({
        queryKey: ["uploads", "admin", userId],
      });
    },
  });
};
