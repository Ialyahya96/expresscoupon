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
        // Cool neutrals, where racksontop and jrb use warm paper. Indigo on a
        // cream chip reads as a mismatch rather than a choice, and the neutral
        // is doing as much of the differentiating here as the accent is.
        ink: {
          900: "#fafafb",
          800: "#f1f2f7",
          700: "#e3e5ef",
        },
        // expresscoupon had racksontop's gold, which made the two sites look
        // like one brand. Each site now owns a hue: racksontop gold, hawie
        // coral, jrb green, expresscoupon indigo. Indigo is the one gap in
        // that set, and it suits a deals site — the obvious alternative, a
        // discount red, sits too close to hawie's coral to tell apart in a
        // browser tab.
        //
        // Named `accent`, not `gold`. Leaving indigo under the name `gold`
        // would mislead the next person to open this file.
        accent: {
          500: "#4f46e5",
          600: "#4338ca",
        },
      },
    },
  },
  plugins: [],
};
export default config;
