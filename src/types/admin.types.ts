export type AdminRole = "SUPER_ADMIN" | "ADMIN" | "MODERATOR";

export interface Admin {
  id: string;
  fullName: string;
  email: string;
  role: AdminRole;
}

export interface AuthResponse {
  token: string;
  admin: Admin;
}
