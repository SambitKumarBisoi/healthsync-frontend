/** @type {import('tailwindcss').Config} */
export default {
  darkMode: "class",
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#2563eb",
        softblue: "#60a5fa",
        pastel: "#eff6ff",
        sidebar: "#f0f7ff",
        borderlight: "#e5eefc",
        success: "#22c55e",
        danger: "#ef4444",
      },
      boxShadow: {
        card: "0 4px 20px rgba(37, 99, 235, 0.08)",
        soft: "0 8px 30px rgba(37, 99, 235, 0.06)",
      },
      borderRadius: {
        xl2: "14px",
      },
    },
  },
  plugins: [],
};