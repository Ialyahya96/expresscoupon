// `export default`, not `module.exports` — this file is .mjs, so it is an ES
// module and `module.exports` is not defined. PostCSS silently loaded no
// plugins, so Tailwind never ran and the build emitted no CSS at all.
export default {
  plugins: {
    tailwindcss: {},
    autoprefixer: {},
  },
};
