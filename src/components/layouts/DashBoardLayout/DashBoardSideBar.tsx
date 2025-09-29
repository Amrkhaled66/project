import {
  LayoutDashboard,
  UploadCloud,
  Hand,
  User,
  ShoppingCart,
  ClipboardList,
  LucideIcon,
  ChevronLeft,
} from "lucide-react";
import { NavLink } from "react-router-dom";

interface MenuItem {
  icon: LucideIcon;
  label: string;
  path: string;
}

interface DashboardSidebarProps {
  isOpen: boolean;
  onClose: () => void;
  onOpen: () => void;
}
const menuItems: MenuItem[] = [
  { icon: LayoutDashboard, label: "Dashboard", path: "/dashboard" },
  { icon: UploadCloud, label: "Uploads", path: "/dashboard/uploads" },
  { icon: Hand, label: "Design", path: "/dashboard/design" },
  { icon: User, label: "Profile", path: "/dashboard/profile" },
  { icon: ShoppingCart, label: "Cart", path: "/dashboard/cart" },
  { icon: ClipboardList, label: "Orders", path: "/dashboard/orders" },
];

const DashboardSidebar: React.FC<DashboardSidebarProps> = ({
  isOpen,
  onClose,
  onOpen,
}) => {
  const name = "Jane Doa";
  const email = "Jane_Doa@gmail.com";

  console.log(isOpen);
  return (
    <>
      {/* Overlay for mobile */}
      {isOpen && (
        <div
          className="bg-opacity-50 fixed inset-0 z-40 bg-black/50 lg:hidden"
          onClick={onClose}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`animate z-40 fixed lg:relative min-h-screen bg-mainProfile py-5 ps-3 ${
          isOpen ? "w-66 translate-0" : " -translate-x-100 lg:w-22"
        } space-y-9 lg:translate-x-0`}
      >
        <div className="flex items-center">
          <div className="flex items-center gap-3 px-2">
            <div className="bg-primary size-9 rounded-xl"></div>
            {isOpen && (
              <div className="border-l pl-1">
                <p className="text-lg font-medium">{name}</p>
                <p className="text-xs font-light">{email}</p>
              </div>
            )}
          </div>
          <div>
            <button
              onClick={isOpen ? onClose : onOpen}
              className="translate-x-3 rounded-lg bg-gray-500 px-1 py-1"
            >
              <ChevronLeft
                className={`animate size-5 text-white ${!isOpen && "rotate-180"}`}
              />
            </button>
          </div>
        </div>
        <div className="h-full overflow-y-auto pb-4">
          <ul className="space-y-2 font-medium">
            {menuItems.map((item) => {
              const Icon = item.icon;

              return (
                <li key={item.path}>
                  <NavLink
                    to={`/profile${item.path}`}
                    onClick={onClose}
                    className={({ isActive }) =>
                      `${isActive ? "bg-white text-black hover:bg-white/90" : "text-strokeFont"} group flex items-center gap-x-3 rounded-ss-3xl rounded-es-3xl p-2 ps-5 transition-colors hover:bg-gray-100`
                    }
                  >
                    <Icon size={20} className={""} />
                    {isOpen && <span className="ml-3">{item.label}</span>}
                  </NavLink>
                </li>
              );
            })}
          </ul>
        </div>
      </aside>
    </>
  );
};

export default DashboardSidebar;
