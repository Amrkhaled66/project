import { axiosAdmin } from "src/api/axios";

export const getAdminUserOverviewByEmailService = async (
  email: string
) => {
  const res = await axiosAdmin.get("/user", {
    params: { email },
  });

  return res.data;
};
