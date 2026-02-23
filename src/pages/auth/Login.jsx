import { useState, useContext, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import axiosInstance from "../../api/axiosInstance";
import { AuthContext } from "../../context/AuthContext";

function Login() {
  const navigate = useNavigate();
  const { login } = useContext(AuthContext);

  const [showPassword, setShowPassword] = useState(false);
  const [captchaData, setCaptchaData] = useState(null);
  const [captchaAnswer, setCaptchaAnswer] = useState("");

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    fetchCaptcha();
  }, []);

  const fetchCaptcha = async () => {
    try {
      const res = await axiosInstance.get("/api/auth/captcha");
      setCaptchaData(res.data);
    } catch (err) {
      console.error("Captcha fetch error:", err);
    }
  };

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

    try {
      const response = await axiosInstance.post("/api/auth/login", {
        ...formData,
        captchaId: captchaData?.captchaId,
        captchaAnswer,
      });

      const { token, user } = response.data;

      login(token, user);

      if (user.role === "admin") {
        navigate("/admin-dashboard");
      } else if (user.role === "doctor") {
        navigate("/doctor-dashboard");
      } else {
        navigate("/patient-dashboard");
      }

    } catch (err) {
      setError(err.response?.data?.message || "Login failed");
      fetchCaptcha(); // regenerate captcha if failed
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <div className="w-full max-w-md bg-white/80 backdrop-blur-md p-8 rounded-2xl shadow-soft border border-borderlight">

        <h2 className="text-3xl font-semibold text-primary mb-6 text-center">
          Welcome Back
        </h2>

        {error && (
          <div className="mb-4 text-sm text-danger bg-red-50 p-3 rounded-xl2">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">

          <input
            type="email"
            name="email"
            placeholder="Email"
            required
            onChange={handleChange}
            className="w-full px-4 py-2 border border-borderlight rounded-xl2 focus:ring-2 focus:ring-primary"
          />

          {/* Password with Toggle */}
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

{/* CAPTCHA */}
{captchaData && (
  <div className="space-y-2">

    <div className="flex items-center justify-between bg-blue-50 px-4 py-2 rounded-xl2 border border-borderlight">

      <p className="text-sm text-gray-700 font-medium">
        {captchaData.question}
      </p>

      <button
        type="button"
        onClick={() => {
          fetchCaptcha();
          setCaptchaAnswer("");
        }}
        className="text-primary text-sm hover:rotate-180 transition-transform duration-300"
        title="Refresh Captcha"
      >
        🔄
      </button>

    </div>

    <input
      type="text"
      placeholder="Enter answer"
      required
      value={captchaAnswer}
      onChange={(e) => setCaptchaAnswer(e.target.value)}
      className="w-full px-4 py-2 border border-borderlight rounded-xl2 focus:ring-2 focus:ring-primary"
    />

  </div>
)}

          <button
            type="submit"
            disabled={loading}
            className="w-full py-2 bg-primary text-white rounded-xl2 shadow-card hover:bg-blue-700 hover:scale-[1.02] active:scale-95 transition"
          >
            {loading ? "Logging in..." : "Login"}
          </button>

        </form>

        <div className="mt-6 text-center text-sm text-gray-600 space-y-2">
          <p>
            Don’t have an account?{" "}
            <Link to="/register" className="text-primary hover:underline">
              Register
            </Link>
          </p>

          <p>
            <Link to="/forgot-password" className="text-primary hover:underline">
              Forgot Password?
            </Link>
          </p>
        </div>

      </div>
    </div>
  );
}

export default Login;