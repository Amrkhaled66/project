import { axiosAdmin } from "src/api/axios";

export const getAdminUserOverviewByEmailService = async (
  email: string
) => {
  const res = await axiosAdmin.get("/user", {
    params: { email },
  });

  return res.data;
};



export const AdminCreateUserService = async (data: any) => {
  const res = await axiosAdmin.post("/user", data);
  return res.data;
};