import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import { motion } from "framer-motion";

function DoctorDashboard() {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  return (
    <motion.div
      className="space-y-8"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
    >

      <motion.div
        className="bg-gradient-to-r from-blue-500 to-blue-400 text-white p-6 rounded-xl2 shadow-soft"
        initial={{ opacity: 0, scale: 0.98 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.1 }}
      >
        <h2 className="text-2xl font-semibold">
          Welcome back, {user?.name}
        </h2>
        <p className="text-sm mt-1 opacity-90">
          Manage your appointments and consultations.
        </p>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <StatCard title="Total Appointments" value="12" delay={0.2} />
        <StatCard title="Upcoming" value="3" delay={0.3} />
        <StatCard title="Completed" value="9" delay={0.4} />
      </div>

    </motion.div>
  );
}

function StatCard({ title, value, delay }) {
  return (
    <motion.div
      className="bg-white p-6 rounded-xl2 shadow-card hover:-translate-y-1 transition"
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay }}
    >
      <h3 className="text-gray-500 text-sm">{title}</h3>
      <p className="text-3xl font-bold text-primary mt-2">{value}</p>
    </motion.div>
  );
}

export default DoctorDashboard;