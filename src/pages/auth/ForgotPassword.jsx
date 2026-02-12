import { useState } from "react";
import api from "../../api/axios";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {
  e.preventDefault();

  // Simple frontend validation
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  if (!emailRegex.test(email)) {
    setMessage("Please enter a valid email address");
    return;
  }

  try {
    const res = await api.post("/auth/forgot-password", { email });
    setMessage(res.data.message);
  } catch (err) {
    setMessage(
      err.response?.data?.message || "Something went wrong"
    );
  }
};


  return (
    <div>
      <h2>Forgot Password</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <button type="submit">Send Reset Link</button>
      </form>
      {message && <p>{message}</p>}
    </div>
  );
};

export default ForgotPassword;
