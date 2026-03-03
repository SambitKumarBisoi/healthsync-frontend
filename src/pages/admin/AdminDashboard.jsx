import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../context/AuthContext";
import axiosInstance from "../../api/axiosInstance";
import { motion } from "framer-motion";
import Spinner from "../../components/ui/Spinner";

function AdminDashboard() {
  const { user } = useContext(AuthContext);
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchDashboardStats();
  }, []);

  const fetchDashboardStats = async () => {
    try {
      setLoading(true);
      const res = await axiosInstance.get("/api/admin/dashboard");
      setStats(res.data.data);
    } catch (error) {
      console.error(
        "Admin dashboard fetch error:",
        error.response?.data || error.message
      );
    } finally {
      setLoading(false);
    }
  };

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
          Admin Control Panel & System Analytics
        </p>
      </motion.div>

      {loading ? (
        <Spinner />
      ) : stats ? (
        <>
          {/* ===== DOCTOR STATS ===== */}
          <SectionTitle title="Doctor Overview" />

          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <StatCard title="Total Doctors" value={stats.doctors.total} delay={0.2} />
            <StatCard title="Active Doctors" value={stats.doctors.active} delay={0.3} />
            <StatCard title="Pending Doctors" value={stats.doctors.pending} delay={0.4} />
            <StatCard title="Suspended Doctors" value={stats.doctors.suspended} delay={0.5} />
          </div>

          {/* ===== PATIENT STATS ===== */}
          <SectionTitle title="Patient Overview" />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <StatCard title="Total Patients" value={stats.patients.total} delay={0.6} />
          </div>

          {/* ===== APPOINTMENT STATS ===== */}
          <SectionTitle title="Appointment Overview" />

          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <StatCard title="Total Appointments" value={stats.appointments.total} delay={0.7} />
            <StatCard title="Today's Appointments" value={stats.appointments.today} delay={0.8} />
            <StatCard title="Completed" value={stats.appointments.completed} delay={0.9} />
            <StatCard title="Pending" value={stats.appointments.pending} delay={1.0} />
          </div>
        </>
      ) : (
        <div className="bg-white p-6 rounded-xl2 shadow-card text-gray-500">
          No data available.
        </div>
      )}
    </motion.div>
  );
}

function SectionTitle({ title }) {
  return (
    <h3 className="text-lg font-semibold text-primary mt-4">
      {title}
    </h3>
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

export default AdminDashboard;