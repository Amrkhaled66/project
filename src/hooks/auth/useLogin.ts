import { useMutation } from "@tanstack/react-query";
import { loginHandler } from "src/services/authServices";
export const useLogin = () => {
  return useMutation({
    mutationFn: loginHandler,
  });
};
