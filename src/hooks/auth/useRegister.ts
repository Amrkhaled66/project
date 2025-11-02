import { useMutation } from "@tanstack/react-query";
import { signupHandler } from "src/services/authServices";
export const useRegister = () => {
  return useMutation({
    mutationFn: signupHandler,
  });
};
