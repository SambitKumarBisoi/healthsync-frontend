import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../context/AuthContext";
import axiosInstance from "../../api/axiosInstance";
import { motion } from "framer-motion";
import Spinner from "../../components/ui/Spinner";
import CountUp from "react-countup";

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

  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  useEffect(() => {
    fetchDashboardStats();
  }, []);

  const fetchDashboardStats = async () => {
    try {
      setLoading(true);

      let url = "/api/admin/dashboard";

      if (startDate && endDate) {
        url += `?start=${startDate}&end=${endDate}`;
      }

      const res = await axiosInstance.get(url);
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

  const patientPieData = {
    labels: ["Total Patients"],
    datasets: [
      {
        data: [stats.patients.total],
        backgroundColor: ["#8B5CF6"],
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
      <motion.div className="bg-gradient-to-r from-blue-500 to-blue-400 text-white p-6 rounded-xl2 shadow-soft">
        <h2 className="text-2xl font-semibold">
          Welcome back, {user?.name}
        </h2>
        <p className="text-sm mt-1 opacity-90">
          Admin Control Panel & System Analytics
        </p>
      </motion.div>

      {/* DATE FILTER */}
      <motion.div
        className="bg-white p-6 rounded-xl2 shadow-card flex flex-col md:flex-row gap-4 items-end"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
      >
        <div>
          <label className="text-sm text-gray-500">Start Date</label>
          <input
            type="date"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
            className="border rounded px-3 py-2 block"
          />
        </div>

        <div>
          <label className="text-sm text-gray-500">End Date</label>
          <input
            type="date"
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
            className="border rounded px-3 py-2 block"
          />
        </div>

        <button
          onClick={fetchDashboardStats}
          className="bg-primary text-white px-4 py-2 rounded-xl2"
        >
          Apply Filter
        </button>
      </motion.div>

      {/* STATS CARDS */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <StatCard title="Total Doctors" value={stats.doctors.total} />
        <StatCard title="Total Patients" value={stats.patients.total} />
        <StatCard title="Total Appointments" value={stats.appointments.total} />
        <StatCard title="Today's Appointments" value={stats.appointments.today} />
      </div>

      {/* CHART SECTION */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">

        <ChartCard title="Appointment Status">
          <Pie data={appointmentPieData} />
        </ChartCard>

        <ChartCard title="Doctor Account Status">
          <Bar data={doctorBarData} />
        </ChartCard>

        <ChartCard title="Patient Overview">
          <Pie data={patientPieData} />
        </ChartCard>

      </div>
    </motion.div>
  );
}

function StatCard({ title, value }) {
  return (
    <motion.div
      className="bg-white p-6 rounded-xl2 shadow-card hover:-translate-y-1 transition"
      whileHover={{ scale: 1.03 }}
    >
      <h3 className="text-gray-500 text-sm">{title}</h3>
      <p className="text-3xl font-bold text-primary mt-2">
        <CountUp end={value} duration={1.5} />
      </p>
    </motion.div>
  );
}

function ChartCard({ title, children }) {
  return (
    <motion.div
      className="bg-white p-6 rounded-xl2 shadow-card"
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.4 }}
    >
      <h3 className="text-lg font-semibold text-primary mb-4">
        {title}
      </h3>
      {children}
    </motion.div>
  );
}

export default AdminDashboard;