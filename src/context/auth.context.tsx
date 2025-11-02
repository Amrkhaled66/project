import { createContext, useContext, useState, ReactNode } from "react";
import {
  setToken,
  clearToken,
  getToken,
  setUser,
  clearUser,
  getUser
} from "src/utils/authStorage";
import type { User } from "src/types/User";
import { useCart } from "./cart.context";
type AuthData = {
  user: User | null;
  token: string | null;
};

type AuthContextType = {
  authData: AuthData;
  login: (user: User, token: string) => void;
  logout: () => void;
  isAuthenticated: boolean;
  updateUser: (user: User) => void;
};

const AuthContext = createContext<AuthContextType>({
  authData: { user: null, token: null },
  login: () => {},
  logout: () => {},
  isAuthenticated: false,
  updateUser: (user) => {},
});

export default function AuthProvider({ children }: { children: ReactNode }) {
  const { clearCart } = useCart();
  const [authData, setAuthData] = useState<AuthData>(() => {
    const token = getToken();
    const user = getUser();
    return {
      user,
      token,
    };
  });
  const updateUser = (user: User) => {
    setAuthData((prev) => ({ ...prev, user }));
    setUser(user);
  };

  const login = (user: User, token: string) => {
    setAuthData({ user, token });
    setToken(token);
    setUser(user);
  };
  const logout = () => {
    setAuthData({ user: null, token: null });
    clearToken();
    clearUser();
    clearCart();
  };
  const isAuthenticated = !!authData.token;

  const contextValue = {
    authData,
    login,
    logout,
    isAuthenticated,
    updateUser,
  };

  return (
    <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>
  );
}

const useAuth = () => {
  const context = useContext(AuthContext);
  return context;
};

export { useAuth };
