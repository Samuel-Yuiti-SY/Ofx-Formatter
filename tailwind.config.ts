import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}"
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          blue: "#2d5275",
          green: "#28a745",
          gray: "#666666",
          white: "#FFFFFF"
        }
      },
      boxShadow: {
        soft: "0 18px 50px rgba(45, 82, 117, 0.12)"
      }
    }
  },
  plugins: []
};

export default config;
