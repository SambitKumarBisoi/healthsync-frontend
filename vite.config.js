import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  server: {
    allowedHosts: [
      "proadjournment-superfructified-nestor.ngrok-free.dev",
    ],
    historyApiFallback: true,
  },
});
