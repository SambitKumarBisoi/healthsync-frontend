import { useNavigate, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";

function SidebarDrawer({ isOpen, onClose, role }) {
  const navigate = useNavigate();
  const location = useLocation();

  const links = {
    doctor: [
      { name: "Dashboard", path: "/doctor-dashboard" },
      { name: "Manage Availability", path: "/doctor/manage-availability" },
      { name: "Today's Queue", path: "/doctor/queue" },
    ],
    patient: [
      { name: "Dashboard", path: "/patient-dashboard" },
      { name: "Doctors", path: "/patient/doctors" },
      { name: "Appointments", path: "/patient/appointments" },
    ],
    admin: [
      { name: "Dashboard", path: "/admin-dashboard" },
    ],
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Overlay */}
          <motion.div
            className="fixed inset-0 bg-black bg-opacity-30 z-40"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
          />

          {/* Drawer */}
          <motion.div
            className="fixed top-0 left-0 h-full w-64 bg-white shadow-soft z-50 p-6 rounded-r-2xl"
            initial={{ x: -320 }}
            animate={{ x: 0 }}
            exit={{ x: -320 }}
            transition={{ duration: 0.3 }}
          >
            <h3 className="text-xl font-semibold text-primary mb-6">
              HealthSync
            </h3>

            <div className="flex flex-col gap-3 text-sm font-medium">

              {links[role]?.map((item, index) => (
                <motion.div
                  key={item.path}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.05 }}
                  onClick={() => {
                    navigate(item.path);
                    onClose();
                  }}
                  className={`cursor-pointer p-3 rounded-xl2 transition
                    ${
                      location.pathname === item.path
                        ? "bg-blue-100 text-primary shadow-card"
                        : "hover:bg-blue-50 hover:text-primary"
                    }
                  `}
                >
                  {item.name}
                </motion.div>
              ))}

            </div>

          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}

export default SidebarDrawer;