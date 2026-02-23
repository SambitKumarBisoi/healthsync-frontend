import { useState } from "react";
import axiosInstance from "../../api/axiosInstance";
import { Link } from "react-router-dom";

function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");
    setError("");

    try {
      await axiosInstance.post("/api/auth/forgot-password", { email });
      setMessage("Reset link sent to your email.");
    } catch (err) {
      setError(err.response?.data?.message || "Something went wrong");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4">

      <div className="w-full max-w-md bg-white/80 backdrop-blur-md p-8 rounded-2xl shadow-soft border border-borderlight">

        <h2 className="text-3xl font-semibold text-primary mb-6 text-center">
          Forgot Password
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
            type="email"
            placeholder="Enter your registered email"
            required
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-4 py-2 border border-borderlight rounded-xl2 focus:ring-2 focus:ring-primary"
          />

          <button
            type="submit"
            className="w-full py-2 bg-primary text-white rounded-xl2 shadow-card hover:bg-blue-700 hover:scale-[1.02] active:scale-95 transition duration-200"
          >
            Send Reset Link
          </button>
        </form>

        <div className="mt-6 text-center text-sm">
          <Link to="/login" className="text-primary hover:underline">
            Back to Login
          </Link>
        </div>

      </div>
    </div>
  );
}

export default ForgotPassword;