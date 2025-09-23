import Header from "src/components/layouts/MainLayout/Header";
import Footer from "src/components/layouts/MainLayout/Footer";
import { Outlet } from "react-router-dom";
const MainLayout = () => {
  return (
    <div>
      <Header />
      <main className="pt-20">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};

export default MainLayout;
