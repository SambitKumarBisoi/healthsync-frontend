import { useContext, useState } from "react";
import { Outlet, useNavigate, useLocation } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import { motion } from "framer-motion";
import SidebarDrawer from "../components/SidebarDrawer";

function DashboardLayout() {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();
  const location = useLocation();
  const [drawerOpen, setDrawerOpen] = useState(false);

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-gray-100">

      {/* ===== HEADER ===== */}
      <div className="sticky top-0 z-30 backdrop-blur-md bg-white/70 border-b border-gray-200 shadow-sm">

        <div className="flex justify-between items-center px-10 py-4">

          <div className="flex items-center gap-4">

            {/* Hamburger */}
            <button
              onClick={() => setDrawerOpen(true)}
              className="bg-white p-2 rounded-xl2 shadow-card hover:scale-105 transition"
            >
              ☰
            </button>

            <h2 className="text-lg font-semibold text-gray-700">
              Welcome, {user?.name}
            </h2>

          </div>

          <button
            onClick={handleLogout}
            className="px-4 py-2 bg-primary text-white rounded-xl2 shadow-card hover:scale-105 active:scale-95 transition"
          >
            Logout
          </button>

        </div>

      </div>

      {/* ===== CONTENT AREA ===== */}
      <div className="px-10 py-8">

        <motion.div
          key={location.pathname}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.35 }}
        >
          <Outlet />
        </motion.div>

      </div>

      {/* ===== SIDEBAR ===== */}
      <SidebarDrawer
        isOpen={drawerOpen}
        onClose={() => setDrawerOpen(false)}
        role={user?.role}
      />

    </div>
  );
}

export default DashboardLayout;