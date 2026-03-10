import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  uploadImagesService,
  getUserUnusedUploadsService,
  deleteUploadService,
  getUserUploadsService,
} from "src/services/upload.service";
import Toast from "src/components/ui/Toast";
import { panels } from "src/utils/defaultSettings";

/* ===============================
   Get All User Uploads
================================ */

export const useGetAllUploads = (page: number, limit: number) => {
  return useQuery({
    queryKey: ["uploads", panels.panel.key, "all", page, limit],
    queryFn: () => getUserUploadsService(page, limit),
  });
};

/* ===============================
   Get Unused Uploads
================================ */

export const useMyUploads = (page: number, limit: number) => {
  return useQuery({
    queryKey: ["uploads", panels.panel.key, "unused", page, limit],
    queryFn: () => getUserUnusedUploadsService(page, limit),
  });
};

/* ===============================
   Custom Panels
================================ */

export const useMyCustomPanels = (page: number, limit: number) => {
  return useQuery({
    queryKey: ["uploads", panels.custome_panel.key, "custom", page, limit],
    queryFn: () =>
      getUserUnusedUploadsService(
        page,
        limit,
        undefined,
        panels.custome_panel.key,
      ),
  });
};

/* ===============================
   Corners
================================ */

export const useMyCorners = (page: number, limit: number) => {
  return useQuery({
    queryKey: ["uploads", panels.corner.key, "corner", page, limit],
    queryFn: () =>
      getUserUnusedUploadsService(page, limit, undefined, panels.corner.key),
  });
};

/* ===============================
   Upload Images
================================ */

export const useUploadMyImages = () => {
  const qc = useQueryClient();

  return useMutation({
    mutationFn: ({ files, type }: { files: File[]; type: string }) =>
      uploadImagesService(files, type),

    onSuccess: (_, { type }) => {
      Toast("Uploaded successfully!", "success", "#ecfdf5", "top");

      qc.invalidateQueries({
        queryKey: ["uploads", type],
      });
    },

    onError: (err: any) => {
      Toast(err?.message || "Upload failed", "error", "#fee2e2", "top");
    },
  });
};

/* ===============================
   Delete Upload
================================ */

export const useDeleteMyUpload = () => {
  const qc = useQueryClient();

  return useMutation({
    mutationFn: ({ uploadId, type }: { uploadId: string; type: string }) =>
      deleteUploadService(uploadId),

    onSuccess: (_, { type }) => {
      Toast("Deleted successfully!", "success", "#ecfdf5", "top");

      console.log(type);
      qc.invalidateQueries({
        queryKey: ["uploads", type],
      });
    },

    onError: (err: any) => {
      Toast(err?.message || "Failed to delete item", "error", "#fee2e2", "top");
    },
  });
};
