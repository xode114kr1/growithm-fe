import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useAuthStore } from "../stores/authStore";

const ProtectedRoute = () => {
  const isAuthenticated = useAuthStore((store) => store.isAuthenticated);
  const location = useLocation();

  if (!isAuthenticated) {
    return <Navigate to="/" state={{ from: location }} replace />;
  }
  return <Outlet />;
};

export default ProtectedRoute;
