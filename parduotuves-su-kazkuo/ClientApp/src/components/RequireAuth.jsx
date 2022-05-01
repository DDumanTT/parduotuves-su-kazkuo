import { useLocation, Navigate, Outlet } from "react-router-dom";
import useAuth from "../hooks/useAuth";

export default function RequireAuth({ allowedRole, children }) {
  const { user } = useAuth();
  const location = useLocation();

  if (!user || !localStorage.getItem("user")) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  if (user?.role === allowedRole) {
    return <>{children}</>;
  } else {
    return <Navigate to="/" state={{ from: location }} replace />;
  }
}
