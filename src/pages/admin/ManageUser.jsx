import { useEffect, useState } from "react";
import axiosInstance from "../../api/axiosInstance";
import { motion } from "framer-motion";
import Spinner from "../../components/ui/Spinner";

function ManageUsers() {
  const [doctors, setDoctors] = useState([]);
  const [loading, setLoading] = useState(false);

  /* ================= FETCH DOCTORS ================= */

  const fetchDoctors = async () => {
    try {
      setLoading(true);

      const res = await axiosInstance.get("/api/admin/doctors");

      setDoctors(res.data.doctors || []);
    } catch (error) {
      console.error(
        "Doctor fetch error:",
        error.response?.data || error.message
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDoctors();
  }, []);

  /* ================= ACTIONS ================= */

  const approveDoctor = async (id) => {
    try {
      await axiosInstance.patch(`/api/admin/doctors/${id}/approve`);
      fetchDoctors();
    } catch (error) {
      console.error(
        "Approve doctor error:",
        error.response?.data || error.message
      );
    }
  };

  const rejectDoctor = async (id) => {
    try {
      await axiosInstance.patch(`/api/admin/doctors/${id}/reject`);
      fetchDoctors();
    } catch (error) {
      console.error(
        "Reject doctor error:",
        error.response?.data || error.message
      );
    }
  };

  const suspendDoctor = async (id) => {
    try {
      await axiosInstance.patch(`/api/admin/doctors/${id}/suspend`);
      fetchDoctors();
    } catch (error) {
      console.error(
        "Suspend doctor error:",
        error.response?.data || error.message
      );
    }
  };

  /* ================= STATUS BADGE ================= */

  const getStatusBadge = (status) => {
    if (status === "ACTIVE") return "bg-green-100 text-green-700";
    if (status === "PENDING_VERIFICATION") return "bg-yellow-100 text-yellow-700";
    if (status === "SUSPENDED") return "bg-red-100 text-red-700";
    if (status === "REJECTED") return "bg-gray-200 text-gray-700";

    return "bg-gray-100 text-gray-600";
  };

  /* ================= LOADING ================= */

  if (loading) return <Spinner />;

  /* ================= UI ================= */

  return (
    <motion.div
      className="space-y-8"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
    >
      {/* HEADER */}

      <motion.div className="bg-gradient-to-r from-blue-500 to-blue-400 text-white p-6 rounded-xl2 shadow-soft">
        <h2 className="text-2xl font-semibold">
          Doctor Verification Panel
        </h2>

        <p className="text-sm mt-1 opacity-90">
          Manage doctor registrations and approvals
        </p>
      </motion.div>

      {/* DOCTOR TABLE */}

      <div className="bg-white rounded-xl2 shadow-card overflow-x-auto">
        <table className="min-w-full">
          <thead className="bg-gray-100">
            <tr>
              <th className="px-6 py-3 text-left text-sm font-semibold">
                Name
              </th>

              <th className="px-6 py-3 text-left text-sm font-semibold">
                Email
              </th>

              <th className="px-6 py-3 text-left text-sm font-semibold">
                Phone
              </th>

              <th className="px-6 py-3 text-left text-sm font-semibold">
                Status
              </th>

              <th className="px-6 py-3 text-left text-sm font-semibold">
                Actions
              </th>
            </tr>
          </thead>

          <tbody>
            {doctors.length === 0 ? (
              <tr>
                <td
                  colSpan="5"
                  className="text-center py-6 text-gray-500"
                >
                  No doctors found
                </td>
              </tr>
            ) : (
              doctors.map((doctor) => (
                <tr
                  key={doctor._id}
                  className="border-b hover:bg-gray-50"
                >
                  <td className="px-6 py-4 font-medium">
                    {doctor.name}
                  </td>

                  <td className="px-6 py-4">
                    {doctor.email}
                  </td>

                  <td className="px-6 py-4">
                    {doctor.phone}
                  </td>

                  <td className="px-6 py-4">
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-semibold ${getStatusBadge(
                        doctor.accountStatus
                      )}`}
                    >
                      {doctor.accountStatus}
                    </span>
                  </td>

                  <td className="px-6 py-4 flex gap-2">
                    <button
                      onClick={() => approveDoctor(doctor._id)}
                      className="bg-green-500 hover:bg-green-600 text-white px-3 py-1 rounded text-sm"
                    >
                      Approve
                    </button>

                    <button
                      onClick={() => rejectDoctor(doctor._id)}
                      className="bg-yellow-500 hover:bg-yellow-600 text-white px-3 py-1 rounded text-sm"
                    >
                      Reject
                    </button>

                    <button
                      onClick={() => suspendDoctor(doctor._id)}
                      className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded text-sm"
                    >
                      Suspend
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </motion.div>
  );
}

export default ManageUsers;