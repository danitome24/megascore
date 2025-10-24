import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./app/**/*.{ts,tsx}",
    "./src/**/*.{ts,tsx}",
    "*.{js,ts,jsx,tsx,mdx}",
  ],
  prefix: "",
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      colors: {
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "#DFD9D9",
        foreground: "#19191A",
        primary: {
          DEFAULT: "#19191A",
          foreground: "#DFD9D9",
        },
        secondary: {
          DEFAULT: "#ECE8E8",
          foreground: "#19191A",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "#ECE8E8",
          foreground: "#19191A",
        },
        accent: {
          DEFAULT: "#F5AF94",
          foreground: "#19191A",
        },
        popover: {
          DEFAULT: "#ECE8E8",
          foreground: "#19191A",
        },
        card: {
          DEFAULT: "#ECE8E8",
          foreground: "#19191A",
        },
        // Official MegaETH colors
        mega: {
          coral: "#F5AF94",
          pink: "#FF8AA8",
          green: "#90D79F",
          blue: "#7EAAD4",
          light: "#ECE8E8",
        },
      },
      fontFamily: {
        sans: ["Sofia Pro Soft", "-apple-system", "BlinkMacSystemFont", "Segoe UI", "Roboto", "Arial", "sans-serif"],
        mono: ["Sofia Pro Soft", "SFMono-Regular", "Monaco", "Consolas", "Liberation Mono", "Courier New", "monospace"],
        display: ["Sofia Pro Soft", "-apple-system", "BlinkMacSystemFont", "Segoe UI", "Roboto", "Arial", "sans-serif"],
      },
      fontSize: {
        xs: ["0.9375rem", { lineHeight: "1.4" }], // 15px - even larger
        sm: ["1.0625rem", { lineHeight: "1.5" }], // 17px - even larger
        base: ["1.1875rem", { lineHeight: "1.6" }], // 19px - even larger
        lg: ["1.3125rem", { lineHeight: "1.7" }], // 21px - even larger
        xl: ["1.4375rem", { lineHeight: "1.7" }], // 23px - even larger
        "2xl": ["1.75rem", { lineHeight: "2" }], // 28px - even larger
        "3xl": ["2.125rem", { lineHeight: "2.25" }], // 34px - even larger
        "4xl": ["2.625rem", { lineHeight: "2.5" }], // 42px - even larger
        "5xl": ["3.375rem", { lineHeight: "1" }], // 54px - even larger
        "6xl": ["4.125rem", { lineHeight: "1" }], // 66px - even larger
        "7xl": ["4.875rem", { lineHeight: "1" }], // 78px - even larger
        "8xl": ["6.625rem", { lineHeight: "1" }], // 106px - even larger
        "9xl": ["8.625rem", { lineHeight: "1" }], // 138px - even larger
      },
      borderRadius: {
        lg: "0px",
        md: "0px",
        sm: "0px",
      },
      backdropBlur: {
        xs: "2px",
      },
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
        "fade-in": {
          from: { opacity: "0", transform: "translateY(10px)" },
          to: { opacity: "1", transform: "translateY(0)" },
        },
        "slide-in": {
          from: { transform: "translateX(-100%)" },
          to: { transform: "translateX(0)" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
        "fade-in": "fade-in 0.5s ease-out",
        "slide-in": "slide-in 0.3s ease-out",
      },
      boxShadow: {
        soft: "0 1px 3px 0 rgba(25, 25, 26, 0.1), 0 1px 2px 0 rgba(25, 25, 26, 0.06)",
        medium: "0 4px 6px -1px rgba(25, 25, 26, 0.1), 0 2px 4px -1px rgba(25, 25, 26, 0.06)",
        large: "0 10px 15px -3px rgba(25, 25, 26, 0.1), 0 4px 6px -2px rgba(25, 25, 26, 0.05)",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
} satisfies Config;

export default config;
