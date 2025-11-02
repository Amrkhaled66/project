import API from "src/api/axios";

export const signupHandler = async (values: {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
}) => {
  const { data } = await API.post("/auth/register", values);
  return data;
};

export const loginHandler = async (values: {
  email: string;
  password: string;
}) => {
  const { data } = await API.post("/auth/login", values);
  return data;
};
