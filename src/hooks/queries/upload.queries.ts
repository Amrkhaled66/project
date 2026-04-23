import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  uploadService,
  getUserUploadsService,
  deleteUploadService,
} from "src/services/upload.service";
import Toast from "src/components/ui/Toast";

/* ===============================
   Types
================================ */

type UploadType = string | string[];

interface UseUploadsParams {
  type?: UploadType;
  used?: boolean;
  page: number;
  limit: number;
  enabled?: boolean;
}

/* ===============================
   Query Keys
================================ */

const uploadsKeys = {
  all: ["uploads"] as const,

  lists: () => [...uploadsKeys.all, "list"] as const,

  list: (params: UseUploadsParams) =>
    [
      ...uploadsKeys.lists(),
      params.type
        ? Array.isArray(params.type)
          ? [...params.type].sort().join("-")
          : params.type
        : "all",
      params.used ?? "all",
      params.page,
      params.limit,
    ] as const,
};

/* ===============================
   Get User Uploads
================================ */

export const useUserUploads = ({
  type,
  used,
  page,
  limit,
  enabled = true,
}: UseUploadsParams) => {
  return useQuery({
    queryKey: uploadsKeys.list({ type, used, page, limit }),

    queryFn: () => getUserUploadsService(page, limit, undefined, used, type),
    staleTime: 0,
    enabled,
  });
};

/* ===============================
   Upload Images
================================ */

export const useUploadMyImages = () => {
  const qc = useQueryClient();

  return useMutation({
    mutationFn: ({
      files,
      type,
      extraData,
    }: {
      files: File[];
      type: string;
      extraData?: any;
    }) => uploadService({ files, type, extraData }),

    onSuccess: () => {
      Toast("Uploaded successfully!", "success", "#ecfdf5", "top");

      qc.invalidateQueries({
        queryKey: uploadsKeys.all,
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
    mutationFn: ({
      uploadId,
      type,
    }: {
      uploadId: string;
      type: string | string[];
    }) => deleteUploadService(uploadId),

    onSuccess: (_, { type }) => {
      Toast("Deleted successfully!", "success", "#ecfdf5", "top");

      // handle multiple types
      const types = Array.isArray(type) ? type : [type];

      types.forEach((t) => {
        qc.invalidateQueries({
          queryKey: ["uploads", "list", t],
          exact: false,
        });
      });
    },

    onError: (err: any) => {
      Toast(err?.message || "Failed to delete item", "error", "#fee2e2", "top");
    },
  });
};
