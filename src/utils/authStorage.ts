import { getItem, setItem, removeItem } from "src/utils/localStorage";
import { User, UserRegister } from "src/types/User";

const setUser = (user: User) => setItem("user", user);
const setToken = (token: string) => setItem("token", token);
const clearToken = () => removeItem("token");
const clearUser = () => removeItem("user");
const getToken = (): string | null => getItem("token");
const getUser = (): UserRegister | null => getItem("user");
const isAuth = !!getToken();

// Admin

const setAdminToken = (token: string) => setItem("admin_token", token);
const setAdmin = (admin: any) => setItem("admin", admin);
const clearAdminToken = () => removeItem("admin_token");
const clearAdmin = () => removeItem("admin");
const getAdminToken = (): string | null => getItem("admin_token");
const getAdmin = (): any => getItem("admin");

const isAdmin = !!getAdminToken();

export {
  setUser,
  setToken,
  clearToken,
  clearUser,
  getToken,
  getUser,
  isAuth,
  setAdminToken,
  setAdmin,
  clearAdmin,
  getAdminToken,
  getAdmin,
  isAdmin,
  clearAdminToken
};
