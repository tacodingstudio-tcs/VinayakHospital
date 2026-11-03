import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      colors: {
        ink: "rgb(var(--ink-rgb) / <alpha-value>)", "ink-soft": "rgb(var(--ink-soft-rgb) / <alpha-value>)", cream: "rgb(var(--cream-rgb) / <alpha-value>)", "cream-2": "rgb(var(--cream-2-rgb) / <alpha-value>)",
        clay: "rgb(var(--clay-rgb) / <alpha-value>)", "clay-dark": "rgb(var(--clay-dark-rgb) / <alpha-value>)", rose: "rgb(var(--rose-rgb) / <alpha-value>)", sage: "rgb(var(--sage-rgb) / <alpha-value>)", pulse: "rgb(var(--pulse-rgb) / <alpha-value>)",
      },
    },
  },
  plugins: [],
};
export default config;
