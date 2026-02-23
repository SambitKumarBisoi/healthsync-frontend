import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../../api/axiosInstance";
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
  return <div>Doctor List Page</div>;

  return (
    <div className="space-y-6">

      <h2 className="text-2xl font-semibold text-primary">
        Available Doctors
      </h2>

      {loading ? (
        <Spinner />
      ) : (
        <div className="grid md:grid-cols-3 gap-6">

          {doctors.length === 0 && (
            <p className="text-gray-500">
              No doctors available.
            </p>
          )}

          {doctors.map((doctor) => (
            <div
              key={doctor._id}
              className="bg-white p-6 rounded-xl2 shadow-card hover:-translate-y-1 transition cursor-pointer"
              onClick={() => navigate(`/patient/doctors/${doctor._id}`)}
            >
              <h3 className="font-semibold text-primary">
                Dr. {doctor.name}
              </h3>
              <p className="text-sm text-gray-500 mt-2">
                {doctor.email}
              </p>
            </div>
          ))}

        </div>
      )}

    </div>
  );
}

export default DoctorList;