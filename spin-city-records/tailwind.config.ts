import { type Config } from "tailwindcss";

export default {
  content: ["./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        Belanosima: ["Belanosima", "sans-serif"],
      },
    },
  },
  plugins: [],
} satisfies Config;
