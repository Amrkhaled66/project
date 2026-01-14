import axios, { axiosAdmin } from "src/api/axios";
import { AuthResponse, Admin, AdminRole } from "src/types/admin.types";
import {User} from "src/types/User";
export interface RegisterAdminDTO {
  fullName: string;
  email: string;
  password: string;
  role?: AdminRole;
}

export interface LoginAdminDTO {
  email: string;
  password: string;
}

type LoginAsUserPayload = {
  email: string;
};

type LoginAsUserResponse = {
  user: User
  token: string;
};

export const AdminAuthService = {
  // 🔓 Public
  async login(data: LoginAdminDTO): Promise<AuthResponse> {
    const res = await axios.post<AuthResponse>("/admin/login", data);
    return res.data;
  },

  // 🔐 SUPER_ADMIN only
  async register(data: RegisterAdminDTO): Promise<AuthResponse> {
    const res = await axiosAdmin.post<AuthResponse>("/register", data);
    return res.data;
  },

  // 🔐 Token required
  async loginAsUser(payload: LoginAsUserPayload): Promise<LoginAsUserResponse> {
    const { data } = await axiosAdmin.post<LoginAsUserResponse>(
      "/login-as-user",
      payload,
    );
    return data;
  },
};
