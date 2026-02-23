import { useContext } from "react";
import { Link, Outlet, useNavigate, useLocation } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import { motion } from "framer-motion";

function DashboardLayout() {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  const linkStyle = (path) =>
    `p-3 rounded-xl2 transition duration-200 flex items-center
     ${
       location.pathname === path
         ? "bg-blue-100 text-primary shadow-card"
         : "hover:bg-blue-100 hover:translate-x-1"
     }`;

  return (
    <div className="flex min-h-screen">

      {/* Sidebar */}
      <div className="w-64 bg-sidebar border-r border-borderlight shadow-soft p-6">

        <h2 className="text-2xl font-bold text-primary mb-6">
          HealthSync
        </h2>

        <p className="text-sm text-gray-500 mb-6">
          {user?.role?.toUpperCase()}
        </p>

        <nav className="flex flex-col gap-3 text-sm font-medium">

          {user?.role === "patient" && (
            <Link to="/patient-dashboard" className={linkStyle("/patient-dashboard")}>
              Dashboard
            </Link>
          )}

          {user?.role === "doctor" && (
  <>
    <Link to="/doctor-dashboard" className={linkStyle("/doctor-dashboard")}>
      Dashboard
    </Link>
    <Link to="/doctor/manage-availability" className={linkStyle("/doctor/manage-availability")}>
      Manage Availability
    </Link>
  </>
)}

          {user?.role === "admin" && (
            <Link to="/admin-dashboard" className={linkStyle("/admin-dashboard")}>
              Dashboard
            </Link>
          )}

        </nav>
      </div>

      {/* Main Area */}
      <div className="flex-1 p-10">

        {/* Header */}
        <div className="flex justify-between items-center mb-8 bg-white/70 backdrop-blur-md p-4 rounded-xl2 shadow-card border border-borderlight">

          <h1 className="text-xl font-semibold text-gray-700">
            Welcome, {user?.name}
          </h1>

          <div className="flex gap-3">

            <button
              onClick={handleLogout}
              className="px-4 py-2 bg-primary text-white rounded-xl2 shadow-card hover:scale-105 active:scale-95 transition"
            >
              Logout
            </button>

          </div>

        </div>

        {/* Animated Content */}
        <motion.div
          key={location.pathname}
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
        >
          <Outlet />
        </motion.div>

      </div>
    </div>
  );
}

export default DashboardLayout;