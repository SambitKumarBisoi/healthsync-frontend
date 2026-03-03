import { useEffect, useState, useRef } from "react";
import { useParams } from "react-router-dom";
import axiosInstance from "../../api/axiosInstance";
import Spinner from "../../components/ui/Spinner";
import { io } from "socket.io-client";

function DoctorAvailability() {
  const { doctorId } = useParams();

  const [availability, setAvailability] = useState([]);
  const [selectedDate, setSelectedDate] = useState("");
  const [selectedSlot, setSelectedSlot] = useState(null);
  const [loading, setLoading] = useState(false);
  const [bookingLoading, setBookingLoading] = useState(false);

  const socketRef = useRef(null);

  /* ================= FETCH AVAILABILITY ================= */
  const fetchAvailability = async () => {
    if (!selectedDate) return;

    try {
      setLoading(true);

      const res = await axiosInstance.get(
        `/api/doctor/doctors/${doctorId}/availability`,
        {
          params: { date: selectedDate },
        }
      );

      setAvailability(res.data.availability);
    } catch (error) {
      console.error(
        "Availability fetch error:",
        error.response?.data || error.message
      );
    } finally {
      setLoading(false);
    }
  };

  /* ================= DATE CHANGE ================= */
  useEffect(() => {
    if (selectedDate) {
      fetchAvailability();
    }
  }, [selectedDate]);

  /* ================= REAL-TIME SOCKET ================= */
  useEffect(() => {
    if (!selectedDate) return;

    socketRef.current = io(
      "https://healthsync-backend-production.onrender.com"
    );

    // Join doctor-date room
    socketRef.current.emit("joinQueueRoom", {
      doctorId,
      date: selectedDate,
    });

    // Listen for slotBooked event
    socketRef.current.on("slotBooked", (data) => {
      if (
        data.doctorId === doctorId &&
        data.appointmentDate === selectedDate
      ) {
        fetchAvailability();
      }
    });

    return () => {
      socketRef.current.disconnect();
    };
  }, [selectedDate, doctorId]);

  /* ================= BOOK APPOINTMENT ================= */
  const handleBookAppointment = async () => {
    if (!selectedSlot) return;

    try {
      setBookingLoading(true);

      await axiosInstance.post("/api/appointments", {
        doctorId,
        appointmentDate: selectedDate,
        slotTime: selectedSlot,
      });

      alert("Appointment booked successfully!");

      setSelectedSlot(null);
      fetchAvailability(); // manual refresh still safe

    } catch (error) {
      alert(error.response?.data?.message || "Booking failed");
    } finally {
      setBookingLoading(false);
    }
  };

  return (
    <div className="space-y-6">

      <h2 className="text-2xl font-semibold text-primary">
        Select Date & Slot
      </h2>

      {/* Date Picker */}
      <input
        type="date"
        value={selectedDate}
        min={new Date().toISOString().split("T")[0]}
        onChange={(e) => setSelectedDate(e.target.value)}
        className="border p-2 rounded-xl2"
      />

      {loading ? (
        <Spinner />
      ) : (
        <div className="space-y-6">

          {availability.length === 0 && selectedDate && (
            <div className="bg-white p-6 rounded-xl2 shadow-card text-gray-500">
              No available slots for selected date.
            </div>
          )}

          {availability.map((day) => (
            <div key={day._id} className="bg-white p-6 rounded-xl2 shadow-card">
              <h3 className="font-semibold text-primary mb-4">
                {day.dayOfWeek}
              </h3>

              <div className="flex flex-wrap gap-3">
                {day.slots.map((slot) => (
                  <button
                    key={slot}
                    onClick={() => setSelectedSlot(slot)}
                    className={`px-4 py-2 rounded-full border transition
                      ${
                        selectedSlot === slot
                          ? "bg-primary text-white"
                          : "bg-gray-100 hover:bg-primary hover:text-white"
                      }
                    `}
                  >
                    {slot}
                  </button>
                ))}
              </div>
            </div>
          ))}

          {selectedSlot && (
            <button
              onClick={handleBookAppointment}
              disabled={bookingLoading}
              className="mt-4 bg-primary text-white px-6 py-2 rounded-xl2"
            >
              {bookingLoading ? "Booking..." : "Confirm Booking"}
            </button>
          )}

        </div>
      )}
    </div>
  );
}

export default DoctorAvailability;