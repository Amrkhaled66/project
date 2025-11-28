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

// Guards
import CartGuard from "./middleware/CartGuard";
import AuthRoutes from "./middleware/AuthRoutes";
import OnlyGuestRoute from "./middleware/onlyGuestUser";

import { DesignProvider } from "src/context/desgin.context";
import { AxiosProvider } from "src/context/axiosProvider";

export default function AppRouter() {
  return (
    <BrowserRouter>
      <AxiosProvider>
        <ScrollToTop />
        <Routes>
          {/* Public Layout */}
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

          {/* Redirect */}
          <Route
            path="/profile"
            element={<Navigate to="/profile/dashboard" />}
          />

          {/* Dashboard Layout */}
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
            <Route
              path="cart"
              element={
                <CartGuard>
                  <Cart />
                </CartGuard>
              }
            />
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

          {/* Auth Routes */}
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<SignupPage />} />
        </Routes>
      </AxiosProvider>
    </BrowserRouter>
  );
}
