/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      backgroundColor: {
        primary: "#f1f7c2",
      },
      boxShadow: {
        custom: "7px 3px 2px 2px #000000",
      },
      keyframes: {
        shaking: {
          "0%": { transform: "translateX(0px)" },
          "50%": { transform: "translateX(10px)" },
          "100%": { transform: "translateX(0px)" },
        },
        scaling: {
          "0%": { transform: "scale(1.0)" },
          "50%": { transform: "scale(1.1)" },
          "100%": { transform: "scale(1.0)" },
        },
      },
      animation: {
        shaking: "shaking 1s linear infinite",
        scaling: "scaling 2s linear infinite",
      },
    },
  },

  plugins: [],
};
