import { useMutation } from "@tanstack/react-query";
import { AdminAuthService } from "src/services/admin/adminAuth.service";
import { useAuth } from "src/context/auth.context";

export function useAdminLogin() {
  return useMutation({
    mutationFn: AdminAuthService.login,
  });
}

export function useAdminRegister() {
  return useMutation({
    mutationFn: AdminAuthService.register,
  });
}

export function useAdminLogout() {
  return () => {
    localStorage.removeItem("admin_token");
  };
}

export const useLoginAsUser = () => {
  const { login } = useAuth();
  return useMutation({
    mutationFn: AdminAuthService.loginAsUser,
    onSuccess: (data) => {
      login(data.user, data.token);
    },
  });
};
