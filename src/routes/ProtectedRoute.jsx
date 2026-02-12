import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const ProtectedRoute = ({ children, allowedRoles }) => {
  const { auth } = useAuth();

  // 1️⃣ Not logged in
  if (!auth.isAuthenticated) {
    return <Navigate to="/" replace />;
  }

  // 2️⃣ Logged in but role not allowed
  if (allowedRoles && !allowedRoles.includes(auth.role)) {
    return <Navigate to="/" replace />;
  }

  // 3️⃣ Allowed
  return children;
};

export default ProtectedRoute;
