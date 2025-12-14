import { BrowserRouter, Routes, Route, Navigate, useParams } from "react-router-dom";
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
  DesignLibrary,
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
            <Route path="design-library" element={<DesignLibrary />} />
            <Route path="orders" element={<Orders />} />

            <Route
              path="design/:id"
              element={
                <DesignWithIdWrapper />
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

// Component to handle design id and pass it to DesignProvider
function DesignWithIdWrapper() {
  const { id } = useParams();  // Get the id from the URL using useParams
  return (
    <DesignProvider designId={id || ""}>  {/* Pass the id to the DesignProvider */}
      <Design />
    </DesignProvider>
  );
}
