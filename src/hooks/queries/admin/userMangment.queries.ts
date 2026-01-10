import { useMutation, useQuery } from "@tanstack/react-query";
import { getAdminUserOverviewByEmailService } from "src/services/admin/userMangment.service";

export const useAdminUserOverviewByEmailMutation = () => {
  return useMutation({
    mutationFn: (email: string) => getAdminUserOverviewByEmailService(email),
  });
};

export const useAdminUserOverviewByIdQuery = (userId: string,props: any) => {
  return useQuery({
    queryKey: ["adminUserOverviewById", userId],
    queryFn: () => getAdminUserOverviewByEmailService(userId),
    ...props,
  });
};
