import { Outlet, Route, Routes } from "react-router-dom";
import Header from "../shared/components/Header";
import HomePage from "../pages/HomePage/HomePage";
import Footer from "../shared/components/Footer";
import CallbackPage from "../pages/CallbackPage/CallbackPage";

const Layout = () => {
  return (
    <>
      <Header />
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
      </Route>
    </Routes>
  );
};

export default AppRouter;
