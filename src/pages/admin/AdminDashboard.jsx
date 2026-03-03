import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../context/AuthContext";
import axiosInstance from "../../api/axiosInstance";
import { motion } from "framer-motion";
import Spinner from "../../components/ui/Spinner";

import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  BarElement,
} from "chart.js";

import { Pie, Bar } from "react-chartjs-2";

ChartJS.register(
  ArcElement,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  BarElement
);

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

  if (loading) return <Spinner />;

  if (!stats)
    return (
      <div className="bg-white p-6 rounded-xl2 shadow-card">
        No data available.
      </div>
    );

  /* ================= CHART DATA ================= */

  const appointmentPieData = {
    labels: ["Completed", "Pending", "Cancelled"],
    datasets: [
      {
        data: [
          stats.appointments.completed,
          stats.appointments.pending,
          stats.appointments.cancelled,
        ],
        backgroundColor: ["#10B981", "#F59E0B", "#EF4444"],
        borderWidth: 1,
      },
    ],
  };

  const doctorBarData = {
    labels: ["Active", "Pending", "Suspended"],
    datasets: [
      {
        label: "Doctors",
        data: [
          stats.doctors.active,
          stats.doctors.pending,
          stats.doctors.suspended,
        ],
        backgroundColor: "#3B82F6",
      },
    ],
  };

  return (
    <motion.div
      className="space-y-10"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
    >
      {/* HEADER */}
      <motion.div
        className="bg-gradient-to-r from-blue-500 to-blue-400 text-white p-6 rounded-xl2 shadow-soft"
      >
        <h2 className="text-2xl font-semibold">
          Welcome back, {user?.name}
        </h2>
        <p className="text-sm mt-1 opacity-90">
          Admin Control Panel & System Analytics
        </p>
      </motion.div>

      {/* STATS CARDS */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <StatCard title="Total Doctors" value={stats.doctors.total} />
        <StatCard title="Total Patients" value={stats.patients.total} />
        <StatCard title="Total Appointments" value={stats.appointments.total} />
        <StatCard title="Today's Appointments" value={stats.appointments.today} />
      </div>

      {/* CHART SECTION */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">

        <div className="bg-white p-6 rounded-xl2 shadow-card">
          <h3 className="text-lg font-semibold text-primary mb-4">
            Appointment Status Distribution
          </h3>
          <Pie data={appointmentPieData} />
        </div>

        <div className="bg-white p-6 rounded-xl2 shadow-card">
          <h3 className="text-lg font-semibold text-primary mb-4">
            Doctor Account Status
          </h3>
          <Bar data={doctorBarData} />
        </div>

      </div>
    </motion.div>
  );
}

function StatCard({ title, value }) {
  return (
    <div className="bg-white p-6 rounded-xl2 shadow-card hover:-translate-y-1 transition">
      <h3 className="text-gray-500 text-sm">{title}</h3>
      <p className="text-3xl font-bold text-primary mt-2">{value}</p>
    </div>
  );
}

export default AdminDashboard;