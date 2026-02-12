import axios from "axios";

const api = axios.create({
  baseURL: "https://healthsync-backend-w4hm.onrender.com/api",
});

export default api;
