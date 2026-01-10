import axios, { axiosAdmin } from "src/api/axios";
import { AuthResponse, Admin, AdminRole } from "src/types/admin.types";

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

export const AdminAuthService = {
  // 🔓 Public
  async login(data: LoginAdminDTO): Promise<AuthResponse> {
    const res = await axios.post<AuthResponse>(
      "/admin/login",
      data
    );
    return res.data;
  },

  // 🔐 SUPER_ADMIN only
  async register(data: RegisterAdminDTO): Promise<AuthResponse> {
    const res = await axiosAdmin.post<AuthResponse>(
      "/admin/register",
      data
    );
    return res.data;
  },

  // 🔐 Token required
  async me(): Promise<Admin> {
    const res = await axiosAdmin.get<{ admin: Admin }>(
      "/admin/me"
    );
    return res.data.admin;
  },
};
