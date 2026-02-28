import { useState } from "react";
import { Outlet } from "react-router-dom";

import DashboardHeader from "src/components/layouts/DashBoardLayout/DashboardHeader";
import ReusableSidebar from "src/components/layouts/DashBoardLayout/DashBoardSideBar";
import Footer from "src/components/layouts/MainLayout/Footer";

import { AxiosProvider } from "src/context/axiosProvider";
import { useAuth } from "src/context/auth.context";
import { userSidebarMenu } from "src/config/userSidebarMenu";

const DashBoardLayout: React.FC = () => {
  const { authData } = useAuth();

  const [isSidebarOpen, setIsSidebarOpen] = useState<boolean>(
    () => window.innerWidth >= 1024
  );

  return (
    <AxiosProvider>
      <div className="flex">
        <ReusableSidebar
          isOpen={isSidebarOpen}
          onOpen={() => setIsSidebarOpen(true)}
          onClose={() => setIsSidebarOpen(false)}
          menuItems={userSidebarMenu}
          basePath="/profile"
          userInfo={{
            name: authData?.user?.name,
            email: authData?.user?.email,
          }}
        />

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

      {/* <Footer /> */}
    </AxiosProvider>
  );
};

export default DashBoardLayout;
