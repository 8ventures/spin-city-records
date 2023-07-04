import { type Config } from "tailwindcss";

export default {
  content: ["./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        DMSerif: ["DM Serif Display", "serif"],
        DMSans: ["DM Sans", "sans-serif"],
      },
      colors: {
        'custom-orange': '#FF5500',
      }
    },
  },
  plugins: [],
} satisfies Config;
