import { useState } from "react";
import { Outlet } from "react-router-dom";

import DashboardHeader from "src/components/layouts/DashBoardLayout/DashboardHeader";
import DashboardSidebar from "src/components/layouts/DashBoardLayout/DashBoardSideBar";
import Footer from "src/components/layouts/MainLayout/Footer";

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
    <div >
      <div className="flex">
        <DashboardSidebar
          isOpen={isSidebarOpen}
          onOpen={openSidebar}
          onClose={closeSidebar}
        />

        <div className="w-full space-y-5  bg-white py-2 lg:px-6">
          <DashboardHeader
            onMenuToggle={toggleSidebar}
            isSidebarOpen={isSidebarOpen}
          />
          <div className="pb-4  lg:pb-8">
            <Outlet />
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default DashBoardLayout;
