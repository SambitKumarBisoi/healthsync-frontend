import { useSearchParams, useNavigate } from "react-router-dom";
import { useState } from "react";
import api from "../../api/axios";

const ResetPassword = () => {
  const [params] = useSearchParams();
  const token = params.get("token");

  const [newPassword, setNewPassword] = useState("");
  const [message, setMessage] = useState("");

  const navigate = useNavigate();

  const handleReset = async (e) => {
    e.preventDefault();

    if (!token) {
      setMessage("Invalid reset link");
      return;
    }

    try {
      const res = await api.post(`/auth/reset-password?token=${token}`, { newPassword });

      setMessage(res.data.message || "Password reset successful");

      setTimeout(() => {
        navigate("/");
      }, 2000);
    } catch (err) {
      setMessage(
        err.response?.data?.message || "Reset failed"
      );
    }
  };

  return (
    <div>
      <h2>Reset Password</h2>

      <form onSubmit={handleReset}>
        <input
          type="password"
          placeholder="Enter new password"
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
          required
        />

        <button type="submit">Reset Password</button>
      </form>

      {message && <p>{message}</p>}
    </div>
  );
};

export default ResetPassword;
