/** @type {import('tailwindcss').Config} */
const colors = require("tailwindcss/colors");
module.exports = {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    colors: {
      transparent: "transparent",
      current: "currentColor",
      black: colors.black,
      white: colors.white,
      gray: colors.gray,
      green: colors.green,
      red: colors.red,
      ape: "#073183",
      apelight: "#0050ef",
    },
    fontFamily: {
      montserrat: ["Montserrat", "sans-serif"],
    },
    extend: {},
  },
  plugins: [],
};
