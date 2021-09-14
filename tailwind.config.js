module.exports = {
  purge: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      backgroundColor: theme => ({
        ...theme("colors"),
        300: "#D1D5DB",
        lightgreen: "#6EE7B7"
      }),
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
}
