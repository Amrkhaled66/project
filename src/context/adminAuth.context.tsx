import {
  createContext,
  useContext,
  useEffect,
  useState,
  ReactNode,
} from "react";

import {
  setAdminToken,
  setAdmin,
  getAdmin,
  clearAdmin,
  getAdminToken,
  clearAdminToken,
} from "src/utils/authStorage";

import { Admin, AuthResponse } from "src/types/admin.types";

/* -------------------------------------------------------------------------- */
/* Types                                                                      */
/* -------------------------------------------------------------------------- */
interface AdminContextType {
  adminData: AuthResponse | null;
  adminLogin: (data: AuthResponse) => void;
  adminLogout: () => void;
  isAdmin: boolean;
  admin: Admin | null;
}

/* -------------------------------------------------------------------------- */
/* Context                                                                    */
/* -------------------------------------------------------------------------- */
export const AdminContext = createContext<AdminContextType | undefined>(
  undefined,
);

interface Props {
  children: ReactNode;
}

/* -------------------------------------------------------------------------- */
/* Provider                                                                   */
/* -------------------------------------------------------------------------- */
export function AdminContextProvider({ children }: Props) {
  const [adminData, setAdminData] = useState<AuthResponse | null>(() => {
    const token = getAdminToken();
    const admin = getAdmin();
    if (!token) {
      return null;
    }
    return {
      token,
      admin,
    };
  });

  /* ------------------------------- Login ---------------------------------- */
  const adminLogin = (data: AuthResponse) => {
    setAdminToken(data.token);
    setAdmin(data.admin);
    setAdminData(data);
  };

  /* ------------------------------- Logout --------------------------------- */
  const adminLogout = () => {
    clearAdmin();
    clearAdminToken();
    setAdminData(null);
  };

  const isAdmin = adminData?.token ? true : false;


  /* ------------------------------- Value ---------------------------------- */
  const value: AdminContextType = {
    adminData,
    adminLogin,
    adminLogout,
    isAdmin,
    admin: adminData?.admin ?? null,
  };

  return (
    <AdminContext.Provider value={value}>{children}</AdminContext.Provider>
  );
}

/* -------------------------------------------------------------------------- */
/* Hook                                                                       */
/* -------------------------------------------------------------------------- */
export function useAdminContext() {
  const ctx = useContext(AdminContext);
  if (!ctx) {
    throw new Error("useAdminContext must be used within AdminContextProvider");
  }
  return ctx;
}
