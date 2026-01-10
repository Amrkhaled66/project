import { ReactNode } from "react";
import { Navigate } from "react-router-dom";
import { useAdminContext } from "src/context/adminAuth.context";
import { ADMIN_PATH } from "src/utils/defaultSettings";
const IsAdmin = ({ children }: { children: ReactNode }) => {
  const { isAdmin } = useAdminContext();

  console.log("is Admin", isAdmin)
  if (isAdmin) {
    return <Navigate to={`${ADMIN_PATH}`} replace />;
  }

  return children;
};

export default IsAdmin;
