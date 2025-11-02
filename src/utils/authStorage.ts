import { getItem, setItem, removeItem } from "src/utils/localStorage";
import { User, UserRegister } from "src/types/User";

const setUser = (user: User) => setItem("user", user);
const setToken = (token: string) => setItem("token", token);
const clearToken = () => removeItem("token");
const clearUser = () => removeItem("user");
const getToken = (): string | null => getItem("token");
const getUser = (): UserRegister | null => getItem("user");
const isAuth = !!getToken();
export { setUser, setToken, clearToken, clearUser, getToken, getUser, isAuth };
