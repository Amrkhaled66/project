import { LucideIcon, ChevronLeft } from "lucide-react";
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
        className={`animate bg-primary-container fixed z-40 min-h-screen ps-3 lg:relative ${
          isOpen ? "w-80 translate-0" : "-translate-x-100 lg:w-22"
        } space-y-9 lg:translate-x-0`}
      >
        <div className="sticky top-0 h-fit space-y-12 py-5">
          {/* Header */}
          <div className="flex items-center">
            <div className="flex items-center gap-3 px-2">
              <div className="bg-secondary flex size-10 items-center justify-center rounded-full text-white">
                {userInfo?.name?.charAt(0).toUpperCase()}
              </div>

              {isOpen && userInfo && (
                <div className="text-white">
                  <p className="text-lg font-medium">
                    {userInfo.name?.split(" ")[0]}
                  </p>
                  <p className="text-stroke text-xs uppercase">
                    Private Atelier
                  </p>
                  {/* <p className="text-xs font-light">{userInfo.email}</p> */}
                </div>
              )}
            </div>

            <div>
              <button
                onClick={isOpen ? onClose : onOpen}
                className={` rounded-lg bg-gray-500 px-1 py-1 ${isOpen ? "translate-x-16" : "translate-x-2"}`}
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
            <ul className="space-y-2 p-2">
              {menuItems.map((item) => {
                const Icon = item.icon;

                return (
                  <li className="relative" key={item.path}>
                    <NavLink
                      to={`${basePath}${item.path}`}
                      onClick={window.innerWidth < 1024 ? onClose : undefined}
                      className={({ isActive }) =>
                        `${
                          isActive
                            ? "before:bg-secondary bg-white/10 text-white before:absolute before:start-0 before:top-0 before:h-full before:w-1"
                            : "text-stroke"
                        } group font-subTitle flex items-center gap-x-3 p-2 ps-3 text-sm transition-colors hover:bg-white/10`
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
