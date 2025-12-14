import {axiosPrivate} from "src/api/axios"; // your axios instance

export const uploadImagesService = async (files: File[]) => {
  const form = new FormData();
  files.forEach(file => form.append("files", file));
for (let entry of form.entries()) {
}

const res = await axiosPrivate.post("/uploads", form);
  return res.data;
};



export const getUserUploadsService = async (
  page: number,
  limit: number
) => {
  const res = await axiosPrivate.get("/uploads", {
    params: { page, limit },
  });

  return res.data;
};

export const deleteUploadService = async (id: string) => {
  const res = await axiosPrivate.delete(`/uploads/${id}`);
  return res.data;
};
