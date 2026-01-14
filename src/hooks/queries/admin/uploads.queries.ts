import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  uploadImagesService,
  getUserUploadsService,
  deleteUploadService,
} from "src/services/admin/uploads.service";
type IMAGE_TYPE = "panel" | "corner";

export const useAdminUploads = (
  page: number,
  limit: number,
  userId: string,
) => {
  return useQuery({
    queryKey: ["panel", "admin", userId, page, limit],
    queryFn: () => getUserUploadsService(page, limit, userId),
    enabled: !!userId,
  });
};
export const useAdminCorners = (
  page: number,
  limit: number,
  userId: string,
) => {
  return useQuery({
    queryKey: ["corner", "admin", userId, page, limit],
    queryFn: () => getUserUploadsService(page, limit, userId, "CORNER"),
    enabled: !!userId,
  });
};

export const useAdminUploadImages = (userId: string) => {
  const qc = useQueryClient();

  return useMutation({
    mutationFn: ({ files, type }: { files: File[]; type: IMAGE_TYPE }) =>
      uploadImagesService(type, files, userId),

    onSuccess: (_, variables) => {
      const typeKey = variables.type === "corner" ? "corner" : "panel";

      qc.invalidateQueries({
        queryKey: [typeKey, "admin"],
      });
    },
  });
};

export const useAdminDeleteUpload = (userId: string) => {
  const qc = useQueryClient();

  return useMutation({
    mutationFn: (uploadId: string) => deleteUploadService(uploadId, userId),
    onSuccess: () => {
      qc.invalidateQueries({
        queryKey: ["uploads", "admin", userId],
      });
    },
  });
};
