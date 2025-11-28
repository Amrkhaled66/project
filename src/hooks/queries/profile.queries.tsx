import { useMutation } from "@tanstack/react-query";
import { updateUserProfileService } from "src/services/profileServices";

export const useUpdateUserProfile = () => {
  return useMutation({
    mutationFn: updateUserProfileService,
  });
};
