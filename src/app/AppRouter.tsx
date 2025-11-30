import { Outlet, Route, Routes } from "react-router-dom";
import Header from "../shared/components/Header";
import HomePage from "../pages/HomePage/HomePage";

const Layout = () => {
  return (
    <>
      <Header />
      <Outlet />
    </>
  );
};

const AppRouter = () => {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<HomePage />} />
      </Route>
    </Routes>
  );
};

export default AppRouter;
