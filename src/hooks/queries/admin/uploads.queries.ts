import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  uploadImagesService,
  getUserUploadsService,
  deleteUploadService,
} from "src/services/admin/uploads.service";
import Toast from "src/components/ui/Toast";
import { panels } from "src/utils/defaultSettings";

/* ===============================
   Admin Panels
================================ */

export const useAdminUploads = (
  page: number,
  limit: number,
  userId: string
) => {
  return useQuery({
    queryKey: ["uploads", panels.panel.key, "admin", userId, page, limit],
    queryFn: () => getUserUploadsService(page, limit, userId),
    enabled: !!userId,
  });
};

/* ===============================
   Admin Corners
================================ */

export const useAdminCorners = (
  page: number,
  limit: number,
  userId: string
) => {
  return useQuery({
    queryKey: ["uploads", panels.corner.key, "admin", userId, page, limit],
    queryFn: () =>
      getUserUploadsService(page, limit, userId, panels.corner.key),
    enabled: !!userId,
  });
};

/* ===============================
   Upload Images (Admin)
================================ */

export const useAdminUploadImages = (userId: string) => {
  const qc = useQueryClient();

  return useMutation({
    mutationFn: ({ files, type }: { files: File[]; type: string }) =>
      uploadImagesService(type, files, userId),

    onSuccess: (_, { type }) => {
      Toast("Uploaded successfully!", "success", "#ecfdf5", "top");

      qc.invalidateQueries({
        queryKey: ["uploads", type, "admin", userId],
      });
    },

    onError: (err: any) => {
      Toast(err?.message || "Upload failed", "error", "#fee2e2", "top");
    },
  });
};

/* ===============================
   Delete Upload (Admin)
================================ */

export const useAdminDeleteUpload = (userId: string) => {
  const qc = useQueryClient();

  return useMutation({
    mutationFn: ({ uploadId, type }: { uploadId: string; type: string }) =>
      deleteUploadService(uploadId, userId),

    onSuccess: (_, { type }) => {
      Toast("Deleted successfully!", "success", "#ecfdf5", "top");

      qc.invalidateQueries({
        queryKey: ["uploads", type, "admin", userId],
      });
    },

    onError: (err: any) => {
      Toast(err?.message || "Failed to delete item", "error", "#fee2e2", "top");
    },
  });
};