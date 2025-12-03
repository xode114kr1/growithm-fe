import { Outlet, Route, Routes, useLocation } from "react-router-dom";
import Header from "../shared/components/Header";
import HomePage from "../pages/HomePage/HomePage";
import Footer from "../shared/components/Footer";
import CallbackPage from "../pages/CallbackPage/CallbackPage";
import HeaderNav from "../shared/components/HeaderNav";
import DashboardPage from "../pages/DashboardPage/DashboardPage";
import ProtectedRoute from "./ProtectedRoute";
import PendingPage from "../pages/PendingPage/PendingPage";

const Layout = () => {
  const location = useLocation();
  const isHome = location.pathname === "/";

  return (
    <>
      <Header />
      {!isHome && <HeaderNav />} {/* 여기서 조건 렌더링 */}
      <Outlet />
      <Footer />
    </>
  );
};

const AppRouter = () => {
  return (
    <Routes>
      <Route path="/callback" element={<CallbackPage />} />
      <Route path="/" element={<Layout />}>
        <Route index element={<HomePage />} />
        <Route element={<ProtectedRoute />}>
          <Route path="/dashboard" element={<DashboardPage />} />
          <Route path="/pending" element={<PendingPage />} />
        </Route>
      </Route>
    </Routes>
  );
};

export default AppRouter;
