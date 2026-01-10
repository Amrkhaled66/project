import { ReactNode } from "react";
import { Navigate } from "react-router-dom";
import { useAdminContext } from "src/context/adminAuth.context";
import { ADMIN_PATH } from "src/utils/defaultSettings";
const AdminRoutes = ({ children }: { children: ReactNode }) => {
  const { isAdmin } = useAdminContext();

  if (!isAdmin) {
    return <Navigate to={`${ADMIN_PATH}/login`} replace />;
  }

  return children;
};

export default AdminRoutes;
