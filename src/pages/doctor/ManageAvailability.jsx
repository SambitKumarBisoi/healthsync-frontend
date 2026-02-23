import { useState, useEffect } from "react";
import axiosInstance from "../../api/axiosInstance";
import Spinner from "../../components/ui/Spinner";

function ManageAvailability() {
  const [availabilityList, setAvailabilityList] = useState([]);
  const [loading, setLoading] = useState(false);

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
      setLoading(true);
      const res = await axiosInstance.get("/api/doctor/availability");
      setAvailabilityList(res.data.availability);
    } catch (error) {
      console.error("Fetch availability error:", error.response?.data || error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleCreate = async (e) => {
    e.preventDefault();

    try {
      await axiosInstance.post("/api/doctor/availability", formData);

      fetchAvailability();

      setFormData({
        dayOfWeek: "",
        startTime: "",
        endTime: "",
        slotDuration: 30,
      });
    } catch (error) {
      console.error("Create error:", error.response?.data || error.message);
    }
  };

  const handleDisable = async (id) => {
    try {
      await axiosInstance.patch(`/api/doctor/availability/${id}/disable`);
      fetchAvailability();
    } catch (error) {
      console.error("Disable error:", error.response?.data || error.message);
    }
  };

  return (
    <div className="space-y-8">

      <h2 className="text-2xl font-semibold text-primary">
        Manage Availability
      </h2>

      <form
        onSubmit={handleCreate}
        className="bg-white p-6 rounded-xl2 shadow-card grid grid-cols-1 md:grid-cols-4 gap-4"
      >

        <select
          name="dayOfWeek"
          value={formData.dayOfWeek}
          onChange={handleChange}
          required
          className="border border-borderlight rounded-xl2 px-3 py-2"
        >
          <option value="">Select Day</option>
          <option value="Monday">Monday</option>
          <option value="Tuesday">Tuesday</option>
          <option value="Wednesday">Wednesday</option>
          <option value="Thursday">Thursday</option>
          <option value="Friday">Friday</option>
          <option value="Saturday">Saturday</option>
          <option value="Sunday">Sunday</option>
        </select>

        <input
          type="time"
          name="startTime"
          value={formData.startTime}
          onChange={handleChange}
          required
          className="border border-borderlight rounded-xl2 px-3 py-2"
        />

        <input
          type="time"
          name="endTime"
          value={formData.endTime}
          onChange={handleChange}
          required
          className="border border-borderlight rounded-xl2 px-3 py-2"
        />

        <input
          type="number"
          name="slotDuration"
          value={formData.slotDuration}
          onChange={handleChange}
          min="5"
          className="border border-borderlight rounded-xl2 px-3 py-2"
        />

        <button
          type="submit"
          className="md:col-span-4 bg-primary text-white py-2 rounded-xl2 hover:scale-[1.02] transition"
        >
          Create Availability
        </button>

      </form>

      <div className="bg-white p-6 rounded-xl2 shadow-card">

  <h3 className="text-lg font-semibold mb-4 text-gray-700">
    Weekly Schedule
  </h3>

  {loading ? (
    <Spinner />
  ) : (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

      {availabilityList.length === 0 && (
        <p className="text-gray-500 text-sm">
          No availability set yet.
        </p>
      )}

      {availabilityList.map((item) => (
        <div
          key={item._id}
          className="border border-borderlight rounded-xl2 p-4 hover:shadow-soft transition"
        >
          <div className="flex justify-between items-center">

            <div>
              <p className="font-semibold text-primary">
                {item.dayOfWeek}
              </p>
              <p className="text-sm text-gray-500 mt-1">
                {item.startTime} – {item.endTime}
              </p>
              <p className="text-xs text-gray-400 mt-1">
                Slot: {item.slotDuration} minutes
              </p>
            </div>

            <button
              onClick={() => handleDisable(item._id)}
              className="text-red-500 text-sm hover:underline"
            >
              Disable
            </button>

          </div>
        </div>
      ))}

    </div>
  )}

</div>

</div>

  );

}

export default ManageAvailability;