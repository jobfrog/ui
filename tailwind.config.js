// tailwind.config.js
/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        frog: {
          DEFAULT: "#34A853", // Primary green
          dark: "#2E7D32",
          light: "#66BB6A",
          50: "#E8F5E9",
          900: "#1B5E20",
        },
      },
      fontFamily: {
        sans: ["Inter", "system-ui", "sans-serif"],
      },
    },
  },
  plugins: [],
};
