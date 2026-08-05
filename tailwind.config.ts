import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        ink: {
          900: "#0a0a0f",
          800: "#13131a",
          700: "#1c1c26",
        },
        gold: {
          500: "#f59e0b",
          400: "#fbbf24",
        },
      },
    },
  },
  plugins: [],
};
export default config;
