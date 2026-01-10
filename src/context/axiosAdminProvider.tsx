import { createContext, useContext, useMemo } from "react";
import { useNavigate } from "react-router-dom";

import Alert from "src/components/ui/Alert";
import { axiosAdmin } from "src/api/axios";
import { getAdminToken } from "src/utils/authStorage";
import { useAdminContext } from "src/context/adminAuth.context";

const AdminAxiosContext = createContext(axiosAdmin);

interface Props {
  children: React.ReactNode;
}

export const AdminAxiosProvider = ({ children }: Props) => {
  const navigate = useNavigate();
  const { adminLogout, isAdmin } = useAdminContext();

  const EndedSessionModal = () =>
    Alert({
      title: "Admin Session Expired",
      text: "Your admin session has expired. Please sign in again.",
      icon: "warning",
      confirmButtonText: "OK",
    });

  useMemo(() => {
    /* ------------------------ Request interceptor ------------------------ */
    const requestInterceptor = axiosAdmin.interceptors.request.use(
      (config) => {
        const token = getAdminToken();

        if (token && !config.headers?.Authorization) {
          config.headers.Authorization = `Bearer ${token}`;
        }

        return config;
      },
      (error) => Promise.reject(error)
    );

    /* ------------------------ Response interceptor ------------------------ */
    const responseInterceptor = axiosAdmin.interceptors.response.use(
      (response) => response,
      async (error) => {
        if (error?.response?.status === 401 && isAdmin) {
          adminLogout();
          navigate("/admin/login", { replace: true });
          EndedSessionModal();
        }
        return Promise.reject(error);
      }
    );

    return () => {
      axiosAdmin.interceptors.request.eject(requestInterceptor);
      axiosAdmin.interceptors.response.eject(responseInterceptor);
    };
  }, [adminLogout, isAdmin, navigate]);

  return (
    <AdminAxiosContext.Provider value={axiosAdmin}>
      {children}
    </AdminAxiosContext.Provider>
  );
};

/* -------------------------------------------------------------------------- */
/* Hook                                                                       */
/* -------------------------------------------------------------------------- */
export const useAxiosAdmin = () => {
  return useContext(AdminAxiosContext);
};
