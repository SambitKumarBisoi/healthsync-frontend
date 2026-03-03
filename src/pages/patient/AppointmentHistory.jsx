import { useEffect, useState } from "react";
import axiosInstance from "../../api/axiosInstance";
import Spinner from "../../components/ui/Spinner";

function AppointmentHistory() {
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchAppointments = async () => {
    try {
      setLoading(true);

      const res = await axiosInstance.get("/api/appointments/my");

      setAppointments(res.data.appointments || []);
    } catch (error) {
      console.error(
        "Fetch appointments error:",
        error.response?.data || error.message
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAppointments();
  }, []);

  return (
    <div className="space-y-6">

      <h2 className="text-2xl font-semibold text-primary">
        Appointment History
      </h2>

      {loading ? (
        <Spinner />
      ) : (
        <div className="space-y-4">

          {appointments.length === 0 && (
            <div className="bg-white p-6 rounded-xl2 shadow-card text-gray-500">
              No appointments found.
            </div>
          )}

          {appointments.map((appt) => (
            <div
              key={appt._id}
              className="bg-white p-6 rounded-xl2 shadow-card"
            >
              <div className="flex justify-between items-center">

                <div>
                  <p className="font-semibold text-primary">
                    Date: {new Date(appt.appointmentDate).toLocaleDateString()}
                  </p>

                  <p className="text-sm text-gray-600">
                    Slot: {appt.slotTime}
                  </p>

                  <p className="text-sm text-gray-600">
                    Queue Number: {appt.queueNumber}
                  </p>
                </div>

                <div>
                  <span
                    className={`px-3 py-1 rounded-full text-xs font-medium
                      ${
                        appt.status === "COMPLETED"
                          ? "bg-green-100 text-green-700"
                          : appt.status === "CANCELLED"
                          ? "bg-red-100 text-red-700"
                          : "bg-yellow-100 text-yellow-700"
                      }
                    `}
                  >
                    {appt.status}
                  </span>
                </div>

              </div>
            </div>
          ))}

        </div>
      )}
    </div>
  );
}

export default AppointmentHistory;