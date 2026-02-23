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

function App() {
  return (
    <Routes>
      {/* Public */}
      <Route path="/" element={<TestPage />} />
      <Route path="/register" element={<Register />} />
      <Route path="/login" element={<Login />} />
      <Route path="/forgot-password" element={<ForgotPassword />} />
      <Route path="/reset-password/:token" element={<ResetPassword />} />
      <Route path="/verify-email/:token" element={<VerifyEmail />} />
      <Route path="/doctor/manage-availability" element={<ManageAvailability />} />

      {/* Protected Layout */}
      <Route
        element={
          <PrivateRoute>
            <DashboardLayout />
          </PrivateRoute>
        }
      >
        <Route path="/patient-dashboard" element={<PatientDashboard />} />
        <Route path="/doctor-dashboard" element={<DoctorDashboard />} />
        <Route path="/admin-dashboard" element={<AdminDashboard />} />
        <Route path="/patient/doctors" element={<DoctorList />} />
        <Route path="/patient/doctors/:doctorId" element={<DoctorAvailability />} />
      </Route>
    </Routes>
  );
}

export default App;