import { axiosPrivate } from "src/api/axios";

export const uploadImagesService = async (files: File[], type: string) => {
  const form = new FormData();
  files.forEach((file) => form.append("files", file));
  form.append("type", type);

  const res = await axiosPrivate.post("/uploads", form, {
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
  const res = await axiosPrivate.get("/uploads", {
    params: {
      page,
      limit,
      ...(userId && { userId }),
      type:type,
    },
  });

  return res.data;
};

export const deleteUploadService = async (
  uploadId: string,
  userId?: string,
) => {
  const res = await axiosPrivate.delete(`/uploads/${uploadId}`);

  return res.data;
};
