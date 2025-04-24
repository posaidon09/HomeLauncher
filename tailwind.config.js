/** @type {import('tailwindcss').Config} */
import defaultTheme from "tailwindcss/defaultTheme";

export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      boxShadow: {
        "glow-ourple": "0 0 20px #c90cb6, 0 0 20px #c90c5b",
      },
      animation: {
        bgRotate: "bgRotate 9s linear infinite",
      },
      keyframes: {
        bgRotate: {
          "100%": { transform: "rotate(1turn)" },
        },
      },
      colors: {
        text: {
          50: "#e8e5ff",
          100: "#d0ccff",
          200: "#a299ff",
          300: "#7366ff",
          400: "#4433ff",
          500: "#1500ff",
          600: "#1100cc",
          700: "#0d0099",
          800: "#080066",
          900: "#040033",
          950: "#02001a",
        },
        background: {
          50: "#f2f2f2",
          100: "#e6e6e6",
          200: "#cccccc",
          300: "#b3b3b3",
          400: "#999999",
          500: "#808080",
          600: "#666666",
          700: "#4d4d4d",
          800: "#333333",
          900: "#1a1a1a",
          950: "#0d0d0d",
        },
        primary: {
          50: "#e8e8fd",
          100: "#d1d1fa",
          200: "#a4a2f6",
          300: "#7674f1",
          400: "#4845ed",
          500: "#1a17e8",
          600: "#1512ba",
          700: "#100e8b",
          800: "#0b095d",
          900: "#05052e",
          950: "#030217",
        },
        secondary: {
          50: "#fee7fa",
          100: "#fccff5",
          200: "#f99fea",
          300: "#f76ee0",
          400: "#f43ed6",
          500: "#f10ecb",
          600: "#c10ba3",
          700: "#91087a",
          800: "#600651",
          900: "#300329",
          950: "#180114",
        },
        accent: {
          50: "#fee7f3",
          100: "#fccfe7",
          200: "#f99fcf",
          300: "#f76eb7",
          400: "#f43e9f",
          500: "#f10e87",
          600: "#c10b6c",
          700: "#910851",
          800: "#600636",
          900: "#30031b",
          950: "#18010e",
        },
      },
    },
    safelist: [
      {
        pattern: /bg-\[rgb\(.+\)\]/, // Safelist dynamic `bg-[rgb(...)]` classes
      },
    ],
  },
  plugins: [],
};
