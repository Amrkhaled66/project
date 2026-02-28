import API, { axiosPrivate } from "src/api/axios";
import { User } from "src/types/User";

type AuthUser = {
  id: string;
  name: string;
  email: string;
  phone?: string;
};

type AuthResponse = {
  message: string;
  user: User;
  token: string;
};

const normalizeUser = (user: AuthUser): User => {
  return {
    name: user.name,
    email: user.email,
    phone: user.phone || "",
  };
};

export const signupHandler = async (values: {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
}) => {
  const payload = {
    name: `${values.firstName} ${values.lastName}`.trim(),
    email: values.email,
    password: values.password,
  };

  const { data } = await API.post("/auth/register", payload);
  return {
    ...data,
    user: normalizeUser(data.user as AuthUser),
  } as AuthResponse;
};

export const loginHandler = async (values: {
  email: string;
  password: string;
}) => {
  const { data } = await API.post("/auth/login", values);
  return {
    ...data,
    user: normalizeUser(data.user as AuthUser),
  } as AuthResponse;
};

export const setPasswordHandler = async (values: { password: string , token: string}) => {
  const { data } = await axiosPrivate.post("/auth/set-password", values);
  return data as { message: string };
};

export const resendSetupEmailHandler = async (values: { token: string }) => {
  const { data } = await API.post("/auth/setup/resend-email", values);
  return data as { message: string };
};
