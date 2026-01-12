import { axiosAdmin } from "src/api/axios";

export const uploadImagesService = async (
  files: File[],
  userId?: string
) => {
  const form = new FormData();
  files.forEach((file) => form.append("files", file));

  if (userId) {
    form.append("userId", userId); // admin only
  }

  const res = await axiosAdmin.post("/uploads", form, {
    headers: { "Content-Type": "multipart/form-data" },
  });

  return res.data;
};

export const getUserUploadsService = async (
  page: number,
  limit: number,
  userId?: string
) => {
  const res = await axiosAdmin.get("/uploads", {
    params: {
      page,
      limit,
      ...(userId && { userId }),
    },
  });

  return res.data;
};

export const deleteUploadService = async (
  id: string,
  userId?: string
) => {
  const res = await axiosAdmin.delete(`/uploads/${id}`, {
    params: {
      ...(userId && { userId }),
    },
  });

  return res.data;
};
