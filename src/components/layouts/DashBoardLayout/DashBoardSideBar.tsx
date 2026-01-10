import {
  LucideIcon,
  ChevronLeft,
} from "lucide-react";
import { NavLink } from "react-router-dom";

export interface SidebarMenuItem {
  icon: LucideIcon;
  label: string;
  path: string;
}

export interface SidebarUserInfo {
  name?: string;
  email?: string;
}

interface ReusableSidebarProps {
  isOpen: boolean;
  onClose: () => void;
  onOpen: () => void;

  menuItems: SidebarMenuItem[];
  basePath: string;

  userInfo?: SidebarUserInfo;
}

const ReusableSidebar: React.FC<ReusableSidebarProps> = ({
  isOpen,
  onClose,
  onOpen,
  menuItems,
  basePath,
  userInfo,
}) => {
  return (
    <>
      {/* Overlay for mobile */}
      {isOpen && (
        <div
          className="bg-opacity-50 fixed inset-0 z-40 bg-black/50 lg:pointer-events-none lg:hidden"
          onClick={onClose}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`animate bg-mainProfile fixed z-40 min-h-screen ps-3 lg:relative ${
          isOpen ? "w-66 translate-0" : "-translate-x-100 lg:w-22"
        } space-y-9 lg:translate-x-0`}
      >
        <div className="sticky top-0 h-fit space-y-5 py-5">
          {/* Header */}
          <div className="flex items-center">
            <div className="flex items-center gap-3 px-2">
              <div className="bg-primary size-9 rounded-xl"></div>

              {isOpen && userInfo && (
                <div className="border-l pl-1">
                  <p className="text-lg font-medium">{userInfo.name}</p>
                  <p className="text-xs font-light">{userInfo.email}</p>
                </div>
              )}
            </div>

            <div>
              <button
                onClick={isOpen ? onClose : onOpen}
                className="translate-x-3 rounded-lg bg-gray-500 px-1 py-1"
              >
                <ChevronLeft
                  className={`animate size-5 text-white ${
                    !isOpen && "rotate-180"
                  }`}
                />
              </button>
            </div>
          </div>

          {/* Menu */}
          <div className="h-full overflow-y-auto pb-4">
            <ul className="space-y-2 font-medium">
              {menuItems.map((item) => {
                const Icon = item.icon;

                return (
                  <li key={item.path}>
                    <NavLink
                      to={`${basePath}${item.path}`}
                      onClick={window.innerWidth < 1024 ? onClose : undefined}
                      className={({ isActive }) =>
                        `${isActive
                          ? "bg-white text-black hover:bg-white/90"
                          : "text-strokeFont"
                        } group flex items-center gap-x-3 rounded-ss-3xl rounded-es-3xl p-2 ps-5 transition-colors hover:bg-gray-100`
                      }
                    >
                      <Icon size={20} />
                      {isOpen && <span className="ml-3">{item.label}</span>}
                    </NavLink>
                  </li>
                );
              })}
            </ul>
          </div>
        </div>
      </aside>
    </>
  );
};

export default ReusableSidebar;
