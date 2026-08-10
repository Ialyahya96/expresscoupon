import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      // Same tokens as racksontop.me, so the two sites read as one family.
      // `ink` keeps its 900/800/700 names even though the values are now light
      // — the scale is "page, raised surface, border", and renaming it would
      // have meant touching every class in the page for no visual gain.
      colors: {
        ink: {
          900: "#fafaf7",
          800: "#f0ede5",
          700: "#e6e2d8",
        },
        // The old gold was #f59e0b, an amber picked to glow on a black
        // background. On paper it reads as a warning colour, so this is
        // racksontop's quieter gold: 500 for fills, 600 for text that has to
        // clear contrast against the light background.
        gold: {
          500: "#c8a247",
          600: "#a8862e",
        },
      },
    },
  },
  plugins: [],
};
export default config;
