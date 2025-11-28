import { useState } from "react";
import { Outlet } from "react-router-dom";

import DashboardHeader from "src/components/layouts/DashBoardLayout/DashboardHeader";
import DashboardSidebar from "src/components/layouts/DashBoardLayout/DashBoardSideBar";
import Footer from "src/components/layouts/MainLayout/Footer";
import { AxiosProvider } from "src/context/axiosProvider";
const DashBoardLayout: React.FC = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState<boolean>(() => {
    if (window.innerWidth >= 1024) {
      return true;
    }
    console.log(window.innerWidth);
    return false;
  });
  const toggleSidebar = (): void => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const closeSidebar = (): void => {
    console.log("closeSidebar");
    setIsSidebarOpen(false);
  };

  const openSidebar = (): void => {
    setIsSidebarOpen(true);
  };

  return (
    <AxiosProvider>
      <div>
        <div className="flex">
          <DashboardSidebar
            isOpen={isSidebarOpen}
            onOpen={openSidebar}
            onClose={closeSidebar}
          />

          <div className="w-full space-y-5 bg-white px-6 py-2">
            <DashboardHeader
              onMenuToggle={toggleSidebar}
              isSidebarOpen={isSidebarOpen}
            />
            <div className="pb-4 lg:pb-8">
              <Outlet />
            </div>
          </div>
        </div>
        <Footer />
      </div>
    </AxiosProvider>
  );
};

export default DashBoardLayout;
