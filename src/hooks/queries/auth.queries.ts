import { useMutation } from "@tanstack/react-query";
import {
  loginHandler,
  resendSetupEmailHandler,
  setPasswordHandler,
} from "src/services/authServices";

export const useLogin = () => {
  return useMutation({
    mutationFn: loginHandler,
  });
};

export const useSetPassword = () => {
  return useMutation({
    mutationFn: setPasswordHandler,
  });
};

export const useResendSetupEmail = () => {
  return useMutation({
    mutationFn: resendSetupEmailHandler,
  });
};
