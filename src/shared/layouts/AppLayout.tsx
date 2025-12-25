import { Outlet, useLocation } from "react-router-dom";
import Header from "../components/Header";
import SideNav from "../components/SideNav";
import HeaderNav from "../components/HeaderNav";
import Footer from "../components/Footer";

const AppLayout = () => {
  const location = useLocation();
  const isHome = location.pathname === "/";

  return (
    <>
      <Header />
      <SideNav />
      {!isHome && <HeaderNav />}
      <Outlet />
      <Footer />
    </>
  );
};

export default AppLayout;
