import { Outlet, useLocation } from "react-router-dom";
import Navbar from "../components/shared/Navbar";
import Footer from "../components/shared/Footer";
import { useTheme } from "../context/ThemeProvider";
import Banner from "../components/Banner/Banner";

const MainLayout = () => {
  const { theme } = useTheme();
  const location = useLocation();

  const isHomePage = location.pathname === "/";

  return (
    <div className={`min-h-screen ${theme === "dark" ? "dark-mode" : "light-mode"}`}>
      <Navbar />

     
      {isHomePage && <Banner />}

      <div className="max-w-7xl mx-auto pt-20">
        <main className="p-4">
          <Outlet />
        </main>
      </div>

      <Footer />
    </div>
  );
};

export default MainLayout;
