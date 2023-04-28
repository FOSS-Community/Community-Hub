const colors = require("tailwindcss/colors");

module.exports = {
  // purge: ["./**/*.tsx"],
  mode: "jit",
  darkMode: "class",
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./ui/**/*.{js,ts,jsx,tsx}",
    "./customComponents/**/*.{js,ts,jsx,tsx}",
    "./_posts/**/*.{md,mdx}",
  ],
  plugins: [require("@tailwindcss/typography")],
  future: {
    removeDeprecatedGapUtilities: true,
    purgeLayersByDefault: true,
  },
  theme: {
    extend: {
      colors: {
        primary: colors.amber,
      },
    },
  },
};
