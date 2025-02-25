// eslint-disable-next-line check-file/filename-naming-convention
import type { Config } from "tailwindcss";
import tailwindcssAnimate from "tailwindcss-animate";

const config: Config = {
  darkMode: ["class"],
  content: ["./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        sans: ["var(--font-poppins)", "sans-serif"],
        inter: ["var(--font-inter)", "sans-serif"],
        roboto: ["var(--font-roboto)", "sans-serif"],
        quicksand: ["var(--font-quicksand)", "sans-serif"],
      },
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        primary: "var(--color-primary)",
        link: "var(--color-link)",
        secondary: {
          2: "var(--color-secondary-2)",
        },
        button: {
          1: "var(--color-button-1)",
          2: "var(--color-button-2)",
          hover: "var(--hover-button)",
        },
        stars: "var(--color-stars)",
        text: {
          primary: "var(--text-primary)",
          secondary: "var(--text-secondary)",
        },
      },
      fontSize: {
        "110": "var(--font-110)",
        "90": "var(--font-90)",
        "64": "var(--font-64)",
        "54": "var(--font-54)",
        "48": "var(--font-48)",
        "36": "var(--font-36)",
        "32": "var(--font-32)",
        "24": "var(--font-24)",
        "20": "var(--font-20)",
        "16": "var(--font-16)",
        "14": "var(--font-14)",
        "12": "var(--font-12)",
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      textWrap: {
        balance: "balance",
      },
      screens: {
        xs: "500px",
        xss: "375px",
      },
    },
  },
  plugins: [tailwindcssAnimate],
};

export default config;
