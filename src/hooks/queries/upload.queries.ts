import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  uploadImagesService,
  getUserUploadsService,
  deleteUploadService,
} from "src/services/upload.service";
import Toast from "src/components/ui/Toast";

export const useMyUploads = (page: number, limit: number) => {
  return useQuery({
    queryKey: ["uploads", "me", page, limit],
    queryFn: () => getUserUploadsService(page, limit),
  });
};

export const useMyCustomPanels = (page: number, limit: number) => {
  return useQuery({
    queryKey: ["custom-panels", "me", page, limit],
    queryFn: () => getUserUploadsService(1, 100, undefined, "CUSTOME_PANAEL"),
  });
};

export const useUploadMyImages = () => {
  const qc = useQueryClient();

  return useMutation({
    mutationFn: ({ files, type }: { files: File[]; type: string }) =>
      uploadImagesService(files, type),

    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["uploads"] });
      qc.invalidateQueries({ queryKey: ["custom-panels"] });
    },
  });
};



export const useDeleteMyUpload = () => {
  const qc = useQueryClient();

  return useMutation({
    mutationFn: (uploadId: string) => deleteUploadService(uploadId),

    onSuccess: () => {
      Toast(
        "Deleted successfully!",
        "success",
        "#ecfdf5",
        "top",
      );

      // refresh uploads & custom panels
      qc.invalidateQueries({ queryKey: ["uploads", "me"] });
      qc.invalidateQueries({ queryKey: ["custom-panels"] });
    },

    onError: (err: any) => {
      Toast(
        err?.message || "Failed to delete item",
        "error",
        "#fee2e2",
        "top",
      );
    },
  });
};
