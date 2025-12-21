import type { Config } from "tailwindcss";

export default {
  darkMode: ["class"],
  content: ["./pages/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}", "./app/**/*.{ts,tsx}", "./src/**/*.{ts,tsx}"],
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
      fontFamily: {
        sans: ["Satoshi", "Inter", "DM Sans", "sans-serif"],
        inter: ["Inter", "sans-serif"],
        serif: ["DM Serif Display", "serif"],
      },
      colors: {
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
        indigo: {
          light: "hsl(var(--indigo-light))",
          glow: "hsl(var(--indigo-glow))",
        },
        pink: {
          soft: "hsl(var(--pink-soft))",
          vibrant: "hsl(var(--pink-vibrant))",
        },
        cream: "hsl(var(--cream))",
        gold: "hsl(var(--gold))",
        whatsapp: {
          DEFAULT: "hsl(var(--whatsapp))",
          light: "hsl(var(--whatsapp-light))",
        },
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
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
        float: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-20px)" },
        },
        "float-slow": {
          "0%, 100%": { transform: "translateY(0px) rotate(0deg)" },
          "50%": { transform: "translateY(-30px) rotate(5deg)" },
        },
        sparkle: {
          "0%, 100%": { opacity: "0", transform: "scale(0)" },
          "50%": { opacity: "1", transform: "scale(1)" },
        },
        "pulse-glow": {
          "0%, 100%": { boxShadow: "0 0 20px hsl(244 80% 70% / 0.3)" },
          "50%": { boxShadow: "0 0 40px hsl(244 80% 70% / 0.5)" },
        },
        wiggle: {
          "0%, 100%": { transform: "rotate(-3deg)" },
          "50%": { transform: "rotate(3deg)" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
        float: "float 6s ease-in-out infinite",
        "float-slow": "float-slow 8s ease-in-out infinite",
        sparkle: "sparkle 2s ease-in-out infinite",
        "pulse-glow": "pulse-glow 3s ease-in-out infinite",
        wiggle: "wiggle 1s ease-in-out infinite",
      },
      backgroundImage: {
        "gradient-hero": "linear-gradient(135deg, hsl(244 76% 59%) 0%, hsl(330 81% 60%) 100%)",
        "gradient-card": "linear-gradient(180deg, hsl(0 0% 100%) 0%, hsl(220 14% 98%) 100%)",
        "gradient-cta": "linear-gradient(135deg, hsl(244 76% 59%) 0%, hsl(330 81% 60%) 100%)",
        "gradient-pricing": "linear-gradient(180deg, hsl(244 76% 98%) 0%, hsl(330 70% 98%) 100%)",
      },
      boxShadow: {
        soft: "0 4px 20px hsl(244 76% 59% / 0.1)",
        glow: "0 0 40px hsl(244 80% 70% / 0.3)",
        card: "0 8px 32px hsl(220 20% 50% / 0.08)",
        button: "0 4px 16px hsl(244 76% 59% / 0.3)",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
} satisfies Config;