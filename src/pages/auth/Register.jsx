import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import axiosInstance from "../../api/axiosInstance";

function Register() {
  const navigate = useNavigate();

  const [showPassword, setShowPassword] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    phone: "",
    role: "patient",
    securityPin: "",
  });

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setMessage("");

    try {
      await axiosInstance.post("/api/auth/register", formData);
      setMessage("Registration successful. Please verify your email.");

      setTimeout(() => {
        navigate("/login");
      }, 2000);
    } catch (err) {
      setError(err.response?.data?.message || "Registration failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <div className="w-full max-w-lg bg-white/80 backdrop-blur-md p-8 rounded-2xl shadow-soft border border-borderlight">

        <h2 className="text-3xl font-semibold text-primary mb-6 text-center">
          Create Account
        </h2>

        {error && (
          <div className="mb-4 text-sm text-danger bg-red-50 p-3 rounded-xl2">
            {error}
          </div>
        )}

        {message && (
          <div className="mb-4 text-sm text-success bg-green-50 p-3 rounded-xl2">
            {message}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">

          <input
            type="text"
            name="name"
            placeholder="Full Name"
            required
            onChange={handleChange}
            className="w-full px-4 py-2 border border-borderlight rounded-xl2 focus:ring-2 focus:ring-primary"
          />

          <input
            type="email"
            name="email"
            placeholder="Email"
            required
            onChange={handleChange}
            className="w-full px-4 py-2 border border-borderlight rounded-xl2 focus:ring-2 focus:ring-primary"
          />

          {/* PASSWORD WITH TOGGLE */}
          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              name="password"
              placeholder="Password"
              required
              onChange={handleChange}
              className="w-full px-4 py-2 border border-borderlight rounded-xl2 focus:ring-2 focus:ring-primary"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-2 text-sm text-gray-500"
            >
              {showPassword ? "Hide" : "Show"}
            </button>
          </div>

          <input
            type="text"
            name="phone"
            placeholder="Phone"
            required
            onChange={handleChange}
            className="w-full px-4 py-2 border border-borderlight rounded-xl2 focus:ring-2 focus:ring-primary"
          />

          <select
            name="role"
            value={formData.role}
            onChange={handleChange}
            className="w-full px-4 py-2 border border-borderlight rounded-xl2 focus:ring-2 focus:ring-primary"
          >
            <option value="patient">Patient</option>
            <option value="doctor">Doctor</option>
            <option value="admin">Admin</option>
          </select>

          {/* SECURITY PIN WITH TOGGLE */}
          {(formData.role === "doctor" || formData.role === "admin") && (
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                name="securityPin"
                placeholder="Security PIN"
                required
                onChange={handleChange}
                className="w-full px-4 py-2 border border-borderlight rounded-xl2 focus:ring-2 focus:ring-primary"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-2 text-sm text-gray-500"
              >
                {showPassword ? "Hide" : "Show"}
              </button>
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full py-2 bg-primary text-white rounded-xl2 shadow-card hover:bg-blue-700 hover:scale-[1.02] active:scale-95 transition duration-200"
          >
            {loading ? "Registering..." : "Register"}
          </button>

        </form>

        <div className="mt-6 text-center text-sm">
          Already registered?{" "}
          <Link to="/login" className="text-primary font-medium hover:underline">
            Login
          </Link>
        </div>

      </div>
    </div>
  );
}

export default Register;