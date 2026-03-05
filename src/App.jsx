import { Routes, Route } from "react-router-dom";

import TestPage from "./pages/TestPage";
import Register from "./pages/auth/Register";
import Login from "./pages/auth/Login";
import ForgotPassword from "./pages/auth/ForgotPassword";
import ResetPassword from "./pages/auth/ResetPassword";
import VerifyEmail from "./pages/auth/VerifyEmail";

import PatientDashboard from "./pages/patient/PatientDashboard";
import DoctorDashboard from "./pages/doctor/DoctorDashboard";
import AdminDashboard from "./pages/admin/AdminDashboard";

import PrivateRoute from "./routes/PrivateRoute";
import DashboardLayout from "./layouts/DashboardLayout";

import ManageAvailability from "./pages/doctor/ManageAvailability";
import DoctorList from "./pages/patient/DoctorList";
import DoctorAvailability from "./pages/patient/DoctorAvailability";
import AppointmentHistory from "./pages/patient/AppointmentHistory";
import DoctorQueue from "./pages/doctor/DoctorQueue";
import ManageUsers from "./pages/admin/ManageUsers";


function App() {
  return (
    <Routes>

      {/* Public Routes */}
      <Route path="/" element={<TestPage />} />
      <Route path="/register" element={<Register />} />
      <Route path="/login" element={<Login />} />
      <Route path="/forgot-password" element={<ForgotPassword />} />
      <Route path="/reset-password/:token" element={<ResetPassword />} />
      <Route path="/verify-email/:token" element={<VerifyEmail />} />

      {/* Protected Layout */}
      <Route
        element={
          <PrivateRoute>
            <DashboardLayout />
          </PrivateRoute>
        }
      >
        {/* Patient */}
        <Route path="/patient-dashboard" element={<PatientDashboard />} />
        <Route path="/patient/appointments" element={<AppointmentHistory />} />
        <Route path="/patient/doctors" element={<DoctorList />} />
        <Route
          path="/patient/doctor/:doctorId/availability"
          element={<DoctorAvailability />}
        />

        {/* Doctor */}
        <Route path="/doctor-dashboard" element={<DoctorDashboard />} />
        <Route path="/doctor/manage-availability" element={<ManageAvailability />} />
        <Route path="/doctor/queue" element={<DoctorQueue />} />

        {/* Admin */}
        <Route path="/admin-dashboard" element={<AdminDashboard />} />
        <Route path="/admin/manage-users" element={<ManageUsers />} />

        
      </Route>

    </Routes>
  );
}

export default App;