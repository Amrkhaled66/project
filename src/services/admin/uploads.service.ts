import { axiosAdmin } from "src/api/axios";
import compressImage from "src/utils/CompressImage";

export const uploadImagesService = async (
  type: string,
  files: File[],
  userId?: string,
) => {
  // 🔹 Compress all images here
  const compressedFiles = await Promise.all(
    files.map((file) => compressImage(file)),
  );

  const form = new FormData();
  form.append("type", type);
  compressedFiles.forEach((file) => form.append("files", file));

  if (userId) {
    form.append("userId", userId);
  }

  const res = await axiosAdmin.post("/uploads", form, {
    headers: { "Content-Type": "multipart/form-data" },
  });

  return res.data;
};

export const getUserUploadsService = async (
  page: number,
  limit: number,
  userId?: string,
  type?: string,
) => {
  const res = await axiosAdmin.get("/uploads", {
    params: {
      page,
      limit,
      ...(userId && { userId }),
      ...(type && { type }),
    },
  });

  return res.data;
};

export const deleteUploadService = async (id: string, userId?: string) => {
  const res = await axiosAdmin.delete(`/uploads/${id}`, {
    params: {
      ...(userId && { userId }),
    },
  });

  return res.data;
};
