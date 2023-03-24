/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      screens: {
        '-sm': { max: '639px' },
        // => @media (max-width: 639px) { ... }
      },
    },
  },
  plugins: [require("daisyui")],
  daisyui: {
    theme: ['cupcake', 'dark'],
    styled: true,
    themes: true,
    base: true,
    utils: true,
    logs: true,
    rtl: false,
    prefix: "",
  }
};
