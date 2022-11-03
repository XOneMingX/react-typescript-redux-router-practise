module.exports = {
  plugins: {
    "postcss-import": {},
    "tailwindcss/nesting": "postcss-nesting",
    "postcss-preset-env": {
      features: { "nesting-rules": false },
    },
    tailwindcss: { config: "./tailwindcss-config.js" },
    autoprefixer: {},
    ...(process.env.NODE_ENV === "production" ? { cssnano: {} } : {}),

    // eslint-disable-next-line global-require
    plugins: [require("tailwindcss"), require("autoprefixer")],
  },
}
