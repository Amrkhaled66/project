import { useState } from "react";
import { Outlet } from "react-router-dom";

import DashboardHeader from "src/components/layouts/DashBoardLayout/DashboardHeader";
import DashBoardSideBar from "src/components/layouts/DashBoardLayout/DashBoardSideBar";

import { AdminAxiosProvider } from "src/context/axiosAdminProvider";
import { useAdminContext } from "src/context/adminAuth.context";
import { adminSidebarMenu } from "src/config/adminSidebarMenu";
import { ADMIN_PATH } from "src/utils/defaultSettings";
const AdminDashboardLayout: React.FC = () => {
  const { admin } = useAdminContext();

  const [isSidebarOpen, setIsSidebarOpen] = useState<boolean>(
    () => window.innerWidth >= 1024
  );

  return (
    <AdminAxiosProvider>
      <div className="flex">
        {/* Sidebar */}
        <DashBoardSideBar
          isOpen={isSidebarOpen}
          onOpen={() => setIsSidebarOpen(true)}
          onClose={() => setIsSidebarOpen(false)}
          menuItems={adminSidebarMenu}
          basePath={ADMIN_PATH}
          userInfo={{
            name: admin?.fullName,
            email: admin?.email,
          }}
        />

        {/* Main Content */}
        <div className="w-full space-y-5 bg-white px-6 py-2">
          <DashboardHeader
            isSidebarOpen={isSidebarOpen}
            onMenuToggle={() => setIsSidebarOpen((v) => !v)}
          />

          <div className="pb-4 lg:pb-8">
            <Outlet />
          </div>
        </div>
      </div>

    </AdminAxiosProvider>
  );
};

export default AdminDashboardLayout;
