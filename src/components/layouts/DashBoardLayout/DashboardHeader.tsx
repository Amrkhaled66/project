import { TextAlignJustify, X, User, LogOut, ShoppingCart } from "lucide-react";
import { useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "src/context/auth.context";
import { useNavigate } from "react-router-dom";

interface DashboardHeaderProps {
  onMenuToggle: () => void;
  isSidebarOpen: boolean;
}
const DashboardHeader: React.FC<DashboardHeaderProps> = ({
  onMenuToggle,
  isSidebarOpen,
}) => {
  const [isProfileOpen, setIsProfileOpen] = useState<boolean>(false);
  const { logout } = useAuth();
  const navigate = useNavigate();

  return (
    <header className=" mx-auto w-full">
      <div className="flex items-center justify-between py-3">
        <div className="flex items-center justify-between gap-4">
          <button
            onClick={onMenuToggle}
            className="rounded-lg p-2 transition-colors hover:bg-gray-100 lg:hidden"
          >
            {isSidebarOpen ? <X size={20} /> : <TextAlignJustify size={20} />}
          </button>
          <div className="flex items-center gap-2">
            <Link className="hidden lg:block" to={"/"}>
              <img src="/logo.svg" alt="JB Blanket" />
            </Link>
          </div>
        </div>
        <Link className="lg:hidden" to={"/"}>
          <img src="/logo.svg" alt="JB Blanket" />
        </Link>

        <div className="flex items-center justify-center gap-3">
          <Link className="hidden lg:block" to={"cart"}>
            <ShoppingCart size={24} />
          </Link>
          <div className="relative">
            <button
              onClick={() => setIsProfileOpen(!isProfileOpen)}
              className="flex items-center gap-2 rounded-lg p-2 transition-colors hover:bg-gray-100"
            >
              <div className="bg-primary flex items-center justify-center rounded-full p-2">
                <User size={22} className="text-white" />
              </div>
            </button>

            {isProfileOpen && (
              <div className="absolute right-0 mt-2 w-48 rounded-lg border border-gray-200 bg-white shadow-lg">
                <button
                  onClick={() => {
                    logout();
                    navigate("/login");
                  }}
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
