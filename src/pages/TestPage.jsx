import { useEffect, useState } from "react";
import axiosInstance from "../api/axiosInstance";

function TestPage() {
  const [status, setStatus] = useState("Checking backend...");

  useEffect(() => {
    const checkBackend = async () => {
      try {
        const res = await axiosInstance.get("/");
        console.log(res.data);
        setStatus("Backend Connected ✅");
      } catch (error) {
        console.error(error);
        setStatus("Backend Not Connected ❌");
      }
    };

    checkBackend();
  }, []);

  return (
    <div style={{ padding: "40px" }}>
      <h1>HealthSync Foundation</h1>
      <p>{status}</p>
    </div>
  );
}

export default TestPage;