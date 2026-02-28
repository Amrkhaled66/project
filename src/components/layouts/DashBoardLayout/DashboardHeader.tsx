import {
  TextAlignJustify,
  X,
  User,
  LogOut,
  ShoppingCart,
} from "lucide-react";
import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";

import { useAuth } from "src/context/auth.context";
import { useAdminContext } from "src/context/adminAuth.context";
import { useCart } from "src/context/cart.context";
import { ADMIN_PATH } from "src/utils/defaultSettings";
interface DashboardHeaderProps {
  onMenuToggle: () => void;
  isSidebarOpen: boolean;
}

const DashboardHeader: React.FC<DashboardHeaderProps> = ({
  onMenuToggle,
  isSidebarOpen,
}) => {
  const [isProfileOpen, setIsProfileOpen] = useState<boolean>(false);

  const location = useLocation();
  const navigate = useNavigate();

  const isAdminPath = location.pathname.startsWith(ADMIN_PATH);

  // User context
  const { logout } = useAuth();
  const { cartItems } = useCart();

  // Admin context
  const { adminLogout } = useAdminContext();

  const handleLogout = () => {
    if (isAdminPath) {
      adminLogout();
      navigate(`${ADMIN_PATH}/login`);
    } else {
      logout();
      navigate("/login");
    }
  };

  return (
    <header className="mx-auto w-full">
      <div className="flex items-center justify-between py-3">
        {/* Left */}
        <div className="flex items-center justify-between gap-4">
          <button
            onClick={onMenuToggle}
            className="rounded-lg p-2 transition-colors hover:bg-gray-100 lg:hidden"
          >
            {isSidebarOpen ? <X size={20} /> : <TextAlignJustify size={20} />}
          </button>

          <div className="flex items-center gap-2">
            <Link className="hidden lg:block" to="/">
              <img src="/logo.svg" alt="JB Blanket" />
            </Link>
          </div>
        </div>

        {/* Center (mobile logo) */}
        <Link className="lg:hidden" to="/">
          <img src="/logo.svg" alt="JB Blanket" />
        </Link>

        {/* Right */}
        <div className="flex items-center justify-center gap-3">
          {/* Cart (USER ONLY) */}
          {!isAdminPath && (
            <Link className="relative hidden lg:block" to="cart">
              <div className="absolute -top-2 -right-3 flex h-5 w-5 items-center justify-center rounded-full bg-red-500 text-xs text-white">
                {cartItems.reduce(
                  (total, item) => total + item.quantity,
                  0
                )}
              </div>
              <ShoppingCart size={24} />
            </Link>
          )}

          {/* Profile */}
          <div className="relative">
            <button
              onClick={() => setIsProfileOpen((v) => !v)}
              className="flex items-center gap-2 rounded-lg p-2 transition-colors hover:bg-gray-100"
            >
              <div className="bg-primary flex items-center justify-center rounded-full p-2">
                <User size={22} className="text-white" />
              </div>
            </button>

            {isProfileOpen && (
              <div className="absolute right-0 mt-2 w-48 rounded-lg border border-gray-200 bg-white shadow-lg">
                <button
                  onClick={handleLogout}
                  className="flex w-full items-center gap-2 px-4 py-2 text-left text-sm text-red-600 hover:bg-gray-50"
                >
                  <LogOut size={16} />
                  Sign Out
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default DashboardHeader;
