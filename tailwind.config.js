/** @type {import('tailwindcss').Config} */

module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],

  theme: {
    extend: {},

    screens: {
      mobile: "550px",

      // => @media (min-width: 640px) { ... }

      md: "770px",

      // => @media (min-width: 768px) { ... }

      lg: "982px",

      // => @media (min-width: 1024px) { ... }

      xl: "1280px",

      // => @media (min-width: 1280px) { ... }

      "2xl": "1536px",

      // => @media (min-width: 1536px) { ... }
    },
  },

  plugins: [],
};
