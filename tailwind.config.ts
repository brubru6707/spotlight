import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      animation: {
        fadeInUp: "fadeInUp 1s ease-out forwards",
        twinkle: "twinkle 3s infinite",
        shooting: "shooting 2s linear infinite",
      },
      keyframes: {
        fadeInUp: {
          "0%": { opacity: "0", transform: "translateY(30px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        twinkle: {
          "0%, 100%": { opacity: "0.3" },
          "50%": { opacity: "1" },
        },
        shooting: {
          "0%": { opacity: "0", transform: "translate(0, 0)" },
          "10%": { opacity: "1" },
          "90%": { opacity: "1" },
          "100%": { opacity: "0", transform: "translate(-300px, 150px)" },
        },
      },
    fontFamily: {
        sans: ['"Be Vietnam Pro"', 'sans-serif'],
        },
    },
  },
  plugins: [],
};
