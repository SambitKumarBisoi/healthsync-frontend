import { Routes, Route } from "react-router-dom";
import Login from "../pages/auth/Login";
import ForgotPassword from "../pages/auth/ForgotPassword";
import EmailVerified from "../pages/auth/EmailVerified";
import PatientDashboard from "../pages/patient/PatientDashboard";
import DoctorDashboard from "../pages/doctor/DoctorDashboard";
import AdminDashboard from "../pages/admin/AdminDashboard";
import ProtectedRoute from "./ProtectedRoute";
import ResetPassword from "../pages/auth/ResetPassword";


const AppRoutes = () => (
  <Routes>
    {/* Public routes */}
    <Route path="/" element={<Login />} />
    <Route path="/forgot-password" element={<ForgotPassword />} />
    <Route path="/email-verified" element={<EmailVerified />} />
    <Route path="/reset-password" element={<ResetPassword />} />


    {/* Protected routes */}
    <Route
      path="/patient"
      element={
        <ProtectedRoute allowedRoles={["patient"]}>
          <PatientDashboard />
        </ProtectedRoute>
      }
    />

    <Route
      path="/doctor"
      element={
        <ProtectedRoute allowedRoles={["doctor"]}>
          <DoctorDashboard />
        </ProtectedRoute>
      }
    />

    <Route
      path="/admin"
      element={
        <ProtectedRoute allowedRoles={["admin"]}>
          <AdminDashboard />
        </ProtectedRoute>
      }
    />
  </Routes>
);

export default AppRoutes;
