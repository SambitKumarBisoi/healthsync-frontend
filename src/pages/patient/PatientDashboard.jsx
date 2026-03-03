import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";

function PatientDashboard() {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  return (
    <div className="space-y-6">

      {/* Welcome Banner */}
      <div className="bg-gradient-to-r from-blue-500 to-blue-400 text-white p-6 rounded-xl2 shadow-soft">
        <h2 className="text-2xl font-semibold">
          Welcome back, {user?.name}
        </h2>
        <p className="text-sm mt-1 opacity-90">
          Manage your appointments and consultations.
        </p>
      </div>

      {/* Stats Section */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <StatCard title="Total Appointments" value="12" />
        <StatCard title="Upcoming" value="3" />
        <StatCard title="Completed" value="9" />
      </div>

      {/* Quick Actions Section */}
      <div>
        <h3 className="text-lg font-semibold text-gray-700 mb-4">
          Quick Actions
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

          <ActionCard
            title="Book Appointment"
            description="Browse doctors and schedule a consultation."
            onClick={() => navigate("/patient/doctors")}
          />

          <ActionCard
            title="Appointment History"
            description="View past consultations and payment history."
            onClick={() => navigate("/patient/appointments")}
          />

        </div>
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

function ActionCard({ title, description, onClick }) {
  return (
    <div
      onClick={onClick}
      className="bg-white p-6 rounded-xl2 shadow-card hover:-translate-y-1 hover:shadow-soft transition cursor-pointer"
    >
      <h3 className="text-lg font-semibold text-primary">
        {title}
      </h3>
      <p className="text-sm text-gray-500 mt-2">
        {description}
      </p>
    </div>
  );
}

export default PatientDashboard;