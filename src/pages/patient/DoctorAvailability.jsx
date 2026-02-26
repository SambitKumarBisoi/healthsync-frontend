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
  }, []);

  const fetchAvailability = async () => {
    try {
      setLoading(true);
      const res = await axiosInstance.get(
        `/api/doctor/doctors/${doctorId}/availability`
      );
      setAvailability(res.data.availability);
    } catch (error) {
      console.error("Availability fetch error:", error.response?.data || error.message);
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
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

          {availability.length === 0 && (
            <div className="bg-white p-6 rounded-xl2 shadow-card text-gray-500">
              No availability found.
            </div>
          )}

          {availability.map((slot) => (
            <div
              key={slot._id}
              className="bg-white p-6 rounded-xl2 shadow-card hover:shadow-soft transition"
            >
              <h3 className="font-semibold text-primary">
                {slot.dayOfWeek}
              </h3>

              <p className="text-sm text-gray-600 mt-2">
                {slot.startTime} – {slot.endTime}
              </p>

              <p className="text-xs text-gray-400 mt-1">
                Slot Duration: {slot.slotDuration} minutes
              </p>
            </div>
          ))}

        </div>
      )}
    </div>
  );
}

export default DoctorAvailability;