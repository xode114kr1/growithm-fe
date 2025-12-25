import { Outlet, useLocation } from "react-router-dom";
import Header from "../components/Header";
import SideNav from "../components/SideNav";
import HeaderNav from "../components/HeaderNav";
import Footer from "../components/Footer";
import Toast from "../components/Toast";
import { useToastStore } from "../../stores/toastStore";

const AppLayout = () => {
  const { isOpenToast } = useToastStore();

  const location = useLocation();
  const isHome = location.pathname === "/";

  return (
    <>
      <Header />
      <SideNav />
      {!isHome && <HeaderNav />}
      <Outlet />
      <Footer />
      {isOpenToast && <Toast />}
    </>
  );
};

export default AppLayout;
