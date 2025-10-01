import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { Home, Dashboard, Uploads, Cart ,UserProfile} from "./pages";
import MainLayout from "./layouts/MainLayout";
import DashBoardLayout from "./layouts/DashBoardLayout";
import ScrollToTop from "./components/ui/ScroolToTop";
// // import your page components
// import Home from "./pages/Home";
// import About from "./pages/About";
// import Login from "./pages/Login";
// import Signup from "./pages/Signup";
// import Profile from "./pages/Profile";
// import Dashboard from "./pages/Dashboard";

export default function AppRouter() {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<MainLayout />}>
          <Route index element={<Home />} />
        </Route>
        <Route path="/profile" element={<Navigate to="/profile/dashboard" />} />
        <Route path="/profile" element={<DashBoardLayout />}>
          <Route index path="dashboard" element={<Dashboard />} />
          <Route path="uploads" element={<Uploads />} />
          <Route path="cart" element={<Cart />} />
          <Route path="user-profile" element={<UserProfile />} />
        </Route>

        {/* <Route path="/about" element={<About />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/profile/dashboard" element={<Dashboard />} /> */}
      </Routes>
    </BrowserRouter>
  );
}
