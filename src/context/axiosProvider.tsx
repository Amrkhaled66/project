import { createContext, useContext, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { getToken } from "src/utils/authStorage";
import Toast from "src/components/ui/Toast";
import { axiosPrivate } from "src/api/axios";
import { useAuth } from "src/context/auth.context";

const AxiosContext = createContext(axiosPrivate);

export const AxiosProvider = ({ children }: { children: React.ReactNode }) => {
  const navigate = useNavigate();
  const { logout, isAuthenticated } = useAuth();
  // const location = useLocation();

  const EndedSessionModal = () =>
    Toast(
      "Your session has ended. Please sign in again.",
      "error",
      "#fff3cd",
      "top-right",
    );

  useMemo(() => {
    const requestInterceptor = axiosPrivate.interceptors.request.use(
      (config) => {
        const token = getToken();
        if (token && !config.headers["Authorization"]) {
          config.headers["Authorization"] = `Bearer ${token}`;
        }
        return config;
      },
      (error) => Promise.reject(error),
    );

    const responseInterceptor = axiosPrivate.interceptors.response.use(
      (response) => response,
      async (error) => {
        if (error?.response?.status === 401 && isAuthenticated) {
          logout();
          navigate("/signin", { replace: true });
          EndedSessionModal();
        }
        return Promise.reject(error);
      },
    );

    return () => {
      axiosPrivate.interceptors.request.eject(requestInterceptor);
      axiosPrivate.interceptors.response.eject(responseInterceptor);
    };
  }, []);

  return (
    <AxiosContext.Provider value={axiosPrivate}>
      {children}
    </AxiosContext.Provider>
  );
};

export const useAxiosPrivate = () => {
  return useContext(AxiosContext);
};
