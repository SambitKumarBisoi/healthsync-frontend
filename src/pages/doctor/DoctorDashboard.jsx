import { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";

function DoctorDashboard() {
  const { user } = useContext(AuthContext);

  return (
    <div className="space-y-8">

      <div className="bg-gradient-to-r from-blue-500 to-blue-400 text-white p-6 rounded-xl2 shadow-soft">
        <h2 className="text-2xl font-semibold">
          Welcome back, {user?.name}
        </h2>
        <p className="text-sm mt-1 opacity-90">
          Manage your appointments and consultations.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <StatCard title="Total Appointments" value="12" />
        <StatCard title="Upcoming" value="3" />
        <StatCard title="Completed" value="9" />
      </div>

    </div>
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

export default DoctorDashboard;