import { useEffect, useState, useRef } from "react";
import axiosInstance from "../../api/axiosInstance";
import Spinner from "../../components/ui/Spinner";
import { io } from "socket.io-client";
import { motion } from "framer-motion";

function DoctorQueue() {
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(false);
  const socketRef = useRef(null);

  const today = new Date();

  const fetchAppointments = async () => {
    try {
      setLoading(true);

      const res = await axiosInstance.get("/api/appointments/doctor");

      const todaysAppointments = res.data.appointments.filter(
        (appt) =>
          new Date(appt.appointmentDate).toDateString() ===
          today.toDateString()
      );

      setAppointments(todaysAppointments);

    } catch (error) {
      console.error(
        "Fetch doctor appointments error:",
        error.response?.data || error.message
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAppointments();
  }, []);

  useEffect(() => {
    socketRef.current = io(
      "https://healthsync-backend-production.onrender.com"
    );

    socketRef.current.on("queueUpdated", () => {
      fetchAppointments();
    });

    return () => {
      socketRef.current.disconnect();
    };
  }, []);

  const handleComplete = async (id) => {
    try {
      await axiosInstance.put(`/api/appointments/${id}/complete`);
      fetchAppointments();
    } catch (error) {
      alert("Failed to complete appointment");
    }
  };

  return (
    <motion.div
      className="space-y-6"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
    >

      <h2 className="text-2xl font-semibold text-primary">
        Today's Queue
      </h2>

      {loading ? (
        <Spinner />
      ) : (
        <motion.div layout className="space-y-4">

          {appointments.length === 0 && (
            <div className="bg-white p-6 rounded-xl2 shadow-card text-gray-500">
              No appointments for today.
            </div>
          )}

          {appointments
            .sort((a, b) => a.queueNumber - b.queueNumber)
            .map((appt, index) => (
              <motion.div
                layout
                key={appt._id}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="bg-white p-6 rounded-xl2 shadow-card flex justify-between items-center"
              >
                <div>
                  <p className="font-semibold text-primary">
                    {appt.patient?.name}
                  </p>

                  <p className="text-sm text-gray-600">
                    Email: {appt.patient?.email}
                  </p>

                  <p className="text-sm text-gray-600">
                    Date: {new Date(appt.appointmentDate).toLocaleDateString()}
                  </p>

                  <p className="text-sm text-gray-600">
                    Weekday:{" "}
                    {new Date(appt.appointmentDate).toLocaleDateString(
                      "en-US",
                      { weekday: "long" }
                    )}
                  </p>

                  <p className="text-sm text-gray-600">
                    Slot: {appt.slotTime}
                  </p>

                  <p className="text-sm text-gray-600">
                    Queue Number: {appt.queueNumber}
                  </p>

                  <p className="text-sm">
                    Status:{" "}
                    <span className="font-medium">
                      {appt.queueStatus}
                    </span>
                  </p>
                </div>

                {appt.queueStatus !== "COMPLETED" && (
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => handleComplete(appt._id)}
                    className="bg-primary text-white px-4 py-2 rounded-xl2"
                  >
                    Complete
                  </motion.button>
                )}
              </motion.div>
            ))}

        </motion.div>
      )}
    </motion.div>
  );
}

export default DoctorQueue;