/** @type {import('tailwindcss').Config} */
export default {
  darkMode: "class",
  content: ["./index.html", "./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#1e3a5f",
        secondary: "#0f172a",
        accent: "#3b82f6",
        glass: "rgba(255,255,255,0.08)",
        slateDeep: "#04111f",
      },
      boxShadow: {
        soft: "0 18px 48px rgba(5, 16, 33, 0.22)",
        glow: "0 22px 60px rgba(59,130,246,0.28)",
      },
      borderRadius: {
        "2.5xl": "1.25rem",
      },
      backdropBlur: {
        xs: "2px",
      },
      backgroundImage: {
        "brand-gradient": "linear-gradient(135deg, #2382ff 0%, #66aefb 55%, #7ef3dd 100%)",
      },
    },
  },
  plugins: [],
};
