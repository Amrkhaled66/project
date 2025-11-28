import axios,{axiosPrivate} from "src/api/axios";

export const updateUserProfileService = async (values: {
  firstName?: string;
  lastName?: string;
  phone?: string;
  password?: string;
}) => {
  const { data } = await axiosPrivate.patch("/profile", values);
  return data;
};
