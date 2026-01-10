import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { AdminAuthService } from "src/services/admin/adminAuth.service";
import { Admin } from "src/types/admin.types"
const ADMIN_ME_KEY = ["admin", "me"];

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

export function useAdminMe() {
  return useQuery<Admin>({
    queryKey: ADMIN_ME_KEY,
    queryFn: AdminAuthService.me,
    retry: false,
  });
}

export function useAdminLogout() {
  const queryClient = useQueryClient();

  return () => {
    localStorage.removeItem("admin_token");
    queryClient.removeQueries({ queryKey: ADMIN_ME_KEY });
  };
}
