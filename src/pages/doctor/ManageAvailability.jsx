import { useState, useEffect } from "react";
import axiosInstance from "../../api/axiosInstance";
import Toast from "../../components/Toast";
import { motion, AnimatePresence } from "framer-motion";

function ManageAvailability() {
  const [availabilityList, setAvailabilityList] = useState([]);
  const [toast, setToast] = useState(null);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const [formData, setFormData] = useState({
    dayOfWeek: "",
    startTime: "",
    endTime: "",
    slotDuration: 30,
  });

  useEffect(() => {
    fetchAvailability();
  }, []);

  const fetchAvailability = async () => {
    try {
      const res = await axiosInstance.get("/api/doctor/availability");
      setAvailabilityList(res.data.availability);
    } catch (error) {
      console.error(error);
    }
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axiosInstance.post("/api/doctor/availability", formData);
      setToast({
        message: "Availability created successfully",
        type: "success",
      });
      fetchAvailability();
    } catch (error) {
      setToast({
        message:
          error.response?.data?.message ||
          "Failed to create availability",
        type: "error",
      });
    }
  };

  const handleDisableBlock = async (id) => {
    try {
      await axiosInstance.patch(
        `/api/doctor/availability/${id}/disable`
      );
      setToast({
        message: "Availability disabled",
        type: "success",
      });
      fetchAvailability();
    } catch {
      setToast({
        message: "Failed to disable availability",
        type: "error",
      });
    }
  };

  const handleDisableSlot = async (availabilityId, slot) => {
    try {
      await axiosInstance.patch(
        `/api/doctor/availability/${availabilityId}/disable-slot`,
        { slot }
      );
      setToast({
        message: "Slot disabled",
        type: "success",
      });
      fetchAvailability();
    } catch {
      setToast({
        message: "Failed to disable slot",
        type: "error",
      });
    }
  };

  return (
    <div className="relative min-h-screen">

      {/* ===== MAIN CONTENT ===== */}
      <motion.div
        className="space-y-8"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
      >
        <h2 className="text-2xl font-semibold text-primary">
          Manage Availability
        </h2>

        {/* FORM */}
        <motion.form
          onSubmit={handleSubmit}
          className="bg-white p-6 rounded-xl2 shadow-card grid grid-cols-1 md:grid-cols-4 gap-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.1 }}
        >
          <select
            name="dayOfWeek"
            value={formData.dayOfWeek}
            onChange={handleChange}
            required
            className="border rounded px-3 py-2"
          >
            <option value="">Select Day</option>
            <option>Monday</option>
            <option>Tuesday</option>
            <option>Wednesday</option>
            <option>Thursday</option>
            <option>Friday</option>
            <option>Saturday</option>
            <option>Sunday</option>
          </select>

          <input
            type="time"
            name="startTime"
            value={formData.startTime}
            onChange={handleChange}
            required
            className="border rounded px-3 py-2"
          />

          <input
            type="time"
            name="endTime"
            value={formData.endTime}
            onChange={handleChange}
            required
            className="border rounded px-3 py-2"
          />

          <select
            name="slotDuration"
            value={formData.slotDuration}
            onChange={handleChange}
            className="border rounded px-3 py-2"
          >
            <option value={15}>15 min</option>
            <option value={30}>30 min</option>
            <option value={45}>45 min</option>
            <option value={60}>60 min</option>
          </select>

          <motion.button
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            type="submit"
            className="md:col-span-4 bg-blue-600 text-white py-2 rounded"
          >
            Create Availability
          </motion.button>
        </motion.form>

        {/* AVAILABILITY LIST */}
        <motion.div layout className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {availabilityList.map((item, index) => (
            <motion.div
              layout
              key={item._id}
              className="border p-4 rounded bg-white shadow-card"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <p className="font-semibold">
                {item.dayOfWeek}
              </p>
              <p>
                {item.startTime} - {item.endTime}
              </p>

              <div className="mt-2 flex flex-wrap gap-2">
                {item.slots?.map((slot, i) => (
                  <motion.div
                    key={i}
                    layout
                    className="flex items-center gap-1 bg-blue-100 px-2 py-1 rounded text-xs"
                  >
                    <span>{slot}</span>
                    <button
                      onClick={() =>
                        handleDisableSlot(item._id, slot)
                      }
                      className="text-red-500 ml-1"
                    >
                      ✕
                    </button>
                  </motion.div>
                ))}
              </div>

              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() =>
                  handleDisableBlock(item._id)
                }
                className="mt-3 text-red-600 text-sm"
              >
                Disable Entire Availability
              </motion.button>
            </motion.div>
          ))}
        </motion.div>

        {toast && (
          <Toast
            message={toast.message}
            type={toast.type}
            onClose={() => setToast(null)}
          />
        )}
      </motion.div>
    </div>
  );
}

export default ManageAvailability;