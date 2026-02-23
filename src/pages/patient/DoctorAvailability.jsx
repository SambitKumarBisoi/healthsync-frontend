import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axiosInstance from "../../api/axiosInstance";
import Spinner from "../../components/ui/Spinner";

function DoctorAvailability() {
  const { doctorId } = useParams();
  const [availability, setAvailability] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchAvailability();
  }, [doctorId]);

  const fetchAvailability = async () => {
    try {
      setLoading(true);
      const res = await axiosInstance.get(
        `/api/doctor/doctors/${doctorId}/availability`
      );
      setAvailability(res.data.availability);
    } catch (error) {
      console.error("Fetch availability error:", error.response?.data || error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6">

      <h2 className="text-2xl font-semibold text-primary">
        Doctor Availability
      </h2>

      {loading ? (
        <Spinner />
      ) : (
        <div className="grid md:grid-cols-2 gap-6">

          {availability.length === 0 && (
            <p className="text-gray-500">
              No availability set yet.
            </p>
          )}

          {availability.map((item) => (
            <div
              key={item._id}
              className="bg-white p-6 rounded-xl2 shadow-card hover:-translate-y-1 transition"
            >
              <p className="font-semibold text-primary">
                {item.dayOfWeek}
              </p>
              <p className="text-sm text-gray-500 mt-1">
                {item.startTime} - {item.endTime}
              </p>
              <p className="text-xs text-gray-400 mt-1">
                Slot Duration: {item.slotDuration} mins
              </p>
            </div>
          ))}

        </div>
      )}

    </div>
  );
}

export default DoctorAvailability;