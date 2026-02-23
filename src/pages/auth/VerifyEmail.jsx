import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axiosInstance from "../../api/axiosInstance";

function VerifyEmail() {
  const { token } = useParams();
  const navigate = useNavigate();
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    const verify = async () => {
      try {
        await axiosInstance.get(`/api/auth/verify-email/${token}`);
        setMessage("Email verified successfully.");

        setTimeout(() => {
          navigate("/login");
        }, 2000);
      } catch (err) {
        setError("Invalid or expired verification link.");
      }
    };

    verify();
  }, [token, navigate]);

  return (
    <div className="min-h-screen flex items-center justify-center px-4">

      <div className="w-full max-w-md bg-white/80 backdrop-blur-md p-8 rounded-2xl shadow-soft border border-borderlight text-center">

        <h2 className="text-3xl font-semibold text-primary mb-6">
          Email Verification
        </h2>

        {error && (
          <div className="text-danger bg-red-50 p-3 rounded-xl2">
            {error}
          </div>
        )}

        {message && (
          <div className="text-success bg-green-50 p-3 rounded-xl2">
            {message}
          </div>
        )}

      </div>
    </div>
  );
}

export default VerifyEmail;