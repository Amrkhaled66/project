import {
  createBrowserRouter,
  createRoutesFromElements,
  Navigate,
  Outlet,
  Route,
  RouterProvider,
  useParams,
} from "react-router-dom";

import {
  AddDesign,
  AddUser,
  AdminLogin,
  Cart,
  CustomPanels,
  Dashboard,
  Design,
  DesignLibrary,
  Home,
  LoginAsUser,
  LoginPage,
  OrderCancel,
  OrderDetails,
  Orders,
  OrdersMangment,
  OrderSuccess,
  PremiumBuilds,
  SetPassword,
  SignupPage,
  Uploads,
  UserDetails,
  UserManagement,
  UserProfile,
} from "./pages";

import MainLayout from "./layouts/MainLayout";
import DashBoardLayout from "./layouts/DashBoardLayout";
import AdminDashboardLayout from "./layouts/AdminDashBoardLayout";

import ScrollToTop from "./components/ui/ScroolToTop";

import CartGuard from "./middleware/CartGuard";
import AuthRoutes from "./middleware/AuthRoutes";
import OnlyGuestRoute from "./middleware/onlyGuestUser";
import AdminRoutes from "./middleware/AdminGuard";
import IsAdmin from "./middleware/IsAdmin";

import { DesignProvider } from "src/context/desgin.context";
import { AxiosProvider } from "src/context/axiosProvider";
import { AdminContextProvider } from "src/context/adminAuth.context";
import { ADMIN_PATH } from "./utils/defaultSettings";

function AppRouterShell() {
  return (
    <AxiosProvider>
      <ScrollToTop />
      <Outlet />
    </AxiosProvider>
  );
}

function DesignWithIdWrapper() {
  const { id } = useParams();

  return (
    <DesignProvider designId={id || ""}>
      <Design />
    </DesignProvider>
  );
}

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route element={<AppRouterShell />}>
      <Route path="/" element={<Navigate to="/login" replace />} />

      <Route path="/" element={<MainLayout />}>
        <Route
          path="order-success"
          element={
            <AuthRoutes>
              <OrderSuccess />
            </AuthRoutes>
          }
        />
        <Route
          path="order-cancel"
          element={
            <AuthRoutes>
              <OrderCancel />
            </AuthRoutes>
          }
        />
      </Route>

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
        <Route path="design-library/:id" element={<DesignWithIdWrapper />} />
        <Route path="orders" element={<Orders />} />
      </Route>

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
        <Route index element={<Navigate to="orders" replace />} />
        <Route path="orders" element={<OrdersMangment />} />
        <Route path="orders/:id" element={<OrderDetails />} />
        <Route path="user" element={<UserManagement />} />
        <Route path="user/:id" element={<UserDetails />} />
        <Route path="login-as-user" element={<LoginAsUser />} />
        <Route path="add-user" element={<AddUser />} />
        <Route path="add-design" element={<AddDesign />} />
        <Route path="premium-builds" element={<PremiumBuilds />} />
      </Route>

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

      <Route
        path="/login"
        element={
          <OnlyGuestRoute>
            <LoginPage />
          </OnlyGuestRoute>
        }
      />
      <Route
        path="/auth/setup"
        element={
          <OnlyGuestRoute>
            <SetPassword />
          </OnlyGuestRoute>
        }
      />
    </Route>,
  ),
);

export default function AppRouter() {
  return <RouterProvider router={router} />;
}
