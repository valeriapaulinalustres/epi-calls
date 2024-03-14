/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    colors: {
      cyan: "#00B19C",
      orange: "#FF9F1C",
      green: "#21A300",
      purple: "#B3008C",
      magenta: "#FF3864",
      yellow: "#FFF732",
      white: "#ffffff",
      grey: "#d9d9d9",
      lightGrey: "#f2f2f2",
    },

    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
    },
  },
  plugins: [],
};
