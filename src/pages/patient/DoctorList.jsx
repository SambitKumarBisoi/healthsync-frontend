import { useEffect, useState } from "react";
import axiosInstance from "../../api/axiosInstance";
import { useNavigate } from "react-router-dom";
import Spinner from "../../components/ui/Spinner";

function DoctorList() {
  const [doctors, setDoctors] = useState([]);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    fetchDoctors();
  }, []);

  const fetchDoctors = async () => {
    try {
      setLoading(true);
      const res = await axiosInstance.get("/api/users/doctors");
      setDoctors(res.data.doctors);
    } catch (error) {
      console.error("Fetch doctors error:", error.response?.data || error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-8">

      {/* Page Header */}
      <div>
        <h2 className="text-2xl font-semibold text-primary">
          Available Doctors
        </h2>
        <p className="text-sm text-gray-500 mt-1">
          Choose a doctor to view availability and book appointment.
        </p>
      </div>

      {loading ? (
        <Spinner />
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">

          {doctors.length === 0 && (
            <div className="bg-white p-6 rounded-xl2 shadow-card text-gray-500">
              No doctors available.
            </div>
          )}

          {doctors.map((doctor) => (
            <div
              key={doctor._id}
              className="bg-white p-6 rounded-xl2 shadow-card hover:shadow-soft hover:-translate-y-1 transition duration-300"
            >

              {/* Doctor Avatar Placeholder */}
              <div className="w-14 h-14 bg-blue-100 rounded-full flex items-center justify-center text-primary font-bold text-lg mb-4">
                {doctor.name?.charAt(0)}
              </div>

              <h3 className="text-lg font-semibold text-gray-800">
                Dr. {doctor.name}
              </h3>

              <p className="text-sm text-gray-500 mt-1">
                {doctor.email}
              </p>

              {/* Status Badge */}
              <div className="mt-3">
                <span className="text-xs bg-green-100 text-green-700 px-3 py-1 rounded-full">
                  Active
                </span>
              </div>

              {/* View Availability Button */}
              <button
                onClick={() => navigate(`/patient/doctor/${doctor._id}/availability`)}
                className="mt-5 w-full bg-primary text-white py-2 rounded-xl2 hover:scale-[1.02] active:scale-95 transition"
              >
                View Availability
              </button>

            </div>
          ))}

        </div>
      )}

    </div>
  );
}

export default DoctorList;