import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
  useParams,
} from "react-router-dom";

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
  OrdersMangment,
  AdminLogin,
  OrderDetails,
  UserManagement,
  UserDetails,
  CustomPanels,
  LoginAsUser
} from "./pages";

import MainLayout from "./layouts/MainLayout";
import DashBoardLayout from "./layouts/DashBoardLayout";
import AdminDashboardLayout from "./layouts/AdminDashBoardLayout";

import ScrollToTop from "./components/ui/ScroolToTop";

// Guards
import CartGuard from "./middleware/CartGuard";
import AuthRoutes from "./middleware/AuthRoutes";
import OnlyGuestRoute from "./middleware/onlyGuestUser";
import AdminRoutes from "./middleware/AdminGuard";
import IsAdmin from "./middleware/IsAdmin";

import { DesignProvider } from "src/context/desgin.context";
import { AxiosProvider } from "src/context/axiosProvider";
import { AdminContextProvider } from "src/context/adminAuth.context";
import { ADMIN_PATH } from "./utils/defaultSettings";

export default function AppRouter() {
  return (
    <BrowserRouter>
      <AxiosProvider>
        <ScrollToTop />

        <Routes>
          {/* ================= Public ================= */}
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

          {/* ================= User Dashboard ================= */}
          <Route
            path="/profile"
            element={<Navigate to="/profile/dashboard" replace />}
          />

          <Route
            path="/profile"
            element={
              <AuthRoutes>
                <AdminContextProvider>
                  <DashBoardLayout />
                </AdminContextProvider>
              </AuthRoutes>
            }
          >
            <Route path="dashboard" element={<Dashboard />} />
            <Route path="uploads" element={<Uploads />} />
            <Route path="custom-panels" element={<CustomPanels />} />
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
            <Route path="design-library/:id" element={<DesignWithIdWrapper />} />
          </Route>

          {/* ================= Admin Routes ================= */}
          <Route
            path={ADMIN_PATH}
            element={
              <AdminContextProvider>
                <AdminRoutes>
                  <AdminDashboardLayout />
                </AdminRoutes>
              </AdminContextProvider>
            }
          >
            {/* /admin → /admin/orders */}
            <Route index element={<Navigate to="orders" replace />} />
            <Route path="orders" element={<OrdersMangment />} />
            <Route path="orders/:id" element={<OrderDetails />} />
            <Route path="user" element={<UserManagement />} />
            <Route path="user/:id" element={<UserDetails />} />
            <Route path="login-as-user" element={<LoginAsUser />} />
          </Route>

          {/* ================= Admin Login ================= */}
          <Route
            path={`${ADMIN_PATH}/login`}
            element={
              <AdminContextProvider>
                <IsAdmin>
                  <AdminLogin />
                </IsAdmin>
              </AdminContextProvider>
            }
          />

          {/* ================= Auth ================= */}
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<SignupPage />} />
        </Routes>
      </AxiosProvider>
    </BrowserRouter>
  );
}

/* -------------------------------------------------------------------------- */
/* Helpers                                                                    */
/* -------------------------------------------------------------------------- */
function DesignWithIdWrapper() {
  const { id } = useParams();
  return (
    <DesignProvider designId={id || ""}>
      <Design />
    </DesignProvider>
  );
}
