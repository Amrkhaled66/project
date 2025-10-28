// src/services/auth.ts
import Cookies from "js-cookie";

// --- Constants ------------------------------------------------------------
const USER_TOKEN_KEY = "token";
const ADMIN_TOKEN_KEY = "adminToken";

// --- Types ---------------------------------------------------------------
export interface User {
  id: string | number;
  name?: string;
  email?: string;
  // add other fields you expect
  [key: string]: any;
}

export interface Admin {
  id: string | number;
  name?: string;
  email?: string;
  [key: string]: any;
}

export interface LoginData {
  user: User;
  accessToken: string;
}

export interface AdminLoginData {
  admin: Admin;
  adminToken: string;
}

// --- User localStorage helpers -------------------------------------------

export const setUser = (user: User): void => {
  localStorage.setItem("user", JSON.stringify(user));
};

export const getUser = (): User | null => {
  const stored = localStorage.getItem("user");
  return stored ? (JSON.parse(stored) as User) : null;
};

export const clearUser = (): void => {
  localStorage.removeItem("user");
};

// --- User token helpers --------------------------------------------------

export const setToken = (token: string): void => {
  Cookies.set(USER_TOKEN_KEY, token, { secure: true, sameSite: "Strict" });
};

export const getToken = (): string | undefined => {
  return Cookies.get(USER_TOKEN_KEY);
};

export const clearToken = (): void => {
  Cookies.remove(USER_TOKEN_KEY);
};

// --- Admin localStorage helpers ------------------------------------------

export const setAdmin = (admin: Admin): void => {
  localStorage.setItem("admin", JSON.stringify(admin));
};

export const getAdmin = (): Admin | null => {
  const stored = localStorage.getItem("admin");
  return stored ? (JSON.parse(stored) as Admin) : null;
};

export const clearAdmin = (): void => {
  localStorage.removeItem("admin");
};

// --- Admin token helpers -------------------------------------------------

export const setAdminToken = (token: string): void => {
  Cookies.set(ADMIN_TOKEN_KEY, token, { secure: true, sameSite: "Strict" });
};

export const getAdminToken = (): string | undefined => {
  return Cookies.get(ADMIN_TOKEN_KEY);
};

export const clearAdminToken = (): void => {
  Cookies.remove(ADMIN_TOKEN_KEY);
};

// --- Auth logic ----------------------------------------------------------

export const isAuth = (): boolean => !!getToken();

export const login = (data: LoginData): void => {
  setUser(data.user);
  setToken(data.accessToken);
};

export const logout = (): void => {
  clearToken();
  clearUser();
};

export const loginAdmin = (data: AdminLoginData): void => {
  setAdmin(data.admin);
  setAdminToken(data.adminToken);
};

export const logoutAdmin = (): void => {
  clearAdmin();
  clearAdminToken();
};
