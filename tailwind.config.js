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
            primary: { ...colors.cyan, DEFAULT: colors.cyan[300] },
            default: { ...colors.cyan, DEFAULT: colors.cyan[300] },
            background: colors.sky[50],
          },
        },
        dark: {
          colors: {
            primary: { ...colors.sky, DEFAULT: colors.sky[300] },
            default: { ...colors.sky, DEFAULT: colors.sky[300] },
          },
        },
      },
    }),
  ],
};

module.exports = config;
