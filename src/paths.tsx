import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import {
  Home,
  Dashboard,
  Uploads,
  Cart,
  UserProfile,
  Orders,
  Design,
  LoginPage,
  SignupPage,
} from "./pages";
import MainLayout from "./layouts/MainLayout";
import DashBoardLayout from "./layouts/DashBoardLayout";
import ScrollToTop from "./components/ui/ScroolToTop";

import AuthRoutes from "./middleware/AuthRoutes";
import OnlyGuestRoute from "./middleware/onlyGuestUser";
import { DesignProvider } from "src/context/desgin.context";
export default function AppRouter() {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<MainLayout />}>
          <Route
            index
            element={
              <OnlyGuestRoute>
                <Home />
              </OnlyGuestRoute>
            }
          />
        </Route>
        <Route path="/profile" element={<Navigate to="/profile/dashboard" />} />
        <Route
          path="/profile"
          element={
            <AuthRoutes>
              <DashBoardLayout />
            </AuthRoutes>
          }
        >
          <Route index path="dashboard" element={<Dashboard />} />
          <Route path="uploads" element={<Uploads />} />
          <Route path="cart" element={<Cart />} />
          <Route path="user-profile" element={<UserProfile />} />
          <Route path="orders" element={<Orders />} />
          <Route
            path="desgin"
            element={
              <DesignProvider>
                <Design />
              </DesignProvider>
            }
          />
        </Route>
        <Route path="/login" element={<LoginPage />}></Route>
        <Route path="/register" element={<SignupPage />}></Route>
      </Routes>
    </BrowserRouter>
  );
}
