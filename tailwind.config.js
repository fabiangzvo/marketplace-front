import { heroui } from "@heroui/theme";
import colors from "tailwindcss/colors";

/** @type {import('tailwindcss').Config} */
const config = {
  content: [
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./node_modules/@heroui/theme/dist/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ["var(--font-sans)"],
        mono: ["var(--font-mono)"],
      },
    },
  },
  darkMode: "class",
  plugins: [
    heroui({
      themes: {
        light: {
          colors: {
            primary: { ...colors.cyan, DEFAULT: "#01B8FB" },
            default: { ...colors.cyan, DEFAULT: "#01B8FB" },
            background: colors.sky[50],
          },
        },
        dark: {
          colors: {
            primary: { ...colors.sky, DEFAULT: "#01B8FB" },
            default: { ...colors.sky, DEFAULT: "#01B8FB" },
          },
        },
      },
    }),
  ],
};

module.exports = config;
