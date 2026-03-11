import { axiosPrivate } from "src/api/axios";
import compressImage from "src/utils/CompressImage";

export const uploadImagesService = async (files: File[], type: string) => {
  const form = new FormData();
  form.append("type", type);

  // 🔹 Compress all images here
  const compressedFiles = await Promise.all(
    files.map((file) => compressImage(file)),
  );
  compressedFiles.forEach((file) => form.append("files", file));

  const res = await axiosPrivate.post("/uploads", form, {
    headers: { "Content-Type": "multipart/form-data" },
  });

  return res.data;
};

export const getUserUploadsService = async (
  page: number,
  limit: number,
  userId?: string,
  used?: boolean,
  type?: string | string[],
) => {
  const res = await axiosPrivate.get("/uploads", {
    params: {
      page,
      limit,
      ...(userId && { userId }),
      ...(type && { type }),
      ...(used !== undefined && { used }),
    },
    paramsSerializer: {
      indexes: null,
    },
  });

  return res.data;
};

export const deleteUploadService = async (uploadId: string) => {
  const res = await axiosPrivate.delete(`/uploads/${uploadId}`);

  return res.data;
};
