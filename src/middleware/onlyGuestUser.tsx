import { ReactNode } from "react";
import { Navigate } from "react-router-dom";

import { useAuth } from "src/context/auth.context";
const OnlyGuestRoute = ({ children }: { children: ReactNode }) => {
  const { isAuthenticated } = useAuth();
  return !isAuthenticated ? (
    <>{children}</>
  ) : (
    <>
      <Navigate to="/profile" replace />
    </>
  );
};

export default OnlyGuestRoute;
